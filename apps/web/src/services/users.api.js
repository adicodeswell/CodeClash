import { usersAPI } from "../api/client.js";

/**
 * Fetch the authenticated user's overall problem progress metrics:
 * {
 *   attemptedCount,
 *   solvedCount,
 *   unsolvedAttemptedCount,
 *   byDifficulty: { EASY: { attempted, solved }, MEDIUM, HARD }
 * }
 */
export async function fetchUserProgress() {
  const response = await usersAPI.getMyProgress();
  return response.progress;
}
