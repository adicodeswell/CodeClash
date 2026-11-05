export function solve(head, val) {
  const result = [];
  for (let i = 0; i < head.length; i++) {
    if (head[i] !== val) {
      result.push(head[i]);
    }
  }
  return result;
}