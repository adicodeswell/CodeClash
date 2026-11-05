export function solve(arr, k) {
  const result = [];
  const q = [];
  for (let i = 0; i < k; i++) {
    if (arr[i] < 0) q.push(i);
  }
  result.push(q.length > 0 ? arr[q[0]] : 0);

  for (let i = k; i < arr.length; i++) {
    while (q.length > 0 && q[0] <= i - k) q.shift();
    if (arr[i] < 0) q.push(i);
    result.push(q.length > 0 ? arr[q[0]] : 0);
  }
  return result;
}
