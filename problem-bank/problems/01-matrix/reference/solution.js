export function solve(mat) {
  const m = mat.length;
  const n = mat[0].length;
  const dist = Array.from({ length: m }, () => Array(n).fill(-1));
  const queue = [];

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (mat[r][c] === 0) {
        dist[r][c] = 0;
        queue.push([r, c]);
      }
    }
  }

  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  let head = 0;
  while (head < queue.length) {
    const [r, c] = queue[head++];
    const curDist = dist[r][c];

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && dist[nr][nc] === -1) {
        dist[nr][nc] = curDist + 1;
        queue.push([nr, nc]);
      }
    }
  }

  return dist;
}
