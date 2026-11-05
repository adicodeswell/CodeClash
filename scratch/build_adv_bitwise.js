import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('problem-bank/problems');

const problems = [
  {
    slug: 'power-of-two',
    title: 'Power of Two',
    difficulty: 'EASY',
    topics: ['Math', 'Bit Manipulation'],
    fnName: 'isPowerOfTwo',
    inputs: [{ type: 'int', name: 'n' }],
    output: { type: 'bool', name: 'result' },
    description: `Given an integer \`n\`, return \`true\` if it is a power of two. Otherwise, return \`false\`.

An integer \`n\` is a power of two if there exists an integer \`x\` such that \`n == 2^x\`.

### Examples

**Example 1:**
\`\`\`
Input: n = 1
Output: true
Explanation: 2^0 = 1
\`\`\`

**Example 2:**
\`\`\`
Input: n = 16
Output: true
Explanation: 2^4 = 16
\`\`\`

**Example 3:**
\`\`\`
Input: n = 3
Output: false
\`\`\`

### Constraints

- \`-2^31 <= n <= 2^31 - 1\``,
    solutionCode: `export function solve(n) {
  return n > 0 && (n & (n - 1)) === 0;
}`,
    baselineCode: `export function solve(n) {
  if (n <= 0) return false;
  while (n % 2 === 0) {
    n = Math.floor(n / 2);
  }
  return n === 1;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { n: 1 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { n: 16 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { n: 3 } });
  cases.push({ category: "basic", description: "Zero", inputs: { n: 0 } });
  cases.push({ category: "basic", description: "Negative", inputs: { n: -16 } });
  cases.push({ category: "basic", description: "Two", inputs: { n: 2 } });
  cases.push({ category: "basic", description: "Four", inputs: { n: 4 } });
  cases.push({ category: "basic", description: "Five", inputs: { n: 5 } });
  cases.push({ category: "basic", description: "Eight", inputs: { n: 8 } });
  cases.push({ category: "basic", description: "One less than power", inputs: { n: 15 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const n = Math.pow(2, i);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { n } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const n = -Math.pow(2, i);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { n } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const isPower = i % 2 === 0;
    const n = isPower ? Math.pow(2, (i % 28) + 1) : Math.floor(Math.random() * 100000) * 2 + 1;
    cases.push({ category: "random", description: "Random " + i, inputs: { n } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const isPower = i % 2 === 0;
    const exp = 15 + i;
    const n = isPower ? Math.pow(2, exp) : Math.pow(2, exp) - 1;
    cases.push({ category: "large", description: "Large " + i, inputs: { n } });
  }

  return cases;
}`
  },
  {
    slug: 'single-number-iii',
    title: 'Single Number III',
    difficulty: 'MEDIUM',
    topics: ['Array', 'Bit Manipulation'],
    fnName: 'singleNumber',
    inputs: [{ type: 'list<int>', name: 'nums' }],
    output: { type: 'list<int>', name: 'result' },
    description: `Given an integer array \`nums\`, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in ascending sorted order.

You must write an algorithm that runs in linear runtime complexity and uses only constant extra space.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 2, 1, 3, 2, 5]
Output: 3 5
Explanation: [5, 3] is also a valid answer.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [-1, 0]
Output: -1 0
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [0, 1]
Output: 0 1
\`\`\`

### Constraints

- \`2 <= nums.length <= 3 * 10^4\`
- \`-2^31 <= nums[i] <= 2^31 - 1\`
- Each integer in \`nums\` will appear twice, only two integers will appear once.`,
    solutionCode: `export function solve(nums) {
  let xor = 0;
  for (const n of nums) {
    xor ^= n;
  }
  // Lowest set bit
  const diff = xor & (-xor);
  let a = 0;
  let b = 0;
  for (const n of nums) {
    if ((n & diff) === 0) {
      a ^= n;
    } else {
      b ^= n;
    }
  }
  const res = [a, b];
  res.sort((x, y) => x - y);
  return res;
}`,
    baselineCode: `export function solve(nums) {
  const map = new Map();
  for (const n of nums) {
    map.set(n, (map.get(n) || 0) + 1);
  }
  const res = [];
  for (const [k, v] of map.entries()) {
    if (v === 1) res.push(k);
  }
  res.sort((x, y) => x - y);
  return res;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 1, 3, 2, 5] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [-1, 0] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [0, 1] } });
  cases.push({ category: "basic", description: "Two negatives", inputs: { nums: [-5, -10] } });
  cases.push({ category: "basic", description: "Duplicates surround", inputs: { nums: [4, 4, 1, 2, 3, 3] } });
  cases.push({ category: "basic", description: "Alternating", inputs: { nums: [10, 20, 10, 30, 40, 40] } });
  cases.push({ category: "basic", description: "Large values", inputs: { nums: [100000, 200000, 100000, 300000] } });
  cases.push({ category: "basic", description: "Neg and Pos", inputs: { nums: [-100, 100, 5, 5, 2, 2] } });
  cases.push({ category: "basic", description: "Adjacent unique", inputs: { nums: [7, 8, 9, 9] } });
  cases.push({ category: "basic", description: "Spread out", inputs: { nums: [1, 2, 3, 1, 4, 3] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const nums = [i + 1, i + 2];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { nums } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const nums = [-(i * 2 + 1), -(i * 2 + 2)];
    for (let j = 1; j <= i + 1; j++) {
      nums.push(j * 100, j * 100);
    }
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nums } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const u1 = (i * 17) + 1;
    const u2 = (i * 19) + 2;
    const nums = [u1, u2];
    const pairs = (i % 10) + 1;
    for (let p = 0; p < pairs; p++) {
      const v = 500 + p * 3;
      nums.push(v, v);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const nums = [777, 888];
    for (let j = 0; j < 200; j++) {
      nums.push(j + 1000, j + 1000);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}`
  },
  {
    slug: 'bitwise-and-of-numbers-range',
    title: 'Bitwise AND of Numbers Range',
    difficulty: 'MEDIUM',
    topics: ['Bit Manipulation'],
    fnName: 'rangeBitwiseAnd',
    inputs: [
      { type: 'int', name: 'left' },
      { type: 'int', name: 'right' }
    ],
    output: { type: 'int', name: 'result' },
    description: `Given two integers \`left\` and \`right\` that represent the range \`[left, right]\`, return the bitwise AND of all numbers in this range, inclusive.

### Examples

**Example 1:**
\`\`\`
Input:
left = 5
right = 7
Output: 4
Explanation: 5 & 6 & 7 = 4.
\`\`\`

**Example 2:**
\`\`\`
Input:
left = 0
right = 0
Output: 0
\`\`\`

**Example 3:**
\`\`\`
Input:
left = 1
right = 2147483647
Output: 0
\`\`\`

### Constraints

- \`0 <= left <= right <= 2^31 - 1\``,
    solutionCode: `export function solve(left, right) {
  let shift = 0;
  while (left < right) {
    left >>= 1;
    right >>= 1;
    shift++;
  }
  return left << shift;
}`,
    baselineCode: `export function solve(left, right) {
  while (right > left) {
    right = right & (right - 1);
  }
  return right;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { left: 5, right: 7 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { left: 0, right: 0 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { left: 1, right: 2147483647 } });
  cases.push({ category: "basic", description: "Equal numbers", inputs: { left: 10, right: 10 } });
  cases.push({ category: "basic", description: "Power of 2 span", inputs: { left: 8, right: 15 } });
  cases.push({ category: "basic", description: "Crosses power of 2", inputs: { left: 3, right: 4 } });
  cases.push({ category: "basic", description: "Small span", inputs: { left: 12, right: 13 } });
  cases.push({ category: "basic", description: "Zero start", inputs: { left: 0, right: 5 } });
  cases.push({ category: "basic", description: "Powers of two", inputs: { left: 16, right: 31 } });
  cases.push({ category: "basic", description: "Single bit difference", inputs: { left: 6, right: 7 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const left = i * 2;
    const right = left + 1;
    cases.push({ category: "edge", description: "Edge " + i, inputs: { left, right } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const left = Math.pow(2, i);
    const right = Math.pow(2, i + 1) - 1;
    cases.push({ category: "corner", description: "Corner " + i, inputs: { left, right } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const left = Math.floor(Math.random() * 1000) + 1;
    const right = left + Math.floor(Math.random() * 50);
    cases.push({ category: "random", description: "Random " + i, inputs: { left, right } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const left = 1000000 + i * 1000;
    const right = left + (i * 200 + 50);
    cases.push({ category: "large", description: "Large " + i, inputs: { left, right } });
  }

  return cases;
}`
  },
  {
    slug: 'maximum-xor-of-two-numbers-in-an-array',
    title: 'Maximum XOR of Two Numbers in an Array',
    difficulty: 'MEDIUM',
    topics: ['Array', 'Bit Manipulation', 'Trie'],
    fnName: 'findMaximumXOR',
    inputs: [{ type: 'list<int>', name: 'nums' }],
    output: { type: 'int', name: 'result' },
    description: `Given an integer array \`nums\`, return the maximum result of \`nums[i] XOR nums[j]\`, where \`0 <= i <= j < n\`.

### Examples

**Example 1:**
\`\`\`
Input: nums = [3, 10, 5, 25, 2, 8]
Output: 28
Explanation: The maximum result is 5 XOR 25 = 28.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70]
Output: 127
\`\`\`

### Constraints

- \`1 <= nums.length <= 2 * 10^5\`
- \`0 <= nums[i] <= 2^31 - 1\``,
    solutionCode: `export function solve(nums) {
  let maxXor = 0;
  let mask = 0;

  for (let i = 30; i >= 0; i--) {
    mask |= (1 << i);
    const prefixes = new Set();
    for (const num of nums) {
      prefixes.add(num & mask);
    }

    const candidate = maxXor | (1 << i);
    for (const prefix of prefixes) {
      if (prefixes.has(prefix ^ candidate)) {
        maxXor = candidate;
        break;
      }
    }
  }

  return maxXor;
}`,
    baselineCode: `export function solve(nums) {
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      max = Math.max(max, nums[i] ^ nums[j]);
    }
  }
  return max;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [3, 10, 5, 25, 2, 8] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70] } });
  cases.push({ category: "basic", description: "Single", inputs: { nums: [5] } });
  cases.push({ category: "basic", description: "Two elements", inputs: { nums: [1, 2] } });
  cases.push({ category: "basic", description: "All identical", inputs: { nums: [7, 7, 7] } });
  cases.push({ category: "basic", description: "Powers of two", inputs: { nums: [1, 2, 4, 8, 16] } });
  cases.push({ category: "basic", description: "Zero included", inputs: { nums: [0, 5, 10] } });
  cases.push({ category: "basic", description: "Complement pair", inputs: { nums: [15, 0] } });
  cases.push({ category: "basic", description: "Small consecutive", inputs: { nums: [1, 2, 3, 4] } });
  cases.push({ category: "basic", description: "Multiples of 10", inputs: { nums: [10, 20, 30, 40] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const nums = Array.from({ length: i + 2 }, (_, idx) => idx + 1);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { nums } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const nums = Array(i + 3).fill((i + 1) * 11);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nums } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 5;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 500));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 300 + i * 20;
    const nums = Array.from({ length: len }, (_, idx) => (idx * 37) % 5000);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}`
  },
  {
    slug: 'minimum-flips-to-make-a-or-b-equal-to-c',
    title: 'Minimum Flips to Make a OR b Equal to c',
    difficulty: 'MEDIUM',
    topics: ['Bit Manipulation'],
    fnName: 'minFlips',
    inputs: [
      { type: 'int', name: 'a' },
      { type: 'int', name: 'b' },
      { type: 'int', name: 'c' }
    ],
    output: { type: 'int', name: 'result' },
    description: `Given 3 positives numbers \`a\`, \`b\` and \`c\`. Return the minimum flips needed in some bits of \`a\` and \`b\` to make \`(a OR b) == c\` (bitwise OR operation).

Flip operation consists of change any single bit 1 to 0 or change the bit 0 to 1 in their binary representation.

### Examples

**Example 1:**
\`\`\`
Input:
a = 2
b = 6
c = 5
Output: 3
Explanation: After flips a = 1, b = 4, c = 5 such that (a OR b == c)
\`\`\`

**Example 2:**
\`\`\`
Input:
a = 4
b = 2
c = 7
Output: 1
\`\`\`

**Example 3:**
\`\`\`
Input:
a = 1
b = 2
c = 3
Output: 0
\`\`\`

### Constraints

- \`1 <= a <= 10^9\`
- \`1 <= b <= 10^9\`
- \`1 <= c <= 10^9\``,
    solutionCode: `export function solve(a, b, c) {
  let flips = 0;
  for (let i = 0; i < 31; i++) {
    const bitA = (a >> i) & 1;
    const bitB = (b >> i) & 1;
    const bitC = (c >> i) & 1;

    if (bitC === 0) {
      flips += bitA + bitB;
    } else {
      if (bitA === 0 && bitB === 0) {
        flips += 1;
      }
    }
  }
  return flips;
}`,
    baselineCode: `export function solve(a, b, c) {
  let ans = 0;
  while (a > 0 || b > 0 || c > 0) {
    const ba = a & 1;
    const bb = b & 1;
    const bc = c & 1;
    if (bc === 0) {
      ans += ba + bb;
    } else {
      if (ba === 0 && bb === 0) ans++;
    }
    a >>= 1;
    b >>= 1;
    c >>= 1;
  }
  return ans;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { a: 2, b: 6, c: 5 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { a: 4, b: 2, c: 7 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { a: 1, b: 2, c: 3 } });
  cases.push({ category: "basic", description: "All equal", inputs: { a: 5, b: 5, c: 5 } });
  cases.push({ category: "basic", description: "Zero flips already satisfied", inputs: { a: 4, b: 1, c: 5 } });
  cases.push({ category: "basic", description: "Double flip needed", inputs: { a: 3, b: 3, c: 0 } });
  cases.push({ category: "basic", description: "Powers of two", inputs: { a: 1, b: 2, c: 4 } });
  cases.push({ category: "basic", description: "High bits", inputs: { a: 1024, b: 2048, c: 4096 } });
  cases.push({ category: "basic", description: "Mixed bits", inputs: { a: 7, b: 7, c: 0 } });
  cases.push({ category: "basic", description: "Target has all ones", inputs: { a: 0, b: 0, c: 15 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { a: i + 1, b: (i + 1) * 2, c: (i + 1) * 3 } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { a: Math.pow(2, i), b: Math.pow(2, i), c: 0 } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const a = Math.floor(Math.random() * 1000) + 1;
    const b = Math.floor(Math.random() * 1000) + 1;
    const c = Math.floor(Math.random() * 1000) + 1;
    cases.push({ category: "random", description: "Random " + i, inputs: { a, b, c } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const a = 10000000 + i * 1234;
    const b = 20000000 + i * 5678;
    const c = 30000000 + i * 9101;
    cases.push({ category: "large", description: "Large " + i, inputs: { a, b, c } });
  }

  return cases;
}`
  },
  {
    slug: 'flatten-a-multilevel-doubly-linked-list',
    title: 'Flatten a Multilevel Doubly Linked List',
    difficulty: 'MEDIUM',
    topics: ['Linked List', 'Depth-First Search'],
    fnName: 'flatten',
    inputs: [{ type: 'list<list<int>>', name: 'nodes' }],
    output: { type: 'list<int>', name: 'result' },
    description: `You are given a doubly linked list, which contains nodes that have a next pointer, a previous pointer, and an additional child pointer. This child pointer may or may not point to a separate doubly linked list, also containing these special nodes. These child lists may have one or more children of their own, and so on, to produce a multilevel data structure.

Given the head of the first level of the list, flatten the list so that all the nodes appear in a single-level, doubly linked list (in depth-first order).

For simplicity, the multilevel doubly linked list is represented as an array of tuples \`[val, next_index, child_index]\`, where \`next_index\` is the 0-based index of the next node on the same level (\`-1\` if none), and \`child_index\` is the 0-based index of the child node (\`-1\` if none). Head is at index 0.

Return the flattened list of node values.

### Examples

**Example 1:**
\`\`\`
Input: nodes = [
  [1, 1, -1],
  [2, 2, -1],
  [3, 3, 3],
  [4, -1, -1],
  [7, 5, -1],
  [8, -1, -1]
]
Output: 1 2 3 7 8 4
Explanation:
Node 3 has child node 7 (index 4).
The order is 1 -> 2 -> 3 -> 7 -> 8 -> 4.
\`\`\`

**Example 2:**
\`\`\`
Input: nodes = [
  [1, -1, 1],
  [2, -1, 2],
  [3, -1, -1]
]
Output: 1 2 3
Explanation:
Each node has a child pointing to the next level.
\`\`\`

### Constraints

- \`1 <= nodes.length <= 1000\`
- \`-1000 <= val <= 1000\`
- The list structure forms a valid multilevel tree without cycles.`,
    solutionCode: `export function solve(nodes) {
  if (!nodes || nodes.length === 0) return [];
  const result = [];

  function dfs(idx) {
    if (idx === -1 || idx >= nodes.length) return;
    const [val, nextIdx, childIdx] = nodes[idx];
    result.push(val);
    if (childIdx !== -1) {
      dfs(childIdx);
    }
    if (nextIdx !== -1) {
      dfs(nextIdx);
    }
  }

  dfs(0);
  return result;
}`,
    baselineCode: `export function solve(nodes) {
  if (!nodes || nodes.length === 0) return [];
  const out = [];
  const stack = [0];
  const visited = new Set();

  while (stack.length > 0) {
    const cur = stack.pop();
    if (cur === -1 || cur >= nodes.length || visited.has(cur)) continue;
    visited.add(cur);
    const [val, nextIdx, childIdx] = nodes[cur];
    out.push(val);
    if (nextIdx !== -1) stack.push(nextIdx);
    if (childIdx !== -1) stack.push(childIdx);
  }

  return out;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { nodes: [[1, 1, -1], [2, 2, -1], [3, 3, 4], [4, -1, -1], [7, 5, -1], [8, -1, -1]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nodes: [[1, -1, 1], [2, -1, 2], [3, -1, -1]] } });
  cases.push({ category: "basic", description: "Single node", inputs: { nodes: [[10, -1, -1]] } });
  cases.push({ category: "basic", description: "Linear list", inputs: { nodes: [[1, 1, -1], [2, 2, -1], [3, -1, -1]] } });
  cases.push({ category: "basic", description: "Child on head", inputs: { nodes: [[1, 2, 1], [2, -1, -1], [3, -1, -1]] } });
  cases.push({ category: "basic", description: "Child on tail", inputs: { nodes: [[1, 1, -1], [2, -1, 2], [3, -1, -1]] } });
  cases.push({ category: "basic", description: "Branching tree", inputs: { nodes: [[1, -1, 1], [2, 3, 2], [3, -1, -1], [4, -1, -1]] } });
  cases.push({ category: "basic", description: "Deep single spine", inputs: { nodes: [[1, -1, 1], [2, -1, 2], [3, -1, 3], [4, -1, -1]] } });
  cases.push({ category: "basic", description: "Negatives", inputs: { nodes: [[-1, 1, -1], [-2, -1, 2], [-3, -1, -1]] } });
  cases.push({ category: "basic", description: "Five nodes mixed", inputs: { nodes: [[1, 1, -1], [2, -1, 2], [3, 3, -1], [4, 4, -1], [5, -1, -1]] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const len = i + 2;
    const nodes = Array.from({ length: len }, (_, idx) => [idx + 1, idx + 1 < len ? idx + 1 : -1, -1]);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { nodes } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const len = i + 2;
    const nodes = Array.from({ length: len }, (_, idx) => [(idx + 1) * 10, -1, idx + 1 < len ? idx + 1 : -1]);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nodes } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const nodes = [
      [1, 1, 3],
      [2, 2, -1],
      [3, -1, -1],
      [4, 4, -1],
      [5, -1, -1]
    ];
    nodes[0][0] = (i + 1) * 3;
    cases.push({ category: "random", description: "Random " + i, inputs: { nodes } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 100 + i * 10;
    const nodes = Array.from({ length: len }, (_, idx) => [idx, idx + 1 < len ? idx + 1 : -1, -1]);
    cases.push({ category: "large", description: "Large " + i, inputs: { nodes } });
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
