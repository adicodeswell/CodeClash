export function solve(board) {
  const m = board.length;
  const n = board[0].length;
  const copy = board.map(r => [...r]);
  const queue = [];

  for (let r = 0; r < m; r++) {
    if (copy[r][0] === "O") { copy[r][0] = "S"; queue.push([r, 0]); }
    if (copy[r][n - 1] === "O") { copy[r][n - 1] = "S"; queue.push([r, n - 1]); }
  }
  for (let c = 0; c < n; c++) {
    if (copy[0][c] === "O") { copy[0][c] = "S"; queue.push([0, c]); }
    if (copy[m - 1][c] === "O") { copy[m - 1][c] = "S"; queue.push([m - 1, c]); }
  }

  while (queue.length > 0) {
    const [r, c] = queue.shift();
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && copy[nr][nc] === "O") {
        copy[nr][nc] = "S";
        queue.push([nr, nc]);
      }
    }
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (copy[r][c] === "S") copy[r][c] = "O";
      else copy[r][c] = "X";
    }
  }

  return copy;
}
