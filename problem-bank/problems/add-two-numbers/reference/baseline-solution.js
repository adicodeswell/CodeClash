export function solve(l1, l2) {
  const n1 = BigInt([...l1].reverse().join(""));
  const n2 = BigInt([...l2].reverse().join(""));
  const sum = (n1 + n2).toString();
  return sum.split("").reverse().map(Number);
}
