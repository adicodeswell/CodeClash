import { test, before, after, describe } from "node:test";
import assert from "node:assert/strict";
import { prisma } from "@codeclash/db";
import { createTestContext } from "./helpers.js";

describe("Submissions History & Pagination API Tests (GET /api/submissions/me - Task 6)", () => {
  let ctx;
  let userA;
  let userB;
  let problemA;
  let problemB;
  const createdSubmissionIds = [];

  // Helper to create historical submissions (backdated by 2 minutes to avoid rate-limiter interference)
  async function createHistoricalSubmission({
    userId,
    problemId,
    language = "javascript",
    sourceCode = "console.log('test');",
    verdict = "ACCEPTED",
    status = "COMPLETED",
    createdAt = new Date(Date.now() - 120_000),
    runtimeMs = 15,
    memoryKb = 4096,
  }) {
    const sub = await prisma.submission.create({
      data: {
        userId,
        problemId,
        language,
        sourceCode,
        packageVersion: "1",
        status,
        verdict,
        passedTestCount: verdict === "ACCEPTED" ? 3 : 1,
        totalTestCount: 3,
        runtimeMs,
        memoryKb,
        createdAt,
      },
    });
    createdSubmissionIds.push(sub.id);
    return sub;
  }

  before(async () => {
    ctx = await createTestContext();
    userA = ctx.userA;
    userB = ctx.userB;

    const problems = await prisma.problem.findMany({
      where: { status: "PUBLISHED" },
      take: 2,
    });
    problemA = problems[0];
    problemB = problems[1];

    assert.ok(userA && userB, "Both User A and User B must exist");
    assert.ok(problemA && problemB, "At least two published problems required");

    // Clean up any existing submissions for test users before testing
    await prisma.submission.deleteMany({
      where: { userId: { in: [userA.id, userB.id] } },
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

  test("rejects unauthenticated requests with 401 Unauthorized", async () => {
    const res = await ctx.fetchUnauth("/api/submissions/me");
    assert.equal(res.status, 401);
    const body = await res.json();
    assert.ok(body.error || body.message);
  });

  test("returns valid empty response when user has no submission history", async () => {
    const res = await ctx.fetchUserA("/api/submissions/me");
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.deepEqual(body.submissions, []);
    assert.equal(body.nextCursor, null);
  });

  test("returns newest submissions first (descending order by createdAt)", async () => {
    const t0 = new Date(Date.now() - 150_000);
    const t1 = new Date(Date.now() - 140_000);
    const t2 = new Date(Date.now() - 130_000);

    const s1 = await createHistoricalSubmission({
      userId: userA.id,
      problemId: problemA.id,
      createdAt: t0,
    });
    const s2 = await createHistoricalSubmission({
      userId: userA.id,
      problemId: problemA.id,
      createdAt: t1,
    });
    const s3 = await createHistoricalSubmission({
      userId: userA.id,
      problemId: problemA.id,
      createdAt: t2,
    });

    const res = await ctx.fetchUserA("/api/submissions/me");
    assert.equal(res.status, 200);
    const body = await res.json();

    assert.equal(body.submissions.length, 3);
    assert.equal(body.submissions[0].id, s3.id, "Newest submission must be first");
    assert.equal(body.submissions[1].id, s2.id);
    assert.equal(body.submissions[2].id, s1.id, "Oldest submission must be last");
  });

  test("returns expected submission fields and problem metadata without private secrets", async () => {
    const res = await ctx.fetchUserA("/api/submissions/me?limit=1");
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.submissions.length, 1);

    const sub = body.submissions[0];
    assert.ok(sub.id);
    assert.ok(sub.language);
    assert.ok(sub.status);
    assert.ok(sub.verdict);
    assert.ok(typeof sub.passedTestCount === "number");
    assert.ok(typeof sub.totalTestCount === "number");
    assert.ok(typeof sub.runtimeMs === "number");
    assert.ok(typeof sub.memoryKb === "number");
    assert.ok(sub.createdAt);
    assert.ok(sub.problem);
    assert.equal(sub.problem.slug, problemA.slug);
    assert.equal(sub.problem.title, problemA.title);
    assert.equal(sub.problem.difficulty, problemA.difficulty);

    // Private secrets must NOT be present
    assert.equal(sub.sourceCode, undefined, "sourceCode must not be exposed in history list");
    assert.equal(sub.judge0Token, undefined, "judge0Token must not be exposed");
    assert.equal(sub.testCases, undefined, "testCases must not be exposed");
  });

  test("supports cursor pagination across multiple pages without duplicates", async () => {
    // We already have 3 submissions for userA. Let's fetch with limit=2
    const page1Res = await ctx.fetchUserA("/api/submissions/me?limit=2");
    assert.equal(page1Res.status, 200);
    const page1 = await page1Res.json();

    assert.equal(page1.submissions.length, 2);
    assert.ok(page1.nextCursor, "Must return nextCursor when more results exist");

    // Fetch page 2 using nextCursor
    const page2Res = await ctx.fetchUserA(
      `/api/submissions/me?limit=2&cursor=${encodeURIComponent(page1.nextCursor)}`
    );
    assert.equal(page2Res.status, 200);
    const page2 = await page2Res.json();

    assert.equal(page2.submissions.length, 1);
    assert.equal(page2.nextCursor, null, "nextCursor must be null on the final page");

    // Ensure no duplicates across pages
    const page1Ids = page1.submissions.map((s) => s.id);
    const page2Ids = page2.submissions.map((s) => s.id);
    for (const id of page2Ids) {
      assert.ok(!page1Ids.includes(id), `Duplicate ID ${id} found across pages`);
    }
  });

  test("handles identical timestamps deterministically using id tie-breaker without skipping records", async () => {
    // Clear userA submissions for clean tie-breaker test
    await prisma.submission.deleteMany({ where: { userId: userA.id } });

    const fixedTime = new Date("2026-01-01T12:00:00.000Z");
    const subA = await createHistoricalSubmission({
      userId: userA.id,
      problemId: problemA.id,
      createdAt: fixedTime,
    });
    const subB = await createHistoricalSubmission({
      userId: userA.id,
      problemId: problemA.id,
      createdAt: fixedTime,
    });
    const subC = await createHistoricalSubmission({
      userId: userA.id,
      problemId: problemA.id,
      createdAt: fixedTime,
    });

    // Page 1 with limit=2
    const res1 = await ctx.fetchUserA("/api/submissions/me?limit=2");
    const p1 = await res1.json();
    assert.equal(p1.submissions.length, 2);
    assert.ok(p1.nextCursor);

    // Page 2
    const res2 = await ctx.fetchUserA(`/api/submissions/me?limit=2&cursor=${p1.nextCursor}`);
    const p2 = await res2.json();
    assert.equal(p2.submissions.length, 1);

    const allRetrievedIds = [...p1.submissions.map((s) => s.id), ...p2.submissions.map((s) => s.id)];
    const expectedIds = [subA.id, subB.id, subC.id];

    assert.equal(allRetrievedIds.length, 3);
    for (const id of expectedIds) {
      assert.ok(allRetrievedIds.includes(id), `Submission ${id} was skipped during pagination`);
    }
  });

  test("rejects invalid cursor with 400 Bad Request", async () => {
    const res = await ctx.fetchUserA("/api/submissions/me?cursor=nonexistent_invalid_cursor_id");
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.match(body.message || body.error, /invalid.*cursor/i);
  });

  test("User A cannot access User B's submissions; queries are strictly scoped to req.user.id", async () => {
    // Clean slate for isolation test
    await prisma.submission.deleteMany({
      where: { userId: { in: [userA.id, userB.id] } },
    });

    // Create 2 submissions for User A and 2 for User B
    const subA1 = await createHistoricalSubmission({
      userId: userA.id,
      problemId: problemA.id,
      sourceCode: "// User A code 1",
    });
    const subA2 = await createHistoricalSubmission({
      userId: userA.id,
      problemId: problemB.id,
      sourceCode: "// User A code 2",
    });
    const subB1 = await createHistoricalSubmission({
      userId: userB.id,
      problemId: problemA.id,
      sourceCode: "// User B code 1",
    });
    const subB2 = await createHistoricalSubmission({
      userId: userB.id,
      problemId: problemB.id,
      sourceCode: "// User B code 2",
    });

    // User A fetches their history
    const resA = await ctx.fetchUserA("/api/submissions/me");
    assert.equal(resA.status, 200);
    const bodyA = await resA.json();
    const idsA = bodyA.submissions.map((s) => s.id);

    assert.equal(idsA.length, 2);
    assert.ok(idsA.includes(subA1.id));
    assert.ok(idsA.includes(subA2.id));
    assert.ok(!idsA.includes(subB1.id), "User B's submission leaked into User A's history!");
    assert.ok(!idsA.includes(subB2.id), "User B's submission leaked into User A's history!");

    // User B fetches their history
    const resB = await ctx.fetchUserB("/api/submissions/me");
    assert.equal(resB.status, 200);
    const bodyB = await resB.json();
    const idsB = bodyB.submissions.map((s) => s.id);

    assert.equal(idsB.length, 2);
    assert.ok(idsB.includes(subB1.id));
    assert.ok(idsB.includes(subB2.id));
    assert.ok(!idsB.includes(subA1.id), "User A's submission leaked into User B's history!");
    assert.ok(!idsB.includes(subA2.id), "User A's submission leaked into User B's history!");
  });

  test("User A cannot use User B's cursor to inject or expose User B's pagination stream", async () => {
    // subB1 belongs to User B
    const userBSub = await prisma.submission.findFirst({
      where: { userId: userB.id },
    });
    assert.ok(userBSub, "User B submission required");

    // User A tries to pass User B's submission ID as a cursor
    const res = await ctx.fetchUserA(`/api/submissions/me?cursor=${userBSub.id}`);
    assert.equal(
      res.status,
      400,
      "Cross-user cursor injection must be rejected with 400 Bad Request"
    );
    const body = await res.json();
    assert.match(body.message || body.error, /invalid.*cursor/i);
  });

  test("tampering with userId in query or body parameters does not affect req.user.id scoping", async () => {
    // Attempt to pass ?userId=<userB.id> to User A's request
    const res = await ctx.fetchUserA(`/api/submissions/me?userId=${userB.id}`);
    if (res.status === 200) {
      const body = await res.json();
      for (const sub of body.submissions) {
        // Confirm no User B submissions were returned
        const rec = await prisma.submission.findUnique({ where: { id: sub.id } });
        assert.equal(rec.userId, userA.id, "Query must never return User B data");
      }
    } else {
      assert.equal(res.status, 400, "Unknown query parameters safely rejected");
    }
  });

  test("filters submissions by problemSlug while preserving user isolation", async () => {
    const res = await ctx.fetchUserA(`/api/submissions/me?problemSlug=${problemA.slug}`);
    assert.equal(res.status, 200);
    const body = await res.json();

    for (const sub of body.submissions) {
      assert.equal(sub.problem.slug, problemA.slug);
    }
  });
});
