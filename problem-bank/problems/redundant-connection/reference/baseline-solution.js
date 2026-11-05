export function solve(edges) {
  const n = edges.length;
  const root = Array(n + 1).fill(0).map((_, i) => i);

  function getRoot(i) {
    while (root[i] !== i) i = root[i];
    return i;
  }

  for (const [u, v] of edges) {
    const r1 = getRoot(u);
    const r2 = getRoot(v);
    if (r1 === r2) return [u, v];
    root[r1] = r2;
  }

  return [];
}
