export function solve(points) {
  const n = points.length;
  if (n <= 1) return 0;
  const dist = Array(n).fill(Infinity);
  const inMST = Array(n).fill(false);
  dist[0] = 0;
  let totalCost = 0;

  for (let step = 0; step < n; step++) {
    let u = -1;
    for (let i = 0; i < n; i++) {
      if (!inMST[i] && (u === -1 || dist[i] < dist[u])) {
        u = i;
      }
    }
    inMST[u] = true;
    totalCost += dist[u];

    for (let v = 0; v < n; v++) {
      if (!inMST[v]) {
        const d = Math.abs(points[u][0] - points[v][0]) + Math.abs(points[u][1] - points[v][1]);
        if (d < dist[v]) dist[v] = d;
      }
    }
  }

  return totalCost;
}
