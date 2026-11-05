export function solve(s, k) {
  if (k === 0) return 0;
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    const set = new Set();
    for (let j = i; j < s.length; j++) {
      set.add(s[j]);
      if (set.size > k) break;
      max = Math.max(max, j - i + 1);
    }
  }
  return max;
}
