export function solve(n) {
  if (n <= 0) return false;
  while (n % 2 === 0) {
    n = Math.floor(n / 2);
  }
  return n === 1;
}