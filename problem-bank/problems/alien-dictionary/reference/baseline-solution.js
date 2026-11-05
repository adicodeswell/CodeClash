export function solve(words) {
  const chars = new Set();
  for (const w of words) for (const c of w) chars.add(c);

  const graph = new Map();
  const inDeg = new Map();
  for (const c of chars) {
    graph.set(c, new Set());
    inDeg.set(c, 0);
  }

  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i], w2 = words[i + 1];
    if (w1.length > w2.length && w1.startsWith(w2)) return "";
    for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
      if (w1[j] !== w2[j]) {
        if (!graph.get(w1[j]).has(w2[j])) {
          graph.get(w1[j]).add(w2[j]);
          inDeg.set(w2[j], inDeg.get(w2[j]) + 1);
        }
        break;
      }
    }
  }

  const q = [];
  for (const [c, d] of inDeg.entries()) if (d === 0) q.push(c);
  q.sort();

  let ans = "";
  while (q.length > 0) {
    const curr = q.shift();
    ans += curr;
    for (const neighbor of graph.get(curr)) {
      inDeg.set(neighbor, inDeg.get(neighbor) - 1);
      if (inDeg.get(neighbor) === 0) {
        q.push(neighbor);
        q.sort();
      }
    }
  }

  return ans.length === chars.size ? ans : "";
}
