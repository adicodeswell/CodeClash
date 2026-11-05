export function solve(beginWord, endWord, wordList) {
  if (!wordList.includes(endWord)) return 0;
  const words = [beginWord, ...wordList];
  const n = words.length;

  function diffOne(w1, w2) {
    let diff = 0;
    for (let i = 0; i < w1.length; i++) {
      if (w1[i] !== w2[i]) diff++;
      if (diff > 1) return false;
    }
    return diff === 1;
  }

  const adj = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (diffOne(words[i], words[j])) {
        adj[i].push(j);
        adj[j].push(i);
      }
    }
  }

  const dist = Array(n).fill(Infinity);
  dist[0] = 1;
  const q = [0];

  while (q.length > 0) {
    const u = q.shift();
    if (words[u] === endWord) return dist[u];
    for (const v of adj[u]) {
      if (dist[v] === Infinity) {
        dist[v] = dist[u] + 1;
        q.push(v);
      }
    }
  }

  return 0;
}
