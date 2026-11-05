export function solve(numCourses, prerequisites) {
  const inDegree = Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);

  for (const [dest, src] of prerequisites) {
    adj[src].push(dest);
    inDegree[dest]++;
  }

  const q = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) q.push(i);
  }
  q.sort((a, b) => a - b);

  const res = [];
  while (q.length > 0) {
    const node = q.shift();
    res.push(node);
    for (const next of adj[node]) {
      inDegree[next]--;
      if (inDegree[next] === 0) {
        q.push(next);
        q.sort((a, b) => a - b);
      }
    }
  }

  return res;
}
