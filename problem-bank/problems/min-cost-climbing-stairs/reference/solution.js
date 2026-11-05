export function solve(cost) {
  let prev2 = 0, prev1 = 0;
  for (let i = 2; i <= cost.length; i++) {
    const cur = Math.min(prev1 + cost[i - 1], prev2 + cost[i - 2]);
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}
