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
  // 111. unique-paths
  await writeProblem("unique-paths", {
    problemMd: `# Unique Paths

There is a robot on an \`m x n\` grid. The robot is initially located at the top-left corner (i.e., \`grid[0][0]\`). The robot tries to move to the bottom-right corner (i.e., \`grid[m - 1][n - 1]\`). The robot can only move either down or right at any point in time.

Given the two integers \`m\` and \`n\`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to \`2 * 10^9\`.

### Examples

**Example 1:**
\`\`\`
Input: m = 3, n = 7
Output: 28
\`\`\`

**Example 2:**
\`\`\`
Input: m = 3, n = 2
Output: 3
\`\`\`

### Constraints

- \`1 <= m, n <= 100\`
`,
    structureMd: `Problem Name: "Unique Paths"
Difficulty: MEDIUM
Topics: Math, Dynamic Programming
Function Name: uniquePaths

Input Structure:
Input Field: int m
Input Field: int n

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(m, n) {
  let row = Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    const newRow = Array(n).fill(1);
    for (let j = 1; j < n; j++) {
      newRow[j] = newRow[j - 1] + row[j];
    }
    row = newRow;
  }
  return row[n - 1];
}
`,
    baselineJs: `export function solve(m, n) {
  const dp = Array.from({ length: m }, () => Array(n).fill(1));
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
    }
  }
  return dp[m - 1][n - 1];
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { m: 3, n: 7 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { m: 3, n: 2 } });
  cases.push({ category: "basic", description: "1x1 grid", inputs: { m: 1, n: 1 } });
  cases.push({ category: "basic", description: "1xN grid", inputs: { m: 1, n: 5 } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { m: 4, n: 4 } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "m=1 " + i, inputs: { m: 1, n: 2 + (i % 5) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "2x2 " + i, inputs: { m: 2, n: 2 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { m: randomInt(rng, 3, 10), n: randomInt(rng, 3, 10) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { m: randomInt(rng, 10, 18), n: randomInt(rng, 10, 18) } });
  }

  return cases;
}
`
  });

  // 112. longest-common-subsequence
  await writeProblem("longest-common-subsequence", {
    problemMd: `# Longest Common Subsequence

Given two strings \`text1\` and \`text2\`, return the length of their **longest common subsequence**. If there is no common subsequence, return \`0\`.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, \`"ace"\` is a subsequence of \`"abcde"\`.

### Examples

**Example 1:**
\`\`\`
Input: text1 = "abcde", text2 = "ace"
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input: text1 = "abc", text2 = "abc"
Output: 3
\`\`\`

**Example 3:**
\`\`\`
Input: text1 = "abc", text2 = "def"
Output: 0
\`\`\`

### Constraints

- \`1 <= text1.length, text2.length <= 1000\`
- \`text1\` and \`text2\` consist of only lowercase English characters.
`,
    structureMd: `Problem Name: "Longest Common Subsequence"
Difficulty: MEDIUM
Topics: String, Dynamic Programming
Function Name: longestCommonSubsequence

Input Structure:
Input Field: String text1
Input Field: String text2

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  let dp = Array(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    const cur = Array(n + 1).fill(0);
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        cur[j] = 1 + dp[j - 1];
      } else {
        cur[j] = Math.max(cur[j - 1], dp[j]);
      }
    }
    dp = cur;
  }

  return dp[n];
}
`,
    baselineJs: `export function solve(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  return dp[m][n];
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

const letters = ["a", "b", "c", "d", "e"];

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { text1: "abcde", text2: "ace" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { text1: "abc", text2: "abc" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { text1: "abc", text2: "def" } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { text1: "abacaba", text2: "baab" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single char match " + i, inputs: { text1: "a", text2: "a" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Single char mismatch " + i, inputs: { text1: "a", text2: "b" } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    let t1 = "", t2 = "";
    for (let j = 0; j < 15; j++) t1 += pickRandom(rng, letters);
    for (let j = 0; j < 15; j++) t2 += pickRandom(rng, letters);
    cases.push({ category: "random", description: "Random " + i, inputs: { text1: t1, text2: t2 } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    let t1 = "", t2 = "";
    for (let j = 0; j < 40; j++) t1 += pickRandom(rng, letters);
    for (let j = 0; j < 40; j++) t2 += pickRandom(rng, letters);
    cases.push({ category: "large", description: "Large " + i, inputs: { text1: t1, text2: t2 } });
  }

  return cases;
}
`
  });

  // 113. best-time-to-buy-and-sell-stock-with-cooldown
  await writeProblem("best-time-to-buy-and-sell-stock-with-cooldown", {
    problemMd: `# Best Time to Buy and Sell Stock with Cooldown

You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`-th day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:
- After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

### Examples

**Example 1:**
\`\`\`
Input: prices = [1, 2, 3, 0, 2]
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input: prices = [1]
Output: 0
\`\`\`

### Constraints

- \`1 <= prices.length <= 5000\`
- \`0 <= prices[i] <= 1000\`
`,
    structureMd: `Problem Name: "Best Time to Buy and Sell Stock with Cooldown"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming
Function Name: maxProfit

Input Structure:
Input Field: list<int> prices

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(prices) {
  let sold = 0;
  let held = -Infinity;
  let reset = 0;

  for (const p of prices) {
    const prevSold = sold;
    sold = held + p;
    held = Math.max(held, reset - p);
    reset = Math.max(reset, prevSold);
  }

  return Math.max(sold, reset);
}
`,
    baselineJs: `export function solve(prices) {
  if (prices.length <= 1) return 0;
  const n = prices.length;
  const buy = Array(n).fill(0);
  const sell = Array(n).fill(0);
  buy[0] = -prices[0];
  buy[1] = Math.max(-prices[0], -prices[1]);
  sell[1] = Math.max(0, buy[0] + prices[1]);

  for (let i = 2; i < n; i++) {
    buy[i] = Math.max(buy[i - 1], sell[i - 2] - prices[i]);
    sell[i] = Math.max(sell[i - 1], buy[i - 1] + prices[i]);
  }

  return sell[n - 1];
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { prices: [1, 2, 3, 0, 2] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { prices: [1] } });
  cases.push({ category: "basic", description: "Two days profit", inputs: { prices: [1, 5] } });
  cases.push({ category: "basic", description: "Two days loss", inputs: { prices: [5, 1] } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { prices: [1, 2, 4, 2, 5, 7, 2, 4, 9, 0] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single day " + i, inputs: { prices: [randomInt(rng, 1, 100)] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Decreasing " + i, inputs: { prices: [10, 8, 6, 4, 2] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 10, 25);
    const p = [];
    for (let j = 0; j < len; j++) p.push(randomInt(rng, 1, 50));
    cases.push({ category: "random", description: "Random " + i, inputs: { prices: p } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 30, 60);
    const p = [];
    for (let j = 0; j < len; j++) p.push(randomInt(rng, 1, 200));
    cases.push({ category: "large", description: "Large " + i, inputs: { prices: p } });
  }

  return cases;
}
`
  });

  // 114. coin-change-ii
  await writeProblem("coin-change-ii", {
    problemMd: `# Coin Change II

You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`0\`.

You may assume that you have an infinite number of each kind of coin.

The answer is guaranteed to fit into a signed 32-bit integer.

### Examples

**Example 1:**
\`\`\`
Input: amount = 5, coins = [1, 2, 5]
Output: 4
\`\`\`

**Example 2:**
\`\`\`
Input: amount = 3, coins = [2]
Output: 0
\`\`\`

**Example 3:**
\`\`\`
Input: amount = 10, coins = [10]
Output: 1
\`\`\`

### Constraints

- \`1 <= coins.length <= 300\`
- \`1 <= coins[i] <= 5000\`
- All the values of \`coins\` are **unique**.
- \`0 <= amount <= 5000\`
`,
    structureMd: `Problem Name: "Coin Change II"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming
Function Name: change

Input Structure:
Input Field: int amount
Input Field: list<int> coins

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(amount, coins) {
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1;

  for (const c of coins) {
    for (let a = c; a <= amount; a++) {
      dp[a] += dp[a - c];
    }
  }

  return dp[amount];
}
`,
    baselineJs: `export function solve(amount, coins) {
  const n = coins.length;
  const dp = Array.from({ length: n + 1 }, () => Array(amount + 1).fill(0));
  for (let i = 0; i <= n; i++) dp[i][0] = 1;

  for (let i = 1; i <= n; i++) {
    const c = coins[i - 1];
    for (let a = 0; a <= amount; a++) {
      dp[i][a] = dp[i - 1][a] + (a >= c ? dp[i][a - c] : 0);
    }
  }

  return dp[n][amount];
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { amount: 5, coins: [1, 2, 5] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { amount: 3, coins: [2] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { amount: 10, coins: [10] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { amount: 8, coins: [1, 2, 4] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Zero amount " + i, inputs: { amount: 0, coins: [1, 2, 5] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Amount 1 " + i, inputs: { amount: 1, coins: [2, 3] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const amount = randomInt(rng, 10, 40);
    cases.push({ category: "random", description: "Random " + i, inputs: { amount, coins: [1, 2, 5, 10] } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const amount = randomInt(rng, 50, 150);
    cases.push({ category: "large", description: "Large " + i, inputs: { amount, coins: [1, 2, 5, 10, 20] } });
  }

  return cases;
}
`
  });

  // 115. target-sum
  await writeProblem("target-sum", {
    problemMd: `# Target Sum

You are given an integer array \`nums\` and an integer \`target\`.

You want to build an expression out of \`nums\` by adding one of the symbols \`'+'\` and \`'-'\` before each integer in \`nums\` and then concatenate all the integers.

For example, if \`nums = [2, 1]\`, you can add a \`'+'\` before 2 and a \`'-'\` before 1 and concatenate them to build the expression \`"+2-1"\`.

Return the number of different **expressions** that you can build, which evaluates to \`target\`.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 1, 1, 1, 1], target = 3
Output: 5
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1], target = 1
Output: 1
\`\`\`

### Constraints

- \`1 <= nums.length <= 20\`
- \`0 <= nums[i] <= 1000\`
- \`0 <= sum(nums[i]) <= 1000\`
- \`-1000 <= target <= 1000\`
`,
    structureMd: `Problem Name: "Target Sum"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming
Function Name: findTargetSumWays

Input Structure:
Input Field: list<int> nums
Input Field: int target

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums, target) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (Math.abs(target) > sum || (sum + target) % 2 !== 0) return 0;
  const s1 = (sum + target) / 2;

  const dp = Array(s1 + 1).fill(0);
  dp[0] = 1;

  for (const n of nums) {
    for (let j = s1; j >= n; j--) {
      dp[j] += dp[j - n];
    }
  }

  return dp[s1];
}
`,
    baselineJs: `export function solve(nums, target) {
  let count = 0;
  function dfs(idx, cur) {
    if (idx === nums.length) {
      if (cur === target) count++;
      return;
    }
    dfs(idx + 1, cur + nums[idx]);
    dfs(idx + 1, cur - nums[idx]);
  }
  dfs(0, 0);
  return count;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 1, 1, 1, 1], target: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1], target: 1 } });
  cases.push({ category: "basic", description: "Target not reachable", inputs: { nums: [1, 2], target: 5 } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 1], target: 0 } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Zero elements " + i, inputs: { nums: [0, 0, 1], target: 1 } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Target negative " + i, inputs: { nums: [1, 2, 1], target: -2 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 5, 8);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, 1, 4));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, target: randomInt(rng, -2, 4) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 8, 12);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, 1, 5));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, target: randomInt(rng, -5, 5) } });
  }

  return cases;
}
`
  });

  // 116. interleaving-string
  await writeProblem("interleaving-string", {
    problemMd: `# Interleaving String

Given strings \`s1\`, \`s2\`, and \`s3\`, find whether \`s3\` is formed by an **interleaving** of \`s1\` and \`s2\`.

An **interleaving** of two strings \`s\` and \`t\` is a configuration where \`s\` and \`t\` are divided into \`n\` and \`m\` substrings respectively, such that:
- \`s = s1 + s2 + ... + sn\`
- \`t = t1 + t2 + ... + tm\`
- \`|n - m| <= 1\`
- The interleaving is \`s1 + t1 + s2 + t2 + ...\` or \`t1 + s1 + t2 + s2 + ...\`

### Examples

**Example 1:**
\`\`\`
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: 0
\`\`\`

**Example 3:**
\`\`\`
Input: s1 = "a", s2 = "b", s3 = "ab"
Output: 1
\`\`\`

### Constraints

- \`0 <= s1.length, s2.length <= 100\`
- \`0 <= s3.length <= 200\`
- \`s1\`, \`s2\`, and \`s3\` consist of lowercase English letters.
`,
    structureMd: `Problem Name: "Interleaving String"
Difficulty: MEDIUM
Topics: String, Dynamic Programming
Function Name: isInterleave

Input Structure:
Input Field: String s1
Input Field: String s2
Input Field: String s3

Output Structure:
Output Field: bool result
`,
    solutionJs: `export function solve(s1, s2, s3) {
  if (s1.length + s2.length !== s3.length) return false;
  const m = s1.length, n = s2.length;
  let dp = Array(n + 1).fill(false);
  dp[0] = true;

  for (let j = 1; j <= n; j++) {
    dp[j] = dp[j - 1] && s2[j - 1] === s3[j - 1];
  }

  for (let i = 1; i <= m; i++) {
    dp[0] = dp[0] && s1[i - 1] === s3[i - 1];
    for (let j = 1; j <= n; j++) {
      dp[j] = (dp[j] && s1[i - 1] === s3[i + j - 1]) || (dp[j - 1] && s2[j - 1] === s3[i + j - 1]);
    }
  }

  return dp[n];
}
`,
    baselineJs: `export function solve(s1, s2, s3) {
  if (s1.length + s2.length !== s3.length) return false;
  const memo = new Map();

  function dfs(i, j) {
    if (i === s1.length && j === s2.length) return true;
    const key = \`\${i},\${j}\`;
    if (memo.has(key)) return memo.get(key);

    let res = false;
    const k = i + j;
    if (i < s1.length && s1[i] === s3[k] && dfs(i + 1, j)) res = true;
    if (!res && j < s2.length && s2[j] === s3[k] && dfs(i, j + 1)) res = true;

    memo.set(key, res);
    return res;
  }

  return dfs(0, 0);
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s1: "aabcc", s2: "dbbca", s3: "aadbbcbcac" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s1: "aabcc", s2: "dbbca", s3: "aadbbbaccc" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s1: "a", s2: "b", s3: "ab" } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s1: "aa", s2: "ab", s3: "aaba" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single char each " + i, inputs: { s1: "x", s2: "y", s3: "xy" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Length mismatch " + i, inputs: { s1: "abc", s2: "def", s3: "ab" } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    let s1 = "", s2 = "", s3 = "";
    for (let j = 0; j < 5; j++) s1 += pickRandom(rng, ["a", "b"]);
    for (let j = 0; j < 5; j++) s2 += pickRandom(rng, ["c", "d"]);
    // build valid s3
    let p1 = 0, p2 = 0;
    while (p1 < s1.length || p2 < s2.length) {
      if (p1 < s1.length && (p2 === s2.length || rng() > 0.5)) s3 += s1[p1++];
      else s3 += s2[p2++];
    }
    cases.push({ category: "random", description: "Random valid " + i, inputs: { s1, s2, s3 } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    let s1 = "", s2 = "", s3 = "";
    for (let j = 0; j < 15; j++) s1 += pickRandom(rng, ["a", "b"]);
    for (let j = 0; j < 15; j++) s2 += pickRandom(rng, ["a", "b"]);
    let p1 = 0, p2 = 0;
    while (p1 < s1.length || p2 < s2.length) {
      if (p1 < s1.length && (p2 === s2.length || rng() > 0.5)) s3 += s1[p1++];
      else s3 += s2[p2++];
    }
    cases.push({ category: "large", description: "Large valid " + i, inputs: { s1, s2, s3 } });
  }

  return cases;
}
`
  });

  // 117. longest-increasing-path-in-a-matrix
  await writeProblem("longest-increasing-path-in-a-matrix", {
    problemMd: `# Longest Increasing Path in a Matrix

Given an \`m x n\` integers \`matrix\`, return the length of the **longest increasing path** in \`matrix\`.

From each cell, you can either move in four directions: left, right, up, or down. You may **not** move diagonally or move outside the boundary (i.e., wrap-around is not allowed).

### Examples

**Example 1:**
\`\`\`
Input:
matrix = [
  [9, 9, 4],
  [6, 6, 8],
  [2, 1, 1]
]
Output: 4
\`\`\`

**Example 2:**
\`\`\`
Input:
matrix = [
  [3, 4, 5],
  [3, 2, 6],
  [2, 2, 1]
]
Output: 4
\`\`\`

### Constraints

- \`m == matrix.length\`
- \`n == matrix[i].length\`
- \`1 <= m, n <= 200\`
- \`0 <= matrix[i][j] <= 2^31 - 1\`
`,
    structureMd: `Problem Name: "Longest Increasing Path in a Matrix"
Difficulty: HARD
Topics: Depth-First Search, Dynamic Programming, Matrix
Function Name: longestIncreasingPath

Input Structure:
Input Field: list<list<int>> matrix

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const memo = Array.from({ length: m }, () => Array(n).fill(0));

  function dfs(r, c) {
    if (memo[r][c] !== 0) return memo[r][c];
    let max = 1;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] > matrix[r][c]) {
        max = Math.max(max, 1 + dfs(nr, nc));
      }
    }
    memo[r][c] = max;
    return max;
  }

  let ans = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      ans = Math.max(ans, dfs(r, c));
    }
  }

  return ans;
}
`,
    baselineJs: `export function solve(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const dp = Array.from({ length: m }, () => Array(n).fill(1));

  // Flatten and sort cells by value
  const cells = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      cells.push([matrix[r][c], r, c]);
    }
  }
  cells.sort((a, b) => a[0] - b[0]);

  let maxLen = 1;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (const [val, r, c] of cells) {
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] > val) {
        dp[nr][nc] = Math.max(dp[nr][nc], dp[r][c] + 1);
        if (dp[nr][nc] > maxLen) maxLen = dp[nr][nc];
      }
    }
  }

  return maxLen;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: { matrix: [[9, 9, 4], [6, 6, 8], [2, 1, 1]] }
  });
  cases.push({
    category: "basic",
    description: "Example 2",
    inputs: { matrix: [[3, 4, 5], [3, 2, 6], [2, 2, 1]] }
  });
  cases.push({ category: "basic", description: "Single cell", inputs: { matrix: [[1]] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { matrix: [[1, 2], [3, 4]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "1xN row " + i, inputs: { matrix: [[1, 2, 3, 4]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "All equal " + i, inputs: { matrix: [[5, 5], [5, 5]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const m = 4, n = 4;
    const mat = [];
    for (let r = 0; r < m; r++) {
      const row = [];
      for (let c = 0; c < n; c++) row.push(randomInt(rng, 1, 20));
      mat.push(row);
    }
    cases.push({ category: "random", description: "Random 4x4 " + i, inputs: { matrix: mat } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const m = 8, n = 8;
    const mat = [];
    for (let r = 0; r < m; r++) {
      const row = [];
      for (let c = 0; c < n; c++) row.push(randomInt(rng, 1, 100));
      mat.push(row);
    }
    cases.push({ category: "large", description: "Large 8x8 " + i, inputs: { matrix: mat } });
  }

  return cases;
}
`
  });

  // 118. distinct-subsequences
  await writeProblem("distinct-subsequences", {
    problemMd: `# Distinct Subsequences

Given two strings \`s\` and \`t\`, return the number of distinct subsequences of \`s\` which equals \`t\`.

The test cases are generated so that the answer will fit on a 32-bit signed integer.

### Examples

**Example 1:**
\`\`\`
Input: s = "rabbbit", t = "rabbit"
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input: s = "babgbag", t = "bag"
Output: 5
\`\`\`

### Constraints

- \`1 <= s.length, t.length <= 1000\`
- \`s\` and \`t\` consist of English letters.
`,
    structureMd: `Problem Name: "Distinct Subsequences"
Difficulty: HARD
Topics: String, Dynamic Programming
Function Name: numDistinct

Input Structure:
Input Field: String s
Input Field: String t

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(s, t) {
  const m = s.length, n = t.length;
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= m; i++) {
    for (let j = n; j >= 1; j--) {
      if (s[i - 1] === t[j - 1]) {
        dp[j] += dp[j - 1];
      }
    }
  }

  return dp[n];
}
`,
    baselineJs: `export function solve(s, t) {
  const m = s.length, n = t.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = 1;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = dp[i - 1][j] + (s[i - 1] === t[j - 1] ? dp[i - 1][j - 1] : 0);
    }
  }

  return dp[m][n];
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "rabbbit", t: "rabbit" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "babgbag", t: "bag" } });
  cases.push({ category: "basic", description: "Identical strings", inputs: { s: "abc", t: "abc" } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "aaaa", t: "aa" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single char " + i, inputs: { s: "a", t: "a" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "t longer than s " + i, inputs: { s: "a", t: "aa" } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    let s = "";
    for (let j = 0; j < 12; j++) s += pickRandom(rng, ["a", "b", "c"]);
    cases.push({ category: "random", description: "Random " + i, inputs: { s, t: "ab" } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    let s = "";
    for (let j = 0; j < 30; j++) s += pickRandom(rng, ["a", "b"]);
    cases.push({ category: "large", description: "Large " + i, inputs: { s, t: "aab" } });
  }

  return cases;
}
`
  });

  // 119. edit-distance
  await writeProblem("edit-distance", {
    problemMd: `# Edit Distance

Given two strings \`word1\` and \`word2\`, return the minimum number of operations required to convert \`word1\` to \`word2\`.

You have the following three operations permitted on a word:
- Insert a character
- Delete a character
- Replace a character

### Examples

**Example 1:**
\`\`\`
Input: word1 = "horse", word2 = "ros"
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input: word1 = "intention", word2 = "execution"
Output: 5
\`\`\`

### Constraints

- \`0 <= word1.length, word2.length <= 500\`
- \`word1\` and \`word2\` consist of lowercase English letters.
`,
    structureMd: `Problem Name: "Edit Distance"
Difficulty: MEDIUM
Topics: String, Dynamic Programming
Function Name: minDistance

Input Structure:
Input Field: String word1
Input Field: String word2

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(word1, word2) {
  const m = word1.length, n = word2.length;
  let dp = Array.from({ length: n + 1 }, (_, i) => i);

  for (let i = 1; i <= m; i++) {
    const cur = Array(n + 1).fill(0);
    cur[0] = i;
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        cur[j] = dp[j - 1];
      } else {
        cur[j] = 1 + Math.min(cur[j - 1], dp[j], dp[j - 1]);
      }
    }
    dp = cur;
  }

  return dp[n];
}
`,
    baselineJs: `export function solve(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }

  return dp[m][n];
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

const letters = ["a", "b", "c", "d"];

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { word1: "horse", word2: "ros" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { word1: "intention", word2: "execution" } });
  cases.push({ category: "basic", description: "Identical", inputs: { word1: "abc", word2: "abc" } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { word1: "cat", word2: "hat" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single char diff " + i, inputs: { word1: "a", word2: "b" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Length difference " + i, inputs: { word1: "abc", word2: "a" } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    let w1 = "", w2 = "";
    for (let j = 0; j < 8; j++) w1 += pickRandom(rng, letters);
    for (let j = 0; j < 8; j++) w2 += pickRandom(rng, letters);
    cases.push({ category: "random", description: "Random " + i, inputs: { word1: w1, word2: w2 } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    let w1 = "", w2 = "";
    for (let j = 0; j < 25; j++) w1 += pickRandom(rng, letters);
    for (let j = 0; j < 25; j++) w2 += pickRandom(rng, letters);
    cases.push({ category: "large", description: "Large " + i, inputs: { word1: w1, word2: w2 } });
  }

  return cases;
}
`
  });

  // 120. burst-balloons
  await writeProblem("burst-balloons", {
    problemMd: `# Burst Balloons

You are given \`n\` balloons, indexed from \`0\` to \`n - 1\`. Each balloon is painted with a number on it represented by an array \`nums\`. You are asked to burst all the balloons.

If you burst the \`i\`-th balloon, you will get \`nums[i - 1] * nums[i] * nums[i + 1]\` coins. If \`i - 1\` or \`i + 1\` goes out of bounds of the array, then treat it as if there is a balloon with a \`1\` painted on it.

Return the maximum coins you can collect by bursting the balloons wisely.

### Examples

**Example 1:**
\`\`\`
Input: nums = [3, 1, 5, 8]
Output: 167
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1, 5]
Output: 10
\`\`\`

### Constraints

- \`n == nums.length\`
- \`1 <= n <= 300\`
- \`0 <= nums[i] <= 100\`
`,
    structureMd: `Problem Name: "Burst Balloons"
Difficulty: HARD
Topics: Array, Dynamic Programming
Function Name: maxCoins

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums) {
  const vals = [1, ...nums, 1];
  const n = vals.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));

  for (let len = 1; len <= n - 2; len++) {
    for (let l = 1; l <= n - 1 - len; l++) {
      const r = l + len - 1;
      for (let k = l; k <= r; k++) {
        const coins = vals[l - 1] * vals[k] * vals[r + 1] + dp[l][k - 1] + dp[k + 1][r];
        if (coins > dp[l][r]) dp[l][r] = coins;
      }
    }
  }

  return dp[1][n - 2];
}
`,
    baselineJs: `export function solve(nums) {
  const arr = [1, ...nums, 1];
  const n = arr.length;
  const memo = Array.from({ length: n }, () => Array(n).fill(-1));

  function getCoins(l, r) {
    if (l > r) return 0;
    if (memo[l][r] !== -1) return memo[l][r];
    let max = 0;
    for (let i = l; i <= r; i++) {
      const cur = arr[l - 1] * arr[i] * arr[r + 1] + getCoins(l, i - 1) + getCoins(i + 1, r);
      if (cur > max) max = cur;
    }
    memo[l][r] = max;
    return max;
  }

  return getCoins(1, n - 2);
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [3, 1, 5, 8] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1, 5] } });
  cases.push({ category: "basic", description: "Single balloon", inputs: { nums: [7] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [2, 3, 4] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single balloon " + i, inputs: { nums: [randomInt(rng, 1, 20)] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "All ones " + i, inputs: { nums: [1, 1, 1, 1] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 4, 8);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, 1, 10));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 10, 16);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, 1, 15));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}
`
  });

  // 121. regular-expression-matching
  await writeProblem("regular-expression-matching", {
    problemMd: `# Regular Expression Matching

Given an input string \`s\` and a pattern \`p\`, implement regular expression matching with support for \`'.'\` and \`'*'\` where:
- \`'.'\` Matches any single character.
- \`'*'\` Matches zero or more of the preceding element.

The matching should cover the **entire** input string (not partial).

### Examples

**Example 1:**
\`\`\`
Input: s = "aa", p = "a"
Output: 0
\`\`\`

**Example 2:**
\`\`\`
Input: s = "aa", p = "a*"
Output: 1
\`\`\`

**Example 3:**
\`\`\`
Input: s = "ab", p = ".*"
Output: 1
\`\`\`

### Constraints

- \`1 <= s.length <= 20\`
- \`1 <= p.length <= 20\`
- \`s\` contains only lowercase English letters.
- \`p\` contains only lowercase English letters, \`'.'\`, and \`'*'\`.
- It is guaranteed for each appearance of the character \`'*'\`, there will be a previous valid character to match.
`,
    structureMd: `Problem Name: "Regular Expression Matching"
Difficulty: HARD
Topics: String, Dynamic Programming, Recursion
Function Name: isMatch

Input Structure:
Input Field: String s
Input Field: String p

Output Structure:
Output Field: bool result
`,
    solutionJs: `export function solve(s, p) {
  const m = s.length, n = p.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
  dp[0][0] = true;

  for (let j = 1; j <= n; j++) {
    if (p[j - 1] === "*") {
      dp[0][j] = dp[0][j - 2];
    }
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === "." || p[j - 1] === s[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === "*") {
        dp[i][j] = dp[i][j - 2];
        if (p[j - 2] === "." || p[j - 2] === s[i - 1]) {
          dp[i][j] = dp[i][j] || dp[i - 1][j];
        }
      }
    }
  }

  return dp[m][n];
}
`,
    baselineJs: `export function solve(s, p) {
  const memo = new Map();

  function match(i, j) {
    if (j === p.length) return i === s.length;
    const key = \`\${i},\${j}\`;
    if (memo.has(key)) return memo.get(key);

    const firstMatch = i < s.length && (p[j] === s[i] || p[j] === ".");

    let ans;
    if (j + 1 < p.length && p[j + 1] === "*") {
      ans = match(i, j + 2) || (firstMatch && match(i + 1, j));
    } else {
      ans = firstMatch && match(i + 1, j + 1);
    }

    memo.set(key, ans);
    return ans;
  }

  return match(0, 0);
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "aa", p: "a" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "aa", p: "a*" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "ab", p: ".*" } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "aab", p: "c*a*b" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single char exact " + i, inputs: { s: "a", p: "a" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Dot star match " + i, inputs: { s: "abcdef", p: ".*" } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { s: "ab", p: ".*c" } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { s: "mississippi", p: "mis*is*ip*." } });
  }

  return cases;
}
`
  });
}

main().catch(console.error);
