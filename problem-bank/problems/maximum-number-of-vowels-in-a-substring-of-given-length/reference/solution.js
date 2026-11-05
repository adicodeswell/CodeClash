export function solve(s, k) {
  const isVowel = (c) => c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u';
  let cur = 0;
  for (let i = 0; i < k; i++) if (isVowel(s[i])) cur++;
  let max = cur;
  for (let i = k; i < s.length; i++) {
    if (isVowel(s[i])) cur++;
    if (isVowel(s[i - k])) cur--;
    if (cur > max) max = cur;
  }
  return max;
}
