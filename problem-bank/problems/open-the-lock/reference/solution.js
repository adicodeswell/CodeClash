export function solve(deadends, target) {
  const dead = new Set(deadends);
  if (dead.has("0000")) return -1;
  if (target === "0000") return 0;

  const queue = [["0000", 0]];
  const visited = new Set(["0000"]);

  while (queue.length > 0) {
    const [cur, dist] = queue.shift();
    if (cur === target) return dist;

    for (let i = 0; i < 4; i++) {
      const d = Number(cur[i]);
      for (const diff of [-1, 1]) {
        const nextD = (d + diff + 10) % 10;
        const nextState = cur.slice(0, i) + nextD + cur.slice(i + 1);
        if (!dead.has(nextState) && !visited.has(nextState)) {
          visited.add(nextState);
          queue.push([nextState, dist + 1]);
        }
      }
    }
  }

  return -1;
}