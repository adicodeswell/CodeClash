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

  let count = 0;
  while (q.length > 0) {
    const u = q.shift();
    count++;
    for (const v of adj[u]) {
      inDegree[v]--;
      if (inDegree[v] === 0) q.push(v);
    }
  }

  return count === numCourses;
}
