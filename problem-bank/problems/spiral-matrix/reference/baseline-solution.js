export function solve(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const visited = Array.from({ length: m }, () => new Array(n).fill(false));
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  let r = 0, c = 0, di = 0;
  const res = [];
  for (let i = 0; i < m * n; i++) {
    res.push(matrix[r][c]);
    visited[r][c] = true;
    const nr = r + dr[di];
    const nc = c + dc[di];
    if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
      r = nr;
      c = nc;
    } else {
      di = (di + 1) % 4;
      r = r + dr[di];
      c = c + dc[di];
    }
  }
  return res;
}
