import { test, before, after, describe } from "node:test";
import assert from "node:assert/strict";
import { prisma } from "@codeclash/db";
import { createTestContext } from "./helpers.js";

describe("Submissions Detail & Ownership Security Tests (GET /api/submissions/:id - Task 6)", () => {
  let ctx;
  let userA;
  let userB;
  let problem;
  let submissionA;
  let submissionB;
  const createdSubmissionIds = [];

  before(async () => {
    ctx = await createTestContext();
    userA = ctx.userA;
    userB = ctx.userB;

    const publishedProblem = await prisma.problem.findFirst({
      where: { status: "PUBLISHED" },
    });
    problem = publishedProblem;

    assert.ok(userA && userB, "Both User A and User B must exist");
    assert.ok(problem, "Published problem required");

    // Clean up any existing submissions for test users before testing
    await prisma.submission.deleteMany({
      where: { userId: { in: [userA.id, userB.id] } },
    });

    // Create a completed submission for User A with diagnostics and custom source code
    submissionA = await prisma.submission.create({
      data: {
        userId: userA.id,
        problemId: problem.id,
        language: "python",
        sourceCode: "def solution():\n    # User A proprietary solution\n    return 42\n",
        packageVersion: "1",
        status: "COMPLETED",
        verdict: "WRONG_ANSWER",
        passedTestCount: 2,
        totalTestCount: 5,
        runtimeMs: 42,
        memoryKb: 8192,
        errorSummary: "AssertionError: expected 100 but got 42 on sample test 3",
        createdAt: new Date(Date.now() - 120_000),
        completedAt: new Date(Date.now() - 119_000),
      },
    });
    createdSubmissionIds.push(submissionA.id);

    // Create a completed submission for User B
    submissionB = await prisma.submission.create({
      data: {
        userId: userB.id,
        problemId: problem.id,
        language: "javascript",
        sourceCode: "function solution() {\n  // User B proprietary code\n  return true;\n}\n",
        packageVersion: "1",
        status: "COMPLETED",
        verdict: "ACCEPTED",
        passedTestCount: 5,
        totalTestCount: 5,
        runtimeMs: 18,
        memoryKb: 4096,
        createdAt: new Date(Date.now() - 120_000),
        completedAt: new Date(Date.now() - 119_500),
      },
    });
    createdSubmissionIds.push(submissionB.id);
  });

  after(async () => {
    if (createdSubmissionIds.length > 0) {
      await prisma.submission.deleteMany({
        where: { id: { in: createdSubmissionIds } },
      });
    }
    await ctx.close();
  });

  test("rejects unauthenticated requests with 401 Unauthorized", async () => {
    const res = await ctx.fetchUnauth(`/api/submissions/${submissionA.id}`);
    assert.equal(res.status, 401);
    const body = await res.json();
    assert.ok(body.error || body.message);
  });

  test("User A can inspect their own submission detail with exact source code and metrics", async () => {
    const res = await ctx.fetchUserA(`/api/submissions/${submissionA.id}`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(body.submission);

    const sub = body.submission;
    assert.equal(sub.id, submissionA.id);
    assert.equal(sub.language, "python");
    assert.equal(sub.status, "COMPLETED");
    assert.equal(sub.verdict, "WRONG_ANSWER");
    assert.equal(sub.passedTestCount, 2);
    assert.equal(sub.totalTestCount, 5);
    assert.equal(sub.runtimeMs, 42);
    assert.equal(sub.memoryKb, 8192);
    assert.equal(
      sub.sourceCode,
      "def solution():\n    # User A proprietary solution\n    return 42\n",
      "Exact submitted source code must be returned to the owner"
    );
    assert.equal(
      sub.errorSummary,
      "AssertionError: expected 100 but got 42 on sample test 3",
      "Sanitized error diagnostics must be provided to the owner"
    );
    assert.ok(sub.problem);
    assert.equal(sub.problem.slug, problem.slug);
    assert.equal(sub.problem.title, problem.title);
    assert.equal(sub.problem.difficulty, problem.difficulty);
  });

  test("User B can inspect their own submission detail", async () => {
    const res = await ctx.fetchUserB(`/api/submissions/${submissionB.id}`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(body.submission);

    const sub = body.submission;
    assert.equal(sub.id, submissionB.id);
    assert.equal(sub.language, "javascript");
    assert.equal(sub.verdict, "ACCEPTED");
    assert.equal(
      sub.sourceCode,
      "function solution() {\n  // User B proprietary code\n  return true;\n}\n"
    );
  });

  test("CRITICAL: User B cannot view User A's submission detail (returns 404 Not Found to prevent enumeration)", async () => {
    const res = await ctx.fetchUserB(`/api/submissions/${submissionA.id}`);
    assert.equal(
      res.status,
      404,
      "Accessing another user's submission MUST return 404 Not Found, never 200 or 403"
    );
    const body = await res.json();
    assert.match(body.message || body.error, /not found/i);
    // Crucial: no source code or diagnostics must leak in error response
    assert.equal(body.submission, undefined);
    assert.equal(body.sourceCode, undefined);
  });

  test("CRITICAL: User A cannot view User B's submission detail (returns 404 Not Found)", async () => {
    const res = await ctx.fetchUserA(`/api/submissions/${submissionB.id}`);
    assert.equal(
      res.status,
      404,
      "Accessing another user's submission MUST return 404 Not Found"
    );
    const body = await res.json();
    assert.match(body.message || body.error, /not found/i);
    assert.equal(body.submission, undefined);
  });

  test("URL tampering with non-existent submission ID returns 404 Not Found", async () => {
    const nonExistentId = "cmv0000000000000000000000";
    const res = await ctx.fetchUserA(`/api/submissions/${nonExistentId}`);
    assert.equal(res.status, 404);
    const body = await res.json();
    assert.match(body.message || body.error, /not found/i);
  });

  test("URL tampering with arbitrary ID string returns 404 Not Found", async () => {
    const res = await ctx.fetchUserA("/api/submissions/arbitrary-tampered-id");
    assert.equal(res.status, 404);
    const body = await res.json();
    assert.match(body.message || body.error, /not found/i);
  });

  test("sensitive infrastructure internals are NEVER leaked in submission detail", async () => {
    const res = await ctx.fetchUserA(`/api/submissions/${submissionA.id}`);
    assert.equal(res.status, 200);
    const body = await res.json();
    const sub = body.submission;

    assert.equal(sub.judge0Token, undefined, "judge0Token must not be exposed");
    assert.equal(sub.testCases, undefined, "private testCases must not be exposed");
    assert.equal(sub.fullDriverTemplate, undefined, "driver templates must not be exposed");
    assert.equal(sub.userId, undefined, "internal userId must be stripped");
  });

  test("explicit Administrator access allows inspecting submissions with role: ADMIN", async () => {
    // Admin request for User B's submission
    const res = await ctx.fetchAdmin(`/api/submissions/${submissionB.id}`);
    assert.equal(res.status, 200, "Administrator role must have authorized access");
    const body = await res.json();
    assert.ok(body.submission);
    assert.equal(body.submission.id, submissionB.id);
    assert.equal(
      body.submission.sourceCode,
      "function solution() {\n  // User B proprietary code\n  return true;\n}\n"
    );
  });
});
