export function solve(prices) {
  const stack = []; // [price, span]
  const result = [];
  for (const price of prices) {
    let span = 1;
    while (stack.length > 0 && stack[stack.length - 1][0] <= price) {
      span += stack.pop()[1];
    }
    stack.push([price, span]);
    result.push(span);
  }
  return result;
}