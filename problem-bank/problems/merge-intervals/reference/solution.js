export function solve(intervals) {
  if (intervals.length <= 1) return intervals;
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const res = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const cur = sorted[i];
    const prev = res[res.length - 1];
    if (cur[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], cur[1]);
    } else {
      res.push(cur);
    }
  }

  return res;
}
