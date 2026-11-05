export function solve(operations, values) {
  const stack = [];
  const result = [];
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "push") {
      stack.push(values[i][0]);
      result.push("null");
    } else if (op === "pop") {
      stack.pop();
      result.push("null");
    } else if (op === "top") {
      result.push(String(stack[stack.length - 1]));
    } else if (op === "getMin") {
      let m = stack[0];
      for (let j = 1; j < stack.length; j++) {
        if (stack[j] < m) m = stack[j];
      }
      result.push(String(m));
    }
  }
  return result;
}
