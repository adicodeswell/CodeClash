export function solve(head) {
  return head.slice().sort((a, b) => a - b);
}