export function solve(s) {
  while (s.includes('[')) {
    s = s.replace(/(\d+)\[([a-z]+)\]/g, (_, count, str) => str.repeat(Number(count)));
  }
  return s;
}