export function solve(k, operations, values) {
  const q = new Array(k);
  let head = 0;
  let count = 0;
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "enQueue") {
      if (count === k) {
        result.push("false");
      } else {
        q[(head + count) % k] = values[i][0];
        count++;
        result.push("true");
      }
    } else if (op === "deQueue") {
      if (count === 0) {
        result.push("false");
      } else {
        head = (head + 1) % k;
        count--;
        result.push("true");
      }
    } else if (op === "Front") {
      result.push(count === 0 ? "-1" : String(q[head]));
    } else if (op === "Rear") {
      result.push(count === 0 ? "-1" : String(q[(head + count - 1) % k]));
    } else if (op === "isEmpty") {
      result.push(count === 0 ? "true" : "false");
    } else if (op === "isFull") {
      result.push(count === k ? "true" : "false");
    }
  }
  return result;
}