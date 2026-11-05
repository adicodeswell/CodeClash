export function solve(temperatures) {
  const n = temperatures.length;
  const ans = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (temperatures[j] > temperatures[i]) {
        ans[i] = j - i;
        break;
      }
    }
  }
  return ans;
}
