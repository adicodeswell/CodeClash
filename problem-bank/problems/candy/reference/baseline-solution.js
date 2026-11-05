export function solve(ratings) {
  const n = ratings.length;
  const candies = new Array(n).fill(1);
  let changed = true;
  while (changed) {
    changed = false;
    for (let i = 0; i < n; i++) {
      if (i > 0 && ratings[i] > ratings[i - 1] && candies[i] <= candies[i - 1]) {
        candies[i] = candies[i - 1] + 1;
        changed = true;
      }
      if (i < n - 1 && ratings[i] > ratings[i + 1] && candies[i] <= candies[i + 1]) {
        candies[i] = candies[i + 1] + 1;
        changed = true;
      }
    }
  }
  return candies.reduce((a, b) => a + b, 0);
}
