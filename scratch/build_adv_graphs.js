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
  // 93. reconstruct-itinerary
  await writeProblem("reconstruct-itinerary", {
    problemMd: `# Reconstruct Itinerary

You are given a list of airline tickets where \`tickets[i] = [fromi, toi]\` represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.

All of the tickets belong to a man who departs from \`"JFK"\`, thus, the itinerary must begin with \`"JFK"\`. If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.

- For example, the itinerary \`["JFK", "LGA"]\` has a smaller lexical order than \`["JFK", "LGB"]\`.

You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.

### Examples

**Example 1:**
\`\`\`
Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
Output: JFK MUC LHR SFO SJC
\`\`\`

**Example 2:**
\`\`\`
Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
Output: JFK ATL JFK SFO ATL SFO
\`\`\`

### Constraints

- \`1 <= tickets.length <= 100\`
- \`tickets[i].length == 2\`
- \`fromi.length == 3\`
- \`toi.length == 3\`
- \`fromi\` and \`toi\` consist of uppercase English letters.
- \`fromi != toi\`
`,
    structureMd: `Problem Name: "Reconstruct Itinerary"
Difficulty: HARD
Topics: Depth-First Search, Graph, Eulerian Circuit
Function Name: findItinerary

Input Structure:
Input Field: list<list<String>> tickets

Output Structure:
Output Field: list<String> result
`,
    solutionJs: `export function solve(tickets) {
  const adj = new Map();
  for (const [src, dst] of tickets) {
    if (!adj.has(src)) adj.set(src, []);
    adj.get(src).push(dst);
  }

  for (const list of adj.values()) {
    list.sort();
  }

  const route = [];

  function visit(airport) {
    const dests = adj.get(airport) || [];
    while (dests.length > 0) {
      const next = dests.shift();
      visit(next);
    }
    route.push(airport);
  }

  visit("JFK");
  return route.reverse();
}
`,
    baselineJs: `export function solve(tickets) {
  const sorted = [...tickets].sort((a, b) => {
    if (a[0] !== b[0]) return a[0].localeCompare(b[0]);
    return a[1].localeCompare(b[1]);
  });
  const used = Array(sorted.length).fill(false);
  let res = null;

  function dfs(curr, count, path) {
    if (res) return;
    if (count === sorted.length) {
      res = [...path];
      return;
    }
    for (let i = 0; i < sorted.length; i++) {
      if (!used[i] && sorted[i][0] === curr) {
        used[i] = true;
        path.push(sorted[i][1]);
        dfs(sorted[i][1], count + 1, path);
        path.pop();
        used[i] = false;
      }
    }
  }

  dfs("JFK", 0, ["JFK"]);
  return res || [];
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

const airports = ["JFK", "SFO", "ATL", "ORD", "LAX", "DFW", "DEN"];

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: {
      tickets: [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
    }
  });

  cases.push({
    category: "basic",
    description: "Example 2",
    inputs: {
      tickets: [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
    }
  });

  cases.push({
    category: "basic",
    description: "Single ticket",
    inputs: {
      tickets: [["JFK", "ORD"]]
    }
  });

  for (let i = 3; i < 10; i++) {
    // Eulerian walk generator
    let cur = "JFK";
    const t = [];
    for (let step = 0; step < 4; step++) {
      const next = airports[(airports.indexOf(cur) + 1 + (i % 3)) % airports.length];
      t.push([cur, next]);
      cur = next;
    }
    cases.push({ category: "basic", description: "Basic walk " + i, inputs: { tickets: t } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({
      category: "edge",
      description: "Simple loop " + i,
      inputs: { tickets: [["JFK", "ATL"], ["ATL", "JFK"]] }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({
      category: "corner",
      description: "Star pattern " + i,
      inputs: { tickets: [["JFK", "ATL"], ["ATL", "JFK"], ["JFK", "SFO"]] }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    let cur = "JFK";
    const t = [];
    for (let s = 0; s < 6; s++) {
      const pool = airports.filter(a => a !== cur);
      const next = pickRandom(rng, pool);
      t.push([cur, next]);
      cur = next;
    }
    cases.push({ category: "random", description: "Random walk " + i, inputs: { tickets: t } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    let cur = "JFK";
    const t = [];
    for (let s = 0; s < 10; s++) {
      const pool = airports.filter(a => a !== cur);
      const next = pickRandom(rng, pool);
      t.push([cur, next]);
      cur = next;
    }
    cases.push({ category: "large", description: "Large walk " + i, inputs: { tickets: t } });
  }

  return cases;
}
`
  });

  // 94. min-cost-to-connect-all-points
  await writeProblem("min-cost-to-connect-all-points", {
    problemMd: `# Min Cost to Connect All Points

You are given an array \`points\` representing integer coordinates of some points on a 2D-plane, where \`points[i] = [xi, yi]\`.

The cost of connecting two points \`[xi, yi]\` and \`[xj, yj]\` is the **Manhattan distance** between them: \`|xi - xj| + |yi - yj|\`.

Return the minimum cost to make all points connected. All points are connected if there is **exactly one** simple path between any two points.

### Examples

**Example 1:**
\`\`\`
Input: points = [[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]
Output: 20
\`\`\`

**Example 2:**
\`\`\`
Input: points = [[3, 12], [-2, 5], [-4, 1]]
Output: 18
\`\`\`

### Constraints

- \`1 <= points.length <= 100\`
- \`-1000 <= xi, yi <= 1000\`
- All pairs \`(xi, yi)\` are distinct.
`,
    structureMd: `Problem Name: "Min Cost to Connect All Points"
Difficulty: MEDIUM
Topics: Array, Graph, Minimum Spanning Tree
Function Name: minCostConnectPoints

Input Structure:
Input Field: list<list<int>> points

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(points) {
  const n = points.length;
  if (n <= 1) return 0;
  const dist = Array(n).fill(Infinity);
  const inMST = Array(n).fill(false);
  dist[0] = 0;
  let totalCost = 0;

  for (let step = 0; step < n; step++) {
    let u = -1;
    for (let i = 0; i < n; i++) {
      if (!inMST[i] && (u === -1 || dist[i] < dist[u])) {
        u = i;
      }
    }
    inMST[u] = true;
    totalCost += dist[u];

    for (let v = 0; v < n; v++) {
      if (!inMST[v]) {
        const d = Math.abs(points[u][0] - points[v][0]) + Math.abs(points[u][1] - points[v][1]);
        if (d < dist[v]) dist[v] = d;
      }
    }
  }

  return totalCost;
}
`,
    baselineJs: `export function solve(points) {
  const n = points.length;
  if (n <= 1) return 0;
  const edges = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const d = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
      edges.push([d, i, j]);
    }
  }
  edges.sort((a, b) => a[0] - b[0]);

  const parent = Array(n).fill(0).map((_, i) => i);
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  let cost = 0;
  let count = 0;
  for (const [d, u, v] of edges) {
    const ru = find(u);
    const rv = find(v);
    if (ru !== rv) {
      parent[ru] = rv;
      cost += d;
      count++;
      if (count === n - 1) break;
    }
  }

  return cost;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { points: [[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { points: [[3, 12], [-2, 5], [-4, 1]] } });
  cases.push({ category: "basic", description: "Two points", inputs: { points: [[0, 0], [1, 1]] } });

  for (let i = 3; i < 10; i++) {
    const pts = [[0, 0], [i, i], [-i, i]];
    cases.push({ category: "basic", description: "Basic " + i, inputs: { points: pts } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single point " + i, inputs: { points: [[0, 0]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Points on line " + i, inputs: { points: [[1, 0], [2, 0], [3, 0], [4, 0]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const count = randomInt(rng, 5, 12);
    const pts = [];
    const seen = new Set();
    while (pts.length < count) {
      const x = randomInt(rng, -100, 100);
      const y = randomInt(rng, -100, 100);
      const key = \`\${x},\${y}\`;
      if (!seen.has(key)) {
        seen.add(key);
        pts.push([x, y]);
      }
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { points: pts } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const count = randomInt(rng, 15, 30);
    const pts = [];
    const seen = new Set();
    while (pts.length < count) {
      const x = randomInt(rng, -500, 500);
      const y = randomInt(rng, -500, 500);
      const key = \`\${x},\${y}\`;
      if (!seen.has(key)) {
        seen.add(key);
        pts.push([x, y]);
      }
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { points: pts } });
  }

  return cases;
}
`
  });

  // 95. network-delay-time
  await writeProblem("network-delay-time", {
    problemMd: `# Network Delay Time

You are given a network of \`n\` nodes, labeled from \`1\` to \`n\`. You are also given \`times\`, a list of travel times as directed edges \`times[i] = [ui, vi, wi]\`, where \`ui\` is the source node, \`vi\` is the target node, and \`wi\` is the time it takes for a signal to travel from source to target.

We will send a signal from a given node \`k\`. Return the **minimum time** it takes for all the \`n\` nodes to receive the signal. If it is impossible for all the \`n\` nodes to receive the signal, return \`-1\`.

### Examples

**Example 1:**
\`\`\`
Input: times = [[2, 1, 1], [2, 3, 1], [3, 4, 1]], n = 4, k = 2
Output: 2
\`\`\`

**Example 2:**
\`\`\`
Input: times = [[1, 2, 1]], n = 2, k = 1
Output: 1
\`\`\`

**Example 3:**
\`\`\`
Input: times = [[1, 2, 1]], n = 2, k = 2
Output: -1
\`\`\`

### Constraints

- \`1 <= k <= n <= 100\`
- \`1 <= times.length <= 1000\`
- \`times[i].length == 3\`
- \`1 <= ui, vi <= n\`
- \`ui != vi\`
- \`0 <= wi <= 100\`
- All the pairs \`(ui, vi)\` are **unique**.
`,
    structureMd: `Problem Name: "Network Delay Time"
Difficulty: MEDIUM
Topics: Graph, Heap, Shortest Path
Function Name: networkDelayTime

Input Structure:
Input Field: list<list<int>> times
Input Field: int n
Input Field: int k

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(times, n, k) {
  const adj = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) {
    adj[u].push([v, w]);
  }

  const dist = Array(n + 1).fill(Infinity);
  dist[k] = 0;

  // Simple Dijkstra with priority array
  const visited = Array(n + 1).fill(false);

  for (let step = 0; step < n; step++) {
    let u = -1;
    for (let i = 1; i <= n; i++) {
      if (!visited[i] && (u === -1 || dist[i] < dist[u])) {
        u = i;
      }
    }
    if (dist[u] === Infinity) break;
    visited[u] = true;

    for (const [v, w] of adj[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }

  let maxTime = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    if (dist[i] > maxTime) maxTime = dist[i];
  }
  return maxTime;
}
`,
    baselineJs: `export function solve(times, n, k) {
  const dist = Array(n + 1).fill(Infinity);
  dist[k] = 0;

  for (let i = 1; i < n; i++) {
    for (const [u, v, w] of times) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }

  let ans = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    if (dist[i] > ans) ans = dist[i];
  }
  return ans;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { times: [[2, 1, 1], [2, 3, 1], [3, 4, 1]], n: 4, k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { times: [[1, 2, 1]], n: 2, k: 1 } });
  cases.push({ category: "basic", description: "Example 3 (unreachable)", inputs: { times: [[1, 2, 1]], n: 2, k: 2 } });

  for (let i = 3; i < 10; i++) {
    const times = [[1, 2, 2], [2, 3, 3], [1, 3, 6]];
    cases.push({ category: "basic", description: "Basic " + i, inputs: { times, n: 3, k: 1 } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single node " + i, inputs: { times: [], n: 1, k: 1 } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const times = [[1, 2, 10], [2, 3, 20], [3, 4, 30]];
    cases.push({ category: "corner", description: "Chain " + i, inputs: { times, n: 4, k: 1 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = randomInt(rng, 4, 8);
    const times = [];
    for (let u = 1; u < n; u++) {
      times.push([u, u + 1, randomInt(rng, 1, 15)]);
    }
    cases.push({ category: "random", description: "Random tree " + i, inputs: { times, n, k: 1 } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = randomInt(rng, 10, 20);
    const times = [];
    for (let u = 1; u < n; u++) {
      times.push([u, u + 1, randomInt(rng, 1, 20)]);
      if (u > 1 && rng() > 0.5) times.push([1, u, randomInt(rng, 10, 50)]);
    }
    cases.push({ category: "large", description: "Large network " + i, inputs: { times, n, k: 1 } });
  }

  return cases;
}
`
  });

  // 96. swim-in-rising-water
  await writeProblem("swim-in-rising-water", {
    problemMd: `# Swim in Rising Water

You are given an \`n x n\` integer matrix \`grid\` where each value \`grid[i][j]\` represents the elevation at that point \`(i, j)\`.

The rain starts to fall. At time \`t\`, the depth of the water everywhere is \`t\`. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most \`t\`. You can swim any distance in zero time. Of course, you must start within the boundaries of the grid at \`(0, 0)\`.

Return the minimum time until you can reach the bottom right square \`(n - 1, n - 1)\` if you start at \`(0, 0)\`.

### Examples

**Example 1:**
\`\`\`
Input:
grid = [
  [0, 2],
  [1, 3]
]
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input:
grid = [
  [0, 1, 2, 3, 4],
  [24, 23, 22, 21, 5],
  [12, 13, 14, 15, 16],
  [11, 17, 18, 19, 20],
  [10, 9, 8, 7, 6]
]
Output: 16
\`\`\`

### Constraints

- \`n == grid.length\`
- \`n == grid[i].length\`
- \`1 <= n <= 30\`
- \`0 <= grid[i][j] < n^2\`
- Each value \`grid[i][j]\` is **unique**.
`,
    structureMd: `Problem Name: "Swim in Rising Water"
Difficulty: HARD
Topics: Binary Search, Depth-First Search, Heap, Matrix
Function Name: swimInWater

Input Structure:
Input Field: list<list<int>> grid

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(grid) {
  const n = grid.length;
  let low = Math.max(grid[0][0], grid[n - 1][n - 1]);
  let high = n * n - 1;

  function canReach(t) {
    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    const q = [[0, 0]];
    visited[0][0] = true;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    while (q.length > 0) {
      const [r, c] = q.shift();
      if (r === n - 1 && c === n - 1) return true;
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc] && grid[nr][nc] <= t) {
          visited[nr][nc] = true;
          q.push([nr, nc]);
        }
      }
    }
    return false;
  }

  while (low < high) {
    const mid = (low + high) >> 1;
    if (canReach(mid)) high = mid;
    else low = mid + 1;
  }

  return low;
}
`,
    baselineJs: `export function solve(grid) {
  const n = grid.length;
  // Dijkstra on grid
  const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));
  dist[0][0] = grid[0][0];
  const q = [[grid[0][0], 0, 0]];

  while (q.length > 0) {
    q.sort((a, b) => a[0] - b[0]);
    const [d, r, c] = q.shift();
    if (r === n - 1 && c === n - 1) return d;
    if (d > dist[r][c]) continue;

    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
        const nextD = Math.max(d, grid[nr][nc]);
        if (nextD < dist[nr][nc]) {
          dist[nr][nc] = nextD;
          q.push([nextD, nr, nc]);
        }
      }
    }
  }

  return dist[n - 1][n - 1];
}
`,
    testCasesJs: `import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

function makePermGrid(rng, n) {
  const nums = Array.from({ length: n * n }, (_, i) => i);
  shuffle(rng, nums);
  const grid = [];
  for (let r = 0; r < n; r++) {
    grid.push(nums.slice(r * n, (r + 1) * n));
  }
  return grid;
}

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { grid: [[0, 2], [1, 3]] } });
  cases.push({
    category: "basic",
    description: "Example 2",
    inputs: {
      grid: [
        [0, 1, 2, 3, 4],
        [24, 23, 22, 21, 5],
        [12, 13, 14, 15, 16],
        [11, 17, 18, 19, 20],
        [10, 9, 8, 7, 6]
      ]
    }
  });

  cases.push({ category: "basic", description: "1x1 grid", inputs: { grid: [[0]] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic 2x2 " + i, inputs: { grid: makePermGrid(rng, 2) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge 1x1 " + i, inputs: { grid: [[0]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner 3x3 " + i, inputs: { grid: makePermGrid(rng, 3) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random 4x4 " + i, inputs: { grid: makePermGrid(rng, 4) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large 6x6 " + i, inputs: { grid: makePermGrid(rng, 6) } });
  }

  return cases;
}
`
  });

  // 97. alien-dictionary
  await writeProblem("alien-dictionary", {
    problemMd: `# Alien Dictionary

There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you.

You are given a list of strings \`words\` from the alien language's dictionary, where the strings in \`words\` are **sorted lexicographically** by the rules of this new language.

Return a string of the unique letters in the new alien language sorted in **lexicographically increasing order** by the new language's rules. If multiple orders are valid, return any valid order.

### Examples

**Example 1:**
\`\`\`
Input: words = ["wrt","wrf","er","ett","rftt"]
Output: wertf
\`\`\`

**Example 2:**
\`\`\`
Input: words = ["z","x"]
Output: zx
\`\`\`

### Constraints

- \`1 <= words.length <= 100\`
- \`1 <= words[i].length <= 100\`
- \`words[i]\` consists of only lowercase English letters.
`,
    structureMd: `Problem Name: "Alien Dictionary"
Difficulty: HARD
Topics: String, Graph, Topological Sort
Function Name: alienOrder

Input Structure:
Input Field: list<String> words

Output Structure:
Output Field: String result
`,
    solutionJs: `export function solve(words) {
  const adj = new Map();
  const inDegree = new Map();

  for (const w of words) {
    for (const c of w) {
      if (!adj.has(c)) adj.set(c, new Set());
      if (!inDegree.has(c)) inDegree.set(c, 0);
    }
  }

  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i];
    const w2 = words[i + 1];
    const minLen = Math.min(w1.length, w2.length);
    if (w1.length > w2.length && w1.startsWith(w2)) {
      return "";
    }
    for (let j = 0; j < minLen; j++) {
      if (w1[j] !== w2[j]) {
        if (!adj.get(w1[j]).has(w2[j])) {
          adj.get(w1[j]).add(w2[j]);
          inDegree.set(w2[j], inDegree.get(w2[j]) + 1);
        }
        break;
      }
    }
  }

  // Canonical min-queue for deterministic topological sort
  const q = [];
  for (const [char, deg] of inDegree.entries()) {
    if (deg === 0) q.push(char);
  }
  q.sort();

  let res = "";
  while (q.length > 0) {
    const c = q.shift();
    res += c;
    for (const next of adj.get(c)) {
      inDegree.set(next, inDegree.get(next) - 1);
      if (inDegree.get(next) === 0) {
        q.push(next);
        q.sort();
      }
    }
  }

  return res.length === inDegree.size ? res : "";
}
`,
    baselineJs: `export function solve(words) {
  const chars = new Set();
  for (const w of words) for (const c of w) chars.add(c);

  const graph = new Map();
  const inDeg = new Map();
  for (const c of chars) {
    graph.set(c, new Set());
    inDeg.set(c, 0);
  }

  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i], w2 = words[i + 1];
    if (w1.length > w2.length && w1.startsWith(w2)) return "";
    for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
      if (w1[j] !== w2[j]) {
        if (!graph.get(w1[j]).has(w2[j])) {
          graph.get(w1[j]).add(w2[j]);
          inDeg.set(w2[j], inDeg.get(w2[j]) + 1);
        }
        break;
      }
    }
  }

  const q = [];
  for (const [c, d] of inDeg.entries()) if (d === 0) q.push(c);
  q.sort();

  let ans = "";
  while (q.length > 0) {
    const curr = q.shift();
    ans += curr;
    for (const neighbor of graph.get(curr)) {
      inDeg.set(neighbor, inDeg.get(neighbor) - 1);
      if (inDeg.get(neighbor) === 0) {
        q.push(neighbor);
        q.sort();
      }
    }
  }

  return ans.length === chars.size ? ans : "";
}
`,
    testCasesJs: `import { randomInt, pickRandom, shuffle } from "../../../scripts/utils/prng.js";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { words: ["wrt","wrf","er","ett","rftt"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { words: ["z","x"] } });
  cases.push({ category: "basic", description: "Single word", inputs: { words: ["abc"] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { words: ["ab", "ac", "ba"] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "One char words " + i, inputs: { words: ["a", "b", "c"] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Prefix words " + i, inputs: { words: ["x", "xy", "xyz"] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const letters = alphabet.slice(0, 4).split("");
    shuffle(rng, letters);
    const orderMap = new Map();
    letters.forEach((l, idx) => orderMap.set(l, idx));

    const wList = ["a", "b", "c", "d"].sort((a, b) => orderMap.get(a) - orderMap.get(b));
    cases.push({ category: "random", description: "Random order " + i, inputs: { words: wList } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const letters = alphabet.slice(0, 6).split("");
    shuffle(rng, letters);
    const orderMap = new Map();
    letters.forEach((l, idx) => orderMap.set(l, idx));

    const pool = ["ab", "ac", "ba", "bc", "ca", "cb"].sort((w1, w2) => {
      for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
        if (w1[j] !== w2[j]) return orderMap.get(w1[j]) - orderMap.get(w2[j]);
      }
      return w1.length - w2.length;
    });
    cases.push({ category: "large", description: "Large words " + i, inputs: { words: pool } });
  }

  return cases;
}
`
  });

  // 98. cheapest-flights-within-k-stops
  await writeProblem("cheapest-flights-within-k-stops", {
    problemMd: `# Cheapest Flights Within K Stops

There are \`n\` cities connected by some number of flights. You are given an array \`flights\` where \`flights[i] = [fromi, toi, pricei]\` indicates that there is a flight from city \`fromi\` to city \`toi\` with cost \`pricei\`.

You are also given three integers \`src\`, \`dst\`, and \`k\`, return the **cheapest price** from \`src\` to \`dst\` with at most \`k\` stops. If there is no such route, return \`-1\`.

### Examples

**Example 1:**
\`\`\`
Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700
\`\`\`

**Example 2:**
\`\`\`
Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
Output: 200
\`\`\`

**Example 3:**
\`\`\`
Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
Output: 500
\`\`\`

### Constraints

- \`1 <= n <= 100\`
- \`0 <= flights.length <= (n * (n - 1) / 2)\`
- \`flights[i].length == 3\`
- \`0 <= fromi, toi < n\`
- \`fromi != toi\`
- \`1 <= pricei <= 10^4\`
- There will not be any multiple flights between two cities.
- \`0 <= src, dst, k < n\`
- \`src != dst\`
`,
    structureMd: `Problem Name: "Cheapest Flights Within K Stops"
Difficulty: MEDIUM
Topics: Dynamic Programming, Graph, Shortest Path
Function Name: findCheapestPrice

Input Structure:
Input Field: int n
Input Field: list<list<int>> flights
Input Field: int src
Input Field: int dst
Input Field: int k

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(n, flights, src, dst, k) {
  let prices = Array(n).fill(Infinity);
  prices[src] = 0;

  for (let i = 0; i <= k; i++) {
    const tmp = [...prices];
    for (const [s, d, p] of flights) {
      if (prices[s] === Infinity) continue;
      if (prices[s] + p < tmp[d]) {
        tmp[d] = prices[s] + p;
      }
    }
    prices = tmp;
  }

  return prices[dst] === Infinity ? -1 : prices[dst];
}
`,
    baselineJs: `export function solve(n, flights, src, dst, k) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v, p] of flights) {
    adj[u].push([v, p]);
  }

  // BFS with stops
  const dist = Array(n).fill(Infinity);
  dist[src] = 0;
  const q = [[src, 0, 0]]; // [u, cost, stops]

  while (q.length > 0) {
    const [u, cost, stops] = q.shift();
    if (stops > k) continue;

    for (const [v, p] of adj[u]) {
      if (cost + p < dist[v]) {
        dist[v] = cost + p;
        q.push([v, cost + p, stops + 1]);
      }
    }
  }

  return dist[dst] === Infinity ? -1 : dist[dst];
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: { n: 4, flights: [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src: 0, dst: 3, k: 1 }
  });
  cases.push({
    category: "basic",
    description: "Example 2",
    inputs: { n: 3, flights: [[0,1,100],[1,2,100],[0,2,500]], src: 0, dst: 2, k: 1 }
  });
  cases.push({
    category: "basic",
    description: "Example 3",
    inputs: { n: 3, flights: [[0,1,100],[1,2,100],[0,2,500]], src: 0, dst: 2, k: 0 }
  });

  for (let i = 3; i < 10; i++) {
    cases.push({
      category: "basic",
      description: "Direct flight " + i,
      inputs: { n: 3, flights: [[0, 1, 50], [1, 2, 50]], src: 0, dst: 2, k: 1 }
    });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({
      category: "edge",
      description: "No route " + i,
      inputs: { n: 3, flights: [[0, 1, 100]], src: 0, dst: 2, k: 1 }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({
      category: "corner",
      description: "Zero stops limit " + i,
      inputs: { n: 3, flights: [[0, 2, 300], [0, 1, 100], [1, 2, 100]], src: 0, dst: 2, k: 0 }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = randomInt(rng, 4, 7);
    const flights = [];
    for (let u = 0; u < n - 1; u++) {
      flights.push([u, u + 1, randomInt(rng, 10, 100)]);
    }
    cases.push({ category: "random", description: "Random chain " + i, inputs: { n, flights, src: 0, dst: n - 1, k: n - 2 } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = randomInt(rng, 8, 15);
    const flights = [];
    for (let u = 0; u < n - 1; u++) {
      flights.push([u, u + 1, randomInt(rng, 20, 150)]);
      if (u + 2 < n) flights.push([u, u + 2, randomInt(rng, 100, 300)]);
    }
    cases.push({ category: "large", description: "Large network " + i, inputs: { n, flights, src: 0, dst: n - 1, k: 3 } });
  }

  return cases;
}
`
  });
}

main().catch(console.error);
