export function solve(s) {
  let changed = true;
  let cur = s;
  while (changed) {
    changed = false;
    for (let i = 0; i < cur.length - 1; i++) {
      if (cur[i] === cur[i + 1]) {
        cur = cur.slice(0, i) + cur.slice(i + 2);
        changed = true;
        break;
      }
    }
  }
  return cur;
}