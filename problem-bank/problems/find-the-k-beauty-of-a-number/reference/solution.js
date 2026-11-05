export function solve(num, k) {
  const s = String(num);
  let count = 0;
  for (let i = 0; i <= s.length - k; i++) {
    const sub = Number(s.slice(i, i + k));
    if (sub !== 0 && num % sub === 0) count++;
  }
  return count;
}
