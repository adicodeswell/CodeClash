export function solve(head) {
  const odd = [];
  const even = [];
  for (let i = 0; i < head.length; i++) {
    if (i % 2 === 0) {
      odd.push(head[i]);
    } else {
      even.push(head[i]);
    }
  }
  return odd.concat(even);
}