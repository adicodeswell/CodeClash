import { MAX_RETRIES } from "./retry-job.js";

const DEFAULT_STALE_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Finds and recovers jobs that have been in the RUNNING state beyond the timeout threshold.
 * Requeues jobs that have not exceeded MAX_RETRIES with an exponential backoff.
 * Fails jobs that have reached MAX_RETRIES with a terminal JUDGE_ERROR.
 *
 * @param {import("@prisma/client").PrismaClient} prisma
 * @param {number} [timeoutMs=300000]
 * @returns {Promise<{ recoveredCount: number, failedCount: number }>}
 */
export async function recoverStaleJobs(
  prisma,
  timeoutMs = DEFAULT_STALE_TIMEOUT_MS,
) {
  return prisma.$transaction(async (tx) => {
    // 1. Requeue stale jobs that have retries remaining
    const requeued = await tx.$queryRaw`
      UPDATE "submissions"
      SET
        "status" = 'QUEUED',
        "retryCount" = "retryCount" + 1,
        "startedAt" = NULL,
        "nextAttemptAt" =
          NOW() + (
            POWER(2, "retryCount" + 1) * INTERVAL '1 second'
          ),
        "errorCode" = 'STALE_JOB_RECOVERED',
        "errorSummary" = 'Worker stalled or died; job automatically requeued'
      WHERE "status" = 'RUNNING'
        AND "startedAt" < NOW() - (${timeoutMs} * INTERVAL '1 millisecond')
        AND "retryCount" < ${MAX_RETRIES}
      RETURNING "id";
    `;

    // 2. Terminate stale jobs that have exhausted their retries
    const failed = await tx.$queryRaw`
      UPDATE "submissions"
      SET
        "status" = 'COMPLETED',
        "verdict" = 'JUDGE_ERROR',
        "errorCode" = 'EXECUTION_TIMEOUT',
        "errorSummary" = 'Execution stalled beyond timeout and exceeded retry limit',
        "startedAt" = NULL,
        "completedAt" = NOW()
      WHERE "status" = 'RUNNING'
        AND "startedAt" < NOW() - (${timeoutMs} * INTERVAL '1 millisecond')
        AND "retryCount" >= ${MAX_RETRIES}
      RETURNING "id";
    `;

    if (requeued.length > 0 || failed.length > 0) {
      console.warn(
        `[judge-worker] Stale jobs sweep: ${requeued.length} requeued, ${failed.length} marked as JUDGE_ERROR`,
      );
    }

    return {
      recoveredCount: requeued.length,
      failedCount: failed.length,
    };
  });
}
