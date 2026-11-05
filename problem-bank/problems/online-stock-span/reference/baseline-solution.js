export function solve(prices) {
  const result = [];
  for (let i = 0; i < prices.length; i++) {
    let span = 1;
    let j = i - 1;
    while (j >= 0 && prices[j] <= prices[i]) {
      span++;
      j--;
    }
    result.push(span);
  }
  return result;
}