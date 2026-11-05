export function solve(grid) {
  const n = grid.length;
  let low = Math.max(grid[0][0], grid[n - 1][n - 1]);
  let high = n * n - 1;

  function canReach(t) {
    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    const q = [[0, 0]];
    visited[0][0] = true;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    while (q.length > 0) {
      const [r, c] = q.shift();
      if (r === n - 1 && c === n - 1) return true;
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc] && grid[nr][nc] <= t) {
          visited[nr][nc] = true;
          q.push([nr, nc]);
        }
      }
    }
    return false;
  }

  while (low < high) {
    const mid = (low + high) >> 1;
    if (canReach(mid)) high = mid;
    else low = mid + 1;
  }

  return low;
}
