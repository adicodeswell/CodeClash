export function solve(board) {
  const m = board.length;
  const n = board[0].length;
  const res = board.map(r => [...r]);

  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || res[r][c] !== "O") return;
    res[r][c] = "E";
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < m; r++) {
    dfs(r, 0);
    dfs(r, n - 1);
  }
  for (let c = 0; c < n; c++) {
    dfs(0, c);
    dfs(m - 1, c);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (res[r][c] === "O") res[r][c] = "X";
      else if (res[r][c] === "E") res[r][c] = "O";
    }
  }

  return res;
}
