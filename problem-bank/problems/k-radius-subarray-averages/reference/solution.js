export function solve(nums, k) {
  const n = nums.length;
  const avgs = new Array(n).fill(-1);
  const windowSize = 2 * k + 1;
  if (windowSize > n) return avgs;

  let sum = 0;
  for (let i = 0; i < windowSize; i++) sum += nums[i];
  avgs[k] = Math.floor(sum / windowSize);

  for (let i = k + 1; i < n - k; i++) {
    sum += nums[i + k] - nums[i - k - 1];
    avgs[i] = Math.floor(sum / windowSize);
  }
  return avgs;
}
