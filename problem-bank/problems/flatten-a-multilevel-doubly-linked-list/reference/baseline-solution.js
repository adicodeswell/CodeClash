export function solve(nodes) {
  if (!nodes || nodes.length === 0) return [];
  const out = [];
  const stack = [0];
  const visited = new Set();

  while (stack.length > 0) {
    const cur = stack.pop();
    if (cur === -1 || cur >= nodes.length || visited.has(cur)) continue;
    visited.add(cur);
    const [val, nextIdx, childIdx] = nodes[cur];
    out.push(val);
    if (nextIdx !== -1) stack.push(nextIdx);
    if (childIdx !== -1) stack.push(childIdx);
  }

  return out;
}