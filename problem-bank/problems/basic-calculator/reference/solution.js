export function solve(s) {
  let res = 0;
  let num = 0;
  let sign = 1;
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c >= "0" && c <= "9") {
      num = num * 10 + (c.charCodeAt(0) - 48);
    } else if (c === "+") {
      res += sign * num;
      num = 0;
      sign = 1;
    } else if (c === "-") {
      res += sign * num;
      num = 0;
      sign = -1;
    } else if (c === "(") {
      stack.push(res);
      stack.push(sign);
      res = 0;
      sign = 1;
    } else if (c === ")") {
      res += sign * num;
      num = 0;
      res *= stack.pop(); // sign
      res += stack.pop(); // prev res
    }
  }

  return res + sign * num;
}
