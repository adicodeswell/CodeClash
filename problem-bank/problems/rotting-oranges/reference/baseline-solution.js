export function solve(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const state = grid.map(r => [...r]);
  let freshCount = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (state[r][c] === 1) freshCount++;
    }
  }
  if (freshCount === 0) return 0;

  let mins = 0;
  while (true) {
    const toRot = [];
    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        if (state[r][c] === 2) {
          const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
          for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && state[nr][nc] === 1) {
              toRot.push([nr, nc]);
            }
          }
        }
      }
    }
    if (toRot.length === 0) break;
    mins++;
    for (const [r, c] of toRot) {
      if (state[r][c] === 1) {
        state[r][c] = 2;
        freshCount--;
      }
    }
  }

  return freshCount === 0 ? mins : -1;
}
