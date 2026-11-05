export function solve(s) {
  let low = 0, high = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "(") {
      low++;
      high++;
    } else if (ch === ")") {
      low = Math.max(0, low - 1);
      high--;
    } else {
      low = Math.max(0, low - 1);
      high++;
    }
    if (high < 0) return false;
  }
  return low === 0;
}
