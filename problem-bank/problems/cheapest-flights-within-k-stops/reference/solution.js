export function solve(n, flights, src, dst, k) {
  let prices = Array(n).fill(Infinity);
  prices[src] = 0;

  for (let i = 0; i <= k; i++) {
    const tmp = [...prices];
    for (const [s, d, p] of flights) {
      if (prices[s] === Infinity) continue;
      if (prices[s] + p < tmp[d]) {
        tmp[d] = prices[s] + p;
      }
    }
    prices = tmp;
  }

  return prices[dst] === Infinity ? -1 : prices[dst];
}
