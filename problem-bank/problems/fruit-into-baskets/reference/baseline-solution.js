export function solve(fruits) {
  let max = 0;
  for (let i = 0; i < fruits.length; i++) {
    const set = new Set();
    for (let j = i; j < fruits.length; j++) {
      set.add(fruits[j]);
      if (set.size > 2) break;
      max = Math.max(max, j - i + 1);
    }
  }
  return max;
}
