export function solve(left, right) {
  while (right > left) {
    right = right & (right - 1);
  }
  return right;
}