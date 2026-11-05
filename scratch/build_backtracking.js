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
  // 71. subsets
  await writeProblem("subsets", {
    problemMd: `# Subsets

Given an integer array \`nums\` of **unique** elements, return all possible subsets (the power set).

The solution set **must not** contain duplicate subsets. Return the subsets sorted in canonical order:
1. Subsets of smaller size appear before subsets of larger size.
2. For subsets of the same size, sort them element-by-element in ascending order.
3. Elements within each subset must be sorted in ascending order.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 2, 3]
Output:
1
2
3
1 2
1 3
2 3
1 2 3
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [0]
Output:
0
\`\`\`

### Constraints

- \`1 <= nums.length <= 10\`
- \`-10 <= nums[i] <= 10\`
- All the numbers of \`nums\` are **unique**.
`,
    structureMd: `Problem Name: "Subsets"
Difficulty: MEDIUM
Topics: Array, Backtracking, Bit Manipulation
Function Name: subsets

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: list<list<int>> result
`,
    solutionJs: `export function solve(nums) {
  const res = [];
  const curr = [];
  const sortedNums = [...nums].sort((a, b) => a - b);

  function backtrack(idx) {
    if (idx === sortedNums.length) {
      res.push([...curr]);
      return;
    }
    // Exclude
    backtrack(idx + 1);
    // Include
    curr.push(sortedNums[idx]);
    backtrack(idx + 1);
    curr.pop();
  }

  backtrack(0);

  // Canonical sorting
  for (const s of res) s.sort((a, b) => a - b);
  res.sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  });

  return res;
}
`,
    baselineJs: `export function solve(nums) {
  const n = nums.length;
  const res = [];
  for (let mask = 0; mask < (1 << n); mask++) {
    const sub = [];
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) sub.push(nums[i]);
    }
    sub.sort((a, b) => a - b);
    res.push(sub);
  }
  res.sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  });
  return res;
}
`,
    testCasesJs: `import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0] } });
  cases.push({ category: "basic", description: "Two elements", inputs: { nums: [1, 2] } });
  cases.push({ category: "basic", description: "Negative elements", inputs: { nums: [-1, 0, 1] } });

  for (let i = 4; i < 10; i++) {
    const count = 3 + (i % 3);
    const set = new Set();
    while (set.size < count) set.add(randomInt(rng, -10, 10));
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: Array.from(set) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const set = new Set();
    while (set.size < 2) set.add(randomInt(rng, -20, 20));
    cases.push({ category: "edge", description: "Two elements edge " + i, inputs: { nums: Array.from(set) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const single = [randomInt(rng, -10, 10)];
    cases.push({ category: "corner", description: "Single element " + i, inputs: { nums: single } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const count = randomInt(rng, 4, 6);
    const set = new Set();
    while (set.size < count) set.add(randomInt(rng, -30, 30));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums: Array.from(set) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const count = randomInt(rng, 6, 8);
    const set = new Set();
    while (set.size < count) set.add(randomInt(rng, -50, 50));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums: Array.from(set) } });
  }

  return cases;
}
`
  });

  // 72. combination-sum
  await writeProblem("combination-sum", {
    problemMd: `# Combination Sum

Given an array of **distinct** integers \`candidates\` and a target integer \`target\`, return a list of all **unique combinations** of \`candidates\` where the chosen numbers sum to \`target\`. You may return the combinations in any order.

The **same** number may be chosen from \`candidates\` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

To guarantee a unique deterministic output:
1. Each combination must have its elements sorted in ascending order.
2. The list of combinations must be sorted primarily by size ascending, then element-by-element ascending.

### Examples

**Example 1:**
\`\`\`
Input: candidates = [2, 3, 6, 7], target = 7
Output:
7
2 2 3
\`\`\`

**Example 2:**
\`\`\`
Input: candidates = [2, 3, 5], target = 8
Output:
3 5
2 3 3
2 2 2 2
\`\`\`

### Constraints

- \`1 <= candidates.length <= 30\`
- \`2 <= candidates[i] <= 40\`
- All elements of \`candidates\` are **distinct**.
- \`1 <= target <= 40\`
`,
    structureMd: `Problem Name: "Combination Sum"
Difficulty: MEDIUM
Topics: Array, Backtracking
Function Name: combinationSum

Input Structure:
Input Field: list<int> candidates
Input Field: int target

Output Structure:
Output Field: list<list<int>> result
`,
    solutionJs: `export function solve(candidates, target) {
  const res = [];
  const curr = [];
  const sorted = [...candidates].sort((a, b) => a - b);

  function dfs(idx, rem) {
    if (rem === 0) {
      res.push([...curr]);
      return;
    }
    for (let i = idx; i < sorted.length; i++) {
      if (sorted[i] > rem) break;
      curr.push(sorted[i]);
      dfs(i, rem - sorted[i]);
      curr.pop();
    }
  }

  dfs(0, target);

  for (const c of res) c.sort((a, b) => a - b);
  res.sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  });

  return res;
}
`,
    baselineJs: `export function solve(candidates, target) {
  const res = [];
  const sorted = [...candidates].sort((a, b) => a - b);

  function backtrack(start, comb, sum) {
    if (sum === target) {
      res.push([...comb]);
      return;
    }
    if (sum > target) return;
    for (let i = start; i < sorted.length; i++) {
      comb.push(sorted[i]);
      backtrack(i, comb, sum + sorted[i]);
      comb.pop();
    }
  }

  backtrack(0, [], 0);

  for (const c of res) c.sort((a, b) => a - b);
  res.sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  });

  return res;
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { candidates: [2, 3, 6, 7], target: 7 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { candidates: [2, 3, 5], target: 8 } });
  cases.push({ category: "basic", description: "Single candidate equal to target", inputs: { candidates: [2], target: 2 } });
  cases.push({ category: "basic", description: "Two candidates", inputs: { candidates: [2, 3], target: 6 } });

  for (let i = 4; i < 10; i++) {
    const cands = [2, 3, 4 + (i % 3)];
    cases.push({ category: "basic", description: "Basic " + i, inputs: { candidates: cands, target: 6 + (i % 4) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const c = randomInt(rng, 2, 6);
    const mult = randomInt(rng, 1, 3);
    cases.push({ category: "edge", description: "Exact multiple " + i, inputs: { candidates: [c, c + 3], target: c * mult } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const c = randomInt(rng, 3, 8);
    cases.push({ category: "corner", description: "Single match " + i, inputs: { candidates: [c], target: c } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const base = [2, 3, 5];
    const target = randomInt(rng, 6, 15);
    cases.push({ category: "random", description: "Random " + i, inputs: { candidates: base, target } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const cands = [2, 3, 4, 7];
    const target = randomInt(rng, 10, 18);
    cases.push({ category: "large", description: "Large target " + i, inputs: { candidates: cands, target } });
  }

  return cases;
}
`
  });

  // 73. combination-sum-ii
  await writeProblem("combination-sum-ii", {
    problemMd: `# Combination Sum II

Given a collection of candidate numbers (\`candidates\`) and a target number (\`target\`), find all unique combinations in \`candidates\` where the candidate numbers sum to \`target\`.

Each number in \`candidates\` may only be used **once** in the combination.

Note: The solution set must not contain duplicate combinations.

To guarantee a unique deterministic output:
1. Each combination must have its elements sorted in ascending order.
2. The list of combinations must be sorted primarily by size ascending, then element-by-element ascending.

### Examples

**Example 1:**
\`\`\`
Input: candidates = [10, 1, 2, 7, 6, 1, 5], target = 8
Output:
1 7
2 6
1 1 6
1 2 5
\`\`\`

**Example 2:**
\`\`\`
Input: candidates = [2, 5, 2, 1, 2], target = 5
Output:
5
1 2 2
\`\`\`

### Constraints

- \`1 <= candidates.length <= 50\`
- \`1 <= candidates[i] <= 30\`
- \`1 <= target <= 30\`
`,
    structureMd: `Problem Name: "Combination Sum II"
Difficulty: MEDIUM
Topics: Array, Backtracking
Function Name: combinationSum2

Input Structure:
Input Field: list<int> candidates
Input Field: int target

Output Structure:
Output Field: list<list<int>> result
`,
    solutionJs: `export function solve(candidates, target) {
  const res = [];
  const curr = [];
  const sorted = [...candidates].sort((a, b) => a - b);

  function dfs(idx, rem) {
    if (rem === 0) {
      res.push([...curr]);
      return;
    }
    for (let i = idx; i < sorted.length; i++) {
      if (i > idx && sorted[i] === sorted[i - 1]) continue;
      if (sorted[i] > rem) break;
      curr.push(sorted[i]);
      dfs(i + 1, rem - sorted[i]);
      curr.pop();
    }
  }

  dfs(0, target);

  for (const c of res) c.sort((a, b) => a - b);
  res.sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  });

  return res;
}
`,
    baselineJs: `export function solve(candidates, target) {
  const sorted = [...candidates].sort((a, b) => a - b);
  const res = [];
  const seen = new Set();

  function backtrack(idx, comb, sum) {
    if (sum === target) {
      const key = comb.join(",");
      if (!seen.has(key)) {
        seen.add(key);
        res.push([...comb]);
      }
      return;
    }
    if (sum > target || idx >= sorted.length) return;

    for (let i = idx; i < sorted.length; i++) {
      if (i > idx && sorted[i] === sorted[i - 1]) continue;
      comb.push(sorted[i]);
      backtrack(i + 1, comb, sum + sorted[i]);
      comb.pop();
    }
  }

  backtrack(0, [], 0);

  for (const c of res) c.sort((a, b) => a - b);
  res.sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  });

  return res;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { candidates: [10, 1, 2, 7, 6, 1, 5], target: 8 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { candidates: [2, 5, 2, 1, 2], target: 5 } });
  cases.push({ category: "basic", description: "Exact single", inputs: { candidates: [3, 4], target: 3 } });

  for (let i = 3; i < 10; i++) {
    const cands = [1, 1, 2, 3, 4];
    cases.push({ category: "basic", description: "Basic " + i, inputs: { candidates: cands, target: 4 } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const v = randomInt(rng, 1, 5);
    cases.push({ category: "edge", description: "Repeated elements " + i, inputs: { candidates: [v, v, v, v], target: v * 2 } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const v = randomInt(rng, 2, 6);
    cases.push({ category: "corner", description: "Pair sum " + i, inputs: { candidates: [1, v, v + 2], target: v + 1 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const cands = [1, 2, 2, 3, 4, 5];
    const target = randomInt(rng, 4, 9);
    cases.push({ category: "random", description: "Random " + i, inputs: { candidates: cands, target } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const cands = [1, 1, 2, 2, 3, 3, 4, 5];
    const target = randomInt(rng, 5, 10);
    cases.push({ category: "large", description: "Large " + i, inputs: { candidates: cands, target } });
  }

  return cases;
}
`
  });

  // 74. permutations
  await writeProblem("permutations", {
    problemMd: `# Permutations

Given an array \`nums\` of **distinct** integers, return all the possible permutations.

You must return the list of permutations sorted in **lexicographical order** element-by-element to guarantee a unique, deterministic result.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 2, 3]
Output:
1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [0, 1]
Output:
0 1
1 0
\`\`\`

### Constraints

- \`1 <= nums.length <= 6\`
- \`-10 <= nums[i] <= 10\`
- All the integers of \`nums\` are **unique**.
`,
    structureMd: `Problem Name: "Permutations"
Difficulty: MEDIUM
Topics: Array, Backtracking
Function Name: permute

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: list<list<int>> result
`,
    solutionJs: `export function solve(nums) {
  const res = [];
  const used = Array(nums.length).fill(false);
  const curr = [];
  const sorted = [...nums].sort((a, b) => a - b);

  function backtrack() {
    if (curr.length === sorted.length) {
      res.push([...curr]);
      return;
    }
    for (let i = 0; i < sorted.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      curr.push(sorted[i]);
      backtrack();
      curr.pop();
      used[i] = false;
    }
  }

  backtrack();

  res.sort((a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  });

  return res;
}
`,
    baselineJs: `export function solve(nums) {
  const res = [];

  function perm(arr, l, r) {
    if (l === r) {
      res.push([...arr]);
      return;
    }
    for (let i = l; i <= r; i++) {
      [arr[l], arr[i]] = [arr[i], arr[l]];
      perm(arr, l + 1, r);
      [arr[l], arr[i]] = [arr[i], arr[l]];
    }
  }

  perm([...nums], 0, nums.length - 1);

  res.sort((a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  });

  return res;
}
`,
    testCasesJs: `import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0, 1] } });
  cases.push({ category: "basic", description: "Single element", inputs: { nums: [1] } });

  for (let i = 3; i < 10; i++) {
    const count = 3;
    const set = new Set();
    while (set.size < count) set.add(randomInt(rng, 1, 9));
    cases.push({ category: "basic", description: "Basic 3-elem " + i, inputs: { nums: Array.from(set) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const single = [randomInt(rng, -10, 10)];
    cases.push({ category: "edge", description: "Single element " + i, inputs: { nums: single } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const pair = [randomInt(rng, -10, 0), randomInt(rng, 1, 10)];
    cases.push({ category: "corner", description: "Two elements " + i, inputs: { nums: pair } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const count = 4;
    const set = new Set();
    while (set.size < count) set.add(randomInt(rng, -20, 20));
    cases.push({ category: "random", description: "Random 4-elem " + i, inputs: { nums: Array.from(set) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const count = 5;
    const set = new Set();
    while (set.size < count) set.add(randomInt(rng, -30, 30));
    cases.push({ category: "large", description: "Large 5-elem " + i, inputs: { nums: Array.from(set) } });
  }

  return cases;
}
`
  });

  // 75. subsets-ii
  await writeProblem("subsets-ii", {
    problemMd: `# Subsets II

Given an integer array \`nums\` that may contain **duplicates**, return all possible subsets (the power set).

The solution set **must not** contain duplicate subsets. Return the subsets sorted in canonical order:
1. Subsets of smaller size appear before subsets of larger size.
2. For subsets of the same size, sort them element-by-element in ascending order.
3. Elements within each subset must be sorted in ascending order.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 2, 2]
Output:
1
2
1 2
2 2
1 2 2
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [0]
Output:
0
\`\`\`

### Constraints

- \`1 <= nums.length <= 10\`
- \`-10 <= nums[i] <= 10\`
`,
    structureMd: `Problem Name: "Subsets II"
Difficulty: MEDIUM
Topics: Array, Backtracking, Bit Manipulation
Function Name: subsetsWithDup

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: list<list<int>> result
`,
    solutionJs: `export function solve(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const res = [];
  const curr = [];

  function backtrack(idx) {
    res.push([...curr]);
    for (let i = idx; i < sorted.length; i++) {
      if (i > idx && sorted[i] === sorted[i - 1]) continue;
      curr.push(sorted[i]);
      backtrack(i + 1);
      curr.pop();
    }
  }

  backtrack(0);

  for (const s of res) s.sort((a, b) => a - b);
  res.sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  });

  return res;
}
`,
    baselineJs: `export function solve(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const res = [];
  const seen = new Set();
  const n = sorted.length;

  for (let mask = 0; mask < (1 << n); mask++) {
    const sub = [];
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) sub.push(sorted[i]);
    }
    const key = sub.join(",");
    if (!seen.has(key)) {
      seen.add(key);
      res.push(sub);
    }
  }

  res.sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  });

  return res;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 2, 2] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0] } });
  cases.push({ category: "basic", description: "All identical", inputs: { nums: [1, 1, 1] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 3, 2] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const v = randomInt(rng, -5, 5);
    cases.push({ category: "edge", description: "Two duplicates " + i, inputs: { nums: [v, v] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const v = randomInt(rng, -10, 10);
    cases.push({ category: "corner", description: "Single " + i, inputs: { nums: [v] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const nums = [
      randomInt(rng, 1, 4),
      randomInt(rng, 1, 4),
      randomInt(rng, 1, 4),
      randomInt(rng, 1, 4)
    ];
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const nums = [
      randomInt(rng, 1, 5),
      randomInt(rng, 1, 5),
      randomInt(rng, 1, 5),
      randomInt(rng, 1, 5),
      randomInt(rng, 1, 5),
      randomInt(rng, 1, 5)
    ];
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}
`
  });

  // 76. word-search
  await writeProblem("word-search", {
    problemMd: `# Word Search

Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` if \`word\` exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

### Examples

**Example 1:**
\`\`\`
Input:
board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
word = "ABCCED"
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input:
board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
word = "SEE"
Output: 1
\`\`\`

**Example 3:**
\`\`\`
Input:
board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
word = "ABCB"
Output: 0
\`\`\`

### Constraints

- \`m == board.length\`
- \`n = board[i].length\`
- \`1 <= m, n <= 6\`
- \`1 <= word.length <= 15\`
- \`board\` and \`word\` consist of only lowercase and uppercase English letters.
`,
    structureMd: `Problem Name: "Word Search"
Difficulty: MEDIUM
Topics: Array, String, Backtracking, Matrix
Function Name: exist

Input Structure:
Input Field: list<list<String>> board
Input Field: String word

Output Structure:
Output Field: bool result
`,
    solutionJs: `export function solve(board, word) {
  const m = board.length;
  const n = board[0].length;

  function dfs(r, c, idx) {
    if (idx === word.length) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[idx]) return false;

    const temp = board[r][c];
    board[r][c] = "#";
    const res = dfs(r + 1, c, idx + 1) || dfs(r - 1, c, idx + 1) || dfs(r, c + 1, idx + 1) || dfs(r, c - 1, idx + 1);
    board[r][c] = temp;
    return res;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }

  return false;
}
`,
    baselineJs: `export function solve(board, word) {
  const m = board.length;
  const n = board[0].length;
  const visited = Array.from({ length: m }, () => Array(n).fill(false));

  function search(r, c, idx) {
    if (idx === word.length) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || visited[r][c] || board[r][c] !== word[idx]) return false;
    visited[r][c] = true;
    const ok = search(r + 1, c, idx + 1) || search(r - 1, c, idx + 1) || search(r, c + 1, idx + 1) || search(r, c - 1, idx + 1);
    visited[r][c] = false;
    return ok;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (search(i, j, 0)) return true;
    }
  }
  return false;
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

const letters = "ABCDEF";

function randomGrid(rng, m, n) {
  const grid = [];
  for (let r = 0; r < m; r++) {
    const row = [];
    for (let c = 0; c < n; c++) row.push(letters[randomInt(rng, 0, letters.length - 1)]);
    grid.push(row);
  }
  return grid;
}

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: {
      board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
      word: "ABCCED"
    }
  });

  cases.push({
    category: "basic",
    description: "Example 2",
    inputs: {
      board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
      word: "SEE"
    }
  });

  cases.push({
    category: "basic",
    description: "Example 3",
    inputs: {
      board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],
      word: "ABCB"
    }
  });

  for (let i = 3; i < 10; i++) {
    const grid = randomGrid(rng, 3, 3);
    const word = grid[0][0] + grid[0][1] + grid[1][1];
    cases.push({ category: "basic", description: "Basic " + i, inputs: { board: grid, word } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const grid = [["A"]];
    cases.push({ category: "edge", description: "1x1 grid " + i, inputs: { board: grid, word: i % 2 === 0 ? "A" : "B" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const grid = [["A", "A"], ["A", "A"]];
    cases.push({ category: "corner", description: "All A's " + i, inputs: { board: grid, word: "AAA" } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const grid = randomGrid(rng, 4, 4);
    const word = grid[1][1] + grid[1][2] + grid[2][2];
    cases.push({ category: "random", description: "Random " + i, inputs: { board: grid, word: rng() > 0.3 ? word : "ZZZ" } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const grid = randomGrid(rng, 5, 5);
    const word = grid[0][0] + grid[1][0] + grid[2][0] + grid[2][1];
    cases.push({ category: "large", description: "Large " + i, inputs: { board: grid, word: rng() > 0.3 ? word : "XYZW" } });
  }

  return cases;
}
`
  });

  // 77. palindrome-partitioning
  await writeProblem("palindrome-partitioning", {
    problemMd: `# Palindrome Partitioning

Given a string \`s\`, partition \`s\` such that every substring of the partition is a **palindrome**.

Return all possible palindrome partitionings of \`s\`.

You must return the list of partitions sorted in lexicographical order (comparing joined strings) to guarantee a unique, deterministic result.

### Examples

**Example 1:**
\`\`\`
Input: s = "aab"
Output:
a a b
aa b
\`\`\`

**Example 2:**
\`\`\`
Input: s = "a"
Output:
a
\`\`\`

### Constraints

- \`1 <= s.length <= 12\`
- \`s\` contains only lowercase English letters.
`,
    structureMd: `Problem Name: "Palindrome Partitioning"
Difficulty: MEDIUM
Topics: String, Dynamic Programming, Backtracking
Function Name: partition

Input Structure:
Input Field: String s

Output Structure:
Output Field: list<list<String>> result
`,
    solutionJs: `export function solve(s) {
  const res = [];
  const curr = [];

  function isPal(str, l, r) {
    while (l < r) {
      if (str[l] !== str[r]) return false;
      l++;
      r--;
    }
    return true;
  }

  function dfs(start) {
    if (start === s.length) {
      res.push([...curr]);
      return;
    }
    for (let end = start; end < s.length; end++) {
      if (isPal(s, start, end)) {
        curr.push(s.slice(start, end + 1));
        dfs(end + 1);
        curr.pop();
      }
    }
  }

  dfs(0);

  res.sort((a, b) => {
    const sa = a.join(",");
    const sb = b.join(",");
    return sa.localeCompare(sb);
  });

  return res;
}
`,
    baselineJs: `export function solve(s) {
  const res = [];

  function check(str) {
    return str === str.split("").reverse().join("");
  }

  function backtrack(idx, part) {
    if (idx === s.length) {
      res.push([...part]);
      return;
    }
    for (let i = idx + 1; i <= s.length; i++) {
      const sub = s.substring(idx, i);
      if (check(sub)) {
        part.push(sub);
        backtrack(i, part);
        part.pop();
      }
    }
  }

  backtrack(0, []);

  res.sort((a, b) => {
    const sa = a.join(",");
    const sb = b.join(",");
    return sa.localeCompare(sb);
  });

  return res;
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "aab" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "a" } });
  cases.push({ category: "basic", description: "All distinct", inputs: { s: "abc" } });
  cases.push({ category: "basic", description: "Palindrome word", inputs: { s: "aba" } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "abba" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single char " + i, inputs: { s: "z" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const count = 3 + (i % 3);
    cases.push({ category: "corner", description: "All same " + i, inputs: { s: "a".repeat(count) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const chars = ["a", "b", "c"];
    let str = "";
    for (let j = 0; j < 5; j++) str += pickRandom(rng, chars);
    cases.push({ category: "random", description: "Random " + i, inputs: { s: str } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const chars = ["a", "b", "c"];
    let str = "";
    for (let j = 0; j < 7; j++) str += pickRandom(rng, chars);
    cases.push({ category: "large", description: "Large " + i, inputs: { s: str } });
  }

  return cases;
}
`
  });

  // 78. letter-combinations-of-a-phone-number
  await writeProblem("letter-combinations-of-a-phone-number", {
    problemMd: `# Letter Combinations of a Phone Number

Given a string containing digits from \`2-9\` inclusive, return all possible letter combinations that the number could represent according to telephone button mappings:
- \`2\`: \`"abc"\`
- \`3\`: \`"def"\`
- \`4\`: \`"ghi"\`
- \`5\`: \`"jkl"\`
- \`6\`: \`"mno"\`
- \`7\`: \`"pqrs"\`
- \`8\`: \`"tuv"\`
- \`9\`: \`"wxyz"\`

Return the answer sorted in **alphabetical order**.

### Examples

**Example 1:**
\`\`\`
Input: digits = "23"
Output: ad ae af bd be bf cd ce cf
\`\`\`

**Example 2:**
\`\`\`
Input: digits = "2"
Output: a b c
\`\`\`

### Constraints

- \`1 <= digits.length <= 4\`
- \`digits[i]\` is a digit in the range \`['2', '9']\`.
`,
    structureMd: `Problem Name: "Letter Combinations of a Phone Number"
Difficulty: MEDIUM
Topics: Hash Table, String, Backtracking
Function Name: letterCombinations

Input Structure:
Input Field: String digits

Output Structure:
Output Field: list<String> result
`,
    solutionJs: `export function solve(digits) {
  if (!digits || digits.length === 0) return [];
  const map = {
    "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
    "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
  };

  const res = [];

  function dfs(idx, curr) {
    if (idx === digits.length) {
      res.push(curr);
      return;
    }
    const letters = map[digits[idx]];
    for (const ch of letters) {
      dfs(idx + 1, curr + ch);
    }
  }

  dfs(0, "");
  res.sort();
  return res;
}
`,
    baselineJs: `export function solve(digits) {
  if (!digits) return [];
  const map = {
    "2": ["a", "b", "c"], "3": ["d", "e", "f"], "4": ["g", "h", "i"],
    "5": ["j", "k", "l"], "6": ["m", "n", "o"], "7": ["p", "q", "r", "s"],
    "8": ["t", "u", "v"], "9": ["w", "x", "y", "z"]
  };

  let acc = [""];
  for (const d of digits) {
    const next = [];
    const letters = map[d];
    for (const prefix of acc) {
      for (const ch of letters) {
        next.push(prefix + ch);
      }
    }
    acc = next;
  }
  acc.sort();
  return acc;
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

const digitPool = ["2", "3", "4", "5", "6", "7", "8", "9"];

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { digits: "23" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { digits: "2" } });
  cases.push({ category: "basic", description: "Two 7s", inputs: { digits: "77" } });
  cases.push({ category: "basic", description: "Three digits", inputs: { digits: "234" } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { digits: pickRandom(rng, digitPool) + pickRandom(rng, digitPool) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single digit " + i, inputs: { digits: pickRandom(rng, digitPool) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Repeated " + i, inputs: { digits: "99" } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    let str = "";
    for (let j = 0; j < 3; j++) str += pickRandom(rng, digitPool);
    cases.push({ category: "random", description: "Random 3-digit " + i, inputs: { digits: str } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    let str = "";
    for (let j = 0; j < 4; j++) str += pickRandom(rng, digitPool);
    cases.push({ category: "large", description: "Large 4-digit " + i, inputs: { digits: str } });
  }

  return cases;
}
`
  });

  // 79. n-queens
  await writeProblem("n-queens", {
    problemMd: `# N-Queens

The **n-queens** puzzle is the problem of placing \`n\` queens on an \`n x n\` chessboard such that no two queens attack each other.

Given an integer \`n\`, return all distinct solutions to the **n-queens puzzle**.

Each solution contains a distinct board configuration of the n-queens' placement, where \`'Q'\` and \`'.'\` both indicate a queen and an empty space, respectively.

You must return the list of solutions sorted in **lexicographical order** row-by-row to guarantee a unique, deterministic result.

### Examples

**Example 1:**
\`\`\`
Input: n = 4
Output:
.Q.. ...Q Q... ..Q.
..Q. Q... ...Q .Q..
\`\`\`

**Example 2:**
\`\`\`
Input: n = 1
Output:
Q
\`\`\`

### Constraints

- \`n \in [1, 9]\` where solutions exist (e.g. \`n = 1\` or \`4 <= n <= 9\`).
`,
    structureMd: `Problem Name: "N-Queens"
Difficulty: HARD
Topics: Array, Backtracking
Function Name: solveNQueens

Input Structure:
Input Field: int n

Output Structure:
Output Field: list<list<String>> result
`,
    solutionJs: `export function solve(n) {
  const res = [];
  const cols = new Set();
  const diag1 = new Set(); // r - c
  const diag2 = new Set(); // r + c
  const board = Array.from({ length: n }, () => Array(n).fill("."));

  function backtrack(r) {
    if (r === n) {
      res.push(board.map(row => row.join("")));
      return;
    }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag1.has(r - c) || diag2.has(r + c)) continue;
      cols.add(c);
      diag1.add(r - c);
      diag2.add(r + c);
      board[r][c] = "Q";

      backtrack(r + 1);

      board[r][c] = ".";
      cols.delete(c);
      diag1.delete(r - c);
      diag2.delete(r + c);
    }
  }

  backtrack(0);

  res.sort((a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i].localeCompare(b[i]);
    }
    return 0;
  });

  return res;
}
`,
    baselineJs: `export function solve(n) {
  const res = [];
  const queens = []; // column index for each row

  function isValid(r, c) {
    for (let prevR = 0; prevR < r; prevR++) {
      const prevC = queens[prevR];
      if (prevC === c || Math.abs(prevC - c) === Math.abs(prevR - r)) return false;
    }
    return true;
  }

  function dfs(r) {
    if (r === n) {
      const solution = [];
      for (let i = 0; i < n; i++) {
        let row = "";
        for (let j = 0; j < n; j++) {
          row += queens[i] === j ? "Q" : ".";
        }
        solution.push(row);
      }
      res.push(solution);
      return;
    }
    for (let c = 0; c < n; c++) {
      if (isValid(r, c)) {
        queens.push(c);
        dfs(r + 1);
        queens.pop();
      }
    }
  }

  dfs(0);

  res.sort((a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i].localeCompare(b[i]);
    }
    return 0;
  });

  return res;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];

  // Valid n with solutions: 1, 4, 5, 6, 7, 8
  const validN = [1, 4, 5, 6, 7];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "n = 4", inputs: { n: 4 } });
  cases.push({ category: "basic", description: "n = 1", inputs: { n: 1 } });
  cases.push({ category: "basic", description: "n = 5", inputs: { n: 5 } });
  cases.push({ category: "basic", description: "n = 6", inputs: { n: 6 } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { n: 4 + (i % 3) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single queen " + i, inputs: { n: 1 } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner n=4 " + i, inputs: { n: 4 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = validN[i % validN.length];
    cases.push({ category: "random", description: "Random " + i, inputs: { n } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = 5 + (i % 3); // 5, 6, 7
    cases.push({ category: "large", description: "Large " + i, inputs: { n } });
  }

  return cases;
}
`
  });
}

main().catch(console.error);
