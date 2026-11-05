export function solve(customers, grumpy, minutes) {
  let baseSatisfied = 0;
  for (let i = 0; i < customers.length; i++) {
    if (grumpy[i] === 0) baseSatisfied += customers[i];
  }

  let extra = 0;
  for (let i = 0; i < minutes; i++) {
    if (grumpy[i] === 1) extra += customers[i];
  }
  let maxExtra = extra;

  for (let i = minutes; i < customers.length; i++) {
    if (grumpy[i] === 1) extra += customers[i];
    if (grumpy[i - minutes] === 1) extra -= customers[i - minutes];
    if (extra > maxExtra) maxExtra = extra;
  }

  return baseSatisfied + maxExtra;
}
