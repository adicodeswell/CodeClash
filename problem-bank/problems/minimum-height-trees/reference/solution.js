export function solve(n, edges) {
  if (n <= 2) {
    const res = [];
    for (let i = 0; i < n; i++) res.push(i);
    return res;
  }

  const adj = Array.from({ length: n }, () => new Set());
  for (const [u, v] of edges) {
    adj[u].add(v);
    adj[v].add(u);
  }

  let leaves = [];
  for (let i = 0; i < n; i++) {
    if (adj[i].size === 1) leaves.push(i);
  }

  let remaining = n;
  while (remaining > 2) {
    remaining -= leaves.length;
    const nextLeaves = [];
    for (const leaf of leaves) {
      const neighbor = adj[leaf].values().next().value;
      adj[neighbor].delete(leaf);
      if (adj[neighbor].size === 1) {
        nextLeaves.push(neighbor);
      }
    }
    leaves = nextLeaves;
  }

  return leaves.sort((a, b) => a - b);
}
