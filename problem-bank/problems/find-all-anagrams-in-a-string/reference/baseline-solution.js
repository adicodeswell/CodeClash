export function solve(s, p) {
  const res = [];
  if (s.length < p.length) return res;
  const pSorted = p.split("").sort().join("");
  const k = p.length;
  for (let i = 0; i <= s.length - k; i++) {
    if (s.slice(i, i + k).split("").sort().join("") === pSorted) {
      res.push(i);
    }
  }
  return res;
}
