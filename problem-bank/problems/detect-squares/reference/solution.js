export function solve(operations, points) {
  const pointCounts = new Map();
  const uniquePoints = [];
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const [x, y] = points[i];

    if (op === "add") {
      const key = `${x},${y}`;
      const prev = pointCounts.get(key) || 0;
      if (prev === 0) uniquePoints.push([x, y]);
      pointCounts.set(key, prev + 1);
      result.push("null");
    } else if (op === "count") {
      let count = 0;
      for (const [px, py] of uniquePoints) {
        if (Math.abs(px - x) !== Math.abs(py - y) || px === x || py === y) {
          continue;
        }
        const key1 = `${px},${y}`;
        const key2 = `${x},${py}`;
        const c1 = pointCounts.get(key1) || 0;
        const c2 = pointCounts.get(key2) || 0;
        const diagCount = pointCounts.get(`${px},${py}`) || 0;
        count += diagCount * c1 * c2;
      }
      result.push(String(count));
    }
  }

  return result;
}
