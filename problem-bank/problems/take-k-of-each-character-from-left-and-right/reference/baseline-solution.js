export function solve(s, k) {
  if (k === 0) return 0;
  const total = { a: 0, b: 0, c: 0 };
  for (const ch of s) total[ch]++;
  if (total.a < k || total.b < k || total.c < k) return -1;

  let minMinutes = Infinity;
  for (let leftCount = 0; leftCount <= s.length; leftCount++) {
    const cur = { a: 0, b: 0, c: 0 };
    for (let i = 0; i < leftCount; i++) cur[s[i]]++;

    let rightCount = 0;
    while (rightCount <= s.length - leftCount) {
      if (cur.a >= k && cur.b >= k && cur.c >= k) {
        minMinutes = Math.min(minMinutes, leftCount + rightCount);
        break;
      }
      if (rightCount < s.length - leftCount) {
        cur[s[s.length - 1 - rightCount]]++;
      }
      rightCount++;
    }
  }
  return minMinutes === Infinity ? -1 : minMinutes;
}
