export function solve(coins, amount) {
  if (amount === 0) return 0;
  const q = [0];
  const visited = new Set([0]);
  let step = 0;

  while (q.length > 0) {
    const size = q.length;
    step++;
    for (let i = 0; i < size; i++) {
      const cur = q.shift();
      for (const c of coins) {
        const next = cur + c;
        if (next === amount) return step;
        if (next < amount && !visited.has(next)) {
          visited.add(next);
          q.push(next);
        }
      }
    }
  }

  return -1;
}
