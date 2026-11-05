export function solve(n, bad) {
  let l = 1, r = n;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (mid >= bad) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
}
