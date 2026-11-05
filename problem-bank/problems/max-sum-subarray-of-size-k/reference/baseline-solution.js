export function solve(k, arr) {
  let max = -Infinity;
  for (let i = 0; i <= arr.length - k; i++) {
    let s = 0;
    for (let j = i; j < i + k; j++) s += arr[j];
    if (s > max) max = s;
  }
  return max;
}
