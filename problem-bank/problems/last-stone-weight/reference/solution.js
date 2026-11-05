export function solve(stones) {
  const heap = [...stones];
  // Simple max-heap or sorted array simulation
  while (heap.length > 1) {
    heap.sort((a, b) => b - a);
    const y = heap.shift();
    const x = heap.shift();
    if (y !== x) {
      heap.push(y - x);
    }
  }
  return heap.length === 1 ? heap[0] : 0;
}
