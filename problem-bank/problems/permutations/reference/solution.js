export function solve(nums) {
  const res = [];
  const used = Array(nums.length).fill(false);
  const curr = [];
  const sorted = [...nums].sort((a, b) => a - b);

  function backtrack() {
    if (curr.length === sorted.length) {
      res.push([...curr]);
      return;
    }
    for (let i = 0; i < sorted.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      curr.push(sorted[i]);
      backtrack();
      curr.pop();
      used[i] = false;
    }
  }

  backtrack();

  res.sort((a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  });

  return res;
}
