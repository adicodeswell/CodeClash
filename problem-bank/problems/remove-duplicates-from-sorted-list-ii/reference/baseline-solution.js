export function solve(head) {
  const res = [];
  let i = 0;
  while (i < head.length) {
    if (i + 1 < head.length && head[i] === head[i + 1]) {
      const v = head[i];
      while (i < head.length && head[i] === v) {
        i++;
      }
    } else {
      res.push(head[i]);
      i++;
    }
  }
  return res;
}