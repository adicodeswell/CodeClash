export function solve(s) {
  const set = new Set();
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (set.has(c)) {
      set.delete(c);
      count += 2;
    } else {
      set.add(c);
    }
  }
  return set.size > 0 ? count + 1 : count;
}
