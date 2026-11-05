export function solve(nums, k) {
  const n = nums.length;
  const avgs = [];
  const w = 2 * k + 1;
  for (let i = 0; i < n; i++) {
    if (i - k < 0 || i + k >= n) {
      avgs.push(-1);
    } else {
      let s = 0;
      for (let j = i - k; j <= i + k; j++) s += nums[j];
      avgs.push(Math.floor(s / w));
    }
  }
  return avgs;
}
