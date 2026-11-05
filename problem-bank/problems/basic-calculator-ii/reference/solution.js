export function solve(s) {
  const stack = [];
  let num = 0;
  let sign = '+';

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch >= '0' && ch <= '9') {
      num = num * 10 + Number(ch);
    }
    if ((ch !== ' ' && (ch < '0' || ch > '9')) || i === s.length - 1) {
      if (sign === '+') {
        stack.push(num);
      } else if (sign === '-') {
        stack.push(-num);
      } else if (sign === '*') {
        stack.push(stack.pop() * num);
      } else if (sign === '/') {
        const prev = stack.pop();
        stack.push(Math.trunc(prev / num));
      }
      sign = ch;
      num = 0;
    }
  }

  return stack.reduce((a, b) => a + b, 0);
}