import { getUserOverallProgress } from "../services/progress.service.js";

/**
 * GET /api/users/me/progress
 * Retrieves distinct solved, attempted, and difficulty breakdown metrics
 * derived directly from the authenticated user's submission history.
 */
export async function getMyProgress(req, res, next) {
  try {
    const userId = req.user.id;
    const progress = await getUserOverallProgress(userId);

    return res.status(200).json({
      progress: {
        attemptedCount: progress.attemptedCount,
        solvedCount: progress.solvedCount,
        unsolvedAttemptedCount: progress.unsolvedAttemptedCount,
        byDifficulty: progress.byDifficulty,
      },
    });
  } catch (err) {
    return next(err);
  }
}
