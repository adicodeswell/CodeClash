export function solve(nums) {
  const arr = [...nums];
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    while (arr[i] > 0 && arr[i] <= n && arr[arr[i] - 1] !== arr[i]) {
      const temp = arr[arr[i] - 1];
      arr[arr[i] - 1] = arr[i];
      arr[i] = temp;
    }
  }
  for (let i = 0; i < n; i++) {
    if (arr[i] !== i + 1) return i + 1;
  }
  return n + 1;
}
