export function solve(num, k) {
  if (k >= num.length) return "0";
  const stack = [];
  let toRemove = k;

  for (let i = 0; i < num.length; i++) {
    const digit = num[i];
    while (toRemove > 0 && stack.length > 0 && stack[stack.length - 1] > digit) {
      stack.pop();
      toRemove--;
    }
    stack.push(digit);
  }

  while (toRemove > 0) {
    stack.pop();
    toRemove--;
  }

  // Remove leading zeros
  let start = 0;
  while (start < stack.length && stack[start] === '0') {
    start++;
  }

  const res = stack.slice(start).join('');
  return res.length === 0 ? "0" : res;
}