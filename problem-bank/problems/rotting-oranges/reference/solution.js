export function solve(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const copy = grid.map(r => [...r]);
  const q = [];
  let fresh = 0;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (copy[r][c] === 2) q.push([r, c, 0]);
      else if (copy[r][c] === 1) fresh++;
    }
  }

  if (fresh === 0) return 0;
  let minutes = 0;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  let head = 0;
  while (head < q.length) {
    const [r, c, d] = q[head++];
    minutes = d;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && copy[nr][nc] === 1) {
        copy[nr][nc] = 2;
        fresh--;
        q.push([nr, nc, d + 1]);
      }
    }
  }

  return fresh === 0 ? minutes : -1;
}
