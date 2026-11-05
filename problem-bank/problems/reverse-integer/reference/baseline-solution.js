export function solve(x) {
  const sign = Math.sign(x);
  const s = Math.abs(x).toString().split("").reverse().join("");
  const res = sign * Number(s);
  if (res < -2147483648 || res > 2147483647) return 0;
  return res;
}
