export function solve(n, bad) {
  let low = 1;
  let high = n;
  let ans = n;

  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    if (mid >= bad) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return ans;
}
