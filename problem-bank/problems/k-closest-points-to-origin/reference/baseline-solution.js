export function solve(points, k) {
  const list = points.map(p => ({ p, d: p[0] * p[0] + p[1] * p[1] }));
  list.sort((a, b) => {
    if (a.d !== b.d) return a.d - b.d;
    if (a.p[0] !== b.p[0]) return a.p[0] - b.p[0];
    return a.p[1] - b.p[1];
  });
  return list.slice(0, k).map(x => x.p);
}
