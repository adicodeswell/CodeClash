export function solve(price) {
  const res = [];
  for (let i = 0; i < price.length; i++) {
    let count = 1;
    let j = i - 1;
    while (j >= 0 && price[j] <= price[i]) {
      count++;
      j--;
    }
    res.push(count);
  }
  return res;
}