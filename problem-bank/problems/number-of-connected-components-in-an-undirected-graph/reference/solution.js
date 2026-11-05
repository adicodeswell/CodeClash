export function solve(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  let comps = n;
  for (const [u, v] of edges) {
    const ru = find(u);
    const rv = find(v);
    if (ru !== rv) {
      parent[ru] = rv;
      comps--;
    }
  }

  return comps;
}
