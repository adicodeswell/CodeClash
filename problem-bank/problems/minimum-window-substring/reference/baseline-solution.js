export function solve(s, t) {
  const need = {};
  for (let i = 0; i < t.length; i++) need[t[i]] = (need[t[i]] || 0) + 1;
  let minLen = Infinity, minSub = "";
  for (let i = 0; i < s.length; i++) {
    const cur = {};
    for (let j = i; j < s.length; j++) {
      cur[s[j]] = (cur[s[j]] || 0) + 1;
      let ok = true;
      for (const k of Object.keys(need)) {
        if ((cur[k] || 0) < need[k]) { ok = false; break; }
      }
      if (ok) {
        if (j - i + 1 < minLen) {
          minLen = j - i + 1;
          minSub = s.slice(i, j + 1);
        }
        break;
      }
    }
  }
  return minSub;
}
