import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('problem-bank/problems');

const problems = [
  {
    slug: 'immediate-smaller-element',
    title: 'Next Smaller Element',
    difficulty: 'EASY',
    topics: ['Array', 'Stack', 'Monotonic Stack'],
    fnName: 'immediateSmaller',
    inputs: [{ type: 'list<int>', name: 'arr' }],
    output: { type: 'list<int>', name: 'result' },
    description: `Given an integer array \`arr\` of size \`n\`. For each element in the array, check whether the right adjacent element is smaller than the current element. If it is smaller, then that element will be the immediate smaller element. If not, then consider it as \`-1\`.

The last element in the array will always have \`-1\` since it has no right adjacent element.

### Examples

**Example 1:**
\`\`\`
Input: arr = [4, 2, 1, 5, 3]
Output: 2 1 -1 3 -1
Explanation:
- For 4, next is 2 (smaller), so 2.
- For 2, next is 1 (smaller), so 1.
- For 1, next is 5 (greater), so -1.
- For 5, next is 3 (smaller), so 3.
- For 3, no next element, so -1.
\`\`\`

**Example 2:**
\`\`\`
Input: arr = [5, 6, 2, 3, 1, 7]
Output: -1 2 -1 1 -1 -1
\`\`\`

### Constraints

- \`1 <= arr.length <= 10^5\`
- \`1 <= arr[i] <= 10^5\``,
    solutionCode: `export function solve(arr) {
  const n = arr.length;
  const ans = new Array(n);
  for (let i = 0; i < n - 1; i++) {
    ans[i] = arr[i + 1] < arr[i] ? arr[i + 1] : -1;
  }
  ans[n - 1] = -1;
  return ans;
}`,
    baselineCode: `export function solve(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (i + 1 < arr.length && arr[i + 1] < arr[i]) {
      result.push(arr[i + 1]);
    } else {
      result.push(-1);
    }
  }
  return result;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { arr: [4, 2, 1, 5, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { arr: [5, 6, 2, 3, 1, 7] } });
  cases.push({ category: "basic", description: "Single element", inputs: { arr: [10] } });
  cases.push({ category: "basic", description: "Two elements decreasing", inputs: { arr: [20, 10] } });
  cases.push({ category: "basic", description: "Two elements increasing", inputs: { arr: [10, 20] } });
  cases.push({ category: "basic", description: "All strictly decreasing", inputs: { arr: [5, 4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "All strictly increasing", inputs: { arr: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "All equal", inputs: { arr: [4, 4, 4, 4] } });
  cases.push({ category: "basic", description: "Alternating", inputs: { arr: [10, 5, 10, 5, 10] } });
  cases.push({ category: "basic", description: "Plateaus", inputs: { arr: [8, 8, 5, 5, 2] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { arr: Array.from({ length: i + 2 }, (_, idx) => idx + 1) } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { arr: Array(i + 3).fill(100) } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 25) + 5;
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 500) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { arr } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 1000 + i * 200;
    const arr = Array.from({ length: len }, (_, idx) => (idx * 31) % 1000 + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { arr } });
  }

  return cases;
}`
  },
  {
    slug: 'stock-span-problem',
    title: 'Stock Span Problem',
    difficulty: 'MEDIUM',
    topics: ['Array', 'Stack', 'Monotonic Stack'],
    fnName: 'calculateSpan',
    inputs: [{ type: 'list<int>', name: 'price' }],
    output: { type: 'list<int>', name: 'result' },
    description: `The stock span problem is a financial problem where we have a series of \`n\` daily price quotes for a stock and we need to calculate the span of stock’s price for all \`n\` days.

The span \`S_i\` of the stock’s price on a given day \`i\` is defined as the maximum number of consecutive days just before the given day, for which the price of the stock on the current day is less than or equal to its price on the given day.

### Examples

**Example 1:**
\`\`\`
Input: price = [100, 80, 60, 70, 60, 75, 85]
Output: 1 1 1 2 1 4 6
\`\`\`

**Example 2:**
\`\`\`
Input: price = [10, 4, 5, 90, 120, 80]
Output: 1 1 2 4 5 1
\`\`\`

### Constraints

- \`1 <= price.length <= 10^5\`
- \`1 <= price[i] <= 10^5\``,
    solutionCode: `export function solve(price) {
  const n = price.length;
  const span = new Array(n);
  const stack = []; // indices of days

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && price[stack[stack.length - 1]] <= price[i]) {
      stack.pop();
    }
    span[i] = stack.length === 0 ? i + 1 : i - stack[stack.length - 1];
    stack.push(i);
  }
  return span;
}`,
    baselineCode: `export function solve(price) {
  const res = [];
  for (let i = 0; i < price.length; i++) {
    let count = 1;
    let j = i - 1;
    while (j >= 0 && price[j] <= price[i]) {
      count++;
      j--;
    }
    res.push(count);
  }
  return res;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { price: [100, 80, 60, 70, 60, 75, 85] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { price: [10, 4, 5, 90, 120, 80] } });
  cases.push({ category: "basic", description: "Single", inputs: { price: [42] } });
  cases.push({ category: "basic", description: "Increasing", inputs: { price: [10, 20, 30, 40, 50] } });
  cases.push({ category: "basic", description: "Decreasing", inputs: { price: [50, 40, 30, 20, 10] } });
  cases.push({ category: "basic", description: "Equal", inputs: { price: [5, 5, 5, 5] } });
  cases.push({ category: "basic", description: "Valley", inputs: { price: [100, 50, 20, 50, 100] } });
  cases.push({ category: "basic", description: "Peak", inputs: { price: [20, 50, 100, 50, 20] } });
  cases.push({ category: "basic", description: "Zigzag", inputs: { price: [30, 10, 40, 20, 50] } });
  cases.push({ category: "basic", description: "Step up", inputs: { price: [10, 10, 20, 20, 30] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { price: Array.from({ length: i + 2 }, (_, idx) => (idx + 1) * 5) } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { price: Array(i + 3).fill(250) } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 25) + 5;
    const price = Array.from({ length: len }, () => Math.floor(Math.random() * 500) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { price } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 1000 + i * 200;
    const price = Array.from({ length: len }, (_, idx) => (idx * 23) % 1000 + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { price } });
  }

  return cases;
}`
  },
  {
    slug: 'maximal-rectangle',
    title: 'Maximal Rectangle',
    difficulty: 'HARD',
    topics: ['Array', 'Dynamic Programming', 'Stack', 'Matrix', 'Monotonic Stack'],
    fnName: 'maximalRectangle',
    inputs: [{ type: 'list<list<String>>', name: 'matrix' }],
    output: { type: 'int', name: 'result' },
    description: `Given a \`rows x cols\` binary \`matrix\` filled with \`'0'\`s and \`'1'\`s, find the largest rectangle containing only \`'1'\`s and return its area.

### Examples

**Example 1:**
\`\`\`
Input: matrix = [
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
Output: 6
Explanation: The maximal rectangle is shown in the middle with 6 '1's.
\`\`\`

**Example 2:**
\`\`\`
Input: matrix = [["0"]]
Output: 0
\`\`\`

**Example 3:**
\`\`\`
Input: matrix = [["1"]]
Output: 1
\`\`\`

### Constraints

- \`rows == matrix.length\`
- \`cols == matrix[i].length\`
- \`1 <= row, cols <= 200\`
- \`matrix[i][j]\` is \`'0'\` or \`'1'\`.`,
    solutionCode: `export function solve(matrix) {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;
  const rows = matrix.length;
  const cols = matrix[0].length;
  const heights = new Array(cols).fill(0);
  let maxArea = 0;

  function largestRectangleArea(heights) {
    const stack = [];
    let max = 0;
    const h = [...heights, 0];
    for (let i = 0; i < h.length; i++) {
      while (stack.length > 0 && h[stack[stack.length - 1]] > h[i]) {
        const height = h[stack.pop()];
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
        max = Math.max(max, height * width);
      }
      stack.push(i);
    }
    return max;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      heights[c] = matrix[r][c] === '1' ? heights[c] + 1 : 0;
    }
    maxArea = Math.max(maxArea, largestRectangleArea(heights));
  }

  return maxArea;
}`,
    baselineCode: `export function solve(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let maxArea = 0;

  for (let r1 = 0; r1 < rows; r1++) {
    for (let c1 = 0; c1 < cols; c1++) {
      for (let r2 = r1; r2 < rows; r2++) {
        for (let c2 = c1; c2 < cols; c2++) {
          let allOnes = true;
          for (let r = r1; r <= r2; r++) {
            for (let c = c1; c <= c2; c++) {
              if (matrix[r][c] !== '1') {
                allOnes = false;
                break;
              }
            }
            if (!allOnes) break;
          }
          if (allOnes) {
            maxArea = Math.max(maxArea, (r2 - r1 + 1) * (c2 - c1 + 1));
          }
        }
      }
    }
  }
  return maxArea;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { matrix: [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { matrix: [["0"]] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { matrix: [["1"]] } });
  cases.push({ category: "basic", description: "All ones 2x2", inputs: { matrix: [["1","1"],["1","1"]] } });
  cases.push({ category: "basic", description: "All zeros 2x2", inputs: { matrix: [["0","0"],["0","0"]] } });
  cases.push({ category: "basic", description: "Checkerboard", inputs: { matrix: [["1","0"],["0","1"]] } });
  cases.push({ category: "basic", description: "Single row", inputs: { matrix: [["1","1","0","1","1","1"]] } });
  cases.push({ category: "basic", description: "Single col", inputs: { matrix: [["1"],["1"],["0"],["1"]] } });
  cases.push({ category: "basic", description: "3x3 full", inputs: { matrix: [["1","1","1"],["1","1","1"],["1","1","1"]] } });
  cases.push({ category: "basic", description: "L shape", inputs: { matrix: [["1","0","0"],["1","0","0"],["1","1","1"]] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const len = i + 2;
    const matrix = [Array.from({ length: len }, (_, idx) => (idx % 2 === 0 ? "1" : "0"))];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { matrix } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const size = (i % 4) + 2;
    const matrix = Array.from({ length: size }, () => Array(size).fill("1"));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { matrix } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const r = (i % 6) + 2;
    const c = ((i + 1) % 6) + 2;
    const matrix = Array.from({ length: r }, () =>
      Array.from({ length: c }, () => (Math.random() < 0.6 ? "1" : "0"))
    );
    cases.push({ category: "random", description: "Random " + i, inputs: { matrix } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const r = 20 + i;
    const c = 20 + i;
    const matrix = Array.from({ length: r }, (_, rowIdx) =>
      Array.from({ length: c }, (_, colIdx) => ((rowIdx + colIdx) % 3 === 0 ? "0" : "1"))
    );
    cases.push({ category: "large", description: "Large " + i, inputs: { matrix } });
  }

  return cases;
}`
  },
  {
    slug: 'sum-of-subarray-minimums',
    title: 'Sum of Subarray Minimums',
    difficulty: 'MEDIUM',
    topics: ['Array', 'Dynamic Programming', 'Stack', 'Monotonic Stack'],
    fnName: 'sumSubarrayMins',
    inputs: [{ type: 'list<int>', name: 'arr' }],
    output: { type: 'int', name: 'result' },
    description: `Given an array of integers \`arr\`, find the sum of \`min(b)\`, where \`b\` ranges over every (contiguous) subarray of \`arr\`.

Since the answer may be large, return the answer modulo \`10^9 + 7\`.

### Examples

**Example 1:**
\`\`\`
Input: arr = [3, 1, 2, 4]
Output: 17
Explanation: 
Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4].
Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.
Sum is 17.
\`\`\`

**Example 2:**
\`\`\`
Input: arr = [11, 81, 94, 43, 3]
Output: 444
\`\`\`

### Constraints

- \`1 <= arr.length <= 3 * 10^4\`
- \`1 <= arr[i] <= 3 * 10^4\``,
    solutionCode: `export function solve(arr) {
  const MOD = 1000000007n;
  const n = arr.length;
  const ple = new Array(n); // previous less element distance
  const nle = new Array(n); // next less or equal distance

  let stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] > arr[i]) {
      stack.pop();
    }
    ple[i] = stack.length === 0 ? i + 1 : i - stack[stack.length - 1];
    stack.push(i);
  }

  stack = [];
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
      stack.pop();
    }
    nle[i] = stack.length === 0 ? n - i : stack[stack.length - 1] - i;
    stack.push(i);
  }

  let total = 0n;
  for (let i = 0; i < n; i++) {
    const count = BigInt(ple[i]) * BigInt(nle[i]);
    total = (total + count * BigInt(arr[i])) % MOD;
  }

  return Number(total);
}`,
    baselineCode: `export function solve(arr) {
  const MOD = 1000000007;
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    let curMin = arr[i];
    for (let j = i; j < arr.length; j++) {
      curMin = Math.min(curMin, arr[j]);
      total = (total + curMin) % MOD;
    }
  }
  return total;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { arr: [3, 1, 2, 4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { arr: [11, 81, 94, 43, 3] } });
  cases.push({ category: "basic", description: "Single element", inputs: { arr: [7] } });
  cases.push({ category: "basic", description: "Two elements asc", inputs: { arr: [1, 2] } });
  cases.push({ category: "basic", description: "Two elements desc", inputs: { arr: [2, 1] } });
  cases.push({ category: "basic", description: "All equal", inputs: { arr: [5, 5, 5, 5] } });
  cases.push({ category: "basic", description: "Monotone increasing", inputs: { arr: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "Monotone decreasing", inputs: { arr: [5, 4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "Peak shape", inputs: { arr: [1, 3, 5, 3, 1] } });
  cases.push({ category: "basic", description: "Valley shape", inputs: { arr: [5, 3, 1, 3, 5] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { arr: Array.from({ length: i + 2 }, (_, idx) => idx + 1) } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { arr: Array(i + 3).fill(42) } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 25) + 5;
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 500) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { arr } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 500 + i * 50;
    const arr = Array.from({ length: len }, (_, idx) => (idx * 17) % 500 + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { arr } });
  }

  return cases;
}`
  },
  {
    slug: '132-pattern',
    title: '132 Pattern',
    difficulty: 'MEDIUM',
    topics: ['Array', 'Binary Search', 'Stack', 'Monotonic Stack'],
    fnName: 'find132pattern',
    inputs: [{ type: 'list<int>', name: 'nums' }],
    output: { type: 'bool', name: 'result' },
    description: `Given an array of \`n\` integers \`nums\`, a 132 pattern is a subsequence of three integers \`nums[i]\`, \`nums[j]\` and \`nums[k]\` such that \`i < j < k\` and \`nums[i] < nums[k] < nums[j]\`.

Return \`true\` if there is a 132 pattern in \`nums\`, otherwise, return \`false\`.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 2, 3, 4]
Output: false
Explanation: There is no 132 pattern in the sequence.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [3, 1, 4, 2]
Output: true
Explanation: There is a 132 pattern in the sequence: [1, 4, 2].
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [-1, 3, 2, 0]
Output: true
Explanation: There are three 132 patterns in the sequence: [-1, 3, 2], [-1, 3, 0] and [-1, 2, 0].
\`\`\`

### Constraints

- \`n == nums.length\`
- \`1 <= n <= 2 * 10^5\`
- \`-10^9 <= nums[i] <= 10^9\``,
    solutionCode: `export function solve(nums) {
  let s3 = -Infinity;
  const stack = [];

  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] < s3) return true;
    while (stack.length > 0 && stack[stack.length - 1] < nums[i]) {
      s3 = stack.pop();
    }
    stack.push(nums[i]);
  }
  return false;
}`,
    baselineCode: `export function solve(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] < nums[j]) {
        for (let k = j + 1; k < nums.length; k++) {
          if (nums[i] < nums[k] && nums[k] < nums[j]) {
            return true;
          }
        }
      }
    }
  }
  return false;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 3, 4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [3, 1, 4, 2] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [-1, 3, 2, 0] } });
  cases.push({ category: "basic", description: "Single", inputs: { nums: [5] } });
  cases.push({ category: "basic", description: "Two elements", inputs: { nums: [1, 2] } });
  cases.push({ category: "basic", description: "Decreasing", inputs: { nums: [4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "All equal", inputs: { nums: [2, 2, 2, 2] } });
  cases.push({ category: "basic", description: "Exact 132", inputs: { nums: [1, 3, 2] } });
  cases.push({ category: "basic", description: "Long false", inputs: { nums: [10, 20, 30, 40, 50, 60] } });
  cases.push({ category: "basic", description: "Valley then 132", inputs: { nums: [5, 1, 4, 2] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const hasPattern = i % 2 === 0;
    const nums = hasPattern ? [1, 4, 2, ...(Array(i).fill(0))] : Array.from({ length: i + 3 }, (_, idx) => idx);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { nums } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const nums = Array(i + 4).fill(100);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nums } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 4;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50) - 25);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 1000 + i * 100;
    const nums = Array.from({ length: len }, (_, idx) => idx);
    nums[len - 2] = len + 10;
    nums[len - 1] = len + 5;
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}`
  },
  {
    slug: 'number-of-recent-calls',
    title: 'Number of Recent Calls',
    difficulty: 'EASY',
    topics: ['Design', 'Queue', 'Data Stream'],
    fnName: 'recentCounterOperations',
    inputs: [{ type: 'list<int>', name: 'inputs' }],
    output: { type: 'list<int>', name: 'result' },
    description: `You have a \`RecentCounter\` class which counts the number of recent requests within a certain time frame.

Implement the \`RecentCounter\` operations:
- \`ping(t)\`: Adds a new request at time \`t\`, where \`t\` represents some time in milliseconds, and returns the number of requests that has happened in the past 3000 milliseconds (including the new request). Specifically, return the number of requests that have happened in the inclusive range \`[t - 3000, t]\`.

It is guaranteed that every call to \`ping\` uses a strictly larger value of \`t\` than the previous call.

### Examples

**Example 1:**
\`\`\`
Input: inputs = [1, 100, 3001, 3002]
Output: 1 2 3 3
Explanation:
- ping(1) -> returns 1
- ping(100) -> returns 2
- ping(3001) -> returns 3 (requests in [1, 3001] are 1, 100, 3001)
- ping(3002) -> returns 3 (requests in [2, 3002] are 100, 3001, 3002)
\`\`\`

### Constraints

- \`1 <= inputs.length <= 10^4\`
- \`1 <= t <= 10^9\`
- Each test case will call \`ping\` with strictly increasing values of \`t\`.`,
    solutionCode: `export function solve(inputs) {
  const q = [];
  const result = [];
  for (const t of inputs) {
    q.push(t);
    while (q.length > 0 && q[0] < t - 3000) {
      q.shift();
    }
    result.push(q.length);
  }
  return result;
}`,
    baselineCode: `export function solve(inputs) {
  const result = [];
  for (let i = 0; i < inputs.length; i++) {
    const t = inputs[i];
    let count = 0;
    for (let j = 0; j <= i; j++) {
      if (inputs[j] >= t - 3000) {
        count++;
      }
    }
    result.push(count);
  }
  return result;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { inputs: [1, 100, 3001, 3002] } });
  cases.push({ category: "basic", description: "Single", inputs: { inputs: [1000] } });
  cases.push({ category: "basic", description: "Within 3000", inputs: { inputs: [10, 20, 30, 40, 50] } });
  cases.push({ category: "basic", description: "Far apart", inputs: { inputs: [1000, 5000, 10000, 15000] } });
  cases.push({ category: "basic", description: "Two close", inputs: { inputs: [500, 600] } });
  cases.push({ category: "basic", description: "Two far", inputs: { inputs: [500, 4000] } });
  cases.push({ category: "basic", description: "Exact 3000 delta", inputs: { inputs: [1000, 4000, 7000] } });
  cases.push({ category: "basic", description: "Dense sequence", inputs: { inputs: [1, 2, 3, 4, 5, 6, 7] } });
  cases.push({ category: "basic", description: "Burst then silence", inputs: { inputs: [10, 20, 30, 4000] } });
  cases.push({ category: "basic", description: "Steady ramp", inputs: { inputs: [500, 1500, 2500, 3500, 4500] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const inputs = Array.from({ length: i + 1 }, (_, idx) => (idx + 1) * 100);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { inputs } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const inputs = Array.from({ length: 5 }, (_, idx) => (idx + 1) * 5000 + i);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { inputs } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 5;
    const inputs = [];
    let cur = 100;
    for (let j = 0; j < len; j++) {
      cur += Math.floor(Math.random() * 800) + 1;
      inputs.push(cur);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { inputs } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 500 + i * 50;
    const inputs = Array.from({ length: len }, (_, idx) => (idx + 1) * 20);
    cases.push({ category: "large", description: "Large " + i, inputs: { inputs } });
  }

  return cases;
}`
  },
  {
    slug: 'design-front-middle-back-queue',
    title: 'Design Front Middle Back Queue',
    difficulty: 'MEDIUM',
    topics: ['Array', 'Design', 'Queue'],
    fnName: 'frontMiddleBackQueueOperations',
    inputs: [
      { type: 'list<String>', name: 'operations' },
      { type: 'list<list<int>>', name: 'values' }
    ],
    output: { type: 'list<String>', name: 'result' },
    description: `Design a queue that supports push and pop operations in the front, middle, and back.

Implement the operations:
- \`pushFront(val)\`: Adds \`val\` to the front of the queue. Output: \`null\`.
- \`pushMiddle(val)\`: Adds \`val\` to the middle of the queue. If there are \`n\` elements, it is placed at index \`floor(n / 2)\`. Output: \`null\`.
- \`pushBack(val)\`: Adds \`val\` to the back of the queue. Output: \`null\`.
- \`popFront()\`: Removes and returns the front element, or \`-1\` if empty. Output: string representation.
- \`popMiddle()\`: Removes and returns the middle element. If there are \`n\` elements, removes the element at index \`floor((n - 1) / 2)\`. Returns \`-1\` if empty. Output: string representation.
- \`popBack()\`: Removes and returns the back element, or \`-1\` if empty. Output: string representation.

### Examples

**Example 1:**
\`\`\`
Input:
operations = ["pushFront", "pushBack", "pushMiddle", "pushMiddle", "popFront", "popMiddle", "popMiddle", "popBack", "popFront"]
values = [[1], [2], [3], [4], [], [], [], [], []]
Output: null null null null 1 3 4 2 -1
Explanation:
FrontMiddleBackQueue q = new FrontMiddleBackQueue();
q.pushFront(1);   // [1]
q.pushBack(2);    // [1, 2]
q.pushMiddle(3);  // [1, 3, 2]
q.pushMiddle(4);  // [1, 4, 3, 2]
q.popFront();     // return 1 -> [4, 3, 2]
q.popMiddle();    // return 3 -> [4, 2]
q.popMiddle();    // return 4 -> [2]
q.popBack();      // return 2 -> []
q.popFront();     // return -1 -> [] (empty)
\`\`\`

### Constraints

- \`1 <= operations.length <= 1000\`
- \`1 <= val <= 1000\`
- At most 1000 calls will be made to the functions.`,
    solutionCode: `export function solve(operations, values) {
  const q = [];
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "pushFront") {
      q.unshift(values[i][0]);
      result.push("null");
    } else if (op === "pushMiddle") {
      const mid = Math.floor(q.length / 2);
      q.splice(mid, 0, values[i][0]);
      result.push("null");
    } else if (op === "pushBack") {
      q.push(values[i][0]);
      result.push("null");
    } else if (op === "popFront") {
      if (q.length === 0) {
        result.push("-1");
      } else {
        result.push(String(q.shift()));
      }
    } else if (op === "popMiddle") {
      if (q.length === 0) {
        result.push("-1");
      } else {
        const mid = Math.floor((q.length - 1) / 2);
        const val = q.splice(mid, 1)[0];
        result.push(String(val));
      }
    } else if (op === "popBack") {
      if (q.length === 0) {
        result.push("-1");
      } else {
        result.push(String(q.pop()));
      }
    }
  }

  return result;
}`,
    baselineCode: `export function solve(operations, values) {
  const list = [];
  const out = [];
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "pushFront") {
      list.unshift(values[i][0]);
      out.push("null");
    } else if (op === "pushMiddle") {
      const m = Math.floor(list.length / 2);
      list.splice(m, 0, values[i][0]);
      out.push("null");
    } else if (op === "pushBack") {
      list.push(values[i][0]);
      out.push("null");
    } else if (op === "popFront") {
      out.push(list.length === 0 ? "-1" : String(list.shift()));
    } else if (op === "popMiddle") {
      if (list.length === 0) {
        out.push("-1");
      } else {
        const m = Math.floor((list.length - 1) / 2);
        out.push(String(list.splice(m, 1)[0]));
      }
    } else if (op === "popBack") {
      out.push(list.length === 0 ? "-1" : String(list.pop()));
    }
  }
  return out;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { operations: ["pushFront", "pushBack", "pushMiddle", "pushMiddle", "popFront", "popMiddle", "popMiddle", "popBack", "popFront"], values: [[1], [2], [3], [4], [], [], [], [], []] } });
  cases.push({ category: "basic", description: "Pop empty", inputs: { operations: ["popFront", "popMiddle", "popBack"], values: [[], [], []] } });
  cases.push({ category: "basic", description: "Single push pop", inputs: { operations: ["pushMiddle", "popMiddle"], values: [[99], []] } });
  cases.push({ category: "basic", description: "Push fronts", inputs: { operations: ["pushFront", "pushFront", "popBack", "popBack"], values: [[1], [2], [], []] } });
  cases.push({ category: "basic", description: "Push backs", inputs: { operations: ["pushBack", "pushBack", "popFront", "popFront"], values: [[1], [2], [], []] } });
  cases.push({ category: "basic", description: "Alternating push pop", inputs: { operations: ["pushFront", "popFront", "pushBack", "popBack"], values: [[10], [], [20], []] } });
  cases.push({ category: "basic", description: "Middle push even odd", inputs: { operations: ["pushBack", "pushBack", "pushMiddle", "popMiddle"], values: [[1], [3], [2], []] } });
  cases.push({ category: "basic", description: "Repeated middle pops", inputs: { operations: ["pushBack", "pushBack", "pushBack", "popMiddle", "popMiddle", "popMiddle"], values: [[1], [2], [3], [], [], []] } });
  cases.push({ category: "basic", description: "Mix all push types", inputs: { operations: ["pushFront", "pushMiddle", "pushBack", "popFront", "popBack"], values: [[5], [10], [15], [], []] } });
  cases.push({ category: "basic", description: "Empty check at end", inputs: { operations: ["pushFront", "popMiddle", "popFront"], values: [[7], [], []] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const ops = ["pushMiddle", "pushMiddle", "popMiddle", "popMiddle"];
    const vals = [[i + 1], [i + 2], [], []];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { operations: ops, values: vals } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const ops = ["popFront", "popMiddle", "popBack"];
    const vals = [[], [], []];
    cases.push({ category: "corner", description: "Corner " + i, inputs: { operations: ops, values: vals } });
  }

  // Random (25)
  const opsList = ["pushFront", "pushMiddle", "pushBack", "popFront", "popMiddle", "popBack"];
  for (let i = 0; i < 25; i++) {
    const ops = [];
    const vals = [];
    for (let step = 0; step < 20; step++) {
      const op = opsList[Math.floor(Math.random() * opsList.length)];
      ops.push(op);
      vals.push(op.startsWith("push") ? [Math.floor(Math.random() * 100) + 1] : []);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { operations: ops, values: vals } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const ops = [];
    const vals = [];
    for (let k = 0; k < 100; k++) {
      ops.push(k % 2 === 0 ? "pushMiddle" : "popMiddle");
      vals.push(k % 2 === 0 ? [k] : []);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { operations: ops, values: vals } });
  }

  return cases;
}`
  },
  {
    slug: 'dota2-senate',
    title: 'Dota2 Senate',
    difficulty: 'MEDIUM',
    topics: ['String', 'Greedy', 'Queue'],
    fnName: 'predictPartyVictory',
    inputs: [{ type: 'String', name: 'senate' }],
    output: { type: 'String', name: 'result' },
    description: `In the world of Dota2, there are two parties: the Radiant and the Dire.

The Senate consists of senators from both parties. Now the Senate wants to decide on a change in the Dota2 game. The voting for this change is a round-based procedure. In each round, each senator can exercise one of the two rights:
1. Ban one senator's right: A senator can make another senator lose all his rights in this and all the following rounds.
2. Announce the victory: If this senator found the senators who still have rights to vote are all from the same party, he can announce the victory and decide on the change.

Given a string \`senate\` representing each senator's party belonging. The character \`'R'\` and \`'D'\` represent the Radiant party and the Dire party.

Predict which party will announce the victory: \`"Radiant"\` or \`"Dire"\`.

### Examples

**Example 1:**
\`\`\`
Input: senate = "RD"
Output: Radiant
Explanation: 
The first senator comes from Radiant and can ban the next senator's right in round 1. 
The second senator can't exercise any rights because his right has been banned. 
In round 2, the first senator can just announce the victory.
\`\`\`

**Example 2:**
\`\`\`
Input: senate = "RDD"
Output: Dire
Explanation: 
The first senator comes from Radiant and bans the first Dire senator's right.
The second senator comes from Dire and bans the Radiant senator's right.
In round 2, the only senator left is Dire, who announces victory.
\`\`\`

### Constraints

- \`n == senate.length\`
- \`1 <= n <= 10^4\`
- \`senate[i]\` is either \`'R'\` or \`'D'\`.`,
    solutionCode: `export function solve(senate) {
  const n = senate.length;
  const radiant = [];
  const dire = [];

  for (let i = 0; i < n; i++) {
    if (senate[i] === 'R') radiant.push(i);
    else dire.push(i);
  }

  while (radiant.length > 0 && dire.length > 0) {
    const r = radiant.shift();
    const d = dire.shift();
    if (r < d) {
      radiant.push(r + n);
    } else {
      dire.push(d + n);
    }
  }

  return radiant.length > 0 ? "Radiant" : "Dire";
}`,
    baselineCode: `export function solve(senate) {
  const arr = senate.split('');
  let rCount = arr.filter(c => c === 'R').length;
  let dCount = arr.length - rCount;
  let rBan = 0;
  let dBan = 0;

  let i = 0;
  while (rCount > 0 && dCount > 0) {
    if (arr[i] === 'R') {
      if (rBan > 0) {
        rBan--;
        arr[i] = 'X';
        rCount--;
      } else {
        dBan++;
      }
    } else if (arr[i] === 'D') {
      if (dBan > 0) {
        dBan--;
        arr[i] = 'X';
        dCount--;
      } else {
        rBan++;
      }
    }
    i = (i + 1) % arr.length;
  }
  return rCount > 0 ? "Radiant" : "Dire";
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { senate: "RD" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { senate: "RDD" } });
  cases.push({ category: "basic", description: "Single R", inputs: { senate: "R" } });
  cases.push({ category: "basic", description: "Single D", inputs: { senate: "D" } });
  cases.push({ category: "basic", description: "All R", inputs: { senate: "RRRR" } });
  cases.push({ category: "basic", description: "All D", inputs: { senate: "DDDD" } });
  cases.push({ category: "basic", description: "Alternating", inputs: { senate: "RDRD" } });
  cases.push({ category: "basic", description: "DRDR", inputs: { senate: "DRDR" } });
  cases.push({ category: "basic", description: "DDRRR", inputs: { senate: "DDRRR" } });
  cases.push({ category: "basic", description: "RRDDD", inputs: { senate: "RRDDD" } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const senate = "R".repeat(i + 1) + "D".repeat(i + 2);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { senate } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const senate = i % 2 === 0 ? "R".repeat(i + 2) : "D".repeat(i + 2);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { senate } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 4;
    const senate = Array.from({ length: len }, () => Math.random() < 0.5 ? "R" : "D").join('');
    cases.push({ category: "random", description: "Random " + i, inputs: { senate } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 500 + i * 50;
    const senate = Array.from({ length: len }, (_, idx) => idx % 2 === 0 ? "R" : "D").join('');
    cases.push({ category: "large", description: "Large " + i, inputs: { senate } });
  }

  return cases;
}`
  },
  {
    slug: 'open-the-lock',
    title: 'Open the Lock',
    difficulty: 'MEDIUM',
    topics: ['Breadth-First Search', 'Queue', 'Hash Table'],
    fnName: 'openLock',
    inputs: [
      { type: 'list<String>', name: 'deadends' },
      { type: 'String', name: 'target' }
    ],
    output: { type: 'int', name: 'result' },
    description: `You have a lock in front of you with 4 circular wheels. Each wheel has 10 slots: \`'0'\`, \`'1'\`, \`'2'\`, \`'3'\`, \`'4'\`, \`'5'\`, \`'6'\`, \`'7'\`, \`'8'\`, \`'9'\`. The wheels can rotate freely and wrap around.

The lock initially starts at \`'0000'\`.

You are given a list of \`deadends\` dead ends, meaning if the lock displays any of these codes, the wheels of the lock will stop turning and you will be unable to open it.

Given a \`target\` representing the value of the wheels that will unlock the lock, return the minimum total number of turns required to open the lock, or \`-1\` if it is impossible.

### Examples

**Example 1:**
\`\`\`
Input:
deadends = ["0201", "0101", "0102", "1212", "2002"]
target = "0202"
Output: 6
Explanation:
A sequence of valid moves would be "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202".
\`\`\`

**Example 2:**
\`\`\`
Input:
deadends = ["8888"]
target = "0009"
Output: 1
Explanation: We can turn the last wheel backward to get "0009".
\`\`\`

**Example 3:**
\`\`\`
Input:
deadends = ["8887", "8889", "8878", "8898", "8788", "8988", "7888", "9888"]
target = "8888"
Output: -1
Explanation: We cannot reach the target without getting stuck.
\`\`\`

### Constraints

- \`1 <= deadends.length <= 500\`
- \`deadends[i].length == 4\`
- \`target.length == 4\`
- \`target\` will not be in the list \`deadends\`.
- \`target\` and \`deadends[i]\` consist only of digits.`,
    solutionCode: `export function solve(deadends, target) {
  const dead = new Set(deadends);
  if (dead.has("0000")) return -1;
  if (target === "0000") return 0;

  const queue = [["0000", 0]];
  const visited = new Set(["0000"]);

  while (queue.length > 0) {
    const [cur, dist] = queue.shift();
    if (cur === target) return dist;

    for (let i = 0; i < 4; i++) {
      const d = Number(cur[i]);
      for (const diff of [-1, 1]) {
        const nextD = (d + diff + 10) % 10;
        const nextState = cur.slice(0, i) + nextD + cur.slice(i + 1);
        if (!dead.has(nextState) && !visited.has(nextState)) {
          visited.add(nextState);
          queue.push([nextState, dist + 1]);
        }
      }
    }
  }

  return -1;
}`,
    baselineCode: `export function solve(deadends, target) {
  const deadSet = new Set(deadends);
  if (deadSet.has("0000")) return -1;
  if (target === "0000") return 0;

  let q = ["0000"];
  const seen = new Set(["0000"]);
  let steps = 0;

  while (q.length > 0) {
    const nextQ = [];
    steps++;
    for (const node of q) {
      for (let i = 0; i < 4; i++) {
        const val = Number(node[i]);
        const up = (val + 1) % 10;
        const down = (val + 9) % 10;
        for (const cand of [up, down]) {
          const neighbor = node.slice(0, i) + cand + node.slice(i + 1);
          if (neighbor === target) return steps;
          if (!deadSet.has(neighbor) && !seen.has(neighbor)) {
            seen.add(neighbor);
            nextQ.push(neighbor);
          }
        }
      }
    }
    q = nextQ;
  }
  return -1;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { deadends: ["0201", "0101", "0102", "1212", "2002"], target: "0202" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { deadends: ["8888"], target: "0009" } });
  cases.push({ category: "basic", description: "Example 3 (Blocked)", inputs: { deadends: ["8887", "8889", "8878", "8898", "8788", "8988", "7888", "9888"], target: "8888" } });
  cases.push({ category: "basic", description: "Start blocked", inputs: { deadends: ["0000"], target: "8888" } });
  cases.push({ category: "basic", description: "Target at start", inputs: { deadends: ["1111"], target: "0000" } });
  cases.push({ category: "basic", description: "One step forward", inputs: { deadends: ["9999"], target: "1000" } });
  cases.push({ category: "basic", description: "One step backward", inputs: { deadends: ["1111"], target: "9000" } });
  cases.push({ category: "basic", description: "Two steps", inputs: { deadends: ["0001"], target: "0002" } });
  cases.push({ category: "basic", description: "Four wheel change", inputs: { deadends: ["0001", "0010"], target: "1111" } });
  cases.push({ category: "basic", description: "Wrap around all", inputs: { deadends: ["0001"], target: "9999" } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const deadends = ["000" + (i % 9 + 1)];
    const target = (i % 2 === 0) ? "00" + String(i % 5) + "0" : "0" + String(i % 5) + "00";
    cases.push({ category: "edge", description: "Edge " + i, inputs: { deadends, target } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const target = "0000";
    const deadends = ["1234", "5678"];
    cases.push({ category: "corner", description: "Corner " + i, inputs: { deadends, target } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const d1 = Math.floor(Math.random() * 9);
    const d2 = Math.floor(Math.random() * 9);
    const target = "00" + d1 + d2;
    const deadends = ["0101", "0011"];
    cases.push({ category: "random", description: "Random " + i, inputs: { deadends, target } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const target = "020" + (i % 10);
    const deadends = ["0100", "0101", "0102", "0103", "0104"];
    cases.push({ category: "large", description: "Large " + i, inputs: { deadends, target } });
  }

  return cases;
}`
  },
  {
    slug: 'furthest-building-you-can-reach',
    title: 'Furthest Building You Can Reach',
    difficulty: 'MEDIUM',
    topics: ['Array', 'Greedy', 'Heap'],
    fnName: 'furthestBuilding',
    inputs: [
      { type: 'list<int>', name: 'heights' },
      { type: 'int', name: 'bricks' },
      { type: 'int', name: 'ladders' }
    ],
    output: { type: 'int', name: 'result' },
    description: `You are given an integer array \`heights\` representing the heights of buildings, some \`bricks\`, and some \`ladders\`.

You start your journey from building 0 and move to the next building by possibly using bricks or ladders.

While moving from building \`i\` to building \`i+1\` (0-indexed):
- If the current building's height is greater than or equal to the next building's height, you do not need a ladder or bricks.
- If the current building's height is less than the next building's height, you can either use one ladder or \`(h[i+1] - h[i])\` bricks.

Return the furthest building index (0-indexed) you can reach if you use the given ladders and bricks optimally.

### Examples

**Example 1:**
\`\`\`
Input:
heights = [4, 2, 7, 6, 9, 14, 12]
bricks = 5
ladders = 1
Output: 4
Explanation: Starting at building 0, you can follow these steps:
- Go to building 1 without using ladders nor bricks since 4 >= 2.
- Go to building 2 using 5 bricks. You must use either bricks or ladders because 2 < 7.
- Go to building 3 without using ladders nor bricks since 7 >= 6.
- Go to building 4 using your only ladder. You must use either bricks or ladders because 6 < 9.
It is impossible to go beyond building 4 because you do not have any more bricks or ladders.
\`\`\`

**Example 2:**
\`\`\`
Input:
heights = [4, 12, 2, 7, 3, 18, 20, 3, 19]
bricks = 10
ladders = 2
Output: 7
\`\`\`

**Example 3:**
\`\`\`
Input:
heights = [14, 3, 19, 3]
bricks = 17
ladders = 0
Output: 3
\`\`\`

### Constraints

- \`1 <= heights.length <= 10^5\`
- \`1 <= heights[i] <= 10^6\`
- \`0 <= bricks <= 10^9\`
- \`0 <= ladders <= heights.length\``,
    solutionCode: `export function solve(heights, bricks, ladders) {
  // Simple binary search or min-heap simulation
  let low = 0;
  let high = heights.length - 1;
  let ans = 0;

  function canReach(target) {
    const climbs = [];
    for (let i = 0; i < target; i++) {
      const diff = heights[i + 1] - heights[i];
      if (diff > 0) climbs.push(diff);
    }
    climbs.sort((a, b) => b - a); // largest climbs first
    // Use ladders for the largest climbs
    let brickNeeded = 0;
    for (let i = ladders; i < climbs.length; i++) {
      brickNeeded += climbs[i];
      if (brickNeeded > bricks) return false;
    }
    return true;
  }

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (canReach(mid)) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return ans;
}`,
    baselineCode: `export function solve(heights, bricks, ladders) {
  for (let i = 0; i < heights.length - 1; i++) {
    // Check if can reach i + 1
    const climbs = [];
    for (let j = 0; j <= i; j++) {
      const diff = heights[j + 1] - heights[j];
      if (diff > 0) climbs.push(diff);
    }
    climbs.sort((a, b) => a - b);
    let needed = 0;
    for (let k = 0; k < climbs.length - ladders; k++) {
      needed += climbs[k];
    }
    if (needed > bricks) {
      return i;
    }
  }
  return heights.length - 1;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { heights: [4, 2, 7, 6, 9, 14, 12], bricks: 5, ladders: 1 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { heights: [4, 12, 2, 7, 3, 18, 20, 3, 19], bricks: 10, ladders: 2 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { heights: [14, 3, 19, 3], bricks: 17, ladders: 0 } });
  cases.push({ category: "basic", description: "Single building", inputs: { heights: [5], bricks: 0, ladders: 0 } });
  cases.push({ category: "basic", description: "Decreasing heights", inputs: { heights: [10, 8, 6, 4, 2], bricks: 0, ladders: 0 } });
  cases.push({ category: "basic", description: "Equal heights", inputs: { heights: [5, 5, 5, 5], bricks: 0, ladders: 0 } });
  cases.push({ category: "basic", description: "Ladders only", inputs: { heights: [1, 10, 20], bricks: 0, ladders: 2 } });
  cases.push({ category: "basic", description: "Bricks only", inputs: { heights: [1, 5, 10], bricks: 9, ladders: 0 } });
  cases.push({ category: "basic", description: "Blocked immediately", inputs: { heights: [1, 100], bricks: 10, ladders: 0 } });
  cases.push({ category: "basic", description: "Reach all with surplus", inputs: { heights: [2, 7, 9, 3, 1, 25], bricks: 100, ladders: 5 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const heights = Array.from({ length: i + 2 }, (_, idx) => (idx + 1) * 10);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { heights, bricks: 10, ladders: 1 } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const heights = Array(i + 3).fill(50);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { heights, bricks: 0, ladders: 0 } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 5;
    const heights = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
    const bricks = Math.floor(Math.random() * 50);
    const ladders = Math.floor(Math.random() * 3);
    cases.push({ category: "random", description: "Random " + i, inputs: { heights, bricks, ladders } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 300 + i * 20;
    const heights = Array.from({ length: len }, (_, idx) => (idx * 13) % 100 + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { heights, bricks: 500, ladders: 10 } });
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
