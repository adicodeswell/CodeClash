export function solve(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const res = [];
  const seen = new Set();
  const n = sorted.length;

  for (let mask = 0; mask < (1 << n); mask++) {
    const sub = [];
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) sub.push(sorted[i]);
    }
    const key = sub.join(",");
    if (!seen.has(key)) {
      seen.add(key);
      res.push(sub);
    }
  }

  res.sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  });

  return res;
}
