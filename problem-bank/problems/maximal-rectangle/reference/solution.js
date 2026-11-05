export function solve(matrix) {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;
  const rows = matrix.length;
  const cols = matrix[0].length;
  const heights = new Array(cols).fill(0);
  let maxArea = 0;

  function largestRectangleArea(heights) {
    const stack = [];
    let max = 0;
    const h = [...heights, 0];
    for (let i = 0; i < h.length; i++) {
      while (stack.length > 0 && h[stack[stack.length - 1]] > h[i]) {
        const height = h[stack.pop()];
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
        max = Math.max(max, height * width);
      }
      stack.push(i);
    }
    return max;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      heights[c] = matrix[r][c] === '1' ? heights[c] + 1 : 0;
    }
    maxArea = Math.max(maxArea, largestRectangleArea(heights));
  }

  return maxArea;
}