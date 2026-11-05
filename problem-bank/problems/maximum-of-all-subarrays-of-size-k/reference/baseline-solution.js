export function solve(arr, k) {
  const res = [];
  for (let i = 0; i <= arr.length - k; i++) {
    let m = arr[i];
    for (let j = i + 1; j < i + k; j++) {
      if (arr[j] > m) m = arr[j];
    }
    res.push(m);
  }
  return res;
}
