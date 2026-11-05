export function solve(accounts) {
  const graph = new Map();
  const emailToName = new Map();

  for (const acc of accounts) {
    const name = acc[0];
    for (let i = 1; i < acc.length; i++) {
      const email = acc[i];
      emailToName.set(email, name);
      if (!graph.has(email)) graph.set(email, new Set());
      if (i > 1) {
        graph.get(acc[1]).add(email);
        graph.get(email).add(acc[1]);
      }
    }
  }

  const visited = new Set();
  const result = [];

  for (const email of graph.keys()) {
    if (!visited.has(email)) {
      visited.add(email);
      const component = [];
      const stack = [email];
      while (stack.length > 0) {
        const node = stack.pop();
        component.push(node);
        for (const neighbor of graph.get(node)) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            stack.push(neighbor);
          }
        }
      }
      component.sort();
      result.push([emailToName.get(email), ...component]);
    }
  }

  result.sort((a, b) => {
    if (a[0] !== b[0]) return a[0].localeCompare(b[0]);
    return a[1].localeCompare(b[1]);
  });

  return result;
}
