export function solve(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;
  const target = sum / 2;

  let dp = new Set([0]);
  for (const n of nums) {
    const nextDp = new Set(dp);
    for (const t of dp) {
      if (t + n === target) return true;
      if (t + n < target) nextDp.add(t + n);
    }
    dp = nextDp;
  }

  return dp.has(target);
}
