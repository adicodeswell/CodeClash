export function solve(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const copy = grid.map(row => [...row]);
  let maxArea = 0;

  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || copy[r][c] !== 1) return 0;
    copy[r][c] = 0;
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (copy[r][c] === 1) {
        maxArea = Math.max(maxArea, dfs(r, c));
      }
    }
  }

  return maxArea;
}
