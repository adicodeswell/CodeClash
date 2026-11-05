export function solve(n) {
  const res = [];
  const cols = new Set();
  const diag1 = new Set(); // r - c
  const diag2 = new Set(); // r + c
  const board = Array.from({ length: n }, () => Array(n).fill("."));

  function backtrack(r) {
    if (r === n) {
      res.push(board.map(row => row.join("")));
      return;
    }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag1.has(r - c) || diag2.has(r + c)) continue;
      cols.add(c);
      diag1.add(r - c);
      diag2.add(r + c);
      board[r][c] = "Q";

      backtrack(r + 1);

      board[r][c] = ".";
      cols.delete(c);
      diag1.delete(r - c);
      diag2.delete(r + c);
    }
  }

  backtrack(0);

  res.sort((a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i].localeCompare(b[i]);
    }
    return 0;
  });

  return res;
}
