export function solve(s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    const set = new Set();
    for (let j = i; j < s.length; j++) {
      set.add(s[j]);
      if (set.size === 3) {
        count += (s.length - j);
        break;
      }
    }
  }
  return count;
}
