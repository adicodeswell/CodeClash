export function solve(head, val) {
  return head.filter(x => x !== val);
}