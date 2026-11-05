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
  // 64. kth-largest-element-in-a-stream
  await writeProblem("kth-largest-element-in-a-stream", {
    problemMd: `# Kth Largest Element in a Stream

Design a class to find the \`k\`-th largest element in a stream. Note that it is the \`k\`-th largest element in the sorted order, not the \`k\`-th distinct element.

Given:
- \`k\`: The rank of the largest element to maintain.
- \`nums\`: An initial array of integers.
- \`valList\`: A stream of integers to be added sequentially.

For each integer in \`valList\`, add it to the stream and return the \`k\`-th largest element among all integers added so far.

### Examples

**Example 1:**
\`\`\`
Input:
k = 3
nums = [4, 5, 8, 2]
valList = [3, 5, 10, 9, 4]
Output: 4 5 5 8 8
\`\`\`

### Constraints

- \`1 <= k <= 10^4\`
- \`0 <= nums.length <= 10^4\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`1 <= valList.length <= 10^4\`
- \`-10^4 <= valList[i] <= 10^4\`
- At least \`k\` elements will be present when \`add\` is called.
`,
    structureMd: `Problem Name: "Kth Largest Element in a Stream"
Difficulty: EASY
Topics: Heap, Design, Data Stream
Function Name: kthLargestStream

Input Structure:
Input Field: int k
Input Field: list<int> nums
Input Field: list<int> valList

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `class MinHeap {
  constructor() {
    this.heap = [];
  }
  push(val) {
    this.heap.push(val);
    this._up(this.heap.length - 1);
  }
  pop() {
    const top = this.heap[0];
    const bottom = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this._down(0);
    }
    return top;
  }
  peek() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
  _up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.heap[i] < this.heap[p]) {
        [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
        i = p;
      } else break;
    }
  }
  _down(i) {
    const n = this.heap.length;
    while ((i << 1) + 1 < n) {
      let left = (i << 1) + 1;
      let right = left + 1;
      let smallest = left;
      if (right < n && this.heap[right] < this.heap[left]) smallest = right;
      if (this.heap[smallest] < this.heap[i]) {
        [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
        i = smallest;
      } else break;
    }
  }
}

export function solve(k, nums, valList) {
  const heap = new MinHeap();
  for (const x of nums) {
    heap.push(x);
    if (heap.size() > k) heap.pop();
  }

  const result = [];
  for (const x of valList) {
    heap.push(x);
    if (heap.size() > k) heap.pop();
    result.push(heap.peek());
  }
  return result;
}
`,
    baselineJs: `export function solve(k, nums, valList) {
  const stream = [...nums];
  const result = [];
  for (const v of valList) {
    stream.push(v);
    stream.sort((a, b) => b - a);
    result.push(stream[k - 1]);
  }
  return result;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Standard example",
    inputs: { k: 3, nums: [4, 5, 8, 2], valList: [3, 5, 10, 9, 4] }
  });
  cases.push({
    category: "basic",
    description: "k = 1 largest so far",
    inputs: { k: 1, nums: [1, 2], valList: [3, 1, 5, 4] }
  });
  cases.push({
    category: "basic",
    description: "Small stream",
    inputs: { k: 2, nums: [10], valList: [20, 5, 30] }
  });

  for (let i = 3; i < 10; i++) {
    const k = randomInt(rng, 1, 3);
    const nums = [];
    for (let j = 0; j < k; j++) nums.push(randomInt(rng, 1, 50));
    const valList = [];
    for (let j = 0; j < 5; j++) valList.push(randomInt(rng, 1, 50));
    cases.push({
      category: "basic",
      description: "Basic case " + i,
      inputs: { k, nums, valList }
    });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const k = 2;
    const nums = [randomInt(rng, -100, 100), randomInt(rng, -100, 100)];
    const valList = [];
    for (let j = 0; j < 10; j++) valList.push(randomInt(rng, -100, 100));
    cases.push({
      category: "edge",
      description: "Edge case " + i,
      inputs: { k, nums, valList }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const k = 1;
    const nums = [0];
    const valList = [randomInt(rng, 1, 10), randomInt(rng, 11, 20), randomInt(rng, 21, 30)];
    cases.push({
      category: "corner",
      description: "Corner k=1 " + i,
      inputs: { k, nums, valList }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const k = randomInt(rng, 2, 5);
    const nums = [];
    for (let j = 0; j < k + 3; j++) nums.push(randomInt(rng, -500, 500));
    const valList = [];
    for (let j = 0; j < 20; j++) valList.push(randomInt(rng, -500, 500));
    cases.push({
      category: "random",
      description: "Random stream " + i,
      inputs: { k, nums, valList }
    });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const k = randomInt(rng, 5, 10);
    const nums = [];
    for (let j = 0; j < k + 10; j++) nums.push(randomInt(rng, -1000, 1000));
    const valList = [];
    for (let j = 0; j < 40; j++) valList.push(randomInt(rng, -1000, 1000));
    cases.push({
      category: "large",
      description: "Large stream " + i,
      inputs: { k, nums, valList }
    });
  }

  return cases;
}
`
  });

  // 65. last-stone-weight
  await writeProblem("last-stone-weight", {
    problemMd: `# Last Stone Weight

You are given an array of integers \`stones\` where \`stones[i]\` is the weight of the \`i\`-th stone.

We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights \`x\` and \`y\` with \`x <= y\`. The result of this smash is:
- If \`x == y\`, both stones are destroyed.
- If \`x != y\`, the stone of weight \`x\` is destroyed, and the stone of weight \`y\` has new weight \`y - x\`.

At the end of the game, there is at most one stone left.

Return the weight of the last remaining stone. If there are no stones left, return \`0\`.

### Examples

**Example 1:**
\`\`\`
Input: stones = [2, 7, 4, 1, 8, 1]
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: stones = [1]
Output: 1
\`\`\`

### Constraints

- \`1 <= stones.length <= 100\`
- \`1 <= stones[i] <= 1000\`
`,
    structureMd: `Problem Name: "Last Stone Weight"
Difficulty: EASY
Topics: Array, Heap
Function Name: lastStoneWeight

Input Structure:
Input Field: list<int> stones

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(stones) {
  const heap = [...stones];
  // Simple max-heap or sorted array simulation
  while (heap.length > 1) {
    heap.sort((a, b) => b - a);
    const y = heap.shift();
    const x = heap.shift();
    if (y !== x) {
      heap.push(y - x);
    }
  }
  return heap.length === 1 ? heap[0] : 0;
}
`,
    baselineJs: `export function solve(stones) {
  const arr = [...stones];
  while (arr.length > 1) {
    arr.sort((a, b) => a - b);
    const y = arr.pop();
    const x = arr.pop();
    if (y > x) {
      arr.push(y - x);
    }
  }
  return arr.length === 0 ? 0 : arr[0];
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { stones: [2, 7, 4, 1, 8, 1] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { stones: [1] } });
  cases.push({ category: "basic", description: "Two equal stones", inputs: { stones: [5, 5] } });
  cases.push({ category: "basic", description: "Two unequal stones", inputs: { stones: [10, 4] } });
  for (let i = 4; i < 10; i++) {
    const count = 3 + (i % 4);
    const stones = [];
    for (let j = 0; j < count; j++) stones.push(randomInt(rng, 1, 30));
    cases.push({ category: "basic", description: "Basic " + i, inputs: { stones } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const stones = [randomInt(rng, 100, 1000)];
    cases.push({ category: "edge", description: "Single stone " + i, inputs: { stones } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const val = randomInt(rng, 1, 50);
    const stones = [val, val, val, val];
    cases.push({ category: "corner", description: "All equal stones " + i, inputs: { stones } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const count = randomInt(rng, 10, 30);
    const stones = [];
    for (let j = 0; j < count; j++) stones.push(randomInt(rng, 1, 200));
    cases.push({ category: "random", description: "Random stones " + i, inputs: { stones } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const count = randomInt(rng, 40, 70);
    const stones = [];
    for (let j = 0; j < count; j++) stones.push(randomInt(rng, 1, 1000));
    cases.push({ category: "large", description: "Large stones " + i, inputs: { stones } });
  }

  return cases;
}
`
  });

  // 66. k-closest-points-to-origin
  await writeProblem("k-closest-points-to-origin", {
    problemMd: `# K Closest Points to Origin

Given an array of \`points\` where \`points[i] = [xi, yi]\` represents a point on the X-Y plane and an integer \`k\`, return the \`k\` closest points to the origin \`(0, 0)\`.

The distance between two points on the X-Y plane is the Euclidean distance:
\`sqrt((x1 - x2)^2 + (y1 - y2)^2)\`.

You must return the list of \`k\` closest points sorted primarily by squared Euclidean distance ascending, then by \`x\` ascending, and finally by \`y\` ascending to guarantee a unique, deterministic result.

### Examples

**Example 1:**
\`\`\`
Input:
points = [[1, 3], [-2, 2]]
k = 1
Output:
-2 2
\`\`\`

**Example 2:**
\`\`\`
Input:
points = [[3, 3], [5, -1], [-2, 4]]
k = 2
Output:
3 3
-2 4
\`\`\`

### Constraints

- \`1 <= k <= points.length <= 100\`
- \`-1000 <= xi, yi <= 1000\`
`,
    structureMd: `Problem Name: "K Closest Points to Origin"
Difficulty: MEDIUM
Topics: Array, Math, Geometry, Heap
Function Name: kClosest

Input Structure:
Input Field: list<list<int>> points
Input Field: int k

Output Structure:
Output Field: list<list<int>> result
`,
    solutionJs: `export function solve(points, k) {
  const dist = (p) => p[0] * p[0] + p[1] * p[1];
  const sorted = [...points].sort((a, b) => {
    const d1 = dist(a);
    const d2 = dist(b);
    if (d1 !== d2) return d1 - d2;
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1];
  });
  return sorted.slice(0, k);
}
`,
    baselineJs: `export function solve(points, k) {
  const list = points.map(p => ({ p, d: p[0] * p[0] + p[1] * p[1] }));
  list.sort((a, b) => {
    if (a.d !== b.d) return a.d - b.d;
    if (a.p[0] !== b.p[0]) return a.p[0] - b.p[0];
    return a.p[1] - b.p[1];
  });
  return list.slice(0, k).map(x => x.p);
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { points: [[1, 3], [-2, 2]], k: 1 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { points: [[3, 3], [5, -1], [-2, 4]], k: 2 } });
  cases.push({ category: "basic", description: "Origin point", inputs: { points: [[0, 0], [1, 1], [2, 2]], k: 2 } });

  for (let i = 3; i < 10; i++) {
    const pts = [
      [randomInt(rng, -10, 10), randomInt(rng, -10, 10)],
      [randomInt(rng, -10, 10), randomInt(rng, -10, 10)],
      [randomInt(rng, -10, 10), randomInt(rng, -10, 10)],
      [randomInt(rng, -10, 10), randomInt(rng, -10, 10)]
    ];
    cases.push({ category: "basic", description: "Basic " + i, inputs: { points: pts, k: 2 } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const pts = [[randomInt(rng, -5, 5), randomInt(rng, -5, 5)]];
    cases.push({ category: "edge", description: "Single point k=1 " + i, inputs: { points: pts, k: 1 } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const pts = [
      [1, 2], [-1, 2], [1, -2], [-1, -2],
      [2, 1], [-2, 1], [2, -1], [-2, -1]
    ];
    cases.push({ category: "corner", description: "Equal distance points " + i, inputs: { points: pts, k: 4 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = randomInt(rng, 10, 25);
    const pts = [];
    for (let j = 0; j < n; j++) {
      pts.push([randomInt(rng, -100, 100), randomInt(rng, -100, 100)]);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { points: pts, k: randomInt(rng, 1, n) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = randomInt(rng, 30, 60);
    const pts = [];
    for (let j = 0; j < n; j++) {
      pts.push([randomInt(rng, -500, 500), randomInt(rng, -500, 500)]);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { points: pts, k: randomInt(rng, 5, 20) } });
  }

  return cases;
}
`
  });

  // 67. kth-largest-element-in-an-array
  await writeProblem("kth-largest-element-in-an-array", {
    problemMd: `# Kth Largest Element in an Array

Given an integer array \`nums\` and an integer \`k\`, return the \`k\`-th largest element in the array.

Note that it is the \`k\`-th largest element in sorted order, not the \`k\`-th distinct element.

Can you solve it in \`O(n)\` average time complexity?

### Examples

**Example 1:**
\`\`\`
Input: nums = [3, 2, 1, 5, 6, 4], k = 2
Output: 5
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4
Output: 4
\`\`\`

### Constraints

- \`1 <= k <= nums.length <= 10^4\`
- \`-10^4 <= nums[i] <= 10^4\`
`,
    structureMd: `Problem Name: "Kth Largest Element in an Array"
Difficulty: MEDIUM
Topics: Array, Divide and Conquer, Sorting, Heap
Function Name: findKthLargest

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums, k) {
  const sorted = [...nums].sort((a, b) => b - a);
  return sorted[k - 1];
}
`,
    baselineJs: `export function solve(nums, k) {
  const arr = [...nums];
  arr.sort((a, b) => a - b);
  return arr[arr.length - k];
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [3, 2, 1, 5, 6, 4], k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 } });
  cases.push({ category: "basic", description: "Single element", inputs: { nums: [42], k: 1 } });
  for (let i = 3; i < 10; i++) {
    const nums = [];
    for (let j = 0; j < 6; j++) nums.push(randomInt(rng, 1, 50));
    cases.push({ category: "basic", description: "Basic " + i, inputs: { nums, k: randomInt(rng, 1, 6) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const nums = [randomInt(rng, -100, 100)];
    cases.push({ category: "edge", description: "Length 1 " + i, inputs: { nums, k: 1 } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const v = randomInt(rng, -50, 50);
    const nums = [v, v, v, v, v];
    cases.push({ category: "corner", description: "All equal elements " + i, inputs: { nums, k: randomInt(rng, 1, 5) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = randomInt(rng, 15, 40);
    const nums = [];
    for (let j = 0; j < n; j++) nums.push(randomInt(rng, -500, 500));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums, k: randomInt(rng, 1, n) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = randomInt(rng, 50, 100);
    const nums = [];
    for (let j = 0; j < n; j++) nums.push(randomInt(rng, -1000, 1000));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums, k: randomInt(rng, 1, n) } });
  }

  return cases;
}
`
  });

  // 68. task-scheduler
  await writeProblem("task-scheduler", {
    problemMd: `# Task Scheduler

Given a characters array \`tasks\`, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer \`n\` that represents the cooldown period between two **same tasks** (the same letter in the CPU). That is, there must be at least \`n\` units of time between any two identical tasks.

Return the least number of units of times that the CPU will take to finish all the given tasks.

### Examples

**Example 1:**
\`\`\`
Input: tasks = ["A", "A", "A", "B", "B", "B"], n = 2
Output: 8
\`\`\`

**Example 2:**
\`\`\`
Input: tasks = ["A", "C", "A", "B", "D", "B"], n = 1
Output: 6
\`\`\`

### Constraints

- \`1 <= tasks.length <= 10^4\`
- \`tasks[i]\` is an uppercase English letter.
- \`0 <= n <= 100\`
`,
    structureMd: `Problem Name: "Task Scheduler"
Difficulty: MEDIUM
Topics: Array, Hash Table, Greedy, Heap
Function Name: leastInterval

Input Structure:
Input Field: list<String> tasks
Input Field: int n

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(tasks, n) {
  const counts = {};
  for (const t of tasks) counts[t] = (counts[t] || 0) + 1;
  const vals = Object.values(counts);
  const maxFreq = Math.max(...vals);
  const countMax = vals.filter(v => v === maxFreq).length;
  const ans = (maxFreq - 1) * (n + 1) + countMax;
  return Math.max(tasks.length, ans);
}
`,
    baselineJs: `export function solve(tasks, n) {
  const freq = new Map();
  for (const t of tasks) freq.set(t, (freq.get(t) || 0) + 1);
  let max = 0;
  for (const val of freq.values()) if (val > max) max = val;
  let maxCount = 0;
  for (const val of freq.values()) if (val === max) maxCount++;
  const partCount = max - 1;
  const emptySlots = partCount * (n - (maxCount - 1));
  const availableTasks = tasks.length - max * maxCount;
  const idles = Math.max(0, emptySlots - availableTasks);
  return tasks.length + idles;
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { tasks: ["A", "A", "A", "B", "B", "B"], n: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { tasks: ["A", "C", "A", "B", "D", "B"], n: 1 } });
  cases.push({ category: "basic", description: "n = 0 no cooldown", inputs: { tasks: ["A", "A", "B"], n: 0 } });
  cases.push({ category: "basic", description: "Single task", inputs: { tasks: ["A"], n: 2 } });

  for (let i = 4; i < 10; i++) {
    const tasks = [];
    const pool = ["A", "B", "C"];
    for (let j = 0; j < 8; j++) tasks.push(pickRandom(rng, pool));
    cases.push({ category: "basic", description: "Basic " + i, inputs: { tasks, n: randomInt(rng, 1, 3) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const letter = letters[i % letters.length];
    const tasks = Array(randomInt(rng, 2, 5)).fill(letter);
    cases.push({ category: "edge", description: "Identical tasks " + i, inputs: { tasks, n: randomInt(rng, 1, 4) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const tasks = [];
    for (let j = 0; j < 10; j++) tasks.push(letters[j]);
    cases.push({ category: "corner", description: "All distinct tasks " + i, inputs: { tasks, n: randomInt(rng, 1, 5) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 15, 35);
    const pool = letters.slice(0, 5).split("");
    const tasks = [];
    for (let j = 0; j < len; j++) tasks.push(pickRandom(rng, pool));
    cases.push({ category: "random", description: "Random tasks " + i, inputs: { tasks, n: randomInt(rng, 1, 4) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 40, 80);
    const pool = letters.slice(0, 8).split("");
    const tasks = [];
    for (let j = 0; j < len; j++) tasks.push(pickRandom(rng, pool));
    cases.push({ category: "large", description: "Large tasks " + i, inputs: { tasks, n: randomInt(rng, 2, 6) } });
  }

  return cases;
}
`
  });

  // 69. design-twitter
  await writeProblem("design-twitter", {
    problemMd: `# Design Twitter

Design a simplified version of a social feed service where users can post tweets, follow/unfollow another user, and see the 10 most recent tweets in their news feed.

Implement the feed operations given by \`operations\` and \`values\`:
- \`"postTweet"\`: \`values[i] = [userId, tweetId]\`. Composes a new tweet with ID \`tweetId\` by user \`userId\`. Returns \`"null"\`.
- \`"getNewsFeed"\`: \`values[i] = [userId]\`. Retrieves the 10 most recent tweet IDs in the user's news feed, posted by the user themselves or someone they follow. Tweets must be ordered from most recent to least recent, formatted as a comma-separated string (e.g. \`"5,6"\`). If the news feed is empty, returns \`"empty"\`.
- \`"follow"\`: \`values[i] = [followerId, followeeId]\`. The user with ID \`followerId\` starts following the user with ID \`followeeId\`. Returns \`"null"\`.
- \`"unfollow"\`: \`values[i] = [followerId, followeeId]\`. The user with ID \`followerId\` unfollows the user with ID \`followeeId\`. Returns \`"null"\`.

### Examples

**Example 1:**
\`\`\`
Input:
operations = ["postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
values = [[1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
Output: null 5 null null 6,5 null 5
\`\`\`

### Constraints

- \`1 <= operations.length <= 100\`
- \`1 <= userId, followerId, followeeId <= 500\`
- \`0 <= tweetId <= 10^4\`
- All the tweets have unique IDs.
- A user cannot follow themselves.
`,
    structureMd: `Problem Name: "Design Twitter"
Difficulty: MEDIUM
Topics: Hash Table, Design, Heap
Function Name: twitterOperations

Input Structure:
Input Field: list<String> operations
Input Field: list<list<int>> values

Output Structure:
Output Field: list<String> result
`,
    solutionJs: `export function solve(operations, values) {
  let time = 0;
  const tweets = []; // { time, userId, tweetId }
  const follows = new Map(); // userId -> Set of followeeId

  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const val = values[i];

    if (op === "postTweet") {
      const [userId, tweetId] = val;
      tweets.push({ time: time++, userId, tweetId });
      result.push("null");
    } else if (op === "getNewsFeed") {
      const userId = val[0];
      const followees = follows.get(userId) || new Set();
      const feed = [];
      for (let t = tweets.length - 1; t >= 0 && feed.length < 10; t--) {
        const tw = tweets[t];
        if (tw.userId === userId || followees.has(tw.userId)) {
          feed.push(tw.tweetId);
        }
      }
      result.push(feed.length > 0 ? feed.join(",") : "empty");
    } else if (op === "follow") {
      const [followerId, followeeId] = val;
      if (!follows.has(followerId)) follows.set(followerId, new Set());
      follows.get(followerId).add(followeeId);
      result.push("null");
    } else if (op === "unfollow") {
      const [followerId, followeeId] = val;
      if (follows.has(followerId)) follows.get(followerId).delete(followeeId);
      result.push("null");
    }
  }

  return result;
}
`,
    baselineJs: `export function solve(operations, values) {
  let clock = 0;
  const userTweets = new Map(); // userId -> [{ clock, tweetId }]
  const following = new Map(); // followerId -> Set(followeeId)
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const val = values[i];

    if (op === "postTweet") {
      const [u, tid] = val;
      if (!userTweets.has(u)) userTweets.set(u, []);
      userTweets.get(u).push({ clock: clock++, tweetId: tid });
      result.push("null");
    } else if (op === "getNewsFeed") {
      const u = val[0];
      const validUsers = new Set([u]);
      if (following.has(u)) {
        for (const f of following.get(u)) validUsers.add(f);
      }
      const candidates = [];
      for (const user of validUsers) {
        const twList = userTweets.get(user) || [];
        for (const tw of twList) candidates.push(tw);
      }
      candidates.sort((a, b) => b.clock - a.clock);
      const top10 = candidates.slice(0, 10).map(c => c.tweetId);
      result.push(top10.length > 0 ? top10.join(",") : "empty");
    } else if (op === "follow") {
      const [f1, f2] = val;
      if (!following.has(f1)) following.set(f1, new Set());
      following.get(f1).add(f2);
      result.push("null");
    } else if (op === "unfollow") {
      const [f1, f2] = val;
      if (following.has(f1)) following.get(f1).delete(f2);
      result.push("null");
    }
  }

  return result;
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Standard example",
    inputs: {
      operations: ["postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"],
      values: [[1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
    }
  });

  cases.push({
    category: "basic",
    description: "Empty news feed",
    inputs: {
      operations: ["getNewsFeed"],
      values: [[1]]
    }
  });

  cases.push({
    category: "basic",
    description: "Multiple tweets by same user",
    inputs: {
      operations: ["postTweet", "postTweet", "postTweet", "getNewsFeed"],
      values: [[1, 101], [1, 102], [1, 103], [1]]
    }
  });

  for (let i = 3; i < 10; i++) {
    const ops = ["postTweet", "follow", "postTweet", "getNewsFeed"];
    const vals = [[1, 200 + i], [2, 1], [2, 300 + i], [2]];
    cases.push({ category: "basic", description: "Basic " + i, inputs: { operations: ops, values: vals } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const ops = ["postTweet", "getNewsFeed", "getNewsFeed"];
    const vals = [[i, 1000 + i], [i], [i + 1]];
    cases.push({ category: "edge", description: "Unfollowed user feed " + i, inputs: { operations: ops, values: vals } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const ops = [];
    const vals = [];
    for (let k = 0; k < 12; k++) {
      ops.push("postTweet");
      vals.push([1, 5000 + k]);
    }
    ops.push("getNewsFeed");
    vals.push([1]);
    cases.push({ category: "corner", description: "More than 10 tweets " + i, inputs: { operations: ops, values: vals } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const ops = [];
    const vals = [];
    let twId = 8000 + i * 50;
    for (let k = 0; k < 20; k++) {
      const type = pickRandom(rng, ["postTweet", "getNewsFeed", "follow", "unfollow"]);
      ops.push(type);
      if (type === "postTweet") {
        vals.push([randomInt(rng, 1, 4), twId++]);
      } else if (type === "getNewsFeed") {
        vals.push([randomInt(rng, 1, 4)]);
      } else {
        const u1 = randomInt(rng, 1, 3);
        const u2 = u1 === 1 ? 2 : 1;
        vals.push([u1, u2]);
      }
    }
    cases.push({ category: "random", description: "Random actions " + i, inputs: { operations: ops, values: vals } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const ops = [];
    const vals = [];
    let twId = 15000 + i * 100;
    for (let k = 0; k < 35; k++) {
      const type = pickRandom(rng, ["postTweet", "getNewsFeed", "follow", "unfollow"]);
      ops.push(type);
      if (type === "postTweet") {
        vals.push([randomInt(rng, 1, 6), twId++]);
      } else if (type === "getNewsFeed") {
        vals.push([randomInt(rng, 1, 6)]);
      } else {
        const u1 = randomInt(rng, 1, 5);
        const u2 = randomInt(rng, 1, 5);
        vals.push([u1, u1 === u2 ? (u1 % 5) + 1 : u2]);
      }
    }
    cases.push({ category: "large", description: "Large actions " + i, inputs: { operations: ops, values: vals } });
  }

  return cases;
}
`
  });

  // 70. find-median-from-data-stream
  await writeProblem("find-median-from-data-stream", {
    problemMd: `# Find Median from Data Stream

The **median** is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

- For example, for \`arr = [2, 3, 4]\`, the median is \`3.0\`.
- For example, for \`arr = [2, 3]\`, the median is \`(2 + 3) / 2 = 2.5\`.

Implement the data structure supporting the following operations given by \`operations\` and \`values\`:
- \`"addNum"\`: \`values[i] = [num]\`. Adds the integer \`num\` from the data stream to the data structure. Returns \`"null"\`.
- \`"findMedian"\`: \`values[i] = []\`. Returns the median of all elements so far, formatted as a string rounded to one decimal place (e.g. \`"1.5"\` or \`"2.0"\`).

### Examples

**Example 1:**
\`\`\`
Input:
operations = ["addNum", "addNum", "findMedian", "addNum", "findMedian"]
values = [[1], [2], [], [3], []]
Output: null null 1.5 null 2.0
\`\`\`

### Constraints

- \`1 <= operations.length <= 100\`
- \`-10^5 <= num <= 10^5\`
- There will be at least one element in the data structure before calling \`findMedian\`.
`,
    structureMd: `Problem Name: "Find Median from Data Stream"
Difficulty: HARD
Topics: Design, Heap, Data Stream
Function Name: medianFinderOperations

Input Structure:
Input Field: list<String> operations
Input Field: list<list<int>> values

Output Structure:
Output Field: list<String> result
`,
    solutionJs: `export function solve(operations, values) {
  const nums = [];
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "addNum") {
      const val = values[i][0];
      // Binary search insert to keep sorted
      let low = 0, high = nums.length;
      while (low < high) {
        const mid = (low + high) >> 1;
        if (nums[mid] < val) low = mid + 1;
        else high = mid;
      }
      nums.splice(low, 0, val);
      result.push("null");
    } else if (op === "findMedian") {
      const n = nums.length;
      let med;
      if (n % 2 === 1) {
        med = nums[n >> 1];
      } else {
        med = (nums[(n >> 1) - 1] + nums[n >> 1]) / 2.0;
      }
      result.push(med.toFixed(1));
    }
  }

  return result;
}
`,
    baselineJs: `export function solve(operations, values) {
  const arr = [];
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "addNum") {
      arr.push(values[i][0]);
      arr.sort((a, b) => a - b);
      result.push("null");
    } else if (op === "findMedian") {
      const mid = Math.floor(arr.length / 2);
      const val = arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
      result.push(val.toFixed(1));
    }
  }

  return result;
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Standard example",
    inputs: {
      operations: ["addNum", "addNum", "findMedian", "addNum", "findMedian"],
      values: [[1], [2], [], [3], []]
    }
  });

  cases.push({
    category: "basic",
    description: "Single element",
    inputs: {
      operations: ["addNum", "findMedian"],
      values: [[5], []]
    }
  });

  for (let i = 2; i < 10; i++) {
    const ops = ["addNum", "addNum", "findMedian", "addNum", "findMedian"];
    const vals = [[randomInt(rng, 1, 20)], [randomInt(rng, 1, 20)], [], [randomInt(rng, 1, 20)], []];
    cases.push({ category: "basic", description: "Basic " + i, inputs: { operations: ops, values: vals } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const ops = ["addNum", "findMedian", "addNum", "findMedian"];
    const v1 = randomInt(rng, -100, 100);
    const v2 = randomInt(rng, -100, 100);
    cases.push({
      category: "edge",
      description: "Negative numbers " + i,
      inputs: { operations: ops, values: [[v1], [], [v2], []] }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const ops = ["addNum", "addNum", "addNum", "addNum", "findMedian"];
    const same = randomInt(rng, 1, 50);
    cases.push({
      category: "corner",
      description: "Equal elements " + i,
      inputs: { operations: ops, values: [[same], [same], [same], [same], []] }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const ops = ["addNum"];
    const vals = [[randomInt(rng, -500, 500)]];
    for (let k = 0; k < 20; k++) {
      if (rng() > 0.4) {
        ops.push("addNum");
        vals.push([randomInt(rng, -500, 500)]);
      } else {
        ops.push("findMedian");
        vals.push([]);
      }
    }
    cases.push({ category: "random", description: "Random stream " + i, inputs: { operations: ops, values: vals } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const ops = ["addNum"];
    const vals = [[randomInt(rng, -1000, 1000)]];
    for (let k = 0; k < 40; k++) {
      if (rng() > 0.4) {
        ops.push("addNum");
        vals.push([randomInt(rng, -1000, 1000)]);
      } else {
        ops.push("findMedian");
        vals.push([]);
      }
    }
    cases.push({ category: "large", description: "Large stream " + i, inputs: { operations: ops, values: vals } });
  }

  return cases;
}
`
  });
}

main().catch(console.error);
