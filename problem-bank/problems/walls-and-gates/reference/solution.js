export function solve(rooms) {
  const m = rooms.length;
  const n = rooms[0].length;
  const copy = rooms.map(row => [...row]);
  const queue = [];

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (copy[r][c] === 0) queue.push([r, c]);
    }
  }

  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (queue.length > 0) {
    const [r, c] = queue.shift();
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && copy[nr][nc] === 2147483647) {
        copy[nr][nc] = copy[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }

  return copy;
}
