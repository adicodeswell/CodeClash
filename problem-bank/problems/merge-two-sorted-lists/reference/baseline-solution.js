export function solve(list1, list2) {
  return [...list1, ...list2].sort((a, b) => a - b);
}
