export function solve(s, k) {
  if (k > s.length || k > 26) return 0;
  let ans = 0;
  for (let i = 0; i <= s.length - k; i++) {
    const set = new Set();
    let unique = true;
    for (let j = i; j < i + k; j++) {
      if (set.has(s[j])) {
        unique = false;
        break;
      }
      set.add(s[j]);
    }
    if (unique) ans++;
  }
  return ans;
}
