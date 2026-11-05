export function solve(times, n, k) {
  const adj = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) {
    adj[u].push([v, w]);
  }

  const dist = Array(n + 1).fill(Infinity);
  dist[k] = 0;

  // Simple Dijkstra with priority array
  const visited = Array(n + 1).fill(false);

  for (let step = 0; step < n; step++) {
    let u = -1;
    for (let i = 1; i <= n; i++) {
      if (!visited[i] && (u === -1 || dist[i] < dist[u])) {
        u = i;
      }
    }
    if (dist[u] === Infinity) break;
    visited[u] = true;

    for (const [v, w] of adj[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }

  let maxTime = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    if (dist[i] > maxTime) maxTime = dist[i];
  }
  return maxTime;
}
