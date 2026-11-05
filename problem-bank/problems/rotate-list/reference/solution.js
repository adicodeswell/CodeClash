export function solve(head, k) {
  if (head.length === 0) return [];
  const shift = k % head.length;
  if (shift === 0) return head.slice();
  return head.slice(-shift).concat(head.slice(0, -shift));
}