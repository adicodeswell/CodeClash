export function solve(arr, k, threshold) {
  let count = 0;
  for (let i = 0; i <= arr.length - k; i++) {
    let s = 0;
    for (let j = i; j < i + k; j++) s += arr[j];
    if (s >= k * threshold) count++;
  }
  return count;
}
