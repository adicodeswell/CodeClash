export function solve(adjList) {
  // A deep clone returns the exact same adjacency structure
  const cloned = adjList.map(neighbors => [...neighbors].sort((a, b) => a - b));
  return cloned;
}
