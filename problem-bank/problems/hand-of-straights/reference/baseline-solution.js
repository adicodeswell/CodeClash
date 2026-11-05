export function solve(hand, groupSize) {
  if (hand.length % groupSize !== 0) return false;
  const arr = [...hand].sort((a, b) => a - b);
  while (arr.length > 0) {
    const first = arr[0];
    for (let i = 0; i < groupSize; i++) {
      const target = first + i;
      const idx = arr.indexOf(target);
      if (idx === -1) return false;
      arr.splice(idx, 1);
    }
  }
  return true;
}
