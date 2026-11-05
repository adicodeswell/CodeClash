export function solve(nums) {
  const vals = [1, ...nums, 1];
  const n = vals.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));

  for (let len = 1; len <= n - 2; len++) {
    for (let l = 1; l <= n - 1 - len; l++) {
      const r = l + len - 1;
      for (let k = l; k <= r; k++) {
        const coins = vals[l - 1] * vals[k] * vals[r + 1] + dp[l][k - 1] + dp[k + 1][r];
        if (coins > dp[l][r]) dp[l][r] = coins;
      }
    }
  }

  return dp[1][n - 2];
}
