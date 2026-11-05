class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

export function solve(operations, words) {
  const root = new TrieNode();
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const word = words[i];

    if (op === "insert") {
      let curr = root;
      for (const ch of word) {
        if (!curr.children[ch]) {
          curr.children[ch] = new TrieNode();
        }
        curr = curr.children[ch];
      }
      curr.isEnd = true;
      result.push("null");
    } else if (op === "search") {
      let curr = root;
      let found = true;
      for (const ch of word) {
        if (!curr.children[ch]) {
          found = false;
          break;
        }
        curr = curr.children[ch];
      }
      result.push(found && curr.isEnd ? "true" : "false");
    } else if (op === "startsWith") {
      let curr = root;
      let found = true;
      for (const ch of word) {
        if (!curr.children[ch]) {
          found = false;
          break;
        }
        curr = curr.children[ch];
      }
      result.push(found ? "true" : "false");
    }
  }

  return result;
}
