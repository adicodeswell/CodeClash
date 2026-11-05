export function solve(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const mat = matrix.map((r) => [...r]);
  let firstRowHasZero = false, firstColHasZero = false;

  for (let j = 0; j < n; j++) {
    if (mat[0][j] === 0) firstRowHasZero = true;
  }
  for (let i = 0; i < m; i++) {
    if (mat[i][0] === 0) firstColHasZero = true;
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (mat[i][j] === 0) {
        mat[i][0] = 0;
        mat[0][j] = 0;
      }
    }
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (mat[i][0] === 0 || mat[0][j] === 0) {
        mat[i][j] = 0;
      }
    }
  }

  if (firstRowHasZero) {
    for (let j = 0; j < n; j++) mat[0][j] = 0;
  }
  if (firstColHasZero) {
    for (let i = 0; i < m; i++) mat[i][0] = 0;
  }

  return mat;
}
