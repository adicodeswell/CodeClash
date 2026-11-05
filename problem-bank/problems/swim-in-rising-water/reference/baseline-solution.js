export function solve(grid) {
  const n = grid.length;
  // Dijkstra on grid
  const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));
  dist[0][0] = grid[0][0];
  const q = [[grid[0][0], 0, 0]];

  while (q.length > 0) {
    q.sort((a, b) => a[0] - b[0]);
    const [d, r, c] = q.shift();
    if (r === n - 1 && c === n - 1) return d;
    if (d > dist[r][c]) continue;

    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
        const nextD = Math.max(d, grid[nr][nc]);
        if (nextD < dist[nr][nc]) {
          dist[nr][nc] = nextD;
          q.push([nextD, nr, nc]);
        }
      }
    }
  }

  return dist[n - 1][n - 1];
}
