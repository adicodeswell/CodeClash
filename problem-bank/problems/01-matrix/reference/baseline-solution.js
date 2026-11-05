export function solve(mat) {
  const m = mat.length;
  const n = mat[0].length;
  const dist = Array.from({ length: m }, () => Array(n).fill(Infinity));

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (mat[r][c] === 0) {
        dist[r][c] = 0;
      } else {
        if (r > 0) dist[r][c] = Math.min(dist[r][c], dist[r - 1][c] + 1);
        if (c > 0) dist[r][c] = Math.min(dist[r][c], dist[r][c - 1] + 1);
      }
    }
  }

  for (let r = m - 1; r >= 0; r--) {
    for (let c = n - 1; c >= 0; c--) {
      if (r < m - 1) dist[r][c] = Math.min(dist[r][c], dist[r + 1][c] + 1);
      if (c < n - 1) dist[r][c] = Math.min(dist[r][c], dist[r][c + 1] + 1);
    }
  }

  return dist;
}
