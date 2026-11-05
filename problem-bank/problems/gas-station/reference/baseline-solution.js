export function solve(gas, cost) {
  const n = gas.length;
  for (let start = 0; start < n; start++) {
    let tank = 0;
    let ok = true;
    for (let step = 0; step < n; step++) {
      const idx = (start + step) % n;
      tank += gas[idx] - cost[idx];
      if (tank < 0) {
        ok = false;
        break;
      }
    }
    if (ok) return start;
  }
  return -1;
}
