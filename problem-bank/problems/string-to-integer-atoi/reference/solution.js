export function solve(s) {
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;

  let i = 0;
  const n = s.length;

  while (i < n && s[i] === " ") {
    i++;
  }
  if (i >= n) return 0;

  let sign = 1;
  if (s[i] === "+") {
    i++;
  } else if (s[i] === "-") {
    sign = -1;
    i++;
  }

  let num = 0;
  while (i < n && s[i] >= "0" && s[i] <= "9") {
    const digit = s.charCodeAt(i) - 48;
    if (num > Math.floor(INT_MAX / 10) || (num === Math.floor(INT_MAX / 10) && digit > (sign === 1 ? 7 : 8))) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }
    num = num * 10 + digit;
    i++;
  }

  return sign * num;
}
