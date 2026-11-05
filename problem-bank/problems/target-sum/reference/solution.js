export function solve(nums, target) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (Math.abs(target) > sum || (sum + target) % 2 !== 0) return 0;
  const s1 = (sum + target) / 2;

  const dp = Array(s1 + 1).fill(0);
  dp[0] = 1;

  for (const n of nums) {
    for (let j = s1; j >= n; j--) {
      dp[j] += dp[j - n];
    }
  }

  return dp[s1];
}
