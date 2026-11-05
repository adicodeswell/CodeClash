export function solve(s) {
  if (s.length <= 1) return s;
  const n = s.length;
  let bestStart = 0;
  let maxL = 1;

  for (let i = 0; i < n; i++) {
    // odd
    let l = i, r = i;
    while (l >= 0 && r < n && s[l] === s[r]) {
      if (r - l + 1 > maxL) {
        maxL = r - l + 1;
        bestStart = l;
      }
      l--;
      r++;
    }
    // even
    l = i; r = i + 1;
    while (l >= 0 && r < n && s[l] === s[r]) {
      if (r - l + 1 > maxL) {
        maxL = r - l + 1;
        bestStart = l;
      }
      l--;
      r++;
    }
  }
  return s.substring(bestStart, bestStart + maxL);
}
