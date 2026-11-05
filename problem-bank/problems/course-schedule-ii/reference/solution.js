export function solve(numCourses, prerequisites) {
  const inDegree = Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);

  for (const [dest, src] of prerequisites) {
    adj[src].push(dest);
    inDegree[dest]++;
  }

  // Min-queue for deterministic ordering
  const available = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) available.push(i);
  }
  available.sort((a, b) => a - b);

  const order = [];
  while (available.length > 0) {
    const u = available.shift();
    order.push(u);
    for (const v of adj[u]) {
      inDegree[v]--;
      if (inDegree[v] === 0) {
        available.push(v);
        available.sort((a, b) => a - b);
      }
    }
  }

  return order;
}
