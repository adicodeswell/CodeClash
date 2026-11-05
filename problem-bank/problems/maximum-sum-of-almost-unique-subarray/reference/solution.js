export function solve(nums, m, k) {
  let sum = 0;
  let maxSum = 0;
  const count = new Map();

  for (let i = 0; i < k; i++) {
    sum += nums[i];
    count.set(nums[i], (count.get(nums[i]) || 0) + 1);
  }
  if (count.size >= m) maxSum = sum;

  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    const leftCount = count.get(nums[i - k]);
    if (leftCount === 1) count.delete(nums[i - k]);
    else count.set(nums[i - k], leftCount - 1);

    count.set(nums[i], (count.get(nums[i]) || 0) + 1);
    if (count.size >= m && sum > maxSum) {
      maxSum = sum;
    }
  }
  return maxSum;
}
