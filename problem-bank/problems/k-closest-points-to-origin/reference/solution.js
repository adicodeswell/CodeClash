export function solve(points, k) {
  const dist = (p) => p[0] * p[0] + p[1] * p[1];
  const sorted = [...points].sort((a, b) => {
    const d1 = dist(a);
    const d2 = dist(b);
    if (d1 !== d2) return d1 - d2;
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1];
  });
  return sorted.slice(0, k);
}
