export function solve(s) {
  const INT_MAX = 2147483647n;
  const INT_MIN = -2147483648n;

  let str = s.trimStart();
  let sign = 1n;
  if (str.startsWith("+")) {
    str = str.slice(1);
  } else if (str.startsWith("-")) {
    sign = -1n;
    str = str.slice(1);
  }

  let digits = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= "0" && str[i] <= "9") {
      digits += str[i];
    } else {
      break;
    }
  }

  if (digits.length === 0) return 0;
  let val = BigInt(digits) * sign;
  if (val > INT_MAX) return Number(INT_MAX);
  if (val < INT_MIN) return Number(INT_MIN);
  return Number(val);
}
