export function solve(rooms) {
  const m = rooms.length;
  const n = rooms[0].length;
  const res = rooms.map(r => [...r]);
  const q = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (res[i][j] === 0) q.push([i, j]);
    }
  }
  let head = 0;
  while (head < q.length) {
    const [r, c] = q[head++];
    const dist = res[r][c] + 1;
    const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && res[nr][nc] === 2147483647) {
        res[nr][nc] = dist;
        q.push([nr, nc]);
      }
    }
  }
  return res;
}
