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
  // 99. climbing-stairs
  await writeProblem("climbing-stairs", {
    problemMd: `# Climbing Stairs

You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?

### Examples

**Example 1:**
\`\`\`
Input: n = 2
Output: 2
\`\`\`

**Example 2:**
\`\`\`
Input: n = 3
Output: 3
\`\`\`

### Constraints

- \`1 <= n <= 45\`
`,
    structureMd: `Problem Name: "Climbing Stairs"
Difficulty: EASY
Topics: Math, Dynamic Programming
Function Name: climbStairs

Input Structure:
Input Field: int n

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}
`,
    baselineJs: `export function solve(n) {
  const dp = [0, 1, 2];
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "n = 1", inputs: { n: 1 } });
  cases.push({ category: "basic", description: "n = 2", inputs: { n: 2 } });
  cases.push({ category: "basic", description: "n = 3", inputs: { n: 3 } });
  cases.push({ category: "basic", description: "n = 4", inputs: { n: 4 } });
  cases.push({ category: "basic", description: "n = 5", inputs: { n: 5 } });

  for (let i = 5; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { n: i + 1 } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Small n " + i, inputs: { n: (i % 3) + 1 } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner max n " + i, inputs: { n: 40 + (i % 5) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { n: randomInt(rng, 10, 35) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { n: randomInt(rng, 36, 45) } });
  }

  return cases;
}
`
  });

  // 100. min-cost-climbing-stairs
  await writeProblem("min-cost-climbing-stairs", {
    problemMd: `# Min Cost Climbing Stairs

You are given an integer array \`cost\` where \`cost[i]\` is the cost of \`i\`-th step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index \`0\`, or the step with index \`1\`.

Return the minimum cost to reach the top of the floor.

### Examples

**Example 1:**
\`\`\`
Input: cost = [10, 15, 20]
Output: 15
\`\`\`

**Example 2:**
\`\`\`
Input: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
Output: 6
\`\`\`

### Constraints

- \`2 <= cost.length <= 1000\`
- \`0 <= cost[i] <= 999\`
`,
    structureMd: `Problem Name: "Min Cost Climbing Stairs"
Difficulty: EASY
Topics: Array, Dynamic Programming
Function Name: minCostClimbingStairs

Input Structure:
Input Field: list<int> cost

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(cost) {
  let prev2 = 0, prev1 = 0;
  for (let i = 2; i <= cost.length; i++) {
    const cur = Math.min(prev1 + cost[i - 1], prev2 + cost[i - 2]);
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}
`,
    baselineJs: `export function solve(cost) {
  const n = cost.length;
  const dp = Array(n + 1).fill(0);
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  }
  return dp[n];
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { cost: [10, 15, 20] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { cost: [1, 100, 1, 1, 1, 100, 1, 1, 100, 1] } });
  cases.push({ category: "basic", description: "Two elements", inputs: { cost: [10, 15] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { cost: [1, 2, 3, 4, 5] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Length 2 " + i, inputs: { cost: [randomInt(rng, 0, 50), randomInt(rng, 0, 50)] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "All zeros " + i, inputs: { cost: [0, 0, 0, 0] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 10, 30);
    const cost = [];
    for (let j = 0; j < len; j++) cost.push(randomInt(rng, 0, 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { cost } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 50, 100);
    const cost = [];
    for (let j = 0; j < len; j++) cost.push(randomInt(rng, 0, 500));
    cases.push({ category: "large", description: "Large " + i, inputs: { cost } });
  }

  return cases;
}
`
  });

  // 101. house-robber
  await writeProblem("house-robber", {
    problemMd: `# House Robber

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array \`nums\` representing the amount of money of each house, return the maximum amount of money you can rob tonight **without alerting the police**.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 2, 3, 1]
Output: 4
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [2, 7, 9, 3, 1]
Output: 12
\`\`\`

### Constraints

- \`1 <= nums.length <= 100\`
- \`0 <= nums[i] <= 400\`
`,
    structureMd: `Problem Name: "House Robber"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming
Function Name: rob

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums) {
  let rob1 = 0, rob2 = 0;
  for (const n of nums) {
    const temp = Math.max(n + rob1, rob2);
    rob1 = rob2;
    rob2 = temp;
  }
  return rob2;
}
`,
    baselineJs: `export function solve(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  const dp = Array(nums.length).fill(0);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }
  return dp[nums.length - 1];
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 3, 1] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [2, 7, 9, 3, 1] } });
  cases.push({ category: "basic", description: "Single house", inputs: { nums: [5] } });
  cases.push({ category: "basic", description: "Two houses", inputs: { nums: [10, 20] } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [2, 1, 1, 2] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single house " + i, inputs: { nums: [randomInt(rng, 1, 100)] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "All zeros " + i, inputs: { nums: [0, 0, 0, 0] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 8, 20);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, 0, 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 30, 60);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, 1, 200));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}
`
  });

  // 102. house-robber-ii
  await writeProblem("house-robber-ii", {
    problemMd: `# House Robber II

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are **arranged in a circle**. That means the first house is the neighbor of the last one.

Meanwhile, adjacent houses have a security system connected, and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array \`nums\` representing the amount of money of each house, return the maximum amount of money you can rob tonight **without alerting the police**.

### Examples

**Example 1:**
\`\`\`
Input: nums = [2, 3, 2]
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1, 2, 3, 1]
Output: 4
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [1, 2, 3]
Output: 3
\`\`\`

### Constraints

- \`1 <= nums.length <= 100\`
- \`0 <= nums[i] <= 1000\`
`,
    structureMd: `Problem Name: "House Robber II"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming
Function Name: rob

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums) {
  if (nums.length === 1) return nums[0];

  function robLinear(arr) {
    let rob1 = 0, rob2 = 0;
    for (const n of arr) {
      const temp = Math.max(n + rob1, rob2);
      rob1 = rob2;
      rob2 = temp;
    }
    return rob2;
  }

  return Math.max(robLinear(nums.slice(1)), robLinear(nums.slice(0, -1)));
}
`,
    baselineJs: `export function solve(nums) {
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);

  function helper(start, end) {
    let prev2 = 0, prev1 = 0;
    for (let i = start; i <= end; i++) {
      const cur = Math.max(prev1, prev2 + nums[i]);
      prev2 = prev1;
      prev1 = cur;
    }
    return prev1;
  }

  return Math.max(helper(0, nums.length - 2), helper(1, nums.length - 1));
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [2, 3, 2] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1, 2, 3, 1] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Single house", inputs: { nums: [10] } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [5, 1, 2, 10] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Two houses " + i, inputs: { nums: [randomInt(rng, 1, 50), randomInt(rng, 1, 50)] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Three houses " + i, inputs: { nums: [randomInt(rng, 1, 30), randomInt(rng, 1, 30), randomInt(rng, 1, 30)] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 6, 20);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, 1, 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 30, 60);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, 1, 200));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}
`
  });

  // 103. longest-palindromic-substring
  await writeProblem("longest-palindromic-substring", {
    problemMd: `# Longest Palindromic Substring

Given a string \`s\`, return the **longest palindromic substring** in \`s\`.

If there are multiple palindromic substrings of the same maximum length, return the one that appears earliest in \`s\`.

### Examples

**Example 1:**
\`\`\`
Input: s = "babad"
Output: bab
\`\`\`

**Example 2:**
\`\`\`
Input: s = "cbbd"
Output: bb
\`\`\`

### Constraints

- \`1 <= s.length <= 1000\`
- \`s\` consist of only digits and English letters.
`,
    structureMd: `Problem Name: "Longest Palindromic Substring"
Difficulty: MEDIUM
Topics: Two Pointers, String, Dynamic Programming
Function Name: longestPalindrome

Input Structure:
Input Field: String s

Output Structure:
Output Field: String result
`,
    solutionJs: `export function solve(s) {
  if (s.length <= 1) return s;
  let start = 0, maxLen = 1;

  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      const len = r - l + 1;
      if (len > maxLen) {
        maxLen = len;
        start = l;
      }
      l--;
      r++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }

  return s.substring(start, start + maxLen);
}
`,
    baselineJs: `export function solve(s) {
  if (s.length <= 1) return s;
  const n = s.length;
  let bestStart = 0;
  let maxL = 1;

  for (let i = 0; i < n; i++) {
    // odd
    let l = i, r = i;
    while (l >= 0 && r < n && s[l] === s[r]) {
      if (r - l + 1 > maxL) {
        maxL = r - l + 1;
        bestStart = l;
      }
      l--;
      r++;
    }
    // even
    l = i; r = i + 1;
    while (l >= 0 && r < n && s[l] === s[r]) {
      if (r - l + 1 > maxL) {
        maxL = r - l + 1;
        bestStart = l;
      }
      l--;
      r++;
    }
  }
  return s.substring(bestStart, bestStart + maxL);
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

const chars = "abcdef";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "babad" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "cbbd" } });
  cases.push({ category: "basic", description: "Single char", inputs: { s: "a" } });
  cases.push({ category: "basic", description: "Two same", inputs: { s: "aa" } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "racecar" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single char " + i, inputs: { s: "z" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Repeated " + i, inputs: { s: "a".repeat(5 + (i % 5)) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    let str = "";
    for (let j = 0; j < 15; j++) str += pickRandom(rng, ["a", "b", "c"]);
    cases.push({ category: "random", description: "Random " + i, inputs: { s: str } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    let str = "";
    for (let j = 0; j < 40; j++) str += pickRandom(rng, ["a", "b", "c"]);
    cases.push({ category: "large", description: "Large " + i, inputs: { s: str } });
  }

  return cases;
}
`
  });

  // 104. palindromic-substrings
  await writeProblem("palindromic-substrings", {
    problemMd: `# Palindromic Substrings

Given a string \`s\`, return the number of **palindromic substrings** in it.

A string is a **palindrome** when it reads the same backward as forward.

A **substring** is a contiguous sequence of characters within the string.

### Examples

**Example 1:**
\`\`\`
Input: s = "abc"
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input: s = "aaa"
Output: 6
\`\`\`

### Constraints

- \`1 <= s.length <= 1000\`
- \`s\` consists of lowercase English letters.
`,
    structureMd: `Problem Name: "Palindromic Substrings"
Difficulty: MEDIUM
Topics: Two Pointers, String, Dynamic Programming
Function Name: countSubstrings

Input Structure:
Input Field: String s

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(s) {
  let count = 0;

  function countPal(l, r) {
    let c = 0;
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      c++;
      l--;
      r++;
    }
    return c;
  }

  for (let i = 0; i < s.length; i++) {
    count += countPal(i, i);
    count += countPal(i, i + 1);
  }

  return count;
}
`,
    baselineJs: `export function solve(s) {
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      let isPal = true;
      let l = i, r = j;
      while (l < r) {
        if (s[l++] !== s[r--]) {
          isPal = false;
          break;
        }
      }
      if (isPal) total++;
    }
  }
  return total;
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "abc" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "aaa" } });
  cases.push({ category: "basic", description: "Single char", inputs: { s: "a" } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "aba" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single char " + i, inputs: { s: "x" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Identical chars " + i, inputs: { s: "b".repeat(4 + (i % 4)) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    let str = "";
    for (let j = 0; j < 12; j++) str += pickRandom(rng, ["a", "b", "c"]);
    cases.push({ category: "random", description: "Random " + i, inputs: { s: str } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    let str = "";
    for (let j = 0; j < 30; j++) str += pickRandom(rng, ["a", "b", "c"]);
    cases.push({ category: "large", description: "Large " + i, inputs: { s: str } });
  }

  return cases;
}
`
  });

  // 105. decode-ways
  await writeProblem("decode-ways", {
    problemMd: `# Decode Ways

A message containing letters from \`A-Z\` can be **encoded** into numbers using the following mapping:
\`'A' -> "1"\`, \`'B' -> "2"\`, ..., \`'Z' -> "26"\`.

To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, \`"11106"\` can be mapped into:
- \`"AAJF"\` with the grouping \`(1 1 10 6)\`
- \`"KJF"\` with the grouping \`(11 10 6)\`

Note that the grouping \`(1 11 06)\` is invalid because \`"06"\` cannot be mapped into \`'F'\` since \`"6"\` is different from \`"06"\`.

Given a string \`s\` containing only digits, return the **number of ways** to decode it.

### Examples

**Example 1:**
\`\`\`
Input: s = "12"
Output: 2
\`\`\`

**Example 2:**
\`\`\`
Input: s = "226"
Output: 3
\`\`\`

**Example 3:**
\`\`\`
Input: s = "06"
Output: 0
\`\`\`

### Constraints

- \`1 <= s.length <= 100\`
- \`s\` contains only digits and may contain leading zero(s).
`,
    structureMd: `Problem Name: "Decode Ways"
Difficulty: MEDIUM
Topics: String, Dynamic Programming
Function Name: numDecodings

Input Structure:
Input Field: String s

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(s) {
  if (!s || s[0] === "0") return 0;
  const n = s.length;
  let prev2 = 1, prev1 = 1;

  for (let i = 1; i < n; i++) {
    let cur = 0;
    if (s[i] !== "0") cur += prev1;
    const twoDigit = Number(s.substring(i - 1, i + 1));
    if (twoDigit >= 10 && twoDigit <= 26) cur += prev2;

    prev2 = prev1;
    prev1 = cur;
  }

  return prev1;
}
`,
    baselineJs: `export function solve(s) {
  const n = s.length;
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = s[0] === "0" ? 0 : 1;

  for (let i = 2; i <= n; i++) {
    const one = Number(s[i - 1]);
    const two = Number(s.substring(i - 2, i));
    if (one >= 1 && one <= 9) dp[i] += dp[i - 1];
    if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
  }

  return dp[n];
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "12" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "226" } });
  cases.push({ category: "basic", description: "Example 3 (starts with 0)", inputs: { s: "06" } });
  cases.push({ category: "basic", description: "Single digit non-zero", inputs: { s: "7" } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "111" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single zero " + i, inputs: { s: "0" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Ending zero " + i, inputs: { s: "10" } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    let str = pickRandom(rng, ["1", "2", "3"]);
    for (let j = 0; j < 8; j++) str += pickRandom(rng, ["0", "1", "2", "3", "4", "5", "6"]);
    cases.push({ category: "random", description: "Random " + i, inputs: { s: str } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    let str = pickRandom(rng, ["1", "2"]);
    for (let j = 0; j < 20; j++) str += pickRandom(rng, ["1", "2", "3", "4"]);
    cases.push({ category: "large", description: "Large " + i, inputs: { s: str } });
  }

  return cases;
}
`
  });

  // 106. coin-change
  await writeProblem("coin-change", {
    problemMd: `# Coin Change

You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.

### Examples

**Example 1:**
\`\`\`
Input: coins = [1, 2, 5], amount = 11
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input: coins = [2], amount = 3
Output: -1
\`\`\`

**Example 3:**
\`\`\`
Input: coins = [1], amount = 0
Output: 0
\`\`\`

### Constraints

- \`1 <= coins.length <= 12\`
- \`1 <= coins[i] <= 2^31 - 1\`
- \`0 <= amount <= 10^4\`
`,
    structureMd: `Problem Name: "Coin Change"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming
Function Name: coinChange

Input Structure:
Input Field: list<int> coins
Input Field: int amount

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(coins, amount) {
  if (amount === 0) return 0;
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (a - c >= 0) {
        dp[a] = Math.min(dp[a], 1 + dp[a - c]);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
`,
    baselineJs: `export function solve(coins, amount) {
  if (amount === 0) return 0;
  const q = [0];
  const visited = new Set([0]);
  let step = 0;

  while (q.length > 0) {
    const size = q.length;
    step++;
    for (let i = 0; i < size; i++) {
      const cur = q.shift();
      for (const c of coins) {
        const next = cur + c;
        if (next === amount) return step;
        if (next < amount && !visited.has(next)) {
          visited.add(next);
          q.push(next);
        }
      }
    }
  }

  return -1;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { coins: [1, 2, 5], amount: 11 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { coins: [2], amount: 3 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { coins: [1], amount: 0 } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { coins: [1, 3, 4], amount: 6 } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Zero amount " + i, inputs: { coins: [1, 2], amount: 0 } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Amount 1 " + i, inputs: { coins: [1], amount: 1 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const coins = [1, 2, 5, 10];
    const amount = randomInt(rng, 10, 50);
    cases.push({ category: "random", description: "Random " + i, inputs: { coins, amount } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const coins = [1, 5, 10, 25];
    const amount = randomInt(rng, 60, 200);
    cases.push({ category: "large", description: "Large " + i, inputs: { coins, amount } });
  }

  return cases;
}
`
  });

  // 107. maximum-product-subarray
  await writeProblem("maximum-product-subarray", {
    problemMd: `# Maximum Product Subarray

Given an integer array \`nums\`, find a subarray that has the largest product, and return the product.

The test cases are generated so that the answer will fit in a **32-bit** integer.

### Examples

**Example 1:**
\`\`\`
Input: nums = [2, 3, -2, 4]
Output: 6
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [-2, 0, -1]
Output: 0
\`\`\`

### Constraints

- \`1 <= nums.length <= 100\`
- \`-10 <= nums[i] <= 10\`
`,
    structureMd: `Problem Name: "Maximum Product Subarray"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming
Function Name: maxProduct

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums) {
  let res = nums[0];
  let curMax = 1, curMin = 1;

  for (const n of nums) {
    if (n === 0) {
      curMax = 1;
      curMin = 1;
      res = Math.max(res, 0);
      continue;
    }
    const tmp = curMax * n;
    curMax = Math.max(n * curMax, n * curMin, n);
    curMin = Math.min(tmp, n * curMin, n);
    res = Math.max(res, curMax);
  }

  return res;
}
`,
    baselineJs: `export function solve(nums) {
  let max = nums[0];
  for (let i = 0; i < nums.length; i++) {
    let p = 1;
    for (let j = i; j < nums.length; j++) {
      p *= nums[j];
      if (p > max) max = p;
    }
  }
  return max;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [2, 3, -2, 4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [-2, 0, -1] } });
  cases.push({ category: "basic", description: "Single element", inputs: { nums: [-5] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [-2, 3, -4] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single positive " + i, inputs: { nums: [randomInt(rng, 1, 10)] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Zero elements " + i, inputs: { nums: [0, 0, 0] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 5, 12);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, -3, 3));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 15, 30);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, -2, 2));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}
`
  });

  // 108. word-break
  await writeProblem("word-break", {
    problemMd: `# Word Break

Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

### Examples

**Example 1:**
\`\`\`
Input: s = "codeclash", wordDict = ["code", "clash"]
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: s = "applepenapple", wordDict = ["apple", "pen"]
Output: 1
\`\`\`

**Example 3:**
\`\`\`
Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: 0
\`\`\`

### Constraints

- \`1 <= s.length <= 300\`
- \`1 <= wordDict.length <= 1000\`
- \`1 <= wordDict[i].length <= 20\`
- \`s\` and \`wordDict[i]\` consist of only lowercase English letters.
- All the strings of \`wordDict\` are **unique**.
`,
    structureMd: `Problem Name: "Word Break"
Difficulty: MEDIUM
Topics: Array, String, Dynamic Programming, Trie
Function Name: wordBreak

Input Structure:
Input Field: String s
Input Field: list<String> wordDict

Output Structure:
Output Field: bool result
`,
    solutionJs: `export function solve(s, wordDict) {
  const dict = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && dict.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
}
`,
    baselineJs: `export function solve(s, wordDict) {
  const words = new Set(wordDict);
  const memo = new Map();

  function canBreak(idx) {
    if (idx === s.length) return true;
    if (memo.has(idx)) return memo.get(idx);

    for (let end = idx + 1; end <= s.length; end++) {
      if (words.has(s.substring(idx, end)) && canBreak(end)) {
        memo.set(idx, true);
        return true;
      }
    }
    memo.set(idx, false);
    return false;
  }

  return canBreak(0);
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "codeclash", wordDict: ["code", "clash"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "applepenapple", wordDict: ["apple", "pen"] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "catsandog", wordDict: ["cats", "dog", "sand", "and", "cat"] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "aaaa", wordDict: ["a", "aa"] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single char match " + i, inputs: { s: "a", wordDict: ["a"] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Single char mismatch " + i, inputs: { s: "b", wordDict: ["a"] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const vocab = ["code", "clash", "fast", "algo"];
    const w1 = pickRandom(rng, vocab);
    const w2 = pickRandom(rng, vocab);
    cases.push({ category: "random", description: "Random " + i, inputs: { s: w1 + w2, wordDict: vocab } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const vocab = ["apple", "banana", "orange", "grape"];
    let s = "";
    for (let k = 0; k < 5; k++) s += pickRandom(rng, vocab);
    cases.push({ category: "large", description: "Large " + i, inputs: { s, wordDict: vocab } });
  }

  return cases;
}
`
  });

  // 109. longest-increasing-subsequence
  await writeProblem("longest-increasing-subsequence", {
    problemMd: `# Longest Increasing Subsequence

Given an integer array \`nums\`, return the length of the longest strictly increasing subsequence.

### Examples

**Example 1:**
\`\`\`
Input: nums = [10, 9, 2, 5, 3, 7, 101, 18]
Output: 4
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [0, 1, 0, 3, 2, 3]
Output: 4
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [7, 7, 7, 7, 7, 7, 7]
Output: 1
\`\`\`

### Constraints

- \`1 <= nums.length <= 2500\`
- \`-10^4 <= nums[i] <= 10^4\`
`,
    structureMd: `Problem Name: "Longest Increasing Subsequence"
Difficulty: MEDIUM
Topics: Array, Binary Search, Dynamic Programming
Function Name: lengthOfLIS

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums) {
  const tails = [];
  for (const x of nums) {
    let l = 0, r = tails.length;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (tails[mid] < x) l = mid + 1;
      else r = mid;
    }
    tails[l] = x;
  }
  return tails.length;
}
`,
    baselineJs: `export function solve(nums) {
  const n = nums.length;
  const dp = Array(n).fill(1);
  let max = 1;
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    if (dp[i] > max) max = dp[i];
  }
  return max;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [10, 9, 2, 5, 3, 7, 101, 18] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0, 1, 0, 3, 2, 3] } });
  cases.push({ category: "basic", description: "Example 3 (all equal)", inputs: { nums: [7, 7, 7, 7, 7, 7, 7] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 3, 6, 7, 9, 4, 10, 5, 6] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single element " + i, inputs: { nums: [randomInt(rng, -100, 100)] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Strictly decreasing " + i, inputs: { nums: [5, 4, 3, 2, 1] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 10, 25);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, -50, 50));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 30, 60);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, -500, 500));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}
`
  });

  // 110. partition-equal-subset-sum
  await writeProblem("partition-equal-subset-sum", {
    problemMd: `# Partition Equal Subset Sum

Given an integer array \`nums\`, return \`true\` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal, or \`false\` otherwise.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 5, 11, 5]
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1, 2, 3, 5]
Output: 0
\`\`\`

### Constraints

- \`1 <= nums.length <= 200\`
- \`1 <= nums[i] <= 100\`
`,
    structureMd: `Problem Name: "Partition Equal Subset Sum"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming
Function Name: canPartition

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: bool result
`,
    solutionJs: `export function solve(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;
  const target = sum / 2;

  let dp = new Set([0]);
  for (const n of nums) {
    const nextDp = new Set(dp);
    for (const t of dp) {
      if (t + n === target) return true;
      if (t + n < target) nextDp.add(t + n);
    }
    dp = nextDp;
  }

  return dp.has(target);
}
`,
    baselineJs: `export function solve(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;
  const target = total / 2;

  const dp = Array(target + 1).fill(false);
  dp[0] = true;

  for (const n of nums) {
    for (let j = target; j >= n; j--) {
      if (dp[j - n]) dp[j] = true;
    }
  }

  return dp[target];
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 5, 11, 5] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1, 2, 3, 5] } });
  cases.push({ category: "basic", description: "Two equal", inputs: { nums: [4, 4] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [2, 2, 3, 5] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single element " + i, inputs: { nums: [randomInt(rng, 1, 20)] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Odd sum " + i, inputs: { nums: [1, 2, 4] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const half = [randomInt(rng, 1, 15), randomInt(rng, 1, 15), randomInt(rng, 1, 15)];
    const nums = [...half, ...half];
    cases.push({ category: "random", description: "Random balanced " + i, inputs: { nums } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const half = [randomInt(rng, 5, 20), randomInt(rng, 5, 20), randomInt(rng, 5, 20), randomInt(rng, 5, 20)];
    const nums = [...half, ...half];
    cases.push({ category: "large", description: "Large balanced " + i, inputs: { nums } });
  }

  return cases;
}
`
  });
}

main().catch(console.error);
