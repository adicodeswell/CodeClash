export function solve(head, nodeVal) {
  const idx = head.indexOf(nodeVal);
  const res = head.slice();
  res.splice(idx, 1);
  return res;
}