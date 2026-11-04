import { prisma } from "@codeclash/db";

/**
 * Batched lookup: computes attempted and solved status for a list of problem IDs
 * in a single database query, avoiding N+1 database roundtrips.
 *
 * @param {object} params
 * @param {string} [params.userId]
 * @param {string[]} params.problemIds
 * @returns {Promise<Record<string, { isAttempted: boolean, isSolved: boolean }>>}
 */
export async function getUserProgressForProblems({ userId, problemIds = [] }) {
  if (!userId || !Array.isArray(problemIds) || problemIds.length === 0) {
    const emptyMap = {};
    for (const id of problemIds) {
      emptyMap[id] = { isAttempted: false, isSolved: false };
    }
    return emptyMap;
  }

  // 1. Initialize clean progress state for each problem ID
  const progressMap = {};
  for (const id of problemIds) {
    progressMap[id] = { isAttempted: false, isSolved: false };
  }

  // 2. Fetch all user submissions for the batch of problem IDs in one query
  const submissions = await prisma.submission.findMany({
    where: {
      userId,
      problemId: { in: problemIds },
    },
    select: {
      problemId: true,
      verdict: true,
    },
  });

  // 3. Mark attempted and solved status.
  // Rule: Once a problem has at least 1 ACCEPTED submission, it remains solved
  // even if subsequent submissions fail.
  for (const sub of submissions) {
    const record = progressMap[sub.problemId];
    if (record) {
      record.isAttempted = true;
      if (sub.verdict === "ACCEPTED") {
        record.isSolved = true;
      }
    }
  }

  return progressMap;
}

/**
 * Aggregates overall user progress stats:
 * - Unique solved problems count (distinct problems with at least 1 ACCEPTED verdict).
 * - Unique attempted problems count (distinct problems with at least 1 submission).
 * - Algorithmic attempt count (excluding infrastructure JUDGE_ERROR).
 * - Breakdown of solved problems by difficulty.
 *
 * @param {string} userId
 * @returns {Promise<object>}
 */
export async function getUserOverallProgress(userId) {
  if (!userId) {
    return {
      totalSolved: 0,
      totalAttempted: 0,
      byDifficulty: { EASY: 0, MEDIUM: 0, HARD: 0 },
    };
  }

  // Fetch all user submissions with associated problem metadata
  const userSubmissions = await prisma.submission.findMany({
    where: { userId },
    select: {
      problemId: true,
      verdict: true,
      problem: {
        select: {
          difficulty: true,
        },
      },
    },
  });

  const attemptedProblemIds = new Set();
  const solvedProblemMap = new Map(); // problemId -> difficulty
  let algorithmAttemptCount = 0;

  for (const sub of userSubmissions) {
    attemptedProblemIds.add(sub.problemId);

    // Rule: Exclude JUDGE_ERROR from algorithmic user mistake metrics
    if (sub.verdict !== "JUDGE_ERROR") {
      algorithmAttemptCount++;
    }

    if (sub.verdict === "ACCEPTED") {
      solvedProblemMap.set(sub.problemId, sub.problem?.difficulty || "EASY");
    }
  }

  const byDifficulty = { EASY: 0, MEDIUM: 0, HARD: 0 };
  for (const difficulty of solvedProblemMap.values()) {
    if (byDifficulty[difficulty] != null) {
      byDifficulty[difficulty]++;
    }
  }

  return {
    totalSolved: solvedProblemMap.size,
    totalAttempted: attemptedProblemIds.size,
    algorithmAttemptCount,
    byDifficulty,
  };
}
