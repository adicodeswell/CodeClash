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
  // 122. maximum-subarray
  await writeProblem("maximum-subarray", {
    problemMd: `# Maximum Subarray

Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.

### Examples

**Example 1:**
\`\`\`
Input: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1]
Output: 1
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [5, 4, -1, 7, 8]
Output: 23
\`\`\`

### Constraints

- \`1 <= nums.length <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\`
`,
    structureMd: `Problem Name: "Maximum Subarray"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming, Greedy
Function Name: maxSubArray

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums) {
  let curSum = 0;
  let maxSum = nums[0];
  for (const n of nums) {
    if (curSum < 0) curSum = 0;
    curSum += n;
    if (curSum > maxSum) maxSum = curSum;
  }
  return maxSum;
}
`,
    baselineJs: `export function solve(nums) {
  let max = nums[0];
  let cur = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    max = Math.max(max, cur);
  }
  return max;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [5, 4, -1, 7, 8] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [-1, 2, -1, 3] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "All negative " + i, inputs: { nums: [-5, -2, -8, -1] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Single element " + i, inputs: { nums: [randomInt(rng, -100, 100)] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 10, 30);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, -50, 50));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 50, 100);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, -200, 200));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}
`
  });

  // 123. jump-game
  await writeProblem("jump-game", {
    problemMd: `# Jump Game

You are given an integer array \`nums\`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum jump length at that position.

Return \`true\` if you can reach the last index, or \`false\` otherwise.

### Examples

**Example 1:**
\`\`\`
Input: nums = [2, 3, 1, 1, 4]
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [3, 2, 1, 0, 4]
Output: 0
\`\`\`

### Constraints

- \`1 <= nums.length <= 10^4\`
- \`0 <= nums[i] <= 10^5\`
`,
    structureMd: `Problem Name: "Jump Game"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming, Greedy
Function Name: canJump

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: bool result
`,
    solutionJs: `export function solve(nums) {
  let goal = nums.length - 1;
  for (let i = nums.length - 2; i >= 0; i--) {
    if (i + nums[i] >= goal) {
      goal = i;
    }
  }
  return goal === 0;
}
`,
    baselineJs: `export function solve(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [2, 3, 1, 1, 4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [3, 2, 1, 0, 4] } });
  cases.push({ category: "basic", description: "Single element", inputs: { nums: [0] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 3] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Trapped at 0 " + i, inputs: { nums: [0, 1] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "All ones " + i, inputs: { nums: [1, 1, 1, 1] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 10, 25);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, 0, 4));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 30, 60);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, 1, 5));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}
`
  });

  // 124. jump-game-ii
  await writeProblem("jump-game-ii", {
    problemMd: `# Jump Game II

You are given a **0-indexed** array of integers \`nums\` of length \`n\`. You are initially positioned at \`nums[0]\`.

Each element \`nums[i]\` represents the maximum length of a forward jump from index \`i\`. In other words, if you are at \`nums[i]\`, you can jump to any \`nums[i + j]\` where:
- \`0 <= j <= nums[i]\` and \`i + j < n\`

Return the minimum number of jumps to reach \`nums[n - 1]\`. The test cases are generated such that you can reach \`nums[n - 1]\`.

### Examples

**Example 1:**
\`\`\`
Input: nums = [2, 3, 1, 1, 4]
Output: 2
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [2, 3, 0, 1, 4]
Output: 2
\`\`\`

### Constraints

- \`1 <= nums.length <= 10^4\`
- \`0 <= nums[i] <= 1000\`
- It's guaranteed that you can reach \`nums[n - 1]\`.
`,
    structureMd: `Problem Name: "Jump Game II"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming, Greedy
Function Name: jump

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums) {
  let jumps = 0, curEnd = 0, farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === curEnd) {
      jumps++;
      curEnd = farthest;
    }
  }
  return jumps;
}
`,
    baselineJs: `export function solve(nums) {
  const n = nums.length;
  const dp = Array(n).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 1; j <= nums[i] && i + j < n; j++) {
      dp[i + j] = Math.min(dp[i + j], dp[i] + 1);
    }
  }

  return dp[n - 1];
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [2, 3, 1, 1, 4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [2, 3, 0, 1, 4] } });
  cases.push({ category: "basic", description: "Length 1", inputs: { nums: [0] } });
  cases.push({ category: "basic", description: "Length 2", inputs: { nums: [1, 1] } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums: [1, 2, 3, 4] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Direct leap " + i, inputs: { nums: [10, 1, 1, 1] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "All ones " + i, inputs: { nums: [1, 1, 1, 1, 1] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 8, 20);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, 1, 4));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 30, 60);
    const nums = [];
    for (let j = 0; j < len; j++) nums.push(randomInt(rng, 1, 5));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums } });
  }

  return cases;
}
`
  });

  // 125. gas-station
  await writeProblem("gas-station", {
    problemMd: `# Gas Station

There are \`n\` gas stations along a circular route, where the amount of gas at the \`i\`-th station is \`gas[i]\`.

You have a car with an unlimited gas tank and it costs \`cost[i]\` of gas to travel from the \`i\`-th station to its next \`(i + 1)\`-th station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays \`gas\` and \`cost\`, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return \`-1\`. If there exists a solution, it is **guaranteed** to be **unique**.

### Examples

**Example 1:**
\`\`\`
Input: gas = [1, 2, 3, 4, 5], cost = [3, 4, 5, 1, 2]
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input: gas = [2, 3, 4], cost = [3, 4, 3]
Output: -1
\`\`\`

### Constraints

- \`n == gas.length == cost.length\`
- \`1 <= n <= 10^5\`
- \`0 <= gas[i], cost[i] <= 10^4\`
`,
    structureMd: `Problem Name: "Gas Station"
Difficulty: MEDIUM
Topics: Array, Greedy
Function Name: canCompleteCircuit

Input Structure:
Input Field: list<int> gas
Input Field: list<int> cost

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(gas, cost) {
  let totalSurplus = 0;
  let surplus = 0;
  let start = 0;

  for (let i = 0; i < gas.length; i++) {
    totalSurplus += gas[i] - cost[i];
    surplus += gas[i] - cost[i];
    if (surplus < 0) {
      surplus = 0;
      start = i + 1;
    }
  }

  return totalSurplus < 0 ? -1 : start;
}
`,
    baselineJs: `export function solve(gas, cost) {
  const n = gas.length;
  for (let start = 0; start < n; start++) {
    let tank = 0;
    let ok = true;
    for (let step = 0; step < n; step++) {
      const idx = (start + step) % n;
      tank += gas[idx] - cost[idx];
      if (tank < 0) {
        ok = false;
        break;
      }
    }
    if (ok) return start;
  }
  return -1;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { gas: [1, 2, 3, 4, 5], cost: [3, 4, 5, 1, 2] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { gas: [2, 3, 4], cost: [3, 4, 3] } });
  cases.push({ category: "basic", description: "Single station ok", inputs: { gas: [5], cost: [4] } });
  cases.push({ category: "basic", description: "Single station not ok", inputs: { gas: [3], cost: [5] } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { gas: [3, 1, 1], cost: [1, 2, 2] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Exact balance " + i, inputs: { gas: [2, 2], cost: [2, 2] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner start at 0 " + i, inputs: { gas: [10, 1, 1], cost: [2, 2, 2] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 6, 15);
    const gas = [];
    const cost = [];
    for (let j = 0; j < len; j++) {
      gas.push(randomInt(rng, 1, 10));
      cost.push(randomInt(rng, 1, 10));
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { gas, cost } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 20, 50);
    const gas = [];
    const cost = [];
    for (let j = 0; j < len; j++) {
      gas.push(randomInt(rng, 5, 20));
      cost.push(randomInt(rng, 5, 20));
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { gas, cost } });
  }

  return cases;
}
`
  });

  // 126. hand-of-straights
  await writeProblem("hand-of-straights", {
    problemMd: `# Hand of Straights

Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size \`groupSize\`, and consists of \`groupSize\` consecutive cards.

Given an integer array \`hand\` where \`hand[i]\` is the value written on the \`i\`-th card and an integer \`groupSize\`, return \`true\` if she can rearrange the cards, or \`false\` otherwise.

### Examples

**Example 1:**
\`\`\`
Input: hand = [1, 2, 3, 6, 2, 3, 4, 7, 8], groupSize = 3
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: hand = [1, 2, 3, 4, 5], groupSize = 4
Output: 0
\`\`\`

### Constraints

- \`1 <= hand.length <= 10^4\`
- \`0 <= hand[i] <= 10^9\`
- \`1 <= groupSize <= hand.length\`
`,
    structureMd: `Problem Name: "Hand of Straights"
Difficulty: MEDIUM
Topics: Array, Hash Table, Greedy, Sorting
Function Name: isNStraightHand

Input Structure:
Input Field: list<int> hand
Input Field: int groupSize

Output Structure:
Output Field: bool result
`,
    solutionJs: `export function solve(hand, groupSize) {
  if (hand.length % groupSize !== 0) return false;
  const count = new Map();
  for (const x of hand) count.set(x, (count.get(x) || 0) + 1);

  const sortedKeys = Array.from(count.keys()).sort((a, b) => a - b);

  for (const k of sortedKeys) {
    const c = count.get(k);
    if (c > 0) {
      for (let i = 0; i < groupSize; i++) {
        const val = k + i;
        if ((count.get(val) || 0) < c) return false;
        count.set(val, count.get(val) - c);
      }
    }
  }

  return true;
}
`,
    baselineJs: `export function solve(hand, groupSize) {
  if (hand.length % groupSize !== 0) return false;
  const arr = [...hand].sort((a, b) => a - b);
  while (arr.length > 0) {
    const first = arr[0];
    for (let i = 0; i < groupSize; i++) {
      const target = first + i;
      const idx = arr.indexOf(target);
      if (idx === -1) return false;
      arr.splice(idx, 1);
    }
  }
  return true;
}
`,
    testCasesJs: `import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { hand: [1, 2, 3, 6, 2, 3, 4, 7, 8], groupSize: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { hand: [1, 2, 3, 4, 5], groupSize: 4 } });
  cases.push({ category: "basic", description: "groupSize = 1", inputs: { hand: [5, 1, 9], groupSize: 1 } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { hand: [1, 2, 3, 4, 5, 6], groupSize: 3 } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single group " + i, inputs: { hand: [10, 11, 12], groupSize: 3 } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Length not divisible " + i, inputs: { hand: [1, 2, 3, 4], groupSize: 3 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const hand = [];
    for (let g = 0; g < 3; g++) {
      const start = randomInt(rng, 1, 20);
      for (let j = 0; j < 3; j++) hand.push(start + j);
    }
    shuffle(rng, hand);
    cases.push({ category: "random", description: "Random valid " + i, inputs: { hand, groupSize: 3 } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const hand = [];
    for (let g = 0; g < 6; g++) {
      const start = randomInt(rng, 1, 50);
      for (let j = 0; j < 4; j++) hand.push(start + j);
    }
    shuffle(rng, hand);
    cases.push({ category: "large", description: "Large valid " + i, inputs: { hand, groupSize: 4 } });
  }

  return cases;
}
`
  });

  // 127. merge-triplets-to-form-target-triplet
  await writeProblem("merge-triplets-to-form-target-triplet", {
    problemMd: `# Merge Triplets to Form Target Triplet

A **triplet** is an array of three integers. You are given a 2D integer array \`triplets\`, where \`triplets[i] = [ai, bi, ci]\` describes the \`i\`-th triplet. You are also given an integer array \`target = [x, y, z]\` that describes the triplet you want to obtain.

To obtain \`target\`, you may apply the following operation on \`triplets\` any number of times (possibly zero):
- Choose two indices \`i\` and \`j\` and update \`triplets[j] = [max(ai, aj), max(bi, bj), max(ci, cj)]\`.

Return \`true\` if it is possible to obtain the \`target\` triplet \`[x, y, z]\` as an element of \`triplets\`, or \`false\` otherwise.

### Examples

**Example 1:**
\`\`\`
Input: triplets = [[2, 5, 3], [1, 8, 4], [1, 7, 5]], target = [2, 7, 5]
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: triplets = [[3, 4, 5], [4, 5, 6]], target = [3, 2, 5]
Output: 0
\`\`\`

**Example 3:**
\`\`\`
Input: triplets = [[2, 5, 3], [2, 3, 4], [1, 2, 5], [5, 2, 3]], target = [5, 5, 5]
Output: 1
\`\`\`

### Constraints

- \`1 <= triplets.length <= 10^5\`
- \`triplets[i].length == target.length == 3\`
- \`1 <= ai, bi, ci, x, y, z <= 1000\`
`,
    structureMd: `Problem Name: "Merge Triplets to Form Target Triplet"
Difficulty: MEDIUM
Topics: Array, Greedy
Function Name: mergeTriplets

Input Structure:
Input Field: list<list<int>> triplets
Input Field: list<int> target

Output Structure:
Output Field: bool result
`,
    solutionJs: `export function solve(triplets, target) {
  let canX = false, canY = false, canZ = false;

  for (const [a, b, c] of triplets) {
    if (a <= target[0] && b <= target[1] && c <= target[2]) {
      if (a === target[0]) canX = true;
      if (b === target[1]) canY = true;
      if (c === target[2]) canZ = true;
    }
  }

  return canX && canY && canZ;
}
`,
    baselineJs: `export function solve(triplets, target) {
  const [x, y, z] = target;
  let cur = [0, 0, 0];
  for (const t of triplets) {
    if (t[0] <= x && t[1] <= y && t[2] <= z) {
      cur = [Math.max(cur[0], t[0]), Math.max(cur[1], t[1]), Math.max(cur[2], t[2])];
    }
  }
  return cur[0] === x && cur[1] === y && cur[2] === z;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { triplets: [[2, 5, 3], [1, 8, 4], [1, 7, 5]], target: [2, 7, 5] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { triplets: [[3, 4, 5], [4, 5, 6]], target: [3, 2, 5] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { triplets: [[2, 5, 3], [2, 3, 4], [1, 2, 5], [5, 2, 3]], target: [5, 5, 5] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { triplets: [[1, 2, 3]], target: [1, 2, 3] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Exact match " + i, inputs: { triplets: [[1, 1, 1]], target: [1, 1, 1] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Exceeds target " + i, inputs: { triplets: [[5, 1, 1]], target: [4, 1, 1] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const triplets = [
      [randomInt(rng, 1, 5), randomInt(rng, 1, 5), randomInt(rng, 1, 5)],
      [randomInt(rng, 1, 5), randomInt(rng, 1, 5), randomInt(rng, 1, 5)],
      [randomInt(rng, 1, 5), randomInt(rng, 1, 5), randomInt(rng, 1, 5)]
    ];
    cases.push({ category: "random", description: "Random " + i, inputs: { triplets, target: [5, 5, 5] } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const triplets = [];
    for (let k = 0; k < 10; k++) {
      triplets.push([randomInt(rng, 1, 10), randomInt(rng, 1, 10), randomInt(rng, 1, 10)]);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { triplets, target: [10, 10, 10] } });
  }

  return cases;
}
`
  });

  // 128. partition-labels
  await writeProblem("partition-labels", {
    problemMd: `# Partition Labels

You are given a string \`s\`. We want to partition the string into as many parts as possible so that each letter appears in at most one part.

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be \`s\`.

Return a list of integers representing the size of these parts.

### Examples

**Example 1:**
\`\`\`
Input: s = "ababcbacadefegdehijhklij"
Output: 9 7 8
\`\`\`

**Example 2:**
\`\`\`
Input: s = "eccbbbbdec"
Output: 10
\`\`\`

### Constraints

- \`1 <= s.length <= 500\`
- \`s\` consists of lowercase English letters.
`,
    structureMd: `Problem Name: "Partition Labels"
Difficulty: MEDIUM
Topics: Two Pointers, String, Greedy
Function Name: partitionLabels

Input Structure:
Input Field: String s

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(s) {
  const last = {};
  for (let i = 0; i < s.length; i++) {
    last[s[i]] = i;
  }

  const res = [];
  let size = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    size++;
    end = Math.max(end, last[s[i]]);
    if (i === end) {
      res.push(size);
      size = 0;
    }
  }

  return res;
}
`,
    baselineJs: `export function solve(s) {
  const lastIndex = new Map();
  for (let i = 0; i < s.length; i++) lastIndex.set(s[i], i);

  const ans = [];
  let start = 0, maxEnd = 0;
  for (let i = 0; i < s.length; i++) {
    maxEnd = Math.max(maxEnd, lastIndex.get(s[i]));
    if (i === maxEnd) {
      ans.push(i - start + 1);
      start = i + 1;
    }
  }
  return ans;
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "ababcbacadefegdehijhklij" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "eccbbbbdec" } });
  cases.push({ category: "basic", description: "Single char", inputs: { s: "a" } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "abc" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single char repeated " + i, inputs: { s: "z".repeat(5) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Distinct letters " + i, inputs: { s: "abcdef" } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const part1 = "a".repeat(randomInt(rng, 1, 3)) + "b".repeat(randomInt(rng, 1, 3));
    const part2 = "c".repeat(randomInt(rng, 1, 3)) + "d".repeat(randomInt(rng, 1, 3));
    cases.push({ category: "random", description: "Random two parts " + i, inputs: { s: part1 + part2 } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const letters = ["a", "b", "c", "d", "e"];
    let s = "";
    for (const l of letters) s += l.repeat(randomInt(rng, 2, 6));
    cases.push({ category: "large", description: "Large parts " + i, inputs: { s } });
  }

  return cases;
}
`
  });

  // 129. valid-parenthesis-string
  await writeProblem("valid-parenthesis-string", {
    problemMd: `# Valid Parenthesis String

Given a string \`s\` containing only three types of characters: \`'('\`, \`')'\` and \`'*'\`, return \`true\` if \`s\` is **valid**.

The following rules define a **valid** string:
1. Any left parenthesis \`'('\` must have a corresponding right parenthesis \`')'\`.
2. Any right parenthesis \`')'\` must have a corresponding left parenthesis \`'('\`.
3. Left parenthesis \`'('\` must go before the corresponding right parenthesis \`')'\`.
4. \`'*'\` could be treated as a single right parenthesis \`')'\` or a single left parenthesis \`'('\` or an empty string \`""\`.

### Examples

**Example 1:**
\`\`\`
Input: s = "()"
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: s = "(*)"
Output: 1
\`\`\`

**Example 3:**
\`\`\`
Input: s = "(*))"
Output: 1
\`\`\`

### Constraints

- \`1 <= s.length <= 100\`
- \`s[i]\` is \`'('\`, \`')'\`, or \`'*'\`.
`,
    structureMd: `Problem Name: "Valid Parenthesis String"
Difficulty: MEDIUM
Topics: String, Dynamic Programming, Greedy
Function Name: checkValidString

Input Structure:
Input Field: String s

Output Structure:
Output Field: bool result
`,
    solutionJs: `export function solve(s) {
  let cmin = 0, cmax = 0;
  for (const c of s) {
    if (c === "(") {
      cmin++;
      cmax++;
    } else if (c === ")") {
      cmin--;
      cmax--;
    } else {
      cmin--;
      cmax++;
    }
    if (cmax < 0) return false;
    if (cmin < 0) cmin = 0;
  }
  return cmin === 0;
}
`,
    baselineJs: `export function solve(s) {
  let low = 0, high = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "(") {
      low++;
      high++;
    } else if (ch === ")") {
      low = Math.max(0, low - 1);
      high--;
    } else {
      low = Math.max(0, low - 1);
      high++;
    }
    if (high < 0) return false;
  }
  return low === 0;
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "()" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "(*)" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "(*))" } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { s: "(**)" } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single star " + i, inputs: { s: "*" } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Invalid start " + i, inputs: { s: ")(" } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    let s = "";
    for (let j = 0; j < 10; j++) s += pickRandom(rng, ["(", ")", "*"]);
    cases.push({ category: "random", description: "Random " + i, inputs: { s } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    let s = "";
    for (let j = 0; j < 30; j++) s += pickRandom(rng, ["(", ")", "*"]);
    cases.push({ category: "large", description: "Large " + i, inputs: { s } });
  }

  return cases;
}
`
  });
}

main().catch(console.error);
