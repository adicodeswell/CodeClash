export function solve(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const dp = Array.from({ length: m }, () => Array(n).fill(1));

  // Flatten and sort cells by value
  const cells = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      cells.push([matrix[r][c], r, c]);
    }
  }
  cells.sort((a, b) => a[0] - b[0]);

  let maxLen = 1;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (const [val, r, c] of cells) {
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] > val) {
        dp[nr][nc] = Math.max(dp[nr][nc], dp[r][c] + 1);
        if (dp[nr][nc] > maxLen) maxLen = dp[nr][nc];
      }
    }
  }

  return maxLen;
}
