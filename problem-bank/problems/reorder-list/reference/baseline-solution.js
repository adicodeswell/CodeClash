export function solve(head) {
  const q = [...head];
  const res = [];
  while (q.length > 0) {
    res.push(q.shift());
    if (q.length > 0) res.push(q.pop());
  }
  return res;
}
