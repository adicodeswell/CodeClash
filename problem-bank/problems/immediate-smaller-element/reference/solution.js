export function solve(arr) {
  const n = arr.length;
  const ans = new Array(n);
  for (let i = 0; i < n - 1; i++) {
    ans[i] = arr[i + 1] < arr[i] ? arr[i + 1] : -1;
  }
  ans[n - 1] = -1;
  return ans;
}