export function solve(s, t) {
  if (s.length !== t.length) return false;
  return s.split("").sort().join("") === t.split("").sort().join("");
}
