export function solve(tickets) {
  const adj = new Map();
  for (const [src, dst] of tickets) {
    if (!adj.has(src)) adj.set(src, []);
    adj.get(src).push(dst);
  }

  for (const list of adj.values()) {
    list.sort();
  }

  const route = [];

  function visit(airport) {
    const dests = adj.get(airport) || [];
    while (dests.length > 0) {
      const next = dests.shift();
      visit(next);
    }
    route.push(airport);
  }

  visit("JFK");
  return route.reverse();
}
