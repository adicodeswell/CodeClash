export function solve(nums, queries) {
  const pref = new Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    pref[i + 1] = pref[i] + nums[i];
  }
  const res = [];
  for (const [l, r] of queries) {
    res.push(pref[r + 1] - pref[l]);
  }
  return res;
}
