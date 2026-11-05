export function solve(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let maxArea = 0;

  for (let r1 = 0; r1 < rows; r1++) {
    for (let c1 = 0; c1 < cols; c1++) {
      for (let r2 = r1; r2 < rows; r2++) {
        for (let c2 = c1; c2 < cols; c2++) {
          let allOnes = true;
          for (let r = r1; r <= r2; r++) {
            for (let c = c1; c <= c2; c++) {
              if (matrix[r][c] !== '1') {
                allOnes = false;
                break;
              }
            }
            if (!allOnes) break;
          }
          if (allOnes) {
            maxArea = Math.max(maxArea, (r2 - r1 + 1) * (c2 - c1 + 1));
          }
        }
      }
    }
  }
  return maxArea;
}