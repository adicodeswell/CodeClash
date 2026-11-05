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
  // 185. range-sum-query-immutable
  await writeProblem("range-sum-query-immutable", {
    problemMd: `# Range Sum Query - Immutable

Given an integer array \`nums\`, handle multiple queries of the following type:
- Calculate the sum of the elements of \`nums\` between indices \`left\` and \`right\` inclusive where \`left <= right\`.

Return an array of answers for each query in the order given.

### Examples

**Example 1:**
\`\`\`
Input: nums = [-2, 0, 3, -5, 2, -1], queries = [[0, 2], [2, 5], [0, 5]]
Output: 1 -1 -3
Explanation:
- sumRange(0, 2) -> (-2) + 0 + 3 = 1
- sumRange(2, 5) -> 3 + (-5) + 2 + (-1) = -1
- sumRange(0, 5) -> (-2) + 0 + 3 + (-5) + 2 + (-1) = -3
\`\`\`

### Constraints

- \`1 <= nums.length <= 10^4\`
- \`-10^5 <= nums[i] <= 10^5\`
- \`0 <= left <= right < nums.length\`
- \`1 <= queries.length <= 10^4\`
`,
    structureMd: `Problem Name: "Range Sum Query - Immutable"
Difficulty: EASY
Topics: Array, Design, Prefix Sum
Function Name: numArrayOperations

Input Structure:
Input Field: list<int> nums
Input Field: list<list<int>> queries

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(nums, queries) {
  const pref = new Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    pref[i + 1] = pref[i] + nums[i];
  }
  const res = [];
  for (const [l, r] of queries) {
    res.push(pref[r + 1] - pref[l]);
  }
  return res;
}
`,
    baselineJs: `export function solve(nums, queries) {
  const res = [];
  for (const [l, r] of queries) {
    let s = 0;
    for (let i = l; i <= r; i++) s += nums[i];
    res.push(s);
  }
  return res;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [-2, 0, 3, -5, 2, -1], queries: [[0, 2], [2, 5], [0, 5]] } });
  cases.push({ category: "basic", description: "Single", inputs: { nums: [5], queries: [[0, 0]] } });
  cases.push({ category: "basic", description: "Two elements", inputs: { nums: [1, 2], queries: [[0, 0], [0, 1], [1, 1]] } });
  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 3, 4, 5], queries: [[0, 2], [1, 4]] } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "All zero " + i, inputs: { nums: [0, 0, 0, 0], queries: [[0, 1], [0, 3]] } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Full range " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => idx + 1), queries: [[0, len - 1]] } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50) - 25);
    const queries = [];
    for (let q = 0; q < 5; q++) {
      const l = Math.floor(Math.random() * len);
      const r = l + Math.floor(Math.random() * (len - l));
      queries.push([l, r]);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, queries } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 200) - 100);
    const queries = [];
    for (let q = 0; q < 10; q++) {
      const l = Math.floor(Math.random() * len);
      const r = l + Math.floor(Math.random() * (len - l));
      queries.push([l, r]);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, queries } });
  }
  return cases;
}
`
  });

  // 186. range-sum-query-2d-immutable
  await writeProblem("range-sum-query-2d-immutable", {
    problemMd: `# Range Sum Query 2D - Immutable

Given a 2D matrix \`matrix\`, handle multiple queries of the following type:
- Calculate the sum of the elements of \`matrix\` inside the rectangle defined by its **upper left corner** \`(row1, col1)\` and **lower right corner** \`(row2, col2)\`.

Return an array of answers for each query in the order given.

### Examples

**Example 1:**
\`\`\`
Input:
matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
]
queries = [[2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
Output: 8 11 12
\`\`\`

### Constraints

- \`m == matrix.length\`
- \`n == matrix[i].length\`
- \`1 <= m, n <= 200\`
- \`-10^5 <= matrix[i][j] <= 10^5\`
- \`0 <= row1 <= row2 < m\`
- \`0 <= col1 <= col2 < n\`
- \`1 <= queries.length <= 10^4\`
`,
    structureMd: `Problem Name: "Range Sum Query 2D - Immutable"
Difficulty: MEDIUM
Topics: Array, Design, Matrix, Prefix Sum
Function Name: numMatrixOperations

Input Structure:
Input Field: list<list<int>> matrix
Input Field: list<list<int>> queries

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(matrix, queries) {
  const m = matrix.length, n = matrix[0].length;
  const pref = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      pref[r + 1][c + 1] = pref[r][c + 1] + pref[r + 1][c] - pref[r][c] + matrix[r][c];
    }
  }
  const res = [];
  for (const [r1, c1, r2, c2] of queries) {
    const sum = pref[r2 + 1][c2 + 1] - pref[r1][c2 + 1] - pref[r2 + 1][c1] + pref[r1][c1];
    res.push(sum);
  }
  return res;
}
`,
    baselineJs: `export function solve(matrix, queries) {
  const res = [];
  for (const [r1, c1, r2, c2] of queries) {
    let s = 0;
    for (let r = r1; r <= r2; r++) {
      for (let c = c1; c <= c2; c++) {
        s += matrix[r][c];
      }
    }
    res.push(s);
  }
  return res;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: {
      matrix: [
        [3, 0, 1, 4, 2],
        [5, 6, 3, 2, 1],
        [1, 2, 0, 1, 5],
        [4, 1, 0, 1, 7],
        [1, 0, 3, 0, 5]
      ],
      queries: [[2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
    }
  });
  cases.push({ category: "basic", description: "Single cell", inputs: { matrix: [[5]], queries: [[0, 0, 0, 0]] } });
  cases.push({ category: "basic", description: "2x2", inputs: { matrix: [[1, 2], [3, 4]], queries: [[0, 0, 1, 1], [0, 1, 1, 1]] } });
  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], queries: [[0, 0, 1, 1], [1, 1, 2, 2]] } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "All 1s " + i, inputs: { matrix: [[1, 1], [1, 1]], queries: [[0, 0, 1, 1]] } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Full matrix query " + i, inputs: { matrix: Array.from({ length: len }, (_, r) => Array.from({ length: len }, (_, c) => r + c)), queries: [[0, 0, len - 1, len - 1]] } });
  }
  for (let i = 40; i < 65; i++) {
    const m = 3 + (i % 4), n = 3 + ((i * 2) % 4);
    const matrix = Array.from({ length: m }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 20) - 10));
    const queries = [];
    for (let q = 0; q < 4; q++) {
      const r1 = Math.floor(Math.random() * m);
      const r2 = r1 + Math.floor(Math.random() * (m - r1));
      const c1 = Math.floor(Math.random() * n);
      const c2 = c1 + Math.floor(Math.random() * (n - c1));
      queries.push([r1, c1, r2, c2]);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { matrix, queries } });
  }
  for (let i = 65; i < 80; i++) {
    const m = 15 + (i % 5), n = 15 + (i % 5);
    const matrix = Array.from({ length: m }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 50) - 25));
    const queries = [];
    for (let q = 0; q < 8; q++) {
      const r1 = Math.floor(Math.random() * m);
      const r2 = r1 + Math.floor(Math.random() * (m - r1));
      const c1 = Math.floor(Math.random() * n);
      const c2 = c1 + Math.floor(Math.random() * (n - c1));
      queries.push([r1, c1, r2, c2]);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { matrix, queries } });
  }
  return cases;
}
`
  });

  // 187. matrix-block-sum
  await writeProblem("matrix-block-sum", {
    problemMd: `# Matrix Block Sum

Given an \`m x n\` matrix \`mat\` and an integer \`k\`, return a matrix \`answer\` where each \`answer[i][j]\` is the sum of all elements \`mat[r][c]\` for:
- \`i - k <= r <= i + k\`
- \`j - k <= c <= j + k\`
and \`(r, c)\` is a valid position in the matrix.

### Examples

**Example 1:**
\`\`\`
Input: mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]], k = 1
Output:
12 21 16
27 45 33
24 39 28
\`\`\`

**Example 2:**
\`\`\`
Input: mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]], k = 2
Output:
45 45 45
45 45 45
45 45 45
\`\`\`

### Constraints

- \`m == mat.length\`
- \`n == mat[i].length\`
- \`1 <= m, n, k <= 100\`
- \`1 <= mat[i][j] <= 100\`
`,
    structureMd: `Problem Name: "Matrix Block Sum"
Difficulty: MEDIUM
Topics: Array, Matrix, Prefix Sum
Function Name: matrixBlockSum

Input Structure:
Input Field: list<list<int>> mat
Input Field: int k

Output Structure:
Output Field: list<list<int>> result
`,
    solutionJs: `export function solve(mat, k) {
  const m = mat.length, n = mat[0].length;
  const pref = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      pref[r + 1][c + 1] = pref[r][c + 1] + pref[r + 1][c] - pref[r][c] + mat[r][c];
    }
  }

  const ans = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const r1 = Math.max(0, r - k);
      const c1 = Math.max(0, c - k);
      const r2 = Math.min(m - 1, r + k);
      const c2 = Math.min(n - 1, c + k);
      ans[r][c] = pref[r2 + 1][c2 + 1] - pref[r1][c2 + 1] - pref[r2 + 1][c1] + pref[r1][c1];
    }
  }
  return ans;
}
`,
    baselineJs: `export function solve(mat, k) {
  const m = mat.length, n = mat[0].length;
  const ans = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let s = 0;
      for (let r = Math.max(0, i - k); r <= Math.min(m - 1, i + k); r++) {
        for (let c = Math.max(0, j - k); c <= Math.min(n - 1, j + k); c++) {
          s += mat[r][c];
        }
      }
      ans[i][j] = s;
    }
  }
  return ans;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { mat: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], k: 1 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { mat: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], k: 2 } });
  cases.push({ category: "basic", description: "Single", inputs: { mat: [[5]], k: 1 } });
  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { mat: [[1, 2], [3, 4]], k: 1 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Large k " + i, inputs: { mat: [[2, 2], [2, 2]], k: 5 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Row vector " + i, inputs: { mat: [Array.from({ length: len }, (_, idx) => idx + 1)], k: 1 } });
  }
  for (let i = 40; i < 65; i++) {
    const m = 3 + (i % 4), n = 3 + ((i * 2) % 4);
    const mat = Array.from({ length: m }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 20) + 1));
    cases.push({ category: "random", description: "Random " + i, inputs: { mat, k: 1 + (i % 3) } });
  }
  for (let i = 65; i < 80; i++) {
    const m = 12 + (i % 5), n = 12 + (i % 5);
    const mat = Array.from({ length: m }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 50) + 1));
    cases.push({ category: "large", description: "Large " + i, inputs: { mat, k: 3 } });
  }
  return cases;
}
`
  });

  // 189. contiguous-array
  await writeProblem("contiguous-array", {
    problemMd: `# Contiguous Array

Given a binary array \`nums\`, return the maximum length of a contiguous subarray with an equal number of \`0\` and \`1\`.

### Examples

**Example 1:**
\`\`\`
Input: nums = [0, 1]
Output: 2
Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [0, 1, 0]
Output: 2
Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.
\`\`\`

### Constraints

- \`1 <= nums.length <= 10^5\`
- \`nums[i]\` is either \`0\` or \`1\`.
`,
    structureMd: `Problem Name: "Contiguous Array"
Difficulty: MEDIUM
Topics: Array, Hash Table, Prefix Sum
Function Name: findMaxLength

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums) {
  const map = new Map();
  map.set(0, -1);
  let count = 0, maxLen = 0;
  for (let i = 0; i < nums.length; i++) {
    count += (nums[i] === 1 ? 1 : -1);
    if (map.has(count)) {
      maxLen = Math.max(maxLen, i - map.get(count));
    } else {
      map.set(count, i);
    }
  }
  return maxLen;
}
`,
    baselineJs: `export function solve(nums) {
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    let zeros = 0, ones = 0;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] === 0) zeros++;
      else ones++;
      if (zeros === ones) max = Math.max(max, j - i + 1);
    }
  }
  return max;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [0, 1] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0, 1, 0] } });
  cases.push({ category: "basic", description: "All 0", inputs: { nums: [0, 0, 0] } });
  cases.push({ category: "basic", description: "All 1", inputs: { nums: [1, 1, 1] } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [0, 1, 0, 1, 1, 0] } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "Alternating " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => idx % 2) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Zeros then ones " + i, inputs: { nums: [...new Array(len).fill(0), ...new Array(len).fill(1)] } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => (Math.random() < 0.5 ? 0 : 1));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => (Math.random() < 0.5 ? 0 : 1));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }
  return cases;
}
`
  });

  // 190. continuous-subarray-sum
  await writeProblem("continuous-subarray-sum", {
    problemMd: `# Continuous Subarray Sum

Given an integer array \`nums\` and an integer \`k\`, return \`true\` if \`nums\` has a **good subarray** or \`false\` otherwise.

A **good subarray** is a subarray where:
- its length is **at least two**, and
- the sum of the elements of the subarray is a multiple of \`k\`.

Note that:
- A **subarray** is a contiguous part of the array.
- An integer \`x\` is a multiple of \`k\` if there exists an integer \`n\` such that \`x = n * k\`. \`0\` is **always** a multiple of \`k\`.

### Examples

**Example 1:**
\`\`\`
Input: nums = [23, 2, 4, 6, 7], k = 6
Output: 1
Explanation: [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [23, 2, 6, 4, 7], k = 6
Output: 1
Explanation: [23, 2, 6, 4, 7] is an array of size 5 whose elements sum up to 42, which is a multiple of 6.
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [23, 2, 6, 4, 7], k = 13
Output: 0
\`\`\`

### Constraints

- \`1 <= nums.length <= 10^5\`
- \`0 <= nums[i] <= 10^9\`
- \`0 <= sum(nums[i]) <= 2^31 - 1\`
- \`1 <= k <= 2^31 - 1\`
`,
    structureMd: `Problem Name: "Continuous Subarray Sum"
Difficulty: MEDIUM
Topics: Array, Hash Table, Prefix Sum
Function Name: checkSubarraySum

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: bool result
`,
    solutionJs: `export function solve(nums, k) {
  const map = new Map();
  map.set(0, -1);
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    const rem = sum % k;
    if (map.has(rem)) {
      if (i - map.get(rem) >= 2) return true;
    } else {
      map.set(rem, i);
    }
  }
  return false;
}
`,
    baselineJs: `export function solve(nums, k) {
  for (let i = 0; i < nums.length; i++) {
    let s = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      s += nums[j];
      if (s % k === 0) return true;
    }
  }
  return false;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [23, 2, 4, 6, 7], k: 6 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [23, 2, 6, 4, 7], k: 6 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [23, 2, 6, 4, 7], k: 13 } });
  cases.push({ category: "basic", description: "Two zeros", inputs: { nums: [0, 0], k: 5 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 3, 4, 5], k: 5 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Len 1 " + i, inputs: { nums: [i * 5], k: 5 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Multiples " + i, inputs: { nums: Array.from({ length: len }, () => 7), k: 7 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 20));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k: 6 } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 60 + (i - 65) * 15;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k: 17 } });
  }
  return cases;
}
`
  });

  // 191. subarray-sums-divisible-by-k
  await writeProblem("subarray-sums-divisible-by-k", {
    problemMd: `# Subarray Sums Divisible by K

Given an integer array \`nums\` and an integer \`k\`, return the number of non-empty subarrays that have a sum divisible by \`k\`.

A **subarray** is a contiguous part of an array.

### Examples

**Example 1:**
\`\`\`
Input: nums = [4, 5, 0, -2, -3, 1], k = 5
Output: 7
Explanation: There are 7 subarrays with a sum divisible by k = 5:
[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [5], k = 9
Output: 0
\`\`\`

### Constraints

- \`1 <= nums.length <= 3 * 10^4\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`2 <= k <= 10^4\`
`,
    structureMd: `Problem Name: "Subarray Sums Divisible by K"
Difficulty: MEDIUM
Topics: Array, Hash Table, Prefix Sum
Function Name: subarraysDivByK

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums, k) {
  const map = new Map();
  map.set(0, 1);
  let sum = 0, count = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    let rem = ((sum % k) + k) % k;
    const prev = map.get(rem) || 0;
    count += prev;
    map.set(rem, prev + 1);
  }
  return count;
}
`,
    baselineJs: `export function solve(nums, k) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let s = 0;
    for (let j = i; j < nums.length; j++) {
      s += nums[j];
      if (s % k === 0) count++;
    }
  }
  return count;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [4, 5, 0, -2, -3, 1], k: 5 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [5], k: 9 } });
  cases.push({ category: "basic", description: "All divisible", inputs: { nums: [5, 10, 15], k: 5 } });
  cases.push({ category: "basic", description: "Single match", inputs: { nums: [4], k: 4 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 3, 4, 5], k: 3 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Negatives " + i, inputs: { nums: [-i, i, -i, i], k: 4 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "All zero " + i, inputs: { nums: new Array(len).fill(0), k: 5 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 40) - 20);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k: 5 } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 100) - 50);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k: 7 } });
  }
  return cases;
}
`
  });

  // 192. make-sum-divisible-by-p
  await writeProblem("make-sum-divisible-by-p", {
    problemMd: `# Make Sum Divisible by P

Given an array of positive integers \`nums\`, remove the **smallest** subarray (possibly empty) such that the sum of the remaining elements is divisible by \`p\`. It is not allowed to remove the whole array.

Return the length of the smallest subarray that you need to remove, or \`-1\` if it's impossible.

### Examples

**Example 1:**
\`\`\`
Input: nums = [3, 1, 4, 2], p = 6
Output: 1
Explanation: The sum of the elements in nums is 10, which is not divisible by 6. We can remove the subarray [4], and the sum of the remaining elements is 6, which is divisible by 6.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [6, 3, 5, 2], p = 9
Output: 2
Explanation: We cannot remove a single element to get a sum divisible by 9. The best way is to remove the subarray [3, 5], leaving [6, 2] with sum 8, which is not divisible by 9. However, removing [5, 2] leaves [6, 3] with sum 9, so answer is 2.
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [1, 2, 3], p = 3
Output: 0
Explanation: Here the sum is 6, which is already divisible by 3. Thus we do not need to remove anything.
\`\`\`

### Constraints

- \`1 <= nums.length <= 10^5\`
- \`1 <= nums[i] <= 10^9\`
- \`1 <= p <= 10^9\`
`,
    structureMd: `Problem Name: "Make Sum Divisible by P"
Difficulty: MEDIUM
Topics: Array, Hash Table, Prefix Sum
Function Name: minSubarray

Input Structure:
Input Field: list<int> nums
Input Field: int p

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums, p) {
  let total = 0;
  for (const x of nums) total = (total + x) % p;
  if (total === 0) return 0;

  const target = total;
  const map = new Map();
  map.set(0, -1);
  let cur = 0, minLen = nums.length;

  for (let i = 0; i < nums.length; i++) {
    cur = (cur + nums[i]) % p;
    const need = (cur - target + p) % p;
    if (map.has(need)) {
      minLen = Math.min(minLen, i - map.get(need));
    }
    map.set(cur, i);
  }

  return minLen === nums.length ? -1 : minLen;
}
`,
    baselineJs: `export function solve(nums, p) {
  let total = 0;
  for (const x of nums) total += x;
  if (total % p === 0) return 0;

  let minLen = Infinity;
  for (let i = 0; i < nums.length; i++) {
    let subSum = 0;
    for (let j = i; j < nums.length; j++) {
      if (j - i + 1 === nums.length) continue;
      subSum += nums[j];
      if ((total - subSum) % p === 0) {
        minLen = Math.min(minLen, j - i + 1);
      }
    }
  }
  return minLen === Infinity ? -1 : minLen;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [3, 1, 4, 2], p: 6 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [6, 3, 5, 2], p: 9 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [1, 2, 3], p: 3 } });
  cases.push({ category: "basic", description: "Impossible", inputs: { nums: [1, 2], p: 7 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [2, 4, 6, 8, 10], p: 5 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single cannot remove whole " + i, inputs: { nums: [i], p: i + 1 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Already divisible " + i, inputs: { nums: Array.from({ length: len }, () => 4), p: 4 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 20) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, p: 7 } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 60 + (i - 65) * 15;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, p: 13 } });
  }
  return cases;
}
`
  });

  // 194. majority-element-ii
  await writeProblem("majority-element-ii", {
    problemMd: `# Majority Element II

Given an integer array of size \`n\`, find all elements that appear more than \`⌊n / 3⌋\` times.

Return the result sorted in ascending order.

### Examples

**Example 1:**
\`\`\`
Input: nums = [3, 2, 3]
Output: 3
Explanation: 3 appears 2 times, which is more than 3 / 3 = 1.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1]
Output: 1
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [1, 2]
Output: 1 2
\`\`\`

### Constraints

- \`1 <= nums.length <= 5 * 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
`,
    structureMd: `Problem Name: "Majority Element II"
Difficulty: MEDIUM
Topics: Array, Counting
Function Name: majorityElement

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(nums) {
  let c1 = 0, c2 = 0, n1 = null, n2 = null;
  for (const num of nums) {
    if (num === n1) c1++;
    else if (num === n2) c2++;
    else if (c1 === 0) { n1 = num; c1 = 1; }
    else if (c2 === 0) { n2 = num; c2 = 1; }
    else { c1--; c2--; }
  }
  const threshold = Math.floor(nums.length / 3);
  const res = [];
  let cnt1 = 0, cnt2 = 0;
  for (const num of nums) {
    if (num === n1) cnt1++;
    else if (num === n2) cnt2++;
  }
  if (cnt1 > threshold) res.push(n1);
  if (cnt2 > threshold) res.push(n2);
  return res.sort((a, b) => a - b);
}
`,
    baselineJs: `export function solve(nums) {
  const map = new Map();
  for (const x of nums) map.set(x, (map.get(x) || 0) + 1);
  const threshold = Math.floor(nums.length / 3);
  const res = [];
  for (const [k, v] of map) {
    if (v > threshold) res.push(k);
  }
  return res.sort((a, b) => a - b);
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [3, 2, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [1, 2] } });
  cases.push({ category: "basic", description: "Three elements", inputs: { nums: [1, 1, 2] } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 1, 1, 2, 2, 2, 3] } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "Single majority " + i, inputs: { nums: new Array(len).fill(i) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Two majorities " + i, inputs: { nums: [...new Array(len).fill(1), ...new Array(len).fill(2), 3] } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const mCount = Math.floor(len / 2);
    const nums = [...new Array(mCount).fill(99), ...Array.from({ length: len - mCount }, () => Math.floor(Math.random() * 5))];
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const mCount = Math.floor(len / 2);
    const nums = [...new Array(mCount).fill(42), ...Array.from({ length: len - mCount }, () => Math.floor(Math.random() * 10))];
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }
  return cases;
}
`
  });

  // 195. sort-colors
  await writeProblem("sort-colors", {
    problemMd: `# Sort Colors

Given an array \`nums\` with \`n\` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers \`0\`, \`1\`, and \`2\` to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

Return the sorted array.

### Examples

**Example 1:**
\`\`\`
Input: nums = [2, 0, 2, 1, 1, 0]
Output: 0 0 1 1 2 2
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [2, 0, 1]
Output: 0 1 2
\`\`\`

### Constraints

- \`n == nums.length\`
- \`1 <= n <= 300\`
- \`nums[i]\` is either \`0\`, \`1\`, or \`2\`.
`,
    structureMd: `Problem Name: "Sort Colors"
Difficulty: MEDIUM
Topics: Array, Two Pointers, Sorting
Function Name: sortColors

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(nums) {
  const arr = [...nums];
  let l = 0, m = 0, r = arr.length - 1;
  while (m <= r) {
    if (arr[m] === 0) {
      const temp = arr[l];
      arr[l] = arr[m];
      arr[m] = temp;
      l++;
      m++;
    } else if (arr[m] === 1) {
      m++;
    } else {
      const temp = arr[r];
      arr[r] = arr[m];
      arr[m] = temp;
      r--;
    }
  }
  return arr;
}
`,
    baselineJs: `export function solve(nums) {
  return [...nums].sort((a, b) => a - b);
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [2, 0, 2, 1, 1, 0] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [2, 0, 1] } });
  cases.push({ category: "basic", description: "Single 0", inputs: { nums: [0] } });
  cases.push({ category: "basic", description: "Single 1", inputs: { nums: [1] } });
  cases.push({ category: "basic", description: "Single 2", inputs: { nums: [2] } });
  for (let i = 5; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 0, 1, 2, 0] } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "All same " + i, inputs: { nums: new Array(len).fill(i % 3) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Two colors " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => idx % 2) } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 3));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 50 + (i - 65) * 5;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 3));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }
  return cases;
}
`
  });

  // 196. first-missing-positive
  await writeProblem("first-missing-positive", {
    problemMd: `# First Missing Positive

Given an unsorted integer array \`nums\`, return the smallest positive integer that is not present in \`nums\`.

You must implement an algorithm that runs in \`O(n)\` time and uses \`O(1)\` auxiliary space.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 2, 0]
Output: 3
Explanation: The numbers in the range [1, 2] are all in the array.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [3, 4, -1, 1]
Output: 2
Explanation: 1 is in the array, but 2 is missing.
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [7, 8, 9, 11, 12]
Output: 1
Explanation: The smallest positive integer 1 is missing.
\`\`\`

### Constraints

- \`1 <= nums.length <= 10^5\`
- \`-2^31 <= nums[i] <= 2^31 - 1\`
`,
    structureMd: `Problem Name: "First Missing Positive"
Difficulty: HARD
Topics: Array, Hash Table
Function Name: firstMissingPositive

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums) {
  const arr = [...nums];
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    while (arr[i] > 0 && arr[i] <= n && arr[arr[i] - 1] !== arr[i]) {
      const temp = arr[arr[i] - 1];
      arr[arr[i] - 1] = arr[i];
      arr[i] = temp;
    }
  }
  for (let i = 0; i < n; i++) {
    if (arr[i] !== i + 1) return i + 1;
  }
  return n + 1;
}
`,
    baselineJs: `export function solve(nums) {
  const set = new Set(nums);
  let i = 1;
  while (set.has(i)) i++;
  return i;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 0] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [3, 4, -1, 1] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [7, 8, 9, 11, 12] } });
  cases.push({ category: "basic", description: "Single 1", inputs: { nums: [1] } });
  cases.push({ category: "basic", description: "Single 2", inputs: { nums: [2] } });
  for (let i = 5; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 3, 4, 5, i + 2] } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Negatives " + i, inputs: { nums: [-5, -4, -3, -2, -1] } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Sequential 1 to len " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => idx + 1) } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 25) - 5);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 100) - 20);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }
  return cases;
}
`
  });

  // 197. next-permutation
  await writeProblem("next-permutation", {
    problemMd: `# Next Permutation

A **permutation** of an array of integers is an arrangement of its members into a sequence or linear order.

The **next permutation** of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the **next permutation** of that array is the permutation that follows it in the sorted container.

If such an arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).

Return the next permutation array.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 2, 3]
Output: 1 3 2
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [3, 2, 1]
Output: 1 2 3
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [1, 1, 5]
Output: 1 5 1
\`\`\`

### Constraints

- \`1 <= nums.length <= 100\`
- \`0 <= nums[i] <= 100\`
`,
    structureMd: `Problem Name: "Next Permutation"
Difficulty: MEDIUM
Topics: Array, Two Pointers
Function Name: nextPermutation

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(nums) {
  const arr = [...nums];
  let i = arr.length - 2;
  while (i >= 0 && arr[i] >= arr[i + 1]) i--;

  if (i >= 0) {
    let j = arr.length - 1;
    while (arr[j] <= arr[i]) j--;
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  let l = i + 1, r = arr.length - 1;
  while (l < r) {
    const temp = arr[l];
    arr[l] = arr[r];
    arr[r] = temp;
    l++;
    r--;
  }
  return arr;
}
`,
    baselineJs: `export function solve(nums) {
  const arr = [...nums];
  let i = arr.length - 2;
  while (i >= 0 && arr[i] >= arr[i + 1]) i--;
  if (i >= 0) {
    let j = arr.length - 1;
    while (arr[j] <= arr[i]) j--;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const rest = arr.slice(i + 1).reverse();
  for (let k = 0; k < rest.length; k++) {
    arr[i + 1 + k] = rest[k];
  }
  return arr;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [3, 2, 1] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [1, 1, 5] } });
  cases.push({ category: "basic", description: "Single", inputs: { nums: [1] } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 3, 2] } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "Descending " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => len - idx) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Ascending " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => idx + 1) } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 5 + (i % 8);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 10));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 30 + (i - 65) * 3;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 20));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }
  return cases;
}
`
  });

  // 198. next-greater-element-ii
  await writeProblem("next-greater-element-ii", {
    problemMd: `# Next Greater Element II

Given a circular integer array \`nums\` (i.e., the next element of \`nums[nums.length - 1]\` is \`nums[0]\`), return the **next greater number** for every element in \`nums\`.

The **next greater number** of a number \`x\` is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, return \`-1\` for this number.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 2, 1]
Output: 2 -1 2
Explanation: The first 1's next greater is 2; 
The number 2 can't find next greater number; 
The second 1's next greater number needs to search circularly, which is also 2.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1, 2, 3, 4, 3]
Output: 2 3 4 -1 4
\`\`\`

### Constraints

- \`1 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
`,
    structureMd: `Problem Name: "Next Greater Element II"
Difficulty: MEDIUM
Topics: Array, Stack, Monotonic Stack
Function Name: nextGreaterElements

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(nums) {
  const n = nums.length;
  const res = new Array(n).fill(-1);
  const stack = [];
  for (let i = 2 * n - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1] <= nums[i % n]) {
      stack.pop();
    }
    if (i < n) {
      if (stack.length > 0) res[i] = stack[stack.length - 1];
    }
    stack.push(nums[i % n]);
  }
  return res;
}
`,
    baselineJs: `export function solve(nums) {
  const n = nums.length;
  const res = [];
  for (let i = 0; i < n; i++) {
    let found = -1;
    for (let j = 1; j < n; j++) {
      const idx = (i + j) % n;
      if (nums[idx] > nums[i]) {
        found = nums[idx];
        break;
      }
    }
    res.push(found);
  }
  return res;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 1] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1, 2, 3, 4, 3] } });
  cases.push({ category: "basic", description: "Single", inputs: { nums: [10] } });
  cases.push({ category: "basic", description: "All equal", inputs: { nums: [5, 5, 5] } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 3, 2, 4] } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "Descending " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => len - idx) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Ascending " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => idx + 1) } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50) - 25);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 200) - 100);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }
  return cases;
}
`
  });

  // 199. candy
  await writeProblem("candy", {
    problemMd: `# Candy

There are \`n\` children standing in a line. Each child is assigned a rating value given in the integer array \`ratings\`.

You are giving candies to these children subjected to the following requirements:
- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.

Return the minimum number of candies you need to have to distribute the candies to the children.

### Examples

**Example 1:**
\`\`\`
Input: ratings = [1, 0, 2]
Output: 5
Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.
\`\`\`

**Example 2:**
\`\`\`
Input: ratings = [1, 2, 2]
Output: 4
Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
The third child gets 1 candy because it satisfies the above two conditions.
\`\`\`

### Constraints

- \`n == ratings.length\`
- \`1 <= n <= 2 * 10^4\`
- \`0 <= ratings[i] <= 2 * 10^4\`
`,
    structureMd: `Problem Name: "Candy"
Difficulty: HARD
Topics: Array, Greedy
Function Name: candy

Input Structure:
Input Field: list<int> ratings

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(ratings) {
  const n = ratings.length;
  const candies = new Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
  }
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);
  }
  let total = 0;
  for (const c of candies) total += c;
  return total;
}
`,
    baselineJs: `export function solve(ratings) {
  const n = ratings.length;
  const candies = new Array(n).fill(1);
  let changed = true;
  while (changed) {
    changed = false;
    for (let i = 0; i < n; i++) {
      if (i > 0 && ratings[i] > ratings[i - 1] && candies[i] <= candies[i - 1]) {
        candies[i] = candies[i - 1] + 1;
        changed = true;
      }
      if (i < n - 1 && ratings[i] > ratings[i + 1] && candies[i] <= candies[i + 1]) {
        candies[i] = candies[i + 1] + 1;
        changed = true;
      }
    }
  }
  return candies.reduce((a, b) => a + b, 0);
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { ratings: [1, 0, 2] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { ratings: [1, 2, 2] } });
  cases.push({ category: "basic", description: "Single", inputs: { ratings: [10] } });
  cases.push({ category: "basic", description: "All same", inputs: { ratings: [5, 5, 5] } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { ratings: [1, 3, 2, 2, 1] } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "Ascending " + i, inputs: { ratings: Array.from({ length: len }, (_, idx) => idx + 1) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Descending " + i, inputs: { ratings: Array.from({ length: len }, (_, idx) => len - idx) } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const ratings = Array.from({ length: len }, () => Math.floor(Math.random() * 20));
    cases.push({ category: "random", description: "Random " + i, inputs: { ratings } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 60 + (i - 65) * 15;
    const ratings = Array.from({ length: len }, () => Math.floor(Math.random() * 50));
    cases.push({ category: "large", description: "Large " + i, inputs: { ratings } });
  }
  return cases;
}
`
  });

  // 200. single-number-ii
  await writeProblem("single-number-ii", {
    problemMd: `# Single Number II

Given an integer array \`nums\` where every element appears **three times** except for one, which appears **exactly once**. Find the single element and return it.

You must implement a solution with a linear runtime complexity and use only constant extra space.

### Examples

**Example 1:**
\`\`\`
Input: nums = [2, 2, 3, 2]
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [0, 1, 0, 1, 0, 1, 99]
Output: 99
\`\`\`

### Constraints

- \`1 <= nums.length <= 3 * 10^4\`
- \`-2^31 <= nums[i] <= 2^31 - 1\`
- Each element in \`nums\` appears exactly three times except for one element which appears once.
`,
    structureMd: `Problem Name: "Single Number II"
Difficulty: MEDIUM
Topics: Array, Bit Manipulation
Function Name: singleNumber

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums) {
  let ones = 0, twos = 0;
  for (const num of nums) {
    ones = (ones ^ num) & ~twos;
    twos = (twos ^ num) & ~ones;
  }
  return ones;
}
`,
    baselineJs: `export function solve(nums) {
  const map = new Map();
  for (const x of nums) map.set(x, (map.get(x) || 0) + 1);
  for (const [k, v] of map) {
    if (v === 1) return k;
  }
  return 0;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [2, 2, 3, 2] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0, 1, 0, 1, 0, 1, 99] } });
  cases.push({ category: "basic", description: "Single", inputs: { nums: [42] } });
  cases.push({ category: "basic", description: "Negative single", inputs: { nums: [-4, -4, -4, -2] } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [i, i, i, 100] } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Zero single " + i, inputs: { nums: [i, i, i, 0] } });
  }
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nums: [10, 10, 10, -i] } });
  }
  for (let i = 40; i < 65; i++) {
    const triplets = 3 + (i % 5);
    const arr = [999];
    for (let t = 0; t < triplets; t++) {
      const val = (t + 1) * 7;
      arr.push(val, val, val);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { nums: arr } });
  }
  for (let i = 65; i < 80; i++) {
    const triplets = 20 + (i - 65) * 5;
    const arr = [12345];
    for (let t = 0; t < triplets; t++) {
      const val = (t + 1) * 11;
      arr.push(val, val, val);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { nums: arr } });
  }
  return cases;
}
`
  });

  // 201. remove-duplicate-letters
  await writeProblem("remove-duplicate-letters", {
    problemMd: `# Remove Duplicate Letters

Given a string \`s\`, remove duplicate letters so that every letter appears once and only once. You must make sure your result is **the smallest in lexicographical order** among all possible results.

### Examples

**Example 1:**
\`\`\`
Input: s = "bcabc"
Output: abc
\`\`\`

**Example 2:**
\`\`\`
Input: s = "cbacdcbc"
Output: acdb
\`\`\`

### Constraints

- \`1 <= s.length <= 10^4\`
- \`s\` consists of lowercase English letters.
`,
    structureMd: `Problem Name: "Remove Duplicate Letters"
Difficulty: MEDIUM
Topics: String, Stack, Greedy, Monotonic Stack
Function Name: removeDuplicateLetters

Input Structure:
Input Field: String s

Output Structure:
Output Field: String result
`,
    solutionJs: `export function solve(s) {
  const last = {};
  for (let i = 0; i < s.length; i++) last[s[i]] = i;
  const stack = [];
  const inStack = new Set();

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inStack.has(c)) continue;
    while (stack.length > 0 && stack[stack.length - 1] > c && last[stack[stack.length - 1]] > i) {
      inStack.delete(stack.pop());
    }
    stack.push(c);
    inStack.add(c);
  }

  return stack.join("");
}
`,
    baselineJs: `export function solve(s) {
  const last = {};
  for (let i = 0; i < s.length; i++) last[s[i]] = i;
  const stack = [];
  const seen = new Set();
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (!seen.has(ch)) {
      while (stack.length > 0 && stack[stack.length - 1] > ch && last[stack[stack.length - 1]] > i) {
        seen.delete(stack.pop());
      }
      stack.push(ch);
      seen.add(ch);
    }
  }
  return stack.join("");
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "bcabc" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "cbacdcbc" } });
  cases.push({ category: "basic", description: "Single", inputs: { s: "a" } });
  cases.push({ category: "basic", description: "Already sorted", inputs: { s: "abc" } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "cdadabcc" } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "All same " + i, inputs: { s: "x".repeat(len) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Reverse sorted " + i, inputs: { s: "edcba".repeat(2) } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const chars = "abcdefg";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    cases.push({ category: "random", description: "Random " + i, inputs: { s } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const chars = "abcdefghijklm";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    cases.push({ category: "large", description: "Large " + i, inputs: { s } });
  }
  return cases;
}
`
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
