export function solve(accounts) {
  const emailToName = new Map();
  const parent = new Map();

  function find(x) {
    if (!parent.has(x)) parent.set(x, x);
    if (parent.get(x) !== x) parent.set(x, find(parent.get(x)));
    return parent.get(x);
  }

  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX !== rootY) parent.set(rootX, rootY);
  }

  for (const acc of accounts) {
    const name = acc[0];
    const firstEmail = acc[1];
    for (let i = 1; i < acc.length; i++) {
      const email = acc[i];
      emailToName.set(email, name);
      union(firstEmail, email);
    }
  }

  const groups = new Map();
  for (const email of emailToName.keys()) {
    const root = find(email);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(email);
  }

  const result = [];
  for (const [root, emails] of groups.entries()) {
    emails.sort();
    const name = emailToName.get(root);
    result.push([name, ...emails]);
  }

  result.sort((a, b) => {
    if (a[0] !== b[0]) return a[0].localeCompare(b[0]);
    return a[1].localeCompare(b[1]);
  });

  return result;
}
