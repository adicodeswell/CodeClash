export function solve(nums, k) {
  let maxSum = -Infinity;
  for (let i = 0; i <= nums.length - k; i++) {
    let s = 0;
    for (let j = i; j < i + k; j++) s += nums[j];
    if (s > maxSum) maxSum = s;
  }
  return maxSum / k;
}
