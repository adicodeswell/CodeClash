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
  // 151. maximum-average-subarray-i
  await writeProblem("maximum-average-subarray-i", {
    problemMd: `# Maximum Average Subarray I

You are given an integer array \`nums\` consisting of \`n\` elements, and an integer \`k\`.

Find a contiguous subarray whose **length is equal to** \`k\` that has the maximum average value and return this value.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 12, -5, -6, 50, 3], k = 4
Output: 12.75000
Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [5], k = 1
Output: 5.00000
\`\`\`

### Constraints

- \`n == nums.length\`
- \`1 <= k <= n <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\`
`,
    structureMd: `Problem Name: "Maximum Average Subarray I"
Difficulty: EASY
Topics: Array, Sliding Window
Function Name: findMaxAverage

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: double result
`,
    solutionJs: `export function solve(nums, k) {
  let cur = 0;
  for (let i = 0; i < k; i++) cur += nums[i];
  let max = cur;
  for (let i = k; i < nums.length; i++) {
    cur += nums[i] - nums[i - k];
    if (cur > max) max = cur;
  }
  return max / k;
}
`,
    baselineJs: `export function solve(nums, k) {
  let maxSum = -Infinity;
  for (let i = 0; i <= nums.length - k; i++) {
    let s = 0;
    for (let j = i; j < i + k; j++) s += nums[j];
    if (s > maxSum) maxSum = s;
  }
  return maxSum / k;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 12, -5, -6, 50, 3], k: 4 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [5], k: 1 } });
  cases.push({ category: "basic", description: "All negative", inputs: { nums: [-1, -2, -3, -4], k: 2 } });
  cases.push({ category: "basic", description: "All positive", inputs: { nums: [10, 20, 30, 40], k: 2 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 3, 4, 5, 6], k: i - 3 } });
  }
  // Edge (15)
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "k = len " + i, inputs: { nums: new Array(len).fill(i * 2), k: len } });
  }
  // Corner (15)
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = 1 " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => idx * 5 - 20), k: 1 } });
  }
  // Random (25)
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 1 + (i % len);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 200) - 100);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k } });
  }
  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = 100 + (i - 65) * 50;
    const k = 20 + (i % 30);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 2000) - 1000);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k } });
  }
  return cases;
}
`
  });

  // 152. max-sum-subarray-of-size-k
  await writeProblem("max-sum-subarray-of-size-k", {
    problemMd: `# Maximum Sum Subarray of Size K

Given an array of integers \`arr\` and a number \`k\`, find the maximum sum of a subarray of size \`k\`.

### Examples

**Example 1:**
\`\`\`
Input: k = 3, arr = [2, 1, 5, 1, 3, 2]
Output: 9
Explanation: Subarray [5, 1, 3] gives maximum sum 9.
\`\`\`

**Example 2:**
\`\`\`
Input: k = 2, arr = [2, 3, 4, 1, 5]
Output: 7
Explanation: Subarray [3, 4] gives maximum sum 7.
\`\`\`

### Constraints

- \`1 <= k <= arr.length <= 10^5\`
- \`-10^5 <= arr[i] <= 10^5\`
`,
    structureMd: `Problem Name: "Maximum Sum Subarray of Size K"
Difficulty: EASY
Topics: Array, Sliding Window
Function Name: maximumSumSubarray

Input Structure:
Input Field: int k
Input Field: list<int> arr

Output Structure:
Output Field: long result
`,
    solutionJs: `export function solve(k, arr) {
  let cur = 0;
  for (let i = 0; i < k; i++) cur += arr[i];
  let max = cur;
  for (let i = k; i < arr.length; i++) {
    cur += arr[i] - arr[i - k];
    if (cur > max) max = cur;
  }
  return max;
}
`,
    baselineJs: `export function solve(k, arr) {
  let max = -Infinity;
  for (let i = 0; i <= arr.length - k; i++) {
    let s = 0;
    for (let j = i; j < i + k; j++) s += arr[j];
    if (s > max) max = s;
  }
  return max;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { k: 3, arr: [2, 1, 5, 1, 3, 2] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { k: 2, arr: [2, 3, 4, 1, 5] } });
  cases.push({ category: "basic", description: "Single", inputs: { k: 1, arr: [10] } });
  cases.push({ category: "basic", description: "Negatives", inputs: { k: 2, arr: [-5, -2, -8, -1] } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { k: 2, arr: [1, 2, 3, 4, 5, i] } });
  }
  // Edge (15)
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "k = len " + i, inputs: { k: len, arr: Array.from({ length: len }, (_, idx) => idx + 1) } });
  }
  // Corner (15)
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = 1 " + i, inputs: { k: 1, arr: Array.from({ length: len }, (_, idx) => idx * 10 - 50) } });
  }
  // Random (25)
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 1 + (i % len);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 200) - 100);
    cases.push({ category: "random", description: "Random " + i, inputs: { k, arr } });
  }
  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = 100 + (i - 65) * 40;
    const k = 10 + (i % 20);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 2000) - 1000);
    cases.push({ category: "large", description: "Large " + i, inputs: { k, arr } });
  }
  return cases;
}
`
  });

  // 153. number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold
  await writeProblem("number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold", {
    problemMd: `# Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold

Given an array of integers \`arr\` and two integers \`k\` and \`threshold\`, return the number of sub-arrays of size \`k\` and average greater than or equal to \`threshold\`.

### Examples

**Example 1:**
\`\`\`
Input: arr = [2, 2, 2, 2, 5, 5, 5, 8], k = 3, threshold = 4
Output: 3
Explanation: Sub-arrays [2, 5, 5], [5, 5, 5] and [5, 5, 8] have averages 4, 5, and 6 respectively.
\`\`\`

**Example 2:**
\`\`\`
Input: arr = [11, 13, 17, 23, 29, 31, 7, 5, 2, 3], k = 3, threshold = 5
Output: 6
\`\`\`

### Constraints

- \`1 <= arr.length <= 10^5\`
- \`1 <= k <= arr.length\`
- \`0 <= arr[i] <= 10^4\`
- \`0 <= threshold <= 10^4\`
`,
    structureMd: `Problem Name: "Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold"
Difficulty: MEDIUM
Topics: Array, Sliding Window
Function Name: numOfSubarrays

Input Structure:
Input Field: list<int> arr
Input Field: int k
Input Field: int threshold

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(arr, k, threshold) {
  const target = k * threshold;
  let cur = 0;
  for (let i = 0; i < k; i++) cur += arr[i];
  let count = cur >= target ? 1 : 0;
  for (let i = k; i < arr.length; i++) {
    cur += arr[i] - arr[i - k];
    if (cur >= target) count++;
  }
  return count;
}
`,
    baselineJs: `export function solve(arr, k, threshold) {
  let count = 0;
  for (let i = 0; i <= arr.length - k; i++) {
    let s = 0;
    for (let j = i; j < i + k; j++) s += arr[j];
    if (s >= k * threshold) count++;
  }
  return count;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { arr: [2, 2, 2, 2, 5, 5, 5, 8], k: 3, threshold: 4 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { arr: [11, 13, 17, 23, 29, 31, 7, 5, 2, 3], k: 3, threshold: 5 } });
  cases.push({ category: "basic", description: "Zero threshold", inputs: { arr: [1, 2, 3], k: 2, threshold: 0 } });
  cases.push({ category: "basic", description: "None meet", inputs: { arr: [1, 1, 1], k: 2, threshold: 5 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { arr: [2, 4, 6, 8, 10], k: 2, threshold: i } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "k = 1 " + i, inputs: { arr: [i, i + 1, i + 2], k: 1, threshold: i + 1 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = len " + i, inputs: { arr: new Array(len).fill(10), k: len, threshold: 10 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 1 + (i % len);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 50));
    cases.push({ category: "random", description: "Random " + i, inputs: { arr, k, threshold: 25 } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 100 + (i - 65) * 30;
    const k = 5 + (i % 15);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 100));
    cases.push({ category: "large", description: "Large " + i, inputs: { arr, k, threshold: 40 } });
  }
  return cases;
}
`
  });

  // 154. maximum-number-of-vowels-in-a-substring-of-given-length
  await writeProblem("maximum-number-of-vowels-in-a-substring-of-given-length", {
    problemMd: `# Maximum Number of Vowels in a Substring of Given Length

Given a string \`s\` and an integer \`k\`, return the maximum number of vowel letters in any substring of \`s\` with length \`k\`.

Vowel letters in English are \`'a'\`, \`'e'\`, \`'i'\`, \`'o'\`, and \`'u'\`.

### Examples

**Example 1:**
\`\`\`
Input: s = "abciiidef", k = 3
Output: 3
Explanation: The substring "iii" contains 3 vowel letters.
\`\`\`

**Example 2:**
\`\`\`
Input: s = "aeiou", k = 2
Output: 2
Explanation: Any substring of length 2 contains 2 vowels.
\`\`\`

**Example 3:**
\`\`\`
Input: s = "leetcode", k = 3
Output: 2
Explanation: "lee", "eet" and "ode" contain 2 vowels.
\`\`\`

### Constraints

- \`1 <= s.length <= 10^5\`
- \`s\` consists of lowercase English letters.
- \`1 <= k <= s.length\`
`,
    structureMd: `Problem Name: "Maximum Number of Vowels in a Substring of Given Length"
Difficulty: MEDIUM
Topics: String, Sliding Window
Function Name: maxVowels

Input Structure:
Input Field: String s
Input Field: int k

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(s, k) {
  const isVowel = (c) => c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u';
  let cur = 0;
  for (let i = 0; i < k; i++) if (isVowel(s[i])) cur++;
  let max = cur;
  for (let i = k; i < s.length; i++) {
    if (isVowel(s[i])) cur++;
    if (isVowel(s[i - k])) cur--;
    if (cur > max) max = cur;
  }
  return max;
}
`,
    baselineJs: `export function solve(s, k) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  let max = 0;
  for (let i = 0; i <= s.length - k; i++) {
    let count = 0;
    for (let j = i; j < i + k; j++) {
      if (vowels.has(s[j])) count++;
    }
    if (count > max) max = count;
  }
  return max;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "abciiidef", k: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "aeiou", k: 2 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "leetcode", k: 3 } });
  cases.push({ category: "basic", description: "No vowels", inputs: { s: "xyz", k: 2 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "abcdefghij", k: i - 2 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "All vowels " + i, inputs: { s: "a".repeat(len), k: Math.floor(len / 2) || 1 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "No vowels " + i, inputs: { s: "b".repeat(len), k: Math.floor(len / 2) || 1 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    cases.push({ category: "random", description: "Random " + i, inputs: { s, k: 3 + (i % 5) } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 100 + (i - 65) * 50;
    const chars = "aeioubcdfghjklmnpqrstvwxyz";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    cases.push({ category: "large", description: "Large " + i, inputs: { s, k: 10 + (i % 20) } });
  }
  return cases;
}
`
  });

  // 155. minimum-recolors-to-get-k-consecutive-black-blocks
  await writeProblem("minimum-recolors-to-get-k-consecutive-black-blocks", {
    problemMd: `# Minimum Recolors to Get K Consecutive Black Blocks

You are given a **0-indexed** string \`blocks\` of length \`n\`, where \`blocks[i]\` is either \`'W'\` or \`'B'\`, representing the color of the \`i\`-th block. The characters \`'W'\` and \`'B'\` denote the colors white and black, respectively.

You are also given an integer \`k\`, which is the desired number of **consecutive** black blocks.

In one operation, you can **recolor** a white block such that it becomes a black block.

Return the **minimum** number of operations needed such that there is at least **one** occurrence of \`k\` consecutive black blocks.

### Examples

**Example 1:**
\`\`\`
Input: blocks = "WBBWWBBWBW", k = 7
Output: 3
Explanation: One way to achieve 7 consecutive black blocks is to recolor blocks[0], blocks[3], and blocks[4].
\`\`\`

**Example 2:**
\`\`\`
Input: blocks = "WBWBBBW", k = 2
Output: 0
Explanation: "BBB" already contains 2 consecutive black blocks.
\`\`\`

### Constraints

- \`n == blocks.length\`
- \`1 <= n <= 100\`
- \`blocks[i]\` is either \`'W'\` or \`'B'\`.
- \`1 <= k <= n\`
`,
    structureMd: `Problem Name: "Minimum Recolors to Get K Consecutive Black Blocks"
Difficulty: EASY
Topics: String, Sliding Window
Function Name: minimumRecolors

Input Structure:
Input Field: String blocks
Input Field: int k

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(blocks, k) {
  let whiteCount = 0;
  for (let i = 0; i < k; i++) if (blocks[i] === 'W') whiteCount++;
  let min = whiteCount;
  for (let i = k; i < blocks.length; i++) {
    if (blocks[i] === 'W') whiteCount++;
    if (blocks[i - k] === 'W') whiteCount--;
    if (whiteCount < min) min = whiteCount;
  }
  return min;
}
`,
    baselineJs: `export function solve(blocks, k) {
  let min = Infinity;
  for (let i = 0; i <= blocks.length - k; i++) {
    let w = 0;
    for (let j = i; j < i + k; j++) if (blocks[j] === 'W') w++;
    if (w < min) min = w;
  }
  return min;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { blocks: "WBBWWBBWBW", k: 7 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { blocks: "WBWBBBW", k: 2 } });
  cases.push({ category: "basic", description: "All black", inputs: { blocks: "BBBB", k: 2 } });
  cases.push({ category: "basic", description: "All white", inputs: { blocks: "WWWW", k: 3 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { blocks: "BWBW".repeat(i), k: 3 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "k = 1 " + i, inputs: { blocks: "W".repeat(i - 8) + "B", k: 1 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = len " + i, inputs: { blocks: "B".repeat(len), k: len } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 20);
    const blocks = Array.from({ length: len }, () => (Math.random() < 0.5 ? "W" : "B")).join("");
    cases.push({ category: "random", description: "Random " + i, inputs: { blocks, k: 3 + (i % 7) } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 50 + (i - 65) * 3;
    const blocks = Array.from({ length: len }, () => (Math.random() < 0.4 ? "W" : "B")).join("");
    cases.push({ category: "large", description: "Large " + i, inputs: { blocks, k: 10 + (i % 15) } });
  }
  return cases;
}
`
  });

  // 156. first-negative-integer-in-every-window-of-size-k
  await writeProblem("first-negative-integer-in-every-window-of-size-k", {
    problemMd: `# First Negative Integer in Every Window of Size K

Given an array \`arr\` and a positive integer \`k\`, find the first negative integer for each and every contiguous window of size \`k\`. If a window does not contain a negative integer, then return \`0\` for that window.

### Examples

**Example 1:**
\`\`\`
Input: arr = [-8, 2, 3, -6, 10], k = 2
Output: -8 0 -6 -6
Explanation:
- Window [-8, 2]: first negative is -8
- Window [2, 3]: no negative, so 0
- Window [3, -6]: first negative is -6
- Window [-6, 10]: first negative is -6
\`\`\`

**Example 2:**
\`\`\`
Input: arr = [12, -1, -7, 8, -15, 30, 16, 28], k = 3
Output: -1 -1 -7 -15 -15 0
\`\`\`

### Constraints

- \`1 <= arr.length <= 10^5\`
- \`1 <= k <= arr.length\`
- \`-10^5 <= arr[i] <= 10^5\`
`,
    structureMd: `Problem Name: "First Negative Integer in Every Window of Size K"
Difficulty: EASY
Topics: Array, Queue, Sliding Window
Function Name: firstNegative

Input Structure:
Input Field: list<int> arr
Input Field: int k

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(arr, k) {
  const result = [];
  const q = [];
  for (let i = 0; i < k; i++) {
    if (arr[i] < 0) q.push(i);
  }
  result.push(q.length > 0 ? arr[q[0]] : 0);

  for (let i = k; i < arr.length; i++) {
    while (q.length > 0 && q[0] <= i - k) q.shift();
    if (arr[i] < 0) q.push(i);
    result.push(q.length > 0 ? arr[q[0]] : 0);
  }
  return result;
}
`,
    baselineJs: `export function solve(arr, k) {
  const result = [];
  for (let i = 0; i <= arr.length - k; i++) {
    let first = 0;
    for (let j = i; j < i + k; j++) {
      if (arr[j] < 0) {
        first = arr[j];
        break;
      }
    }
    result.push(first);
  }
  return result;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { arr: [-8, 2, 3, -6, 10], k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { arr: [12, -1, -7, 8, -15, 30, 16, 28], k: 3 } });
  cases.push({ category: "basic", description: "All positive", inputs: { arr: [1, 2, 3, 4], k: 2 } });
  cases.push({ category: "basic", description: "All negative", inputs: { arr: [-1, -2, -3, -4], k: 2 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { arr: [1, -2, 3, -4, 5, -6], k: (i % 4) + 1 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 7;
    cases.push({ category: "edge", description: "k = 1 " + i, inputs: { arr: Array.from({ length: len }, (_, idx) => (idx % 2 === 0 ? -idx : idx)), k: 1 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = len " + i, inputs: { arr: Array.from({ length: len }, () => -5), k: len } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 1 + (i % 5);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 50) - 25);
    cases.push({ category: "random", description: "Random " + i, inputs: { arr, k } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const k = 5 + (i % 15);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 200) - 100);
    cases.push({ category: "large", description: "Large " + i, inputs: { arr, k } });
  }
  return cases;
}
`
  });

  // 157. count-distinct-elements-in-every-window
  await writeProblem("count-distinct-elements-in-every-window", {
    problemMd: `# Count Distinct Elements in Every Window

Given an integer array \`arr\` and a number \`k\`, find the count of distinct elements in every window of size \`k\` in the array.

### Examples

**Example 1:**
\`\`\`
Input: arr = [1, 2, 1, 3, 4, 2, 3], k = 4
Output: 3 4 4 3
Explanation:
- Window [1, 2, 1, 3] has 3 distinct elements (1, 2, 3)
- Window [2, 1, 3, 4] has 4 distinct elements (1, 2, 3, 4)
- Window [1, 3, 4, 2] has 4 distinct elements (1, 2, 3, 4)
- Window [3, 4, 2, 3] has 3 distinct elements (2, 3, 4)
\`\`\`

**Example 2:**
\`\`\`
Input: arr = [4, 1, 1], k = 2
Output: 2 1
\`\`\`

### Constraints

- \`1 <= k <= arr.length <= 10^5\`
- \`1 <= arr[i] <= 10^5\`
`,
    structureMd: `Problem Name: "Count Distinct Elements in Every Window"
Difficulty: MEDIUM
Topics: Array, Hash Table, Sliding Window
Function Name: countDistinct

Input Structure:
Input Field: list<int> arr
Input Field: int k

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(arr, k) {
  const freq = new Map();
  const res = [];
  for (let i = 0; i < k; i++) {
    freq.set(arr[i], (freq.get(arr[i]) || 0) + 1);
  }
  res.push(freq.size);

  for (let i = k; i < arr.length; i++) {
    const left = arr[i - k];
    const c = freq.get(left);
    if (c === 1) freq.delete(left);
    else freq.set(left, c - 1);

    freq.set(arr[i], (freq.get(arr[i]) || 0) + 1);
    res.push(freq.size);
  }
  return res;
}
`,
    baselineJs: `export function solve(arr, k) {
  const res = [];
  for (let i = 0; i <= arr.length - k; i++) {
    const set = new Set();
    for (let j = i; j < i + k; j++) set.add(arr[j]);
    res.push(set.size);
  }
  return res;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { arr: [1, 2, 1, 3, 4, 2, 3], k: 4 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { arr: [4, 1, 1], k: 2 } });
  cases.push({ category: "basic", description: "All same", inputs: { arr: [5, 5, 5, 5], k: 2 } });
  cases.push({ category: "basic", description: "All distinct", inputs: { arr: [1, 2, 3, 4], k: 2 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { arr: [1, 2, 2, 3, 3, 4], k: (i % 4) + 1 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 7;
    cases.push({ category: "edge", description: "k = 1 " + i, inputs: { arr: Array.from({ length: len }, (_, idx) => idx + 1), k: 1 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = len " + i, inputs: { arr: Array.from({ length: len }, (_, idx) => idx % 3 + 1), k: len } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 1 + (i % 6);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 8) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { arr, k } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 100 + (i - 65) * 30;
    const k = 5 + (i % 20);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 20) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { arr, k } });
  }
  return cases;
}
`
  });

  // 158. maximum-sum-of-distinct-subarrays-with-length-k
  await writeProblem("maximum-sum-of-distinct-subarrays-with-length-k", {
    problemMd: `# Maximum Sum of Distinct Subarrays With Length K

You are given an integer array \`nums\` and an integer \`k\`. Find the maximum subarray sum of all the subarrays of \`nums\` that meet the following conditions:
- The length of the subarray is \`k\`, and
- All the elements of the subarray are **distinct**.

Return the maximum subarray sum of all the subarrays that meet the conditions. If no subarray meets the conditions, return \`0\`.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 5, 4, 2, 9, 9, 9], k = 3
Output: 15
Explanation: The subarrays of nums with length 3 are:
- [1, 5, 4]: distinct, sum = 10
- [5, 4, 2]: distinct, sum = 11
- [4, 2, 9]: distinct, sum = 15 (max)
- [2, 9, 9]: contains duplicate 9
- [9, 9, 9]: contains duplicate 9
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [4, 4, 4], k = 3
Output: 0
Explanation: No subarray of length 3 has distinct elements.
\`\`\`

### Constraints

- \`1 <= k <= nums.length <= 10^5\`
- \`1 <= nums[i] <= 10^5\`
`,
    structureMd: `Problem Name: "Maximum Sum of Distinct Subarrays With Length K"
Difficulty: MEDIUM
Topics: Array, Hash Table, Sliding Window
Function Name: maximumSubarraySum

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: long result
`,
    solutionJs: `export function solve(nums, k) {
  let sum = 0;
  let maxSum = 0;
  const count = new Map();

  for (let i = 0; i < k; i++) {
    sum += nums[i];
    count.set(nums[i], (count.get(nums[i]) || 0) + 1);
  }
  if (count.size === k) maxSum = sum;

  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    const leftCount = count.get(nums[i - k]);
    if (leftCount === 1) count.delete(nums[i - k]);
    else count.set(nums[i - k], leftCount - 1);

    count.set(nums[i], (count.get(nums[i]) || 0) + 1);
    if (count.size === k && sum > maxSum) {
      maxSum = sum;
    }
  }
  return maxSum;
}
`,
    baselineJs: `export function solve(nums, k) {
  let max = 0;
  for (let i = 0; i <= nums.length - k; i++) {
    const set = new Set();
    let s = 0;
    let distinct = true;
    for (let j = i; j < i + k; j++) {
      if (set.has(nums[j])) {
        distinct = false;
        break;
      }
      set.add(nums[j]);
      s += nums[j];
    }
    if (distinct && s > max) max = s;
  }
  return max;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 5, 4, 2, 9, 9, 9], k: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [4, 4, 4], k: 3 } });
  cases.push({ category: "basic", description: "All distinct", inputs: { nums: [1, 2, 3, 4, 5], k: 2 } });
  cases.push({ category: "basic", description: "k = 1", inputs: { nums: [5, 10, 2], k: 1 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 3, 4, 5, i], k: 3 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Duplicates " + i, inputs: { nums: [i, i, i + 1, i + 2], k: 2 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "All distinct len " + len, inputs: { nums: Array.from({ length: len }, (_, idx) => idx + 1), k: Math.min(3, len) } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 2 + (i % 4);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 8) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 100 + (i - 65) * 30;
    const k = 4 + (i % 8);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k } });
  }
  return cases;
}
`
  });

  // 159. maximum-sum-of-almost-unique-subarray
  await writeProblem("maximum-sum-of-almost-unique-subarray", {
    problemMd: `# Maximum Sum of Almost Unique Subarray

You are given an integer array \`nums\` and two positive integers \`m\` and \`k\`.

Return the **maximum sum** of an almost unique subarray of \`nums\` of length \`k\`. An almost unique subarray is a subarray that has **at least** \`m\` distinct elements. If no such subarray exists, return \`0\`.

### Examples

**Example 1:**
\`\`\`
Input: nums = [2, 6, 7, 3, 1, 7], m = 3, k = 4
Output: 18
Explanation:
- [2, 6, 7, 3]: 4 distinct, sum = 18
- [6, 7, 3, 1]: 4 distinct, sum = 17
- [7, 3, 1, 7]: 3 distinct, sum = 18
Max sum is 18.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [5, 9, 9, 2, 4, 5, 4], m = 1, k = 3
Output: 23
Explanation: Subarray [5, 9, 9] has 2 distinct (>= 1) and sum = 23.
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [1, 2, 1, 2, 1, 2, 1], m = 3, k = 3
Output: 0
\`\`\`

### Constraints

- \`1 <= nums.length <= 10^5\`
- \`1 <= m <= k <= nums.length\`
- \`1 <= nums[i] <= 10^9\`
`,
    structureMd: `Problem Name: "Maximum Sum of Almost Unique Subarray"
Difficulty: MEDIUM
Topics: Array, Hash Table, Sliding Window
Function Name: maxSum

Input Structure:
Input Field: list<int> nums
Input Field: int m
Input Field: int k

Output Structure:
Output Field: long result
`,
    solutionJs: `export function solve(nums, m, k) {
  let sum = 0;
  let maxSum = 0;
  const count = new Map();

  for (let i = 0; i < k; i++) {
    sum += nums[i];
    count.set(nums[i], (count.get(nums[i]) || 0) + 1);
  }
  if (count.size >= m) maxSum = sum;

  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    const leftCount = count.get(nums[i - k]);
    if (leftCount === 1) count.delete(nums[i - k]);
    else count.set(nums[i - k], leftCount - 1);

    count.set(nums[i], (count.get(nums[i]) || 0) + 1);
    if (count.size >= m && sum > maxSum) {
      maxSum = sum;
    }
  }
  return maxSum;
}
`,
    baselineJs: `export function solve(nums, m, k) {
  let max = 0;
  for (let i = 0; i <= nums.length - k; i++) {
    const set = new Set();
    let s = 0;
    for (let j = i; j < i + k; j++) {
      set.add(nums[j]);
      s += nums[j];
    }
    if (set.size >= m && s > max) max = s;
  }
  return max;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [2, 6, 7, 3, 1, 7], m: 3, k: 4 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [5, 9, 9, 2, 4, 5, 4], m: 1, k: 3 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [1, 2, 1, 2, 1, 2, 1], m: 3, k: 3 } });
  cases.push({ category: "basic", description: "m = 1", inputs: { nums: [1, 2, 3], m: 1, k: 2 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [2, 3, 4, 5, 6, i], m: 2, k: 3 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "m = k " + i, inputs: { nums: [1, 2, 3, 4], m: 2, k: 2 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Repeated " + i, inputs: { nums: new Array(len).fill(10), m: 1, k: Math.min(3, len) } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 2 + (i % 5);
    const m = 1 + (i % k);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 20) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, m, k } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const k = 5 + (i % 10);
    const m = 2 + (i % 4);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, m, k } });
  }
  return cases;
}
`
  });

  // 160. find-the-k-beauty-of-a-number
  await writeProblem("find-the-k-beauty-of-a-number", {
    problemMd: `# Find the K-Beauty of a Number

The **k-beauty** of an integer \`num\` is the number of **substrings** of \`num\` when read as a string of length \`k\` that meet the following conditions:
- It is a **divisor** of \`num\`.
- It is not \`0\`.

Return the k-beauty of \`num\`.

Leading zeros are allowed in substrings.

### Examples

**Example 1:**
\`\`\`
Input: num = 240, k = 2
Output: 2
Explanation: Substrings of length 2:
- "24": 240 % 24 = 0 (divisor)
- "40": 240 % 40 = 0 (divisor)
\`\`\`

**Example 2:**
\`\`\`
Input: num = 430043, k = 2
Output: 2
Explanation: "43", "30", "00", "04", "43". Divisors are "43" and "43".
\`\`\`

### Constraints

- \`1 <= num <= 10^9\`
- \`1 <= k <= num.toString().length\`
`,
    structureMd: `Problem Name: "Find the K-Beauty of a Number"
Difficulty: EASY
Topics: Math, String, Sliding Window
Function Name: divisorSubstrings

Input Structure:
Input Field: int num
Input Field: int k

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(num, k) {
  const s = String(num);
  let count = 0;
  for (let i = 0; i <= s.length - k; i++) {
    const sub = Number(s.slice(i, i + k));
    if (sub !== 0 && num % sub === 0) count++;
  }
  return count;
}
`,
    baselineJs: `export function solve(num, k) {
  const s = num.toString();
  let ans = 0;
  for (let i = 0; i <= s.length - k; i++) {
    const val = parseInt(s.substring(i, i + k), 10);
    if (val !== 0 && num % val === 0) ans++;
  }
  return ans;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { num: 240, k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { num: 430043, k: 2 } });
  cases.push({ category: "basic", description: "Single digit", inputs: { num: 5, k: 1 } });
  cases.push({ category: "basic", description: "k = length", inputs: { num: 1234, k: 4 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { num: 1000 + i * 25, k: 2 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "All ones " + i, inputs: { num: 111111, k: (i % 5) + 1 } });
  }
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Zeroes inside " + i, inputs: { num: 100000 + i, k: 2 } });
  }
  for (let i = 40; i < 65; i++) {
    const num = Math.floor(Math.random() * 900000) + 100000;
    cases.push({ category: "random", description: "Random " + i, inputs: { num, k: 2 + (i % 3) } });
  }
  for (let i = 65; i < 80; i++) {
    const num = Math.floor(Math.random() * 900000000) + 100000000;
    cases.push({ category: "large", description: "Large " + i, inputs: { num, k: 3 + (i % 4) } });
  }
  return cases;
}
`
  });

  // 161. find-k-length-substrings-with-no-repeated-characters
  await writeProblem("find-k-length-substrings-with-no-repeated-characters", {
    problemMd: `# Find K-Length Substrings With No Repeated Characters

Given a string \`s\` and an integer \`k\`, return the number of substrings in \`s\` of length \`k\` with no repeated characters.

### Examples

**Example 1:**
\`\`\`
Input: s = "havefunonleetcode", k = 5
Output: 6
Explanation: There are 6 substrings: "havef", "avefu", "vefun", "efuno", "etcod", "tcode".
\`\`\`

**Example 2:**
\`\`\`
Input: s = "home", k = 5
Output: 0
Explanation: k is larger than the length of s.
\`\`\`

### Constraints

- \`1 <= s.length <= 10^4\`
- \`s\` consists of lowercase English letters.
- \`1 <= k <= 10^4\`
`,
    structureMd: `Problem Name: "Find K-Length Substrings With No Repeated Characters"
Difficulty: MEDIUM
Topics: Hash Table, String, Sliding Window
Function Name: numKLenSubstrNoRepeats

Input Structure:
Input Field: String s
Input Field: int k

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(s, k) {
  if (k > s.length || k > 26) return 0;
  let count = 0;
  const freq = new Map();
  for (let i = 0; i < k; i++) {
    freq.set(s[i], (freq.get(s[i]) || 0) + 1);
  }
  if (freq.size === k) count++;

  for (let i = k; i < s.length; i++) {
    const left = s[i - k];
    const c = freq.get(left);
    if (c === 1) freq.delete(left);
    else freq.set(left, c - 1);

    freq.set(s[i], (freq.get(s[i]) || 0) + 1);
    if (freq.size === k) count++;
  }
  return count;
}
`,
    baselineJs: `export function solve(s, k) {
  if (k > s.length || k > 26) return 0;
  let ans = 0;
  for (let i = 0; i <= s.length - k; i++) {
    const set = new Set();
    let unique = true;
    for (let j = i; j < i + k; j++) {
      if (set.has(s[j])) {
        unique = false;
        break;
      }
      set.add(s[j]);
    }
    if (unique) ans++;
  }
  return ans;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "havefunonleetcode", k: 5 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "home", k: 5 } });
  cases.push({ category: "basic", description: "k = 1", inputs: { s: "abc", k: 1 } });
  cases.push({ category: "basic", description: "All same", inputs: { s: "aaaa", k: 2 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "abcdefghijkl", k: i - 1 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "k > 26 " + i, inputs: { s: "abcdefghijklmnopqrstuvwxyz", k: 27 + (i % 5) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Exact alphabet " + i, inputs: { s: "abcdefghijklmnopqrstuvwxyz".slice(0, len), k: len } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 20 + (i % 25);
    const chars = "abcdefghijkl";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    cases.push({ category: "random", description: "Random " + i, inputs: { s, k: 3 + (i % 4) } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 100 + (i - 65) * 50;
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    cases.push({ category: "large", description: "Large " + i, inputs: { s, k: 5 + (i % 10) } });
  }
  return cases;
}
`
  });

  // 162. find-all-anagrams-in-a-string
  await writeProblem("find-all-anagrams-in-a-string", {
    problemMd: `# Find All Anagrams in a String

Given two strings \`s\` and \`p\`, return an array of all the start indices of \`p\`'s anagrams in \`s\`. You may return the answer in **any order**.

An **anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

### Examples

**Example 1:**
\`\`\`
Input: s = "cbaebabacd", p = "abc"
Output: 0 6
Explanation:
- The substring with start index = 0 is "cba", which is an anagram of "abc".
- The substring with start index = 6 is "bac", which is an anagram of "abc".
\`\`\`

**Example 2:**
\`\`\`
Input: s = "abab", p = "ab"
Output: 0 1 2
Explanation:
- Start index 0: "ab"
- Start index 1: "ba"
- Start index 2: "ab"
\`\`\`

### Constraints

- \`1 <= s.length, p.length <= 3 * 10^4\`
- \`s\` and \`p\` consist of lowercase English letters.
`,
    structureMd: `Problem Name: "Find All Anagrams in a String"
Difficulty: MEDIUM
Topics: Hash Table, String, Sliding Window
Function Name: findAnagrams

Input Structure:
Input Field: String s
Input Field: String p

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(s, p) {
  const result = [];
  if (s.length < p.length) return result;

  const pCount = new Array(26).fill(0);
  const sCount = new Array(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  for (let i = 0; i < p.length; i++) {
    pCount[p.charCodeAt(i) - aCode]++;
    sCount[s.charCodeAt(i) - aCode]++;
  }

  let matches = 0;
  for (let i = 0; i < 26; i++) {
    if (pCount[i] === sCount[i]) matches++;
  }

  for (let i = 0; i < s.length - p.length; i++) {
    if (matches === 26) result.push(i);

    const rIdx = s.charCodeAt(i + p.length) - aCode;
    sCount[rIdx]++;
    if (sCount[rIdx] === pCount[rIdx]) matches++;
    else if (sCount[rIdx] === pCount[rIdx] + 1) matches--;

    const lIdx = s.charCodeAt(i) - aCode;
    sCount[lIdx]--;
    if (sCount[lIdx] === pCount[lIdx]) matches++;
    else if (sCount[lIdx] === pCount[lIdx] - 1) matches--;
  }

  if (matches === 26) result.push(s.length - p.length);
  return result;
}
`,
    baselineJs: `export function solve(s, p) {
  const res = [];
  if (s.length < p.length) return res;
  const pSorted = p.split("").sort().join("");
  const k = p.length;
  for (let i = 0; i <= s.length - k; i++) {
    if (s.slice(i, i + k).split("").sort().join("") === pSorted) {
      res.push(i);
    }
  }
  return res;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  // Ensure every case has at least 1 match so output is not empty
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "cbaebabacd", p: "abc" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "abab", p: "ab" } });
  cases.push({ category: "basic", description: "Exact match", inputs: { s: "xyz", p: "xyz" } });
  cases.push({ category: "basic", description: "Repeated chars", inputs: { s: "aaaaa", p: "aa" } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "ab".repeat(i), p: "ab" } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "Edge " + i, inputs: { s: "c".repeat(len), p: "c" } });
  }
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { s: "abcba" + "a".repeat(i - 25), p: "ab" } });
  }
  for (let i = 40; i < 65; i++) {
    const p = "abc";
    const prefix = "xyz".repeat((i % 5) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { s: prefix + "bca" + prefix + "cab", p } });
  }
  for (let i = 65; i < 80; i++) {
    const p = "abcd";
    const middle = "bcda";
    cases.push({ category: "large", description: "Large " + i, inputs: { s: "x".repeat(i) + middle + "x".repeat(i) + "dabc", p } });
  }
  return cases;
}
`
  });

  // 163. k-radius-subarray-averages
  await writeProblem("k-radius-subarray-averages", {
    problemMd: `# K Radius Subarray Averages

You are given a **0-indexed** array \`nums\` of \`n\` integers, and an integer \`k\`.

The **k-radius average** for a subarray of \`nums\` centered at index \`i\` with the radius \`k\` is the average of all elements in \`nums\` between the indices \`i - k\` and \`i + k\` (inclusive). If there are less than \`k\` elements before or after index \`i\`, then the k-radius average is \`-1\`.

Build and return an array \`avgs\` of length \`n\` where \`avgs[i]\` is the **k-radius average** for the subarray centered at index \`i\`.

The average of \`x\` elements is the sum of the \`x\` elements divided by \`x\`, using **integer division** (i.e. truncating toward zero).

### Examples

**Example 1:**
\`\`\`
Input: nums = [7, 4, 3, 9, 1, 8, 5, 2, 6], k = 3
Output: -1 -1 -1 5 4 4 -1 -1 -1
Explanation:
- Indices 0, 1, 2 and 6, 7, 8 have less than 3 elements before/after, so -1.
- Center 3: (7+4+3+9+1+8+5) / 7 = 37 / 7 = 5
- Center 4: (4+3+9+1+8+5+2) / 7 = 32 / 7 = 4
- Center 5: (3+9+1+8+5+2+6) / 7 = 34 / 7 = 4
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [100000], k = 0
Output: 100000
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [8], k = 100
Output: -1
\`\`\`

### Constraints

- \`n == nums.length\`
- \`1 <= n <= 10^5\`
- \`0 <= nums[i], k <= 10^5\`
`,
    structureMd: `Problem Name: "K Radius Subarray Averages"
Difficulty: MEDIUM
Topics: Array, Sliding Window, Prefix Sum
Function Name: getAverages

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(nums, k) {
  const n = nums.length;
  const avgs = new Array(n).fill(-1);
  const windowSize = 2 * k + 1;
  if (windowSize > n) return avgs;

  let sum = 0;
  for (let i = 0; i < windowSize; i++) sum += nums[i];
  avgs[k] = Math.floor(sum / windowSize);

  for (let i = k + 1; i < n - k; i++) {
    sum += nums[i + k] - nums[i - k - 1];
    avgs[i] = Math.floor(sum / windowSize);
  }
  return avgs;
}
`,
    baselineJs: `export function solve(nums, k) {
  const n = nums.length;
  const avgs = [];
  const w = 2 * k + 1;
  for (let i = 0; i < n; i++) {
    if (i - k < 0 || i + k >= n) {
      avgs.push(-1);
    } else {
      let s = 0;
      for (let j = i - k; j <= i + k; j++) s += nums[j];
      avgs.push(Math.floor(s / w));
    }
  }
  return avgs;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [7, 4, 3, 9, 1, 8, 5, 2, 6], k: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [100000], k: 0 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [8], k: 100 } });
  cases.push({ category: "basic", description: "k = 1", inputs: { nums: [1, 2, 3, 4, 5], k: 1 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [2, 4, 6, 8, 10, 12, 14], k: 2 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "k = 0 " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => idx * 10), k: 0 } });
  }
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "k large " + i, inputs: { nums: [1, 2, 3], k: 5 + i } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const k = 1 + (i % 4);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const k = 3 + (i % 8);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 500));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k } });
  }
  return cases;
}
`
  });

  // 164. grumpy-bookstore-owner
  await writeProblem("grumpy-bookstore-owner", {
    problemMd: `# Grumpy Bookstore Owner

There is a bookstore owner that has a store open for \`n\` minutes. Every minute, some number of customers enter the store. You are given an integer array \`customers\` of length \`n\` where \`customers[i]\` is the number of the customer that enters the store at the start of the \`i\`-th minute and all these customers leave after the end of that minute.

On some minutes, the bookstore owner is grumpy. You are given a binary array \`grumpy\` where \`grumpy[i] == 1\` if the bookstore owner is grumpy during the \`i\`-th minute, and is \`0\` otherwise.

When the bookstore owner is grumpy, the customers of that minute are not satisfied, otherwise, they are satisfied.

The bookstore owner knows a secret technique to keep themselves not grumpy for \`minutes\` consecutive minutes, but can only use it a single time.

Return the maximum number of customers that can be satisfied throughout the day.

### Examples

**Example 1:**
\`\`\`
Input: customers = [1, 0, 1, 2, 1, 1, 7, 5], grumpy = [0, 1, 0, 1, 0, 1, 0, 1], minutes = 3
Output: 16
Explanation: The bookstore owner keeps themselves not grumpy for the last 3 minutes.
The maximum number of customers that can be satisfied = 1 + 1 + 1 + 1 + 7 + 5 = 16.
\`\`\`

**Example 2:**
\`\`\`
Input: customers = [1], grumpy = [0], minutes = 1
Output: 1
\`\`\`

### Constraints

- \`n == customers.length == grumpy.length\`
- \`1 <= minutes <= n <= 2 * 10^4\`
- \`0 <= customers[i] <= 1000\`
- \`grumpy[i]\` is either \`0\` or \`1\`.
`,
    structureMd: `Problem Name: "Grumpy Bookstore Owner"
Difficulty: MEDIUM
Topics: Array, Sliding Window
Function Name: maxSatisfied

Input Structure:
Input Field: list<int> customers
Input Field: list<int> grumpy
Input Field: int minutes

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(customers, grumpy, minutes) {
  let baseSatisfied = 0;
  for (let i = 0; i < customers.length; i++) {
    if (grumpy[i] === 0) baseSatisfied += customers[i];
  }

  let extra = 0;
  for (let i = 0; i < minutes; i++) {
    if (grumpy[i] === 1) extra += customers[i];
  }
  let maxExtra = extra;

  for (let i = minutes; i < customers.length; i++) {
    if (grumpy[i] === 1) extra += customers[i];
    if (grumpy[i - minutes] === 1) extra -= customers[i - minutes];
    if (extra > maxExtra) maxExtra = extra;
  }

  return baseSatisfied + maxExtra;
}
`,
    baselineJs: `export function solve(customers, grumpy, minutes) {
  let maxTotal = 0;
  for (let start = 0; start <= customers.length - minutes; start++) {
    let total = 0;
    for (let i = 0; i < customers.length; i++) {
      if (grumpy[i] === 0 || (i >= start && i < start + minutes)) {
        total += customers[i];
      }
    }
    if (total > maxTotal) maxTotal = total;
  }
  return maxTotal;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { customers: [1, 0, 1, 2, 1, 1, 7, 5], grumpy: [0, 1, 0, 1, 0, 1, 0, 1], minutes: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { customers: [1], grumpy: [0], minutes: 1 } });
  cases.push({ category: "basic", description: "Always grumpy", inputs: { customers: [2, 3, 4], grumpy: [1, 1, 1], minutes: 2 } });
  cases.push({ category: "basic", description: "Never grumpy", inputs: { customers: [2, 3, 4], grumpy: [0, 0, 0], minutes: 1 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { customers: [1, 2, 3, 4, 5], grumpy: [1, 0, 1, 0, 1], minutes: 2 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "minutes = len " + i, inputs: { customers: Array.from({ length: len }, (_, idx) => idx + 1), grumpy: new Array(len).fill(1), minutes: len } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "minutes = 1 " + i, inputs: { customers: Array.from({ length: len }, () => 10), grumpy: Array.from({ length: len }, (_, idx) => idx % 2), minutes: 1 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const minutes = 1 + (i % len);
    const customers = Array.from({ length: len }, () => Math.floor(Math.random() * 20));
    const grumpy = Array.from({ length: len }, () => (Math.random() < 0.5 ? 0 : 1));
    cases.push({ category: "random", description: "Random " + i, inputs: { customers, grumpy, minutes } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const minutes = 5 + (i % 15);
    const customers = Array.from({ length: len }, () => Math.floor(Math.random() * 50));
    const grumpy = Array.from({ length: len }, () => (Math.random() < 0.5 ? 0 : 1));
    cases.push({ category: "large", description: "Large " + i, inputs: { customers, grumpy, minutes } });
  }
  return cases;
}
`
  });

  // 165. maximum-points-you-can-obtain-from-cards
  await writeProblem("maximum-points-you-can-obtain-from-cards", {
    problemMd: `# Maximum Points You Can Obtain from Cards

There are several cards arranged in a row, and each card has an associated number of points. The points are given in the integer array \`cardPoints\`.

In one step, you can take one card from the beginning or from the end of the row. You have to take exactly \`k\` cards.

Your score is the sum of the points of the cards you have taken.

Given the integer array \`cardPoints\` and the integer \`k\`, return the maximum score you can obtain.

### Examples

**Example 1:**
\`\`\`
Input: cardPoints = [1, 2, 3, 4, 5, 6, 1], k = 3
Output: 12
Explanation: Taking the three cards on the right gives 1 + 6 + 5 = 12.
\`\`\`

**Example 2:**
\`\`\`
Input: cardPoints = [2, 2, 2], k = 2
Output: 4
\`\`\`

**Example 3:**
\`\`\`
Input: cardPoints = [9, 7, 7, 9, 7, 7, 9], k = 7
Output: 55
\`\`\`

### Constraints

- \`1 <= cardPoints.length <= 10^5\`
- \`1 <= cardPoints[i] <= 10^4\`
- \`1 <= k <= cardPoints.length\`
`,
    structureMd: `Problem Name: "Maximum Points You Can Obtain from Cards"
Difficulty: MEDIUM
Topics: Array, Sliding Window, Prefix Sum
Function Name: maxScore

Input Structure:
Input Field: list<int> cardPoints
Input Field: int k

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(cardPoints, k) {
  const n = cardPoints.length;
  const windowSize = n - k;
  let totalSum = 0;
  for (const x of cardPoints) totalSum += x;
  if (windowSize === 0) return totalSum;

  let cur = 0;
  for (let i = 0; i < windowSize; i++) cur += cardPoints[i];
  let minWindow = cur;

  for (let i = windowSize; i < n; i++) {
    cur += cardPoints[i] - cardPoints[i - windowSize];
    if (cur < minWindow) minWindow = cur;
  }

  return totalSum - minWindow;
}
`,
    baselineJs: `export function solve(cardPoints, k) {
  let leftSum = 0;
  for (let i = 0; i < k; i++) leftSum += cardPoints[i];
  let max = leftSum;
  let rightSum = 0;
  for (let i = 0; i < k; i++) {
    leftSum -= cardPoints[k - 1 - i];
    rightSum += cardPoints[cardPoints.length - 1 - i];
    if (leftSum + rightSum > max) max = leftSum + rightSum;
  }
  return max;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { cardPoints: [1, 2, 3, 4, 5, 6, 1], k: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { cardPoints: [2, 2, 2], k: 2 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { cardPoints: [9, 7, 7, 9, 7, 7, 9], k: 7 } });
  cases.push({ category: "basic", description: "k = 1", inputs: { cardPoints: [10, 1, 20], k: 1 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { cardPoints: [1, 2, 3, 4, 5, 6], k: i - 3 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "k = len " + i, inputs: { cardPoints: Array.from({ length: len }, (_, idx) => idx + 1), k: len } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = 1 " + i, inputs: { cardPoints: Array.from({ length: len }, () => 5), k: 1 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 1 + (i % len);
    const cardPoints = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { cardPoints, k } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const k = 5 + (i % 25);
    const cardPoints = Array.from({ length: len }, () => Math.floor(Math.random() * 100) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { cardPoints, k } });
  }
  return cases;
}
`
  });

  // 166. defuse-the-bomb
  await writeProblem("defuse-the-bomb", {
    problemMd: `# Defuse the Bomb

You have a bomb to defuse, and your informer would like to provide you with a legendary circular list of \`code\` of length \`n\` and a key \`k\`.

To decrypt the code, you must replace every number. All the numbers are replaced simultaneously.
- If \`k > 0\`, replace the \`i\`-th number with the sum of the **next** \`k\` numbers.
- If \`k < 0\`, replace the \`i\`-th number with the sum of the **previous** \`k\` numbers.
- If \`k == 0\`, replace the \`i\`-th number with \`0\`.

As \`code\` is circular, the next element of \`code[n-1]\` is \`code[0]\`, and the previous element of \`code[0]\` is \`code[n-1]\`.

Given the circular list \`code\` and an integer key \`k\`, return the decrypted code to defuse the bomb!

### Examples

**Example 1:**
\`\`\`
Input: code = [5, 7, 1, 4], k = 3
Output: 12 10 16 13
Explanation:
- [5] replaced by 7 + 1 + 4 = 12
- [7] replaced by 1 + 4 + 5 = 10
- [1] replaced by 4 + 5 + 7 = 16
- [4] replaced by 5 + 7 + 1 = 13
\`\`\`

**Example 2:**
\`\`\`
Input: code = [1, 2, 3, 4], k = 0
Output: 0 0 0 0
\`\`\`

**Example 3:**
\`\`\`
Input: code = [2, 4, 9, 3], k = -2
Output: 12 5 6 13
\`\`\`

### Constraints

- \`n == code.length\`
- \`1 <= n <= 100\`
- \`1 <= code[i] <= 100\`
- \`-(n - 1) <= k <= n - 1\`
`,
    structureMd: `Problem Name: "Defuse the Bomb"
Difficulty: EASY
Topics: Array, Sliding Window
Function Name: decrypt

Input Structure:
Input Field: list<int> code
Input Field: int k

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(code, k) {
  const n = code.length;
  const res = new Array(n).fill(0);
  if (k === 0) return res;

  let start = k > 0 ? 1 : n + k;
  let end = k > 0 ? k : n - 1;
  let sum = 0;
  for (let i = start; i <= end; i++) {
    sum += code[i % n];
  }

  for (let i = 0; i < n; i++) {
    res[i] = sum;
    sum -= code[start % n];
    start++;
    end++;
    sum += code[end % n];
  }

  return res;
}
`,
    baselineJs: `export function solve(code, k) {
  const n = code.length;
  const res = new Array(n).fill(0);
  if (k === 0) return res;

  for (let i = 0; i < n; i++) {
    let s = 0;
    if (k > 0) {
      for (let j = 1; j <= k; j++) s += code[(i + j) % n];
    } else {
      for (let j = 1; j <= -k; j++) s += code[(i - j + n) % n];
    }
    res[i] = s;
  }
  return res;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { code: [5, 7, 1, 4], k: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { code: [1, 2, 3, 4], k: 0 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { code: [2, 4, 9, 3], k: -2 } });
  cases.push({ category: "basic", description: "k = 1", inputs: { code: [10, 20, 30], k: 1 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { code: [1, 2, 3, 4, 5], k: (i % 4) - 2 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Zero k " + i, inputs: { code: [i, i + 1, i + 2], k: 0 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Negative k " + i, inputs: { code: Array.from({ length: len }, (_, idx) => idx + 1), k: -1 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 5 + (i % 15);
    const k = (i % (len - 1)) * (i % 2 === 0 ? 1 : -1);
    const code = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { code, k } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 50 + (i - 65) * 2;
    const k = 5 * (i % 2 === 0 ? 1 : -1);
    const code = Array.from({ length: len }, () => Math.floor(Math.random() * 100) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { code, k } });
  }
  return cases;
}
`
  });

  // 167. maximum-of-all-subarrays-of-size-k
  await writeProblem("maximum-of-all-subarrays-of-size-k", {
    problemMd: `# Maximum of All Subarrays of Size K

Given an array \`arr\` and an integer \`k\`, find the maximum element for each and every contiguous subarray of size \`k\`.

### Examples

**Example 1:**
\`\`\`
Input: arr = [1, 2, 3, 1, 4, 5, 2, 3, 6], k = 3
Output: 3 3 4 5 5 5 6
Explanation:
- Window [1, 2, 3]: max is 3
- Window [2, 3, 1]: max is 3
- Window [3, 1, 4]: max is 4
- Window [1, 4, 5]: max is 5
- Window [4, 5, 2]: max is 5
- Window [5, 2, 3]: max is 5
- Window [2, 3, 6]: max is 6
\`\`\`

**Example 2:**
\`\`\`
Input: arr = [8, 5, 10, 7, 9, 4, 15, 12, 90, 13], k = 4
Output: 10 10 10 15 15 90 90
\`\`\`

### Constraints

- \`1 <= arr.length <= 10^5\`
- \`1 <= k <= arr.length\`
- \`0 <= arr[i] <= 10^5\`
`,
    structureMd: `Problem Name: "Maximum of All Subarrays of Size K"
Difficulty: MEDIUM
Topics: Array, Queue, Sliding Window, Monotonic Deque
Function Name: max_of_subarrays

Input Structure:
Input Field: list<int> arr
Input Field: int k

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(arr, k) {
  const q = [];
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    while (q.length > 0 && q[0] <= i - k) q.shift();
    while (q.length > 0 && arr[q[q.length - 1]] <= arr[i]) q.pop();
    q.push(i);
    if (i >= k - 1) {
      res.push(arr[q[0]]);
    }
  }
  return res;
}
`,
    baselineJs: `export function solve(arr, k) {
  const res = [];
  for (let i = 0; i <= arr.length - k; i++) {
    let m = arr[i];
    for (let j = i + 1; j < i + k; j++) {
      if (arr[j] > m) m = arr[j];
    }
    res.push(m);
  }
  return res;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { arr: [1, 2, 3, 1, 4, 5, 2, 3, 6], k: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { arr: [8, 5, 10, 7, 9, 4, 15, 12, 90, 13], k: 4 } });
  cases.push({ category: "basic", description: "Single", inputs: { arr: [1], k: 1 } });
  cases.push({ category: "basic", description: "Decreasing", inputs: { arr: [5, 4, 3, 2, 1], k: 2 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { arr: [1, 3, 5, 2, 4, 6], k: (i % 4) + 1 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 7;
    cases.push({ category: "edge", description: "k = 1 " + i, inputs: { arr: Array.from({ length: len }, (_, idx) => idx * 2), k: 1 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = len " + i, inputs: { arr: Array.from({ length: len }, () => 7), k: len } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 1 + (i % 5);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { arr, k } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const k = 5 + (i % 15);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 500));
    cases.push({ category: "large", description: "Large " + i, inputs: { arr, k } });
  }
  return cases;
}
`
  });

  // 168. diet-plan-performance
  await writeProblem("diet-plan-performance", {
    problemMd: `# Diet Plan Performance

A dieter consumes \`calories[i]\` calories on the \`i\`-th day.

Given an integer \`k\`, for **every** consecutive sequence of \`k\` days (\`calories[i], calories[i+1], ..., calories[i+k-1]\` for all \`0 <= i <= n-k\`), they look at \`T\`, the total calories consumed during that sequence of \`k\` days:
- If \`T < lower\`, they performed poorly on their diet and lose 1 point;
- If \`T > upper\`, they performed well on their diet and gain 1 point;
- Otherwise, they performed normally and their points do not change.

Initially, the dieter has zero points. Return the total number of points the dieter has after dieting for \`calories.length\` days.

Note that the total points can be negative.

### Examples

**Example 1:**
\`\`\`
Input: calories = [1, 2, 3, 4, 5], k = 1, lower = 3, upper = 3
Output: 0
Explanation:
- Day 0: 1 < 3 -> -1 point
- Day 1: 2 < 3 -> -1 point
- Day 2: 3 == 3 -> 0 points
- Day 3: 4 > 3 -> +1 point
- Day 4: 5 > 3 -> +1 point
Total points: 0.
\`\`\`

**Example 2:**
\`\`\`
Input: calories = [3, 2], k = 2, lower = 0, upper = 1
Output: 1
Explanation: Total calories in the 2-day period is 5 > 1, so +1 point.
\`\`\`

**Example 3:**
\`\`\`
Input: calories = [6, 5, 0, 0], k = 2, lower = 1, upper = 5
Output: 0
\`\`\`

### Constraints

- \`1 <= k <= calories.length <= 10^5\`
- \`0 <= calories[i] <= 20000\`
- \`0 <= lower <= upper\`
`,
    structureMd: `Problem Name: "Diet Plan Performance"
Difficulty: EASY
Topics: Array, Sliding Window
Function Name: dietPlanPerformance

Input Structure:
Input Field: list<int> calories
Input Field: int k
Input Field: int lower
Input Field: int upper

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(calories, k, lower, upper) {
  let cur = 0;
  for (let i = 0; i < k; i++) cur += calories[i];
  let points = 0;
  if (cur < lower) points--;
  else if (cur > upper) points++;

  for (let i = k; i < calories.length; i++) {
    cur += calories[i] - calories[i - k];
    if (cur < lower) points--;
    else if (cur > upper) points++;
  }

  return points;
}
`,
    baselineJs: `export function solve(calories, k, lower, upper) {
  let points = 0;
  for (let i = 0; i <= calories.length - k; i++) {
    let s = 0;
    for (let j = i; j < i + k; j++) s += calories[j];
    if (s < lower) points--;
    else if (s > upper) points++;
  }
  return points;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { calories: [1, 2, 3, 4, 5], k: 1, lower: 3, upper: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { calories: [3, 2], k: 2, lower: 0, upper: 1 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { calories: [6, 5, 0, 0], k: 2, lower: 1, upper: 5 } });
  cases.push({ category: "basic", description: "Zero points", inputs: { calories: [2, 2, 2], k: 2, lower: 3, upper: 5 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { calories: [1000, 2000, 3000, 4000], k: 2, lower: 2500, upper: 5500 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "k = len " + i, inputs: { calories: new Array(len).fill(100), k: len, lower: 50, upper: 200 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = 1 " + i, inputs: { calories: Array.from({ length: len }, (_, idx) => idx * 10), k: 1, lower: 20, upper: 50 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const k = 1 + (i % 5);
    const calories = Array.from({ length: len }, () => Math.floor(Math.random() * 500));
    cases.push({ category: "random", description: "Random " + i, inputs: { calories, k, lower: 200, upper: 400 } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const k = 5 + (i % 15);
    const calories = Array.from({ length: len }, () => Math.floor(Math.random() * 1000));
    cases.push({ category: "large", description: "Large " + i, inputs: { calories, k, lower: 2000, upper: 5000 } });
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
