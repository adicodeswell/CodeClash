import { getJudge0LanguageId } from "../judge/language-map.js";
import {
  executeJudge0WithWait,
  executeJudge0Batch,
} from "../judge/judge0.client.js";
import {
  mapJudge0Result,
  normalizeOutput,
  extractExecutionMetrics,
} from "../judge/verdict-mapper.js";
import { loadProblemPackage } from "../problems/load-problem-package.js";

// Max batch size supported natively by Judge0 CE (used for fallback evaluation)
const BATCH_SIZE = 20;

/**
 * Fallback chunk executor using Judge0 batch API.
 */
async function executeBatchFallback(
  chunk,
  { executableSource, languageId, cpuTimeLimit, memoryLimitKb }
) {
  try {
    const submissions = chunk.map((tc) => ({
      sourceCode: executableSource,
      languageId,
      stdin: tc.input,
      cpuTimeLimit,
      memoryLimitKb,
    }));

    const rawResults = await executeJudge0Batch({
      submissions,
      timeoutMs: 35000,
    });

    return rawResults.map((result, idx) => ({
      testCase: chunk[idx],
      result,
    }));
  } catch (batchErr) {
    console.warn(
      `[judge-worker] Batch fallback error (${batchErr.message}): executing concurrently`
    );

    return Promise.all(
      chunk.map(async (tc) => {
        const result = await executeJudge0WithWait({
          sourceCode: executableSource,
          languageId,
          stdin: tc.input,
          cpuTimeLimit,
          memoryLimitKb,
        });
        return {
          testCase: tc,
          result,
        };
      })
    );
  }
}

/**
 * Executes a claimed submission against test cases.
 *
 * Primary Path: High-throughput Multi-Test In-Process Driver execution.
 * Streams all test cases to a single sandboxed container in one request,
 * dropping evaluation time from ~25s down to ~3s on Judge0 CE.
 *
 * Resilient Fallback: If the driver only outputs 1 line for multiple tests,
 * gracefully falls back to chunked batch evaluation.
 */
export async function processSubmission(
  submission,
  { prisma, completeJob }
) {
  console.log(
    `[judge-worker] Processing submission ${submission.id} for problem ${submission.problemId} (${submission.language})`
  );

  let problemPackage;
  try {
    problemPackage = await loadProblemPackage(prisma, submission);
  } catch (err) {
    console.error(`[judge-worker] Failed to load problem package:`, err.message);
    return completeJob(prisma, submission.id, {
      verdict: "JUDGE_ERROR",
      passedTestCount: 0,
      totalTestCount: 0,
      runtimeMs: 0,
      memoryKb: 0,
      errorSummary: err.message,
    });
  }

  const { executableSource, testCases, cpuTimeLimit, memoryLimitKb } =
    problemPackage;

  if (!testCases || testCases.length === 0) {
    return completeJob(prisma, submission.id, {
      verdict: "ACCEPTED",
      passedTestCount: 0,
      totalTestCount: 0,
      runtimeMs: 0,
      memoryKb: 0,
      errorSummary: null,
    });
  }

  const languageId = getJudge0LanguageId(submission.language);

  // --------------------------------------------------------------------------
  // PRIMARY PATH: High-Throughput Multi-Test Execution
  // --------------------------------------------------------------------------
  try {
    let combinedStdin = "";
    for (const tc of testCases) {
      combinedStdin += tc.input.trim() + "\n";
    }

    const multiTestTimeoutMs = 35000;
    const adjustedCpuTimeLimit = Math.max(3, Math.min(10, cpuTimeLimit * 2));

    console.log(
      `[judge-worker] Submission ${submission.id}: executing multi-test driver for ${testCases.length} tests in single container`
    );

    const rawResult = await executeJudge0WithWait({
      sourceCode: executableSource,
      languageId,
      stdin: combinedStdin,
      cpuTimeLimit: adjustedCpuTimeLimit,
      memoryLimitKb,
      timeoutMs: multiTestTimeoutMs,
    });

    const { statusId, statusDescription, compileOutput } = rawResult;
    const { runtimeMs, cleanStderr } = extractExecutionMetrics(rawResult);
    const effectiveStderr = cleanStderr || null;
    const memoryKb = rawResult.memory || 0;

    // 1. Status 6: Compilation Error
    if (statusId === 6) {
      console.log(`[judge-worker] Submission ${submission.id} COMPILATION_ERROR`);
      return completeJob(prisma, submission.id, {
        verdict: "COMPILATION_ERROR",
        passedTestCount: 0,
        totalTestCount: testCases.length,
        runtimeMs,
        memoryKb,
        errorSummary: compileOutput || effectiveStderr || "Compilation failed",
      });
    }

    // 2. Status 5: Time Limit Exceeded
    if (statusId === 5) {
      console.log(`[judge-worker] Submission ${submission.id} TIME_LIMIT_EXCEEDED`);
      // Count passed lines before timeout
      const rawLines = (rawResult.stdout || "").trim().split("\n");
      let passedBeforeTimeout = 0;
      for (let i = 0; i < testCases.length && i < rawLines.length; i++) {
        if (normalizeOutput(rawLines[i]) === normalizeOutput(testCases[i].expectedOutput)) {
          passedBeforeTimeout++;
        } else {
          break;
        }
      }
      return completeJob(prisma, submission.id, {
        verdict: "TIME_LIMIT_EXCEEDED",
        passedTestCount: passedBeforeTimeout,
        totalTestCount: testCases.length,
        runtimeMs,
        memoryKb,
        errorSummary: "Execution exceeded time limit",
      });
    }

    // 3. Memory Limit Exceeded
    if (
      (statusDescription && /memory limit/i.test(statusDescription)) ||
      (rawResult.message && /memory limit/i.test(rawResult.message)) ||
      (statusId >= 7 && statusId <= 12 && /memory limit|out of memory/i.test(effectiveStderr || ""))
    ) {
      console.log(`[judge-worker] Submission ${submission.id} MEMORY_LIMIT_EXCEEDED`);
      return completeJob(prisma, submission.id, {
        verdict: "MEMORY_LIMIT_EXCEEDED",
        passedTestCount: 0,
        totalTestCount: testCases.length,
        runtimeMs,
        memoryKb,
        errorSummary: "Execution exceeded memory limit",
      });
    }

    // 4. Status 7-12: Runtime Error (crashed during multi-test loop)
    if (statusId >= 7 && statusId <= 12) {
      console.log(`[judge-worker] Submission ${submission.id} RUNTIME_ERROR: ${effectiveStderr || statusDescription}`);
      const rawLines = (rawResult.stdout || "").trim().split("\n");
      let passedBeforeError = 0;
      for (let i = 0; i < testCases.length && i < rawLines.length; i++) {
        if (normalizeOutput(rawLines[i]) === normalizeOutput(testCases[i].expectedOutput)) {
          passedBeforeError++;
        } else {
          break;
        }
      }
      return completeJob(prisma, submission.id, {
        verdict: "RUNTIME_ERROR",
        passedTestCount: passedBeforeError,
        totalTestCount: testCases.length,
        runtimeMs,
        memoryKb,
        errorSummary: effectiveStderr || statusDescription || "Runtime error occurred",
      });
    }

    // 5. Status 13+: Internal / Judge Error
    if (statusId >= 13) {
      console.error(`[judge-worker] Submission ${submission.id} JUDGE_ERROR (status ${statusId})`);
      return completeJob(prisma, submission.id, {
        verdict: "JUDGE_ERROR",
        passedTestCount: 0,
        totalTestCount: testCases.length,
        runtimeMs,
        memoryKb,
        errorSummary: `Judge provider failure: ${statusDescription || "Status " + statusId}`,
      });
    }

    // 6. Status 3: Standard execution completed
    const rawLines = (rawResult.stdout || "").trim().split("\n");

    // Resilient fallback check: If multiple tests were submitted but driver only produced 1 line,
    // the driver may be a legacy single-test template. Fall back to batch evaluation.
    if (testCases.length > 1 && rawLines.length === 1 && normalizeOutput(rawLines[0]) === normalizeOutput(testCases[0].expectedOutput)) {
      console.warn(
        `[judge-worker] Submission ${submission.id}: legacy single-test driver detected (${rawLines.length} line output for ${testCases.length} tests). Falling back to batch runner.`
      );
      throw new Error("LEGACY_SINGLE_TEST_DRIVER");
    }

    let passedTestCount = 0;
    let firstFailingCase = null;

    for (let i = 0; i < testCases.length; i++) {
      const expected = normalizeOutput(testCases[i].expectedOutput);
      const actual = normalizeOutput(rawLines[i] ?? "");

      if (actual === expected) {
        passedTestCount++;
      } else if (!firstFailingCase) {
        const caseNumber =
          testCases[i].ordinal !== undefined
            ? testCases[i].ordinal + 1
            : i + 1;

        firstFailingCase = {
          caseNumber,
          verdict: "WRONG_ANSWER",
          errorSummary: `Wrong answer on test case #${caseNumber}`,
        };
        break; // Stop evaluating on first mismatch
      }
    }

    if (firstFailingCase) {
      console.log(
        `[judge-worker] Submission ${submission.id} FAILED test #${firstFailingCase.caseNumber}/${testCases.length}: ${firstFailingCase.verdict} (Fail-Fast)`
      );

      return completeJob(prisma, submission.id, {
        verdict: firstFailingCase.verdict,
        passedTestCount,
        totalTestCount: testCases.length,
        runtimeMs,
        memoryKb,
        errorSummary: firstFailingCase.errorSummary,
      });
    }

    // All tests passed!
    console.log(
      `[judge-worker] Submission ${submission.id} ACCEPTED (${passedTestCount}/${testCases.length} tests passed in ${runtimeMs}ms)`
    );

    return completeJob(prisma, submission.id, {
      verdict: "ACCEPTED",
      passedTestCount,
      totalTestCount: testCases.length,
      runtimeMs,
      memoryKb,
      errorSummary: null,
    });
  } catch (multiTestErr) {
    if (multiTestErr.message !== "LEGACY_SINGLE_TEST_DRIVER") {
      console.warn(
        `[judge-worker] Submission ${submission.id}: multi-test execution encountered error (${multiTestErr.message}). Falling back to chunked batch evaluation.`
      );
    }

    // --------------------------------------------------------------------------
    // RESILIENT FALLBACK: Chunked Batch Evaluation
    // --------------------------------------------------------------------------
    const chunks = [];
    for (let i = 0; i < testCases.length; i += BATCH_SIZE) {
      chunks.push(testCases.slice(i, i + BATCH_SIZE));
    }

    let maxRuntimeMs = 0;
    let maxMemoryKb = 0;
    let passedTestCount = 0;
    let firstFailure = null;

    for (const chunk of chunks) {
      const chunkExecutions = await executeBatchFallback(chunk, {
        executableSource,
        languageId,
        cpuTimeLimit,
        memoryLimitKb,
      });

      for (const { testCase, result } of chunkExecutions) {
        const { verdict, runtimeMs, errorSummary } = mapJudge0Result(
          result,
          testCase.expectedOutput
        );

        maxRuntimeMs = Math.max(maxRuntimeMs, runtimeMs);
        maxMemoryKb = Math.max(maxMemoryKb, result.memory || 0);

        if (verdict === "ACCEPTED") {
          passedTestCount++;
        } else if (!firstFailure) {
          const caseNumber =
            testCase.ordinal !== undefined
              ? testCase.ordinal + 1
              : passedTestCount + 1;

          firstFailure = {
            caseNumber,
            verdict,
            errorSummary,
          };
          break;
        }
      }

      if (firstFailure) {
        break;
      }
    }

    if (firstFailure) {
      return completeJob(prisma, submission.id, {
        verdict: firstFailure.verdict,
        passedTestCount,
        totalTestCount: testCases.length,
        runtimeMs: maxRuntimeMs,
        memoryKb: maxMemoryKb,
        errorSummary: firstFailure.errorSummary,
      });
    }

    return completeJob(prisma, submission.id, {
      verdict: "ACCEPTED",
      passedTestCount,
      totalTestCount: testCases.length,
      runtimeMs: maxRuntimeMs,
      memoryKb: maxMemoryKb,
      errorSummary: null,
    });
  }
}
