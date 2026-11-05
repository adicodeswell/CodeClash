import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve("problem-bank/problems");

async function writeProblem(slug, { problemMd, structureMd, solutionJs, baselineJs, testCasesJs }) {
  const dir = path.join(root, slug);
  await fs.mkdir(path.join(dir, "reference"), { recursive: true });
  await fs.mkdir(path.join(dir, "generators"), { recursive: true });

  await fs.writeFile(path.join(dir, "Problem.md"), problemMd.trim() + "\n");
  await fs.writeFile(path.join(dir, "Structure.md"), structureMd.trim() + "\n");
  await fs.writeFile(path.join(dir, "reference", "solution.js"), solutionJs.trim() + "\n");
  await fs.writeFile(path.join(dir, "reference", "baseline-solution.js"), baselineJs.trim() + "\n");
  await fs.writeFile(path.join(dir, "generators", "test-cases.js"), testCasesJs.trim() + "\n");
  console.log(`Created problem: ${slug}`);
}

async function main() {
  // 61. implement-trie-prefix-tree
  await writeProblem("implement-trie-prefix-tree", {
    problemMd: `# Implement Trie (Prefix Tree)

A **trie** (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement a Trie data structure supporting the following operations given by \`operations\` and corresponding parameters \`words\`:
- \`"insert"\`: Inserts the string \`word\` into the trie. Returns \`"null"\`.
- \`"search"\`: Returns \`"true"\` if the string \`word\` is in the trie (i.e., was inserted before), and \`"false"\` otherwise.
- \`"startsWith"\`: Returns \`"true"\` if there is a previously inserted string \`word\` that has the prefix \`prefix\`, and \`"false"\` otherwise.

### Examples

**Example 1:**
\`\`\`
Input:
operations = ["insert", "search", "search", "startsWith", "insert", "search"]
words = ["apple", "apple", "app", "app", "app", "app"]
Output: null true false true null true
\`\`\`

### Constraints

- \`1 <= operations.length <= 100\`
- \`operations.length == words.length\`
- \`1 <= words[i].length <= 20\`
- \`words[i]\` consists only of lowercase English letters.
- At most \`3 * 10^4\` calls in total will be made to \`insert\`, \`search\`, and \`startsWith\`.
`,
    structureMd: `Problem Name: "Implement Trie (Prefix Tree)"
Difficulty: MEDIUM
Topics: Hash Table, String, Design, Trie
Function Name: trieOperations

Input Structure:
Input Field: list<String> operations
Input Field: list<String> words

Output Structure:
Output Field: list<String> result
`,
    solutionJs: `class TrieNode {
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
`,
    baselineJs: `export function solve(operations, words) {
  const inserted = new Set();
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const word = words[i];

    if (op === "insert") {
      inserted.add(word);
      result.push("null");
    } else if (op === "search") {
      result.push(inserted.has(word) ? "true" : "false");
    } else if (op === "startsWith") {
      let match = false;
      for (const w of inserted) {
        if (w.startsWith(word)) {
          match = true;
          break;
        }
      }
      result.push(match ? "true" : "false");
    }
  }

  return result;
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

const letters = "abcdefghijklmnopqrstuvwxyz";

function randomWord(rng, minLen, maxLen) {
  const len = randomInt(rng, minLen, maxLen);
  let res = "";
  for (let i = 0; i < len; i++) {
    res += letters[randomInt(rng, 0, letters.length - 1)];
  }
  return res;
}

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Standard example",
    inputs: {
      operations: ["insert", "search", "search", "startsWith", "insert", "search"],
      words: ["apple", "apple", "app", "app", "app", "app"]
    }
  });

  cases.push({
    category: "basic",
    description: "Single insert and search",
    inputs: {
      operations: ["insert", "search", "startsWith"],
      words: ["codeclash", "codeclash", "code"]
    }
  });

  cases.push({
    category: "basic",
    description: "Missing prefix",
    inputs: {
      operations: ["insert", "search", "startsWith"],
      words: ["cat", "dog", "do"]
    }
  });

  cases.push({
    category: "basic",
    description: "Prefix exists but not full word",
    inputs: {
      operations: ["insert", "search", "startsWith"],
      words: ["banana", "ban", "ban"]
    }
  });

  for (let i = 4; i < 10; i++) {
    const ops = ["insert", "insert", "search", "startsWith", "search"];
    const w1 = randomWord(rng, 3, 5);
    const w2 = w1 + randomWord(rng, 1, 3);
    const words = [w1, w2, w1, w1.slice(0, 2), "xyz"];
    cases.push({
      category: "basic",
      description: "Basic combo " + i,
      inputs: { operations: ops, words }
    });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const pool = [randomWord(rng, 2, 4), randomWord(rng, 3, 6)];
    const ops = [];
    const words = [];
    const count = 10 + (i % 5);
    for (let j = 0; j < count; j++) {
      const type = pickRandom(rng, ["insert", "search", "startsWith"]);
      ops.push(type);
      const base = pickRandom(rng, pool);
      if (type === "startsWith") {
        words.push(base.slice(0, randomInt(rng, 1, base.length)));
      } else {
        words.push(rng() > 0.5 ? base : randomWord(rng, 2, 5));
      }
    }
    cases.push({
      category: "edge",
      description: "Edge case " + i,
      inputs: { operations: ops, words }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const ops = [];
    const words = [];
    for (let j = 0; j < 15; j++) {
      const op = pickRandom(rng, ["insert", "search", "startsWith"]);
      ops.push(op);
      words.push(randomWord(rng, 1, 2));
    }
    cases.push({
      category: "corner",
      description: "Corner short words " + i,
      inputs: { operations: ops, words }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const ops = [];
    const words = [];
    const vocabulary = [];
    for (let v = 0; v < 8; v++) vocabulary.push(randomWord(rng, 3, 8));
    for (let j = 0; j < 25; j++) {
      const op = pickRandom(rng, ["insert", "search", "startsWith"]);
      ops.push(op);
      const chosen = pickRandom(rng, vocabulary);
      if (op === "startsWith") {
        words.push(chosen.slice(0, randomInt(rng, 1, chosen.length)));
      } else {
        words.push(chosen);
      }
    }
    cases.push({
      category: "random",
      description: "Random test " + i,
      inputs: { operations: ops, words }
    });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const ops = [];
    const words = [];
    const vocabulary = [];
    for (let v = 0; v < 15; v++) vocabulary.push(randomWord(rng, 4, 10));
    for (let j = 0; j < 40; j++) {
      const op = pickRandom(rng, ["insert", "search", "startsWith"]);
      ops.push(op);
      const chosen = pickRandom(rng, vocabulary);
      if (op === "startsWith") {
        words.push(chosen.slice(0, randomInt(rng, 1, chosen.length)));
      } else {
        words.push(chosen);
      }
    }
    cases.push({
      category: "large",
      description: "Large test " + i,
      inputs: { operations: ops, words }
    });
  }

  return cases;
}
`
  });

  // 62. design-add-and-search-words-data-structure
  await writeProblem("design-add-and-search-words-data-structure", {
    problemMd: `# Design Add and Search Words Data Structure

Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the data structure supporting the following operations given by \`operations\` and \`words\`:
- \`"addWord"\`: Adds \`word\` to the data structure. Returns \`"null"\`.
- \`"search"\`: Returns \`"true"\` if there is any string in the data structure that matches \`word\` or \`"false"\` otherwise. A \`word\` may contain dots \`'.'\` where dots can be matched with any letter.

### Examples

**Example 1:**
\`\`\`
Input:
operations = ["addWord", "addWord", "addWord", "search", "search", "search", "search"]
words = ["bad", "dad", "mad", "pad", "bad", ".ad", "b.."]
Output: null null null false true true true
\`\`\`

### Constraints

- \`1 <= operations.length <= 100\`
- \`operations.length == words.length\`
- \`1 <= words[i].length <= 25\`
- \`words[i]\` in \`addWord\` consists of only lowercase English letters.
- \`words[i]\` in \`search\` consists of \`'.'\` or lowercase English letters.
- There will be at most \`2\` dots in \`words[i]\` for \`search\` queries.
`,
    structureMd: `Problem Name: "Design Add and Search Words Data Structure"
Difficulty: MEDIUM
Topics: String, Depth-First Search, Design, Trie
Function Name: wordDictionaryOperations

Input Structure:
Input Field: list<String> operations
Input Field: list<String> words

Output Structure:
Output Field: list<String> result
`,
    solutionJs: `class WordNode {
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
`,
    baselineJs: `export function solve(operations, words) {
  const dict = [];
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const word = words[i];

    if (op === "addWord") {
      dict.push(word);
      result.push("null");
    } else if (op === "search") {
      let match = false;
      for (const added of dict) {
        if (added.length !== word.length) continue;
        let ok = true;
        for (let j = 0; j < word.length; j++) {
          if (word[j] !== "." && word[j] !== added[j]) {
            ok = false;
            break;
          }
        }
        if (ok) {
          match = true;
          break;
        }
      }
      result.push(match ? "true" : "false");
    }
  }

  return result;
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

const letters = "abcdefghijklmnopqrstuvwxyz";

function randomWord(rng, minLen, maxLen) {
  const len = randomInt(rng, minLen, maxLen);
  let res = "";
  for (let i = 0; i < len; i++) {
    res += letters[randomInt(rng, 0, letters.length - 1)];
  }
  return res;
}

function withDots(rng, word, maxDots = 2) {
  const chars = word.split("");
  const dotCount = Math.min(chars.length, randomInt(rng, 1, maxDots));
  for (let d = 0; d < dotCount; d++) {
    const idx = randomInt(rng, 0, chars.length - 1);
    chars[idx] = ".";
  }
  return chars.join("");
}

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Standard example",
    inputs: {
      operations: ["addWord", "addWord", "addWord", "search", "search", "search", "search"],
      words: ["bad", "dad", "mad", "pad", "bad", ".ad", "b.."]
    }
  });

  cases.push({
    category: "basic",
    description: "Exact match and wildcard",
    inputs: {
      operations: ["addWord", "search", "search"],
      words: ["cat", "cat", "c.t"]
    }
  });

  for (let i = 2; i < 10; i++) {
    const wordsPool = ["apple", "apply", "ample", "apron"];
    const ops = ["addWord", "addWord", "search", "search", "search"];
    const w = [wordsPool[0], wordsPool[1], "app..", "a.p.e", "banana"];
    cases.push({
      category: "basic",
      description: "Basic wildcard " + i,
      inputs: { operations: ops, words: w }
    });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const pool = [randomWord(rng, 2, 4), randomWord(rng, 3, 5)];
    const ops = ["addWord", "addWord"];
    const words = [pool[0], pool[1]];
    for (let j = 0; j < 8; j++) {
      ops.push("search");
      const base = pickRandom(rng, pool);
      words.push(rng() > 0.4 ? withDots(rng, base, 1) : randomWord(rng, 2, 4));
    }
    cases.push({
      category: "edge",
      description: "Edge case " + i,
      inputs: { operations: ops, words }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const ops = ["addWord", "addWord", "addWord"];
    const w1 = randomWord(rng, 1, 2);
    const w2 = randomWord(rng, 1, 2);
    const words = [w1, w2, "z"];
    for (let j = 0; j < 6; j++) {
      ops.push("search");
      words.push(rng() > 0.5 ? "." : "a");
    }
    cases.push({
      category: "corner",
      description: "Corner single-char " + i,
      inputs: { operations: ops, words }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const ops = [];
    const words = [];
    const vocab = [];
    for (let v = 0; v < 6; v++) vocab.push(randomWord(rng, 3, 6));
    for (const v of vocab) {
      ops.push("addWord");
      words.push(v);
    }
    for (let j = 0; j < 15; j++) {
      ops.push("search");
      const base = pickRandom(rng, vocab);
      words.push(rng() > 0.3 ? withDots(rng, base, 2) : randomWord(rng, 3, 6));
    }
    cases.push({
      category: "random",
      description: "Random search " + i,
      inputs: { operations: ops, words }
    });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const ops = [];
    const words = [];
    const vocab = [];
    for (let v = 0; v < 12; v++) vocab.push(randomWord(rng, 4, 8));
    for (const v of vocab) {
      ops.push("addWord");
      words.push(v);
    }
    for (let j = 0; j < 25; j++) {
      ops.push("search");
      const base = pickRandom(rng, vocab);
      words.push(rng() > 0.3 ? withDots(rng, base, 2) : randomWord(rng, 4, 8));
    }
    cases.push({
      category: "large",
      description: "Large search " + i,
      inputs: { operations: ops, words }
    });
  }

  return cases;
}
`
  });

  // 63. word-search-ii
  await writeProblem("word-search-ii", {
    problemMd: `# Word Search II

Given an \`m x n\` board of characters and a list of strings \`words\`, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

Return the result sorted in lexicographical (alphabetical) order.

### Examples

**Example 1:**
\`\`\`
Input:
board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]
words = ["oath","pea","eat","rain"]
Output: eat oath
\`\`\`

**Example 2:**
\`\`\`
Input:
board = [["a","b"],["c","d"]]
words = ["abcb"]
Output: abcb
\`\`\`

### Constraints

- \`m == board.length\`
- \`n == board[i].length\`
- \`1 <= m, n <= 6\`
- \`board[i][j]\` is a lowercase English letter.
- \`1 <= words.length <= 15\`
- \`1 <= words[i].length <= 10\`
- \`words[i]\` consists of lowercase English letters.
- All strings of \`words\` are unique.
`,
    structureMd: `Problem Name: "Word Search II"
Difficulty: HARD
Topics: Array, String, Backtracking, Trie, Matrix
Function Name: findWords

Input Structure:
Input Field: list<list<String>> board
Input Field: list<String> words

Output Structure:
Output Field: list<String> result
`,
    solutionJs: `class TrieNode {
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
`,
    baselineJs: `export function solve(board, words) {
  const m = board.length;
  const n = board[0].length;
  const found = [];

  function exist(word) {
    function dfs(r, c, idx) {
      if (idx === word.length) return true;
      if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[idx]) return false;
      const temp = board[r][c];
      board[r][c] = "#";
      const res = dfs(r + 1, c, idx + 1) || dfs(r - 1, c, idx + 1) || dfs(r, c + 1, idx + 1) || dfs(r, c - 1, idx + 1);
      board[r][c] = temp;
      return res;
    }

    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        if (dfs(r, c, 0)) return true;
      }
    }
    return false;
  }

  for (const w of words) {
    if (exist(w)) {
      found.push(w);
    }
  }

  found.sort();
  return found;
}
`,
    testCasesJs: `import { randomInt, pickRandom, shuffle } from "../../../scripts/utils/prng.js";

const letters = "abcdefghijklmnopqrstuvwxyz";

function randomGrid(rng, m, n) {
  const grid = [];
  for (let r = 0; r < m; r++) {
    const row = [];
    for (let c = 0; c < n; c++) {
      row.push(letters[randomInt(rng, 0, letters.length - 1)]);
    }
    grid.push(row);
  }
  return grid;
}

// Extract a word of length len along a valid path on grid
function extractWord(rng, grid, len) {
  const m = grid.length;
  const n = grid[0].length;
  let r = randomInt(rng, 0, m - 1);
  let c = randomInt(rng, 0, n - 1);
  let word = grid[r][c];
  const visited = new Set([\`\${r},\${c}\`]);

  for (let step = 1; step < len; step++) {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const validDirs = dirs.filter(([dr, dc]) => {
      const nr = r + dr, nc = c + dc;
      return nr >= 0 && nr < m && nc >= 0 && nc < n && !visited.has(\`\${nr},\${nc}\`);
    });
    if (validDirs.length === 0) break;
    const [dr, dc] = pickRandom(rng, validDirs);
    r += dr;
    c += dc;
    visited.add(\`\${r},\${c}\`);
    word += grid[r][c];
  }
  return word;
}

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: {
      board: [
        ["o", "a", "a", "n"],
        ["e", "t", "a", "e"],
        ["i", "h", "k", "r"],
        ["i", "f", "l", "v"]
      ],
      words: ["oath", "pea", "eat", "rain"]
    }
  });

  cases.push({
    category: "basic",
    description: "Small 2x2 board",
    inputs: {
      board: [["a", "b"], ["c", "d"]],
      words: ["ab", "cd", "ac", "bd"]
    }
  });

  for (let i = 2; i < 10; i++) {
    const grid = randomGrid(rng, 3, 3);
    const guaranteed = extractWord(rng, grid, 3);
    const words = [guaranteed, "xyz", "qrs"];
    cases.push({
      category: "basic",
      description: "Basic grid " + i,
      inputs: { board: grid, words }
    });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const m = 2 + (i % 3);
    const n = 2 + ((i + 1) % 3);
    const grid = randomGrid(rng, m, n);
    const guaranteed1 = extractWord(rng, grid, 2);
    const guaranteed2 = extractWord(rng, grid, 3);
    const words = Array.from(new Set([guaranteed1, guaranteed2, "no", "yes"]));
    cases.push({
      category: "edge",
      description: "Edge grid " + i,
      inputs: { board: grid, words }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const grid = [["a", "a"], ["a", "a"]];
    cases.push({
      category: "corner",
      description: "Corner identical cells " + i,
      inputs: { board: grid, words: ["a", "aa", "aaa", "aaaa", "b"] }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const m = 4;
    const n = 4;
    const grid = randomGrid(rng, m, n);
    const wList = new Set();
    wList.add(extractWord(rng, grid, randomInt(rng, 2, 4)));
    wList.add(extractWord(rng, grid, randomInt(rng, 2, 4)));
    wList.add("notfound");
    cases.push({
      category: "random",
      description: "Random grid " + i,
      inputs: { board: grid, words: Array.from(wList) }
    });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const m = 5;
    const n = 5;
    const grid = randomGrid(rng, m, n);
    const wList = new Set();
    for (let k = 0; k < 4; k++) {
      wList.add(extractWord(rng, grid, randomInt(rng, 3, 5)));
    }
    wList.add("miss1");
    wList.add("miss2");
    cases.push({
      category: "large",
      description: "Large 5x5 grid " + i,
      inputs: { board: grid, words: Array.from(wList) }
    });
  }

  return cases;
}
`
  });
}

main().catch(console.error);
