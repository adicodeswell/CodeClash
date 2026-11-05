export function solve(digits) {
  const res = [...digits];
  for (let i = res.length - 1; i >= 0; i--) {
    if (res[i] < 9) {
      res[i]++;
      return res;
    }
    res[i] = 0;
  }
  res.unshift(1);
  return res;
}
