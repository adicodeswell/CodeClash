export function solve(arr, k) {
  const q = [];
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    while (q.length > 0 && q[0] <= i - k) q.shift();
    while (q.length > 0 && arr[q[q.length - 1]] <= arr[i]) q.pop();
    q.push(i);
    if (i >= k - 1) {
      res.push(arr[q[0]]);
    }
  }
  return res;
}
