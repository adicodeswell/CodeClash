import { listPublishedProblems } from "../services/problems.services.js";

export async function getProblems(req, res, next) {
  try {
    const { search, difficulty, topic, page, limit } =
      res.locals.validatedQuery;

    const result = await listPublishedProblems({
      search,
      difficulty,
      topic,
      page,
      limit,
    });

    const { problems, total, totalPages } = result;

    return res.status(200).json({
      problems,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (err) {
    next(err);
  }
}

import { getPublishedProblemBySlug } from "../services/problems.services.js";

export async function getProblemDetail(req, res, next) {
  try {
    const { slug } = res.locals.validatedParams || req.params;
    const problem = await getPublishedProblemBySlug(slug);

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    return res.status(200).json({ problem });
  } catch (err) {
    next(err);
  }
}
