export function solve(arr, k, threshold) {
  const target = k * threshold;
  let cur = 0;
  for (let i = 0; i < k; i++) cur += arr[i];
  let count = cur >= target ? 1 : 0;
  for (let i = k; i < arr.length; i++) {
    cur += arr[i] - arr[i - k];
    if (cur >= target) count++;
  }
  return count;
}
