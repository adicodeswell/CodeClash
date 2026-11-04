import { test, before, after, describe } from "node:test";
import assert from "node:assert/strict";
import { prisma } from "@codeclash/db";
import { createTestContext } from "./helpers.js";
import {
  getUserProgressForProblems,
  getUserOverallProgress,
} from "../services/progress.service.js";

describe("Progress Service & Catalog Solved/Attempted Status (Task 4)", () => {
  let ctx;
  let testUser;
  let problemA;
  let problemB;
  const createdSubmissionIds = [];

  before(async () => {
    ctx = await createTestContext();
    testUser = await prisma.user.findUnique({
      where: { emailNormalized: "adi.test@example.com" },
    });
    const problems = await prisma.problem.findMany({
      where: { status: "PUBLISHED" },
      take: 2,
    });
    problemA = problems[0];
    problemB = problems[1];
    assert.ok(testUser, "Test user required");
    assert.ok(problemA && problemB, "At least two published problems required for test");

    // Clean up any existing test submissions for these problems
    await prisma.submission.deleteMany({
      where: {
        userId: testUser.id,
        problemId: { in: [problemA.id, problemB.id] },
      },
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
        sourceCode: "# test",
        packageVersion: "1",
        status: "COMPLETED",
        verdict,
        passedTestCount: verdict === "ACCEPTED" ? 4 : 1,
        totalTestCount: 4,
        runtimeMs: 10,
        memoryKb: 1024,
      },
    });
    createdSubmissionIds.push(sub.id);
    return sub;
  }

  test("Problem with no submissions has isAttempted=false and isSolved=false", async () => {
    const progress = await getUserProgressForProblems({
      userId: testUser.id,
      problemIds: [problemA.id],
    });

    assert.deepEqual(progress[problemA.id], {
      isAttempted: false,
      isSolved: false,
    });
  });

  test("Problem becomes attempted after first failed submission (WRONG_ANSWER)", async () => {
    await addSubmission({ problemId: problemA.id, verdict: "WRONG_ANSWER" });

    const progress = await getUserProgressForProblems({
      userId: testUser.id,
      problemIds: [problemA.id],
    });

    assert.equal(progress[problemA.id].isAttempted, true);
    assert.equal(progress[problemA.id].isSolved, false);
  });

  test("Problem becomes solved after an ACCEPTED submission", async () => {
    await addSubmission({ problemId: problemA.id, verdict: "ACCEPTED" });

    const progress = await getUserProgressForProblems({
      userId: testUser.id,
      problemIds: [problemA.id],
    });

    assert.equal(progress[problemA.id].isAttempted, true);
    assert.equal(progress[problemA.id].isSolved, true);
  });

  test("Subsequent WRONG_ANSWER does not undo solved status", async () => {
    // Problem A is already solved; add another failing submission
    await addSubmission({ problemId: problemA.id, verdict: "WRONG_ANSWER" });

    const progress = await getUserProgressForProblems({
      userId: testUser.id,
      problemIds: [problemA.id],
    });

    assert.equal(
      progress[problemA.id].isSolved,
      true,
      "A later wrong answer must not make a solved problem unsolved"
    );
  });

  test("Multiple accepted submissions for one problem count as one unique solved problem", async () => {
    // Add another accepted submission for problem A
    await addSubmission({ problemId: problemA.id, verdict: "ACCEPTED" });

    const overall = await getUserOverallProgress(testUser.id);
    // Problem A has multiple ACCEPTED submissions, but overall unique solved should count Problem A once
    assert.equal(overall.totalSolved, 1);
    assert.equal(overall.totalAttempted, 1);
  });

  test("JUDGE_ERROR is excluded from algorithmic attempt counts", async () => {
    const beforeStats = await getUserOverallProgress(testUser.id);

    // Add a judge error submission
    await addSubmission({ problemId: problemB.id, verdict: "JUDGE_ERROR" });

    const afterStats = await getUserOverallProgress(testUser.id);
    assert.equal(afterStats.totalAttempted, beforeStats.totalAttempted + 1);
    assert.equal(
      afterStats.algorithmAttemptCount,
      beforeStats.algorithmAttemptCount,
      "JUDGE_ERROR must not increment algorithmic attempt count"
    );
  });

  test("Catalog GET /api/problems enriches problems with user's isAttempted and isSolved", async () => {
    const res = await ctx.fetchAuth("/api/problems?limit=10");
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body.problems));

    const itemA = body.problems.find((p) => p.slug === problemA.slug);
    const itemB = body.problems.find((p) => p.slug === problemB.slug);

    assert.ok(itemA);
    assert.equal(itemA.isAttempted, true);
    assert.equal(itemA.isSolved, true);

    assert.ok(itemB);
    assert.equal(itemB.isAttempted, true);
    assert.equal(itemB.isSolved, false);
  });

  test("Problem detail GET /api/problems/:slug returns isAttempted and isSolved for the problem", async () => {
    const res = await ctx.fetchAuth(`/api/problems/${problemA.slug}`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(body.problem);
    assert.equal(body.problem.isAttempted, true);
    assert.equal(body.problem.isSolved, true);
  });
});
