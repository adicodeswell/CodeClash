export function solve(deadends, target) {
  const deadSet = new Set(deadends);
  if (deadSet.has("0000")) return -1;
  if (target === "0000") return 0;

  let q = ["0000"];
  const seen = new Set(["0000"]);
  let steps = 0;

  while (q.length > 0) {
    const nextQ = [];
    steps++;
    for (const node of q) {
      for (let i = 0; i < 4; i++) {
        const val = Number(node[i]);
        const up = (val + 1) % 10;
        const down = (val + 9) % 10;
        for (const cand of [up, down]) {
          const neighbor = node.slice(0, i) + cand + node.slice(i + 1);
          if (neighbor === target) return steps;
          if (!deadSet.has(neighbor) && !seen.has(neighbor)) {
            seen.add(neighbor);
            nextQ.push(neighbor);
          }
        }
      }
    }
    q = nextQ;
  }
  return -1;
}