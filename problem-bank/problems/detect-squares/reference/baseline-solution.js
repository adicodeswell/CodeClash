export function solve(operations, points) {
  const grid = {};
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const [x, y] = points[i];

    if (op === "add") {
      if (!grid[x]) grid[x] = {};
      grid[x][y] = (grid[x][y] || 0) + 1;
      result.push("null");
    } else if (op === "count") {
      let total = 0;
      for (const xStr in grid) {
        const px = Number(xStr);
        const dist = Math.abs(px - x);
        if (dist === 0) continue;

        for (const py of [y + dist, y - dist]) {
          if (grid[px] && grid[px][py] && grid[x] && grid[x][py] && grid[px][y]) {
            total += grid[px][py] * grid[x][py] * grid[px][y];
          }
        }
      }
      result.push(String(total));
    }
  }

  return result;
}
