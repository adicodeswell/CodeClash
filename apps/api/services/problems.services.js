import { prisma } from "@codeclash/db";

export async function listPublishedProblems({
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

  return {
    problems,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getPublishedProblemBySlug(slug) {
  const problem = await prisma.problem.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    select: {
      slug: true,
      title: true,
      statement: true,
      difficulty: true,
      topics: true,
      timeLimitMs: true,
      memoryLimitKb: true,
      languages: true,
      // testCases is deliberately omitted
    },
  });

  if (!problem) return null;

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

  return {
    ...problem,
    languages: publicLanguages,
  };
}
