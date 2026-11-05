export function solve(tasks, n) {
  const freq = new Map();
  for (const t of tasks) freq.set(t, (freq.get(t) || 0) + 1);
  let max = 0;
  for (const val of freq.values()) if (val > max) max = val;
  let maxCount = 0;
  for (const val of freq.values()) if (val === max) maxCount++;
  const partCount = max - 1;
  const emptySlots = partCount * (n - (maxCount - 1));
  const availableTasks = tasks.length - max * maxCount;
  const idles = Math.max(0, emptySlots - availableTasks);
  return tasks.length + idles;
}
