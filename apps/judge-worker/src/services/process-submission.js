import { getJudge0LanguageId } from "../judge/language-map.js";
import { executeJudge0WithWait } from "../judge/judge0.client.js";
import { mapJudge0Result } from "../judge/verdict-mapper.js";
import { loadProblemPackage } from "../problems/load-problem-package.js";

/**
 * Executes a claimed submission against all test cases concurrently via Judge0.
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
    // Problem configuration error is an unrecoverable judge error
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
  const languageId = getJudge0LanguageId(submission.language);

  // Execute all test cases concurrently with wait=true (fast single round-trip per case)
  const caseEvaluations = await Promise.all(
    testCases.map(async (testCase, i) => {
      const result = await executeJudge0WithWait({
        sourceCode: executableSource,
        languageId,
        stdin: testCase.input,
        cpuTimeLimit,
        memoryLimitKb,
      });

      const { verdict, runtimeMs, errorSummary } = mapJudge0Result(
        result,
        testCase.expectedOutput
      );

      return {
        index: i,
        verdict,
        errorSummary,
        runtimeMs,
        memoryKb: result.memory || 0,
      };
    })
  );

  let maxRuntimeMs = 0;
  let maxMemoryKb = 0;
  let firstFailingCase = null;
  let passedTestCount = 0;

  for (const evaluation of caseEvaluations) {
    maxRuntimeMs = Math.max(maxRuntimeMs, evaluation.runtimeMs);
    maxMemoryKb = Math.max(maxMemoryKb, evaluation.memoryKb);

    if (evaluation.verdict === "ACCEPTED") {
      passedTestCount++;
    } else if (!firstFailingCase) {
      firstFailingCase = evaluation;
    }
  }

  if (firstFailingCase) {
    console.log(
      `[judge-worker] Submission ${submission.id} failed test ${firstFailingCase.index + 1}/${testCases.length}: ${firstFailingCase.verdict}`
    );

    return completeJob(prisma, submission.id, {
      verdict: firstFailingCase.verdict,
      passedTestCount,
      totalTestCount: testCases.length,
      runtimeMs: maxRuntimeMs,
      memoryKb: maxMemoryKb,
      errorSummary: firstFailingCase.errorSummary,
    });
  }

  // All test cases passed
  console.log(
    `[judge-worker] Submission ${submission.id} ACCEPTED (${passedTestCount}/${testCases.length} tests passed)`
  );

  return completeJob(prisma, submission.id, {
    verdict: "ACCEPTED",
    passedTestCount,
    totalTestCount: testCases.length,
    runtimeMs: maxRuntimeMs,
    memoryKb: maxMemoryKb,
    errorSummary: null,
  });
}
