export function solve(n) {
  const seen = new Set();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    let s = 0;
    while (n > 0) {
      const d = n % 10;
      s += d * d;
      n = Math.floor(n / 10);
    }
    n = s;
  }
  return n === 1;
}
