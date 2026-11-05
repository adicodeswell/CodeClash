export function solve(times, n, k) {
  const dist = Array(n + 1).fill(Infinity);
  dist[k] = 0;

  for (let i = 1; i < n; i++) {
    for (const [u, v, w] of times) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }

  let ans = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    if (dist[i] > ans) ans = dist[i];
  }
  return ans;
}
