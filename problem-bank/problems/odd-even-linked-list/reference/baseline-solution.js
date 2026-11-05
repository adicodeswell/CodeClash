export function solve(head) {
  const o = head.filter((_, idx) => idx % 2 === 0);
  const e = head.filter((_, idx) => idx % 2 === 1);
  return [...o, ...e];
}