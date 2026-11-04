// Optimal O(N) reference solution for Longest Consecutive Sequence.
// Uses a Hash Set and only expands from sequence heads (where num - 1 is absent).

export function solve(nums) {
  if (!nums || nums.length === 0) return 0;

  const set = new Set(nums);
  let longest = 0;

  for (const num of set) {
    // Only start counting if num is the start of a consecutive sequence
    if (!set.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;

      while (set.has(currentNum + 1)) {
        currentNum++;
        currentStreak++;
      }

      if (currentStreak > longest) {
        longest = currentStreak;
      }
    }
  }

  return longest;
}
