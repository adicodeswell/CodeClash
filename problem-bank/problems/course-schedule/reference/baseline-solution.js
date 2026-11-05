export function solve(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [dest, src] of prerequisites) {
    adj[src].push(dest);
  }

  // 0: unvisited, 1: visiting, 2: visited
  const state = Array(numCourses).fill(0);

  function hasCycle(u) {
    state[u] = 1;
    for (const v of adj[u]) {
      if (state[v] === 1) return true;
      if (state[v] === 0 && hasCycle(v)) return true;
    }
    state[u] = 2;
    return false;
  }

  for (let i = 0; i < numCourses; i++) {
    if (state[i] === 0) {
      if (hasCycle(i)) return false;
    }
  }

  return true;
}
