import { setTimeout as sleep } from "node:timers/promises";
import { prisma } from "@codeclash/db";

import { claimJob } from "./queue/claim-job.js";
import { retryJob } from "./queue/retry-job.js";
import { completeJob } from "./queue/complete-job.js";
import { recoverStaleJobs } from "./queue/recover-stale-jobs.js";

// Execution pipeline service (Task 4 connects this to Judge0)
import { processSubmission } from "./services/process-submission.js";

const POLL_INTERVAL_MS = 1000;
const RECOVERY_INTERVAL_MS = 30_000;

let shuttingDown = false;
let isProcessingJob = false;
let shutdownPromise;

async function processClaimedJob(submission) {
  isProcessingJob = true;

  try {
    await processSubmission(submission, {
      prisma,
      completeJob,
      retryJob,
    });
  } catch (error) {
    console.error(
      `[judge-worker] Failed to process submission ${submission.id}:`,
      error,
    );

    // If an unhandled unexpected error occurs, attempt to retry or mark judge error
    try {
      await retryJob(prisma, submission.id);
    } catch (retryErr) {
      console.error(
        `[judge-worker] Failed to retry submission ${submission.id}:`,
        retryErr,
      );
    }
  } finally {
    isProcessingJob = false;
  }
}

async function runWorker() {
  console.log("[judge-worker] Worker process loop started");
  let nextRecoveryAt = 0;

  while (!shuttingDown) {
    try {
      const now = Date.now();

      if (now >= nextRecoveryAt) {
        await recoverStaleJobs(prisma);
        nextRecoveryAt = Date.now() + RECOVERY_INTERVAL_MS;
      }

      if (shuttingDown) break;

      const submission = await claimJob(prisma);

      if (!submission) {
        await sleep(POLL_INTERVAL_MS);
        continue;
      }

      await processClaimedJob(submission);
    } catch (error) {
      console.error("[judge-worker] Worker loop error:", error);

      // Avoid a hot error loop if PostgreSQL is temporarily unavailable.
      await sleep(POLL_INTERVAL_MS);
    }
  }

  console.log("[judge-worker] Worker loop stopped cleanly");
}

function shutdown(signal) {
  if (shutdownPromise) return shutdownPromise;

  shuttingDown = true;

  console.log(
    `[judge-worker] Received ${signal}; draining active work (currently processing: ${isProcessingJob})`,
  );

  shutdownPromise = (async () => {
    try {
      await workerPromise;
    } finally {
      await prisma.$disconnect();
    }
  })();

  return shutdownPromise;
}

const workerPromise = runWorker();

process.once("SIGINT", () => {
  shutdown("SIGINT").catch((error) => {
    console.error("[judge-worker] Shutdown failed:", error);
    process.exitCode = 1;
  });
});

process.once("SIGTERM", () => {
  shutdown("SIGTERM").catch((error) => {
    console.error("[judge-worker] Shutdown failed:", error);
    process.exitCode = 1;
  });
});

workerPromise.catch(async (error) => {
  console.error("[judge-worker] Fatal worker error:", error);

  try {
    await prisma.$disconnect();
  } finally {
    process.exitCode = 1;
  }
});
