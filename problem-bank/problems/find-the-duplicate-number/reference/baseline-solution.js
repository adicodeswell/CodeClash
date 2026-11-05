export function solve(nums) {
  const seen = new Set();
  for (const x of nums) {
    if (seen.has(x)) return x;
    seen.add(x);
  }
  return nums[0];
}
