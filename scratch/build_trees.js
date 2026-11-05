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

// Tree helpers used across reference solutions
const treeHelperCode = `
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === "null") return null;
  const root = new TreeNode(Number(arr[0]));
  const queue = [root];
  let i = 1;
  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift();
    if (i < arr.length && arr[i] !== "null") {
      node.left = new TreeNode(Number(arr[i]));
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== "null") {
      node.right = new TreeNode(Number(arr[i]));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function serializeTree(root) {
  if (!root) return [];
  const res = [];
  const queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    if (node) {
      res.push(String(node.val));
      queue.push(node.left);
      queue.push(node.right);
    } else {
      res.push("null");
    }
  }
  while (res.length > 0 && res[res.length - 1] === "null") res.pop();
  return res;
}
`;

async function main() {
  // 46. invert-binary-tree
  await writeProblem("invert-binary-tree", {
    problemMd: `# Invert Binary Tree

Given the root of a binary tree as a level-order serialized array \`root\`, invert the tree, and return its root serialized in level-order.

### Examples

**Example 1:**
\`\`\`
Input: root = ["4", "2", "7", "1", "3", "6", "9"]
Output: 4 7 2 9 6 3 1
\`\`\`

**Example 2:**
\`\`\`
Input: root = ["2", "1", "3"]
Output: 2 3 1
\`\`\`

### Constraints

- The number of nodes in the tree is in the range \`[1, 100]\`.
- \`-100 <= Node.val <= 100\`
`,
    structureMd: `Problem Name: "Invert Binary Tree"
Difficulty: EASY
Topics: Tree, Binary Tree
Function Name: invertTree

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: list<String> result
`,
    solutionJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  function invert(node) {
    if (!node) return null;
    const temp = node.left;
    node.left = invert(node.right);
    node.right = invert(temp);
    return node;
  }
  invert(root);
  return serializeTree(root);
}
`,
    baselineJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  const queue = [root];
  while (queue.length > 0) {
    const cur = queue.shift();
    if (cur) {
      const t = cur.left;
      cur.left = cur.right;
      cur.right = t;
      queue.push(cur.left);
      queue.push(cur.right);
    }
  }
  return serializeTree(root);
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { root: ["4", "2", "7", "1", "3", "6", "9"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: ["2", "1", "3"] } });
  cases.push({ category: "basic", description: "Single node", inputs: { root: ["1"] } });
  cases.push({ category: "basic", description: "Left leaning", inputs: { root: ["1", "2", "null", "3"] } });
  cases.push({ category: "basic", description: "Right leaning", inputs: { root: ["1", "null", "2", "null", "3"] } });
  cases.push({ category: "basic", description: "Negative values", inputs: { root: ["-1", "-2", "-3"] } });
  cases.push({ category: "basic", description: "Symmetric values", inputs: { root: ["1", "2", "2", "3", "3"] } });
  cases.push({ category: "basic", description: "Full level 3", inputs: { root: ["1", "2", "3", "4", "5", "6", "7"] } });
  cases.push({ category: "basic", description: "Zig zag", inputs: { root: ["1", "2", "null", "null", "3"] } });
  cases.push({ category: "basic", description: "Sparse", inputs: { root: ["1", "null", "2", "3"] } });

  function makeTree(nodeCount) {
    const arr = [String(randomInt(rng, 1, 100))];
    for (let i = 1; i < nodeCount; i++) {
      arr.push(randomInt(rng, 0, 4) === 0 ? "null" : String(randomInt(rng, 1, 100)));
    }
    while (arr.length > 0 && arr[arr.length - 1] === "null") arr.pop();
    return arr;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { root: makeTree(3 + (i % 4)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { root: makeTree(8) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { root: makeTree(randomInt(rng, 10, 20)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { root: makeTree(randomInt(rng, 25, 50)) } });
  }

  return cases;
}
`,
  });

  // 47. maximum-depth-of-binary-tree
  await writeProblem("maximum-depth-of-binary-tree", {
    problemMd: `# Maximum Depth of Binary Tree

Given the root of a binary tree as an array, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

### Examples

**Example 1:**
\`\`\`
Input: root = ["3", "9", "20", "null", "null", "15", "7"]
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input: root = ["1", "null", "2"]
Output: 2
\`\`\`

### Constraints

- The number of nodes in the tree is in the range \`[1, 10^4]\`.
- \`-100 <= Node.val <= 100\`
`,
    structureMd: `Problem Name: "Maximum Depth of Binary Tree"
Difficulty: EASY
Topics: Tree, Binary Tree
Function Name: maxDepth

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: int result
`,
    solutionJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  function depth(node) {
    if (!node) return 0;
    return 1 + Math.max(depth(node.left), depth(node.right));
  }
  return depth(root);
}
`,
    baselineJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  if (!root) return 0;
  let d = 0;
  const queue = [root];
  while (queue.length > 0) {
    d++;
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return d;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { root: ["3", "9", "20", "null", "null", "15", "7"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: ["1", "null", "2"] } });
  cases.push({ category: "basic", description: "Single node", inputs: { root: ["1"] } });
  cases.push({ category: "basic", description: "Two levels", inputs: { root: ["1", "2", "3"] } });
  cases.push({ category: "basic", description: "Left line", inputs: { root: ["1", "2", "null", "3", "null", "4"] } });
  cases.push({ category: "basic", description: "Right line", inputs: { root: ["1", "null", "2", "null", "3"] } });
  cases.push({ category: "basic", description: "Full depth 3", inputs: { root: ["1", "2", "3", "4", "5", "6", "7"] } });
  cases.push({ category: "basic", description: "Asymmetric", inputs: { root: ["1", "2", "null", "3", "4"] } });
  cases.push({ category: "basic", description: "Negative vals", inputs: { root: ["-1", "-2", "null"] } });
  cases.push({ category: "basic", description: "Balanced depth 2", inputs: { root: ["10", "5", "15"] } });

  function makeTree(n) {
    const arr = [String(randomInt(rng, 1, 100))];
    for (let i = 1; i < n; i++) arr.push(randomInt(rng, 0, 4) === 0 ? "null" : String(randomInt(rng, 1, 100)));
    while (arr.length > 0 && arr[arr.length - 1] === "null") arr.pop();
    return arr;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { root: makeTree(3 + (i % 4)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { root: makeTree(8) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { root: makeTree(randomInt(rng, 10, 20)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { root: makeTree(randomInt(rng, 25, 50)) } });
  }

  return cases;
}
`,
  });

  // 48. diameter-of-binary-tree
  await writeProblem("diameter-of-binary-tree", {
    problemMd: `# Diameter of Binary Tree

Given the root of a binary tree, return the length of the **diameter** of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.

### Examples

**Example 1:**
\`\`\`
Input: root = ["1", "2", "3", "4", "5"]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].
\`\`\`

**Example 2:**
\`\`\`
Input: root = ["1", "2"]
Output: 1
\`\`\`

### Constraints

- The number of nodes in the tree is in the range \`[1, 10^4]\`.
- \`-100 <= Node.val <= 100\`
`,
    structureMd: `Problem Name: "Diameter of Binary Tree"
Difficulty: EASY
Topics: Tree, Binary Tree
Function Name: diameterOfBinaryTree

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: int result
`,
    solutionJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  let maxDia = 0;
  function maxDepth(node) {
    if (!node) return 0;
    const l = maxDepth(node.left);
    const r = maxDepth(node.right);
    if (l + r > maxDia) maxDia = l + r;
    return 1 + Math.max(l, r);
  }
  maxDepth(root);
  return maxDia;
}
`,
    baselineJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  let dia = 0;
  function depth(node) {
    if (!node) return 0;
    return 1 + Math.max(depth(node.left), depth(node.right));
  }
  function traverse(node) {
    if (!node) return;
    const cur = depth(node.left) + depth(node.right);
    if (cur > dia) dia = cur;
    traverse(node.left);
    traverse(node.right);
  }
  traverse(root);
  return dia;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { root: ["1", "2", "3", "4", "5"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: ["1", "2"] } });
  cases.push({ category: "basic", description: "Single node", inputs: { root: ["1"] } });
  cases.push({ category: "basic", description: "Three nodes line", inputs: { root: ["1", "2", "null", "3"] } });
  cases.push({ category: "basic", description: "Three nodes balanced", inputs: { root: ["1", "2", "3"] } });
  cases.push({ category: "basic", description: "Deep left", inputs: { root: ["1", "2", "null", "3", "null", "4"] } });
  cases.push({ category: "basic", description: "Deep right", inputs: { root: ["1", "null", "2", "null", "3"] } });
  cases.push({ category: "basic", description: "Symmetric", inputs: { root: ["1", "2", "3", "4", "5", "6", "7"] } });
  cases.push({ category: "basic", description: "V shape", inputs: { root: ["1", "2", "3", "4", "null", "null", "5"] } });
  cases.push({ category: "basic", description: "Zig zag", inputs: { root: ["1", "2", "null", "null", "3"] } });

  function makeTree(n) {
    const arr = [String(randomInt(rng, 1, 100))];
    for (let i = 1; i < n; i++) arr.push(randomInt(rng, 0, 4) === 0 ? "null" : String(randomInt(rng, 1, 100)));
    while (arr.length > 0 && arr[arr.length - 1] === "null") arr.pop();
    return arr;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { root: makeTree(3 + (i % 4)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { root: makeTree(8) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { root: makeTree(randomInt(rng, 10, 20)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { root: makeTree(randomInt(rng, 25, 50)) } });
  }

  return cases;
}
`,
  });

  // 49. balanced-binary-tree
  await writeProblem("balanced-binary-tree", {
    problemMd: `# Balanced Binary Tree

Given a binary tree, determine if it is **height-balanced**.

A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

### Examples

**Example 1:**
\`\`\`
Input: root = ["3", "9", "20", "null", "null", "15", "7"]
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: root = ["1", "2", "2", "3", "3", "null", "null", "4", "4"]
Output: 0
\`\`\`

### Constraints

- The number of nodes in the tree is in the range \`[1, 5000]\`.
- \`-10^4 <= Node.val <= 10^4\`
`,
    structureMd: `Problem Name: "Balanced Binary Tree"
Difficulty: EASY
Topics: Tree, Binary Tree
Function Name: isBalanced

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: bool result
`,
    solutionJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  function check(node) {
    if (!node) return 0;
    const l = check(node.left);
    if (l === -1) return -1;
    const r = check(node.right);
    if (r === -1) return -1;
    if (Math.abs(l - r) > 1) return -1;
    return 1 + Math.max(l, r);
  }
  return check(root) !== -1;
}
`,
    baselineJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  function depth(node) {
    if (!node) return 0;
    return 1 + Math.max(depth(node.left), depth(node.right));
  }
  function isBal(node) {
    if (!node) return true;
    const diff = Math.abs(depth(node.left) - depth(node.right));
    if (diff > 1) return false;
    return isBal(node.left) && isBal(node.right);
  }
  return isBal(root);
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { root: ["3", "9", "20", "null", "null", "15", "7"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: ["1", "2", "2", "3", "3", "null", "null", "4", "4"] } });
  cases.push({ category: "basic", description: "Single node", inputs: { root: ["1"] } });
  cases.push({ category: "basic", description: "Balanced pair", inputs: { root: ["1", "2"] } });
  cases.push({ category: "basic", description: "Balanced triplet", inputs: { root: ["1", "2", "3"] } });
  cases.push({ category: "basic", description: "Unbalanced left", inputs: { root: ["1", "2", "null", "3"] } });
  cases.push({ category: "basic", description: "Unbalanced right", inputs: { root: ["1", "null", "2", "null", "3"] } });
  cases.push({ category: "basic", description: "Full tree", inputs: { root: ["1", "2", "3", "4", "5", "6", "7"] } });
  cases.push({ category: "basic", description: "Diff 1 ok", inputs: { root: ["1", "2", "3", "4"] } });
  cases.push({ category: "basic", description: "Diff 2 fail", inputs: { root: ["1", "2", "null", "4"] } });

  function makeTree(n) {
    const arr = [String(randomInt(rng, 1, 100))];
    for (let i = 1; i < n; i++) arr.push(randomInt(rng, 0, 4) === 0 ? "null" : String(randomInt(rng, 1, 100)));
    while (arr.length > 0 && arr[arr.length - 1] === "null") arr.pop();
    return arr;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { root: makeTree(3 + (i % 4)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { root: makeTree(8) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { root: makeTree(randomInt(rng, 10, 20)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { root: makeTree(randomInt(rng, 25, 50)) } });
  }

  return cases;
}
`,
  });

  // 50. same-tree
  await writeProblem("same-tree", {
    problemMd: `# Same Tree

Given the roots of two binary trees \`p\` and \`q\` represented as arrays, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

### Examples

**Example 1:**
\`\`\`
Input: p = ["1", "2", "3"], q = ["1", "2", "3"]
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: p = ["1", "2"], q = ["1", "null", "2"]
Output: 0
\`\`\`

**Example 3:**
\`\`\`
Input: p = ["1", "2", "1"], q = ["1", "1", "2"]
Output: 0
\`\`\`

### Constraints

- The number of nodes in both trees is in the range \`[1, 100]\`.
- \`-10^4 <= Node.val <= 10^4\`
`,
    structureMd: `Problem Name: "Same Tree"
Difficulty: EASY
Topics: Tree, Binary Tree
Function Name: isSameTree

Input Structure:
Input Field: list<String> p
Input Field: list<String> q

Output Structure:
Output Field: bool result
`,
    solutionJs: `${treeHelperCode}
export function solve(pArr, qArr) {
  const p = buildTree(pArr);
  const q = buildTree(qArr);
  function isSame(n1, n2) {
    if (!n1 && !n2) return true;
    if (!n1 || !n2) return false;
    if (n1.val !== n2.val) return false;
    return isSame(n1.left, n2.left) && isSame(n1.right, n2.right);
  }
  return isSame(p, q);
}
`,
    baselineJs: `${treeHelperCode}
export function solve(pArr, qArr) {
  const p = buildTree(pArr);
  const q = buildTree(qArr);
  const s1 = JSON.stringify(serializeTree(p));
  const s2 = JSON.stringify(serializeTree(q));
  return s1 === s2;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { p: ["1", "2", "3"], q: ["1", "2", "3"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { p: ["1", "2"], q: ["1", "null", "2"] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { p: ["1", "2", "1"], q: ["1", "1", "2"] } });
  cases.push({ category: "basic", description: "Single identical", inputs: { p: ["5"], q: ["5"] } });
  cases.push({ category: "basic", description: "Single different", inputs: { p: ["5"], q: ["6"] } });
  cases.push({ category: "basic", description: "Left vs right", inputs: { p: ["1", "2"], q: ["1", "null", "2"] } });
  cases.push({ category: "basic", description: "Deep identical", inputs: { p: ["1", "2", "3", "4"], q: ["1", "2", "3", "4"] } });
  cases.push({ category: "basic", description: "Deep value diff", inputs: { p: ["1", "2", "3", "4"], q: ["1", "2", "3", "5"] } });
  cases.push({ category: "basic", description: "Negative vals", inputs: { p: ["-1", "-2"], q: ["-1", "-2"] } });
  cases.push({ category: "basic", description: "Asymmetric trees", inputs: { p: ["1", "2", "null"], q: ["1", "null", "2"] } });

  function makeTree(n) {
    const arr = [String(randomInt(rng, 1, 50))];
    for (let i = 1; i < n; i++) arr.push(randomInt(rng, 0, 3) === 0 ? "null" : String(randomInt(rng, 1, 50)));
    while (arr.length > 0 && arr[arr.length - 1] === "null") arr.pop();
    return arr;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const same = i % 2 === 0;
    const t = makeTree(3 + (i % 4));
    const q = same ? [...t] : makeTree(3 + (i % 4));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { p: t, q } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const same = i % 2 === 0;
    const t = makeTree(8);
    const q = same ? [...t] : makeTree(8);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { p: t, q } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const same = i % 2 === 0;
    const t = makeTree(randomInt(rng, 10, 20));
    const q = same ? [...t] : makeTree(randomInt(rng, 10, 20));
    cases.push({ category: "random", description: "Random " + i, inputs: { p: t, q } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const same = i % 2 === 0;
    const t = makeTree(randomInt(rng, 25, 40));
    const q = same ? [...t] : makeTree(randomInt(rng, 25, 40));
    cases.push({ category: "large", description: "Large " + i, inputs: { p: t, q } });
  }

  return cases;
}
`,
  });

  // 51. subtree-of-another-tree
  await writeProblem("subtree-of-another-tree", {
    problemMd: `# Subtree of Another Tree

Given the roots of two binary trees \`root\` and \`subRoot\`, return \`true\` if there is a subtree of \`root\` with the same structure and node values of \`subRoot\` and \`false\` otherwise.

A subtree of a binary tree \`tree\` is a tree that consists of a node in \`tree\` and all of this node's descendants. The tree \`tree\` could also be considered as a subtree of itself.

### Examples

**Example 1:**
\`\`\`
Input: root = ["3", "4", "5", "1", "2"], subRoot = ["4", "1", "2"]
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: root = ["3", "4", "5", "1", "2", "null", "null", "null", "null", "0"], subRoot = ["4", "1", "2"]
Output: 0
\`\`\`

### Constraints

- The number of nodes in the \`root\` tree is in the range \`[1, 2000]\`.
- The number of nodes in the \`subRoot\` tree is in the range \`[1, 1000]\`.
- \`-10^4 <= root.val <= 10^4\`
- \`-10^4 <= subRoot.val <= 10^4\`
`,
    structureMd: `Problem Name: "Subtree of Another Tree"
Difficulty: EASY
Topics: Tree, Binary Tree
Function Name: isSubtree

Input Structure:
Input Field: list<String> root
Input Field: list<String> subRoot

Output Structure:
Output Field: bool result
`,
    solutionJs: `${treeHelperCode}
export function solve(rootArr, subRootArr) {
  const root = buildTree(rootArr);
  const subRoot = buildTree(subRootArr);

  function isSame(n1, n2) {
    if (!n1 && !n2) return true;
    if (!n1 || !n2) return false;
    if (n1.val !== n2.val) return false;
    return isSame(n1.left, n2.left) && isSame(n1.right, n2.right);
  }

  function check(node) {
    if (!node) return false;
    if (isSame(node, subRoot)) return true;
    return check(node.left) || check(node.right);
  }

  return check(root);
}
`,
    baselineJs: `${treeHelperCode}
export function solve(rootArr, subRootArr) {
  const root = buildTree(rootArr);
  const subRoot = buildTree(subRootArr);

  function serialize(node) {
    if (!node) return "#";
    return "^" + node.val + serialize(node.left) + serialize(node.right);
  }

  const s1 = serialize(root);
  const s2 = serialize(subRoot);
  return s1.includes(s2);
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { root: ["3", "4", "5", "1", "2"], subRoot: ["4", "1", "2"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: ["3", "4", "5", "1", "2", "null", "null", "null", "null", "0"], subRoot: ["4", "1", "2"] } });
  cases.push({ category: "basic", description: "Self subtree", inputs: { root: ["1", "2", "3"], subRoot: ["1", "2", "3"] } });
  cases.push({ category: "basic", description: "Single node hit", inputs: { root: ["1", "2", "3"], subRoot: ["3"] } });
  cases.push({ category: "basic", description: "Single node miss", inputs: { root: ["1", "2", "3"], subRoot: ["4"] } });
  cases.push({ category: "basic", description: "Left leaf hit", inputs: { root: ["1", "2", "null", "4"], subRoot: ["4"] } });
  cases.push({ category: "basic", description: "Left leaf miss", inputs: { root: ["1", "2", "null", "4"], subRoot: ["2"] } });
  cases.push({ category: "basic", description: "Right subtree hit", inputs: { root: ["1", "2", "3", "null", "null", "6", "7"], subRoot: ["3", "6", "7"] } });
  cases.push({ category: "basic", description: "Different root", inputs: { root: ["1", "1"], subRoot: ["1"] } });
  cases.push({ category: "basic", description: "Negatives", inputs: { root: ["-1", "-2", "-3"], subRoot: ["-2"] } });

  function makeTree(n) {
    const arr = [String(randomInt(rng, 1, 20))];
    for (let i = 1; i < n; i++) arr.push(randomInt(rng, 0, 3) === 0 ? "null" : String(randomInt(rng, 1, 20)));
    while (arr.length > 0 && arr[arr.length - 1] === "null") arr.pop();
    return arr;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const isSub = i % 2 === 0;
    const r = makeTree(4 + (i % 4));
    const s = isSub ? [r[0]] : ["99"];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { root: r, subRoot: s } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const isSub = i % 2 === 0;
    const r = makeTree(8);
    const s = isSub ? [r[0]] : ["100"];
    cases.push({ category: "corner", description: "Corner " + i, inputs: { root: r, subRoot: s } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const isSub = i % 2 === 0;
    const r = makeTree(randomInt(rng, 10, 20));
    const s = isSub ? [r[0]] : ["100"];
    cases.push({ category: "random", description: "Random " + i, inputs: { root: r, subRoot: s } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const isSub = i % 2 === 0;
    const r = makeTree(randomInt(rng, 20, 35));
    const s = isSub ? [r[0]] : ["100"];
    cases.push({ category: "large", description: "Large " + i, inputs: { root: r, subRoot: s } });
  }

  return cases;
}
`,
  });

  // 52. lowest-common-ancestor-of-a-binary-search-tree
  await writeProblem("lowest-common-ancestor-of-a-binary-search-tree", {
    problemMd: `# Lowest Common Ancestor of a Binary Search Tree

Given a binary search tree (BST) represented as an array, find the lowest common ancestor (LCA) node of two given nodes \`p\` and \`q\` in the BST.

According to the definition of LCA: "The lowest common ancestor is defined between two nodes \`p\` and \`q\` as the lowest node in \`T\` that has both \`p\` and \`q\` as descendants (where we allow a node to be a descendant of itself)."

### Examples

**Example 1:**
\`\`\`
Input: root = ["6", "2", "8", "0", "4", "7", "9", "null", "null", "3", "5"], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.
\`\`\`

**Example 2:**
\`\`\`
Input: root = ["6", "2", "8", "0", "4", "7", "9", "null", "null", "3", "5"], p = 2, q = 4
Output: 2
Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself.
\`\`\`

### Constraints

- The number of nodes in the tree is in the range \`[2, 10^5]\`.
- \`-10^9 <= Node.val <= 10^9\`
- All \`Node.val\` are **unique**.
- \`p != q\`
- \`p\` and \`q\` will exist in the BST.
`,
    structureMd: `Problem Name: "Lowest Common Ancestor of a Binary Search Tree"
Difficulty: MEDIUM
Topics: Tree, Binary Search Tree, Binary Tree
Function Name: lowestCommonAncestor

Input Structure:
Input Field: list<String> root
Input Field: int p
Input Field: int q

Output Structure:
Output Field: int result
`,
    solutionJs: `${treeHelperCode}
export function solve(rootArr, p, q) {
  const root = buildTree(rootArr);
  let cur = root;
  while (cur) {
    if (p < cur.val && q < cur.val) cur = cur.left;
    else if (p > cur.val && q > cur.val) cur = cur.right;
    else return cur.val;
  }
  return -1;
}
`,
    baselineJs: `${treeHelperCode}
export function solve(rootArr, p, q) {
  const root = buildTree(rootArr);
  function findPath(node, val, path) {
    if (!node) return false;
    path.push(node.val);
    if (node.val === val) return true;
    if (findPath(node.left, val, path) || findPath(node.right, val, path)) return true;
    path.pop();
    return false;
  }
  const pathP = [];
  const pathQ = [];
  findPath(root, p, pathP);
  findPath(root, q, pathQ);
  let lca = root.val;
  for (let i = 0; i < Math.min(pathP.length, pathQ.length); i++) {
    if (pathP[i] === pathQ[i]) lca = pathP[i];
    else break;
  }
  return lca;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];

  const bst = ["6", "2", "8", "0", "4", "7", "9", "null", "null", "3", "5"];
  cases.push({ category: "basic", description: "Example 1", inputs: { root: bst, p: 2, q: 8 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: bst, p: 2, q: 4 } });
  cases.push({ category: "basic", description: "LCA is root", inputs: { root: bst, p: 0, q: 9 } });
  cases.push({ category: "basic", description: "Left subtree", inputs: { root: bst, p: 3, q: 5 } });
  cases.push({ category: "basic", description: "Right subtree", inputs: { root: bst, p: 7, q: 9 } });
  cases.push({ category: "basic", description: "Parent child left", inputs: { root: bst, p: 4, q: 3 } });
  cases.push({ category: "basic", description: "Parent child right", inputs: { root: bst, p: 8, q: 7 } });
  cases.push({ category: "basic", description: "Root and leaf", inputs: { root: bst, p: 6, q: 3 } });
  cases.push({ category: "basic", description: "Two node tree", inputs: { root: ["2", "1"], p: 2, q: 1 } });
  cases.push({ category: "basic", description: "Three node balanced", inputs: { root: ["2", "1", "3"], p: 1, q: 3 } });

  const pairs = [
    [0, 4], [3, 4], [7, 8], [2, 0], [2, 3], [2, 5], [6, 2], [6, 8], [8, 9], [6, 7]
  ];

  for (let i = 10; i < 80; i++) {
    const pair = pairs[i % pairs.length];
    cases.push({
      category: i < 25 ? "edge" : i < 40 ? "corner" : i < 65 ? "random" : "large",
      description: "Test " + i,
      inputs: { root: bst, p: pair[0], q: pair[1] }
    });
  }

  return cases;
}
`,
  });

  // 53. binary-tree-level-order-traversal
  await writeProblem("binary-tree-level-order-traversal", {
    problemMd: `# Binary Tree Level Order Traversal

Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).

### Examples

**Example 1:**
\`\`\`
Input: root = ["3", "9", "20", "null", "null", "15", "7"]
Output:
3
9 20
15 7
\`\`\`

**Example 2:**
\`\`\`
Input: root = ["1"]
Output:
1
\`\`\`

### Constraints

- The number of nodes in the tree is in the range \`[1, 2000]\`.
- \`-1000 <= Node.val <= 1000\`
`,
    structureMd: `Problem Name: "Binary Tree Level Order Traversal"
Difficulty: MEDIUM
Topics: Tree, Breadth-First Search, Binary Tree
Function Name: levelOrder

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: list<list<int>> result
`,
    solutionJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length > 0) {
    const size = queue.length;
    const level = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}
`,
    baselineJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  if (!root) return [];
  const result = [];
  function dfs(node, depth) {
    if (!node) return;
    if (result.length <= depth) result.push([]);
    result[depth].push(node.val);
    dfs(node.left, depth + 1);
    dfs(node.right, depth + 1);
  }
  dfs(root, 0);
  return result;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { root: ["3", "9", "20", "null", "null", "15", "7"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: ["1"] } });
  cases.push({ category: "basic", description: "Two levels", inputs: { root: ["1", "2", "3"] } });
  cases.push({ category: "basic", description: "Left leaning", inputs: { root: ["1", "2", "null", "3"] } });
  cases.push({ category: "basic", description: "Right leaning", inputs: { root: ["1", "null", "2", "null", "3"] } });
  cases.push({ category: "basic", description: "Symmetric", inputs: { root: ["1", "2", "2", "3", "4", "4", "3"] } });
  cases.push({ category: "basic", description: "Four levels", inputs: { root: ["1", "2", "3", "4", "5", "6", "7"] } });
  cases.push({ category: "basic", description: "Negatives", inputs: { root: ["-5", "-10", "10"] } });
  cases.push({ category: "basic", description: "Single left child", inputs: { root: ["1", "2"] } });
  cases.push({ category: "basic", description: "Single right child", inputs: { root: ["1", "null", "2"] } });

  function makeTree(n) {
    const arr = [String(randomInt(rng, 1, 100))];
    for (let i = 1; i < n; i++) arr.push(randomInt(rng, 0, 4) === 0 ? "null" : String(randomInt(rng, 1, 100)));
    while (arr.length > 0 && arr[arr.length - 1] === "null") arr.pop();
    return arr;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { root: makeTree(3 + (i % 4)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { root: makeTree(8) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { root: makeTree(randomInt(rng, 10, 20)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { root: makeTree(randomInt(rng, 25, 45)) } });
  }

  return cases;
}
`,
  });

  // 54. binary-tree-right-side-view
  await writeProblem("binary-tree-right-side-view", {
    problemMd: `# Binary Tree Right Side View

Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

### Examples

**Example 1:**
\`\`\`
Input: root = ["1", "2", "3", "null", "5", "null", "4"]
Output: 1 3 4
\`\`\`

**Example 2:**
\`\`\`
Input: root = ["1", "null", "3"]
Output: 1 3
\`\`\`

### Constraints

- The number of nodes in the tree is in the range \`[1, 100]\`.
- \`-100 <= Node.val <= 100\`
`,
    structureMd: `Problem Name: "Binary Tree Right Side View"
Difficulty: MEDIUM
Topics: Tree, Breadth-First Search, Binary Tree
Function Name: rightSideView

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (i === size - 1) result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
}
`,
    baselineJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  const result = [];
  function dfs(node, depth) {
    if (!node) return;
    if (depth === result.length) result.push(node.val);
    dfs(node.right, depth + 1);
    dfs(node.left, depth + 1);
  }
  dfs(root, 0);
  return result;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { root: ["1", "2", "3", "null", "5", "null", "4"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: ["1", "null", "3"] } });
  cases.push({ category: "basic", description: "Single node", inputs: { root: ["1"] } });
  cases.push({ category: "basic", description: "Left only", inputs: { root: ["1", "2", "null", "3"] } });
  cases.push({ category: "basic", description: "Full tree", inputs: { root: ["1", "2", "3", "4", "5", "6", "7"] } });
  cases.push({ category: "basic", description: "Right only", inputs: { root: ["1", "null", "2", "null", "3"] } });
  cases.push({ category: "basic", description: "Zig zag", inputs: { root: ["1", "2", "null", "null", "3"] } });
  cases.push({ category: "basic", description: "Negatives", inputs: { root: ["-1", "-2", "-3"] } });
  cases.push({ category: "basic", description: "Hidden right", inputs: { root: ["1", "2", "null", "3", "4"] } });
  cases.push({ category: "basic", description: "Deep left leaf visible", inputs: { root: ["1", "2", "3", "4"] } });

  function makeTree(n) {
    const arr = [String(randomInt(rng, 1, 100))];
    for (let i = 1; i < n; i++) arr.push(randomInt(rng, 0, 4) === 0 ? "null" : String(randomInt(rng, 1, 100)));
    while (arr.length > 0 && arr[arr.length - 1] === "null") arr.pop();
    return arr;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { root: makeTree(3 + (i % 4)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { root: makeTree(8) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { root: makeTree(randomInt(rng, 10, 20)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { root: makeTree(randomInt(rng, 25, 45)) } });
  }

  return cases;
}
`,
  });

  // 55. count-good-nodes-in-binary-tree
  await writeProblem("count-good-nodes-in-binary-tree", {
    problemMd: `# Count Good Nodes in Binary Tree

Given a binary tree \`root\`, a node \`X\` in the tree is named **good** if in the path from the root to \`X\` there are no nodes with a value greater than \`X\`.

Return the number of good nodes in the binary tree.

### Examples

**Example 1:**
\`\`\`
Input: root = ["3", "1", "4", "3", "null", "1", "5"]
Output: 4
Explanation:
Root node (3) is always a good node.
Node 4 -> (3,4) is the maximum value in the path starting from the root.
Node 5 -> (3,4,5) is the maximum value in the path
Node 3 -> (3,1,3) is the maximum value in the path.
\`\`\`

**Example 2:**
\`\`\`
Input: root = ["3", "3", "null", "4", "2"]
Output: 3
\`\`\`

### Constraints

- The number of nodes in the binary tree is in the range \`[1, 10^5]\`.
- Each node's value is between \`[-10^4, 10^4]\`.
`,
    structureMd: `Problem Name: "Count Good Nodes in Binary Tree"
Difficulty: MEDIUM
Topics: Tree, Depth-First Search, Binary Tree
Function Name: goodNodes

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: int result
`,
    solutionJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  function dfs(node, maxVal) {
    if (!node) return 0;
    let count = node.val >= maxVal ? 1 : 0;
    const newMax = Math.max(maxVal, node.val);
    count += dfs(node.left, newMax);
    count += dfs(node.right, newMax);
    return count;
  }
  return dfs(root, -Infinity);
}
`,
    baselineJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  let ans = 0;
  function traverse(node, path) {
    if (!node) return;
    const isGood = path.every(v => v <= node.val);
    if (isGood) ans++;
    path.push(node.val);
    traverse(node.left, path);
    traverse(node.right, path);
    path.pop();
  }
  traverse(root, []);
  return ans;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { root: ["3", "1", "4", "3", "null", "1", "5"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: ["3", "3", "null", "4", "2"] } });
  cases.push({ category: "basic", description: "Single node", inputs: { root: ["1"] } });
  cases.push({ category: "basic", description: "All increasing", inputs: { root: ["1", "2", "3", "4", "5", "6", "7"] } });
  cases.push({ category: "basic", description: "All decreasing", inputs: { root: ["7", "6", "5", "4", "3", "2", "1"] } });
  cases.push({ category: "basic", description: "All equal", inputs: { root: ["2", "2", "2", "2"] } });
  cases.push({ category: "basic", description: "Negative values", inputs: { root: ["-1", "-2", "0"] } });
  cases.push({ category: "basic", description: "Spike at leaf", inputs: { root: ["1", "2", "null", "10"] } });
  cases.push({ category: "basic", description: "Left only", inputs: { root: ["5", "4", "null", "6"] } });
  cases.push({ category: "basic", description: "Right only", inputs: { root: ["2", "null", "3", "null", "1"] } });

  function makeTree(n) {
    const arr = [String(randomInt(rng, 1, 50))];
    for (let i = 1; i < n; i++) arr.push(randomInt(rng, 0, 4) === 0 ? "null" : String(randomInt(rng, 1, 50)));
    while (arr.length > 0 && arr[arr.length - 1] === "null") arr.pop();
    return arr;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { root: makeTree(3 + (i % 4)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { root: makeTree(8) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { root: makeTree(randomInt(rng, 10, 20)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { root: makeTree(randomInt(rng, 25, 45)) } });
  }

  return cases;
}
`,
  });

  // 56. validate-binary-search-tree
  await writeProblem("validate-binary-search-tree", {
    problemMd: `# Validate Binary Search Tree

Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A **valid BST** is defined as follows:
- The left subtree of a node contains only nodes with keys **less than** the node's key.
- The right subtree of a node contains only nodes with keys **greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.

### Examples

**Example 1:**
\`\`\`
Input: root = ["2", "1", "3"]
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: root = ["5", "1", "4", "null", "null", "3", "6"]
Output: 0
Explanation: The root node's value is 5 but its right child's value is 4.
\`\`\`

### Constraints

- The number of nodes in the tree is in the range \`[1, 10^4]\`.
- \`-2^31 <= Node.val <= 2^31 - 1\`
`,
    structureMd: `Problem Name: "Validate Binary Search Tree"
Difficulty: MEDIUM
Topics: Tree, Binary Search Tree, Binary Tree
Function Name: isValidBST

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: bool result
`,
    solutionJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  function valid(node, min, max) {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return valid(node.left, min, node.val) && valid(node.right, node.val, max);
  }
  return valid(root, -Infinity, Infinity);
}
`,
    baselineJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  const values = [];
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    values.push(node.val);
    inorder(node.right);
  }
  inorder(root);
  for (let i = 1; i < values.length; i++) {
    if (values[i] <= values[i - 1]) return false;
  }
  return true;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { root: ["2", "1", "3"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: ["5", "1", "4", "null", "null", "3", "6"] } });
  cases.push({ category: "basic", description: "Single node", inputs: { root: ["1"] } });
  cases.push({ category: "basic", description: "Duplicate value fail", inputs: { root: ["1", "1"] } });
  cases.push({ category: "basic", description: "Valid BST depth 3", inputs: { root: ["4", "2", "6", "1", "3", "5", "7"] } });
  cases.push({ category: "basic", description: "Invalid right child of left subtree", inputs: { root: ["5", "4", "6", "null", "null", "3", "7"] } });
  cases.push({ category: "basic", description: "Left leaning valid", inputs: { root: ["3", "2", "null", "1"] } });
  cases.push({ category: "basic", description: "Right leaning valid", inputs: { root: ["1", "null", "2", "null", "3"] } });
  cases.push({ category: "basic", description: "Negative valid", inputs: { root: ["0", "-2", "2"] } });
  cases.push({ category: "basic", description: "Equal root and right", inputs: { root: ["2", "1", "2"] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const valid = i % 2 === 0;
    const r = valid ? ["10", "5", "15", "2", "7"] : ["10", "5", "15", "2", "12"];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { root: r } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const valid = i % 2 === 0;
    const r = valid ? ["20", "10", "30", "5", "15", "25", "35"] : ["20", "10", "30", "5", "22", "25", "35"];
    cases.push({ category: "corner", description: "Corner " + i, inputs: { root: r } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const valid = i % 2 === 0;
    const r = valid ? ["50", "25", "75", "12", "37"] : ["50", "25", "75", "60", "37"];
    cases.push({ category: "random", description: "Random " + i, inputs: { root: r } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const valid = i % 2 === 0;
    const r = valid ? ["100", "50", "150", "25", "75", "125", "175"] : ["100", "50", "150", "25", "110", "125", "175"];
    cases.push({ category: "large", description: "Large " + i, inputs: { root: r } });
  }

  return cases;
}
`,
  });

  // 57. kth-smallest-element-in-a-bst
  await writeProblem("kth-smallest-element-in-a-bst", {
    problemMd: `# Kth Smallest Element in a BST

Given the root of a binary search tree and an integer \`k\`, return the \`k\`-th smallest value (**1-indexed**) of all the values of the nodes in the tree.

### Examples

**Example 1:**
\`\`\`
Input: root = ["3", "1", "4", "null", "2"], k = 1
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: root = ["5", "3", "6", "2", "4", "null", "null", "1"], k = 3
Output: 3
\`\`\`

### Constraints

- The number of nodes in the tree is \`n\`, where \`1 <= k <= n <= 10^4\`.
- \`0 <= Node.val <= 10^4\`
`,
    structureMd: `Problem Name: "Kth Smallest Element in a BST"
Difficulty: MEDIUM
Topics: Tree, Binary Search Tree, Binary Tree
Function Name: kthSmallest

Input Structure:
Input Field: list<String> root
Input Field: int k

Output Structure:
Output Field: int result
`,
    solutionJs: `${treeHelperCode}
export function solve(rootArr, k) {
  const root = buildTree(rootArr);
  const stack = [];
  let cur = root;
  let count = 0;
  while (cur || stack.length > 0) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    count++;
    if (count === k) return cur.val;
    cur = cur.right;
  }
  return -1;
}
`,
    baselineJs: `${treeHelperCode}
export function solve(rootArr, k) {
  const root = buildTree(rootArr);
  const vals = [];
  function inorder(n) {
    if (!n) return;
    inorder(n.left);
    vals.push(n.val);
    inorder(n.right);
  }
  inorder(root);
  return vals[k - 1];
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { root: ["3", "1", "4", "null", "2"], k: 1 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: ["5", "3", "6", "2", "4", "null", "null", "1"], k: 3 } });
  cases.push({ category: "basic", description: "Single node", inputs: { root: ["10"], k: 1 } });
  cases.push({ category: "basic", description: "k = n", inputs: { root: ["3", "1", "4", "null", "2"], k: 4 } });
  cases.push({ category: "basic", description: "Full BST k=1", inputs: { root: ["4", "2", "6", "1", "3", "5", "7"], k: 1 } });
  cases.push({ category: "basic", description: "Full BST k=7", inputs: { root: ["4", "2", "6", "1", "3", "5", "7"], k: 7 } });
  cases.push({ category: "basic", description: "Full BST k=4", inputs: { root: ["4", "2", "6", "1", "3", "5", "7"], k: 4 } });
  cases.push({ category: "basic", description: "Left chain", inputs: { root: ["5", "4", "null", "3", "null", "2", "null", "1"], k: 2 } });
  cases.push({ category: "basic", description: "Right chain", inputs: { root: ["1", "null", "2", "null", "3", "null", "4"], k: 3 } });
  cases.push({ category: "basic", description: "Two elements k=2", inputs: { root: ["2", "1"], k: 2 } });

  const bst7 = ["4", "2", "6", "1", "3", "5", "7"];
  for (let i = 10; i < 80; i++) {
    const k = (i % 7) + 1;
    cases.push({
      category: i < 25 ? "edge" : i < 40 ? "corner" : i < 65 ? "random" : "large",
      description: "k=" + k,
      inputs: { root: bst7, k }
    });
  }

  return cases;
}
`,
  });

  // 58. construct-binary-tree-from-preorder-and-inorder-traversal
  await writeProblem("construct-binary-tree-from-preorder-and-inorder-traversal", {
    problemMd: `# Construct Binary Tree from Preorder and Inorder Traversal

Given two integer arrays \`preorder\` and \`inorder\` where \`preorder\` is the preorder traversal of a binary tree and \`inorder\` is the inorder traversal of the same tree, construct and return the binary tree serialized as a level-order array.

### Examples

**Example 1:**
\`\`\`
Input: preorder = [3, 9, 20, 15, 7], inorder = [9, 3, 15, 20, 7]
Output: 3 9 20 null null 15 7
\`\`\`

**Example 2:**
\`\`\`
Input: preorder = [-1], inorder = [-1]
Output: -1
\`\`\`

### Constraints

- \`1 <= preorder.length <= 3000\`
- \`inorder.length == preorder.length\`
- \`-3000 <= preorder[i], inorder[i] <= 3000\`
- \`preorder\` and \`inorder\` consist of **unique** values.
- Each value of \`inorder\` also appears in \`preorder\`.
- \`preorder\` is **guaranteed** to be the preorder traversal of the tree.
- \`inorder\` is **guaranteed** to be the inorder traversal of the tree.
`,
    structureMd: `Problem Name: "Construct Binary Tree from Preorder and Inorder Traversal"
Difficulty: MEDIUM
Topics: Array, Tree, Binary Tree
Function Name: buildTree
Input Structure:
Input Field: list<int> preorder
Input Field: list<int> inorder

Output Structure:
Output Field: list<String> result
`,
    solutionJs: `${treeHelperCode}
export function solve(preorder, inorder) {
  const inMap = new Map();
  for (let i = 0; i < inorder.length; i++) inMap.set(inorder[i], i);
  let preIdx = 0;
  function build(left, right) {
    if (left > right) return null;
    const val = preorder[preIdx++];
    const root = new TreeNode(val);
    const mid = inMap.get(val);
    root.left = build(left, mid - 1);
    root.right = build(mid + 1, right);
    return root;
  }
  const root = build(0, inorder.length - 1);
  return serializeTree(root);
}
`,
    baselineJs: `${treeHelperCode}
export function solve(preorder, inorder) {
  if (preorder.length === 0) return [];
  const val = preorder[0];
  const root = new TreeNode(val);
  const mid = inorder.indexOf(val);
  const inLeft = inorder.slice(0, mid);
  const inRight = inorder.slice(mid + 1);
  const preLeft = preorder.slice(1, 1 + inLeft.length);
  const preRight = preorder.slice(1 + inLeft.length);

  function rec(p, i) {
    if (p.length === 0) return null;
    const v = p[0];
    const node = new TreeNode(v);
    const m = i.indexOf(v);
    node.left = rec(p.slice(1, 1 + m), i.slice(0, m));
    node.right = rec(p.slice(1 + m), i.slice(m + 1));
    return node;
  }
  const r = rec(preorder, inorder);
  return serializeTree(r);
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { preorder: [3, 9, 20, 15, 7], inorder: [9, 3, 15, 20, 7] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { preorder: [-1], inorder: [-1] } });
  cases.push({ category: "basic", description: "Two elements left", inputs: { preorder: [1, 2], inorder: [2, 1] } });
  cases.push({ category: "basic", description: "Two elements right", inputs: { preorder: [1, 2], inorder: [1, 2] } });
  cases.push({ category: "basic", description: "Three balanced", inputs: { preorder: [1, 2, 3], inorder: [2, 1, 3] } });
  cases.push({ category: "basic", description: "Left chain", inputs: { preorder: [3, 2, 1], inorder: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Right chain", inputs: { preorder: [1, 2, 3], inorder: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Four nodes", inputs: { preorder: [1, 2, 4, 3], inorder: [4, 2, 1, 3] } });
  cases.push({ category: "basic", description: "Five nodes", inputs: { preorder: [1, 2, 4, 5, 3], inorder: [4, 2, 5, 1, 3] } });
  cases.push({ category: "basic", description: "Full depth 3", inputs: { preorder: [4, 2, 1, 3, 6, 5, 7], inorder: [1, 2, 3, 4, 5, 6, 7] } });

  function makeTree(n) {
    const vals = [];
    for (let i = 1; i <= n; i++) vals.push(i * 10);
    // Construct random BST
    const pre = [];
    const inord = [...vals];
    function bst(l, r) {
      if (l > r) return;
      const m = Math.floor((l + r) / 2);
      pre.push(inord[m]);
      bst(l, m - 1);
      bst(m + 1, r);
    }
    bst(0, n - 1);
    return { preorder: pre, inorder: inord };
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: makeTree(3 + (i % 4)) });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: makeTree(7) });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: makeTree(randomInt(rng, 8, 15)) });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: makeTree(randomInt(rng, 16, 30)) });
  }

  return cases;
}
`,
  });

  // 59. binary-tree-maximum-path-sum
  await writeProblem("binary-tree-maximum-path-sum", {
    problemMd: `# Binary Tree Maximum Path Sum

A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. Note that the path does not need to pass through the root.

The **path sum** of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the **maximum path sum** of any **non-empty** path.

### Examples

**Example 1:**
\`\`\`
Input: root = ["1", "2", "3"]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
\`\`\`

**Example 2:**
\`\`\`
Input: root = ["-10", "9", "20", "null", "null", "15", "7"]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
\`\`\`

### Constraints

- The number of nodes in the tree is in the range \`[1, 3 * 10^4]\`.
- \`-1000 <= Node.val <= 1000\`
`,
    structureMd: `Problem Name: "Binary Tree Maximum Path Sum"
Difficulty: HARD
Topics: Tree, Depth-First Search, Dynamic Programming
Function Name: maxPathSum

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: int result
`,
    solutionJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  let maxSum = -Infinity;
  function maxGain(node) {
    if (!node) return 0;
    const leftGain = Math.max(maxGain(node.left), 0);
    const rightGain = Math.max(maxGain(node.right), 0);
    const priceNewpath = node.val + leftGain + rightGain;
    if (priceNewpath > maxSum) maxSum = priceNewpath;
    return node.val + Math.max(leftGain, rightGain);
  }
  maxGain(root);
  return maxSum;
}
`,
    baselineJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  let best = -Infinity;
  function branch(n) {
    if (!n) return 0;
    const l = Math.max(0, branch(n.left));
    const r = Math.max(0, branch(n.right));
    if (n.val + l + r > best) best = n.val + l + r;
    return n.val + Math.max(l, r);
  }
  branch(root);
  return best;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { root: ["1", "2", "3"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: ["-10", "9", "20", "null", "null", "15", "7"] } });
  cases.push({ category: "basic", description: "Single negative", inputs: { root: ["-3"] } });
  cases.push({ category: "basic", description: "Single positive", inputs: { root: ["5"] } });
  cases.push({ category: "basic", description: "All negative", inputs: { root: ["-2", "-1"] } });
  cases.push({ category: "basic", description: "Chain", inputs: { root: ["1", "2", "null", "3", "null", "4"] } });
  cases.push({ category: "basic", description: "Negative root with positive children", inputs: { root: ["-10", "15", "20"] } });
  cases.push({ category: "basic", description: "Large positives", inputs: { root: ["100", "200", "300"] } });
  cases.push({ category: "basic", description: "Zero values", inputs: { root: ["0", "0", "0"] } });
  cases.push({ category: "basic", description: "Zig zag", inputs: { root: ["5", "-2", "null", "null", "10"] } });

  function makeTree(n) {
    const arr = [String(randomInt(rng, -20, 50))];
    for (let i = 1; i < n; i++) arr.push(randomInt(rng, 0, 4) === 0 ? "null" : String(randomInt(rng, -20, 50)));
    while (arr.length > 0 && arr[arr.length - 1] === "null") arr.pop();
    return arr;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { root: makeTree(3 + (i % 4)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { root: makeTree(8) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { root: makeTree(randomInt(rng, 10, 20)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { root: makeTree(randomInt(rng, 25, 45)) } });
  }

  return cases;
}
`,
  });

  // 60. serialize-and-deserialize-binary-tree
  await writeProblem("serialize-and-deserialize-binary-tree", {
    problemMd: `# Serialize and Deserialize Binary Tree

Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree.

There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

### Examples

**Example 1:**
\`\`\`
Input: root = ["1", "2", "3", "null", "null", "4", "5"]
Output: 1 2 3 null null 4 5
\`\`\`

**Example 2:**
\`\`\`
Input: root = ["1"]
Output: 1
\`\`\`

### Constraints

- The number of nodes in the tree is in the range \`[1, 10^4]\`.
- \`-1000 <= Node.val <= 1000\`
`,
    structureMd: `Problem Name: "Serialize and Deserialize Binary Tree"
Difficulty: HARD
Topics: Tree, Design, Binary Tree
Function Name: serializeAndDeserialize

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: list<String> result
`,
    solutionJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  return serializeTree(root);
}
`,
    baselineJs: `${treeHelperCode}
export function solve(rootArr) {
  const root = buildTree(rootArr);
  return serializeTree(root);
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { root: ["1", "2", "3", "null", "null", "4", "5"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { root: ["1"] } });
  cases.push({ category: "basic", description: "Two elements", inputs: { root: ["1", "2"] } });
  cases.push({ category: "basic", description: "Three elements line", inputs: { root: ["1", "2", "null", "3"] } });
  cases.push({ category: "basic", description: "Balanced depth 3", inputs: { root: ["1", "2", "3", "4", "5", "6", "7"] } });
  cases.push({ category: "basic", description: "Negative numbers", inputs: { root: ["-1", "-2", "3"] } });
  cases.push({ category: "basic", description: "Null leaf gap", inputs: { root: ["1", "null", "2", "3"] } });
  cases.push({ category: "basic", description: "Zeros", inputs: { root: ["0", "0", "0"] } });
  cases.push({ category: "basic", description: "Deep left", inputs: { root: ["1", "2", "null", "3", "null", "4"] } });
  cases.push({ category: "basic", description: "Deep right", inputs: { root: ["1", "null", "2", "null", "3"] } });

  function makeTree(n) {
    const arr = [String(randomInt(rng, 1, 100))];
    for (let i = 1; i < n; i++) arr.push(randomInt(rng, 0, 4) === 0 ? "null" : String(randomInt(rng, 1, 100)));
    while (arr.length > 0 && arr[arr.length - 1] === "null") arr.pop();
    return arr;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { root: makeTree(3 + (i % 4)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { root: makeTree(8) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { root: makeTree(randomInt(rng, 10, 20)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { root: makeTree(randomInt(rng, 25, 45)) } });
  }

  return cases;
}
`,
  });
}

main().catch(console.error);
