export function solve(blocks, k) {
  let min = Infinity;
  for (let i = 0; i <= blocks.length - k; i++) {
    let w = 0;
    for (let j = i; j < i + k; j++) if (blocks[j] === 'W') w++;
    if (w < min) min = w;
  }
  return min;
}
