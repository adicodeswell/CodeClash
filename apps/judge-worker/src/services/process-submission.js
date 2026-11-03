import { getJudge0LanguageId } from "../judge/language-map.js";
import {
  createJudge0Submission,
  pollJudge0Submission,
} from "../judge/judge0.client.js";
import { mapJudge0Result } from "../judge/verdict-mapper.js";
import { loadProblemPackage } from "../problems/load-problem-package.js";

/**
 * Executes a claimed submission against all test cases sequentially via Judge0.
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

  let maxRuntimeMs = 0;
  let maxMemoryKb = 0;
  let passedTestCount = 0;

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];

    // 1. Submit test run to Judge0
    const token = await createJudge0Submission({
      sourceCode: executableSource,
      languageId,
      stdin: testCase.input,
      cpuTimeLimit,
      memoryLimitKb,
    });

    // 2. Persist the provider token on the submission
    await prisma.submission.update({
      where: { id: submission.id },
      data: {
        judge0Token: token,
        currentTestIndex: i,
      },
    });

    // 3. Poll for terminal result
    const result = await pollJudge0Submission(token);

    // 4. Update resource usage
    maxRuntimeMs = Math.max(
      maxRuntimeMs,
      Math.round((result.time || 0) * 1000)
    );
    maxMemoryKb = Math.max(maxMemoryKb, result.memory || 0);

    // 5. Evaluate verdict against expected output
    const { verdict, errorSummary } = mapJudge0Result(
      result,
      testCase.expectedOutput
    );

    if (verdict === "ACCEPTED") {
      passedTestCount++;
    } else {
      // Early exit on first failing test case
      console.log(
        `[judge-worker] Submission ${submission.id} failed test ${i + 1}/${testCases.length}: ${verdict}`
      );

      return completeJob(prisma, submission.id, {
        verdict,
        passedTestCount,
        totalTestCount: testCases.length,
        runtimeMs: maxRuntimeMs,
        memoryKb: maxMemoryKb,
        errorSummary,
      });
    }
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
