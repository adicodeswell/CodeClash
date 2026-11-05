export function solve(head, x) {
  return [...head.filter(v => v < x), ...head.filter(v => v >= x)];
}