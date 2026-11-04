// Optimal O(n) time, O(n) space reference solution for Two Sum.
// Returns the 0-indexed pair [i, j] (with i < j) such that nums[i] + nums[j] == target.

export function solve(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }

    seen.set(nums[i], i);
  }

  return [];
}
