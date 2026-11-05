export function solve(s, k) {
  if (k === 0) return 0;
  const total = { a: 0, b: 0, c: 0 };
  for (const ch of s) total[ch]++;
  if (total.a < k || total.b < k || total.c < k) return -1;

  const target = { a: total.a - k, b: total.b - k, c: total.c - k };
  const cur = { a: 0, b: 0, c: 0 };
  let l = 0, maxWindow = 0;

  for (let r = 0; r < s.length; r++) {
    cur[s[r]]++;
    while (cur.a > target.a || cur.b > target.b || cur.c > target.c) {
      cur[s[l]]--;
      l++;
    }
    maxWindow = Math.max(maxWindow, r - l + 1);
  }
  return s.length - maxWindow;
}
