export function solve(s, k) {
  let l = 0, maxFreq = 0, maxLen = 0;
  const count = new Array(26).fill(0);
  for (let r = 0; r < s.length; r++) {
    const idx = s.charCodeAt(r) - 65;
    count[idx]++;
    if (count[idx] > maxFreq) maxFreq = count[idx];
    while (r - l + 1 - maxFreq > k) {
      count[s.charCodeAt(l) - 65]--;
      l++;
    }
    if (r - l + 1 > maxLen) maxLen = r - l + 1;
  }
  return maxLen;
}
