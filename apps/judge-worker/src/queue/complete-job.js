
const VALID_VERDICTS = new Set([
  "ACCEPTED",
  "WRONG_ANSWER",
  "TIME_LIMIT_EXCEEDED",
  "MEMORY_LIMIT_EXCEEDED",
  "RUNTIME_ERROR",
  "COMPILATION_ERROR",
  "JUDGE_ERROR",
]);

const MAX_ERROR_SUMMARY_LENGTH = 2000;

function sanitizeErrorSummary(summary) {
  if (summary == null || summary === "") {
    return null;
  }

  return String(summary)
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .slice(0, MAX_ERROR_SUMMARY_LENGTH);
}

/**
 * Persists a final execution result.
 *
 * @param {object} prisma
 * @param {string} submissionId
 * @param {object} result
 * @returns {Promise<object | null>}
 */
export async function completeJob(prisma, submissionId, result) {
  const {
    verdict,
    passedTestCount,
    totalTestCount,
    runtimeMs,
    memoryKb,
    errorSummary = null,
  } = result;

  if (!VALID_VERDICTS.has(verdict)) {
    throw new Error("Invalid submission verdict");
  }

  for (const [name, value] of Object.entries({
    passedTestCount,
    totalTestCount,
    runtimeMs,
    memoryKb,
  })) {
    if (
      !Number.isSafeInteger(value) ||
      value < 0 ||
      (name === "runtimeMs" && value > 2147483647) ||
      (name === "memoryKb" && value > 2147483647)
    ) {
      throw new TypeError(`Invalid ${name}`);
    }
  }

  if (passedTestCount > totalTestCount) {
    throw new RangeError(
      "passedTestCount cannot exceed totalTestCount"
    );
  }

  const safeSummary = sanitizeErrorSummary(errorSummary);

  const completedJobs = await prisma.$queryRaw`
    UPDATE "submissions"
    SET
      "status" = 'COMPLETED',
      "verdict" = CAST(${verdict} AS "SubmissionVerdict"),
      "passedTestCount" = ${passedTestCount},
      "totalTestCount" = ${totalTestCount},
      "runtimeMs" = ${runtimeMs},
      "memoryKb" = ${memoryKb},
      "completedAt" = NOW(),
      "errorSummary" = ${safeSummary},
      "errorCode" = CASE
        WHEN ${verdict} = 'JUDGE_ERROR'
          THEN COALESCE("errorCode", 'JUDGE_ERROR')
        ELSE NULL
      END,
      "judge0Token" = NULL
    WHERE "id" = ${submissionId}
      AND "status" = 'RUNNING'
    RETURNING *;
  `;

  return completedJobs[0] ?? null;
}
