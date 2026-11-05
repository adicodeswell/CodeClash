export function solve(amount, coins) {
  const n = coins.length;
  const dp = Array.from({ length: n + 1 }, () => Array(amount + 1).fill(0));
  for (let i = 0; i <= n; i++) dp[i][0] = 1;

  for (let i = 1; i <= n; i++) {
    const c = coins[i - 1];
    for (let a = 0; a <= amount; a++) {
      dp[i][a] = dp[i - 1][a] + (a >= c ? dp[i][a - c] : 0);
    }
  }

  return dp[n][amount];
}
