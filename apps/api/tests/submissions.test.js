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

    const res = await ctx.fetchAuth("/api/submissions/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemSlug: "two-sum",
        language: "python",
        sourceCode: pythonCode,
      }),
    });

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
});
