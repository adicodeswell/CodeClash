export function solve(operations, values) {
  const arr = [];
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "addNum") {
      arr.push(values[i][0]);
      arr.sort((a, b) => a - b);
      result.push("null");
    } else if (op === "findMedian") {
      const mid = Math.floor(arr.length / 2);
      const val = arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
      result.push(val.toFixed(1));
    }
  }

  return result;
}
