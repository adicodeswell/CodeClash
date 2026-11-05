export function solve(s) {
  let cmin = 0, cmax = 0;
  for (const c of s) {
    if (c === "(") {
      cmin++;
      cmax++;
    } else if (c === ")") {
      cmin--;
      cmax--;
    } else {
      cmin--;
      cmax++;
    }
    if (cmax < 0) return false;
    if (cmin < 0) cmin = 0;
  }
  return cmin === 0;
}
