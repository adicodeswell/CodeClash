export function solve(intervals, newInterval) {
  const all = [...intervals, newInterval].sort((a, b) => a[0] - b[0]);
  const res = [all[0]];
  for (let i = 1; i < all.length; i++) {
    const last = res[res.length - 1];
    if (all[i][0] <= last[1]) {
      last[1] = Math.max(last[1], all[i][1]);
    } else {
      res.push(all[i]);
    }
  }
  return res;
}
