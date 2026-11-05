export function solve(nums) {
  let res = nums[0];
  let curMax = 1, curMin = 1;

  for (const n of nums) {
    if (n === 0) {
      curMax = 1;
      curMin = 1;
      res = Math.max(res, 0);
      continue;
    }
    const tmp = curMax * n;
    curMax = Math.max(n * curMax, n * curMin, n);
    curMin = Math.min(tmp, n * curMin, n);
    res = Math.max(res, curMax);
  }

  return res;
}
