export function solve(image, sr, sc, color) {
  const orig = image[sr][sc];
  if (orig === color) return image;
  const m = image.length;
  const n = image[0].length;
  const grid = image.map((row) => [...row]);

  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== orig) {
      return;
    }
    grid[r][c] = color;
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  dfs(sr, sc);
  return grid;
}
