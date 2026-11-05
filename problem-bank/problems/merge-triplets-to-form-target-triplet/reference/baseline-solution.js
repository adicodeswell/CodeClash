export function solve(triplets, target) {
  const [x, y, z] = target;
  let cur = [0, 0, 0];
  for (const t of triplets) {
    if (t[0] <= x && t[1] <= y && t[2] <= z) {
      cur = [Math.max(cur[0], t[0]), Math.max(cur[1], t[1]), Math.max(cur[2], t[2])];
    }
  }
  return cur[0] === x && cur[1] === y && cur[2] === z;
}
