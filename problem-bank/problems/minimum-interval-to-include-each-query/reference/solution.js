export function solve(intervals, queries) {
  const sortedInts = [...intervals].sort((a, b) => a[0] - b[0]);
  const sortedQueries = queries.map((q, idx) => [q, idx]).sort((a, b) => a[0] - b[0]);

  const res = Array(queries.length).fill(-1);
  const heap = []; // [size, right]

  let i = 0;
  for (const [q, origIdx] of sortedQueries) {
    while (i < sortedInts.length && sortedInts[i][0] <= q) {
      const [l, r] = sortedInts[i];
      heap.push([r - l + 1, r]);
      i++;
    }

    heap.sort((a, b) => a[0] - b[0]);

    while (heap.length > 0 && heap[0][1] < q) {
      heap.shift();
    }

    if (heap.length > 0) {
      res[origIdx] = heap[0][0];
    }
  }

  return res;
}
