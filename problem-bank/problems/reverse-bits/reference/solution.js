export function solve(n) {
  let res = 0;
  for (let i = 0; i < 32; i++) {
    res = (res * 2) + (n % 2);
    n = Math.floor(n / 2);
  }
  return res;
}
