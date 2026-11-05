export function solve(matrix, queries) {
  const res = [];
  for (const [r1, c1, r2, c2] of queries) {
    let s = 0;
    for (let r = r1; r <= r2; r++) {
      for (let c = c1; c <= c2; c++) {
        s += matrix[r][c];
      }
    }
    res.push(s);
  }
  return res;
}
