export function solve(intervals) {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i][1] > sorted[i + 1][0]) return false;
  }
  return true;
}
