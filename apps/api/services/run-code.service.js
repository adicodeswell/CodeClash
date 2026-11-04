import prisma from "@codeclash/db";
import {
  getJudge0LanguageId,
  executeJudge0WithWait,
  mapJudge0Result,
  extractExecutionMetrics,
  normalizeOutput,
  wrapSourceWithTiming,
} from "@codeclash/common";

function createServiceError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.status = statusCode;
  return error;
}

/**
 * Runs code synchronously against sample/public test cases using Judge0.
 *
 * @param {object} params
 * @param {string} params.problemSlug
 * @param {string} params.language
 * @param {string} params.sourceCode
 * @returns {Promise<object>} Detailed test case results and pass/fail indicators
 */
export async function executeRunCode({ problemSlug, language, sourceCode }) {
  const problem = await prisma.problem.findFirst({
    where: {
      slug: problemSlug,
      status: "PUBLISHED",
    },
  });

  if (!problem) {
    throw createServiceError(404, "Problem not found or not available");
  }

  const langConfig = problem.languages?.[language];
  if (!langConfig || !langConfig.enabled) {
    throw createServiceError(400, `Language "${language}" is not enabled for this problem`);
  }

  const driverTemplate = langConfig.fullDriverTemplate;
  if (!driverTemplate) {
    throw createServiceError(500, "Problem driver harness is missing for this language");
  }

  // Safe substitution without interpreting special replacement patterns
  const timedSource = wrapSourceWithTiming(sourceCode, language);
  const executableSource = driverTemplate.replace("{{USER_CODE}}", () => timedSource);

  const allTests = Array.isArray(problem.testCases) ? problem.testCases : [];
  const sampleMatches = allTests.filter((tc) => tc.visibility === "SAMPLE");
  const sampleCases = sampleMatches.length > 0 ? sampleMatches : allTests.slice(0, 2);

  if (sampleCases.length === 0) {
    throw createServiceError(500, "No sample test cases configured for this problem");
  }

  const languageId = getJudge0LanguageId(language);
  const cpuTimeLimit = Math.max(1, Math.ceil(problem.timeLimitMs / 1000));
  const memoryLimitKb = problem.memoryLimitKb || 262144;

  try {
    // Execute all sample test cases concurrently with wait=true (fast single round-trip)
    const rawResults = await Promise.all(
      sampleCases.map((tc) =>
        executeJudge0WithWait({
          sourceCode: executableSource,
          languageId,
          stdin: tc.input,
          cpuTimeLimit,
          memoryLimitKb,
        })
      )
    );

    // 3. Map individual results and compare outputs
    let passedCount = 0;
    let maxRuntimeMs = 0;
    let maxMemoryKb = 0;
    let compilationError = null;
    let runtimeError = null;

    const evaluatedCases = rawResults.map((res, idx) => {
      const tc = sampleCases[idx];
      const { verdict, runtimeMs, errorSummary } = mapJudge0Result(res, tc.expectedOutput);
      const { cleanStderr } = extractExecutionMetrics(res);
      const memoryKb = res.memory || 0;

      maxRuntimeMs = Math.max(maxRuntimeMs, runtimeMs);
      maxMemoryKb = Math.max(maxMemoryKb, memoryKb);

      const passed = verdict === "ACCEPTED";

      if (passed) {
        passedCount++;
      }

      if (verdict === "COMPILATION_ERROR" && !compilationError) {
        compilationError = errorSummary;
      }
      if (verdict === "RUNTIME_ERROR" && !runtimeError) {
        runtimeError = errorSummary;
      }

      return {
        id: idx + 1,
        ordinal: tc.ordinal ?? idx,
        input: tc.input,
        expected: tc.expectedOutput,
        expectedOutput: tc.expectedOutput,
        actualOutput: normalizeOutput(res.stdout),
        passed,
        status: verdict,
        runtimeMs,
        memoryKb,
        error: res.compileOutput || cleanStderr || null,
      };
    });

    // 4. Derive overall verdict
    let overallVerdict = "ACCEPTED";
    let overallErrorSummary = null;

    if (compilationError) {
      overallVerdict = "COMPILATION_ERROR";
      overallErrorSummary = compilationError;
    } else if (runtimeError && passedCount === 0) {
      overallVerdict = "RUNTIME_ERROR";
      overallErrorSummary = runtimeError;
    } else if (passedCount === sampleCases.length) {
      overallVerdict = "ACCEPTED";
    } else {
      overallVerdict = "WRONG_ANSWER";
    }

    return {
      type: "RUN",
      status: "COMPLETED",
      verdict: overallVerdict,
      passedTestCount: passedCount,
      totalTestCount: sampleCases.length,
      runtimeMs: maxRuntimeMs,
      memoryKb: maxMemoryKb,
      errorSummary: overallErrorSummary,
      testCases: evaluatedCases,
    };
  } catch (err) {
    console.error("[run-code.service] Execution failed:", err.message);
    throw createServiceError(502, `Code execution service error: ${err.message}`);
  }
}
