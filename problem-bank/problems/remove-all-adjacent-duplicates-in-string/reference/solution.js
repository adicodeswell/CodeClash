export function solve(s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (stack.length > 0 && stack[stack.length - 1] === ch) {
      stack.pop();
    } else {
      stack.push(ch);
    }
  }
  return stack.join('');
}