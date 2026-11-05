import { test, before, after, describe } from "node:test";
import assert from "node:assert/strict";
import { prisma } from "@codeclash/db";
import { createTestContext } from "./helpers.js";
import {
  getUserProgressForProblems,
  getUserOverallProgress,
} from "../services/progress.service.js";

describe("Progress Service & User Isolation Tests (Task 4 & Task 6)", () => {
  let ctx;
  let userA;
  let userB;
  let problems = [];
  const createdSubmissionIds = [];

  before(async () => {
    ctx = await createTestContext();
    userA = ctx.userA;
    userB = ctx.userB;

    problems = await prisma.problem.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    assert.ok(userA && userB, "Both User A and User B required");
    assert.ok(problems.length >= 3, "At least three published problems required for test matrix");

    // Clean up any existing test submissions for these users
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

  async function addSubmission({ userId, problemId, verdict, createdAt = new Date(Date.now() - 120_000) }) {
    const sub = await prisma.submission.create({
      data: {
        userId,
        problemId,
        language: "python",
        sourceCode: "# progress test code",
        packageVersion: "1",
        status: "COMPLETED",
        verdict,
        passedTestCount: verdict === "ACCEPTED" ? 4 : 1,
        totalTestCount: 4,
        runtimeMs: 10,
        memoryKb: 1024,
        createdAt,
      },
    });
    createdSubmissionIds.push(sub.id);
    return sub;
  }

  test("Problem with no submissions has isAttempted=false and isSolved=false", async () => {
    const p1 = problems[0];
    const progress = await getUserProgressForProblems({
      userId: userA.id,
      problemIds: [p1.id],
    });

    assert.deepEqual(progress[p1.id], {
      isAttempted: false,
      isSolved: false,
    });
  });

  test("Problem becomes attempted after first failed submission (WRONG_ANSWER)", async () => {
    const p1 = problems[0];
    await addSubmission({ userId: userA.id, problemId: p1.id, verdict: "WRONG_ANSWER" });

    const progress = await getUserProgressForProblems({
      userId: userA.id,
      problemIds: [p1.id],
    });

    assert.equal(progress[p1.id].isAttempted, true);
    assert.equal(progress[p1.id].isSolved, false);
  });

  test("Problem becomes solved after an ACCEPTED submission", async () => {
    const p1 = problems[0];
    await addSubmission({ userId: userA.id, problemId: p1.id, verdict: "ACCEPTED" });

    const progress = await getUserProgressForProblems({
      userId: userA.id,
      problemIds: [p1.id],
    });

    assert.equal(progress[p1.id].isAttempted, true);
    assert.equal(progress[p1.id].isSolved, true);
  });

  test("Subsequent WRONG_ANSWER does not undo solved status", async () => {
    const p1 = problems[0];
    // p1 is already solved; add another failing submission
    await addSubmission({ userId: userA.id, problemId: p1.id, verdict: "WRONG_ANSWER" });

    const progress = await getUserProgressForProblems({
      userId: userA.id,
      problemIds: [p1.id],
    });

    assert.equal(
      progress[p1.id].isSolved,
      true,
      "A later wrong answer must not make a solved problem unsolved"
    );
  });

  test("Multiple accepted submissions for one problem count as one unique solved problem", async () => {
    const p1 = problems[0];
    // Add another accepted submission for p1
    await addSubmission({ userId: userA.id, problemId: p1.id, verdict: "ACCEPTED" });

    const overall = await getUserOverallProgress(userA.id);
    assert.equal(overall.totalSolved, 1);
    assert.equal(overall.totalAttempted, 1);
  });

  test("JUDGE_ERROR is excluded from algorithmic attempt counts", async () => {
    const p2 = problems[1];
    const beforeStats = await getUserOverallProgress(userA.id);

    // Add a judge error submission
    await addSubmission({ userId: userA.id, problemId: p2.id, verdict: "JUDGE_ERROR" });

    const afterStats = await getUserOverallProgress(userA.id);
    assert.equal(afterStats.totalAttempted, beforeStats.totalAttempted + 1);
    assert.equal(
      afterStats.algorithmAttemptCount,
      beforeStats.algorithmAttemptCount,
      "JUDGE_ERROR must not increment algorithmic attempt count"
    );
  });

  test("Full multi-problem progress matrix across problems", async () => {
    // Clean up User A submissions for exact matrix verification
    await prisma.submission.deleteMany({ where: { userId: userA.id } });

    // p0: No submissions -> Not attempted (0), Not solved (0)
    // p1: WRONG_ANSWER -> Attempted (1), Not solved (0)
    // p2: JUDGE_ERROR -> Attempted (1), Not solved (0), excluded from algorithmAttemptCount
    // p3: ACCEPTED -> Attempted (1), Solved (1)
    // p4: WRONG_ANSWER then ACCEPTED then RUNTIME_ERROR -> Attempted (1), Solved (1)
    const p0 = problems[0];
    const p1 = problems[1];
    const p2 = problems[2];
    const p3 = problems[3] || problems[0];
    const p4 = problems[4] || problems[1];

    await addSubmission({ userId: userA.id, problemId: p1.id, verdict: "WRONG_ANSWER" });
    await addSubmission({ userId: userA.id, problemId: p2.id, verdict: "JUDGE_ERROR" });
    if (p3.id !== p1.id && p3.id !== p2.id) {
      await addSubmission({ userId: userA.id, problemId: p3.id, verdict: "ACCEPTED" });
    }
    if (p4.id !== p1.id && p4.id !== p2.id && p4.id !== p3.id) {
      await addSubmission({ userId: userA.id, problemId: p4.id, verdict: "WRONG_ANSWER" });
      await addSubmission({ userId: userA.id, problemId: p4.id, verdict: "ACCEPTED" });
      await addSubmission({ userId: userA.id, problemId: p4.id, verdict: "RUNTIME_ERROR" });
    }

    const problemIds = [p0.id, p1.id, p2.id, p3.id, p4.id];
    const progressMap = await getUserProgressForProblems({
      userId: userA.id,
      problemIds,
    });

    assert.equal(progressMap[p0.id].isAttempted, false);
    assert.equal(progressMap[p0.id].isSolved, false);

    assert.equal(progressMap[p1.id].isAttempted, true);
    assert.equal(progressMap[p1.id].isSolved, false);

    assert.equal(progressMap[p2.id].isAttempted, true);
    assert.equal(progressMap[p2.id].isSolved, false);

    if (p3.id !== p1.id && p3.id !== p2.id) {
      assert.equal(progressMap[p3.id].isAttempted, true);
      assert.equal(progressMap[p3.id].isSolved, true);
    }

    if (p4.id !== p1.id && p4.id !== p2.id && p4.id !== p3.id) {
      assert.equal(progressMap[p4.id].isAttempted, true);
      assert.equal(progressMap[p4.id].isSolved, true);
    }
  });

  test("Catalog GET /api/problems enriches problems with user's isAttempted and isSolved", async () => {
    const res = await ctx.fetchUserA("/api/problems?limit=50");
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body.problems));

    const item0 = body.problems.find((p) => p.slug === problems[0].slug);
    const item1 = body.problems.find((p) => p.slug === problems[1].slug);

    assert.ok(item0);
    assert.equal(typeof item0.isAttempted, "boolean");
    assert.equal(typeof item0.isSolved, "boolean");

    assert.ok(item1);
    assert.equal(typeof item1.isAttempted, "boolean");
    assert.equal(typeof item1.isSolved, "boolean");
  });

  test("Ownership: User A progress does NOT leak into User B's progress", async () => {
    // User A currently has submissions; User B has zero submissions
    const resUserA = await ctx.fetchUserA("/api/users/me/progress");
    assert.equal(resUserA.status, 200);
    const dataA = await resUserA.json();

    assert.ok(dataA.progress.attemptedCount > 0, "User A should have attempted problems");

    const resUserB = await ctx.fetchUserB("/api/users/me/progress");
    assert.equal(resUserB.status, 200);
    const dataB = await resUserB.json();

    assert.equal(
      dataB.progress.attemptedCount,
      0,
      "User B has no submissions, attemptedCount must be 0"
    );
    assert.equal(
      dataB.progress.solvedCount,
      0,
      "User B has no submissions, solvedCount must be 0"
    );
  });

  test("Ownership: passing another user's ID as query parameter is safely ignored or rejected", async () => {
    // User B tries to query User A's progress by tampering with query string
    const res = await ctx.fetchUserB(`/api/users/me/progress?userId=${userA.id}`);
    assert.equal(res.status, 200);
    const body = await res.json();

    // Must still reflect User B's own progress (0), NOT User A's progress
    assert.equal(body.progress.attemptedCount, 0);
    assert.equal(body.progress.solvedCount, 0);
  });
});
