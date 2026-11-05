export function solve(price) {
  const n = price.length;
  const span = new Array(n);
  const stack = []; // indices of days

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && price[stack[stack.length - 1]] <= price[i]) {
      stack.pop();
    }
    span[i] = stack.length === 0 ? i + 1 : i - stack[stack.length - 1];
    stack.push(i);
  }
  return span;
}