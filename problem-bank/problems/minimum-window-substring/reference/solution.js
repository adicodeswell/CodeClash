export function solve(s, t) {
  if (!s || !t) return "";
  const need = {};
  for (let i = 0; i < t.length; i++) need[t[i]] = (need[t[i]] || 0) + 1;
  let missing = t.length;
  let bestL = 0, bestLen = Infinity;
  let l = 0;
  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    if (need[c] !== undefined) {
      if (need[c] > 0) missing--;
      need[c]--;
    }
    while (missing === 0) {
      if (r - l + 1 < bestLen) {
        bestLen = r - l + 1;
        bestL = l;
      }
      const leftChar = s[l];
      if (need[leftChar] !== undefined) {
        need[leftChar]++;
        if (need[leftChar] > 0) missing++;
      }
      l++;
    }
  }
  return bestLen === Infinity ? "" : s.slice(bestL, bestL + bestLen);
}
