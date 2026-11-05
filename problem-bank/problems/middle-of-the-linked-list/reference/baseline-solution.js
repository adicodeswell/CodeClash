export function solve(head) {
  const mid = Math.floor(head.length / 2);
  return head.slice(mid);
}