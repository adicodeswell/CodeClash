export function solve(customers, grumpy, minutes) {
  let maxTotal = 0;
  for (let start = 0; start <= customers.length - minutes; start++) {
    let total = 0;
    for (let i = 0; i < customers.length; i++) {
      if (grumpy[i] === 0 || (i >= start && i < start + minutes)) {
        total += customers[i];
      }
    }
    if (total > maxTotal) maxTotal = total;
  }
  return maxTotal;
}
