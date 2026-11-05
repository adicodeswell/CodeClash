export function solve(prices) {
  if (prices.length <= 1) return 0;
  const n = prices.length;
  const buy = Array(n).fill(0);
  const sell = Array(n).fill(0);
  buy[0] = -prices[0];
  buy[1] = Math.max(-prices[0], -prices[1]);
  sell[1] = Math.max(0, buy[0] + prices[1]);

  for (let i = 2; i < n; i++) {
    buy[i] = Math.max(buy[i - 1], sell[i - 2] - prices[i]);
    sell[i] = Math.max(sell[i - 1], buy[i - 1] + prices[i]);
  }

  return sell[n - 1];
}
