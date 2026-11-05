export function solve(k, operations, values) {
  const arr = [];
  const result = [];
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "enQueue") {
      if (arr.length === k) {
        result.push("false");
      } else {
        arr.push(values[i][0]);
        result.push("true");
      }
    } else if (op === "deQueue") {
      if (arr.length === 0) {
        result.push("false");
      } else {
        arr.shift();
        result.push("true");
      }
    } else if (op === "Front") {
      result.push(arr.length === 0 ? "-1" : String(arr[0]));
    } else if (op === "Rear") {
      result.push(arr.length === 0 ? "-1" : String(arr[arr.length - 1]));
    } else if (op === "isEmpty") {
      result.push(arr.length === 0 ? "true" : "false");
    } else if (op === "isFull") {
      result.push(arr.length === k ? "true" : "false");
    }
  }
  return result;
}