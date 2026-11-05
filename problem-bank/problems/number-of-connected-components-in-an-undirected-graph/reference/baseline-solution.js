export function solve(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const visited = Array(n).fill(false);
  let count = 0;

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      count++;
      const q = [i];
      visited[i] = true;
      while (q.length > 0) {
        const u = q.shift();
        for (const v of adj[u]) {
          if (!visited[v]) {
            visited[v] = true;
            q.push(v);
          }
        }
      }
    }
  }

  return count;
}
