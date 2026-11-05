export function solve(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const visited = Array.from({ length: m }, () => Array(n).fill(false));
  let count = 0;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === "1" && !visited[r][c]) {
        count++;
        const queue = [[r, c]];
        visited[r][c] = true;
        while (queue.length > 0) {
          const [cr, cc] = queue.shift();
          const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
          for (const [dr, dc] of dirs) {
            const nr = cr + dr, nc = cc + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === "1" && !visited[nr][nc]) {
              visited[nr][nc] = true;
              queue.push([nr, nc]);
            }
          }
        }
      }
    }
  }

  return count;
}
