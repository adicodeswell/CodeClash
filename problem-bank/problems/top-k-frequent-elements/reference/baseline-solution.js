export function solve(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);

  const sortedEntries = [...freq.entries()].sort((a, b) => b[1] - a[1]);
  const result = sortedEntries.slice(0, k).map((e) => e[0]);
  result.sort((a, b) => a - b);
  return result;
}
