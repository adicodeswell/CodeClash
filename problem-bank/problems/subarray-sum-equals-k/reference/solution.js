// Optimal O(N) time, O(N) space prefix sum + frequency map for Subarray Sum Equals K.
export function solve(nums, k) {
  const prefixCounts = new Map();
  prefixCounts.set(0, 1);

  let currentSum = 0;
  let totalCount = 0;

  for (let i = 0; i < nums.length; i++) {
    currentSum += nums[i];
    const complement = currentSum - k;

    if (prefixCounts.has(complement)) {
      totalCount += prefixCounts.get(complement);
    }

    prefixCounts.set(currentSum, (prefixCounts.get(currentSum) || 0) + 1);
  }

  return totalCount;
}
