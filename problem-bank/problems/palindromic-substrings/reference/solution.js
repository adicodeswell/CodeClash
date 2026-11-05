export function solve(s) {
  let count = 0;

  function countPal(l, r) {
    let c = 0;
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      c++;
      l--;
      r++;
    }
    return c;
  }

  for (let i = 0; i < s.length; i++) {
    count += countPal(i, i);
    count += countPal(i, i + 1);
  }

  return count;
}
