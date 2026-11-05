export function solve(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const memo = Array.from({ length: m }, () => Array(n).fill(0));

  function dfs(r, c) {
    if (memo[r][c] !== 0) return memo[r][c];
    let max = 1;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] > matrix[r][c]) {
        max = Math.max(max, 1 + dfs(nr, nc));
      }
    }
    memo[r][c] = max;
    return max;
  }

  let ans = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      ans = Math.max(ans, dfs(r, c));
    }
  }

  return ans;
}
