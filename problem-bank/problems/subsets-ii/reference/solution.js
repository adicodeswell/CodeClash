export function solve(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const res = [];
  const curr = [];

  function backtrack(idx) {
    res.push([...curr]);
    for (let i = idx; i < sorted.length; i++) {
      if (i > idx && sorted[i] === sorted[i - 1]) continue;
      curr.push(sorted[i]);
      backtrack(i + 1);
      curr.pop();
    }
  }

  backtrack(0);

  for (const s of res) s.sort((a, b) => a - b);
  res.sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  });

  return res;
}
