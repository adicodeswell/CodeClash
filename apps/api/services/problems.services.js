import { prisma } from "@codeclash/db";
import { getUserProgressForProblems } from "./progress.service.js";

export async function listPublishedProblems({
  userId,
  search,
  difficulty,
  topic,
  page,
  limit,
}) {
  // Always return published problems only.
  const where = {
    status: "PUBLISHED",
  };

  // Filter by difficulty when provided.
  if (difficulty) {
    where.difficulty = difficulty;
  }

  // Filter by topic when provided.
  if (topic) {
    where.topics = {
      has: topic,
    };
  }

  // Search in title or slug.
  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        slug: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  // Calculate pagination offsets.
  const skip = (page - 1) * limit;
  const take = limit;

  // Fetch problems and total count in one transaction.
  const [problems, total] = await prisma.$transaction([
    prisma.problem.findMany({
      where,
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        slug: true,
        title: true,
        difficulty: true,
        topics: true,
      },
    }),

    prisma.problem.count({
      where,
    }),
  ]);

  // Batch-load progress for all problems in this page in a single query (zero N+1)
  const problemIds = problems.map((p) => p.id);
  const progressMap = await getUserProgressForProblems({ userId, problemIds });

  const enrichedProblems = problems.map((p) => {
    const progress = progressMap[p.id] || { isAttempted: false, isSolved: false };
    return {
      slug: p.slug,
      title: p.title,
      difficulty: p.difficulty,
      topics: p.topics,
      isAttempted: progress.isAttempted,
      isSolved: progress.isSolved,
    };
  });

  return {
    problems: enrichedProblems,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getPublishedProblemBySlug(slug, userId) {
  const problem = await prisma.problem.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    select: {
      id: true,
      slug: true,
      title: true,
      statement: true,
      difficulty: true,
      topics: true,
      timeLimitMs: true,
      memoryLimitKb: true,
      languages: true,
      testCases: true,
    },
  });

  if (!problem) return null;

  // Compute progress for this problem if user is authenticated
  let isAttempted = false;
  let isSolved = false;
  if (userId) {
    const progressMap = await getUserProgressForProblems({ userId, problemIds: [problem.id] });
    const prog = progressMap[problem.id];
    if (prog) {
      isAttempted = prog.isAttempted;
      isSolved = prog.isSolved;
    }
  }

  // Extract public sample test cases (marked as SAMPLE or first 2)
  const allTests = Array.isArray(problem.testCases) ? problem.testCases : [];
  const sampleMatches = allTests.filter((tc) => tc.visibility === "SAMPLE");
  const chosenTests = sampleMatches.length > 0 ? sampleMatches : allTests.slice(0, 2);

  const sampleTestCases = chosenTests.map((tc, idx) => ({
    id: idx + 1,
    ordinal: tc.ordinal ?? idx,
    input: tc.input,
    expected: tc.expectedOutput,
    expectedOutput: tc.expectedOutput,
  }));

  // Sanitize language templates: keep only public starter templates
  const publicLanguages = {};
  for (const [lang, config] of Object.entries(problem.languages || {})) {
    if (config.enabled) {
      publicLanguages[lang] = {
        enabled: true,
        starterTemplate: config.starterTemplate,
        // fullDriverTemplate is stripped
      };
    }
  }

  // Remove internal database ID and full testCases so hidden tests are never exposed
  delete problem.id;
  delete problem.testCases;

  return {
    ...problem,
    languages: publicLanguages,
    sampleTestCases,
    isAttempted,
    isSolved,
  };
}
