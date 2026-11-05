export function solve(s) {
  const last = {};
  for (let i = 0; i < s.length; i++) {
    last[s[i]] = i;
  }

  const res = [];
  let size = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    size++;
    end = Math.max(end, last[s[i]]);
    if (i === end) {
      res.push(size);
      size = 0;
    }
  }

  return res;
}
