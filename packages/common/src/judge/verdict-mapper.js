export const normalizeOutput = (str) =>
  (str ?? "").replace(/\r\n/g, "\n").trimEnd();

/**
 * Maps Judge0 status and output to CodeClash SubmissionVerdict.
 */
export function mapJudge0Result(result, expectedOutput) {
  const { statusId, stdout, stderr, compileOutput, statusDescription } = result;

  // Status 6: Compilation Error
  if (statusId === 6) {
    return {
      verdict: "COMPILATION_ERROR",
      errorSummary: compileOutput || stderr || "Compilation failed",
    };
  }

  // Status 5: Time Limit Exceeded
  if (statusId === 5) {
    return {
      verdict: "TIME_LIMIT_EXCEEDED",
      errorSummary: "Execution exceeded time limit",
    };
  }

  // Status 7-12: Runtime Error
  if (statusId >= 7 && statusId <= 12) {
    return {
      verdict: "RUNTIME_ERROR",
      errorSummary: stderr || statusDescription || "Runtime error occurred",
    };
  }

  // Status 13+: Internal / Judge Error
  if (statusId >= 13) {
    return {
      verdict: "JUDGE_ERROR",
      errorSummary: "Judge execution provider error",
    };
  }

  // Status 3: Accepted (by exit code & limits) -> verify output matches expected
  if (statusId === 3) {
    const isMatch =
      normalizeOutput(stdout) === normalizeOutput(expectedOutput);
    return {
      verdict: isMatch ? "ACCEPTED" : "WRONG_ANSWER",
      errorSummary: isMatch ? null : "Output did not match expected result",
    };
  }

  // Status 4: Wrong Answer
  return {
    verdict: "WRONG_ANSWER",
    errorSummary: "Output did not match expected result",
  };
}
