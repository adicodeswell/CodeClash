export function solve(s) {
  const n = s.length;
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = s[0] === "0" ? 0 : 1;

  for (let i = 2; i <= n; i++) {
    const one = Number(s[i - 1]);
    const two = Number(s.substring(i - 2, i));
    if (one >= 1 && one <= 9) dp[i] += dp[i - 1];
    if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
  }

  return dp[n];
}
