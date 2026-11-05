export function solve(s, t) {
  const m = s.length, n = t.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = 1;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = dp[i - 1][j] + (s[i - 1] === t[j - 1] ? dp[i - 1][j - 1] : 0);
    }
  }

  return dp[m][n];
}
