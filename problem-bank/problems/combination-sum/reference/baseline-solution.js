export function solve(candidates, target) {
  const res = [];
  const sorted = [...candidates].sort((a, b) => a - b);

  function backtrack(start, comb, sum) {
    if (sum === target) {
      res.push([...comb]);
      return;
    }
    if (sum > target) return;
    for (let i = start; i < sorted.length; i++) {
      comb.push(sorted[i]);
      backtrack(i, comb, sum + sorted[i]);
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
