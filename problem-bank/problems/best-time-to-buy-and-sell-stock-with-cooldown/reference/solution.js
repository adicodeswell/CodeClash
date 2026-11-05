export function solve(prices) {
  let sold = 0;
  let held = -Infinity;
  let reset = 0;

  for (const p of prices) {
    const prevSold = sold;
    sold = held + p;
    held = Math.max(held, reset - p);
    reset = Math.max(reset, prevSold);
  }

  return Math.max(sold, reset);
}
