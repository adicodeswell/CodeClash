export function solve(coins, amount) {
  if (amount === 0) return 0;
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (a - c >= 0) {
        dp[a] = Math.min(dp[a], 1 + dp[a - c]);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
