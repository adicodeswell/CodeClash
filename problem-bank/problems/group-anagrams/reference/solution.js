export function solve(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = s.split("").sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }

  const result = [];
  for (const group of map.values()) {
    group.sort();
    result.push(group);
  }

  result.sort((a, b) => a[0].localeCompare(b[0]));
  return result;
}
