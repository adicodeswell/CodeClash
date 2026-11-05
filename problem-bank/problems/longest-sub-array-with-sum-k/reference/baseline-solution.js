export function solve(arr, k) {
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    let s = 0;
    for (let j = i; j < arr.length; j++) {
      s += arr[j];
      if (s === k) {
        max = Math.max(max, j - i + 1);
      }
    }
  }
  return max;
}
