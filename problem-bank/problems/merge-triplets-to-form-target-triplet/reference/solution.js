export function solve(triplets, target) {
  let canX = false, canY = false, canZ = false;

  for (const [a, b, c] of triplets) {
    if (a <= target[0] && b <= target[1] && c <= target[2]) {
      if (a === target[0]) canX = true;
      if (b === target[1]) canY = true;
      if (c === target[2]) canZ = true;
    }
  }

  return canX && canY && canZ;
}
