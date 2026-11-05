export function solve(k, arr) {
  let cur = 0;
  for (let i = 0; i < k; i++) cur += arr[i];
  let max = cur;
  for (let i = k; i < arr.length; i++) {
    cur += arr[i] - arr[i - k];
    if (cur > max) max = cur;
  }
  return max;
}
