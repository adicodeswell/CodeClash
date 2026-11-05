export function solve(operations, values) {
  const stack = [];
  const minStack = [];
  const result = [];
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "push") {
      const val = values[i][0];
      stack.push(val);
      const curMin = minStack.length === 0 ? val : Math.min(val, minStack[minStack.length - 1]);
      minStack.push(curMin);
      result.push("null");
    } else if (op === "pop") {
      stack.pop();
      minStack.pop();
      result.push("null");
    } else if (op === "top") {
      result.push(String(stack[stack.length - 1]));
    } else if (op === "getMin") {
      result.push(String(minStack[minStack.length - 1]));
    }
  }
  return result;
}
