export function solve(nums, k) {
  const sorted = [...nums].sort((a, b) => b - a);
  return sorted[k - 1];
}
