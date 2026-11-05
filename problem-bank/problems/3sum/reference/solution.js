export function solve(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < sorted.length - 2; i++) {
    if (i > 0 && sorted[i] === sorted[i - 1]) continue;
    let l = i + 1, r = sorted.length - 1;
    while (l < r) {
      const sum = sorted[i] + sorted[l] + sorted[r];
      if (sum === 0) {
        result.push([sorted[i], sorted[l], sorted[r]]);
        while (l < r && sorted[l] === sorted[l + 1]) l++;
        while (l < r && sorted[r] === sorted[r - 1]) r--;
        l++;
        r--;
      } else if (sum < 0) {
        l++;
      } else {
        r--;
      }
    }
  }
  return result;
}
