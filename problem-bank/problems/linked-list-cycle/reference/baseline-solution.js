export function solve(head, pos) {
  const visited = new Set();
  let cur = 0;
  while (cur < head.length) {
    if (visited.has(cur)) return true;
    visited.add(cur);
    if (cur === head.length - 1) {
      if (pos === -1) return false;
      cur = pos;
    } else {
      cur++;
    }
  }
  return false;
}
