export function solve(head, n) {
  const targetIndex = head.length - n;
  return [...head.slice(0, targetIndex), ...head.slice(targetIndex + 1)];
}
