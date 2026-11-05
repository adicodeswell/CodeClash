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
  // 136. rotate-image
  await writeProblem("rotate-image", {
    problemMd: `# Rotate Image

You are given an \`n x n\` 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

Return the rotated matrix.

### Examples

**Example 1:**
\`\`\`
Input: matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
Output:
7 4 1
8 5 2
9 6 3
\`\`\`

**Example 2:**
\`\`\`
Input: matrix = [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]
Output:
15 13 2 5
14 3 4 1
12 6 8 9
16 7 10 11
\`\`\`

### Constraints

- \`n == matrix.length == matrix[i].length\`
- \`1 <= n <= 50\`
- \`-1000 <= matrix[i][j] <= 1000\`
`,
    structureMd: `Problem Name: "Rotate Image"
Difficulty: MEDIUM
Topics: Array, Math, Matrix
Function Name: rotate

Input Structure:
Input Field: list<list<int>> matrix

Output Structure:
Output Field: list<list<int>> result
`,
    solutionJs: `export function solve(matrix) {
  const n = matrix.length;
  const res = Array.from({ length: n }, () => new Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      res[j][n - 1 - i] = matrix[i][j];
    }
  }
  return res;
}
`,
    baselineJs: `export function solve(matrix) {
  const n = matrix.length;
  const mat = matrix.map((row) => [...row]);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const temp = mat[i][j];
      mat[i][j] = mat[j][i];
      mat[j][i] = temp;
    }
  }
  for (let i = 0; i < n; i++) {
    mat[i].reverse();
  }
  return mat;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "1x1", inputs: { matrix: [[1]] } });
  cases.push({ category: "basic", description: "2x2", inputs: { matrix: [[1, 2], [3, 4]] } });
  cases.push({ category: "basic", description: "3x3", inputs: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] } });
  cases.push({ category: "basic", description: "4x4", inputs: { matrix: [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]] } });
  for (let i = 4; i < 10; i++) {
    const n = 2 + (i % 3);
    const mat = Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => r * n + c + 1));
    cases.push({ category: "basic", description: "Basic " + i, inputs: { matrix: mat } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const val = (i % 2 === 0) ? -1000 : 1000;
    cases.push({ category: "edge", description: "Edge " + i, inputs: { matrix: [[val + i]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const n = 3;
    const mat = Array.from({ length: n }, () => Array.from({ length: n }, () => (i % 2 === 0 ? 0 : 1)));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { matrix: mat } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = 3 + (i % 5);
    const mat = Array.from({ length: n }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 200) - 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { matrix: mat } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = 15 + (i - 65);
    const mat = Array.from({ length: n }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 2000) - 1000));
    cases.push({ category: "large", description: "Large " + i, inputs: { matrix: mat } });
  }

  return cases;
}
`
  });

  // 137. spiral-matrix
  await writeProblem("spiral-matrix", {
    problemMd: `# Spiral Matrix

Given an \`m x n\` matrix, return all elements of the matrix in spiral order.

### Examples

**Example 1:**
\`\`\`
Input: matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
Output: 1 2 3 6 9 8 7 4 5
\`\`\`

**Example 2:**
\`\`\`
Input: matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
Output: 1 2 3 4 8 12 11 10 9 5 6 7
\`\`\`

### Constraints

- \`m == matrix.length\`
- \`n == matrix[i].length\`
- \`1 <= m, n <= 30\`
- \`-100 <= matrix[i][j] <= 100\`
`,
    structureMd: `Problem Name: "Spiral Matrix"
Difficulty: MEDIUM
Topics: Array, Matrix, Simulation
Function Name: spiralOrder

Input Structure:
Input Field: list<list<int>> matrix

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(matrix) {
  const res = [];
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return res;
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) res.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) res.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) res.push(matrix[r][left]);
      left++;
    }
  }
  return res;
}
`,
    baselineJs: `export function solve(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const visited = Array.from({ length: m }, () => new Array(n).fill(false));
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  let r = 0, c = 0, di = 0;
  const res = [];
  for (let i = 0; i < m * n; i++) {
    res.push(matrix[r][c]);
    visited[r][c] = true;
    const nr = r + dr[di];
    const nc = c + dc[di];
    if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
      r = nr;
      c = nc;
    } else {
      di = (di + 1) % 4;
      r = r + dr[di];
      c = c + dc[di];
    }
  }
  return res;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "3x3", inputs: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] } });
  cases.push({ category: "basic", description: "3x4", inputs: { matrix: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]] } });
  cases.push({ category: "basic", description: "1x1", inputs: { matrix: [[1]] } });
  cases.push({ category: "basic", description: "1x2", inputs: { matrix: [[1, 2]] } });
  cases.push({ category: "basic", description: "2x1", inputs: { matrix: [[1], [2]] } });
  cases.push({ category: "basic", description: "1x3", inputs: { matrix: [[1, 2, 3]] } });
  cases.push({ category: "basic", description: "3x1", inputs: { matrix: [[1], [2], [3]] } });
  cases.push({ category: "basic", description: "2x2", inputs: { matrix: [[1, 2], [3, 4]] } });
  cases.push({ category: "basic", description: "2x3", inputs: { matrix: [[1, 2, 3], [4, 5, 6]] } });
  cases.push({ category: "basic", description: "3x2", inputs: { matrix: [[1, 2], [3, 4], [5, 6]] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = (i - 9);
    if (i % 2 === 0) {
      cases.push({ category: "edge", description: "Row vector " + i, inputs: { matrix: [Array.from({ length: len }, (_, k) => k + 1)] } });
    } else {
      cases.push({ category: "edge", description: "Col vector " + i, inputs: { matrix: Array.from({ length: len }, (_, k) => [k + 1]) } });
    }
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const m = 2 + (i % 3);
    const n = 2 + ((i * 2) % 3);
    const mat = Array.from({ length: m }, () => Array.from({ length: n }, () => i * 3));
    cases.push({ category: "corner", description: "Uniform values " + i, inputs: { matrix: mat } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const m = 2 + (i % 5);
    const n = 2 + ((i * 2) % 5);
    const mat = Array.from({ length: m }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 200) - 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { matrix: mat } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const m = 12 + (i % 8);
    const n = 12 + ((i * 3) % 8);
    const mat = Array.from({ length: m }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 200) - 100));
    cases.push({ category: "large", description: "Large " + i, inputs: { matrix: mat } });
  }

  return cases;
}
`
  });

  // 138. set-matrix-zeroes
  await writeProblem("set-matrix-zeroes", {
    problemMd: `# Set Matrix Zeroes

Given an \`m x n\` integer matrix \`matrix\`, if an element is \`0\`, set its entire row and column to \`0\`'s.

Return the modified matrix.

### Examples

**Example 1:**
\`\`\`
Input: matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
Output:
1 0 1
0 0 0
1 0 1
\`\`\`

**Example 2:**
\`\`\`
Input: matrix = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]
Output:
0 0 0 0
0 4 5 0
0 3 1 0
\`\`\`

### Constraints

- \`m == matrix.length\`
- \`n == matrix[0].length\`
- \`1 <= m, n <= 50\`
- \`-2^31 <= matrix[i][j] <= 2^31 - 1\`
`,
    structureMd: `Problem Name: "Set Matrix Zeroes"
Difficulty: MEDIUM
Topics: Array, Hash Table, Matrix
Function Name: setZeroes

Input Structure:
Input Field: list<list<int>> matrix

Output Structure:
Output Field: list<list<int>> result
`,
    solutionJs: `export function solve(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const mat = matrix.map((r) => [...r]);
  let firstRowHasZero = false, firstColHasZero = false;

  for (let j = 0; j < n; j++) {
    if (mat[0][j] === 0) firstRowHasZero = true;
  }
  for (let i = 0; i < m; i++) {
    if (mat[i][0] === 0) firstColHasZero = true;
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (mat[i][j] === 0) {
        mat[i][0] = 0;
        mat[0][j] = 0;
      }
    }
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (mat[i][0] === 0 || mat[0][j] === 0) {
        mat[i][j] = 0;
      }
    }
  }

  if (firstRowHasZero) {
    for (let j = 0; j < n; j++) mat[0][j] = 0;
  }
  if (firstColHasZero) {
    for (let i = 0; i < m; i++) mat[i][0] = 0;
  }

  return mat;
}
`,
    baselineJs: `export function solve(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const mat = matrix.map((r) => [...r]);
  const zeroRows = new Set();
  const zeroCols = new Set();

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        zeroRows.add(i);
        zeroCols.add(j);
      }
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (zeroRows.has(i) || zeroCols.has(j)) {
        mat[i][j] = 0;
      }
    }
  }

  return mat;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { matrix: [[1, 1, 1], [1, 0, 1], [1, 1, 1]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { matrix: [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]] } });
  cases.push({ category: "basic", description: "Single 0", inputs: { matrix: [[0]] } });
  cases.push({ category: "basic", description: "Single 1", inputs: { matrix: [[1]] } });
  cases.push({ category: "basic", description: "2x2", inputs: { matrix: [[1, 0], [1, 1]] } });
  cases.push({ category: "basic", description: "All 0", inputs: { matrix: [[0, 0], [0, 0]] } });
  cases.push({ category: "basic", description: "No zeroes", inputs: { matrix: [[1, 2, 3], [4, 5, 6]] } });
  cases.push({ category: "basic", description: "Center zero", inputs: { matrix: [[1, 2], [3, 0], [5, 6]] } });
  cases.push({ category: "basic", description: "Top-left zero", inputs: { matrix: [[0, 2], [3, 4], [5, 6]] } });
  cases.push({ category: "basic", description: "Bottom-right zero", inputs: { matrix: [[1, 2], [3, 4], [5, 0]] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const row = Array.from({ length: 4 }, (_, idx) => (idx === i % 4 ? 0 : idx + 1));
    cases.push({ category: "edge", description: "Single row/col " + i, inputs: { matrix: [row] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const m = 3;
    const n = 3;
    const mat = Array.from({ length: m }, () => Array.from({ length: n }, () => 1));
    mat[i % m][(i * 2) % n] = 0;
    cases.push({ category: "corner", description: "One zero in 3x3 " + i, inputs: { matrix: mat } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const m = 3 + (i % 4);
    const n = 3 + ((i * 2) % 4);
    const mat = Array.from({ length: m }, () =>
      Array.from({ length: n }, () => (Math.random() < 0.25 ? 0 : Math.floor(Math.random() * 50) + 1))
    );
    cases.push({ category: "random", description: "Random " + i, inputs: { matrix: mat } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const m = 15 + (i % 6);
    const n = 15 + ((i * 2) % 6);
    const mat = Array.from({ length: m }, () =>
      Array.from({ length: n }, () => (Math.random() < 0.08 ? 0 : Math.floor(Math.random() * 100) + 1))
    );
    cases.push({ category: "large", description: "Large " + i, inputs: { matrix: mat } });
  }

  return cases;
}
`
  });

  // 139. happy-number
  await writeProblem("happy-number", {
    problemMd: `# Happy Number

Write an algorithm to determine if a number \`n\` is happy.

A **happy number** is a number defined by the following process:
- Starting with any positive integer, replace the number by the sum of the squares of its digits.
- Repeat the process until the number equals 1 (where it will stay), or it **loops endlessly in a cycle** which does not include 1.
- Those numbers for which this process **ends in 1** are happy.

Return \`true\` if \`n\` is a happy number, and \`false\` if not.

### Examples

**Example 1:**
\`\`\`
Input: n = 19
Output: 1
Explanation:
1^2 + 9^2 = 82
8^2 + 2^2 = 68
6^2 + 8^2 = 100
1^2 + 0^2 + 0^2 = 1
\`\`\`

**Example 2:**
\`\`\`
Input: n = 2
Output: 0
Explanation:
2 -> 4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4 (cycle)
\`\`\`

### Constraints

- \`1 <= n <= 2^31 - 1\`
`,
    structureMd: `Problem Name: "Happy Number"
Difficulty: EASY
Topics: Hash Table, Math, Two Pointers
Function Name: isHappy

Input Structure:
Input Field: int n

Output Structure:
Output Field: bool result
`,
    solutionJs: `export function solve(n) {
  function getNext(num) {
    let sum = 0;
    while (num > 0) {
      const d = num % 10;
      sum += d * d;
      num = Math.floor(num / 10);
    }
    return sum;
  }

  let slow = n;
  let fast = getNext(n);
  while (fast !== 1 && slow !== fast) {
    slow = getNext(slow);
    fast = getNext(getNext(fast));
  }
  return fast === 1;
}
`,
    baselineJs: `export function solve(n) {
  const seen = new Set();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    let s = 0;
    while (n > 0) {
      const d = n % 10;
      s += d * d;
      n = Math.floor(n / 10);
    }
    n = s;
  }
  return n === 1;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  const known = [1, 2, 3, 4, 7, 10, 13, 19, 23, 28];
  for (let i = 0; i < 10; i++) {
    cases.push({ category: "basic", description: "Known " + known[i], inputs: { n: known[i] } });
  }

  // Edge (10 - 24)
  const edgeVals = [5, 6, 8, 9, 11, 12, 14, 15, 16, 17, 18, 20, 21, 22, 25];
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + edgeVals[i - 10], inputs: { n: edgeVals[i - 10] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const val = Math.pow(10, (i % 6));
    cases.push({ category: "corner", description: "Power of 10 " + val, inputs: { n: val } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = Math.floor(Math.random() * 2000) + 1;
    cases.push({ category: "random", description: "Random " + i, inputs: { n } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = Math.floor(Math.random() * 1000000000) + 1;
    cases.push({ category: "large", description: "Large " + i, inputs: { n } });
  }

  return cases;
}
`
  });

  // 140. plus-one
  await writeProblem("plus-one", {
    problemMd: `# Plus One

You are given a **large integer** represented as an integer array \`digits\`, where each \`digits[i]\` is the \`i\`-th digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading \`0\`'s, except for the number 0 itself.

Increment the large integer by one and return the resulting array of digits.

### Examples

**Example 1:**
\`\`\`
Input: digits = [1, 2, 3]
Output: 1 2 4
Explanation: 123 + 1 = 124.
\`\`\`

**Example 2:**
\`\`\`
Input: digits = [4, 3, 2, 1]
Output: 4 3 2 2
Explanation: 4321 + 1 = 4322.
\`\`\`

**Example 3:**
\`\`\`
Input: digits = [9]
Output: 1 0
Explanation: 9 + 1 = 10.
\`\`\`

### Constraints

- \`1 <= digits.length <= 100\`
- \`0 <= digits[i] <= 9\`
- \`digits\` does not contain any leading \`0\`'s, except for the number 0 itself.
`,
    structureMd: `Problem Name: "Plus One"
Difficulty: EASY
Topics: Array, Math
Function Name: plusOne

Input Structure:
Input Field: list<int> digits

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(digits) {
  const res = [...digits];
  for (let i = res.length - 1; i >= 0; i--) {
    if (res[i] < 9) {
      res[i]++;
      return res;
    }
    res[i] = 0;
  }
  res.unshift(1);
  return res;
}
`,
    baselineJs: `export function solve(digits) {
  let carry = 1;
  const res = [];
  for (let i = digits.length - 1; i >= 0; i--) {
    const sum = digits[i] + carry;
    res.push(sum % 10);
    carry = Math.floor(sum / 10);
  }
  if (carry > 0) res.push(carry);
  return res.reverse();
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { digits: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { digits: [4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { digits: [9] } });
  cases.push({ category: "basic", description: "Zero", inputs: { digits: [0] } });
  cases.push({ category: "basic", description: "19", inputs: { digits: [1, 9] } });
  cases.push({ category: "basic", description: "99", inputs: { digits: [9, 9] } });
  cases.push({ category: "basic", description: "999", inputs: { digits: [9, 9, 9] } });
  cases.push({ category: "basic", description: "199", inputs: { digits: [1, 9, 9] } });
  cases.push({ category: "basic", description: "899", inputs: { digits: [8, 9, 9] } });
  cases.push({ category: "basic", description: "100", inputs: { digits: [1, 0, 0] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = i - 9;
    cases.push({ category: "edge", description: "All nines " + len, inputs: { digits: new Array(len).fill(9) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = (i - 24);
    const arr = [i % 9 + 1, ...new Array(len).fill(0)];
    cases.push({ category: "corner", description: "Leading digit with zeroes " + i, inputs: { digits: arr } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = 3 + (i % 15);
    const first = Math.floor(Math.random() * 9) + 1;
    const rest = Array.from({ length: len - 1 }, () => Math.floor(Math.random() * 10));
    cases.push({ category: "random", description: "Random " + i, inputs: { digits: [first, ...rest] } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = 40 + (i - 65) * 3;
    const first = Math.floor(Math.random() * 9) + 1;
    const rest = Array.from({ length: len - 1 }, () => Math.floor(Math.random() * 10));
    cases.push({ category: "large", description: "Large " + i, inputs: { digits: [first, ...rest] } });
  }

  return cases;
}
`
  });

  // 141. my-pow
  await writeProblem("my-pow", {
    problemMd: `# Pow(x, n)

Implement \`pow(x, n)\`, which calculates \`x\` raised to the power \`n\` (\`x^n\`).

Return the result as a double.

### Examples

**Example 1:**
\`\`\`
Input: x = 2.0, n = 10
Output: 1024.00000
\`\`\`

**Example 2:**
\`\`\`
Input: x = 2.1, n = 3
Output: 9.26100
\`\`\`

**Example 3:**
\`\`\`
Input: x = 2.0, n = -2
Output: 0.25000
Explanation: 2^(-2) = 1/(2^2) = 1/4 = 0.25
\`\`\`

### Constraints

- \`-100.0 < x < 100.0\`
- \`-1000 <= n <= 1000\`
- Either \`x\` is not zero or \`n > 0\`
- \`-10^4 <= x^n <= 10^4\`
`,
    structureMd: `Problem Name: "Pow(x, n)"
Difficulty: MEDIUM
Topics: Math, Recursion
Function Name: myPow

Input Structure:
Input Field: double x
Input Field: int n

Output Structure:
Output Field: double result
`,
    solutionJs: `export function solve(x, n) {
  if (n === 0) return 1.0;
  let p = n;
  if (p < 0) {
    x = 1 / x;
    p = -p;
  }
  let result = 1.0;
  let currentProduct = x;
  while (p > 0) {
    if (p % 2 === 1) {
      result *= currentProduct;
    }
    currentProduct *= currentProduct;
    p = Math.floor(p / 2);
  }
  return result;
}
`,
    baselineJs: `export function solve(x, n) {
  return Math.pow(x, n);
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "2^10", inputs: { x: 2.0, n: 10 } });
  cases.push({ category: "basic", description: "2.1^3", inputs: { x: 2.1, n: 3 } });
  cases.push({ category: "basic", description: "2^-2", inputs: { x: 2.0, n: -2 } });
  cases.push({ category: "basic", description: "1^0", inputs: { x: 1.0, n: 0 } });
  cases.push({ category: "basic", description: "1^100", inputs: { x: 1.0, n: 100 } });
  cases.push({ category: "basic", description: "(-1)^100", inputs: { x: -1.0, n: 100 } });
  cases.push({ category: "basic", description: "(-1)^101", inputs: { x: -1.0, n: 101 } });
  cases.push({ category: "basic", description: "0.5^4", inputs: { x: 0.5, n: 4 } });
  cases.push({ category: "basic", description: "3^4", inputs: { x: 3.0, n: 4 } });
  cases.push({ category: "basic", description: "(-2)^3", inputs: { x: -2.0, n: 3 } });

  // Edge (10 - 24)
  for (let i = 10; i < 21; i++) {
    const exp = i - 15;
    cases.push({ category: "edge", description: "1^exp " + exp, inputs: { x: 1.0, n: exp } });
  }
  cases.push({ category: "edge", description: "0.5^-3", inputs: { x: 0.5, n: -3 } });
  cases.push({ category: "edge", description: "4^-2", inputs: { x: 4.0, n: -2 } });
  cases.push({ category: "edge", description: "(-2)^-3", inputs: { x: -2.0, n: -3 } });
  cases.push({ category: "edge", description: "(-2)^-2", inputs: { x: -2.0, n: -2 } });

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "(-1)^i " + i, inputs: { x: -1.0, n: i } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const base = Number(((Math.random() * 4) - 2).toFixed(2));
    const cleanBase = Math.abs(base) < 0.2 ? (base < 0 ? -0.5 : 0.5) : base;
    const exp = (i % 9) - 4;
    cases.push({ category: "random", description: "Random " + i, inputs: { x: cleanBase, n: exp } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const base = 1.0 + Number((0.01 * ((i - 64) % 10)).toFixed(2));
    const exp = 5 + (i - 65) * 2;
    cases.push({ category: "large", description: "Large " + i, inputs: { x: base, n: exp } });
  }

  return cases;
}
`
  });

  // 142. multiply-strings
  await writeProblem("multiply-strings", {
    problemMd: `# Multiply Strings

Given two non-negative integers \`num1\` and \`num2\` represented as strings, return the product of \`num1\` and \`num2\`, also represented as a string.

You must not use any built-in BigInteger library or convert the inputs to integer directly.

### Examples

**Example 1:**
\`\`\`
Input: num1 = "2", num2 = "3"
Output: 6
\`\`\`

**Example 2:**
\`\`\`
Input: num1 = "123", num2 = "456"
Output: 56088
\`\`\`

### Constraints

- \`1 <= num1.length, num2.length <= 200\`
- \`num1\` and \`num2\` consist of digits only.
- Both \`num1\` and \`num2\` do not contain any leading zero, except the number \`"0"\` itself.
`,
    structureMd: `Problem Name: "Multiply Strings"
Difficulty: MEDIUM
Topics: Math, String, Simulation
Function Name: multiply

Input Structure:
Input Field: String num1
Input Field: String num2

Output Structure:
Output Field: String result
`,
    solutionJs: `export function solve(num1, num2) {
  if (num1 === "0" || num2 === "0") return "0";
  const m = num1.length, n = num2.length;
  const pos = new Array(m + n).fill(0);

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const mul = Number(num1[i]) * Number(num2[j]);
      const p1 = i + j, p2 = i + j + 1;
      const sum = mul + pos[p2];

      pos[p2] = sum % 10;
      pos[p1] += Math.floor(sum / 10);
    }
  }

  let start = 0;
  while (start < pos.length && pos[start] === 0) start++;
  return pos.slice(start).join("");
}
`,
    baselineJs: `export function solve(num1, num2) {
  return (BigInt(num1) * BigInt(num2)).toString();
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "2 * 3", inputs: { num1: "2", num2: "3" } });
  cases.push({ category: "basic", description: "123 * 456", inputs: { num1: "123", num2: "456" } });
  cases.push({ category: "basic", description: "0 * 0", inputs: { num1: "0", num2: "0" } });
  cases.push({ category: "basic", description: "0 * 123", inputs: { num1: "0", num2: "123" } });
  cases.push({ category: "basic", description: "456 * 0", inputs: { num1: "456", num2: "0" } });
  cases.push({ category: "basic", description: "9 * 9", inputs: { num1: "9", num2: "9" } });
  cases.push({ category: "basic", description: "99 * 99", inputs: { num1: "99", num2: "99" } });
  cases.push({ category: "basic", description: "100 * 100", inputs: { num1: "100", num2: "100" } });
  cases.push({ category: "basic", description: "12 * 34", inputs: { num1: "12", num2: "34" } });
  cases.push({ category: "basic", description: "999 * 999", inputs: { num1: "999", num2: "999" } });

  // Edge (10 - 24)
  for (let i = 10; i < 18; i++) {
    const len = i - 9;
    cases.push({ category: "edge", description: "Ones " + len, inputs: { num1: "1".repeat(len), num2: "1".repeat(len) } });
  }
  for (let i = 18; i < 25; i++) {
    const len = i - 17;
    cases.push({ category: "edge", description: "Nines " + len, inputs: { num1: "9".repeat(len), num2: "9".repeat(len) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = (i - 24);
    cases.push({ category: "corner", description: "Powers of 10 " + i, inputs: { num1: "1" + "0".repeat(len), num2: "1" + "0".repeat((i % 4) + 1) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const l1 = 2 + (i % 8);
    const l2 = 2 + ((i * 2) % 8);
    const n1 = String(Math.floor(Math.random() * 9) + 1) + Array.from({ length: l1 - 1 }, () => Math.floor(Math.random() * 10)).join("");
    const n2 = String(Math.floor(Math.random() * 9) + 1) + Array.from({ length: l2 - 1 }, () => Math.floor(Math.random() * 10)).join("");
    cases.push({ category: "random", description: "Random " + i, inputs: { num1: n1, num2: n2 } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const l1 = 20 + (i - 65) * 4;
    const l2 = 20 + (i - 65) * 4;
    const n1 = String(Math.floor(Math.random() * 9) + 1) + Array.from({ length: l1 - 1 }, () => Math.floor(Math.random() * 10)).join("");
    const n2 = String(Math.floor(Math.random() * 9) + 1) + Array.from({ length: l2 - 1 }, () => Math.floor(Math.random() * 10)).join("");
    cases.push({ category: "large", description: "Large " + i, inputs: { num1: n1, num2: n2 } });
  }

  return cases;
}
`
  });

  // 143. detect-squares
  await writeProblem("detect-squares", {
    problemMd: `# Detect Squares

You are given a stream of points on the X-Y plane. You need to implement a data structure that supports two operations:
- \`add([x, y])\`: Adds a new point \`[x, y]\` to the data structure. Duplicate points are allowed and should be treated as different points.
- \`count([x, y])\`: Counts the number of ways to choose three points from the data structure such that the three points and the query point form an **axis-aligned square** with **positive area**.

An axis-aligned square has edges that are parallel to the x-axis and y-axis.

Return a list of responses: \`"null"\` for each \`add\` operation, and the count as a string for each \`count\` operation.

### Examples

**Example 1:**
\`\`\`
Input:
operations = ["add", "add", "add", "count", "count", "add", "count"]
points = [[3, 10], [11, 2], [3, 2], [11, 10], [14, 8], [11, 2], [11, 10]]
Output:
null null null 1 0 null 2
Explanation:
- add([3, 10]): returns null
- add([11, 2]): returns null
- add([3, 2]): returns null
- count([11, 10]): 1 way formed by (3, 10), (11, 2), (3, 2), and (11, 10).
- count([14, 8]): 0 ways.
- add([11, 2]): duplicate point added.
- count([11, 10]): 2 ways formed since (11, 2) has multiplicity 2.
\`\`\`

### Constraints

- \`1 <= operations.length == points.length <= 1000\`
- \`points[i].length == 2\`
- \`0 <= x, y <= 1000\`
- At most \`1000\` calls in total will be made to \`add\` and \`count\`.
`,
    structureMd: `Problem Name: "Detect Squares"
Difficulty: MEDIUM
Topics: Hash Table, Geometry, Design
Function Name: detectSquaresOperations

Input Structure:
Input Field: list<String> operations
Input Field: list<list<int>> points

Output Structure:
Output Field: list<String> result
`,
    solutionJs: `export function solve(operations, points) {
  const pointCounts = new Map();
  const uniquePoints = [];
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const [x, y] = points[i];

    if (op === "add") {
      const key = \`\${x},\${y}\`;
      const prev = pointCounts.get(key) || 0;
      if (prev === 0) uniquePoints.push([x, y]);
      pointCounts.set(key, prev + 1);
      result.push("null");
    } else if (op === "count") {
      let count = 0;
      for (const [px, py] of uniquePoints) {
        if (Math.abs(px - x) !== Math.abs(py - y) || px === x || py === y) {
          continue;
        }
        const key1 = \`\${px},\${y}\`;
        const key2 = \`\${x},\${py}\`;
        const c1 = pointCounts.get(key1) || 0;
        const c2 = pointCounts.get(key2) || 0;
        const diagCount = pointCounts.get(\`\${px},\${py}\`) || 0;
        count += diagCount * c1 * c2;
      }
      result.push(String(count));
    }
  }

  return result;
}
`,
    baselineJs: `export function solve(operations, points) {
  const grid = {};
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const [x, y] = points[i];

    if (op === "add") {
      if (!grid[x]) grid[x] = {};
      grid[x][y] = (grid[x][y] || 0) + 1;
      result.push("null");
    } else if (op === "count") {
      let total = 0;
      for (const xStr in grid) {
        const px = Number(xStr);
        const dist = Math.abs(px - x);
        if (dist === 0) continue;

        for (const py of [y + dist, y - dist]) {
          if (grid[px] && grid[px][py] && grid[x] && grid[x][py] && grid[px][y]) {
            total += grid[px][py] * grid[x][py] * grid[px][y];
          }
        }
      }
      result.push(String(total));
    }
  }

  return result;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: {
      operations: ["add", "add", "add", "count", "count", "add", "count"],
      points: [[3, 10], [11, 2], [3, 2], [11, 10], [14, 8], [11, 2], [11, 10]]
    }
  });
  cases.push({
    category: "basic",
    description: "Single add count",
    inputs: {
      operations: ["add", "count"],
      points: [[0, 0], [0, 0]]
    }
  });
  cases.push({
    category: "basic",
    description: "Form square",
    inputs: {
      operations: ["add", "add", "add", "add", "count"],
      points: [[0, 0], [0, 2], [2, 0], [2, 2], [0, 0]]
    }
  });
  for (let i = 3; i < 10; i++) {
    const s = 1 + i;
    cases.push({
      category: "basic",
      description: "Basic square " + i,
      inputs: {
        operations: ["add", "add", "add", "count"],
        points: [[0, 0], [0, s], [s, 0], [s, s]]
      }
    });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({
      category: "edge",
      description: "Edge diagonal " + i,
      inputs: {
        operations: ["add", "count", "add", "count"],
        points: [[i, i], [i, i], [i + 1, i + 1], [i + 1, i + 1]]
      }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({
      category: "corner",
      description: "Corner multiple adds " + i,
      inputs: {
        operations: ["add", "add", "add", "add", "count", "count"],
        points: [[1, 1], [1, 3], [3, 1], [3, 3], [1, 1], [3, 3]]
      }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const ops = [];
    const pts = [];
    for (let j = 0; j < 25; j++) {
      const isAdd = Math.random() < 0.7;
      ops.push(isAdd ? "add" : "count");
      pts.push([Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)]);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { operations: ops, points: pts } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const ops = [];
    const pts = [];
    for (let j = 0; j < 80; j++) {
      const isAdd = Math.random() < 0.65;
      ops.push(isAdd ? "add" : "count");
      pts.push([Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)]);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { operations: ops, points: pts } });
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
