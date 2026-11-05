export function solve(tasks, n) {
  const counts = {};
  for (const t of tasks) counts[t] = (counts[t] || 0) + 1;
  const vals = Object.values(counts);
  const maxFreq = Math.max(...vals);
  const countMax = vals.filter(v => v === maxFreq).length;
  const ans = (maxFreq - 1) * (n + 1) + countMax;
  return Math.max(tasks.length, ans);
}
