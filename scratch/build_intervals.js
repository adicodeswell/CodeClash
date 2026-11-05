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
  // 130. insert-interval
  await writeProblem("insert-interval", {
    problemMd: `# Insert Interval

You are given an array of non-overlapping intervals \`intervals\` where \`intervals[i] = [starti, endi]\` represent the start and the end of the \`i\`-th interval and \`intervals\` is sorted in ascending order by \`starti\`. You are also given an interval \`newInterval = [start, end]\` that represents the start and end of another interval.

Insert \`newInterval\` into \`intervals\` such that \`intervals\` is still sorted in ascending order by \`starti\` and \`intervals\` still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return \`intervals\` after the insertion.

### Examples

**Example 1:**
\`\`\`
Input: intervals = [[1, 3], [6, 9]], newInterval = [2, 5]
Output:
1 5
6 9
\`\`\`

**Example 2:**
\`\`\`
Input: intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], newInterval = [4, 8]
Output:
1 2
3 10
12 16
\`\`\`

### Constraints

- \`0 <= intervals.length <= 10^4\`
- \`intervals[i].length == 2\`
- \`0 <= starti <= endi <= 10^5\`
- \`intervals\` is sorted by \`starti\` in ascending order.
- \`newInterval.length == 2\`
- \`0 <= start <= end <= 10^5\`
`,
    structureMd: `Problem Name: "Insert Interval"
Difficulty: MEDIUM
Topics: Array, Intervals
Function Name: insert

Input Structure:
Input Field: list<list<int>> intervals
Input Field: list<int> newInterval

Output Structure:
Output Field: list<list<int>> result
`,
    solutionJs: `export function solve(intervals, newInterval) {
  const result = [];
  let i = 0;
  const n = intervals.length;

  while (i < n && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);

  while (i < n) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}
`,
    baselineJs: `export function solve(intervals, newInterval) {
  const all = [...intervals, newInterval].sort((a, b) => a[0] - b[0]);
  const res = [all[0]];
  for (let i = 1; i < all.length; i++) {
    const last = res[res.length - 1];
    if (all[i][0] <= last[1]) {
      last[1] = Math.max(last[1], all[i][1]);
    } else {
      res.push(all[i]);
    }
  }
  return res;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { intervals: [[1, 3], [6, 9]], newInterval: [2, 5] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { intervals: [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], newInterval: [4, 8] } });
  cases.push({ category: "basic", description: "Empty intervals", inputs: { intervals: [], newInterval: [5, 7] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { intervals: [[1, 2], [5, 6]], newInterval: [3, 4] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Insert at front " + i, inputs: { intervals: [[10, 20]], newInterval: [1, 5] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Merge all " + i, inputs: { intervals: [[2, 3], [4, 5]], newInterval: [1, 6] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const intervals = [];
    let cur = 1;
    for (let k = 0; k < 5; k++) {
      intervals.push([cur, cur + 2]);
      cur += 4;
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { intervals, newInterval: [3, 8] } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const intervals = [];
    let cur = 1;
    for (let k = 0; k < 12; k++) {
      intervals.push([cur, cur + 3]);
      cur += 5;
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { intervals, newInterval: [7, 25] } });
  }

  return cases;
}
`
  });

  // 131. merge-intervals
  await writeProblem("merge-intervals", {
    problemMd: `# Merge Intervals

Given an array of \`intervals\` where \`intervals[i] = [starti, endi]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

### Examples

**Example 1:**
\`\`\`
Input: intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
Output:
1 6
8 10
15 18
\`\`\`

**Example 2:**
\`\`\`
Input: intervals = [[1, 4], [4, 5]]
Output:
1 5
\`\`\`

### Constraints

- \`1 <= intervals.length <= 10^4\`
- \`intervals[i].length == 2\`
- \`0 <= starti <= endi <= 10^4\`
`,
    structureMd: `Problem Name: "Merge Intervals"
Difficulty: MEDIUM
Topics: Array, Sorting, Intervals
Function Name: merge

Input Structure:
Input Field: list<list<int>> intervals

Output Structure:
Output Field: list<list<int>> result
`,
    solutionJs: `export function solve(intervals) {
  if (intervals.length <= 1) return intervals;
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const res = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const cur = sorted[i];
    const prev = res[res.length - 1];
    if (cur[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], cur[1]);
    } else {
      res.push(cur);
    }
  }

  return res;
}
`,
    baselineJs: `export function solve(intervals) {
  const arr = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const interval of arr) {
    if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
      merged.push([...interval]);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], interval[1]);
    }
  }
  return merged;
}
`,
    testCasesJs: `import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { intervals: [[1, 4], [4, 5]] } });
  cases.push({ category: "basic", description: "Single interval", inputs: { intervals: [[1, 5]] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { intervals: [[1, 4], [2, 3]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Point intervals " + i, inputs: { intervals: [[1, 1], [2, 2]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "All overlapping " + i, inputs: { intervals: [[1, 10], [2, 8], [3, 6]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const count = randomInt(rng, 5, 12);
    const intervals = [];
    for (let k = 0; k < count; k++) {
      const s = randomInt(rng, 1, 50);
      intervals.push([s, s + randomInt(rng, 1, 10)]);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { intervals } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const count = randomInt(rng, 20, 40);
    const intervals = [];
    for (let k = 0; k < count; k++) {
      const s = randomInt(rng, 1, 100);
      intervals.push([s, s + randomInt(rng, 1, 15)]);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { intervals } });
  }

  return cases;
}
`
  });

  // 132. non-overlapping-intervals
  await writeProblem("non-overlapping-intervals", {
    problemMd: `# Non-overlapping Intervals

Given an array of intervals \`intervals\` where \`intervals[i] = [starti, endi]\`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

### Examples

**Example 1:**
\`\`\`
Input: intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: intervals = [[1, 2], [1, 2], [1, 2]]
Output: 2
\`\`\`

**Example 3:**
\`\`\`
Input: intervals = [[1, 2], [2, 3]]
Output: 0
\`\`\`

### Constraints

- \`1 <= intervals.length <= 10^5\`
- \`intervals[i].length == 2\`
- \`-5 * 10^4 <= starti < endi <= 5 * 10^4\`
`,
    structureMd: `Problem Name: "Non-overlapping Intervals"
Difficulty: MEDIUM
Topics: Array, Greedy, Sorting, Intervals
Function Name: eraseOverlapIntervals

Input Structure:
Input Field: list<list<int>> intervals

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(intervals) {
  if (intervals.length <= 1) return 0;
  intervals.sort((a, b) => a[1] - b[1]);

  let count = 0;
  let prevEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < prevEnd) {
      count++;
    } else {
      prevEnd = intervals[i][1];
    }
  }

  return count;
}
`,
    baselineJs: `export function solve(intervals) {
  if (intervals.length <= 1) return 0;
  const sorted = [...intervals].sort((a, b) => a[1] - b[1]);
  let kept = 1;
  let lastEnd = sorted[0][1];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i][0] >= lastEnd) {
      kept++;
      lastEnd = sorted[i][1];
    }
  }

  return intervals.length - kept;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { intervals: [[1, 2], [2, 3], [3, 4], [1, 3]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { intervals: [[1, 2], [1, 2], [1, 2]] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { intervals: [[1, 2], [2, 3]] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { intervals: [[1, 5], [2, 3], [3, 4]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Length 1 " + i, inputs: { intervals: [[1, 2]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Already disjoint " + i, inputs: { intervals: [[1, 2], [3, 4], [5, 6]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 5, 15);
    const intervals = [];
    for (let k = 0; k < len; k++) {
      const s = randomInt(rng, 1, 30);
      intervals.push([s, s + randomInt(rng, 1, 8)]);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { intervals } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 20, 50);
    const intervals = [];
    for (let k = 0; k < len; k++) {
      const s = randomInt(rng, 1, 100);
      intervals.push([s, s + randomInt(rng, 1, 10)]);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { intervals } });
  }

  return cases;
}
`
  });

  // 133. meeting-rooms
  await writeProblem("meeting-rooms", {
    problemMd: `# Meeting Rooms

Given an array of meeting time intervals consisting of start and end times \`intervals\` where \`intervals[i] = [starti, endi]\`, determine if a person could attend all meetings.

### Examples

**Example 1:**
\`\`\`
Input: intervals = [[0, 30], [5, 10], [15, 20]]
Output: 0
\`\`\`

**Example 2:**
\`\`\`
Input: intervals = [[7, 10], [2, 4]]
Output: 1
\`\`\`

### Constraints

- \`0 <= intervals.length <= 10^4\`
- \`intervals[i].length == 2\`
- \`0 <= starti < endi <= 10^6\`
`,
    structureMd: `Problem Name: "Meeting Rooms"
Difficulty: EASY
Topics: Array, Sorting, Intervals
Function Name: canAttendMeetings

Input Structure:
Input Field: list<list<int>> intervals

Output Structure:
Output Field: bool result
`,
    solutionJs: `export function solve(intervals) {
  if (intervals.length <= 1) return true;
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) return false;
  }
  return true;
}
`,
    baselineJs: `export function solve(intervals) {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i][1] > sorted[i + 1][0]) return false;
  }
  return true;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { intervals: [[0, 30], [5, 10], [15, 20]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { intervals: [[7, 10], [2, 4]] } });
  cases.push({ category: "basic", description: "Empty meetings", inputs: { intervals: [] } });
  cases.push({ category: "basic", description: "Single meeting", inputs: { intervals: [[1, 5]] } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { intervals: [[1, 3], [3, 5], [5, 7]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Touching meetings " + i, inputs: { intervals: [[1, 2], [2, 3]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Complete overlap " + i, inputs: { intervals: [[1, 10], [2, 5]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const count = randomInt(rng, 4, 10);
    const intervals = [];
    let cur = 1;
    for (let k = 0; k < count; k++) {
      intervals.push([cur, cur + 2]);
      cur += randomInt(rng, 1, 4);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { intervals } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const count = randomInt(rng, 15, 30);
    const intervals = [];
    let cur = 1;
    for (let k = 0; k < count; k++) {
      intervals.push([cur, cur + 3]);
      cur += randomInt(rng, 2, 5);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { intervals } });
  }

  return cases;
}
`
  });

  // 134. meeting-rooms-ii
  await writeProblem("meeting-rooms-ii", {
    problemMd: `# Meeting Rooms II

Given an array of meeting time intervals consisting of start and end times \`intervals\` where \`intervals[i] = [starti, endi]\`, find the minimum number of conference rooms required.

### Examples

**Example 1:**
\`\`\`
Input: intervals = [[0, 30], [5, 10], [15, 20]]
Output: 2
\`\`\`

**Example 2:**
\`\`\`
Input: intervals = [[7, 10], [2, 4]]
Output: 1
\`\`\`

### Constraints

- \`1 <= intervals.length <= 10^4\`
- \`0 <= starti < endi <= 10^6\`
`,
    structureMd: `Problem Name: "Meeting Rooms II"
Difficulty: MEDIUM
Topics: Array, Sorting, Heap, Intervals
Function Name: minMeetingRooms

Input Structure:
Input Field: list<list<int>> intervals

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(intervals) {
  if (intervals.length === 0) return 0;
  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
  const ends = intervals.map(i => i[1]).sort((a, b) => a - b);

  let rooms = 0, endIdx = 0;
  for (let i = 0; i < starts.length; i++) {
    if (starts[i] < ends[endIdx]) {
      rooms++;
    } else {
      endIdx++;
    }
  }

  return rooms;
}
`,
    baselineJs: `export function solve(intervals) {
  const events = [];
  for (const [s, e] of intervals) {
    events.push([s, 1]);
    events.push([e, -1]);
  }
  events.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);

  let maxRooms = 0;
  let cur = 0;
  for (const [time, type] of events) {
    cur += type;
    if (cur > maxRooms) maxRooms = cur;
  }
  return maxRooms;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { intervals: [[0, 30], [5, 10], [15, 20]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { intervals: [[7, 10], [2, 4]] } });
  cases.push({ category: "basic", description: "Single meeting", inputs: { intervals: [[1, 10]] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { intervals: [[1, 4], [2, 5], [3, 6]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Consecutive " + i, inputs: { intervals: [[1, 2], [2, 3], [3, 4]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Identical meetings " + i, inputs: { intervals: [[1, 5], [1, 5], [1, 5]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 5, 15);
    const intervals = [];
    for (let k = 0; k < len; k++) {
      const s = randomInt(rng, 1, 40);
      intervals.push([s, s + randomInt(rng, 2, 10)]);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { intervals } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 20, 50);
    const intervals = [];
    for (let k = 0; k < len; k++) {
      const s = randomInt(rng, 1, 100);
      intervals.push([s, s + randomInt(rng, 5, 20)]);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { intervals } });
  }

  return cases;
}
`
  });

  // 135. minimum-interval-to-include-each-query
  await writeProblem("minimum-interval-to-include-each-query", {
    problemMd: `# Minimum Interval to Include Each Query

You are given a 2D integer array \`intervals\`, where \`intervals[i] = [lefti, righti]\` describes the \`i\`-th interval starting at \`lefti\` and ending at \`righti\` (inclusive). The **size** of an interval is its length: \`righti - lefti + 1\`.

You are also given an integer array \`queries\`. The answer to the \`j\`-th query is the **size of the smallest interval** \`i\` such that \`lefti <= queries[j] <= righti\`. If no such interval exists, the answer is \`-1\`.

Return an array containing the answers to the queries.

### Examples

**Example 1:**
\`\`\`
Input: intervals = [[1, 4], [2, 4], [3, 6], [4, 4]], queries = [2, 3, 4, 5]
Output: 3 3 1 4
\`\`\`

**Example 2:**
\`\`\`
Input: intervals = [[2, 3], [2, 5], [1, 8], [20, 25]], queries = [2, 19, 5, 22]
Output: 2 -1 4 6
\`\`\`

### Constraints

- \`1 <= intervals.length <= 10^5\`
- \`1 <= queries.length <= 10^5\`
- \`intervals[i].length == 2\`
- \`1 <= lefti <= righti <= 10^7\`
- \`1 <= queries[j] <= 10^7\`
`,
    structureMd: `Problem Name: "Minimum Interval to Include Each Query"
Difficulty: HARD
Topics: Array, Sorting, Heap, Intervals
Function Name: minInterval

Input Structure:
Input Field: list<list<int>> intervals
Input Field: list<int> queries

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(intervals, queries) {
  const sortedInts = [...intervals].sort((a, b) => a[0] - b[0]);
  const sortedQueries = queries.map((q, idx) => [q, idx]).sort((a, b) => a[0] - b[0]);

  const res = Array(queries.length).fill(-1);
  const heap = []; // [size, right]

  let i = 0;
  for (const [q, origIdx] of sortedQueries) {
    while (i < sortedInts.length && sortedInts[i][0] <= q) {
      const [l, r] = sortedInts[i];
      heap.push([r - l + 1, r]);
      i++;
    }

    heap.sort((a, b) => a[0] - b[0]);

    while (heap.length > 0 && heap[0][1] < q) {
      heap.shift();
    }

    if (heap.length > 0) {
      res[origIdx] = heap[0][0];
    }
  }

  return res;
}
`,
    baselineJs: `export function solve(intervals, queries) {
  const res = [];
  for (const q of queries) {
    let minSize = Infinity;
    for (const [l, r] of intervals) {
      if (l <= q && q <= r) {
        const size = r - l + 1;
        if (size < minSize) minSize = size;
      }
    }
    res.push(minSize === Infinity ? -1 : minSize);
  }
  return res;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: { intervals: [[1, 4], [2, 4], [3, 6], [4, 4]], queries: [2, 3, 4, 5] }
  });
  cases.push({
    category: "basic",
    description: "Example 2",
    inputs: { intervals: [[2, 3], [2, 5], [1, 8], [20, 25]], queries: [2, 19, 5, 22] }
  });

  for (let i = 2; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { intervals: [[1, 5], [3, 7]], queries: [2, 4, 6] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "No interval matches " + i, inputs: { intervals: [[10, 20]], queries: [5] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Point interval " + i, inputs: { intervals: [[5, 5]], queries: [5] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const intervals = [];
    for (let k = 0; k < 6; k++) {
      const s = randomInt(rng, 1, 30);
      intervals.push([s, s + randomInt(rng, 2, 8)]);
    }
    const queries = [randomInt(rng, 1, 35), randomInt(rng, 1, 35)];
    cases.push({ category: "random", description: "Random " + i, inputs: { intervals, queries } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const intervals = [];
    for (let k = 0; k < 15; k++) {
      const s = randomInt(rng, 1, 100);
      intervals.push([s, s + randomInt(rng, 5, 20)]);
    }
    const queries = [];
    for (let q = 0; q < 8; q++) queries.push(randomInt(rng, 1, 120));
    cases.push({ category: "large", description: "Large " + i, inputs: { intervals, queries } });
  }

  return cases;
}
`
  });
}

main().catch(console.error);
