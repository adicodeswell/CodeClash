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
  // 169. minimum-size-subarray-sum
  await writeProblem("minimum-size-subarray-sum", {
    problemMd: `# Minimum Size Subarray Sum

Given an array of positive integers \`nums\` and a positive integer \`target\`, return the **minimal length** of a subarray whose sum is greater than or equal to \`target\`. If there is no such subarray, return \`0\` instead.

### Examples

**Example 1:**
\`\`\`
Input: target = 7, nums = [2, 3, 1, 2, 4, 3]
Output: 2
Explanation: The subarray [4, 3] has the minimal length under the problem constraint.
\`\`\`

**Example 2:**
\`\`\`
Input: target = 4, nums = [1, 4, 4]
Output: 1
\`\`\`

**Example 3:**
\`\`\`
Input: target = 11, nums = [1, 1, 1, 1, 1, 1, 1, 1]
Output: 0
\`\`\`

### Constraints

- \`1 <= target <= 10^9\`
- \`1 <= nums.length <= 10^5\`
- \`1 <= nums[i] <= 10^4\`
`,
    structureMd: `Problem Name: "Minimum Size Subarray Sum"
Difficulty: MEDIUM
Topics: Array, Binary Search, Sliding Window
Function Name: minSubArrayLen

Input Structure:
Input Field: int target
Input Field: list<int> nums

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(target, nums) {
  let minLen = Infinity, sum = 0, l = 0;
  for (let r = 0; r < nums.length; r++) {
    sum += nums[r];
    while (sum >= target) {
      minLen = Math.min(minLen, r - l + 1);
      sum -= nums[l++];
    }
  }
  return minLen === Infinity ? 0 : minLen;
}
`,
    baselineJs: `export function solve(target, nums) {
  let min = Infinity;
  for (let i = 0; i < nums.length; i++) {
    let s = 0;
    for (let j = i; j < nums.length; j++) {
      s += nums[j];
      if (s >= target) {
        min = Math.min(min, j - i + 1);
        break;
      }
    }
  }
  return min === Infinity ? 0 : min;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { target: 7, nums: [2, 3, 1, 2, 4, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { target: 4, nums: [1, 4, 4] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { target: 11, nums: [1, 1, 1, 1, 1, 1, 1, 1] } });
  cases.push({ category: "basic", description: "Target = 1", inputs: { target: 1, nums: [2, 3] } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { target: 10 + i, nums: [2, 5, 1, 8, 4, 3] } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Unattainable target " + i, inputs: { target: 100, nums: [1, 2, 3] } });
  }
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Single element " + i, inputs: { target: i, nums: [i] } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 20) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { target: 25, nums } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { target: 200, nums } });
  }
  return cases;
}
`
  });

  // 170. fruit-into-baskets
  await writeProblem("fruit-into-baskets", {
    problemMd: `# Fruit Into Baskets

You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array \`fruits\` where \`fruits[i]\` is the **type** of fruit the \`i\`-th tree produces.

You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:
- You only have **two** baskets, and each basket can only hold a **single type** of fruit.
- Starting from any tree of your choice, you must pick **exactly one fruit** from **every** tree (including the start tree) while moving to the right.
- The picked fruits must fit in one of your baskets.
- Once you reach a tree with fruit that cannot fit in your baskets, you must stop.

Given the integer array \`fruits\`, return the **maximum** number of fruits you can pick.

### Examples

**Example 1:**
\`\`\`
Input: fruits = [1, 2, 1]
Output: 3
Explanation: We can pick from all 3 trees.
\`\`\`

**Example 2:**
\`\`\`
Input: fruits = [0, 1, 2, 2]
Output: 3
Explanation: We can pick from trees [1, 2, 2].
\`\`\`

**Example 3:**
\`\`\`
Input: fruits = [1, 2, 3, 2, 2]
Output: 4
Explanation: We can pick from trees [2, 3, 2, 2].
\`\`\`

### Constraints

- \`1 <= fruits.length <= 10^5\`
- \`0 <= fruits[i] < fruits.length\`
`,
    structureMd: `Problem Name: "Fruit Into Baskets"
Difficulty: MEDIUM
Topics: Array, Hash Table, Sliding Window
Function Name: totalFruit

Input Structure:
Input Field: list<int> fruits

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(fruits) {
  const count = new Map();
  let l = 0, max = 0;
  for (let r = 0; r < fruits.length; r++) {
    count.set(fruits[r], (count.get(fruits[r]) || 0) + 1);
    while (count.size > 2) {
      const c = count.get(fruits[l]);
      if (c === 1) count.delete(fruits[l]);
      else count.set(fruits[l], c - 1);
      l++;
    }
    max = Math.max(max, r - l + 1);
  }
  return max;
}
`,
    baselineJs: `export function solve(fruits) {
  let max = 0;
  for (let i = 0; i < fruits.length; i++) {
    const set = new Set();
    for (let j = i; j < fruits.length; j++) {
      set.add(fruits[j]);
      if (set.size > 2) break;
      max = Math.max(max, j - i + 1);
    }
  }
  return max;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { fruits: [1, 2, 1] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { fruits: [0, 1, 2, 2] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { fruits: [1, 2, 3, 2, 2] } });
  cases.push({ category: "basic", description: "Single", inputs: { fruits: [1] } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { fruits: [1, 2, 1, 3, 3, 2] } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "All same " + i, inputs: { fruits: new Array(len).fill(1) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Alternating " + i, inputs: { fruits: Array.from({ length: len }, (_, idx) => idx % 2) } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const fruits = Array.from({ length: len }, () => Math.floor(Math.random() * 5));
    cases.push({ category: "random", description: "Random " + i, inputs: { fruits } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const fruits = Array.from({ length: len }, () => Math.floor(Math.random() * 8));
    cases.push({ category: "large", description: "Large " + i, inputs: { fruits } });
  }
  return cases;
}
`
  });

  // 171. longest-substring-with-at-most-k-distinct-characters
  await writeProblem("longest-substring-with-at-most-k-distinct-characters", {
    problemMd: `# Longest Substring with At Most K Distinct Characters

Given a string \`s\` and an integer \`k\`, return the length of the longest substring of \`s\` that contains at most \`k\` distinct characters.

### Examples

**Example 1:**
\`\`\`
Input: s = "eceba", k = 2
Output: 3
Explanation: The substring is "ece" with length 3.
\`\`\`

**Example 2:**
\`\`\`
Input: s = "aa", k = 1
Output: 2
\`\`\`

### Constraints

- \`1 <= s.length <= 5 * 10^4\`
- \`0 <= k <= 50\`
`,
    structureMd: `Problem Name: "Longest Substring with At Most K Distinct Characters"
Difficulty: MEDIUM
Topics: Hash Table, String, Sliding Window
Function Name: lengthOfLongestSubstringKDistinct

Input Structure:
Input Field: String s
Input Field: int k

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(s, k) {
  if (k === 0 || s.length === 0) return 0;
  const count = new Map();
  let l = 0, max = 0;
  for (let r = 0; r < s.length; r++) {
    count.set(s[r], (count.get(s[r]) || 0) + 1);
    while (count.size > k) {
      const c = count.get(s[l]);
      if (c === 1) count.delete(s[l]);
      else count.set(s[l], c - 1);
      l++;
    }
    max = Math.max(max, r - l + 1);
  }
  return max;
}
`,
    baselineJs: `export function solve(s, k) {
  if (k === 0) return 0;
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    const set = new Set();
    for (let j = i; j < s.length; j++) {
      set.add(s[j]);
      if (set.size > k) break;
      max = Math.max(max, j - i + 1);
    }
  }
  return max;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "eceba", k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "aa", k: 1 } });
  cases.push({ category: "basic", description: "k = 0", inputs: { s: "abc", k: 0 } });
  cases.push({ category: "basic", description: "k > unique", inputs: { s: "ab", k: 5 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "abacccbba", k: 2 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "k = 1 " + i, inputs: { s: "a".repeat(i - 8) + "b", k: 1 } });
  }
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "All distinct " + i, inputs: { s: "abcdefgh", k: 3 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const chars = "abcdef";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    cases.push({ category: "random", description: "Random " + i, inputs: { s, k: 2 + (i % 3) } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const chars = "abcdefghijkl";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    cases.push({ category: "large", description: "Large " + i, inputs: { s, k: 4 + (i % 5) } });
  }
  return cases;
}
`
  });

  // 172. max-consecutive-ones-iii
  await writeProblem("max-consecutive-ones-iii", {
    problemMd: `# Max Consecutive Ones III

Given a binary array \`nums\` and an integer \`k\`, return the maximum number of consecutive \`1\`'s in the array if you can flip at most \`k\` \`0\`'s.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], k = 2
Output: 6
Explanation: [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1] - bold numbers were flipped from 0 to 1.
The longest subarray is 6.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], k = 3
Output: 10
\`\`\`

### Constraints

- \`1 <= nums.length <= 10^5\`
- \`nums[i]\` is either \`0\` or \`1\`.
- \`0 <= k <= nums.length\`
`,
    structureMd: `Problem Name: "Max Consecutive Ones III"
Difficulty: MEDIUM
Topics: Array, Sliding Window, Prefix Sum
Function Name: longestOnes

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums, k) {
  let l = 0, zeros = 0, max = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] === 0) zeros++;
    while (zeros > k) {
      if (nums[l] === 0) zeros--;
      l++;
    }
    max = Math.max(max, r - l + 1);
  }
  return max;
}
`,
    baselineJs: `export function solve(nums, k) {
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    let zeros = 0;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] === 0) zeros++;
      if (zeros > k) break;
      max = Math.max(max, j - i + 1);
    }
  }
  return max;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], k: 3 } });
  cases.push({ category: "basic", description: "All ones", inputs: { nums: [1, 1, 1], k: 1 } });
  cases.push({ category: "basic", description: "All zeros", inputs: { nums: [0, 0, 0], k: 2 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 0, 1, 0, 1, 0, 1], k: 2 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "k = 0 " + i, inputs: { nums: [1, 0, 1, 1, 0], k: 0 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k >= len " + i, inputs: { nums: new Array(len).fill(0), k: len } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => (Math.random() < 0.6 ? 1 : 0));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k: 2 + (i % 5) } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => (Math.random() < 0.7 ? 1 : 0));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k: 10 + (i % 15) } });
  }
  return cases;
}
`
  });

  // 173. longest-subarray-of-1s-after-deleting-one-element
  await writeProblem("longest-subarray-of-1s-after-deleting-one-element", {
    problemMd: `# Longest Subarray of 1's After Deleting One Element

Given a binary array \`nums\`, you should delete one element from it.

Return the size of the longest non-empty subarray containing only \`1\`'s in the resulting array. Return \`0\` if there is no such subarray.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 1, 0, 1]
Output: 3
Explanation: After deleting the number in position 2, [1, 1, 1] contains 3 numbers with value of 1's.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [0, 1, 1, 1, 0, 1, 1, 0, 1]
Output: 5
Explanation: After deleting the number in position 4, [0, 1, 1, 1, 1, 1, 0, 1] longest subarray with value of 1's is [1, 1, 1, 1, 1].
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [1, 1, 1]
Output: 2
Explanation: You must delete one element.
\`\`\`

### Constraints

- \`1 <= nums.length <= 10^5\`
- \`nums[i]\` is either \`0\` or \`1\`.
`,
    structureMd: `Problem Name: "Longest Subarray of 1's After Deleting One Element"
Difficulty: MEDIUM
Topics: Array, Sliding Window
Function Name: longestSubarray

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums) {
  let l = 0, zeros = 0, max = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] === 0) zeros++;
    while (zeros > 1) {
      if (nums[l] === 0) zeros--;
      l++;
    }
    max = Math.max(max, r - l);
  }
  return max;
}
`,
    baselineJs: `export function solve(nums) {
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    let zeros = 0;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] === 0) zeros++;
      if (zeros > 1) break;
      max = Math.max(max, j - i);
    }
  }
  return max;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 1, 0, 1] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0, 1, 1, 1, 0, 1, 1, 0, 1] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [1, 1, 1] } });
  cases.push({ category: "basic", description: "Single 1", inputs: { nums: [1] } });
  cases.push({ category: "basic", description: "Single 0", inputs: { nums: [0] } });
  for (let i = 5; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 0, 1, 1, 0, 1] } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "All ones " + i, inputs: { nums: new Array(len).fill(1) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "All zeros " + i, inputs: { nums: new Array(len).fill(0) } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => (Math.random() < 0.65 ? 1 : 0));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => (Math.random() < 0.75 ? 1 : 0));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }
  return cases;
}
`
  });

  // 174. maximum-erasure-value
  await writeProblem("maximum-erasure-value", {
    problemMd: `# Maximum Erasure Value

You are given an array of positive integers \`nums\` and want to erase a subarray containing **unique elements**. The **score** you get by erasing the subarray is equal to the **sum** of its elements.

Return the **maximum score** you can get by erasing **exactly one** subarray.

An array \`b\` is called to be a subarray of \`a\` if it forms a contiguous subsequence of \`a\`.

### Examples

**Example 1:**
\`\`\`
Input: nums = [4, 2, 4, 5, 6]
Output: 17
Explanation: The optimal subarray is [2, 4, 5, 6].
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [5, 2, 1, 2, 5, 2, 1, 2, 5]
Output: 8
Explanation: The optimal subarray is [5, 2, 1] or [1, 2, 5].
\`\`\`

### Constraints

- \`1 <= nums.length <= 10^5\`
- \`1 <= nums[i] <= 10^4\`
`,
    structureMd: `Problem Name: "Maximum Erasure Value"
Difficulty: MEDIUM
Topics: Array, Hash Table, Sliding Window
Function Name: maximumUniqueSubarray

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums) {
  const set = new Set();
  let l = 0, sum = 0, max = 0;
  for (let r = 0; r < nums.length; r++) {
    while (set.has(nums[r])) {
      set.delete(nums[l]);
      sum -= nums[l];
      l++;
    }
    set.add(nums[r]);
    sum += nums[r];
    max = Math.max(max, sum);
  }
  return max;
}
`,
    baselineJs: `export function solve(nums) {
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    const set = new Set();
    let s = 0;
    for (let j = i; j < nums.length; j++) {
      if (set.has(nums[j])) break;
      set.add(nums[j]);
      s += nums[j];
    }
    max = Math.max(max, s);
  }
  return max;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [4, 2, 4, 5, 6] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [5, 2, 1, 2, 5, 2, 1, 2, 5] } });
  cases.push({ category: "basic", description: "Single", inputs: { nums: [10] } });
  cases.push({ category: "basic", description: "All distinct", inputs: { nums: [1, 2, 3, 4, 5] } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 1, 3, 4, 2] } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "All same " + i, inputs: { nums: new Array(len).fill(i * 2) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Distinct sequence " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => idx + 1) } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 8) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 20) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }
  return cases;
}
`
  });

  // 175. subarray-product-less-than-k
  await writeProblem("subarray-product-less-than-k", {
    problemMd: `# Subarray Product Less Than K

Given an array of integers \`nums\` and an integer \`k\`, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than \`k\`.

### Examples

**Example 1:**
\`\`\`
Input: nums = [10, 5, 2, 6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are:
[10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]
Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1, 2, 3], k = 0
Output: 0
\`\`\`

### Constraints

- \`1 <= nums.length <= 3 * 10^4\`
- \`1 <= nums[i] <= 1000\`
- \`0 <= k <= 10^6\`
`,
    structureMd: `Problem Name: "Subarray Product Less Than K"
Difficulty: MEDIUM
Topics: Array, Sliding Window
Function Name: numSubarrayProductLessThanK

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums, k) {
  if (k <= 1) return 0;
  let prod = 1, l = 0, count = 0;
  for (let r = 0; r < nums.length; r++) {
    prod *= nums[r];
    while (prod >= k && l <= r) {
      prod /= nums[l++];
    }
    count += (r - l + 1);
  }
  return count;
}
`,
    baselineJs: `export function solve(nums, k) {
  if (k <= 1) return 0;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let p = 1;
    for (let j = i; j < nums.length; j++) {
      p *= nums[j];
      if (p < k) count++;
      else break;
    }
  }
  return count;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [10, 5, 2, 6], k: 100 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1, 2, 3], k: 0 } });
  cases.push({ category: "basic", description: "k = 1", inputs: { nums: [1, 2, 3], k: 1 } });
  cases.push({ category: "basic", description: "Single", inputs: { nums: [5], k: 10 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [2, 3, 4, 1, 2], k: 20 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "k = 0 " + i, inputs: { nums: [i, i + 1], k: 0 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "All ones " + i, inputs: { nums: new Array(len).fill(1), k: 10 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 5) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k: 50 } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 60 + (i - 65) * 15;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 8) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k: 1000 } });
  }
  return cases;
}
`
  });

  // 176. number-of-substrings-containing-all-three-characters
  await writeProblem("number-of-substrings-containing-all-three-characters", {
    problemMd: `# Number of Substrings Containing All Three Characters

Given a string \`s\` consisting only of characters \`a\`, \`b\` and \`c\`.

Return the number of substrings containing **at least one** occurrence of all these characters \`a\`, \`b\` and \`c\`.

### Examples

**Example 1:**
\`\`\`
Input: s = "abcabc"
Output: 10
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again).
\`\`\`

**Example 2:**
\`\`\`
Input: s = "aaacb"
Output: 3
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb".
\`\`\`

**Example 3:**
\`\`\`
Input: s = "abc"
Output: 1
\`\`\`

### Constraints

- \`3 <= s.length <= 5 * 10^4\`
- \`s\` only consists of \`a\`, \`b\` or \`c\` characters.
`,
    structureMd: `Problem Name: "Number of Substrings Containing All Three Characters"
Difficulty: MEDIUM
Topics: Hash Table, String, Sliding Window
Function Name: numberOfSubstrings

Input Structure:
Input Field: String s

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(s) {
  let count = 0;
  const last = { a: -1, b: -1, c: -1 };
  for (let i = 0; i < s.length; i++) {
    last[s[i]] = i;
    const min = Math.min(last.a, last.b, last.c);
    if (min !== -1) count += min + 1;
  }
  return count;
}
`,
    baselineJs: `export function solve(s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    const set = new Set();
    for (let j = i; j < s.length; j++) {
      set.add(s[j]);
      if (set.size === 3) {
        count += (s.length - j);
        break;
      }
    }
  }
  return count;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "abcabc" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "aaacb" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "abc" } });
  cases.push({ category: "basic", description: "cba", inputs: { s: "cba" } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "ab".repeat(i) + "c" } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "No c " + i, inputs: { s: "ab".repeat(i) } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Single match at end " + i, inputs: { s: "a".repeat(len) + "b" + "c" } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const chars = "abc";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * 3)]).join("");
    cases.push({ category: "random", description: "Random " + i, inputs: { s } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const chars = "abc";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * 3)]).join("");
    cases.push({ category: "large", description: "Large " + i, inputs: { s } });
  }
  return cases;
}
`
  });

  // 177. count-subarrays-where-max-element-appears-at-least-k-times
  await writeProblem("count-subarrays-where-max-element-appears-at-least-k-times", {
    problemMd: `# Count Subarrays Where Max Element Appears at Least K Times

You are given an integer array \`nums\` and a **positive** integer \`k\`.

Return the number of subarrays where the **maximum** element of \`nums\` appears **at least** \`k\` times in that subarray.

A **subarray** is a contiguous sequence of elements within an array.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 3, 2, 3, 3], k = 2
Output: 6
Explanation: The maximum element is 3. Subarrays containing at least two 3s are:
[1, 3, 2, 3], [1, 3, 2, 3, 3], [3, 2, 3], [3, 2, 3, 3], [2, 3, 3], [3, 3].
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1, 4, 2, 1], k = 3
Output: 0
\`\`\`

### Constraints

- \`1 <= nums.length <= 10^5\`
- \`1 <= nums[i] <= 10^6\`
- \`1 <= k <= 10^5\`
`,
    structureMd: `Problem Name: "Count Subarrays Where Max Element Appears at Least K Times"
Difficulty: MEDIUM
Topics: Array, Sliding Window
Function Name: countSubarrays

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: long result
`,
    solutionJs: `export function solve(nums, k) {
  let maxVal = -Infinity;
  for (const x of nums) if (x > maxVal) maxVal = x;
  let count = 0, l = 0, ans = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] === maxVal) count++;
    while (count >= k) {
      if (nums[l] === maxVal) count--;
      l++;
    }
    ans += l;
  }
  return ans;
}
`,
    baselineJs: `export function solve(nums, k) {
  let maxVal = -Infinity;
  for (const x of nums) if (x > maxVal) maxVal = x;
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    let c = 0;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] === maxVal) c++;
      if (c >= k) {
        ans += (nums.length - j);
        break;
      }
    }
  }
  return ans;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 3, 2, 3, 3], k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1, 4, 2, 1], k: 3 } });
  cases.push({ category: "basic", description: "k = 1", inputs: { nums: [5, 2, 5], k: 1 } });
  cases.push({ category: "basic", description: "All same", inputs: { nums: [2, 2, 2], k: 2 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 5, 2, 5, 5, 3], k: 2 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "k > freq " + i, inputs: { nums: [1, 2, 3], k: i } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "k = 1 with len " + len, inputs: { nums: Array.from({ length: len }, (_, idx) => idx + 1), k: 1 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 5) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k: 2 + (i % 3) } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 10) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k: 3 + (i % 5) } });
  }
  return cases;
}
`
  });

  // 178. subarrays-with-k-different-integers
  await writeProblem("subarrays-with-k-different-integers", {
    problemMd: `# Subarrays with K Different Integers

Given an integer array \`nums\` and an integer \`k\`, return the number of **good subarrays** of \`nums\`.

A **good array** is an array where the number of different integers in that array is exactly \`k\`.

A **subarray** is a contiguous part of an array.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 2, 1, 2, 3], k = 2
Output: 7
Explanation: Subarrays formed with exactly 2 different integers:
[1, 2], [2, 1], [1, 2], [2, 3], [1, 2, 1], [2, 1, 2], [1, 2, 1, 2].
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1, 2, 1, 3, 4], k = 3
Output: 3
Explanation: Subarrays formed with exactly 3 different integers: [1, 2, 1, 3], [2, 1, 3], [1, 3, 4].
\`\`\`

### Constraints

- \`1 <= nums.length <= 2 * 10^4\`
- \`1 <= nums[i], k <= nums.length\`
`,
    structureMd: `Problem Name: "Subarrays with K Different Integers"
Difficulty: HARD
Topics: Array, Hash Table, Sliding Window
Function Name: subarraysWithKDistinct

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums, k) {
  function atMost(target) {
    if (target <= 0) return 0;
    const count = new Map();
    let l = 0, res = 0;
    for (let r = 0; r < nums.length; r++) {
      count.set(nums[r], (count.get(nums[r]) || 0) + 1);
      while (count.size > target) {
        const c = count.get(nums[l]);
        if (c === 1) count.delete(nums[l]);
        else count.set(nums[l], c - 1);
        l++;
      }
      res += (r - l + 1);
    }
    return res;
  }
  return atMost(k) - atMost(k - 1);
}
`,
    baselineJs: `export function solve(nums, k) {
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    const set = new Set();
    for (let j = i; j < nums.length; j++) {
      set.add(nums[j]);
      if (set.size === k) ans++;
      else if (set.size > k) break;
    }
  }
  return ans;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 1, 2, 3], k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1, 2, 1, 3, 4], k: 3 } });
  cases.push({ category: "basic", description: "k = 1", inputs: { nums: [1, 1, 1], k: 1 } });
  cases.push({ category: "basic", description: "Single", inputs: { nums: [1], k: 1 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 3, 1, 2], k: 2 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "k = len " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => idx + 1), k: len } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "All same " + i, inputs: { nums: new Array(len).fill(5), k: 1 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 4) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k: 2 } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 6) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k: 3 } });
  }
  return cases;
}
`
  });

  // 179. count-number-of-nice-subarrays
  await writeProblem("count-number-of-nice-subarrays", {
    problemMd: `# Count Number of Nice Subarrays

Given an array of integers \`nums\` and an integer \`k\`. A continuous subarray is called **nice** if there are \`k\` odd numbers on it.

Return the number of **nice sub-arrays**.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 1, 2, 1, 1], k = 3
Output: 2
Explanation: The only sub-arrays with 3 odd numbers are [1, 1, 2, 1] and [1, 2, 1, 1].
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [2, 4, 6], k = 1
Output: 0
Explanation: There are no odd numbers in the array.
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [2, 2, 2, 1, 2, 2, 1, 2, 2, 2], k = 2
Output: 16
\`\`\`

### Constraints

- \`1 <= nums.length <= 50000\`
- \`1 <= nums[i] <= 10^5\`
- \`1 <= k <= nums.length\`
`,
    structureMd: `Problem Name: "Count Number of Nice Subarrays"
Difficulty: MEDIUM
Topics: Array, Hash Table, Sliding Window
Function Name: numberOfSubarrays

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums, k) {
  function atMost(target) {
    if (target < 0) return 0;
    let l = 0, odds = 0, res = 0;
    for (let r = 0; r < nums.length; r++) {
      if (nums[r] % 2 !== 0) odds++;
      while (odds > target) {
        if (nums[l] % 2 !== 0) odds--;
        l++;
      }
      res += (r - l + 1);
    }
    return res;
  }
  return atMost(k) - atMost(k - 1);
}
`,
    baselineJs: `export function solve(nums, k) {
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    let odds = 0;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] % 2 !== 0) odds++;
      if (odds === k) ans++;
      else if (odds > k) break;
    }
  }
  return ans;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 1, 2, 1, 1], k: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [2, 4, 6], k: 1 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [2, 2, 2, 1, 2, 2, 1, 2, 2, 2], k: 2 } });
  cases.push({ category: "basic", description: "Single odd", inputs: { nums: [1], k: 1 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 3, 4, 5, 6], k: 2 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "No odds " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => (idx + 1) * 2), k: 1 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "All odds " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => idx * 2 + 1), k: 2 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 20) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k: 2 + (i % 4) } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k: 5 + (i % 8) } });
  }
  return cases;
}
`
  });

  // 180. binary-subarrays-with-sum
  await writeProblem("binary-subarrays-with-sum", {
    problemMd: `# Binary Subarrays With Sum

Given a binary array \`nums\` and an integer \`goal\`, return the number of non-empty **subarrays** with a sum equal to \`goal\`.

A **subarray** is a contiguous part of the array.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 0, 1, 0, 1], goal = 2
Output: 4
Explanation: The 4 subarrays are bolded:
[**1, 0, 1**, 0, 1]
[**1, 0, 1, 0**, 1]
[1, **0, 1, 0, 1**]
[1, 0, **1, 0, 1**]
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [0, 0, 0, 0, 0], goal = 0
Output: 15
\`\`\`

### Constraints

- \`1 <= nums.length <= 3 * 10^4\`
- \`nums[i]\` is either \`0\` or \`1\`.
- \`0 <= goal <= nums.length\`
`,
    structureMd: `Problem Name: "Binary Subarrays With Sum"
Difficulty: MEDIUM
Topics: Array, Hash Table, Sliding Window, Prefix Sum
Function Name: numSubarraysWithSum

Input Structure:
Input Field: list<int> nums
Input Field: int goal

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums, goal) {
  function atMost(target) {
    if (target < 0) return 0;
    let l = 0, sum = 0, res = 0;
    for (let r = 0; r < nums.length; r++) {
      sum += nums[r];
      while (sum > target) {
        sum -= nums[l++];
      }
      res += (r - l + 1);
    }
    return res;
  }
  return atMost(goal) - atMost(goal - 1);
}
`,
    baselineJs: `export function solve(nums, goal) {
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    let s = 0;
    for (let j = i; j < nums.length; j++) {
      s += nums[j];
      if (s === goal) ans++;
      else if (s > goal) break;
    }
  }
  return ans;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 0, 1, 0, 1], goal: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0, 0, 0, 0, 0], goal: 0 } });
  cases.push({ category: "basic", description: "Single 1", inputs: { nums: [1], goal: 1 } });
  cases.push({ category: "basic", description: "Single 0", inputs: { nums: [0], goal: 0 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 0, 1, 1, 0, 1], goal: 2 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "Goal = 0 " + i, inputs: { nums: new Array(len).fill(0), goal: 0 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "All ones " + i, inputs: { nums: new Array(len).fill(1), goal: 2 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => (Math.random() < 0.5 ? 1 : 0));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, goal: 2 + (i % 4) } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => (Math.random() < 0.5 ? 1 : 0));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, goal: 5 + (i % 10) } });
  }
  return cases;
}
`
  });

  // 181. smallest-window-in-a-string-containing-all-the-characters-of-another-string
  await writeProblem("smallest-window-in-a-string-containing-all-the-characters-of-another-string", {
    problemMd: `# Smallest Window in a String Containing All Characters of Another String

Given two strings \`s\` and \`p\`. Find the smallest window in string \`s\` consisting of all characters of string \`p\`. If no such window exists, return \`"-1"\`.

### Examples

**Example 1:**
\`\`\`
Input: s = "timetopractice", p = "toc"
Output: toprac
Explanation: "toprac" is the smallest substring in "timetopractice" containing 't', 'o', and 'c'.
\`\`\`

**Example 2:**
\`\`\`
Input: s = "zoomlazapzo", p = "oza"
Output: apzo
Explanation: "apzo" is the smallest substring in which 'o', 'z' and 'a' are present.
\`\`\`

### Constraints

- \`1 <= s.length, p.length <= 10^5\`
- \`s\` and \`p\` consist of lowercase English letters.
`,
    structureMd: `Problem Name: "Smallest Window in a String Containing All Characters of Another String"
Difficulty: HARD
Topics: Hash Table, String, Sliding Window
Function Name: smallestWindow

Input Structure:
Input Field: String s
Input Field: String p

Output Structure:
Output Field: String result
`,
    solutionJs: `export function solve(s, p) {
  if (s.length < p.length) return "-1";
  const pMap = new Map();
  for (const c of p) pMap.set(c, (pMap.get(c) || 0) + 1);
  const sMap = new Map();
  let l = 0, count = 0, minLen = Infinity, start = -1;
  const need = pMap.size;

  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    sMap.set(c, (sMap.get(c) || 0) + 1);
    if (pMap.has(c) && sMap.get(c) === pMap.get(c)) count++;

    while (count === need) {
      if (r - l + 1 < minLen) {
        minLen = r - l + 1;
        start = l;
      }
      const leftChar = s[l];
      sMap.set(leftChar, sMap.get(leftChar) - 1);
      if (pMap.has(leftChar) && sMap.get(leftChar) < pMap.get(leftChar)) count--;
      l++;
    }
  }

  return start === -1 ? "-1" : s.slice(start, start + minLen);
}
`,
    baselineJs: `export function solve(s, p) {
  if (s.length < p.length) return "-1";
  const pMap = {};
  for (const c of p) pMap[c] = (pMap[c] || 0) + 1;

  function contains(sub) {
    const sMap = {};
    for (const c of sub) sMap[c] = (sMap[c] || 0) + 1;
    for (const k in pMap) {
      if (!sMap[k] || sMap[k] < pMap[k]) return false;
    }
    return true;
  }

  let minLen = Infinity, best = "-1";
  for (let i = 0; i < s.length; i++) {
    for (let j = i + p.length; j <= s.length; j++) {
      if (j - i >= minLen) break;
      const sub = s.slice(i, j);
      if (contains(sub)) {
        minLen = j - i;
        best = sub;
        break;
      }
    }
  }
  return best;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "timetopractice", p: "toc" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "zoomlazapzo", p: "oza" } });
  cases.push({ category: "basic", description: "Exact", inputs: { s: "abc", p: "abc" } });
  cases.push({ category: "basic", description: "Single char", inputs: { s: "abacaba", p: "b" } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "hello" + "world".slice(0, i - 3), p: "lo" } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Double chars " + i, inputs: { s: "aabbccddeeff", p: "ac" } });
  }
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Target at boundary " + i, inputs: { s: "xy" + "a".repeat(i - 20) + "z", p: "xz" } });
  }
  for (let i = 40; i < 65; i++) {
    const p = "abc";
    const filler = "xyz".repeat((i % 5) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { s: filler + "acb" + filler, p } });
  }
  for (let i = 65; i < 80; i++) {
    const p = "abcde";
    const filler = "x".repeat(i);
    cases.push({ category: "large", description: "Large " + i, inputs: { s: filler + "edcba" + filler, p } });
  }
  return cases;
}
`
  });

  // 182. longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit
  await writeProblem("longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit", {
    problemMd: `# Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit

Given an array of integers \`nums\` and an integer \`limit\`, return the size of the longest **non-empty** subarray such that the absolute difference between any two elements of this subarray is less than or equal to \`limit\`.

### Examples

**Example 1:**
\`\`\`
Input: nums = [8, 2, 4, 7], limit = 4
Output: 2
Explanation: Subarrays with diff <= 4:
[8], [2], [4], [7], [2, 4], [4, 7].
Longest size is 2.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [10, 1, 2, 4, 7, 2], limit = 5
Output: 4
Explanation: Subarray [2, 4, 7, 2] has diff <= 5 (7 - 2 = 5).
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [4, 2, 2, 2, 4, 4, 2, 2], limit = 0
Output: 3
\`\`\`

### Constraints

- \`1 <= nums.length <= 10^5\`
- \`1 <= nums[i] <= 10^9\`
- \`0 <= limit <= 10^9\`
`,
    structureMd: `Problem Name: "Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit"
Difficulty: MEDIUM
Topics: Array, Sliding Window, Monotonic Queue
Function Name: longestSubarray

Input Structure:
Input Field: list<int> nums
Input Field: int limit

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums, limit) {
  const maxQ = [];
  const minQ = [];
  let l = 0, maxLen = 0;
  for (let r = 0; r < nums.length; r++) {
    while (maxQ.length > 0 && nums[maxQ[maxQ.length - 1]] <= nums[r]) maxQ.pop();
    maxQ.push(r);
    while (minQ.length > 0 && nums[minQ[minQ.length - 1]] >= nums[r]) minQ.pop();
    minQ.push(r);

    while (nums[maxQ[0]] - nums[minQ[0]] > limit) {
      l++;
      if (maxQ[0] < l) maxQ.shift();
      if (minQ[0] < l) minQ.shift();
    }
    maxLen = Math.max(maxLen, r - l + 1);
  }
  return maxLen;
}
`,
    baselineJs: `export function solve(nums, limit) {
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    let minVal = nums[i], maxVal = nums[i];
    for (let j = i; j < nums.length; j++) {
      if (nums[j] < minVal) minVal = nums[j];
      if (nums[j] > maxVal) maxVal = nums[j];
      if (maxVal - minVal <= limit) {
        max = Math.max(max, j - i + 1);
      } else {
        break;
      }
    }
  }
  return max;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [8, 2, 4, 7], limit: 4 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [10, 1, 2, 4, 7, 2], limit: 5 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [4, 2, 2, 2, 4, 4, 2, 2], limit: 0 } });
  cases.push({ category: "basic", description: "Single", inputs: { nums: [10], limit: 0 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 3, 6, 7, 9], limit: 3 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "limit = 0 " + i, inputs: { nums: Array.from({ length: len }, () => 5), limit: 0 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "Large limit " + i, inputs: { nums: Array.from({ length: len }, (_, idx) => idx + 1), limit: 100 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 20) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, limit: 5 + (i % 5) } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const nums = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, limit: 10 } });
  }
  return cases;
}
`
  });

  // 183. take-k-of-each-character-from-left-and-right
  await writeProblem("take-k-of-each-character-from-left-and-right", {
    problemMd: `# Take K of Each Character From Left and Right

You are given a string \`s\` consisting of the characters \`'a'\`, \`'b'\`, and \`'c'\` and a non-negative integer \`k\`. Each minute, you may take either the **leftmost** character of \`s\`, or the **rightmost** character of \`s\`.

You want to take **at least** \`k\` of each character.

Return the **minimum** number of minutes needed to take at least \`k\` of each character, or return \`-1\` if it is not possible to take \`k\` of each character.

### Examples

**Example 1:**
\`\`\`
Input: s = "aabaaaacaabc", k = 2
Output: 8
Explanation:
- Take three characters from the left: "aab" (2 'a's, 1 'b')
- Take five characters from the right: "caabc" (3 'a's, 1 'b', 1 'c')
A total of 8 characters taken.
\`\`\`

**Example 2:**
\`\`\`
Input: s = "a", k = 1
Output: -1
Explanation: It is not possible to take 1 'b' or 1 'c'.
\`\`\`

### Constraints

- \`1 <= s.length <= 10^5\`
- \`s\` consists of only the letters \`'a'\`, \`'b'\`, and \`'c'\`.
- \`0 <= k <= s.length\`
`,
    structureMd: `Problem Name: "Take K of Each Character From Left and Right"
Difficulty: MEDIUM
Topics: Hash Table, String, Sliding Window
Function Name: takeCharacters

Input Structure:
Input Field: String s
Input Field: int k

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(s, k) {
  if (k === 0) return 0;
  const total = { a: 0, b: 0, c: 0 };
  for (const ch of s) total[ch]++;
  if (total.a < k || total.b < k || total.c < k) return -1;

  const target = { a: total.a - k, b: total.b - k, c: total.c - k };
  const cur = { a: 0, b: 0, c: 0 };
  let l = 0, maxWindow = 0;

  for (let r = 0; r < s.length; r++) {
    cur[s[r]]++;
    while (cur.a > target.a || cur.b > target.b || cur.c > target.c) {
      cur[s[l]]--;
      l++;
    }
    maxWindow = Math.max(maxWindow, r - l + 1);
  }
  return s.length - maxWindow;
}
`,
    baselineJs: `export function solve(s, k) {
  if (k === 0) return 0;
  const total = { a: 0, b: 0, c: 0 };
  for (const ch of s) total[ch]++;
  if (total.a < k || total.b < k || total.c < k) return -1;

  let minMinutes = Infinity;
  for (let leftCount = 0; leftCount <= s.length; leftCount++) {
    const cur = { a: 0, b: 0, c: 0 };
    for (let i = 0; i < leftCount; i++) cur[s[i]]++;

    let rightCount = 0;
    while (rightCount <= s.length - leftCount) {
      if (cur.a >= k && cur.b >= k && cur.c >= k) {
        minMinutes = Math.min(minMinutes, leftCount + rightCount);
        break;
      }
      if (rightCount < s.length - leftCount) {
        cur[s[s.length - 1 - rightCount]]++;
      }
      rightCount++;
    }
  }
  return minMinutes === Infinity ? -1 : minMinutes;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "aabaaaacaabc", k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "a", k: 1 } });
  cases.push({ category: "basic", description: "k = 0", inputs: { s: "abc", k: 0 } });
  cases.push({ category: "basic", description: "Exact k = 1", inputs: { s: "abc", k: 1 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "abc".repeat(i), k: 2 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Impossible " + i, inputs: { s: "a".repeat(i), k: 1 } });
  }
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Equal counts " + i, inputs: { s: "a".repeat(i - 20) + "b".repeat(i - 20) + "c".repeat(i - 20), k: 2 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const chars = "abc";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * 3)]).join("");
    cases.push({ category: "random", description: "Random " + i, inputs: { s, k: 1 + (i % 3) } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 60 + (i - 65) * 15;
    const chars = "abc";
    const s = Array.from({ length: len }, () => chars[Math.floor(Math.random() * 3)]).join("");
    cases.push({ category: "large", description: "Large " + i, inputs: { s, k: 3 + (i % 5) } });
  }
  return cases;
}
`
  });

  // 184. longest-sub-array-with-sum-k
  await writeProblem("longest-sub-array-with-sum-k", {
    problemMd: `# Longest Sub-Array with Sum K

Given an array \`arr\` containing integers (which may include negative numbers) and an integer \`k\`, find the length of the longest subarray with sum equal to \`k\`. If no such subarray exists, return \`0\`.

### Examples

**Example 1:**
\`\`\`
Input: arr = [10, 5, 2, 7, 1, 9], k = 15
Output: 4
Explanation: The subarray is [5, 2, 7, 1] with length 4.
\`\`\`

**Example 2:**
\`\`\`
Input: arr = [-1, 2, 3], k = 6
Output: 0
\`\`\`

**Example 3:**
\`\`\`
Input: arr = [1, -1, 5, -2, 3], k = 3
Output: 4
Explanation: The subarray is [1, -1, 5, -2] with sum 3 and length 4.
\`\`\`

### Constraints

- \`1 <= arr.length <= 10^5\`
- \`-10^5 <= arr[i] <= 10^5\`
- \`-10^9 <= k <= 10^9\`
`,
    structureMd: `Problem Name: "Longest Sub-Array with Sum K"
Difficulty: MEDIUM
Topics: Array, Hash Table, Prefix Sum
Function Name: lenOfLongSubarr

Input Structure:
Input Field: list<int> arr
Input Field: int k

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(arr, k) {
  const map = new Map();
  map.set(0, -1);
  let sum = 0, maxLen = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (map.has(sum - k)) {
      maxLen = Math.max(maxLen, i - map.get(sum - k));
    }
    if (!map.has(sum)) {
      map.set(sum, i);
    }
  }
  return maxLen;
}
`,
    baselineJs: `export function solve(arr, k) {
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    let s = 0;
    for (let j = i; j < arr.length; j++) {
      s += arr[j];
      if (s === k) {
        max = Math.max(max, j - i + 1);
      }
    }
  }
  return max;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { arr: [10, 5, 2, 7, 1, 9], k: 15 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { arr: [-1, 2, 3], k: 6 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { arr: [1, -1, 5, -2, 3], k: 3 } });
  cases.push({ category: "basic", description: "Single match", inputs: { arr: [5], k: 5 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { arr: [1, 2, 3, 4, 5], k: 9 } });
  }
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Zero sum with positives and negatives " + i, inputs: { arr: [i, -i, i, -i], k: 0 } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "No match " + i, inputs: { arr: new Array(len).fill(10), k: 5 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 15 + (i % 20);
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 20) - 10);
    cases.push({ category: "random", description: "Random " + i, inputs: { arr, k: 5 } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 50) - 25);
    cases.push({ category: "large", description: "Large " + i, inputs: { arr, k: 10 } });
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
