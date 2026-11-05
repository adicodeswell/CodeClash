export function solve(temperatures) {
  const n = temperatures.length;
  const ans = new Array(n).fill(0);
  const stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prev = stack.pop();
      ans[prev] = i - prev;
    }
    stack.push(i);
  }
  return ans;
}
