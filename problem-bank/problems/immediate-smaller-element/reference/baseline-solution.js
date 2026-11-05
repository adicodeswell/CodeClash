export function solve(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (i + 1 < arr.length && arr[i + 1] < arr[i]) {
      result.push(arr[i + 1]);
    } else {
      result.push(-1);
    }
  }
  return result;
}