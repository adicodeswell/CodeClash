export function solve(inputs) {
  const q = [];
  const result = [];
  for (const t of inputs) {
    q.push(t);
    while (q.length > 0 && q[0] < t - 3000) {
      q.shift();
    }
    result.push(q.length);
  }
  return result;
}