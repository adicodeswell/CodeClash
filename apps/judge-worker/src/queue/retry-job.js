
const MAX_RETRIES = 3;

const SAFE_ERROR_SUMMARY =
  "Execution failed due to repeated judge provider errors";

/**
 * Requeues a submission after a transient infrastructure failure.
 * After MAX_RETRIES retries, marks it as a judge error.
 *
 * @param {import("@prisma/client").PrismaClient} prisma
 * @param {string} submissionId
 * @returns {Promise<object | null>}
 */
export async function retryJob(prisma, submissionId) {
  return prisma.$transaction(async (tx) => {
    const retriedJobs = await tx.$queryRaw`
      UPDATE "submissions"
      SET
        "status" = 'QUEUED',
        "retryCount" = "retryCount" + 1,
        "startedAt" = NULL,
        "nextAttemptAt" =
          NOW() + (
            POWER(2, "retryCount" + 1) * INTERVAL '1 second'
          ),
        "errorCode" = NULL,
        "errorSummary" = NULL
      WHERE "id" = ${submissionId}
        AND "status" = 'RUNNING'
        AND "retryCount" < ${MAX_RETRIES}
      RETURNING *;
    `;

    if (retriedJobs.length > 0) {
      return retriedJobs[0];
    }

    const failedJobs = await tx.$queryRaw`
      UPDATE "submissions"
      SET
        "status" = 'COMPLETED',
        "verdict" = 'JUDGE_ERROR',
        "errorCode" = 'MAX_RETRIES_EXCEEDED',
        "errorSummary" = ${SAFE_ERROR_SUMMARY},
        "startedAt" = NULL,
        "completedAt" = NOW()
      WHERE "id" = ${submissionId}
        AND "status" = 'RUNNING'
        AND "retryCount" >= ${MAX_RETRIES}
      RETURNING *;
    `;

    return failedJobs[0] ?? null;
  });
}

export { MAX_RETRIES };
