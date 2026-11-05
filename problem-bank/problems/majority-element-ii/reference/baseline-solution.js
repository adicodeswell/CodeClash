export function solve(nums) {
  const map = new Map();
  for (const x of nums) map.set(x, (map.get(x) || 0) + 1);
  const threshold = Math.floor(nums.length / 3);
  const res = [];
  for (const [k, v] of map) {
    if (v > threshold) res.push(k);
  }
  return res.sort((a, b) => a - b);
}
