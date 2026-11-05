export function solve(intervals, queries) {
  const res = [];
  for (const q of queries) {
    let minSize = Infinity;
    for (const [l, r] of intervals) {
      if (l <= q && q <= r) {
        const size = r - l + 1;
        if (size < minSize) minSize = size;
      }
    }
    res.push(minSize === Infinity ? -1 : minSize);
  }
  return res;
}
