export function solve(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '(' || c === '{' || c === '[') {
      stack.push(c);
    } else {
      if (stack.length === 0 || stack[stack.length - 1] !== map[c]) return false;
      stack.pop();
    }
  }
  return stack.length === 0;
}
