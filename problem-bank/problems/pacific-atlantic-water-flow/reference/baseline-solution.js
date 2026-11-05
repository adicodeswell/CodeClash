export function solve(heights) {
  const m = heights.length;
  const n = heights[0].length;
  const pac = Array.from({ length: m }, () => Array(n).fill(false));
  const atl = Array.from({ length: m }, () => Array(n).fill(false));

  function bfs(queue, ocean) {
    while (queue.length > 0) {
      const [r, c] = queue.shift();
      ocean[r][c] = true;
      const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && !ocean[nr][nc] && heights[nr][nc] >= heights[r][c]) {
          ocean[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
  }

  const qPac = [];
  const qAtl = [];
  for (let r = 0; r < m; r++) {
    qPac.push([r, 0]);
    qAtl.push([r, n - 1]);
  }
  for (let c = 0; c < n; c++) {
    qPac.push([0, c]);
    qAtl.push([m - 1, c]);
  }

  bfs(qPac, pac);
  bfs(qAtl, atl);

  const res = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (pac[r][c] && atl[r][c]) res.push([r, c]);
    }
  }
  res.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);
  return res;
}
