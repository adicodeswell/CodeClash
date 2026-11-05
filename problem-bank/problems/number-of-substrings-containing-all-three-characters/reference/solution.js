export function solve(s) {
  let count = 0;
  const last = { a: -1, b: -1, c: -1 };
  for (let i = 0; i < s.length; i++) {
    last[s[i]] = i;
    const min = Math.min(last.a, last.b, last.c);
    if (min !== -1) count += min + 1;
  }
  return count;
}
