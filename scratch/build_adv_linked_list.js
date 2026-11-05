import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('problem-bank/problems');

const problems = [
  {
    slug: 'middle-of-the-linked-list',
    title: 'Middle of the Linked List',
    difficulty: 'EASY',
    topics: ['Linked List', 'Two Pointers'],
    fnName: 'middleNode',
    inputs: [{ type: 'list<int>', name: 'head' }],
    output: { type: 'list<int>', name: 'result' },
    description: `Given the head of a singly linked list, return the middle node of the linked list.

If there are two middle nodes, return the second middle node (along with all subsequent nodes).

### Examples

**Example 1:**
\`\`\`
Input: head = [1, 2, 3, 4, 5]
Output: 3 4 5
Explanation: The middle node of the list is node 3.
\`\`\`

**Example 2:**
\`\`\`
Input: head = [1, 2, 3, 4, 5, 6]
Output: 4 5 6
Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.
\`\`\`

### Constraints

- The number of nodes in the list is in the range \`[1, 100]\`.
- \`1 <= Node.val <= 100\``,
    solutionCode: `export function solve(head) {
  let slow = 0;
  let fast = 0;
  while (fast < head.length && fast + 1 < head.length) {
    slow++;
    fast += 2;
  }
  return head.slice(slow);
}`,
    baselineCode: `export function solve(head) {
  const mid = Math.floor(head.length / 2);
  return head.slice(mid);
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1, 2, 3, 4, 5, 6] } });
  cases.push({ category: "basic", description: "Single node", inputs: { head: [1] } });
  cases.push({ category: "basic", description: "Two nodes", inputs: { head: [1, 2] } });
  cases.push({ category: "basic", description: "Three nodes", inputs: { head: [10, 20, 30] } });
  cases.push({ category: "basic", description: "Descending", inputs: { head: [5, 4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "Duplicates", inputs: { head: [1, 1, 1, 1] } });
  cases.push({ category: "basic", description: "Odd length", inputs: { head: [7, 8, 9, 10, 11, 12, 13] } });
  cases.push({ category: "basic", description: "Two large vals", inputs: { head: [100, 200] } });
  cases.push({ category: "basic", description: "Even length", inputs: { head: [1, 3, 5, 7, 9, 11] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const len = i + 1;
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head: Array.from({ length: len }, (_, idx) => idx + 1) } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const len = 10 + i * 2;
    const val = (i * 7) % 50 + 1;
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: Array(len).fill(val) } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 5;
    cases.push({ category: "random", description: "Random " + i, inputs: { head: Array.from({ length: len }, () => Math.floor(Math.random() * 100) + 1) } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 80 + i;
    cases.push({ category: "large", description: "Large " + i, inputs: { head: Array.from({ length: len }, (_, idx) => (idx * 3 + 1) % 100 + 1) } });
  }

  return cases;
}`
  },
  {
    slug: 'remove-linked-list-elements',
    title: 'Remove Linked List Elements',
    difficulty: 'EASY',
    topics: ['Linked List', 'Recursion'],
    fnName: 'removeElements',
    inputs: [{ type: 'list<int>', name: 'head' }, { type: 'int', name: 'val' }],
    output: { type: 'list<int>', name: 'result' },
    description: `Given the head of a linked list and an integer \`val\`, remove all the nodes of the linked list that have \`Node.val == val\`, and return the new head.

### Examples

**Example 1:**
\`\`\`
Input:
head = [1, 2, 6, 3, 4, 5, 6]
val = 6
Output: 1 2 3 4 5
\`\`\`

**Example 2:**
\`\`\`
Input:
head = [1, 2, 3]
val = 4
Output: 1 2 3
\`\`\`

### Constraints

- The number of nodes in the list is in the range \`[1, 1000]\`.
- \`1 <= Node.val <= 100\`
- \`0 <= val <= 100\`
- At least one node in \`head\` has a value different from \`val\`.`,
    solutionCode: `export function solve(head, val) {
  const result = [];
  for (let i = 0; i < head.length; i++) {
    if (head[i] !== val) {
      result.push(head[i]);
    }
  }
  return result;
}`,
    baselineCode: `export function solve(head, val) {
  return head.filter(x => x !== val);
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 6, 3, 4, 5, 6], val: 6 } });
  cases.push({ category: "basic", description: "Prefix matches", inputs: { head: [7, 7, 7, 8], val: 7 } });
  cases.push({ category: "basic", description: "No match", inputs: { head: [1, 2, 3], val: 4 } });
  cases.push({ category: "basic", description: "Mixed", inputs: { head: [2, 1, 2, 2], val: 2 } });
  cases.push({ category: "basic", description: "Head match", inputs: { head: [5, 6, 7, 8], val: 5 } });
  cases.push({ category: "basic", description: "Tail match", inputs: { head: [5, 6, 7, 8], val: 8 } });
  cases.push({ category: "basic", description: "Surrounded", inputs: { head: [1, 1, 2, 1, 1], val: 1 } });
  cases.push({ category: "basic", description: "Multiple", inputs: { head: [10, 20, 30, 40], val: 25 } });
  cases.push({ category: "basic", description: "Consecutive", inputs: { head: [9, 9, 1], val: 9 } });
  cases.push({ category: "basic", description: "Alternating", inputs: { head: [3, 4, 3, 4, 3, 4], val: 3 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const head = [100, ...Array(i + 1).fill(i + 1)];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head, val: i + 1 } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const head = Array.from({ length: 20 }, (_, idx) => (idx % 2 === 0 ? 99 : 10));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head, val: 99 } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 30) + 10;
    const target = (i % 5) + 1;
    const head = Array.from({ length: len }, () => Math.floor(Math.random() * 5) + 1);
    head[0] = 99; // ensure at least one survives
    cases.push({ category: "random", description: "Random " + i, inputs: { head, val: target } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 500 + i * 20;
    const head = Array.from({ length: len }, (_, idx) => idx % 10 + 1);
    head[0] = 100;
    cases.push({ category: "large", description: "Large " + i, inputs: { head, val: 5 } });
  }

  return cases;
}`
  },
  {
    slug: 'delete-node-in-a-linked-list',
    title: 'Delete Node in a Linked List',
    difficulty: 'MEDIUM',
    topics: ['Linked List'],
    fnName: 'deleteNode',
    inputs: [{ type: 'list<int>', name: 'head' }, { type: 'int', name: 'nodeVal' }],
    output: { type: 'list<int>', name: 'result' },
    description: `There is a singly-linked list \`head\` and we want to delete a node in it.

You are given the node value to be deleted \`nodeVal\`. You will not be given access to the first node of \`head\`.

All the values of the linked list are unique, and it is guaranteed that the given node is not the last node in the linked list.

Return the updated linked list.

### Examples

**Example 1:**
\`\`\`
Input:
head = [4, 5, 1, 9]
nodeVal = 5
Output: 4 1 9
Explanation: You are given the second node with value 5, the linked list should become 4 -> 1 -> 9 after calling your function.
\`\`\`

**Example 2:**
\`\`\`
Input:
head = [4, 5, 1, 9]
nodeVal = 1
Output: 4 5 9
Explanation: You are given the third node with value 1, the linked list should become 4 -> 5 -> 9 after calling your function.
\`\`\`

### Constraints

- The number of the nodes in the given list is in the range \`[2, 1000]\`.
- \`-1000 <= Node.val <= 1000\`
- Each the value of the node in the list is unique.
- The given node is an existing node in the list and is not the last node.`,
    solutionCode: `export function solve(head, nodeVal) {
  const result = [];
  for (let i = 0; i < head.length; i++) {
    if (head[i] !== nodeVal) {
      result.push(head[i]);
    }
  }
  return result;
}`,
    baselineCode: `export function solve(head, nodeVal) {
  const idx = head.indexOf(nodeVal);
  const res = head.slice();
  res.splice(idx, 1);
  return res;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [4, 5, 1, 9], nodeVal: 5 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [4, 5, 1, 9], nodeVal: 1 } });
  cases.push({ category: "basic", description: "Two nodes", inputs: { head: [1, 2], nodeVal: 1 } });
  cases.push({ category: "basic", description: "Three nodes middle", inputs: { head: [1, 2, 3], nodeVal: 2 } });
  cases.push({ category: "basic", description: "Four nodes first", inputs: { head: [10, 20, 30, 40], nodeVal: 10 } });
  cases.push({ category: "basic", description: "Four nodes third", inputs: { head: [10, 20, 30, 40], nodeVal: 30 } });
  cases.push({ category: "basic", description: "Five nodes", inputs: { head: [100, 200, 300, 400, 500], nodeVal: 300 } });
  cases.push({ category: "basic", description: "Negatives", inputs: { head: [-5, -4, -3, -2, -1], nodeVal: -3 } });
  cases.push({ category: "basic", description: "Zeros", inputs: { head: [0, 1, 2], nodeVal: 0 } });
  cases.push({ category: "basic", description: "Multiples of 7", inputs: { head: [7, 14, 21, 28], nodeVal: 14 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const head = Array.from({ length: i + 3 }, (_, idx) => idx + 10);
    const nodeVal = head[1]; // not last node
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head, nodeVal } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const head = Array.from({ length: 15 }, (_, idx) => idx * 10 - 50);
    const nodeVal = head[i % (head.length - 1)];
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head, nodeVal } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 5;
    const set = new Set();
    while (set.size < len) {
      set.add(Math.floor(Math.random() * 2000) - 1000);
    }
    const head = Array.from(set);
    const nodeVal = head[Math.floor(Math.random() * (head.length - 1))];
    cases.push({ category: "random", description: "Random " + i, inputs: { head, nodeVal } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 500 + i * 20;
    const head = Array.from({ length: len }, (_, idx) => idx);
    const nodeVal = head[100 + i * 5];
    cases.push({ category: "large", description: "Large " + i, inputs: { head, nodeVal } });
  }

  return cases;
}`
  },
  {
    slug: 'linked-list-cycle-ii',
    title: 'Linked List Cycle II',
    difficulty: 'MEDIUM',
    topics: ['Hash Table', 'Linked List', 'Two Pointers'],
    fnName: 'detectCycle',
    inputs: [{ type: 'list<int>', name: 'head' }, { type: 'int', name: 'pos' }],
    output: { type: 'int', name: 'result' },
    description: `Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return -1.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the \`next\` pointer. Internally, \`pos\` is used to denote the index of the node that tail's \`next\` pointer is connected to (0-indexed). It is -1 if there is no cycle. Note that \`pos\` is not passed to the actual linked list implementation, but for verification purposes it is provided.

Return the index of the node where the cycle begins, or -1 if there is no cycle.

### Examples

**Example 1:**
\`\`\`
Input:
head = [3, 2, 0, -4]
pos = 1
Output: 1
Explanation: There is a cycle in the linked list, where tail connects to the second node.
\`\`\`

**Example 2:**
\`\`\`
Input:
head = [1, 2]
pos = 0
Output: 0
Explanation: There is a cycle in the linked list, where tail connects to the first node.
\`\`\`

**Example 3:**
\`\`\`
Input:
head = [1]
pos = -1
Output: -1
Explanation: There is no cycle in the linked list.
\`\`\`

### Constraints

- The number of the nodes in the list is in the range \`[1, 10^4]\`.
- \`-10^5 <= Node.val <= 10^5\`
- \`pos\` is \`-1\` or a valid index in the linked-list.`,
    solutionCode: `export function solve(head, pos) {
  if (pos < 0 || pos >= head.length) return -1;
  return pos;
}`,
    baselineCode: `export function solve(head, pos) {
  return (pos >= 0 && pos < head.length) ? pos : -1;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [3, 2, 0, -4], pos: 1 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1, 2], pos: 0 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { head: [1], pos: -1 } });
  cases.push({ category: "basic", description: "No cycle", inputs: { head: [1, 2, 3, 4], pos: -1 } });
  cases.push({ category: "basic", description: "Self cycle tail", inputs: { head: [1, 2, 3, 4], pos: 3 } });
  cases.push({ category: "basic", description: "Mid cycle", inputs: { head: [10, 20, 30, 40, 50], pos: 2 } });
  cases.push({ category: "basic", description: "Cycle to head", inputs: { head: [5, 4, 3, 2, 1], pos: 0 } });
  cases.push({ category: "basic", description: "Single node cycle", inputs: { head: [100], pos: 0 } });
  cases.push({ category: "basic", description: "Small cycle", inputs: { head: [1, 2, 3], pos: 1 } });
  cases.push({ category: "basic", description: "No cycle 5", inputs: { head: [9, 8, 7, 6, 5], pos: -1 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const len = i + 2;
    const pos = i % 2 === 0 ? -1 : (i % len);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head: Array.from({ length: len }, (_, idx) => idx + 1), pos } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const len = 10 + i;
    const pos = i;
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: Array.from({ length: len }, (_, idx) => idx * 2), pos } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 30) + 5;
    const pos = i % 3 === 0 ? -1 : Math.floor(Math.random() * len);
    cases.push({ category: "random", description: "Random " + i, inputs: { head: Array.from({ length: len }, () => Math.floor(Math.random() * 200) - 100), pos } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 1000 + i * 200;
    const pos = i % 2 === 0 ? -1 : 400 + i * 20;
    cases.push({ category: "large", description: "Large " + i, inputs: { head: Array.from({ length: len }, (_, idx) => idx), pos } });
  }

  return cases;
}`
  },
  {
    slug: 'intersection-of-two-linked-lists',
    title: 'Intersection of Two Linked Lists',
    difficulty: 'EASY',
    topics: ['Hash Table', 'Linked List', 'Two Pointers'],
    fnName: 'getIntersectionNode',
    inputs: [
      { type: 'int', name: 'intersectVal' },
      { type: 'list<int>', name: 'listA' },
      { type: 'list<int>', name: 'listB' },
      { type: 'int', name: 'skipA' },
      { type: 'int', name: 'skipB' }
    ],
    output: { type: 'int', name: 'result' },
    description: `Given the heads of two singly linked-lists \`headA\` and \`headB\`, return the value of the node at which the two lists intersect. If the two linked lists have no intersection at all, return 0.

The parameters:
- \`intersectVal\`: The value of the node where the intersection occurs. 0 if there is no intersected node.
- \`listA\`: The first linked list.
- \`listB\`: The second linked list.
- \`skipA\`: The number of nodes in \`listA\` (starting from the head) to skip to reach the intersected node.
- \`skipB\`: The number of nodes in \`listB\` (starting from the head) to skip to reach the intersected node.

### Examples

**Example 1:**
\`\`\`
Input:
intersectVal = 8
listA = [4, 1, 8, 4, 5]
listB = [5, 6, 1, 8, 4, 5]
skipA = 2
skipB = 3
Output: 8
Explanation: The intersected node's value is 8.
\`\`\`

**Example 2:**
\`\`\`
Input:
intersectVal = 0
listA = [2, 6, 4]
listB = [1, 5]
skipA = 3
skipB = 2
Output: 0
Explanation: From the head of A, it reads as [2, 6, 4]. From the head of B, it reads as [1, 5]. Since the two lists do not intersect, intersectVal must be 0.
\`\`\`

### Constraints

- The number of nodes of \`listA\` is in the \`m\`.
- The number of nodes of \`listB\` is in the \`n\`.
- \`1 <= m, n <= 3 * 10^4\`
- \`1 <= Node.val <= 10^5\`
- \`0 <= skipA < m\`
- \`0 <= skipB < n\`
- \`intersectVal == 0\` if \`listA\` and \`listB\` do not intersect.`,
    solutionCode: `export function solve(intersectVal, listA, listB, skipA, skipB) {
  return intersectVal;
}`,
    baselineCode: `export function solve(intersectVal, listA, listB, skipA, skipB) {
  if (skipA >= listA.length || skipB >= listB.length) return 0;
  return intersectVal;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { intersectVal: 8, listA: [4, 1, 8, 4, 5], listB: [5, 6, 1, 8, 4, 5], skipA: 2, skipB: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { intersectVal: 2, listA: [1, 9, 1, 2, 4], listB: [3, 2, 4], skipA: 3, skipB: 1 } });
  cases.push({ category: "basic", description: "Example 3 (No intersection)", inputs: { intersectVal: 0, listA: [2, 6, 4], listB: [1, 5], skipA: 3, skipB: 2 } });
  cases.push({ category: "basic", description: "Single node intersect", inputs: { intersectVal: 5, listA: [5], listB: [5], skipA: 0, skipB: 0 } });
  cases.push({ category: "basic", description: "No intersect small", inputs: { intersectVal: 0, listA: [1, 2], listB: [3, 4], skipA: 2, skipB: 2 } });
  cases.push({ category: "basic", description: "Intersect at tail", inputs: { intersectVal: 10, listA: [1, 2, 10], listB: [3, 10], skipA: 2, skipB: 1 } });
  cases.push({ category: "basic", description: "Identical lists", inputs: { intersectVal: 7, listA: [7, 8, 9], listB: [7, 8, 9], skipA: 0, skipB: 0 } });
  cases.push({ category: "basic", description: "Single disjoint", inputs: { intersectVal: 0, listA: [100], listB: [200], skipA: 1, skipB: 1 } });
  cases.push({ category: "basic", description: "Intersect val 4", inputs: { intersectVal: 4, listA: [1, 4], listB: [2, 3, 4], skipA: 1, skipB: 2 } });
  cases.push({ category: "basic", description: "Disjoint 3", inputs: { intersectVal: 0, listA: [1, 3, 5], listB: [2, 4, 6], skipA: 3, skipB: 3 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const intersect = i % 2 === 0;
    const v = intersect ? (i + 1) * 10 : 0;
    const listA = [1, 2, ...(intersect ? [v, v + 1] : [3, 4])];
    const listB = [5, ...(intersect ? [v, v + 1] : [6, 7])];
    const skipA = 2;
    const skipB = 1;
    cases.push({ category: "edge", description: "Edge " + i, inputs: { intersectVal: v, listA, listB, skipA, skipB } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const listA = Array.from({ length: 10 }, (_, idx) => idx + 1);
    const listB = Array.from({ length: 8 }, (_, idx) => idx + 20);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { intersectVal: 0, listA, listB, skipA: 10, skipB: 8 } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const intersect = i % 2 === 1;
    const v = intersect ? Math.floor(Math.random() * 500) + 1 : 0;
    const skipA = (i % 5) + 1;
    const skipB = (i % 4) + 1;
    const common = intersect ? [v, v + 2] : [];
    const listA = [...Array.from({ length: skipA }, (_, idx) => idx + 100), ...common];
    const listB = [...Array.from({ length: skipB }, (_, idx) => idx + 200), ...common];
    cases.push({ category: "random", description: "Random " + i, inputs: { intersectVal: v, listA, listB, skipA, skipB } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const v = (i + 1) * 77;
    const listA = [...Array.from({ length: 500 }, (_, idx) => idx), v];
    const listB = [...Array.from({ length: 400 }, (_, idx) => idx + 1000), v];
    cases.push({ category: "large", description: "Large " + i, inputs: { intersectVal: v, listA, listB, skipA: 500, skipB: 400 } });
  }

  return cases;
}`
  },
  {
    slug: 'palindrome-linked-list',
    title: 'Palindrome Linked List',
    difficulty: 'EASY',
    topics: ['Linked List', 'Two Pointers'],
    fnName: 'isPalindrome',
    inputs: [{ type: 'list<int>', name: 'head' }],
    output: { type: 'bool', name: 'result' },
    description: `Given the head of a singly linked list, return \`true\` if it is a palindrome or \`false\` otherwise.

### Examples

**Example 1:**
\`\`\`
Input: head = [1, 2, 2, 1]
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: head = [1, 2]
Output: false
\`\`\`

### Constraints

- The number of nodes in the list is in the range \`[1, 10^5]\`.
- \`0 <= Node.val <= 9\``,
    solutionCode: `export function solve(head) {
  let l = 0, r = head.length - 1;
  while (l < r) {
    if (head[l] !== head[r]) return false;
    l++;
    r--;
  }
  return true;
}`,
    baselineCode: `export function solve(head) {
  const rev = head.slice().reverse();
  for (let i = 0; i < head.length; i++) {
    if (head[i] !== rev[i]) return false;
  }
  return true;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 2, 1] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1, 2] } });
  cases.push({ category: "basic", description: "Single node", inputs: { head: [1] } });
  cases.push({ category: "basic", description: "Odd palindrome", inputs: { head: [1, 2, 3, 2, 1] } });
  cases.push({ category: "basic", description: "Not palindrome", inputs: { head: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "All same", inputs: { head: [7, 7, 7, 7] } });
  cases.push({ category: "basic", description: "Zeros mid", inputs: { head: [1, 0, 1] } });
  cases.push({ category: "basic", description: "Two zeros", inputs: { head: [0, 0] } });
  cases.push({ category: "basic", description: "Even palindrome 6", inputs: { head: [1, 2, 3, 3, 2, 1] } });
  cases.push({ category: "basic", description: "Almost palindrome", inputs: { head: [1, 2, 3, 4, 2, 1] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const isPal = i % 2 === 0;
    const half = Array.from({ length: i + 1 }, (_, idx) => idx % 10);
    const head = isPal ? [...half, ...half.slice().reverse()] : [...half, 9];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: Array(20 + i).fill(i % 10) } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 30) + 4;
    const isPal = i % 2 === 0;
    if (isPal) {
      const half = Array.from({ length: Math.floor(len / 2) }, () => Math.floor(Math.random() * 10));
      const mid = len % 2 === 1 ? [Math.floor(Math.random() * 10)] : [];
      cases.push({ category: "random", description: "Random " + i, inputs: { head: [...half, ...mid, ...half.slice().reverse()] } });
    } else {
      const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 10));
      arr[0] = 1;
      arr[arr.length - 1] = 2;
      cases.push({ category: "random", description: "Random " + i, inputs: { head: arr } });
    }
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 1000 + i * 100;
    const isPal = i % 2 === 0;
    const half = Array.from({ length: Math.floor(len / 2) }, (_, idx) => idx % 10);
    const head = isPal ? [...half, ...half.slice().reverse()] : [...half, 8, ...half.slice().reverse()];
    cases.push({ category: "large", description: "Large " + i, inputs: { head } });
  }

  return cases;
}`
  },
  {
    slug: 'reverse-linked-list-ii',
    title: 'Reverse Linked List II',
    difficulty: 'MEDIUM',
    topics: ['Linked List'],
    fnName: 'reverseBetween',
    inputs: [
      { type: 'list<int>', name: 'head' },
      { type: 'int', name: 'left' },
      { type: 'int', name: 'right' }
    ],
    output: { type: 'list<int>', name: 'result' },
    description: `Given the head of a singly linked list and two integers \`left\` and \`right\` where \`left <= right\`, reverse the nodes of the list from position \`left\` to position \`right\`, and return the reversed list. (Positions are 1-indexed).

### Examples

**Example 1:**
\`\`\`
Input:
head = [1, 2, 3, 4, 5]
left = 2
right = 4
Output: 1 4 3 2 5
\`\`\`

**Example 2:**
\`\`\`
Input:
head = [5]
left = 1
right = 1
Output: 5
\`\`\`

### Constraints

- The number of nodes in the list is \`n\`.
- \`1 <= n <= 500\`
- \`-500 <= Node.val <= 500\`
- \`1 <= left <= right <= n\``,
    solutionCode: `export function solve(head, left, right) {
  const res = head.slice();
  let l = left - 1;
  let r = right - 1;
  while (l < r) {
    const temp = res[l];
    res[l] = res[r];
    res[r] = temp;
    l++;
    r--;
  }
  return res;
}`,
    baselineCode: `export function solve(head, left, right) {
  const prefix = head.slice(0, left - 1);
  const mid = head.slice(left - 1, right).reverse();
  const suffix = head.slice(right);
  return [...prefix, ...mid, ...suffix];
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 4, 5], left: 2, right: 4 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [5], left: 1, right: 1 } });
  cases.push({ category: "basic", description: "Reverse full 2", inputs: { head: [1, 2], left: 1, right: 2 } });
  cases.push({ category: "basic", description: "Reverse single element at start", inputs: { head: [1, 2, 3], left: 1, right: 1 } });
  cases.push({ category: "basic", description: "Reverse single element at end", inputs: { head: [1, 2, 3], left: 3, right: 3 } });
  cases.push({ category: "basic", description: "Reverse entire 6", inputs: { head: [10, 20, 30, 40, 50, 60], left: 1, right: 6 } });
  cases.push({ category: "basic", description: "Two elements reversed", inputs: { head: [3, 5], left: 1, right: 2 } });
  cases.push({ category: "basic", description: "Mid range 2 to 5", inputs: { head: [1, 2, 3, 4, 5, 6], left: 2, right: 5 } });
  cases.push({ category: "basic", description: "Mid 2 to 3", inputs: { head: [7, 8, 9, 10], left: 2, right: 3 } });
  cases.push({ category: "basic", description: "Prefix reverse", inputs: { head: [10, 9, 8, 7, 6], left: 1, right: 4 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const head = Array.from({ length: i + 3 }, (_, idx) => idx + 1);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head, left: 1, right: head.length } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const head = Array.from({ length: 10 + i }, (_, idx) => (idx + 1) * 10);
    const mid = Math.floor(head.length / 2);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head, left: mid, right: mid } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 5;
    const head = Array.from({ length: len }, () => Math.floor(Math.random() * 200) - 100);
    const left = Math.floor(Math.random() * (len - 1)) + 1;
    const right = Math.floor(Math.random() * (len - left + 1)) + left;
    cases.push({ category: "random", description: "Random " + i, inputs: { head, left, right } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 300 + i * 15;
    const head = Array.from({ length: len }, (_, idx) => idx);
    cases.push({ category: "large", description: "Large " + i, inputs: { head, left: 50 + i * 5, right: 250 + i * 5 } });
  }

  return cases;
}`
  },
  {
    slug: 'swap-nodes-in-pairs',
    title: 'Swap Nodes in Pairs',
    difficulty: 'MEDIUM',
    topics: ['Linked List', 'Recursion'],
    fnName: 'swapPairs',
    inputs: [{ type: 'list<int>', name: 'head' }],
    output: { type: 'list<int>', name: 'result' },
    description: `Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed).

### Examples

**Example 1:**
\`\`\`
Input: head = [1, 2, 3, 4]
Output: 2 1 4 3
\`\`\`

**Example 2:**
\`\`\`
Input: head = [1]
Output: 1
\`\`\`

### Constraints

- The number of nodes in the list is in the range \`[1, 100]\`.
- \`0 <= Node.val <= 100\``,
    solutionCode: `export function solve(head) {
  const res = head.slice();
  for (let i = 0; i + 1 < res.length; i += 2) {
    const temp = res[i];
    res[i] = res[i + 1];
    res[i + 1] = temp;
  }
  return res;
}`,
    baselineCode: `export function solve(head) {
  const out = [];
  for (let i = 0; i < head.length; i += 2) {
    if (i + 1 < head.length) {
      out.push(head[i + 1]);
      out.push(head[i]);
    } else {
      out.push(head[i]);
    }
  }
  return out;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1] } });
  cases.push({ category: "basic", description: "Odd length 3", inputs: { head: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Two elements", inputs: { head: [1, 2] } });
  cases.push({ category: "basic", description: "Six elements", inputs: { head: [10, 20, 30, 40, 50, 60] } });
  cases.push({ category: "basic", description: "Five elements", inputs: { head: [7, 8, 9, 10, 11] } });
  cases.push({ category: "basic", description: "Descending 2", inputs: { head: [2, 1] } });
  cases.push({ category: "basic", description: "Zeros", inputs: { head: [0, 0, 0, 0] } });
  cases.push({ category: "basic", description: "Three distinct", inputs: { head: [5, 10, 15] } });
  cases.push({ category: "basic", description: "Nine elements", inputs: { head: [9, 8, 7, 6, 5, 4, 3, 2, 1] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head: Array.from({ length: i + 1 }, (_, idx) => idx + 1) } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: Array(i + 2).fill(42) } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 25) + 2;
    cases.push({ category: "random", description: "Random " + i, inputs: { head: Array.from({ length: len }, () => Math.floor(Math.random() * 100)) } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 80 + i;
    cases.push({ category: "large", description: "Large " + i, inputs: { head: Array.from({ length: len }, (_, idx) => idx * 3) } });
  }

  return cases;
}`
  },
  {
    slug: 'rotate-list',
    title: 'Rotate List',
    difficulty: 'MEDIUM',
    topics: ['Linked List', 'Two Pointers'],
    fnName: 'rotateRight',
    inputs: [{ type: 'list<int>', name: 'head' }, { type: 'int', name: 'k' }],
    output: { type: 'list<int>', name: 'result' },
    description: `Given the head of a linked list, rotate the list to the right by \`k\` places.

### Examples

**Example 1:**
\`\`\`
Input:
head = [1, 2, 3, 4, 5]
k = 2
Output: 4 5 1 2 3
\`\`\`

**Example 2:**
\`\`\`
Input:
head = [0, 1, 2]
k = 4
Output: 2 0 1
\`\`\`

### Constraints

- The number of nodes in the list is in the range \`[1, 500]\`.
- \`-100 <= Node.val <= 100\`
- \`0 <= k <= 2 * 10^9\``,
    solutionCode: `export function solve(head, k) {
  if (head.length === 0) return [];
  const shift = k % head.length;
  if (shift === 0) return head.slice();
  return head.slice(-shift).concat(head.slice(0, -shift));
}`,
    baselineCode: `export function solve(head, k) {
  const n = head.length;
  if (n === 0) return [];
  const rot = k % n;
  const res = new Array(n);
  for (let i = 0; i < n; i++) {
    res[(i + rot) % n] = head[i];
  }
  return res;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 4, 5], k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [0, 1, 2], k: 4 } });
  cases.push({ category: "basic", description: "k is 0", inputs: { head: [1], k: 0 } });
  cases.push({ category: "basic", description: "Single node large k", inputs: { head: [1], k: 99 } });
  cases.push({ category: "basic", description: "Two nodes k=1", inputs: { head: [1, 2], k: 1 } });
  cases.push({ category: "basic", description: "Two nodes k=2", inputs: { head: [1, 2], k: 2 } });
  cases.push({ category: "basic", description: "Four nodes k=0", inputs: { head: [1, 2, 3, 4], k: 0 } });
  cases.push({ category: "basic", description: "Four nodes k=4", inputs: { head: [1, 2, 3, 4], k: 4 } });
  cases.push({ category: "basic", description: "Three nodes k=5", inputs: { head: [10, 20, 30], k: 5 } });
  cases.push({ category: "basic", description: "Four nodes k=3", inputs: { head: [5, 6, 7, 8], k: 3 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const head = Array.from({ length: i + 1 }, (_, idx) => idx + 1);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head, k: i + 1 } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const head = Array.from({ length: 10 }, (_, idx) => idx);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head, k: 1000000000 + i } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 3;
    const head = Array.from({ length: len }, () => Math.floor(Math.random() * 200) - 100);
    const k = Math.floor(Math.random() * 1000);
    cases.push({ category: "random", description: "Random " + i, inputs: { head, k } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 300 + i * 10;
    const head = Array.from({ length: len }, (_, idx) => idx);
    cases.push({ category: "large", description: "Large " + i, inputs: { head, k: 987654321 } });
  }

  return cases;
}`
  },
  {
    slug: 'partition-list',
    title: 'Partition List',
    difficulty: 'MEDIUM',
    topics: ['Linked List', 'Two Pointers'],
    fnName: 'partition',
    inputs: [{ type: 'list<int>', name: 'head' }, { type: 'int', name: 'x' }],
    output: { type: 'list<int>', name: 'result' },
    description: `Given the head of a linked list and a value \`x\`, partition it such that all nodes less than \`x\` come before nodes greater than or equal to \`x\`.

You should preserve the original relative order of the nodes in each of the two partitions.

### Examples

**Example 1:**
\`\`\`
Input:
head = [1, 4, 3, 2, 5, 2]
x = 3
Output: 1 2 2 4 3 5
\`\`\`

**Example 2:**
\`\`\`
Input:
head = [2, 1]
x = 2
Output: 1 2
\`\`\`

### Constraints

- The number of nodes in the list is in the range \`[1, 200]\`.
- \`-100 <= Node.val <= 100\`
- \`-200 <= x <= 200\``,
    solutionCode: `export function solve(head, x) {
  const less = [];
  const greaterOrEqual = [];
  for (let i = 0; i < head.length; i++) {
    if (head[i] < x) {
      less.push(head[i]);
    } else {
      greaterOrEqual.push(head[i]);
    }
  }
  return less.concat(greaterOrEqual);
}`,
    baselineCode: `export function solve(head, x) {
  return [...head.filter(v => v < x), ...head.filter(v => v >= x)];
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 4, 3, 2, 5, 2], x: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [2, 1], x: 2 } });
  cases.push({ category: "basic", description: "Single node x=0", inputs: { head: [1], x: 0 } });
  cases.push({ category: "basic", description: "Single node x=2", inputs: { head: [1], x: 2 } });
  cases.push({ category: "basic", description: "All less", inputs: { head: [1, 2, 3, 4], x: 5 } });
  cases.push({ category: "basic", description: "Descending", inputs: { head: [5, 4, 3, 2, 1], x: 3 } });
  cases.push({ category: "basic", description: "All equal x", inputs: { head: [3, 3, 3], x: 3 } });
  cases.push({ category: "basic", description: "Negatives and positives", inputs: { head: [10, -5, 20, -10], x: 0 } });
  cases.push({ category: "basic", description: "Alternating", inputs: { head: [1, 5, 2, 4, 3], x: 3 } });
  cases.push({ category: "basic", description: "Mixed", inputs: { head: [8, 1, 2, 9, 3], x: 5 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const head = Array.from({ length: i + 2 }, (_, idx) => idx + 1);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head, x: i % 2 === 0 ? 0 : 50 } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const head = Array(i + 3).fill(i * 5);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head, x: i * 5 } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 25) + 3;
    const head = Array.from({ length: len }, () => Math.floor(Math.random() * 200) - 100);
    const x = Math.floor(Math.random() * 200) - 100;
    cases.push({ category: "random", description: "Random " + i, inputs: { head, x } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 150 + i * 3;
    const head = Array.from({ length: len }, (_, idx) => (idx * 7) % 200 - 100);
    cases.push({ category: "large", description: "Large " + i, inputs: { head, x: 10 } });
  }

  return cases;
}`
  },
  {
    slug: 'odd-even-linked-list',
    title: 'Odd Even Linked List',
    difficulty: 'MEDIUM',
    topics: ['Linked List'],
    fnName: 'oddEvenList',
    inputs: [{ type: 'list<int>', name: 'head' }],
    output: { type: 'list<int>', name: 'result' },
    description: `Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

The first node is considered odd, and the second node is even, and so on (1-indexed).

Note that the relative order inside both the even and odd groups should remain as it was in the input.

### Examples

**Example 1:**
\`\`\`
Input: head = [1, 2, 3, 4, 5]
Output: 1 3 5 2 4
\`\`\`

**Example 2:**
\`\`\`
Input: head = [2, 1, 3, 5, 6, 4, 7]
Output: 2 3 6 7 1 5 4
\`\`\`

### Constraints

- The number of nodes in the linked list is in the range \`[1, 10^4]\`.
- \`-10^6 <= Node.val <= 10^6\``,
    solutionCode: `export function solve(head) {
  const odd = [];
  const even = [];
  for (let i = 0; i < head.length; i++) {
    if (i % 2 === 0) {
      odd.push(head[i]);
    } else {
      even.push(head[i]);
    }
  }
  return odd.concat(even);
}`,
    baselineCode: `export function solve(head) {
  const o = head.filter((_, idx) => idx % 2 === 0);
  const e = head.filter((_, idx) => idx % 2 === 1);
  return [...o, ...e];
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [2, 1, 3, 5, 6, 4, 7] } });
  cases.push({ category: "basic", description: "Single node", inputs: { head: [1] } });
  cases.push({ category: "basic", description: "Two nodes", inputs: { head: [1, 2] } });
  cases.push({ category: "basic", description: "Three nodes", inputs: { head: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Four nodes", inputs: { head: [1, 2, 3, 4] } });
  cases.push({ category: "basic", description: "Six nodes", inputs: { head: [10, 20, 30, 40, 50, 60] } });
  cases.push({ category: "basic", description: "All same", inputs: { head: [5, 5, 5] } });
  cases.push({ category: "basic", description: "Descending", inputs: { head: [9, 8, 7, 6, 5, 4] } });
  cases.push({ category: "basic", description: "Hundreds", inputs: { head: [100, 200, 300] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head: Array.from({ length: i + 1 }, (_, idx) => idx + 1) } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: Array(20 + i).fill(i * 10) } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 30) + 3;
    cases.push({ category: "random", description: "Random " + i, inputs: { head: Array.from({ length: len }, () => Math.floor(Math.random() * 2000) - 1000) } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 1000 + i * 200;
    cases.push({ category: "large", description: "Large " + i, inputs: { head: Array.from({ length: len }, (_, idx) => idx) } });
  }

  return cases;
}`
  },
  {
    slug: 'remove-duplicates-from-sorted-list-ii',
    title: 'Remove Duplicates from Sorted List II',
    difficulty: 'MEDIUM',
    topics: ['Linked List', 'Two Pointers'],
    fnName: 'deleteDuplicates',
    inputs: [{ type: 'list<int>', name: 'head' }],
    output: { type: 'list<int>', name: 'result' },
    description: `Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.

### Examples

**Example 1:**
\`\`\`
Input: head = [1, 2, 3, 3, 4, 4, 5]
Output: 1 2 5
\`\`\`

**Example 2:**
\`\`\`
Input: head = [1, 1, 1, 2, 3]
Output: 2 3
\`\`\`

### Constraints

- The number of nodes in the list is in the range \`[1, 300]\`.
- \`-100 <= Node.val <= 100\`
- The list is guaranteed to be sorted in ascending order.
- At least one distinct node remains in the list after deleting duplicates.`,
    solutionCode: `export function solve(head) {
  const counts = new Map();
  for (const v of head) {
    counts.set(v, (counts.get(v) || 0) + 1);
  }
  const result = [];
  for (const v of head) {
    if (counts.get(v) === 1) {
      result.push(v);
    }
  }
  return result;
}`,
    baselineCode: `export function solve(head) {
  const res = [];
  let i = 0;
  while (i < head.length) {
    if (i + 1 < head.length && head[i] === head[i + 1]) {
      const v = head[i];
      while (i < head.length && head[i] === v) {
        i++;
      }
    } else {
      res.push(head[i]);
      i++;
    }
  }
  return res;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 3, 3, 4, 4, 5] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1, 1, 1, 2, 3] } });
  cases.push({ category: "basic", description: "Single node", inputs: { head: [1] } });
  cases.push({ category: "basic", description: "All distinct", inputs: { head: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Duplicate at start", inputs: { head: [1, 1, 2] } });
  cases.push({ category: "basic", description: "Duplicate at end", inputs: { head: [1, 2, 2] } });
  cases.push({ category: "basic", description: "Two pairs in middle", inputs: { head: [1, 2, 2, 3, 3, 4] } });
  cases.push({ category: "basic", description: "Negatives", inputs: { head: [-3, -3, -2, -1, -1, 0, 1, 1] } });
  cases.push({ category: "basic", description: "Tens", inputs: { head: [10, 10, 20, 30, 30, 40] } });
  cases.push({ category: "basic", description: "Triple duplicates", inputs: { head: [1, 2, 2, 2, 3, 4, 4, 5] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const head = [999];
    for (let j = 0; j <= i; j++) {
      head.unshift(j, j);
    }
    head.sort((a, b) => a - b);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const head = Array.from({ length: i + 3 }, (_, idx) => idx + 1);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const items = [];
    const numPairs = (i % 10) + 1;
    for (let p = 0; p < numPairs; p++) {
      const val = p * 3;
      items.push(val, val);
    }
    items.push(999);
    items.sort((a, b) => a - b);
    cases.push({ category: "random", description: "Random " + i, inputs: { head: items } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const items = [];
    for (let j = 0; j < 100; j++) {
      items.push(j, j);
    }
    items.push(500, 600);
    items.sort((a, b) => a - b);
    cases.push({ category: "large", description: "Large " + i, inputs: { head: items } });
  }

  return cases;
}`
  },
  {
    slug: 'sort-list',
    title: 'Sort List',
    difficulty: 'MEDIUM',
    topics: ['Linked List', 'Divide and Conquer', 'Merge Sort'],
    fnName: 'sortList',
    inputs: [{ type: 'list<int>', name: 'head' }],
    output: { type: 'list<int>', name: 'result' },
    description: `Given the head of a linked list, return the list after sorting it in ascending order in O(n log n) time and O(log n) memory.

### Examples

**Example 1:**
\`\`\`
Input: head = [4, 2, 1, 3]
Output: 1 2 3 4
\`\`\`

**Example 2:**
\`\`\`
Input: head = [-1, 5, 3, 4, 0]
Output: -1 0 3 4 5
\`\`\`

### Constraints

- The number of nodes in the list is in the range \`[1, 5 * 10^4]\`.
- \`-10^5 <= Node.val <= 10^5\``,
    solutionCode: `export function solve(head) {
  function merge(left, right) {
    const result = [];
    let l = 0, r = 0;
    while (l < left.length && r < right.length) {
      if (left[l] <= right[r]) {
        result.push(left[l++]);
      } else {
        result.push(right[r++]);
      }
    }
    while (l < left.length) result.push(left[l++]);
    while (r < right.length) result.push(right[r++]);
    return result;
  }

  function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
  }

  return mergeSort(head);
}`,
    baselineCode: `export function solve(head) {
  return head.slice().sort((a, b) => a - b);
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [4, 2, 1, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [-1, 5, 3, 4, 0] } });
  cases.push({ category: "basic", description: "Single node", inputs: { head: [1] } });
  cases.push({ category: "basic", description: "Two inverted", inputs: { head: [2, 1] } });
  cases.push({ category: "basic", description: "Already sorted", inputs: { head: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "Reversed", inputs: { head: [5, 4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "Pi digits", inputs: { head: [3, 1, 4, 1, 5, 9, 2, 6] } });
  cases.push({ category: "basic", description: "Negatives", inputs: { head: [10, -10, 20, -20] } });
  cases.push({ category: "basic", description: "Zeros", inputs: { head: [0, 0, 0] } });
  cases.push({ category: "basic", description: "Four elements", inputs: { head: [100, 50, 75, 25] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head: Array.from({ length: i + 2 }, (_, idx) => (i + 2) - idx) } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: Array(20 + i).fill(i * 10 - 50) } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 30) + 5;
    cases.push({ category: "random", description: "Random " + i, inputs: { head: Array.from({ length: len }, () => Math.floor(Math.random() * 2000) - 1000) } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 1000 + i * 200;
    cases.push({ category: "large", description: "Large " + i, inputs: { head: Array.from({ length: len }, () => Math.floor(Math.random() * 20000) - 10000) } });
  }

  return cases;
}`
  }
];

function buildProblem(p) {
  const dir = path.join(ROOT, p.slug);
  fs.mkdirSync(path.join(dir, 'generators'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'reference'), { recursive: true });

  const inputFields = p.inputs.map(i => `Input Field: ${i.type} ${i.name}`).join('\n');
  const structureMd = `Problem Name: "${p.title}"
Difficulty: ${p.difficulty}
Topics: ${p.topics.join(', ')}
Function Name: ${p.fnName}

Input Structure:
${inputFields}

Output Structure:
Output Field: ${p.output.type} ${p.output.name}
`;
  fs.writeFileSync(path.join(dir, 'Structure.md'), structureMd, 'utf8');

  const problemMd = `# ${p.title}\n\n${p.description}\n`;
  fs.writeFileSync(path.join(dir, 'Problem.md'), problemMd, 'utf8');

  fs.writeFileSync(path.join(dir, 'reference/solution.js'), p.solutionCode, 'utf8');
  fs.writeFileSync(path.join(dir, 'reference/baseline-solution.js'), p.baselineCode, 'utf8');
  fs.writeFileSync(path.join(dir, 'generators/test-cases.js'), p.testGenCode, 'utf8');

  console.log(`Created problem: ${p.slug}`);
}

for (const p of problems) {
  buildProblem(p);
}
