export function solve(a, b) {
  return (BigInt("0b" + a) + BigInt("0b" + b)).toString(2);
}
