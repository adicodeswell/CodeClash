export function solve(head) {
  const result = [];
  let l = 0, r = head.length - 1;
  while (l <= r) {
    if (l === r) {
      result.push(head[l]);
    } else {
      result.push(head[l]);
      result.push(head[r]);
    }
    l++;
    r--;
  }
  return result;
}
