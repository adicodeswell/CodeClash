export function solve(s) {
  const lastIndex = new Map();
  for (let i = 0; i < s.length; i++) lastIndex.set(s[i], i);

  const ans = [];
  let start = 0, maxEnd = 0;
  for (let i = 0; i < s.length; i++) {
    maxEnd = Math.max(maxEnd, lastIndex.get(s[i]));
    if (i === maxEnd) {
      ans.push(i - start + 1);
      start = i + 1;
    }
  }
  return ans;
}
