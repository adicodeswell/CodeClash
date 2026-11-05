export function solve(nums) {
  const map = new Map();
  for (const x of nums) map.set(x, (map.get(x) || 0) + 1);
  for (const [k, v] of map) {
    if (v === 1) return k;
  }
  return 0;
}
