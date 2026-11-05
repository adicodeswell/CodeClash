export function solve(head) {
  const result = [];
  for (let i = head.length - 1; i >= 0; i--) {
    result.push(head[i]);
  }
  return result;
}
