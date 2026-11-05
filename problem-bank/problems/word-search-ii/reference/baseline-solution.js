export function solve(board, words) {
  const m = board.length;
  const n = board[0].length;
  const found = [];

  function exist(word) {
    function dfs(r, c, idx) {
      if (idx === word.length) return true;
      if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[idx]) return false;
      const temp = board[r][c];
      board[r][c] = "#";
      const res = dfs(r + 1, c, idx + 1) || dfs(r - 1, c, idx + 1) || dfs(r, c + 1, idx + 1) || dfs(r, c - 1, idx + 1);
      board[r][c] = temp;
      return res;
    }

    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        if (dfs(r, c, 0)) return true;
      }
    }
    return false;
  }

  for (const w of words) {
    if (exist(w)) {
      found.push(w);
    }
  }

  found.sort();
  return found;
}
