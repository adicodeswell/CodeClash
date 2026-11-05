export function solve(head, left, right) {
  const prefix = head.slice(0, left - 1);
  const mid = head.slice(left - 1, right).reverse();
  const suffix = head.slice(right);
  return [...prefix, ...mid, ...suffix];
}