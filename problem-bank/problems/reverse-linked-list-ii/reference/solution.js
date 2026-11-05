export function solve(head, left, right) {
  const res = head.slice();
  let l = left - 1;
  let r = right - 1;
  while (l < r) {
    const temp = res[l];
    res[l] = res[r];
    res[r] = temp;
    l++;
    r--;
  }
  return res;
}