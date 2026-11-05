export function solve(strs) {
  const groups = [];
  function isAna(a, b) {
    if (a.length !== b.length) return false;
    return a.split("").sort().join("") === b.split("").sort().join("");
  }

  for (const s of strs) {
    let placed = false;
    for (const g of groups) {
      if (isAna(g[0], s)) {
        g.push(s);
        placed = true;
        break;
      }
    }
    if (!placed) groups.push([s]);
  }

  for (const g of groups) g.sort();
  groups.sort((a, b) => a[0].localeCompare(b[0]));
  return groups;
}
