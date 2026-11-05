export function solve(s) {
  let prev = "";
  while (s !== prev) {
    prev = s;
    s = s.replace(/\(\)/g, "").replace(/\{\}/g, "").replace(/\[\]/g, "");
  }
  return s.length === 0;
}
