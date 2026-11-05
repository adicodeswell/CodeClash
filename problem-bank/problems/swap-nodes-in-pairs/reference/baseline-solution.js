export function solve(head) {
  const out = [];
  for (let i = 0; i < head.length; i += 2) {
    if (i + 1 < head.length) {
      out.push(head[i + 1]);
      out.push(head[i]);
    } else {
      out.push(head[i]);
    }
  }
  return out;
}