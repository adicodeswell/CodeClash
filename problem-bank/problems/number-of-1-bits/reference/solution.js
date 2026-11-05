export function solve(n) {
  let count = 0;
  let num = n >>> 0;
  while (num > 0) {
    num &= (num - 1);
    count++;
  }
  return count;
}
