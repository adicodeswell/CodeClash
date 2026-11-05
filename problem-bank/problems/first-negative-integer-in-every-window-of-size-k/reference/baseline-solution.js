export function solve(arr, k) {
  const result = [];
  for (let i = 0; i <= arr.length - k; i++) {
    let first = 0;
    for (let j = i; j < i + k; j++) {
      if (arr[j] < 0) {
        first = arr[j];
        break;
      }
    }
    result.push(first);
  }
  return result;
}
