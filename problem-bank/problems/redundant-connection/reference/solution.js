export function solve(edges) {
  const n = edges.length;
  const parent = Array.from({ length: n + 1 }, (_, i) => i);

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  function union(x, y) {
    const rx = find(x);
    const ry = find(y);
    if (rx === ry) return false;
    parent[rx] = ry;
    return true;
  }

  for (const [u, v] of edges) {
    if (!union(u, v)) return [u, v];
  }

  return [];
}
