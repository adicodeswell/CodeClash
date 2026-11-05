export function solve(hand, groupSize) {
  if (hand.length % groupSize !== 0) return false;
  const count = new Map();
  for (const x of hand) count.set(x, (count.get(x) || 0) + 1);

  const sortedKeys = Array.from(count.keys()).sort((a, b) => a - b);

  for (const k of sortedKeys) {
    const c = count.get(k);
    if (c > 0) {
      for (let i = 0; i < groupSize; i++) {
        const val = k + i;
        if ((count.get(val) || 0) < c) return false;
        count.set(val, count.get(val) - c);
      }
    }
  }

  return true;
}
