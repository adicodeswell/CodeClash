export function solve(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;
  const target = total / 2;

  const dp = Array(target + 1).fill(false);
  dp[0] = true;

  for (const n of nums) {
    for (let j = target; j >= n; j--) {
      if (dp[j - n]) dp[j] = true;
    }
  }

  return dp[target];
}
