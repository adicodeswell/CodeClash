
import { listPublishedProblems } from "../services/problems.services.js";

export async function getProblems(req, res, next) {
  try {
    const {
      search,
      difficulty,
      topic,
      page,
      limit,
    } = res.locals.validatedQuery;

    const result = await listPublishedProblems({
      search,
      difficulty,
      topic,
      page,
      limit,
    });

    const {
      problems,
      total,
      totalPages,
    } = result;

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
