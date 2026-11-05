export function solve(s) {
  let maxLen = 0, l = 0;
  const map = new Map();
  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    if (map.has(c) && map.get(c) >= l) {
      l = map.get(c) + 1;
    }
    map.set(c, r);
    if (r - l + 1 > maxLen) maxLen = r - l + 1;
  }
  return maxLen;
}
