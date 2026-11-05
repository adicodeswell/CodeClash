export function solve(adjList) {
  const n = adjList.length;
  const nodes = new Map();
  for (let i = 1; i <= n; i++) nodes.set(i, []);
  for (let i = 0; i < n; i++) {
    const u = i + 1;
    for (const v of adjList[i]) {
      nodes.get(u).push(v);
    }
  }
  const result = [];
  for (let i = 1; i <= n; i++) {
    const list = [...nodes.get(i)].sort((a, b) => a - b);
    result.push(list);
  }
  return result;
}
