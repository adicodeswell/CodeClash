export function solve(mat, k) {
  const m = mat.length, n = mat[0].length;
  const ans = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let s = 0;
      for (let r = Math.max(0, i - k); r <= Math.min(m - 1, i + k); r++) {
        for (let c = Math.max(0, j - k); c <= Math.min(n - 1, j + k); c++) {
          s += mat[r][c];
        }
      }
      ans[i][j] = s;
    }
  }
  return ans;
}
