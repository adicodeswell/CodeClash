export function solve(lists) {
  const result = [];
  for (let i = 0; i < lists.length; i++) {
    for (let j = 0; j < lists[i].length; j++) {
      result.push(lists[i][j]);
    }
  }
  result.sort((a, b) => a - b);
  return result;
}
