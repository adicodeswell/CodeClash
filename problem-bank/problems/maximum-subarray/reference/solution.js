export function solve(nums) {
  let curSum = 0;
  let maxSum = nums[0];
  for (const n of nums) {
    if (curSum < 0) curSum = 0;
    curSum += n;
    if (curSum > maxSum) maxSum = curSum;
  }
  return maxSum;
}
