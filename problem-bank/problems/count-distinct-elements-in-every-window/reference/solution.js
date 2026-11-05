export function solve(arr, k) {
  const freq = new Map();
  const res = [];
  for (let i = 0; i < k; i++) {
    freq.set(arr[i], (freq.get(arr[i]) || 0) + 1);
  }
  res.push(freq.size);

  for (let i = k; i < arr.length; i++) {
    const left = arr[i - k];
    const c = freq.get(left);
    if (c === 1) freq.delete(left);
    else freq.set(left, c - 1);

    freq.set(arr[i], (freq.get(arr[i]) || 0) + 1);
    res.push(freq.size);
  }
  return res;
}
