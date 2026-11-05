export function solve(s) {
  if (s.length <= 1) return s;
  let start = 0, maxLen = 1;

  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      const len = r - l + 1;
      if (len > maxLen) {
        maxLen = len;
        start = l;
      }
      l--;
      r++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }

  return s.substring(start, start + maxLen);
}
