export function solve(intervals) {
  if (intervals.length <= 1) return 0;
  const sorted = [...intervals].sort((a, b) => a[1] - b[1]);
  let kept = 1;
  let lastEnd = sorted[0][1];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i][0] >= lastEnd) {
      kept++;
      lastEnd = sorted[i][1];
    }
  }

  return intervals.length - kept;
}
