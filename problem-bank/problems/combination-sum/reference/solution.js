export function solve(candidates, target) {
  const res = [];
  const curr = [];
  const sorted = [...candidates].sort((a, b) => a - b);

  function dfs(idx, rem) {
    if (rem === 0) {
      res.push([...curr]);
      return;
    }
    for (let i = idx; i < sorted.length; i++) {
      if (sorted[i] > rem) break;
      curr.push(sorted[i]);
      dfs(i, rem - sorted[i]);
      curr.pop();
    }
  }

  dfs(0, target);

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
