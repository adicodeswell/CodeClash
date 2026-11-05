export function solve(head) {
  const res = head.slice();
  for (let i = 0; i + 1 < res.length; i += 2) {
    const temp = res[i];
    res[i] = res[i + 1];
    res[i + 1] = temp;
  }
  return res;
}