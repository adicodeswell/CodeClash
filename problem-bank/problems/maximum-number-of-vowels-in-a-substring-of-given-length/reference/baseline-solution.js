export function solve(s, k) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  let max = 0;
  for (let i = 0; i <= s.length - k; i++) {
    let count = 0;
    for (let j = i; j < i + k; j++) {
      if (vowels.has(s[j])) count++;
    }
    if (count > max) max = count;
  }
  return max;
}
