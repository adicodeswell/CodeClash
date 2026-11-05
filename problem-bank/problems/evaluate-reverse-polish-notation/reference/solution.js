export function solve(tokens) {
  const stack = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t === "+" || t === "-" || t === "*" || t === "/") {
      const b = stack.pop();
      const a = stack.pop();
      if (t === "+") stack.push(a + b);
      else if (t === "-") stack.push(a - b);
      else if (t === "*") stack.push(a * b);
      else stack.push(Math.trunc(a / b));
    } else {
      stack.push(Number(t));
    }
  }
  return stack[0];
}
