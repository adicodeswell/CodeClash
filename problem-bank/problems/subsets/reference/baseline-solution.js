export function solve(nums) {
  const n = nums.length;
  const res = [];
  for (let mask = 0; mask < (1 << n); mask++) {
    const sub = [];
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) sub.push(nums[i]);
    }
    sub.sort((a, b) => a - b);
    res.push(sub);
  }
  res.sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  });
  return res;
}
