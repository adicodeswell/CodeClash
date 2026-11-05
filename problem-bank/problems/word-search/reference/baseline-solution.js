export function solve(board, word) {
  const m = board.length;
  const n = board[0].length;
  const visited = Array.from({ length: m }, () => Array(n).fill(false));

  function search(r, c, idx) {
    if (idx === word.length) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || visited[r][c] || board[r][c] !== word[idx]) return false;
    visited[r][c] = true;
    const ok = search(r + 1, c, idx + 1) || search(r - 1, c, idx + 1) || search(r, c + 1, idx + 1) || search(r, c - 1, idx + 1);
    visited[r][c] = false;
    return ok;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (search(i, j, 0)) return true;
    }
  }
  return false;
}
