export function solve(arr, k) {
  const res = [];
  for (let i = 0; i <= arr.length - k; i++) {
    const set = new Set();
    for (let j = i; j < i + k; j++) set.add(arr[j]);
    res.push(set.size);
  }
  return res;
}
