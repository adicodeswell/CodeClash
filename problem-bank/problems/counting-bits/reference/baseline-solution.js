export function solve(n) {
  const ans = [];
  for (let i = 0; i <= n; i++) {
    ans.push(i.toString(2).split("").filter((c) => c === "1").length);
  }
  return ans;
}
