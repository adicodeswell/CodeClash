export function solve(n) {
  return (n >>> 0).toString(2).split("").filter((c) => c === "1").length;
}
