export function solve(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  let dp = Array(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    const cur = Array(n + 1).fill(0);
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        cur[j] = 1 + dp[j - 1];
      } else {
        cur[j] = Math.max(cur[j - 1], dp[j]);
      }
    }
    dp = cur;
  }

  return dp[n];
}
