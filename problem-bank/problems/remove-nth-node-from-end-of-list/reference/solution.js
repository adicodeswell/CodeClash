export function solve(head, n) {
  const targetIndex = head.length - n;
  const result = [];
  for (let i = 0; i < head.length; i++) {
    if (i !== targetIndex) result.push(head[i]);
  }
  return result;
}
