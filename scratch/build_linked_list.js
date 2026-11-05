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
  // 19. reverse-linked-list
  await writeProblem("reverse-linked-list", {
    problemMd: `# Reverse Linked List

Given the head of a singly linked list as an integer array \`head\`, reverse the list, and return the reversed list.

### Examples

**Example 1:**
\`\`\`
Input: head = [1, 2, 3, 4, 5]
Output: 5 4 3 2 1
\`\`\`

**Example 2:**
\`\`\`
Input: head = [1, 2]
Output: 2 1
\`\`\`

### Constraints

- \`1 <= head.length <= 5000\`
- \`-5000 <= head[i] <= 5000\`
`,
    structureMd: `Problem Name: "Reverse Linked List"
Difficulty: EASY
Topics: Linked List, Recursion
Function Name: reverseList

Input Structure:
Input Field: list<int> head

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(head) {
  const result = [];
  for (let i = head.length - 1; i >= 0; i--) {
    result.push(head[i]);
  }
  return result;
}
`,
    baselineJs: `export function solve(head) {
  return [...head].reverse();
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1, 2] } });
  cases.push({ category: "basic", description: "Single node", inputs: { head: [10] } });
  cases.push({ category: "basic", description: "Three nodes", inputs: { head: [7, 8, 9] } });
  cases.push({ category: "basic", description: "Identical elements", inputs: { head: [2, 2, 2] } });
  cases.push({ category: "basic", description: "Negative numbers", inputs: { head: [-1, -2, -3] } });
  cases.push({ category: "basic", description: "Mixed signs", inputs: { head: [-5, 0, 5] } });
  cases.push({ category: "basic", description: "Zeros", inputs: { head: [0, 0] } });
  cases.push({ category: "basic", description: "Even length", inputs: { head: [1, 2, 3, 4] } });
  cases.push({ category: "basic", description: "Alternating", inputs: { head: [1, 0, 1, 0] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 2 + (i % 5);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -50, 50));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head: arr } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 12;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -100, 100));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: arr } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 15, 40);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -500, 500));
    cases.push({ category: "random", description: "Random " + i, inputs: { head: arr } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 50, 150);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -1000, 1000));
    cases.push({ category: "large", description: "Large " + i, inputs: { head: arr } });
  }

  return cases;
}
`,
  });

  // 20. merge-two-sorted-lists
  await writeProblem("merge-two-sorted-lists", {
    problemMd: `# Merge Two Sorted Lists

You are given the heads of two sorted linked lists \`list1\` and \`list2\` represented as arrays.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

### Examples

**Example 1:**
\`\`\`
Input: list1 = [1, 2, 4], list2 = [1, 3, 4]
Output: 1 1 2 3 4 4
\`\`\`

**Example 2:**
\`\`\`
Input: list1 = [], list2 = [0]
Output: 0
\`\`\`

**Example 3:**
\`\`\`
Input: list1 = [5], list2 = []
Output: 5
\`\`\`

### Constraints

- The number of nodes in both lists is in the range \`[0, 50]\`.
- At least one of \`list1\` or \`list2\` is non-empty.
- \`-100 <= list1[i], list2[i] <= 100\`
- Both \`list1\` and \`list2\` are sorted in **non-decreasing** order.
`,
    structureMd: `Problem Name: "Merge Two Sorted Lists"
Difficulty: EASY
Topics: Linked List, Recursion
Function Name: mergeTwoLists

Input Structure:
Input Field: list<int> list1
Input Field: list<int> list2

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(list1, list2) {
  const result = [];
  let i = 0, j = 0;
  while (i < list1.length && j < list2.length) {
    if (list1[i] <= list2[j]) {
      result.push(list1[i++]);
    } else {
      result.push(list2[j++]);
    }
  }
  while (i < list1.length) result.push(list1[i++]);
  while (j < list2.length) result.push(list2[j++]);
  return result;
}
`,
    baselineJs: `export function solve(list1, list2) {
  return [...list1, ...list2].sort((a, b) => a - b);
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { list1: [1, 2, 4], list2: [1, 3, 4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { list1: [], list2: [0] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { list1: [5], list2: [] } });
  cases.push({ category: "basic", description: "Single each", inputs: { list1: [1], list2: [2] } });
  cases.push({ category: "basic", description: "Disjoint ranges", inputs: { list1: [1, 2, 3], list2: [4, 5, 6] } });
  cases.push({ category: "basic", description: "Reverse disjoint", inputs: { list1: [10, 20], list2: [1, 2] } });
  cases.push({ category: "basic", description: "Identical elements", inputs: { list1: [2, 2], list2: [2, 2] } });
  cases.push({ category: "basic", description: "Negatives", inputs: { list1: [-5, -2], list2: [-3, 0] } });
  cases.push({ category: "basic", description: "Unequal sizes", inputs: { list1: [1, 3, 5, 7, 9], list2: [2] } });
  cases.push({ category: "basic", description: "All zeros", inputs: { list1: [0], list2: [0, 0] } });

  function makeSorted(len, min, max) {
    const arr = [];
    for (let i = 0; i < len; i++) arr.push(randomInt(rng, min, max));
    return arr.sort((a, b) => a - b);
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len1 = i % 2 === 0 ? 0 : 3;
    const len2 = len1 === 0 ? 4 : (i % 4) + 1;
    cases.push({ category: "edge", description: "Edge " + i, inputs: { list1: makeSorted(len1, -20, 20), list2: makeSorted(len2, -20, 20) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { list1: makeSorted(8, -50, 50), list2: makeSorted(8, -50, 50) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { list1: makeSorted(randomInt(rng, 5, 20), -100, 100), list2: makeSorted(randomInt(rng, 5, 20), -100, 100) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { list1: makeSorted(randomInt(rng, 20, 50), -100, 100), list2: makeSorted(randomInt(rng, 20, 50), -100, 100) } });
  }

  return cases;
}
`,
  });

  // 21. reorder-list
  await writeProblem("reorder-list", {
    problemMd: `# Reorder List

You are given the head of a singly linked-list represented as an array:
\`L0 → L1 → … → Ln - 1 → Ln\`

Reorder the list to be on the following form:
\`L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …\`

Return the reordered list.

### Examples

**Example 1:**
\`\`\`
Input: head = [1, 2, 3, 4]
Output: 1 4 2 3
\`\`\`

**Example 2:**
\`\`\`
Input: head = [1, 2, 3, 4, 5]
Output: 1 5 2 4 3
\`\`\`

### Constraints

- \`1 <= head.length <= 5 * 10^4\`
- \`1 <= head[i] <= 1000\`
`,
    structureMd: `Problem Name: "Reorder List"
Difficulty: MEDIUM
Topics: Linked List, Two Pointers
Function Name: reorderList

Input Structure:
Input Field: list<int> head

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(head) {
  const result = [];
  let l = 0, r = head.length - 1;
  while (l <= r) {
    if (l === r) {
      result.push(head[l]);
    } else {
      result.push(head[l]);
      result.push(head[r]);
    }
    l++;
    r--;
  }
  return result;
}
`,
    baselineJs: `export function solve(head) {
  const q = [...head];
  const res = [];
  while (q.length > 0) {
    res.push(q.shift());
    if (q.length > 0) res.push(q.pop());
  }
  return res;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "Single element", inputs: { head: [42] } });
  cases.push({ category: "basic", description: "Two elements", inputs: { head: [10, 20] } });
  cases.push({ category: "basic", description: "Three elements", inputs: { head: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Six elements", inputs: { head: [1, 2, 3, 4, 5, 6] } });
  cases.push({ category: "basic", description: "Seven elements", inputs: { head: [1, 2, 3, 4, 5, 6, 7] } });
  cases.push({ category: "basic", description: "Equal elements", inputs: { head: [5, 5, 5, 5] } });
  cases.push({ category: "basic", description: "Descending", inputs: { head: [4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "Alternating", inputs: { head: [1, 10, 2, 20] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 3 + (i % 6);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 100));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head: arr } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 200));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: arr } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 20, 50);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 500));
    cases.push({ category: "random", description: "Random " + i, inputs: { head: arr } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 80, 200);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 1000));
    cases.push({ category: "large", description: "Large " + i, inputs: { head: arr } });
  }

  return cases;
}
`,
  });

  // 22. remove-nth-node-from-end-of-list
  await writeProblem("remove-nth-node-from-end-of-list", {
    problemMd: `# Remove Nth Node From End of List

Given the head of a linked list represented as an array, remove the \`n\`-th node from the end of the list and return its head.

### Examples

**Example 1:**
\`\`\`
Input: head = [1, 2, 3, 4, 5], n = 2
Output: 1 2 3 5
Explanation: The 2nd node from the end is 4. Removing it results in [1, 2, 3, 5].
\`\`\`

**Example 2:**
\`\`\`
Input: head = [1, 2], n = 1
Output: 1
\`\`\`

**Example 3:**
\`\`\`
Input: head = [1, 2], n = 2
Output: 2
\`\`\`

### Constraints

- \`2 <= head.length <= 30\`
- \`0 <= head[i] <= 100\`
- \`1 <= n <= head.length\`
`,
    structureMd: `Problem Name: "Remove Nth Node From End of List"
Difficulty: MEDIUM
Topics: Linked List, Two Pointers
Function Name: removeNthFromEnd

Input Structure:
Input Field: list<int> head
Input Field: int n

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(head, n) {
  const targetIndex = head.length - n;
  const result = [];
  for (let i = 0; i < head.length; i++) {
    if (i !== targetIndex) result.push(head[i]);
  }
  return result;
}
`,
    baselineJs: `export function solve(head, n) {
  const targetIndex = head.length - n;
  return [...head.slice(0, targetIndex), ...head.slice(targetIndex + 1)];
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 4, 5], n: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1, 2], n: 1 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { head: [1, 2], n: 2 } });
  cases.push({ category: "basic", description: "Remove head", inputs: { head: [1, 2, 3], n: 3 } });
  cases.push({ category: "basic", description: "Remove tail", inputs: { head: [1, 2, 3], n: 1 } });
  cases.push({ category: "basic", description: "Remove middle", inputs: { head: [1, 2, 3, 4], n: 2 } });
  cases.push({ category: "basic", description: "Identical elements", inputs: { head: [7, 7, 7], n: 1 } });
  cases.push({ category: "basic", description: "Zeros", inputs: { head: [0, 0, 0], n: 2 } });
  cases.push({ category: "basic", description: "Five elements n=5", inputs: { head: [10, 20, 30, 40, 50], n: 5 } });
  cases.push({ category: "basic", description: "Five elements n=1", inputs: { head: [10, 20, 30, 40, 50], n: 1 } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 3 + (i % 5);
    const n = 1 + (i % len);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 50));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head: arr, n } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 10;
    const n = 1 + (i % len);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 0, 100));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: arr, n } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 5, 20);
    const n = randomInt(rng, 1, len);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { head: arr, n } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 20, 30);
    const n = randomInt(rng, 1, len);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 100));
    cases.push({ category: "large", description: "Large " + i, inputs: { head: arr, n } });
  }

  return cases;
}
`,
  });

  // 23. copy-list-with-random-pointer
  await writeProblem("copy-list-with-random-pointer", {
    problemMd: `# Copy List with Random Pointer

A linked list of length \`n\` is given such that each node contains an additional random pointer, which could point to any node in the list, or \`null\`.

Construct a **deep copy** of the list. The deep copy should consist of exactly \`n\` brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the \`next\` and \`random\` pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.

For simplicity, the list is represented as an array of pairs \`[val, random_index]\` where \`random_index\` is the 0-based index of the node that the \`random\` pointer points to, or \`-1\` if it does not point to any node.

Return the copied list represented in the same format.

### Examples

**Example 1:**
\`\`\`
Input: nodes = [[7, -1], [13, 0], [11, 4], [10, 2], [1, 0]]
Output:
7 -1
13 0
11 4
10 2
1 0
\`\`\`

**Example 2:**
\`\`\`
Input: nodes = [[1, 1], [2, 1]]
Output:
1 1
2 1
\`\`\`

### Constraints

- \`1 <= nodes.length <= 1000\`
- \`-10^4 <= val <= 10^4\`
- \`-1 <= random_index < nodes.length\`
`,
    structureMd: `Problem Name: "Copy List with Random Pointer"
Difficulty: MEDIUM
Topics: Hash Table, Linked List
Function Name: copyRandomList

Input Structure:
Input Field: list<list<int>> nodes

Output Structure:
Output Field: list<list<int>> result
`,
    solutionJs: `export function solve(nodes) {
  const result = [];
  for (let i = 0; i < nodes.length; i++) {
    result.push([nodes[i][0], nodes[i][1]]);
  }
  return result;
}
`,
    baselineJs: `export function solve(nodes) {
  return JSON.parse(JSON.stringify(nodes));
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { nodes: [[7, -1], [13, 0], [11, 4], [10, 2], [1, 0]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nodes: [[1, 1], [2, 1]] } });
  cases.push({ category: "basic", description: "Single node self", inputs: { nodes: [[3, 0]] } });
  cases.push({ category: "basic", description: "Single node null", inputs: { nodes: [[3, -1]] } });
  cases.push({ category: "basic", description: "All null random", inputs: { nodes: [[1, -1], [2, -1], [3, -1]] } });
  cases.push({ category: "basic", description: "Circular random", inputs: { nodes: [[1, 1], [2, 0]] } });
  cases.push({ category: "basic", description: "All point to head", inputs: { nodes: [[1, 0], [2, 0], [3, 0]] } });
  cases.push({ category: "basic", description: "All point to tail", inputs: { nodes: [[1, 2], [2, 2], [3, 2]] } });
  cases.push({ category: "basic", description: "Negatives", inputs: { nodes: [[-10, 1], [-20, 0]] } });
  cases.push({ category: "basic", description: "Zeros", inputs: { nodes: [[0, -1], [0, 0]] } });

  function makeNodes(n) {
    const list = [];
    for (let i = 0; i < n; i++) {
      const val = randomInt(rng, -100, 100);
      const randIdx = randomInt(rng, -1, n - 1);
      list.push([val, randIdx]);
    }
    return list;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { nodes: makeNodes(2 + (i % 4)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nodes: makeNodes(10) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { nodes: makeNodes(randomInt(rng, 15, 30)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { nodes: makeNodes(randomInt(rng, 40, 80)) } });
  }

  return cases;
}
`,
  });

  // 24. add-two-numbers
  await writeProblem("add-two-numbers", {
    problemMd: `# Add Two Numbers

You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

### Examples

**Example 1:**
\`\`\`
Input: l1 = [2, 4, 3], l2 = [5, 6, 4]
Output: 7 0 8
Explanation: 342 + 465 = 807.
\`\`\`

**Example 2:**
\`\`\`
Input: l1 = [0], l2 = [0]
Output: 0
\`\`\`

**Example 3:**
\`\`\`
Input: l1 = [9, 9, 9, 9, 9, 9, 9], l2 = [9, 9, 9, 9]
Output: 8 9 9 9 0 0 0 1
\`\`\`

### Constraints

- The number of nodes in each linked list is in the range \`[1, 100]\`.
- \`0 <= Node.val <= 9\`
- It is guaranteed that the list represents a number that does not have leading zeros.
`,
    structureMd: `Problem Name: "Add Two Numbers"
Difficulty: MEDIUM
Topics: Linked List, Math
Function Name: addTwoNumbers

Input Structure:
Input Field: list<int> l1
Input Field: list<int> l2

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(l1, l2) {
  const result = [];
  let carry = 0;
  let i = 0, j = 0;
  while (i < l1.length || j < l2.length || carry > 0) {
    const val1 = i < l1.length ? l1[i++] : 0;
    const val2 = j < l2.length ? l2[j++] : 0;
    const sum = val1 + val2 + carry;
    result.push(sum % 10);
    carry = Math.floor(sum / 10);
  }
  return result;
}
`,
    baselineJs: `export function solve(l1, l2) {
  const n1 = BigInt([...l1].reverse().join(""));
  const n2 = BigInt([...l2].reverse().join(""));
  const sum = (n1 + n2).toString();
  return sum.split("").reverse().map(Number);
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { l1: [2, 4, 3], l2: [5, 6, 4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { l1: [0], l2: [0] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { l1: [9, 9, 9, 9, 9, 9, 9], l2: [9, 9, 9, 9] } });
  cases.push({ category: "basic", description: "Carry over 1", inputs: { l1: [5], l2: [5] } });
  cases.push({ category: "basic", description: "No carry", inputs: { l1: [1, 2], l2: [3, 4] } });
  cases.push({ category: "basic", description: "Single vs multi", inputs: { l1: [1], l2: [9, 9] } });
  cases.push({ category: "basic", description: "Carry ripple", inputs: { l1: [9], l2: [9, 9, 9] } });
  cases.push({ category: "basic", description: "Zeros present", inputs: { l1: [0, 1], l2: [0, 2] } });
  cases.push({ category: "basic", description: "Different lengths", inputs: { l1: [1, 2, 3], l2: [4] } });
  cases.push({ category: "basic", description: "Nine chain", inputs: { l1: [9, 9], l2: [1] } });

  function makeNumber(len) {
    const digits = [];
    for (let i = 0; i < len; i++) {
      digits.push(i === len - 1 && len > 1 ? randomInt(rng, 1, 9) : randomInt(rng, 0, 9));
    }
    return digits;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { l1: makeNumber(1 + (i % 4)), l2: makeNumber(1 + ((i + 1) % 4)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { l1: makeNumber(8), l2: makeNumber(5) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { l1: makeNumber(randomInt(rng, 5, 20)), l2: makeNumber(randomInt(rng, 5, 20)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { l1: makeNumber(randomInt(rng, 25, 50)), l2: makeNumber(randomInt(rng, 25, 50)) } });
  }

  return cases;
}
`,
  });

  // 25. linked-list-cycle
  await writeProblem("linked-list-cycle", {
    problemMd: `# Linked List Cycle

Given \`head\`, the head of a linked list represented as an array, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the \`next\` pointer. Internally, \`pos\` is used to denote the index of the node that tail's \`next\` pointer is connected to. Note that \`pos\` is not passed to the solution function in conventional interviews, but is provided here to model the graph connectivity. If \`pos == -1\`, then there is no cycle in the linked list.

Return \`true\` if there is a cycle in the linked list. Otherwise, return \`false\`.

### Examples

**Example 1:**
\`\`\`
Input: head = [3, 2, 0, -4], pos = 1
Output: 1
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
\`\`\`

**Example 2:**
\`\`\`
Input: head = [1, 2], pos = 0
Output: 1
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
\`\`\`

**Example 3:**
\`\`\`
Input: head = [1], pos = -1
Output: 0
Explanation: There is no cycle in the linked list.
\`\`\`

### Constraints

- The number of the nodes in the list is in the range \`[1, 10^4]\`.
- \`-10^5 <= Node.val <= 10^5\`
- \`pos\` is \`-1\` or a **valid index** in the linked-list.
`,
    structureMd: `Problem Name: "Linked List Cycle"
Difficulty: EASY
Topics: Hash Table, Linked List, Two Pointers
Function Name: hasCycle

Input Structure:
Input Field: list<int> head
Input Field: int pos

Output Structure:
Output Field: bool result
`,
    solutionJs: `export function solve(head, pos) {
  if (head.length === 0) return false;
  return pos >= 0 && pos < head.length;
}
`,
    baselineJs: `export function solve(head, pos) {
  const visited = new Set();
  let cur = 0;
  while (cur < head.length) {
    if (visited.has(cur)) return true;
    visited.add(cur);
    if (cur === head.length - 1) {
      if (pos === -1) return false;
      cur = pos;
    } else {
      cur++;
    }
  }
  return false;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { head: [3, 2, 0, -4], pos: 1 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1, 2], pos: 0 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { head: [1], pos: -1 } });
  cases.push({ category: "basic", description: "Self loop", inputs: { head: [5], pos: 0 } });
  cases.push({ category: "basic", description: "No loop two", inputs: { head: [1, 2], pos: -1 } });
  cases.push({ category: "basic", description: "Cycle to tail", inputs: { head: [1, 2, 3], pos: 2 } });
  cases.push({ category: "basic", description: "Cycle to head", inputs: { head: [1, 2, 3, 4], pos: 0 } });
  cases.push({ category: "basic", description: "Long no cycle", inputs: { head: [1, 2, 3, 4, 5], pos: -1 } });
  cases.push({ category: "basic", description: "Negative elements", inputs: { head: [-1, -2, -3], pos: 1 } });
  cases.push({ category: "basic", description: "Equal elements", inputs: { head: [2, 2, 2], pos: -1 } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const hasCycle = i % 2 === 0;
    const len = 2 + (i % 5);
    const pos = hasCycle ? randomInt(rng, 0, len - 1) : -1;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -50, 50));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head: arr, pos } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const hasCycle = i % 2 === 0;
    const len = 12;
    const pos = hasCycle ? randomInt(rng, 0, len - 1) : -1;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -100, 100));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: arr, pos } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const hasCycle = i % 2 === 0;
    const len = randomInt(rng, 10, 30);
    const pos = hasCycle ? randomInt(rng, 0, len - 1) : -1;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -500, 500));
    cases.push({ category: "random", description: "Random " + i, inputs: { head: arr, pos } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const hasCycle = i % 2 === 0;
    const len = randomInt(rng, 50, 150);
    const pos = hasCycle ? randomInt(rng, 0, len - 1) : -1;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -1000, 1000));
    cases.push({ category: "large", description: "Large " + i, inputs: { head: arr, pos } });
  }

  return cases;
}
`,
  });

  // 26. find-the-duplicate-number
  await writeProblem("find-the-duplicate-number", {
    problemMd: `# Find the Duplicate Number

Given an array of integers \`nums\` containing \`n + 1\` integers where each integer is in the range \`[1, n]\` inclusive.

There is only **one repeated number** in \`nums\`, return this repeated number.

You must solve the problem **without** modifying the array \`nums\` and uses only constant extra space.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 3, 4, 2, 2]
Output: 2
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [3, 1, 3, 4, 2]
Output: 3
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [3, 3, 3, 3, 3]
Output: 3
\`\`\`

### Constraints

- \`1 <= n <= 10^5\`
- \`nums.length == n + 1\`
- \`1 <= nums[i] <= n\`
- All the integers in \`nums\` appear only once except for precisely one integer which appears two or more times.
`,
    structureMd: `Problem Name: "Find the Duplicate Number"
Difficulty: MEDIUM
Topics: Array, Two Pointers, Binary Search
Function Name: findDuplicate

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums) {
  let slow = nums[0];
  let fast = nums[0];
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
}
`,
    baselineJs: `export function solve(nums) {
  const seen = new Set();
  for (const x of nums) {
    if (seen.has(x)) return x;
    seen.add(x);
  }
  return nums[0];
}
`,
    testCasesJs: `import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 3, 4, 2, 2] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [3, 1, 3, 4, 2] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [3, 3, 3, 3, 3] } });
  cases.push({ category: "basic", description: "Pair dup", inputs: { nums: [1, 1] } });
  cases.push({ category: "basic", description: "Triplets", inputs: { nums: [2, 2, 2, 2] } });
  cases.push({ category: "basic", description: "At ends", inputs: { nums: [2, 1, 3, 2] } });
  cases.push({ category: "basic", description: "Dup is 1", inputs: { nums: [1, 2, 3, 1] } });
  cases.push({ category: "basic", description: "Dup is n", inputs: { nums: [1, 2, 3, 4, 4] } });
  cases.push({ category: "basic", description: "Alternating dup", inputs: { nums: [2, 1, 2, 3] } });
  cases.push({ category: "basic", description: "Adjacent dup", inputs: { nums: [1, 2, 2, 3, 4] } });

  function makeCase(n) {
    const dup = randomInt(rng, 1, n);
    const arr = [];
    for (let i = 1; i <= n; i++) arr.push(i);
    arr.push(dup);
    return shuffle(rng, arr);
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { nums: makeCase(3 + (i % 4)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nums: makeCase(10) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { nums: makeCase(randomInt(rng, 15, 30)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { nums: makeCase(randomInt(rng, 50, 150)) } });
  }

  return cases;
}
`,
  });

  // 27. lru-cache
  await writeProblem("lru-cache", {
    problemMd: `# LRU Cache

Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.

Implement the LRU Cache operations:
- \`put(key, value)\`: Update the value of the \`key\` if the \`key\` exists. Otherwise, add the \`key-value\` pair to the cache. If the number of keys exceeds the \`capacity\` from this operation, **evict** the least recently used key. Return \`null\`.
- \`get(key)\`: Return the value of the \`key\` if the \`key\` exists, otherwise return \`-1\`.

The functions \`get\` and \`put\` must each run in \`O(1)\` average time complexity.

### Examples

**Example 1:**
\`\`\`
Input:
capacity = 2
operations = ["put", "put", "get", "put", "get", "put", "get", "get", "get"]
values = [[1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output: null null 1 null -1 null -1 3 4
Explanation:
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
\`\`\`

### Constraints

- \`1 <= capacity <= 3000\`
- \`0 <= key <= 10^4\`
- \`0 <= value <= 10^5\`
- At most \`2 * 10^5\` calls will be made to \`get\` and \`put\`.
`,
    structureMd: `Problem Name: "LRU Cache"
Difficulty: MEDIUM
Topics: Hash Table, Linked List, Design
Function Name: lruCacheOperations

Input Structure:
Input Field: int capacity
Input Field: list<String> operations
Input Field: list<list<int>> values

Output Structure:
Output Field: list<String> result
`,
    solutionJs: `export function solve(capacity, operations, values) {
  const cache = new Map();
  const result = [];
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "put") {
      const key = values[i][0];
      const val = values[i][1];
      if (cache.has(key)) {
        cache.delete(key);
      } else if (cache.size >= capacity) {
        const oldestKey = cache.keys().next().value;
        cache.delete(oldestKey);
      }
      cache.set(key, val);
      result.push("null");
    } else if (op === "get") {
      const key = values[i][0];
      if (!cache.has(key)) {
        result.push("-1");
      } else {
        const val = cache.get(key);
        cache.delete(key);
        cache.set(key, val);
        result.push(String(val));
      }
    }
  }
  return result;
}
`,
    baselineJs: `export function solve(capacity, operations, values) {
  const store = [];
  const result = [];
  let timer = 0;
  for (let i = 0; i < operations.length; i++) {
    timer++;
    const op = operations[i];
    if (op === "put") {
      const key = values[i][0];
      const val = values[i][1];
      const idx = store.findIndex((item) => item.key === key);
      if (idx !== -1) {
        store[idx].val = val;
        store[idx].time = timer;
      } else {
        if (store.length >= capacity) {
          let oldestIdx = 0;
          for (let j = 1; j < store.length; j++) {
            if (store[j].time < store[oldestIdx].time) oldestIdx = j;
          }
          store.splice(oldestIdx, 1);
        }
        store.push({ key, val, time: timer });
      }
      result.push("null");
    } else if (op === "get") {
      const key = values[i][0];
      const item = store.find((x) => x.key === key);
      if (!item) {
        result.push("-1");
      } else {
        item.time = timer;
        result.push(String(item.val));
      }
    }
  }
  return result;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: {
      capacity: 2,
      operations: ["put", "put", "get", "put", "get", "put", "get", "get", "get"],
      values: [[1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
    }
  });

  cases.push({
    category: "basic",
    description: "Capacity 1",
    inputs: {
      capacity: 1,
      operations: ["put", "get", "put", "get"],
      values: [[2, 1], [2], [3, 2], [2]]
    }
  });

  cases.push({
    category: "basic",
    description: "Overwrite existing",
    inputs: {
      capacity: 2,
      operations: ["put", "put", "put", "get"],
      values: [[1, 10], [1, 20], [2, 30], [1]]
    }
  });

  function makeCase(cap, stepCount) {
    const ops = [];
    const vals = [];
    for (let i = 0; i < stepCount; i++) {
      if (i < cap || randomInt(rng, 0, 1) === 0) {
        ops.push("put");
        vals.push([randomInt(rng, 1, cap + 2), randomInt(rng, 10, 99)]);
      } else {
        ops.push("get");
        vals.push([randomInt(rng, 1, cap + 2)]);
      }
    }
    return { capacity: cap, operations: ops, values: vals };
  }

  // Edge (3 - 24)
  for (let i = 3; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: makeCase(2, 6 + (i % 4)) });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: makeCase(3, 12) });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: makeCase(randomInt(rng, 2, 5), randomInt(rng, 15, 30)) });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: makeCase(randomInt(rng, 5, 10), randomInt(rng, 30, 60)) });
  }

  return cases;
}
`,
  });

  // 28. merge-k-sorted-lists
  await writeProblem("merge-k-sorted-lists", {
    problemMd: `# Merge k Sorted Lists

You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

### Examples

**Example 1:**
\`\`\`
Input: lists = [[1, 4, 5], [1, 3, 4], [2, 6]]
Output: 1 1 2 3 4 4 5 6
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
\`\`\`

**Example 2:**
\`\`\`
Input: lists = [[], [1]]
Output: 1
\`\`\`

### Constraints

- \`k == lists.length\`
- \`1 <= k <= 10^4\`
- \`0 <= lists[i].length <= 500\`
- At least one list contains an element (total elements >= 1).
- \`-10^4 <= lists[i][j] <= 10^4\`
- \`lists[i]\` is sorted in **ascending order**.
`,
    structureMd: `Problem Name: "Merge k Sorted Lists"
Difficulty: HARD
Topics: Linked List, Divide and Conquer, Heap
Function Name: mergeKLists

Input Structure:
Input Field: list<list<int>> lists

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(lists) {
  const result = [];
  for (let i = 0; i < lists.length; i++) {
    for (let j = 0; j < lists[i].length; j++) {
      result.push(lists[i][j]);
    }
  }
  result.sort((a, b) => a - b);
  return result;
}
`,
    baselineJs: `export function solve(lists) {
  return lists.flat().sort((a, b) => a - b);
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { lists: [[1, 4, 5], [1, 3, 4], [2, 6]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { lists: [[], [1]] } });
  cases.push({ category: "basic", description: "Single list", inputs: { lists: [[1, 2, 3]] } });
  cases.push({ category: "basic", description: "Two lists disjoint", inputs: { lists: [[1, 2], [3, 4]] } });
  cases.push({ category: "basic", description: "Identical elements", inputs: { lists: [[2, 2], [2, 2]] } });
  cases.push({ category: "basic", description: "Negative elements", inputs: { lists: [[-5, -2], [-10, 0]] } });
  cases.push({ category: "basic", description: "Empty first", inputs: { lists: [[], [2, 3], [1]] } });
  cases.push({ category: "basic", description: "Four singletons", inputs: { lists: [[4], [1], [3], [2]] } });
  cases.push({ category: "basic", description: "Alternating elements", inputs: { lists: [[1, 3, 5], [2, 4, 6]] } });
  cases.push({ category: "basic", description: "All zeros", inputs: { lists: [[0], [0, 0]] } });

  function makeLists(k, totalLen) {
    const lists = [];
    const avgLen = Math.max(1, Math.floor(totalLen / k));
    for (let i = 0; i < k; i++) {
      const len = i === 0 ? Math.max(1, avgLen) : avgLen;
      const arr = [];
      for (let j = 0; j < len; j++) arr.push(randomInt(rng, -100, 100));
      lists.push(arr.sort((a, b) => a - b));
    }
    return lists;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { lists: makeLists(2 + (i % 3), 6 + (i % 4)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { lists: makeLists(4, 16) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { lists: makeLists(randomInt(rng, 3, 6), randomInt(rng, 15, 30)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { lists: makeLists(randomInt(rng, 5, 10), randomInt(rng, 40, 80)) } });
  }

  return cases;
}
`,
  });

  // 29. reverse-nodes-in-k-group
  await writeProblem("reverse-nodes-in-k-group", {
    problemMd: `# Reverse Nodes in k-Group

Given the head of a linked list represented as an array \`head\`, reverse the nodes of the list \`k\` at a time, and return the modified list.

\`k\` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of \`k\` then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

### Examples

**Example 1:**
\`\`\`
Input: head = [1, 2, 3, 4, 5], k = 2
Output: 2 1 4 3 5
\`\`\`

**Example 2:**
\`\`\`
Input: head = [1, 2, 3, 4, 5], k = 3
Output: 3 2 1 4 5
\`\`\`

### Constraints

- The number of nodes in the list is \`n\`.
- \`1 <= k <= n <= 5000\`
- \`0 <= Node.val <= 1000\`
`,
    structureMd: `Problem Name: "Reverse Nodes in k-Group"
Difficulty: HARD
Topics: Linked List, Recursion
Function Name: reverseKGroup

Input Structure:
Input Field: list<int> head
Input Field: int k

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(head, k) {
  const result = [];
  const n = head.length;
  for (let i = 0; i < n; i += k) {
    if (i + k <= n) {
      for (let j = i + k - 1; j >= i; j--) {
        result.push(head[j]);
      }
    } else {
      for (let j = i; j < n; j++) {
        result.push(head[j]);
      }
    }
  }
  return result;
}
`,
    baselineJs: `export function solve(head, k) {
  const res = [];
  for (let i = 0; i < head.length; i += k) {
    const chunk = head.slice(i, i + k);
    if (chunk.length === k) {
      res.push(...chunk.reverse());
    } else {
      res.push(...chunk);
    }
  }
  return res;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 4, 5], k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1, 2, 3, 4, 5], k: 3 } });
  cases.push({ category: "basic", description: "k=1", inputs: { head: [1, 2, 3, 4], k: 1 } });
  cases.push({ category: "basic", description: "k=n", inputs: { head: [1, 2, 3], k: 3 } });
  cases.push({ category: "basic", description: "Exact multiple", inputs: { head: [1, 2, 3, 4], k: 2 } });
  cases.push({ category: "basic", description: "Single element", inputs: { head: [42], k: 1 } });
  cases.push({ category: "basic", description: "Even length k=2", inputs: { head: [10, 20, 30, 40], k: 2 } });
  cases.push({ category: "basic", description: "Remainder 1", inputs: { head: [1, 2, 3, 4, 5, 6, 7], k: 3 } });
  cases.push({ category: "basic", description: "All equal", inputs: { head: [5, 5, 5, 5, 5], k: 2 } });
  cases.push({ category: "basic", description: "Descending", inputs: { head: [5, 4, 3, 2, 1], k: 2 } });

  function makeCase(n, k) {
    const arr = [];
    for (let i = 0; i < n; i++) arr.push(randomInt(rng, 1, 100));
    return { head: arr, k };
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 3 + (i % 5);
    const k = 1 + (i % len);
    cases.push({ category: "edge", description: "Edge " + i, inputs: makeCase(len, k) });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    const k = 2 + (i % 4);
    cases.push({ category: "corner", description: "Corner " + i, inputs: makeCase(len, k) });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 10, 30);
    const k = randomInt(rng, 1, Math.min(8, len));
    cases.push({ category: "random", description: "Random " + i, inputs: makeCase(len, k) });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 40, 100);
    const k = randomInt(rng, 2, 10);
    cases.push({ category: "large", description: "Large " + i, inputs: makeCase(len, k) });
  }

  return cases;
}
`,
  });
}

main().catch(console.error);
