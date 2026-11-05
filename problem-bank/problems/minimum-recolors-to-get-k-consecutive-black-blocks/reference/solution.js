export function solve(blocks, k) {
  let whiteCount = 0;
  for (let i = 0; i < k; i++) if (blocks[i] === 'W') whiteCount++;
  let min = whiteCount;
  for (let i = k; i < blocks.length; i++) {
    if (blocks[i] === 'W') whiteCount++;
    if (blocks[i - k] === 'W') whiteCount--;
    if (whiteCount < min) min = whiteCount;
  }
  return min;
}
