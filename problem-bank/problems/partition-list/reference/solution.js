export function solve(head, x) {
  const less = [];
  const greaterOrEqual = [];
  for (let i = 0; i < head.length; i++) {
    if (head[i] < x) {
      less.push(head[i]);
    } else {
      greaterOrEqual.push(head[i]);
    }
  }
  return less.concat(greaterOrEqual);
}