export const normalizeOutput = (str) =>
  (str ?? "").replace(/\r\n/g, "\n").trimEnd();

/**
 * Extracts in-process execution timing from stderr if present,
 * otherwise falls back to Judge0 wall-clock time.
 */
export function extractExecutionMetrics(result) {
  let runtimeMs = Math.round((result.time || 0) * 1000);
  let cleanStderr = result.stderr || null;

  if (result.stderr && result.stderr.includes("__CODECLASH_TIME_MS__:")) {
    const match = result.stderr.match(/__CODECLASH_TIME_MS__:(\d+(?:\.\d+)?)/);
    if (match) {
      runtimeMs = Math.max(1, Math.round(Number(match[1])));
    }
    cleanStderr =
      result.stderr.replace(/__CODECLASH_TIME_MS__:[^\n]*\n?/g, "").trim() ||
      null;
  }

  return {
    runtimeMs,
    memoryKb: result.memory || 0,
    cleanStderr,
  };
}

/**
 * Maps Judge0 status and output to CodeClash SubmissionVerdict.
 */
export function mapJudge0Result(result, expectedOutput) {
  const { statusId, stdout, compileOutput, statusDescription } = result;
  const { runtimeMs, cleanStderr } = extractExecutionMetrics(result);
  const effectiveStderr = cleanStderr || null;

  // Status 6: Compilation Error
  if (statusId === 6) {
    return {
      verdict: "COMPILATION_ERROR",
      runtimeMs,
      errorSummary: compileOutput || effectiveStderr || "Compilation failed",
    };
  }

  // Status 5: Time Limit Exceeded
  if (statusId === 5) {
    return {
      verdict: "TIME_LIMIT_EXCEEDED",
      runtimeMs,
      errorSummary: "Execution exceeded time limit",
    };
  }

  // Status 7-12: Runtime Error
  if (statusId >= 7 && statusId <= 12) {
    return {
      verdict: "RUNTIME_ERROR",
      runtimeMs,
      errorSummary: effectiveStderr || statusDescription || "Runtime error occurred",
    };
  }

  // Status 13+: Internal / Judge Error
  if (statusId >= 13) {
    return {
      verdict: "JUDGE_ERROR",
      runtimeMs,
      errorSummary: "Judge execution provider error",
    };
  }

  // Status 3: Accepted (by exit code & limits) -> verify output matches expected
  if (statusId === 3) {
    const isMatch =
      normalizeOutput(stdout) === normalizeOutput(expectedOutput);
    return {
      verdict: isMatch ? "ACCEPTED" : "WRONG_ANSWER",
      runtimeMs,
      errorSummary: isMatch ? null : "Output did not match expected result",
    };
  }

  // Status 4: Wrong Answer
  return {
    verdict: "WRONG_ANSWER",
    runtimeMs,
    errorSummary: "Output did not match expected result",
  };
}
