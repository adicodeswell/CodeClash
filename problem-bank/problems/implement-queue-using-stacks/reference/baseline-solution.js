export function solve(operations, values) {
  const q = [];
  const result = [];
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "push") {
      q.push(values[i][0]);
      result.push("null");
    } else if (op === "pop") {
      result.push(String(q.shift()));
    } else if (op === "peek") {
      result.push(String(q[0]));
    } else if (op === "empty") {
      result.push(q.length === 0 ? "true" : "false");
    }
  }
  return result;
}