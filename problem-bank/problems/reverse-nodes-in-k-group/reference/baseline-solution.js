export function solve(head, k) {
  const res = [];
  for (let i = 0; i < head.length; i += k) {
    const chunk = head.slice(i, i + k);
    if (chunk.length === k) {
      res.push(...chunk.reverse());
    } else {
      res.push(...chunk);
    }
  }
  return res;
}
