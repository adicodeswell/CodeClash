export function solve(s, t) {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  const aCode = 97;
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - aCode]++;
    count[t.charCodeAt(i) - aCode]--;
  }
  for (let i = 0; i < 26; i++) {
    if (count[i] !== 0) return false;
  }
  return true;
}
