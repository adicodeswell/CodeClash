export function solve(nums, queries) {
  const res = [];
  for (const [l, r] of queries) {
    let s = 0;
    for (let i = l; i <= r; i++) s += nums[i];
    res.push(s);
  }
  return res;
}
