import { test, before, after, describe } from "node:test";
import assert from "node:assert/strict";
import { prisma } from "@codeclash/db";
import { createTestContext } from "./helpers.js";

describe("Submissions API Tests (/api/submissions)", () => {
  let ctx;
  let createdSubmissionId = null;

  before(async () => {
    ctx = await createTestContext();
    // Clean up any test submissions from prior runs for test user
    await prisma.submission.deleteMany({
      where: { user: { emailNormalized: "adi.test@example.com" } },
    });
  });

  after(async () => {
    if (createdSubmissionId) {
      await prisma.submission.deleteMany({
        where: { user: { emailNormalized: "adi.test@example.com" } },
      });
    }
    await ctx.close();
  });

  test("returns 401 when submission creation is unauthenticated", async () => {
    const res = await fetch(`${ctx.baseUrl}/api/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemSlug: "two-sum",
        language: "java",
        sourceCode: "class Solution {}",
      }),
    });
    assert.equal(res.status, 401);
  });

  test("returns 401 when status retrieval is unauthenticated", async () => {
    const res = await fetch(`${ctx.baseUrl}/api/submissions/sub_test123`);
    assert.equal(res.status, 401);
  });

  test("creates a queued submission and returns 202 Accepted", async () => {
    const res = await ctx.fetchAuth("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemSlug: "two-sum",
        language: "java",
        sourceCode: "class Solution { public int[] twoSum(int[] nums, int target) { return new int[]{0, 1}; } }",
      }),
    });

    assert.equal(res.status, 202);
    const body = await res.json();
    assert.ok(body.submission);
    assert.ok(body.submission.id);
    assert.equal(body.submission.status, "QUEUED");
    createdSubmissionId = body.submission.id;

    // Fetch the created submission via GET /api/submissions/:id
    const statusRes = await ctx.fetchAuth(`/api/submissions/${body.submission.id}`);
    assert.equal(statusRes.status, 200);
    const statusBody = await statusRes.json();
    assert.ok(statusBody.submission);
    assert.equal(statusBody.submission.id, body.submission.id);
    assert.equal(statusBody.submission.status, "QUEUED");
    assert.equal(statusBody.submission.language, "java");
    assert.ok(typeof statusBody.submission.totalTestCount === "number");
    assert.ok(statusBody.submission.totalTestCount > 0);
  });

  test("blocks concurrent submissions when a submission is QUEUED or RUNNING (429)", async () => {
    // Attempt another submission while the previous one is still QUEUED
    const res = await ctx.fetchAuth("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemSlug: "two-sum",
        language: "java",
        sourceCode: "class Solution {}",
      }),
    });

    assert.equal(res.status, 429);
    const body = await res.json();
    assert.ok(body.message.includes("in progress"));
  });

  test("enforces cooldown when previous submission finishes (429)", async () => {
    // Simulate worker completing the first submission
    await prisma.submission.update({
      where: { id: createdSubmissionId },
      data: { status: "COMPLETED", verdict: "ACCEPTED" },
    });

    // Submitting immediately without waiting for the 2s cooldown
    const res = await ctx.fetchAuth("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemSlug: "two-sum",
        language: "java",
        sourceCode: "class Solution {}",
      }),
    });

    assert.equal(res.status, 429);
    assert.ok(res.headers.get("retry-after"));
  });

  test("rejects unknown or unpublished problem with 404", async () => {
    // Wait for the 2s cooldown
    await new Promise((resolve) => setTimeout(resolve, 2100));

    const res = await ctx.fetchAuth("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemSlug: "non-existent-problem",
        language: "java",
        sourceCode: "class Solution {}",
      }),
    });

    assert.equal(res.status, 404);
  });

  test("rejects unsupported language with 400", async () => {
    await new Promise((resolve) => setTimeout(resolve, 2100));

    const res = await ctx.fetchAuth("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemSlug: "two-sum",
        language: "rust",
        sourceCode: "fn main() {}",
      }),
    });

    assert.equal(res.status, 400);
  });

  test("rejects missing or empty source code with 400", async () => {
    const res = await ctx.fetchAuth("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemSlug: "two-sum",
        language: "java",
        sourceCode: "",
      }),
    });

    assert.equal(res.status, 400);
  });

  test("rejects unexpected fields due to strict schema", async () => {
    const res = await ctx.fetchAuth("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemSlug: "two-sum",
        language: "java",
        sourceCode: "class Solution {}",
        verdict: "ACCEPTED",
      }),
    });

    assert.equal(res.status, 400);
  });

  test("returns 404 for non-existent submission ID", async () => {
    const res = await ctx.fetchAuth("/api/submissions/non-existent-submission-id");
    assert.equal(res.status, 404);
  });

  test("returns 401 when run request is unauthenticated", async () => {
    const res = await fetch(`${ctx.baseUrl}/api/submissions/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemSlug: "two-sum",
        language: "python",
        sourceCode: "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        return [0, 1]",
      }),
    });
    assert.equal(res.status, 401);
  });

  test("POST /api/submissions/run executes against real sample test cases and returns pass/fail status", async () => {
    const pythonCode = `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, n in enumerate(nums):
            diff = target - n
            if diff in seen:
                return [seen[diff], i]
            seen[n] = i
        return []`;

    let res = await ctx.fetchAuth("/api/submissions/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemSlug: "two-sum",
        language: "python",
        sourceCode: pythonCode,
      }),
    });

    // In case public Judge0 CE server has transient latency spike
    if (res.status === 502) {
      await new Promise((r) => setTimeout(r, 2000));
      res = await ctx.fetchAuth("/api/submissions/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemSlug: "two-sum",
          language: "python",
          sourceCode: pythonCode,
        }),
      });
    }

    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(body.result);
    assert.equal(body.result.type, "RUN");
    assert.equal(body.result.status, "COMPLETED");
    assert.equal(body.result.verdict, "ACCEPTED");
    assert.ok(Array.isArray(body.result.testCases));
    assert.ok(body.result.testCases.length > 0);
    assert.equal(body.result.passedTestCount, body.result.totalTestCount);

    // Each test case must have real input, expected output, actual output, and passed boolean
    for (const tc of body.result.testCases) {
      assert.ok(tc.input, "test case must have real input");
      assert.ok(tc.expectedOutput, "test case must have real expectedOutput");
      assert.ok(tc.actualOutput != null, "test case must have actualOutput");
      assert.equal(tc.passed, true, "all test cases should pass for correct code");
    }
  });

  test("returns 401 when submission history is unauthenticated", async () => {
    const res = await fetch(`${ctx.baseUrl}/api/submissions/me`);
    assert.equal(res.status, 401);
  });

  test("GET /api/submissions/me returns paginated submission history for authenticated user", async () => {
    const testUser = await prisma.user.findUnique({
      where: { emailNormalized: "adi.test@example.com" },
    });
    // Insert 2 dummy submissions for test user to verify ordering and structure
    const problem = await prisma.problem.findFirst({ where: { slug: "two-sum" } });
    const sub1 = await prisma.submission.create({
      data: {
        userId: testUser.id,
        problemId: problem.id,
        language: "python",
        sourceCode: "print(1)",
        packageVersion: "1",
        status: "COMPLETED",
        verdict: "ACCEPTED",
        runtimeMs: 15,
        memoryKb: 512,
        createdAt: new Date(Date.now() - 10000),
      },
    });

    const sub2 = await prisma.submission.create({
      data: {
        userId: testUser.id,
        problemId: problem.id,
        language: "javascript",
        sourceCode: "console.log(2)",
        packageVersion: "1",
        status: "COMPLETED",
        verdict: "WRONG_ANSWER",
        runtimeMs: 20,
        memoryKb: 1024,
        createdAt: new Date(),
      },
    });

    const res = await ctx.fetchAuth("/api/submissions/me?limit=10");
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body.submissions));
    assert.ok(body.submissions.length >= 2);

    // Verify ordering: newest (sub2) first
    const ids = body.submissions.map((s) => s.id);
    const idx2 = ids.indexOf(sub2.id);
    const idx1 = ids.indexOf(sub1.id);
    assert.ok(idx2 !== -1 && idx1 !== -1);
    assert.ok(idx2 < idx1, "newer submission sub2 must appear before sub1");

    // Verify projection & security: problem metadata present, sourceCode absent
    const item = body.submissions.find((s) => s.id === sub2.id);
    assert.ok(item.problem);
    assert.equal(item.problem.slug, "two-sum");
    assert.equal(item.problem.title, "Two Sum");
    assert.equal(item.language, "javascript");
    assert.equal(item.verdict, "WRONG_ANSWER");
    assert.equal(item.sourceCode, undefined, "sourceCode must not be leaked in history list");

    // Clean up
    await prisma.submission.deleteMany({
      where: { id: { in: [sub1.id, sub2.id] } },
    });
  });

  test("GET /api/submissions/me supports cursor pagination", async () => {
    const testUser = await prisma.user.findUnique({
      where: { emailNormalized: "adi.test@example.com" },
    });
    const problem = await prisma.problem.findFirst({ where: { slug: "two-sum" } });
    const s1 = await prisma.submission.create({
      data: {
        userId: testUser.id,
        problemId: problem.id,
        language: "python",
        sourceCode: "1",
        packageVersion: "1",
        status: "COMPLETED",
        createdAt: new Date(Date.now() - 5000),
      },
    });
    const s2 = await prisma.submission.create({
      data: {
        userId: testUser.id,
        problemId: problem.id,
        language: "python",
        sourceCode: "2",
        packageVersion: "1",
        status: "COMPLETED",
        createdAt: new Date(),
      },
    });

    // Page 1 with limit=1
    const p1 = await ctx.fetchAuth("/api/submissions/me?limit=1");
    assert.equal(p1.status, 200);
    const b1 = await p1.json();
    assert.equal(b1.submissions.length, 1);
    assert.ok(b1.nextCursor != null, "nextCursor must be returned when more items exist");

    // Page 2 using cursor
    const p2 = await ctx.fetchAuth(`/api/submissions/me?limit=1&cursor=${b1.nextCursor}`);
    assert.equal(p2.status, 200);
    const b2 = await p2.json();
    assert.equal(b2.submissions.length, 1);
    assert.notEqual(b1.submissions[0].id, b2.submissions[0].id, "cursor page must advance to next record");

    // Clean up
    await prisma.submission.deleteMany({
      where: { id: { in: [s1.id, s2.id] } },
    });
  });

  test("GET /api/submissions/me rejects invalid cursor with 400", async () => {
    const res = await ctx.fetchAuth("/api/submissions/me?cursor=nonexistent_invalid_cursor_id");
    assert.equal(res.status, 400);
  });

  test("Task 2: pending submissions preserve null verdict until execution completes", async () => {
    const testUser = await prisma.user.findUnique({
      where: { emailNormalized: "adi.test@example.com" },
    });
    const problem = await prisma.problem.findFirst({ where: { slug: "two-sum" } });

    const pendingSub = await prisma.submission.create({
      data: {
        userId: testUser.id,
        problemId: problem.id,
        language: "python",
        sourceCode: "pass",
        packageVersion: "1",
        status: "RUNNING",
        verdict: null,
        passedTestCount: 0,
        totalTestCount: 4,
        runtimeMs: null,
        memoryKb: null,
      },
    });

    const res = await ctx.fetchAuth(`/api/submissions/${pendingSub.id}`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.submission.status, "RUNNING");
    assert.equal(body.submission.verdict, null, "Pending submission must have a null verdict");
    assert.equal(body.submission.runtimeMs, null);
    assert.equal(body.submission.memoryKb, null);

    // Clean up
    await prisma.submission.delete({ where: { id: pendingSub.id } });
  });

  test("Task 2: history API returns accurate metrics and distinguishes JUDGE_ERROR from user errors", async () => {
    const testUser = await prisma.user.findUnique({
      where: { emailNormalized: "adi.test@example.com" },
    });
    const problem = await prisma.problem.findFirst({ where: { slug: "two-sum" } });

    const judgeErrSub = await prisma.submission.create({
      data: {
        userId: testUser.id,
        problemId: problem.id,
        language: "python",
        sourceCode: "pass",
        packageVersion: "1",
        status: "COMPLETED",
        verdict: "JUDGE_ERROR",
        errorCode: "PROVIDER_OUTAGE",
        errorSummary: "Judge execution provider error",
        passedTestCount: 0,
        totalTestCount: 4,
        runtimeMs: 0,
        memoryKb: 0,
      },
    });

    const acceptedSub = await prisma.submission.create({
      data: {
        userId: testUser.id,
        problemId: problem.id,
        language: "python",
        sourceCode: "pass",
        packageVersion: "1",
        status: "COMPLETED",
        verdict: "ACCEPTED",
        passedTestCount: 4,
        totalTestCount: 4,
        runtimeMs: 42,
        memoryKb: 52140,
      },
    });

    const res = await ctx.fetchAuth("/api/submissions/me?limit=5");
    assert.equal(res.status, 200);
    const body = await res.json();

    const returnedJudgeErr = body.submissions.find((s) => s.id === judgeErrSub.id);
    const returnedAccepted = body.submissions.find((s) => s.id === acceptedSub.id);

    assert.ok(returnedJudgeErr);
    assert.equal(returnedJudgeErr.verdict, "JUDGE_ERROR", "Must be JUDGE_ERROR, not WRONG_ANSWER");
    assert.notEqual(returnedJudgeErr.verdict, "WRONG_ANSWER");

    assert.ok(returnedAccepted);
    assert.equal(returnedAccepted.verdict, "ACCEPTED");
    assert.equal(returnedAccepted.runtimeMs, 42);
    assert.equal(returnedAccepted.memoryKb, 52140);
    assert.equal(returnedAccepted.passedTestCount, 4);
    assert.equal(returnedAccepted.totalTestCount, 4);

    // Clean up
    await prisma.submission.deleteMany({
      where: { id: { in: [judgeErrSub.id, acceptedSub.id] } },
    });
  });

  test("Task 3: returns full submission detail including exact submitted sourceCode and problem metadata", async () => {
    const testUser = await prisma.user.findUnique({
      where: { emailNormalized: "adi.test@example.com" },
    });
    const problem = await prisma.problem.findFirst({ where: { slug: "two-sum" } });

    const submissionCode = "def twoSum(nums, target):\n    # Exact submission code\n    return [0, 1]\n";
    const sub = await prisma.submission.create({
      data: {
        userId: testUser.id,
        problemId: problem.id,
        language: "python",
        sourceCode: submissionCode,
        packageVersion: "1",
        status: "COMPLETED",
        verdict: "ACCEPTED",
        passedTestCount: 4,
        totalTestCount: 4,
        runtimeMs: 14,
        memoryKb: 51200,
        errorSummary: null,
      },
    });

    const res = await ctx.fetchAuth(`/api/submissions/${sub.id}`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(body.submission);

    // Verify exact original source code
    assert.equal(body.submission.sourceCode, submissionCode);
    assert.equal(body.submission.language, "python");
    assert.equal(body.submission.status, "COMPLETED");
    assert.equal(body.submission.verdict, "ACCEPTED");
    assert.equal(body.submission.runtimeMs, 14);
    assert.equal(body.submission.memoryKb, 51200);
    assert.equal(body.submission.passedTestCount, 4);
    assert.equal(body.submission.totalTestCount, 4);

    // Verify associated problem metadata
    assert.ok(body.submission.problem);
    assert.equal(body.submission.problem.slug, "two-sum");
    assert.equal(body.submission.problem.title, "Two Sum");

    // Clean up
    await prisma.submission.delete({ where: { id: sub.id } });
  });

  test("Task 3: cross-user isolation returns 404 Not Found to prevent enumeration", async () => {
    const testUser = await prisma.user.findUnique({
      where: { emailNormalized: "adi.test@example.com" },
    });
    const problem = await prisma.problem.findFirst({ where: { slug: "two-sum" } });

    const sub = await prisma.submission.create({
      data: {
        userId: testUser.id,
        problemId: problem.id,
        language: "python",
        sourceCode: "private user code",
        packageVersion: "1",
        status: "COMPLETED",
        verdict: "ACCEPTED",
      },
    });

    // Generate JWT cookie for a completely different user
    const jwtModule = await import("jsonwebtoken");
    const otherToken = jwtModule.default.sign(
      { sub: "different-user-999" },
      process.env.JWT_SECRET || "replace-with-a-long-random-secret"
    );

    const res = await fetch(`${ctx.baseUrl}/api/submissions/${sub.id}`, {
      headers: { cookie: `token=${otherToken}` },
    });

    // Must return 404 Not Found, never 403 or 200, to prevent disclosure of other user's records
    assert.equal(res.status, 404);
    const body = await res.json();
    assert.equal(body.submission, undefined);

    // Clean up
    await prisma.submission.delete({ where: { id: sub.id } });
  });
});
