export function solve(s, p) {
  if (s.length < p.length) return "-1";
  const pMap = {};
  for (const c of p) pMap[c] = (pMap[c] || 0) + 1;

  function contains(sub) {
    const sMap = {};
    for (const c of sub) sMap[c] = (sMap[c] || 0) + 1;
    for (const k in pMap) {
      if (!sMap[k] || sMap[k] < pMap[k]) return false;
    }
    return true;
  }

  let minLen = Infinity, best = "-1";
  for (let i = 0; i < s.length; i++) {
    for (let j = i + p.length; j <= s.length; j++) {
      if (j - i >= minLen) break;
      const sub = s.slice(i, j);
      if (contains(sub)) {
        minLen = j - i;
        best = sub;
        break;
      }
    }
  }
  return best;
}
