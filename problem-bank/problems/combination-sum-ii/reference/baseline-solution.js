export function solve(candidates, target) {
  const sorted = [...candidates].sort((a, b) => a - b);
  const res = [];
  const seen = new Set();

  function backtrack(idx, comb, sum) {
    if (sum === target) {
      const key = comb.join(",");
      if (!seen.has(key)) {
        seen.add(key);
        res.push([...comb]);
      }
      return;
    }
    if (sum > target || idx >= sorted.length) return;

    for (let i = idx; i < sorted.length; i++) {
      if (i > idx && sorted[i] === sorted[i - 1]) continue;
      comb.push(sorted[i]);
      backtrack(i + 1, comb, sum + sorted[i]);
      comb.pop();
    }
  }

  backtrack(0, [], 0);

  for (const c of res) c.sort((a, b) => a - b);
  res.sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  });

  return res;
}
