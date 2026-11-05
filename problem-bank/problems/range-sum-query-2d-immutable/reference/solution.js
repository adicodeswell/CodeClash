export function solve(matrix, queries) {
  const m = matrix.length, n = matrix[0].length;
  const pref = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      pref[r + 1][c + 1] = pref[r][c + 1] + pref[r + 1][c] - pref[r][c] + matrix[r][c];
    }
  }
  const res = [];
  for (const [r1, c1, r2, c2] of queries) {
    const sum = pref[r2 + 1][c2 + 1] - pref[r1][c2 + 1] - pref[r2 + 1][c1] + pref[r1][c1];
    res.push(sum);
  }
  return res;
}
