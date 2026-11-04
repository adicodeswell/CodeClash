import { prisma } from "@codeclash/db";

function createServiceError(statusCode, message) {
  const error = new Error(message);
  error.status = statusCode;
  error.statusCode = statusCode;
  return error;
}

export async function createSubmission({
  userId,
  problemSlug,
  language,
  sourceCode,
}) {
  // 1. Verify that the user exists and is active.
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { status: true },
  });

  if (!user || user.status !== "ACTIVE") {
    throw createServiceError(403, "User is not active");
  }

  // 2. Load trusted metadata for a published problem.
  const problem = await prisma.problem.findFirst({
    where: {
      slug: problemSlug,
      status: "PUBLISHED",
    },
    select: {
      id: true,
      languages: true,
      testCases: true,
      packageVersion: true,
    },
  });

  if (!problem) {
    throw createServiceError(
      404,
      "Problem not found or not available",
    );
  }

  // 3. Verify that the requested language is enabled.
  if (problem.languages?.[language]?.enabled !== true) {
    throw createServiceError(
      400,
      `Language '${language}' is not enabled for this problem`,
    );
  }

  // 4. Concurrency check (Zero-overhead production rule):
  // Prevent queue exhaustion by blocking a user from queueing multiple submissions simultaneously.
  const activeSubmission = await prisma.submission.findFirst({
    where: {
      userId,
      status: { in: ["QUEUED", "RUNNING"] },
    },
    select: { id: true },
  });

  if (activeSubmission) {
    const err = createServiceError(
      429,
      "You have a submission currently in progress. Please wait for it to complete.",
    );
    err.retryAfter = 2;
    throw err;
  }

  // 5. Cooldown & quota rate limits using the indexed submission history:
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
  const recentSubmissions = await prisma.submission.findMany({
    where: {
      userId,
      createdAt: { gte: oneMinuteAgo },
    },
    orderBy: { createdAt: "desc" },
    select: { createdAt: true },
  });

  // A. Cooldown: minimum 2 seconds between submissions
  if (recentSubmissions.length > 0) {
    const secondsSinceLast =
      (Date.now() - recentSubmissions[0].createdAt.getTime()) / 1000;
    if (secondsSinceLast < 2) {
      const retryAfter = Math.max(1, Math.ceil(2 - secondsSinceLast));
      const err = createServiceError(
        429,
        `Please wait ${retryAfter}s before submitting again.`,
      );
      err.retryAfter = retryAfter;
      throw err;
    }
  }

  // B. Quota: maximum 5 submissions per 60-second window
  if (recentSubmissions.length >= 5) {
    const oldestInWindow =
      recentSubmissions[recentSubmissions.length - 1].createdAt;
    const retryAfter = Math.max(
      1,
      Math.ceil((oldestInWindow.getTime() + 60000 - Date.now()) / 1000),
    );
    const err = createServiceError(
      429,
      "Submission rate limit exceeded. Please wait a minute.",
    );
    err.retryAfter = retryAfter;
    throw err;
  }

  // 6. Determine the total number of test cases.
  const totalTestCount = Array.isArray(problem.testCases)
    ? problem.testCases.length
    : 0;

  // 7. Persist the submission before any execution is attempted.
  const submission = await prisma.submission.create({
    data: {
      userId,
      problemId: problem.id,
      language,
      sourceCode,
      packageVersion: problem.packageVersion || "1",
      status: "QUEUED",
      totalTestCount,
    },
    select: {
      id: true,
      status: true,
      createdAt: true,
    },
  });

  // 8. Return only the public response fields.
  return {
    id: submission.id,
    status: submission.status,
  };
}

export async function getSubmissionById({ userId, userRole, submissionId }) {
  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
    select: {
      id: true,
      userId: true,
      language: true,
      sourceCode: true,
      status: true,
      verdict: true,
      passedTestCount: true,
      totalTestCount: true,
      runtimeMs: true,
      memoryKb: true,
      errorSummary: true,
      createdAt: true,
      completedAt: true,
      problem: {
        select: {
          slug: true,
          title: true,
          difficulty: true,
        },
      },
    },
  });

  if (!submission) {
    throw createServiceError(404, "Submission not found");
  }

  // Ownership check: users may only inspect their own submissions.
  // Explicit authorization allows administrators to inspect if role is ADMIN.
  // To avoid disclosing whether a submission exists for another user, return 404 Not Found.
  const isOwner = submission.userId === userId;
  const isAdmin = userRole === "ADMIN";

  if (!isOwner && !isAdmin) {
    throw createServiceError(404, "Submission not found");
  }

  delete submission.userId;
  return submission;
}

/**
 * Retrieve paginated submission history for a specific authenticated user.
 *
 * @param {object} params
 * @param {string} params.userId
 * @param {string} [params.cursor]
 * @param {number} [params.limit=10]
 * @returns {Promise<{ submissions: Array<object>, nextCursor: string|null }>}
 */
export async function getUserSubmissions({ userId, cursor, limit = 10, problemSlug }) {
  if (!userId) {
    throw createServiceError(401, "User ID is required");
  }

  const take = Math.min(Math.max(Number(limit) || 10, 1), 50);

  // If a cursor is provided, ensure it exists and belongs to this user
  if (cursor) {
    const cursorExists = await prisma.submission.findFirst({
      where: {
        id: cursor,
        userId,
        ...(problemSlug ? { problem: { slug: problemSlug } } : {}),
      },
      select: { id: true },
    });

    if (!cursorExists) {
      throw createServiceError(400, "Invalid pagination cursor");
    }
  }

  try {
    const records = await prisma.submission.findMany({
      where: {
        userId,
        ...(problemSlug ? { problem: { slug: problemSlug } } : {}),
      },
      take: take + 1,
      ...(cursor
        ? {
            skip: 1,
            cursor: { id: cursor },
          }
        : {}),
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      select: {
        id: true,
        language: true,
        status: true,
        verdict: true,
        passedTestCount: true,
        totalTestCount: true,
        runtimeMs: true,
        memoryKb: true,
        createdAt: true,
        completedAt: true,
        problem: {
          select: {
            slug: true,
            title: true,
            difficulty: true,
          },
        },
      },
    });

    const hasMore = records.length > take;
    const submissions = hasMore ? records.slice(0, take) : records;
    const nextCursor = hasMore ? submissions[submissions.length - 1].id : null;

    return {
      submissions,
      nextCursor,
    };
  } catch (err) {
    if (err.code === "P2025") {
      throw createServiceError(400, "Invalid pagination cursor");
    }
    throw err;
  }
}

