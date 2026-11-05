export function solve(nums, k) {
  let cur = 0;
  for (let i = 0; i < k; i++) cur += nums[i];
  let max = cur;
  for (let i = k; i < nums.length; i++) {
    cur += nums[i] - nums[i - k];
    if (cur > max) max = cur;
  }
  return max / k;
}
