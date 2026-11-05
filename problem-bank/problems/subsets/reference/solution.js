export function solve(nums) {
  const res = [];
  const curr = [];
  const sortedNums = [...nums].sort((a, b) => a - b);

  function backtrack(idx) {
    if (idx === sortedNums.length) {
      res.push([...curr]);
      return;
    }
    // Exclude
    backtrack(idx + 1);
    // Include
    curr.push(sortedNums[idx]);
    backtrack(idx + 1);
    curr.pop();
  }

  backtrack(0);

  // Canonical sorting
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
