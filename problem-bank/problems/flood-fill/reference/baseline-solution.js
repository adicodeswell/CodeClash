export function solve(image, sr, sc, color) {
  const orig = image[sr][sc];
  if (orig === color) return image;
  const m = image.length;
  const n = image[0].length;
  const grid = image.map((row) => [...row]);
  const queue = [[sr, sc]];
  grid[sr][sc] = color;

  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  while (queue.length > 0) {
    const [r, c] = queue.shift();
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === orig) {
        grid[nr][nc] = color;
        queue.push([nr, nc]);
      }
    }
  }

  return grid;
}
