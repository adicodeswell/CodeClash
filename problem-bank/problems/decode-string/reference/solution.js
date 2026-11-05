export function solve(s) {
  const countStack = [];
  const stringStack = [];
  let curStr = "";
  let curNum = 0;

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch >= '0' && ch <= '9') {
      curNum = curNum * 10 + Number(ch);
    } else if (ch === '[') {
      countStack.push(curNum);
      stringStack.push(curStr);
      curStr = "";
      curNum = 0;
    } else if (ch === ']') {
      const repeatTimes = countStack.pop();
      const prevStr = stringStack.pop();
      curStr = prevStr + curStr.repeat(repeatTimes);
    } else {
      curStr += ch;
    }
  }
  return curStr;
}