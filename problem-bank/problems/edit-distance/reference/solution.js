export function solve(word1, word2) {
  const m = word1.length, n = word2.length;
  let dp = Array.from({ length: n + 1 }, (_, i) => i);

  for (let i = 1; i <= m; i++) {
    const cur = Array(n + 1).fill(0);
    cur[0] = i;
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        cur[j] = dp[j - 1];
      } else {
        cur[j] = 1 + Math.min(cur[j - 1], dp[j], dp[j - 1]);
      }
    }
    dp = cur;
  }

  return dp[n];
}
