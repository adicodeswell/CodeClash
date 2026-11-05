export function solve(nums) {
  let xor = 0;
  for (const n of nums) {
    xor ^= n;
  }
  // Lowest set bit
  const diff = xor & (-xor);
  let a = 0;
  let b = 0;
  for (const n of nums) {
    if ((n & diff) === 0) {
      a ^= n;
    } else {
      b ^= n;
    }
  }
  const res = [a, b];
  res.sort((x, y) => x - y);
  return res;
}