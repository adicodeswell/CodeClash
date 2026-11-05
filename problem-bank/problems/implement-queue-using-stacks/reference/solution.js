export function solve(operations, values) {
  const inStack = [];
  const outStack = [];
  const result = [];

  function shift() {
    if (outStack.length === 0) {
      while (inStack.length > 0) {
        outStack.push(inStack.pop());
      }
    }
  }

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "push") {
      inStack.push(values[i][0]);
      result.push("null");
    } else if (op === "pop") {
      shift();
      result.push(String(outStack.pop()));
    } else if (op === "peek") {
      shift();
      result.push(String(outStack[outStack.length - 1]));
    } else if (op === "empty") {
      const isEmpty = inStack.length === 0 && outStack.length === 0;
      result.push(isEmpty ? "true" : "false");
    }
  }
  return result;
}