// Baseline O(N^2) brute-force solution for Subarray Sum Equals K.
// Computes all contiguous subarray sums to verify prefix-sum correctness.

export function solve(nums, k) {
  let totalCount = 0;

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum === k) {
        totalCount++;
      }
    }
  }

  return totalCount;
}
