export function solve(s, k) {
  if (k > s.length || k > 26) return 0;
  let count = 0;
  const freq = new Map();
  for (let i = 0; i < k; i++) {
    freq.set(s[i], (freq.get(s[i]) || 0) + 1);
  }
  if (freq.size === k) count++;

  for (let i = k; i < s.length; i++) {
    const left = s[i - k];
    const c = freq.get(left);
    if (c === 1) freq.delete(left);
    else freq.set(left, c - 1);

    freq.set(s[i], (freq.get(s[i]) || 0) + 1);
    if (freq.size === k) count++;
  }
  return count;
}
