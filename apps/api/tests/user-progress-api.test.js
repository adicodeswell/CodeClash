import { test, before, after, describe } from "node:test";
import assert from "node:assert/strict";
import { prisma } from "@codeclash/db";
import { createTestContext } from "./helpers.js";

describe("User Progress API (GET /api/users/me/progress - Task 5)", () => {
  let ctx;
  let testUser;
  let easyProblem;
  let mediumProblem;
  const createdSubmissionIds = [];

  before(async () => {
    ctx = await createTestContext();
    testUser = await prisma.user.findUnique({
      where: { emailNormalized: "adi.test@example.com" },
    });

    const easy = await prisma.problem.findFirst({
      where: { status: "PUBLISHED", difficulty: "EASY" },
    });
    const medium = await prisma.problem.findFirst({
      where: { status: "PUBLISHED", difficulty: "MEDIUM" },
    });

    easyProblem = easy;
    mediumProblem = medium;

    assert.ok(testUser, "Test user required");
    assert.ok(easyProblem, "EASY problem required");
    assert.ok(mediumProblem, "MEDIUM problem required");

    // Clean up any existing submissions for test user
    await prisma.submission.deleteMany({
      where: { userId: testUser.id },
    });
  });

  after(async () => {
    if (createdSubmissionIds.length > 0) {
      await prisma.submission.deleteMany({
        where: { id: { in: createdSubmissionIds } },
      });
    }
    await ctx.close();
  });

  async function addSubmission({ problemId, verdict }) {
    const sub = await prisma.submission.create({
      data: {
        userId: testUser.id,
        problemId,
        language: "python",
        sourceCode: "# test code",
        packageVersion: "1",
        status: "COMPLETED",
        verdict,
        passedTestCount: verdict === "ACCEPTED" ? 4 : 1,
        totalTestCount: 4,
        runtimeMs: 15,
        memoryKb: 2048,
        createdAt: new Date(Date.now() - 120_000), // 2 minutes ago to prevent quota interference
      },
    });
    createdSubmissionIds.push(sub.id);
    return sub;
  }

  test("returns 401 Unauthorized when unauthenticated", async () => {
    const res = await fetch(`${ctx.baseUrl}/api/users/me/progress`);
    assert.equal(res.status, 401);
  });

  test("returns zero counts when user has no submissions", async () => {
    const res = await ctx.fetchAuth("/api/users/me/progress");
    assert.equal(res.status, 200);
    const body = await res.json();

    assert.ok(body.progress);
    assert.equal(body.progress.attemptedCount, 0);
    assert.equal(body.progress.solvedCount, 0);
    assert.equal(body.progress.unsolvedAttemptedCount, 0);
    assert.deepEqual(body.progress.byDifficulty.EASY, { attempted: 0, solved: 0 });
    assert.deepEqual(body.progress.byDifficulty.MEDIUM, { attempted: 0, solved: 0 });
    assert.deepEqual(body.progress.byDifficulty.HARD, { attempted: 0, solved: 0 });
  });

  test("computes accurate attempted, solved, and difficulty counts", async () => {
    // 1. Easy Problem: Attempted and Solved
    await addSubmission({ problemId: easyProblem.id, verdict: "WRONG_ANSWER" });
    await addSubmission({ problemId: easyProblem.id, verdict: "ACCEPTED" });
    // Multiple accepted submissions for the same problem must still count as 1 solved
    await addSubmission({ problemId: easyProblem.id, verdict: "ACCEPTED" });

    // 2. Medium Problem: Attempted but Unsolved (Wrong Answer)
    await addSubmission({ problemId: mediumProblem.id, verdict: "WRONG_ANSWER" });

    const res = await ctx.fetchAuth("/api/users/me/progress");
    assert.equal(res.status, 200);
    const body = await res.json();

    assert.ok(body.progress);
    // 2 distinct problems attempted
    assert.equal(body.progress.attemptedCount, 2);
    // 1 distinct problem solved
    assert.equal(body.progress.solvedCount, 1);
    // 1 unsolved attempted problem
    assert.equal(body.progress.unsolvedAttemptedCount, 1);

    // Difficulty breakdown verification
    assert.deepEqual(body.progress.byDifficulty.EASY, {
      attempted: 1,
      solved: 1,
    });
    assert.deepEqual(body.progress.byDifficulty.MEDIUM, {
      attempted: 1,
      solved: 0,
    });
    assert.deepEqual(body.progress.byDifficulty.HARD, {
      attempted: 0,
      solved: 0,
    });
  });

  test("subsequent failure does not revoke solved status", async () => {
    // Add a wrong answer to the already solved easyProblem
    await addSubmission({ problemId: easyProblem.id, verdict: "WRONG_ANSWER" });

    const res = await ctx.fetchAuth("/api/users/me/progress");
    assert.equal(res.status, 200);
    const body = await res.json();

    assert.equal(body.progress.solvedCount, 1, "Solved count must remain 1");
    assert.equal(body.progress.byDifficulty.EASY.solved, 1);
  });

  test("JUDGE_ERROR does not count as an accepted solution", async () => {
    // Medium problem receives JUDGE_ERROR
    await addSubmission({ problemId: mediumProblem.id, verdict: "JUDGE_ERROR" });

    const res = await ctx.fetchAuth("/api/users/me/progress");
    assert.equal(res.status, 200);
    const body = await res.json();

    assert.equal(body.progress.solvedCount, 1);
    assert.equal(body.progress.byDifficulty.MEDIUM.solved, 0);
  });
});
