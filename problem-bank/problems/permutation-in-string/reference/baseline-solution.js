export function solve(s1, s2) {
  if (s1.length > s2.length) return false;
  const target = s1.split("").sort().join("");
  const len = s1.length;
  for (let i = 0; i <= s2.length - len; i++) {
    const sub = s2.slice(i, i + len).split("").sort().join("");
    if (sub === target) return true;
  }
  return false;
}
