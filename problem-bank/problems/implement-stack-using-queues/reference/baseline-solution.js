export function solve(operations, values) {
  const stack = [];
  const result = [];
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "push") {
      stack.push(values[i][0]);
      result.push("null");
    } else if (op === "pop") {
      result.push(String(stack.pop()));
    } else if (op === "top") {
      result.push(String(stack[stack.length - 1]));
    } else if (op === "empty") {
      result.push(stack.length === 0 ? "true" : "false");
    }
  }
  return result;
}