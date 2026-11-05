export function solve(s, k) {
  if (k === 0 || s.length === 0) return 0;
  const count = new Map();
  let l = 0, max = 0;
  for (let r = 0; r < s.length; r++) {
    count.set(s[r], (count.get(s[r]) || 0) + 1);
    while (count.size > k) {
      const c = count.get(s[l]);
      if (c === 1) count.delete(s[l]);
      else count.set(s[l], c - 1);
      l++;
    }
    max = Math.max(max, r - l + 1);
  }
  return max;
}
