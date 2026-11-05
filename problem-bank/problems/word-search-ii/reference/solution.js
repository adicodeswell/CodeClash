class TrieNode {
  constructor() {
    this.children = {};
    this.word = null;
  }
}

export function solve(board, words) {
  const root = new TrieNode();
  for (const w of words) {
    let curr = root;
    for (const ch of w) {
      if (!curr.children[ch]) curr.children[ch] = new TrieNode();
      curr = curr.children[ch];
    }
    curr.word = w;
  }

  const m = board.length;
  const n = board[0].length;
  const found = new Set();
  const visited = Array.from({ length: m }, () => Array(n).fill(false));

  function dfs(r, c, node) {
    if (r < 0 || r >= m || c < 0 || c >= n || visited[r][c]) return;
    const ch = board[r][c];
    if (!node.children[ch]) return;

    const nextNode = node.children[ch];
    if (nextNode.word) {
      found.add(nextNode.word);
    }

    visited[r][c] = true;
    dfs(r + 1, c, nextNode);
    dfs(r - 1, c, nextNode);
    dfs(r, c + 1, nextNode);
    dfs(r, c - 1, nextNode);
    visited[r][c] = false;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      dfs(r, c, root);
    }
  }

  const res = Array.from(found);
  res.sort();
  return res;
}
