export function solve(s, p) {
  const result = [];
  if (s.length < p.length) return result;

  const pCount = new Array(26).fill(0);
  const sCount = new Array(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  for (let i = 0; i < p.length; i++) {
    pCount[p.charCodeAt(i) - aCode]++;
    sCount[s.charCodeAt(i) - aCode]++;
  }

  let matches = 0;
  for (let i = 0; i < 26; i++) {
    if (pCount[i] === sCount[i]) matches++;
  }

  for (let i = 0; i < s.length - p.length; i++) {
    if (matches === 26) result.push(i);

    const rIdx = s.charCodeAt(i + p.length) - aCode;
    sCount[rIdx]++;
    if (sCount[rIdx] === pCount[rIdx]) matches++;
    else if (sCount[rIdx] === pCount[rIdx] + 1) matches--;

    const lIdx = s.charCodeAt(i) - aCode;
    sCount[lIdx]--;
    if (sCount[lIdx] === pCount[lIdx]) matches++;
    else if (sCount[lIdx] === pCount[lIdx] - 1) matches--;
  }

  if (matches === 26) result.push(s.length - p.length);
  return result;
}
