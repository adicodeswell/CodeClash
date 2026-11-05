export function solve(head, k) {
  const result = [];
  const n = head.length;
  for (let i = 0; i < n; i += k) {
    if (i + k <= n) {
      for (let j = i + k - 1; j >= i; j--) {
        result.push(head[j]);
      }
    } else {
      for (let j = i; j < n; j++) {
        result.push(head[j]);
      }
    }
  }
  return result;
}
