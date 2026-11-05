export function solve(s) {
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      let isPal = true;
      let l = i, r = j;
      while (l < r) {
        if (s[l++] !== s[r--]) {
          isPal = false;
          break;
        }
      }
      if (isPal) total++;
    }
  }
  return total;
}
