export function solve(x) {
  const sign = x < 0 ? -1 : 1;
  let num = Math.abs(x);
  let res = 0;
  while (num > 0) {
    res = res * 10 + (num % 10);
    num = Math.floor(num / 10);
  }
  res = sign * res;
  if (res < -2147483648 || res > 2147483647) return 0;
  return res;
}
