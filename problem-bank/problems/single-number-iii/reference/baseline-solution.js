export function solve(nums) {
  const map = new Map();
  for (const n of nums) {
    map.set(n, (map.get(n) || 0) + 1);
  }
  const res = [];
  for (const [k, v] of map.entries()) {
    if (v === 1) res.push(k);
  }
  res.sort((x, y) => x - y);
  return res;
}