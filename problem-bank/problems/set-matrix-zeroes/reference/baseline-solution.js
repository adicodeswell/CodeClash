export function solve(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const mat = matrix.map((r) => [...r]);
  const zeroRows = new Set();
  const zeroCols = new Set();

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        zeroRows.add(i);
        zeroCols.add(j);
      }
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (zeroRows.has(i) || zeroCols.has(j)) {
        mat[i][j] = 0;
      }
    }
  }

  return mat;
}
