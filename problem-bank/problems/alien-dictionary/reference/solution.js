export function solve(words) {
  const adj = new Map();
  const inDegree = new Map();

  for (const w of words) {
    for (const c of w) {
      if (!adj.has(c)) adj.set(c, new Set());
      if (!inDegree.has(c)) inDegree.set(c, 0);
    }
  }

  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i];
    const w2 = words[i + 1];
    const minLen = Math.min(w1.length, w2.length);
    if (w1.length > w2.length && w1.startsWith(w2)) {
      return "";
    }
    for (let j = 0; j < minLen; j++) {
      if (w1[j] !== w2[j]) {
        if (!adj.get(w1[j]).has(w2[j])) {
          adj.get(w1[j]).add(w2[j]);
          inDegree.set(w2[j], inDegree.get(w2[j]) + 1);
        }
        break;
      }
    }
  }

  // Canonical min-queue for deterministic topological sort
  const q = [];
  for (const [char, deg] of inDegree.entries()) {
    if (deg === 0) q.push(char);
  }
  q.sort();

  let res = "";
  while (q.length > 0) {
    const c = q.shift();
    res += c;
    for (const next of adj.get(c)) {
      inDegree.set(next, inDegree.get(next) - 1);
      if (inDegree.get(next) === 0) {
        q.push(next);
        q.sort();
      }
    }
  }

  return res.length === inDegree.size ? res : "";
}
