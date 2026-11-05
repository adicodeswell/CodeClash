export function solve(head, k) {
  const n = head.length;
  if (n === 0) return [];
  const rot = k % n;
  const res = new Array(n);
  for (let i = 0; i < n; i++) {
    res[(i + rot) % n] = head[i];
  }
  return res;
}