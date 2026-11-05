export function solve(s, p) {
  if (s.length < p.length) return "-1";
  const pMap = new Map();
  for (const c of p) pMap.set(c, (pMap.get(c) || 0) + 1);
  const sMap = new Map();
  let l = 0, count = 0, minLen = Infinity, start = -1;
  const need = pMap.size;

  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    sMap.set(c, (sMap.get(c) || 0) + 1);
    if (pMap.has(c) && sMap.get(c) === pMap.get(c)) count++;

    while (count === need) {
      if (r - l + 1 < minLen) {
        minLen = r - l + 1;
        start = l;
      }
      const leftChar = s[l];
      sMap.set(leftChar, sMap.get(leftChar) - 1);
      if (pMap.has(leftChar) && sMap.get(leftChar) < pMap.get(leftChar)) count--;
      l++;
    }
  }

  return start === -1 ? "-1" : s.slice(start, start + minLen);
}
