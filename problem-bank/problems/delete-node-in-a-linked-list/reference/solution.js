export function solve(head, nodeVal) {
  const result = [];
  for (let i = 0; i < head.length; i++) {
    if (head[i] !== nodeVal) {
      result.push(head[i]);
    }
  }
  return result;
}