export function solve(matrix) {
  const n = matrix.length;
  const res = Array.from({ length: n }, () => new Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      res[j][n - 1 - i] = matrix[i][j];
    }
  }
  return res;
}
