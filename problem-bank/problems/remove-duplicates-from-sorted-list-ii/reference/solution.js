export function solve(head) {
  const counts = new Map();
  for (const v of head) {
    counts.set(v, (counts.get(v) || 0) + 1);
  }
  const result = [];
  for (const v of head) {
    if (counts.get(v) === 1) {
      result.push(v);
    }
  }
  return result;
}