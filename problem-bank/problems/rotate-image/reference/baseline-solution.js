export function solve(matrix) {
  const n = matrix.length;
  const mat = matrix.map((row) => [...row]);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const temp = mat[i][j];
      mat[i][j] = mat[j][i];
      mat[j][i] = temp;
    }
  }
  for (let i = 0; i < n; i++) {
    mat[i].reverse();
  }
  return mat;
}
