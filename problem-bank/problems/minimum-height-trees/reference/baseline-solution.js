export function solve(n, edges) {
  if (n <= 2) {
    const res = [];
    for (let i = 0; i < n; i++) res.push(i);
    return res;
  }

  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  // BFS from every node to find max depth (height)
  function getHeight(root) {
    const q = [[root, 0]];
    const visited = new Set([root]);
    let maxD = 0;
    let head = 0;
    while (head < q.length) {
      const [u, d] = q[head++];
      if (d > maxD) maxD = d;
      for (const v of adj[u]) {
        if (!visited.has(v)) {
          visited.add(v);
          q.push([v, d + 1]);
        }
      }
    }
    return maxD;
  }

  let minH = Infinity;
  const heights = Array(n);
  for (let i = 0; i < n; i++) {
    heights[i] = getHeight(i);
    if (heights[i] < minH) minH = heights[i];
  }

  const res = [];
  for (let i = 0; i < n; i++) {
    if (heights[i] === minH) res.push(i);
  }
  return res.sort((a, b) => a - b);
}
