export function solve(points) {
  const n = points.length;
  if (n <= 1) return 0;
  const edges = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const d = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
      edges.push([d, i, j]);
    }
  }
  edges.sort((a, b) => a[0] - b[0]);

  const parent = Array(n).fill(0).map((_, i) => i);
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  let cost = 0;
  let count = 0;
  for (const [d, u, v] of edges) {
    const ru = find(u);
    const rv = find(v);
    if (ru !== rv) {
      parent[ru] = rv;
      cost += d;
      count++;
      if (count === n - 1) break;
    }
  }

  return cost;
}
