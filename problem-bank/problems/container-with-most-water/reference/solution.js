export function solve(height) {
  let l = 0, r = height.length - 1, max = 0;
  while (l < r) {
    const area = Math.min(height[l], height[r]) * (r - l);
    if (area > max) max = area;
    if (height[l] < height[r]) l++;
    else r--;
  }
  return max;
}
