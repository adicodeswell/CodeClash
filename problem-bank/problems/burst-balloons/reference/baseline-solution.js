export function solve(nums) {
  const arr = [1, ...nums, 1];
  const n = arr.length;
  const memo = Array.from({ length: n }, () => Array(n).fill(-1));

  function getCoins(l, r) {
    if (l > r) return 0;
    if (memo[l][r] !== -1) return memo[l][r];
    let max = 0;
    for (let i = l; i <= r; i++) {
      const cur = arr[l - 1] * arr[i] * arr[r + 1] + getCoins(l, i - 1) + getCoins(i + 1, r);
      if (cur > max) max = cur;
    }
    memo[l][r] = max;
    return max;
  }

  return getCoins(1, n - 2);
}
