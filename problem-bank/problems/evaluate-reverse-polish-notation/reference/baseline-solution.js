export function solve(tokens) {
  const stack = [];
  for (const token of tokens) {
    if (token === "+") {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(a + b);
    } else if (token === "-") {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(a - b);
    } else if (token === "*") {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(a * b);
    } else if (token === "/") {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(Math.trunc(a / b));
    } else {
      stack.push(parseInt(token, 10));
    }
  }
  return stack[0];
}
