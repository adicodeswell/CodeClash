export function solve(head, pos) {
  if (head.length === 0) return false;
  return pos >= 0 && pos < head.length;
}
