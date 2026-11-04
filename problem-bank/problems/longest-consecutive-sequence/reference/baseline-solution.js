// Baseline O(N log N) sorting reference solution for Longest Consecutive Sequence.
// Sorts unique values and linearly scans for maximum contiguous run.

export function solve(nums) {
  if (!nums || nums.length === 0) return 0;

  const uniqueSorted = [...new Set(nums)].sort((a, b) => a - b);
  let longest = 1;
  let currentStreak = 1;

  for (let i = 1; i < uniqueSorted.length; i++) {
    if (uniqueSorted[i] === uniqueSorted[i - 1] + 1) {
      currentStreak++;
    } else {
      if (currentStreak > longest) longest = currentStreak;
      currentStreak = 1;
    }
  }

  return Math.max(longest, currentStreak);
}
