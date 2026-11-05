class WordNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

export function solve(operations, words) {
  const root = new WordNode();
  const result = [];

  function dfsSearch(node, word, idx) {
    if (idx === word.length) return node.isEnd;
    const ch = word[idx];
    if (ch === ".") {
      for (const key of Object.keys(node.children)) {
        if (dfsSearch(node.children[key], word, idx + 1)) return true;
      }
      return false;
    } else {
      if (!node.children[ch]) return false;
      return dfsSearch(node.children[ch], word, idx + 1);
    }
  }

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const word = words[i];

    if (op === "addWord") {
      let curr = root;
      for (const ch of word) {
        if (!curr.children[ch]) {
          curr.children[ch] = new WordNode();
        }
        curr = curr.children[ch];
      }
      curr.isEnd = true;
      result.push("null");
    } else if (op === "search") {
      result.push(dfsSearch(root, word, 0) ? "true" : "false");
    }
  }

  return result;
}
