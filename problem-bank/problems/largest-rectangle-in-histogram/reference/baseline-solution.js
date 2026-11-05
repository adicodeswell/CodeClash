export function solve(heights) {
  let maxArea = 0;
  const n = heights.length;
  for (let i = 0; i < n; i++) {
    let minH = heights[i];
    for (let j = i; j < n; j++) {
      if (heights[j] < minH) minH = heights[j];
      const area = minH * (j - i + 1);
      if (area > maxArea) maxArea = area;
    }
  }
  return maxArea;
}
