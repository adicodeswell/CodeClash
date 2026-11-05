export function solve(s) {
  let maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    const set = new Set();
    for (let j = i; j < s.length; j++) {
      if (set.has(s[j])) break;
      set.add(s[j]);
      if (j - i + 1 > maxLen) maxLen = j - i + 1;
    }
  }
  return maxLen;
}
