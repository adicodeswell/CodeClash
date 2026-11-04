// Baseline O(n^2) brute-force solution for Two Sum.
// Rigorously asserts that exactly one valid index pair exists to catch test-authoring flaws.

export function solve(nums, target) {
  const matches = [];

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        matches.push([i, j]);
      }
    }
  }

  if (matches.length === 0) {
    throw new Error(`Invalid test case: no solution found for target ${target}`);
  }

  if (matches.length > 1) {
    throw new Error(
      `Invalid test case: expected exactly 1 pair, but found ${matches.length} pairs`
    );
  }

  return matches[0];
}
