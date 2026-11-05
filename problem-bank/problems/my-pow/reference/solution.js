export function solve(x, n) {
  if (n === 0) return 1.0;
  let p = n;
  if (p < 0) {
    x = 1 / x;
    p = -p;
  }
  let result = 1.0;
  let currentProduct = x;
  while (p > 0) {
    if (p % 2 === 1) {
      result *= currentProduct;
    }
    currentProduct *= currentProduct;
    p = Math.floor(p / 2);
  }
  return result;
}
