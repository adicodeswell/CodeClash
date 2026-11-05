export function solve(n, edges) {
  if (edges.length !== n - 1) return false;
  const parent = Array.from({ length: n }, (_, i) => i);

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  for (const [u, v] of edges) {
    const ru = find(u);
    const rv = find(v);
    if (ru === rv) return false;
    parent[ru] = rv;
  }

  return true;
}
