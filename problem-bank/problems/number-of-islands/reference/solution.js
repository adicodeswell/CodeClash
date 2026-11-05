export function solve(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const copy = grid.map(row => [...row]);
  let islands = 0;

  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || copy[r][c] !== "1") return;
    copy[r][c] = "0";
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (copy[r][c] === "1") {
        islands++;
        dfs(r, c);
      }
    }
  }

  return islands;
}
