export function solve(nodes) {
  if (!nodes || nodes.length === 0) return [];
  const result = [];

  function dfs(idx) {
    if (idx === -1 || idx >= nodes.length) return;
    const [val, nextIdx, childIdx] = nodes[idx];
    result.push(val);
    if (childIdx !== -1) {
      dfs(childIdx);
    }
    if (nextIdx !== -1) {
      dfs(nextIdx);
    }
  }

  dfs(0);
  return result;
}