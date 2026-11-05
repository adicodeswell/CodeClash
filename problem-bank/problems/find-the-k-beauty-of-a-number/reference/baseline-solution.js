export function solve(num, k) {
  const s = num.toString();
  let ans = 0;
  for (let i = 0; i <= s.length - k; i++) {
    const val = parseInt(s.substring(i, i + k), 10);
    if (val !== 0 && num % val === 0) ans++;
  }
  return ans;
}
