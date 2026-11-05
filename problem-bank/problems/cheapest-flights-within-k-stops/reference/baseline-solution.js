export function solve(n, flights, src, dst, k) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v, p] of flights) {
    adj[u].push([v, p]);
  }

  // BFS with stops
  const dist = Array(n).fill(Infinity);
  dist[src] = 0;
  const q = [[src, 0, 0]]; // [u, cost, stops]

  while (q.length > 0) {
    const [u, cost, stops] = q.shift();
    if (stops > k) continue;

    for (const [v, p] of adj[u]) {
      if (cost + p < dist[v]) {
        dist[v] = cost + p;
        q.push([v, cost + p, stops + 1]);
      }
    }
  }

  return dist[dst] === Infinity ? -1 : dist[dst];
}
