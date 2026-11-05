export function solve(lists) {
  return lists.flat().sort((a, b) => a - b);
}
