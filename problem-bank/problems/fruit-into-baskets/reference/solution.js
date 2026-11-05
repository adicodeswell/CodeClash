export function solve(fruits) {
  const count = new Map();
  let l = 0, max = 0;
  for (let r = 0; r < fruits.length; r++) {
    count.set(fruits[r], (count.get(fruits[r]) || 0) + 1);
    while (count.size > 2) {
      const c = count.get(fruits[l]);
      if (c === 1) count.delete(fruits[l]);
      else count.set(fruits[l], c - 1);
      l++;
    }
    max = Math.max(max, r - l + 1);
  }
  return max;
}
