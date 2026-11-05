export function solve(head) {
  let l = 0, r = head.length - 1;
  while (l < r) {
    if (head[l] !== head[r]) return false;
    l++;
    r--;
  }
  return true;
}