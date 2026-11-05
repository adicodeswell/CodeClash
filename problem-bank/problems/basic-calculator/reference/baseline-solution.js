export function solve(s) {
  let idx = 0;

  function parseExpr() {
    let res = 0;
    let num = 0;
    let sign = 1;

    while (idx < s.length) {
      const c = s[idx++];
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
        num = parseExpr();
      } else if (c === ")") {
        break;
      }
    }
    return res + sign * num;
  }

  return parseExpr();
}
