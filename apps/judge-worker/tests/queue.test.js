import { test, before, after, describe } from "node:test";
import assert from "node:assert/strict";
import { prisma } from "@codeclash/db";

import { claimJob } from "../src/queue/claim-job.js";
import { retryJob, MAX_RETRIES } from "../src/queue/retry-job.js";
import { completeJob } from "../src/queue/complete-job.js";
import { recoverStaleJobs } from "../src/queue/recover-stale-jobs.js";

describe("Queue Management & Recovery Tests (Task 3)", () => {
  let testUser;
  let testProblem;
  const createdSubmissionIds = [];

  before(async () => {
    testUser = await prisma.user.findFirst({ where: { status: "ACTIVE" } });
    testProblem = await prisma.problem.findFirst({ where: { status: "PUBLISHED" } });
    assert.ok(testUser, "Active user required for queue tests");
    assert.ok(testProblem, "Published problem required for queue tests");
  });

  after(async () => {
    if (createdSubmissionIds.length > 0) {
      await prisma.submission.deleteMany({
        where: { id: { in: createdSubmissionIds } },
      });
    }
  });

  async function createTestSubmission(overrides = {}) {
    const sub = await prisma.submission.create({
      data: {
        userId: testUser.id,
        problemId: testProblem.id,
        language: "java",
        sourceCode: "class Solution {}",
        packageVersion: "1",
        status: "QUEUED",
        totalTestCount: 5,
        nextAttemptAt: new Date(),
        ...overrides,
      },
    });
    createdSubmissionIds.push(sub.id);
    return sub;
  }

  test("claimJob atomically transitions QUEUED job to RUNNING with startedAt", async () => {
    const sub = await createTestSubmission();

    const claimed = await claimJob(prisma);
    assert.ok(claimed, "Expected to claim the queued submission");
    assert.equal(claimed.id, sub.id);
    assert.equal(claimed.status, "RUNNING");
    assert.ok(claimed.startedAt instanceof Date || typeof claimed.startedAt === "string");

    // Attempting to claim again when queue is empty returns null
    const noJob = await claimJob(prisma);
    assert.equal(noJob, null);
  });

  test("prevent duplicate claims: concurrent workers racing for 1 job claim it exactly once", async () => {
    const sub = await createTestSubmission();

    // Two workers simulate calling claimJob concurrently
    const [resultA, resultB] = await Promise.all([
      claimJob(prisma),
      claimJob(prisma),
    ]);

    const winner = resultA || resultB;
    const loser = resultA ? resultB : resultA;

    assert.ok(winner, "One worker must claim the job");
    assert.equal(winner.id, sub.id);
    assert.equal(winner.status, "RUNNING");
    assert.equal(loser, null, "The other worker must receive null");
  });

  test("retryJob increments retryCount with exponential backoff", async () => {
    const sub = await createTestSubmission({ status: "RUNNING" });

    const retried = await retryJob(prisma, sub.id);
    assert.ok(retried);
    assert.equal(retried.status, "QUEUED");
    assert.equal(retried.retryCount, 1);
    assert.equal(retried.startedAt, null);
    assert.ok(new Date(retried.nextAttemptAt).getTime() > Date.now());
  });

  test("retryJob terminates with JUDGE_ERROR once MAX_RETRIES is reached", async () => {
    const sub = await createTestSubmission({
      status: "RUNNING",
      retryCount: MAX_RETRIES,
    });

    const failed = await retryJob(prisma, sub.id);
    assert.ok(failed);
    assert.equal(failed.status, "COMPLETED");
    assert.equal(failed.verdict, "JUDGE_ERROR");
    assert.equal(failed.errorCode, "MAX_RETRIES_EXCEEDED");
    assert.ok(failed.errorSummary.includes("repeated judge provider errors"));
    assert.ok(failed.completedAt);
  });

  test("completeJob persists valid terminal verdicts, resource metrics, and timestamps", async () => {
    const sub = await createTestSubmission({ status: "RUNNING" });

    const completed = await completeJob(prisma, sub.id, {
      verdict: "ACCEPTED",
      passedTestCount: 5,
      totalTestCount: 5,
      runtimeMs: 85,
      memoryKb: 34500,
      errorSummary: null,
    });

    assert.ok(completed);
    assert.equal(completed.status, "COMPLETED");
    assert.equal(completed.verdict, "ACCEPTED");
    assert.equal(completed.passedTestCount, 5);
    assert.equal(completed.totalTestCount, 5);
    assert.equal(completed.runtimeMs, 85);
    assert.equal(completed.memoryKb, 34500);
    assert.ok(completed.completedAt);
  });

  test("completeJob rejects invalid metrics or invalid verdicts", async () => {
    const sub = await createTestSubmission({ status: "RUNNING" });

    await assert.rejects(
      async () => {
        await completeJob(prisma, sub.id, {
          verdict: "INVALID_VERDICT",
          passedTestCount: 1,
          totalTestCount: 1,
          runtimeMs: 10,
          memoryKb: 10,
        });
      },
      /Invalid submission verdict/,
    );

    await assert.rejects(
      async () => {
        await completeJob(prisma, sub.id, {
          verdict: "ACCEPTED",
          passedTestCount: 10, // Exceeds total
          totalTestCount: 5,
          runtimeMs: 10,
          memoryKb: 10,
        });
      },
      /passedTestCount cannot exceed totalTestCount/,
    );
  });

  test("recoverStaleJobs requeues stalled RUNNING jobs and fails expired ones", async () => {
    // 1. Create a stalled job with retries remaining (started 10 minutes ago)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const staleJob = await createTestSubmission({
      status: "RUNNING",
      startedAt: tenMinutesAgo,
      retryCount: 0,
    });

    // 2. Create a stalled job that has exhausted retries
    const exhaustedJob = await createTestSubmission({
      status: "RUNNING",
      startedAt: tenMinutesAgo,
      retryCount: MAX_RETRIES,
    });

    const result = await recoverStaleJobs(prisma, 5 * 60 * 1000); // 5 min timeout
    assert.ok(result.recoveredCount >= 1);
    assert.ok(result.failedCount >= 1);

    const recoveredRecord = await prisma.submission.findUnique({
      where: { id: staleJob.id },
    });
    assert.equal(recoveredRecord.status, "QUEUED");
    assert.equal(recoveredRecord.retryCount, 1);
    assert.equal(recoveredRecord.errorCode, "STALE_JOB_RECOVERED");

    const failedRecord = await prisma.submission.findUnique({
      where: { id: exhaustedJob.id },
    });
    assert.equal(failedRecord.status, "COMPLETED");
    assert.equal(failedRecord.verdict, "JUDGE_ERROR");
    assert.equal(failedRecord.errorCode, "EXECUTION_TIMEOUT");
  });
});
