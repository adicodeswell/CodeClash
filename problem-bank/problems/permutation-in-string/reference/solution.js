export function solve(s1, s2) {
  if (s1.length > s2.length) return false;
  const count1 = new Array(26).fill(0);
  const count2 = new Array(26).fill(0);
  for (let i = 0; i < s1.length; i++) {
    count1[s1.charCodeAt(i) - 97]++;
    count2[s2.charCodeAt(i) - 97]++;
  }
  let matches = 0;
  for (let i = 0; i < 26; i++) {
    if (count1[i] === count2[i]) matches++;
  }
  for (let i = 0; i < s2.length - s1.length; i++) {
    if (matches === 26) return true;
    const r = s2.charCodeAt(i + s1.length) - 97;
    const l = s2.charCodeAt(i) - 97;
    count2[r]++;
    if (count2[r] === count1[r]) matches++;
    else if (count2[r] === count1[r] + 1) matches--;

    count2[l]--;
    if (count2[l] === count1[l]) matches++;
    else if (count2[l] === count1[l] - 1) matches--;
  }
  return matches === 26;
}
