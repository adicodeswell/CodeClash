export function solve(s) {
  let l = 0, r = s.length - 1;
  const isAlphaNum = (c) => /[a-zA-Z0-9]/.test(c);
  while (l < r) {
    while (l < r && !isAlphaNum(s[l])) l++;
    while (l < r && !isAlphaNum(s[r])) r--;
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l++;
    r--;
  }
  return true;
}
