export function solve(mat, k) {
  const m = mat.length, n = mat[0].length;
  const pref = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      pref[r + 1][c + 1] = pref[r][c + 1] + pref[r + 1][c] - pref[r][c] + mat[r][c];
    }
  }

  const ans = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const r1 = Math.max(0, r - k);
      const c1 = Math.max(0, c - k);
      const r2 = Math.min(m - 1, r + k);
      const c2 = Math.min(n - 1, c + k);
      ans[r][c] = pref[r2 + 1][c2 + 1] - pref[r1][c2 + 1] - pref[r2 + 1][c1] + pref[r1][c1];
    }
  }
  return ans;
}
