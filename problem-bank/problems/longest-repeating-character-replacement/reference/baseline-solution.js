export function solve(s, k) {
  let maxLen = 0;
  for (let c = 0; c < 26; c++) {
    const target = String.fromCharCode(65 + c);
    let l = 0, changes = 0;
    for (let r = 0; r < s.length; r++) {
      if (s[r] !== target) changes++;
      while (changes > k) {
        if (s[l] !== target) changes--;
        l++;
      }
      if (r - l + 1 > maxLen) maxLen = r - l + 1;
    }
  }
  return maxLen;
}
