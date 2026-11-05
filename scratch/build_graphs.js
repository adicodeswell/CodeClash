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
  // 80. number-of-islands
  await writeProblem("number-of-islands", {
    problemMd: `# Number of Islands

Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return the number of islands.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

### Examples

**Example 1:**
\`\`\`
Input:
grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input:
grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
\`\`\`

### Constraints

- \`m == grid.length\`
- \`n == grid[i].length\`
- \`1 <= m, n <= 50\`
- \`grid[i][j]\` is \`'0'\` or \`'1'\`.
`,
    structureMd: `Problem Name: "Number of Islands"
Difficulty: MEDIUM
Topics: Array, Depth-First Search, Breadth-First Search, Matrix
Function Name: numIslands

Input Structure:
Input Field: list<list<String>> grid

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const copy = grid.map(row => [...row]);
  let islands = 0;

  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || copy[r][c] !== "1") return;
    copy[r][c] = "0";
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (copy[r][c] === "1") {
        islands++;
        dfs(r, c);
      }
    }
  }

  return islands;
}
`,
    baselineJs: `export function solve(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const visited = Array.from({ length: m }, () => Array(n).fill(false));
  let count = 0;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === "1" && !visited[r][c]) {
        count++;
        const queue = [[r, c]];
        visited[r][c] = true;
        while (queue.length > 0) {
          const [cr, cc] = queue.shift();
          const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
          for (const [dr, dc] of dirs) {
            const nr = cr + dr, nc = cc + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === "1" && !visited[nr][nc]) {
              visited[nr][nc] = true;
              queue.push([nr, nc]);
            }
          }
        }
      }
    }
  }

  return count;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

function randomGrid(rng, m, n, p1 = 0.3) {
  const grid = [];
  for (let r = 0; r < m; r++) {
    const row = [];
    for (let c = 0; c < n; c++) row.push(rng() < p1 ? "1" : "0");
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
      grid: [
        ["1","1","1","1","0"],
        ["1","1","0","1","0"],
        ["1","1","0","0","0"],
        ["0","0","0","0","0"]
      ]
    }
  });

  cases.push({
    category: "basic",
    description: "Example 2",
    inputs: {
      grid: [
        ["1","1","0","0","0"],
        ["1","1","0","0","0"],
        ["0","0","1","0","0"],
        ["0","0","0","1","1"]
      ]
    }
  });

  cases.push({ category: "basic", description: "All water", inputs: { grid: [["0","0"], ["0","0"]] } });
  cases.push({ category: "basic", description: "All land", inputs: { grid: [["1","1"], ["1","1"]] } });

  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { grid: randomGrid(rng, 4, 4, 0.4) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "1xN grid " + i, inputs: { grid: randomGrid(rng, 1, 8, 0.5) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Single cell " + i, inputs: { grid: [[i % 2 === 0 ? "1" : "0"]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random 10x10 " + i, inputs: { grid: randomGrid(rng, 10, 10, 0.3) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large 20x20 " + i, inputs: { grid: randomGrid(rng, 20, 20, 0.35) } });
  }

  return cases;
}
`
  });

  // 81. max-area-of-island
  await writeProblem("max-area-of-island", {
    problemMd: `# Max Area of Island

You are given an \`m x n\` binary matrix \`grid\`. An **island** is a 4-directionally connected group of \`1\`s (representing land). You may assume all four edges of the grid are surrounded by water.

The **area** of an island is the number of cells with a value \`1\` in the island.

Return the maximum area of an island in \`grid\`. If there is no island, return \`0\`.

### Examples

**Example 1:**
\`\`\`
Input:
grid = [
  [0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,0,0,0,0,0,0,0],
  [0,1,0,0,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0]
]
Output: 6
\`\`\`

**Example 2:**
\`\`\`
Input: grid = [[0,0,0,0,0,0,0,0]]
Output: 0
\`\`\`

### Constraints

- \`m == grid.length\`
- \`n == grid[i].length\`
- \`1 <= m, n <= 50\`
- \`grid[i][j]\` is either \`0\` or \`1\`.
`,
    structureMd: `Problem Name: "Max Area of Island"
Difficulty: MEDIUM
Topics: Array, Depth-First Search, Breadth-First Search, Matrix
Function Name: maxAreaOfIsland

Input Structure:
Input Field: list<list<int>> grid

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const copy = grid.map(row => [...row]);
  let maxArea = 0;

  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || copy[r][c] !== 1) return 0;
    copy[r][c] = 0;
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (copy[r][c] === 1) {
        maxArea = Math.max(maxArea, dfs(r, c));
      }
    }
  }

  return maxArea;
}
`,
    baselineJs: `export function solve(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const visited = Array.from({ length: m }, () => Array(n).fill(false));
  let maxArea = 0;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1 && !visited[r][c]) {
        let area = 0;
        const q = [[r, c]];
        visited[r][c] = true;
        while (q.length > 0) {
          const [cr, cc] = q.shift();
          area++;
          const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
          for (const [dr, dc] of dirs) {
            const nr = cr + dr, nc = cc + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1 && !visited[nr][nc]) {
              visited[nr][nc] = true;
              q.push([nr, nc]);
            }
          }
        }
        if (area > maxArea) maxArea = area;
      }
    }
  }

  return maxArea;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

function randomGrid(rng, m, n, p1 = 0.3) {
  const grid = [];
  for (let r = 0; r < m; r++) {
    const row = [];
    for (let c = 0; c < n; c++) row.push(rng() < p1 ? 1 : 0);
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
      grid: [
        [0,0,1,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0],
        [0,1,1,0,1,0,0,0,0,0,0,0,0],
        [0,1,0,0,1,1,0,0,1,0,1,0,0],
        [0,1,0,0,1,1,0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,1,1,0,0,0,0]
      ]
    }
  });

  cases.push({ category: "basic", description: "Example 2", inputs: { grid: [[0,0,0,0,0,0,0,0]] } });
  cases.push({ category: "basic", description: "Full island", inputs: { grid: [[1,1], [1,1]] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { grid: randomGrid(rng, 4, 5, 0.4) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "1xN " + i, inputs: { grid: randomGrid(rng, 1, 10, 0.5) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "1x1 " + i, inputs: { grid: [[i % 2]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random 10x10 " + i, inputs: { grid: randomGrid(rng, 10, 10, 0.35) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large 15x15 " + i, inputs: { grid: randomGrid(rng, 15, 15, 0.4) } });
  }

  return cases;
}
`
  });

  // 82. clone-graph
  await writeProblem("clone-graph", {
    problemMd: `# Clone Graph

Given a reference of a node in a **connected** undirected graph, return a **deep copy** (clone) of the graph.

The graph is represented as an adjacency list where \`adjList[i]\` is a list of neighbors of the \`i+1\`-th node (1-indexed).

Return the cloned graph represented as its adjacency list, with each neighbor list sorted in ascending order.

### Examples

**Example 1:**
\`\`\`
Input: adjList = [[2, 4], [1, 3], [2, 4], [1, 3]]
Output:
2 4
1 3
2 4
1 3
\`\`\`

**Example 2:**
\`\`\`
Input: adjList = [[]]
Output:

\`\`\`

### Constraints

- The number of nodes in the graph is in the range \`[1, 100]\`.
- \`1 <= Node.val <= 100\`
- \`Node.val\` is unique for each node.
- There are no repeated edges and no self-loops in the graph.
- The Graph is connected and all nodes can be visited starting from the given node.
`,
    structureMd: `Problem Name: "Clone Graph"
Difficulty: MEDIUM
Topics: Hash Table, Depth-First Search, Breadth-First Search, Graph
Function Name: cloneGraph

Input Structure:
Input Field: list<list<int>> adjList

Output Structure:
Output Field: list<list<int>> result
`,
    solutionJs: `export function solve(adjList) {
  // A deep clone returns the exact same adjacency structure
  const cloned = adjList.map(neighbors => [...neighbors].sort((a, b) => a - b));
  return cloned;
}
`,
    baselineJs: `export function solve(adjList) {
  const n = adjList.length;
  const nodes = new Map();
  for (let i = 1; i <= n; i++) nodes.set(i, []);
  for (let i = 0; i < n; i++) {
    const u = i + 1;
    for (const v of adjList[i]) {
      nodes.get(u).push(v);
    }
  }
  const result = [];
  for (let i = 1; i <= n; i++) {
    const list = [...nodes.get(i)].sort((a, b) => a - b);
    result.push(list);
  }
  return result;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1 (4-cycle)", inputs: { adjList: [[2, 4], [1, 3], [2, 4], [1, 3]] } });
  cases.push({ category: "basic", description: "Two nodes connected", inputs: { adjList: [[2], [1]] } });
  cases.push({ category: "basic", description: "Triangle (3 nodes)", inputs: { adjList: [[2, 3], [1, 3], [1, 2]] } });

  for (let i = 3; i < 10; i++) {
    // Line graph of length 4
    cases.push({ category: "basic", description: "Line graph " + i, inputs: { adjList: [[2], [1, 3], [2, 4], [3]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Two node edge " + i, inputs: { adjList: [[2], [1]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    // Star graph (center = 1)
    const n = 4;
    const adj = [[2, 3, 4], [1], [1], [1]];
    cases.push({ category: "corner", description: "Star graph " + i, inputs: { adjList: adj } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = randomInt(rng, 5, 10);
    // Build spanning tree
    const adj = Array.from({ length: n }, () => []);
    for (let u = 2; u <= n; u++) {
      const p = randomInt(rng, 1, u - 1);
      adj[u - 1].push(p);
      adj[p - 1].push(u);
    }
    cases.push({ category: "random", description: "Tree graph " + i, inputs: { adjList: adj } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = randomInt(rng, 15, 25);
    const adj = Array.from({ length: n }, () => []);
    for (let u = 2; u <= n; u++) {
      const p = randomInt(rng, 1, u - 1);
      adj[u - 1].push(p);
      adj[p - 1].push(u);
    }
    cases.push({ category: "large", description: "Large tree " + i, inputs: { adjList: adj } });
  }

  return cases;
}
`
  });

  // 83. walls-and-gates
  await writeProblem("walls-and-gates", {
    problemMd: `# Walls and Gates

You are given an \`m x n\` grid \`rooms\` initialized with these three possible values:
- \`-1\`: A wall or an obstacle.
- \`0\`: A gate.
- \`2147483647\`: An empty room (\`INF\`).

Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with \`2147483647\`.

### Examples

**Example 1:**
\`\`\`
Input:
rooms = [
  [2147483647, -1, 0, 2147483647],
  [2147483647, 2147483647, 2147483647, -1],
  [2147483647, -1, 2147483647, -1],
  [0, -1, 2147483647, 2147483647]
]
Output:
3 -1 0 1
2 2 1 -1
1 -1 2 -1
0 -1 3 4
\`\`\`

### Constraints

- \`m == rooms.length\`
- \`n == rooms[i].length\`
- \`1 <= m, n <= 100\`
- \`rooms[i][j]\` is \`-1\`, \`0\`, or \`2147483647\`.
`,
    structureMd: `Problem Name: "Walls and Gates"
Difficulty: MEDIUM
Topics: Array, Breadth-First Search, Matrix
Function Name: wallsAndGates

Input Structure:
Input Field: list<list<int>> rooms

Output Structure:
Output Field: list<list<int>> result
`,
    solutionJs: `export function solve(rooms) {
  const m = rooms.length;
  const n = rooms[0].length;
  const copy = rooms.map(row => [...row]);
  const queue = [];

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (copy[r][c] === 0) queue.push([r, c]);
    }
  }

  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (queue.length > 0) {
    const [r, c] = queue.shift();
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && copy[nr][nc] === 2147483647) {
        copy[nr][nc] = copy[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }

  return copy;
}
`,
    baselineJs: `export function solve(rooms) {
  const m = rooms.length;
  const n = rooms[0].length;
  const res = rooms.map(r => [...r]);
  const q = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (res[i][j] === 0) q.push([i, j]);
    }
  }
  let head = 0;
  while (head < q.length) {
    const [r, c] = q[head++];
    const dist = res[r][c] + 1;
    const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && res[nr][nc] === 2147483647) {
        res[nr][nc] = dist;
        q.push([nr, nc]);
      }
    }
  }
  return res;
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

const INF = 2147483647;

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: {
      rooms: [
        [INF, -1, 0, INF],
        [INF, INF, INF, -1],
        [INF, -1, INF, -1],
        [0, -1, INF, INF]
      ]
    }
  });

  cases.push({ category: "basic", description: "Single gate", inputs: { rooms: [[0]] } });
  cases.push({ category: "basic", description: "Gate and room", inputs: { rooms: [[0, INF]] } });

  for (let i = 3; i < 10; i++) {
    const r = [
      [0, INF, INF],
      [INF, -1, INF],
      [INF, INF, 0]
    ];
    cases.push({ category: "basic", description: "Basic " + i, inputs: { rooms: r } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const r = [[0, -1, INF]];
    cases.push({ category: "edge", description: "1x3 rooms " + i, inputs: { rooms: r } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner all gates " + i, inputs: { rooms: [[0, 0], [0, 0]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const m = 5, n = 5;
    const r = [];
    for (let row = 0; row < m; row++) {
      const line = [];
      for (let col = 0; col < n; col++) {
        const p = rng();
        if (p < 0.15) line.push(0);
        else if (p < 0.35) line.push(-1);
        else line.push(INF);
      }
      r.push(line);
    }
    r[0][0] = 0; // ensure at least one gate
    cases.push({ category: "random", description: "Random 5x5 " + i, inputs: { rooms: r } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const m = 10, n = 10;
    const r = [];
    for (let row = 0; row < m; row++) {
      const line = [];
      for (let col = 0; col < n; col++) {
        const p = rng();
        if (p < 0.1) line.push(0);
        else if (p < 0.25) line.push(-1);
        else line.push(INF);
      }
      r.push(line);
    }
    r[0][0] = 0;
    cases.push({ category: "large", description: "Large 10x10 " + i, inputs: { rooms: r } });
  }

  return cases;
}
`
  });

  // 84. pacific-atlantic-water-flow
  await writeProblem("pacific-atlantic-water-flow", {
    problemMd: `# Pacific Atlantic Water Flow

There is an \`m x n\` rectangular island that borders both the **Pacific Ocean** and **Atlantic Ocean**. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an \`m x n\` integer matrix \`heights\` where \`heights[r][c]\` represents the height above sea level of the cell at coordinate \`(r, c)\`.

Rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is **less than or equal to** the current cell's height. Water can flow from any cell adjacent to an ocean into that ocean.

Return a 2D list of grid coordinates \`[r, c]\` where rain water can flow to **both** the Pacific and Atlantic oceans.

Sort the result coordinates primarily by row \`r\` ascending, then by column \`c\` ascending.

### Examples

**Example 1:**
\`\`\`
Input:
heights = [
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4]
]
Output:
0 4
1 3
1 4
2 2
3 0
3 1
4 0
\`\`\`

**Example 2:**
\`\`\`
Input: heights = [[1]]
Output:
0 0
\`\`\`

### Constraints

- \`m == heights.length\`
- \`n == heights[r].length\`
- \`1 <= m, n <= 50\`
- \`0 <= heights[r][c] <= 10^5\`
`,
    structureMd: `Problem Name: "Pacific Atlantic Water Flow"
Difficulty: MEDIUM
Topics: Array, Depth-First Search, Breadth-First Search, Matrix
Function Name: pacificAtlantic

Input Structure:
Input Field: list<list<int>> heights

Output Structure:
Output Field: list<list<int>> result
`,
    solutionJs: `export function solve(heights) {
  const m = heights.length;
  const n = heights[0].length;
  const pac = Array.from({ length: m }, () => Array(n).fill(false));
  const atl = Array.from({ length: m }, () => Array(n).fill(false));

  function dfs(r, c, ocean) {
    ocean[r][c] = true;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && !ocean[nr][nc] && heights[nr][nc] >= heights[r][c]) {
        dfs(nr, nc, ocean);
      }
    }
  }

  for (let r = 0; r < m; r++) {
    dfs(r, 0, pac);
    dfs(r, n - 1, atl);
  }
  for (let c = 0; c < n; c++) {
    dfs(0, c, pac);
    dfs(m - 1, c, atl);
  }

  const res = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (pac[r][c] && atl[r][c]) res.push([r, c]);
    }
  }

  res.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);
  return res;
}
`,
    baselineJs: `export function solve(heights) {
  const m = heights.length;
  const n = heights[0].length;
  const pac = Array.from({ length: m }, () => Array(n).fill(false));
  const atl = Array.from({ length: m }, () => Array(n).fill(false));

  function bfs(queue, ocean) {
    while (queue.length > 0) {
      const [r, c] = queue.shift();
      ocean[r][c] = true;
      const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && !ocean[nr][nc] && heights[nr][nc] >= heights[r][c]) {
          ocean[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
  }

  const qPac = [];
  const qAtl = [];
  for (let r = 0; r < m; r++) {
    qPac.push([r, 0]);
    qAtl.push([r, n - 1]);
  }
  for (let c = 0; c < n; c++) {
    qPac.push([0, c]);
    qAtl.push([m - 1, c]);
  }

  bfs(qPac, pac);
  bfs(qAtl, atl);

  const res = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (pac[r][c] && atl[r][c]) res.push([r, c]);
    }
  }
  res.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);
  return res;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

function randomGrid(rng, m, n) {
  const grid = [];
  for (let r = 0; r < m; r++) {
    const row = [];
    for (let c = 0; c < n; c++) row.push(randomInt(rng, 1, 20));
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
      heights: [
        [1, 2, 2, 3, 5],
        [3, 2, 3, 4, 4],
        [2, 4, 5, 3, 1],
        [6, 7, 1, 4, 5],
        [5, 1, 1, 2, 4]
      ]
    }
  });

  cases.push({ category: "basic", description: "Example 2 (1x1)", inputs: { heights: [[1]] } });
  cases.push({ category: "basic", description: "Flat 2x2", inputs: { heights: [[1, 1], [1, 1]] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { heights: randomGrid(rng, 3, 3) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "1xN " + i, inputs: { heights: randomGrid(rng, 1, 5) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner 2x2 " + i, inputs: { heights: randomGrid(rng, 2, 2) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random 6x6 " + i, inputs: { heights: randomGrid(rng, 6, 6) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large 12x12 " + i, inputs: { heights: randomGrid(rng, 12, 12) } });
  }

  return cases;
}
`
  });

  // 85. surrounded-regions
  await writeProblem("surrounded-regions", {
    problemMd: `# Surrounded Regions

Given an \`m x n\` matrix \`board\` containing \`'X'\` and \`'O'\`, capture all regions that are 4-directionally surrounded by \`'X'\`.

A region is captured by flipping all \`'O'\`s into \`'X'\`s in that surrounded region. An \`'O'\` is not flipped if it is on the border of the board or connected to an \`'O'\` on the border.

Return the modified board.

### Examples

**Example 1:**
\`\`\`
Input:
board = [
  ["X","X","X","X"],
  ["X","O","O","X"],
  ["X","X","O","X"],
  ["X","O","X","X"]
]
Output:
X X X X
X X X X
X X X X
X O X X
\`\`\`

**Example 2:**
\`\`\`
Input: board = [["X"]]
Output:
X
\`\`\`

### Constraints

- \`m == board.length\`
- \`n == board[i].length\`
- \`1 <= m, n <= 50\`
- \`board[i][j]\` is \`'X'\` or \`'O'\`.
`,
    structureMd: `Problem Name: "Surrounded Regions"
Difficulty: MEDIUM
Topics: Array, Depth-First Search, Breadth-First Search, Matrix
Function Name: solve

Input Structure:
Input Field: list<list<String>> board

Output Structure:
Output Field: list<list<String>> result
`,
    solutionJs: `export function solve(board) {
  const m = board.length;
  const n = board[0].length;
  const res = board.map(r => [...r]);

  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || res[r][c] !== "O") return;
    res[r][c] = "E";
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < m; r++) {
    dfs(r, 0);
    dfs(r, n - 1);
  }
  for (let c = 0; c < n; c++) {
    dfs(0, c);
    dfs(m - 1, c);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (res[r][c] === "O") res[r][c] = "X";
      else if (res[r][c] === "E") res[r][c] = "O";
    }
  }

  return res;
}
`,
    baselineJs: `export function solve(board) {
  const m = board.length;
  const n = board[0].length;
  const copy = board.map(r => [...r]);
  const queue = [];

  for (let r = 0; r < m; r++) {
    if (copy[r][0] === "O") { copy[r][0] = "S"; queue.push([r, 0]); }
    if (copy[r][n - 1] === "O") { copy[r][n - 1] = "S"; queue.push([r, n - 1]); }
  }
  for (let c = 0; c < n; c++) {
    if (copy[0][c] === "O") { copy[0][c] = "S"; queue.push([0, c]); }
    if (copy[m - 1][c] === "O") { copy[m - 1][c] = "S"; queue.push([m - 1, c]); }
  }

  while (queue.length > 0) {
    const [r, c] = queue.shift();
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && copy[nr][nc] === "O") {
        copy[nr][nc] = "S";
        queue.push([nr, nc]);
      }
    }
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (copy[r][c] === "S") copy[r][c] = "O";
      else copy[r][c] = "X";
    }
  }

  return copy;
}
`,
    testCasesJs: `import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

function randomBoard(rng, m, n) {
  const grid = [];
  for (let r = 0; r < m; r++) {
    const row = [];
    for (let c = 0; c < n; c++) row.push(rng() < 0.4 ? "O" : "X");
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
      board: [
        ["X","X","X","X"],
        ["X","O","O","X"],
        ["X","X","O","X"],
        ["X","O","X","X"]
      ]
    }
  });

  cases.push({ category: "basic", description: "Example 2", inputs: { board: [["X"]] } });
  cases.push({ category: "basic", description: "All X", inputs: { board: [["X","X"], ["X","X"]] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { board: randomBoard(rng, 4, 4) } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single cell " + i, inputs: { board: [[i % 2 === 0 ? "X" : "O"]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Surrounded center " + i, inputs: { board: [["X","X","X"], ["X","O","X"], ["X","X","X"]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random 8x8 " + i, inputs: { board: randomBoard(rng, 8, 8) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large 15x15 " + i, inputs: { board: randomBoard(rng, 15, 15) } });
  }

  return cases;
}
`
  });

  // 86. rotting-oranges
  await writeProblem("rotting-oranges", {
    problemMd: `# Rotting Oranges

You are given an \`m x n\` grid where each cell can have one of three values:
- \`0\` representing an empty cell,
- \`1\` representing a fresh orange, or
- \`2\` representing a rotten orange.

Every minute, any fresh orange that is **4-directionally adjacent** to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return \`-1\`.

### Examples

**Example 1:**
\`\`\`
Input:
grid = [
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1]
]
Output: 4
\`\`\`

**Example 2:**
\`\`\`
Input:
grid = [
  [2, 1, 1],
  [0, 1, 1],
  [1, 0, 1]
]
Output: -1
\`\`\`

### Constraints

- \`m == grid.length\`
- \`n == grid[i].length\`
- \`1 <= m, n <= 10\`
- \`grid[i][j]\` is \`0\`, \`1\`, or \`2\`.
`,
    structureMd: `Problem Name: "Rotting Oranges"
Difficulty: MEDIUM
Topics: Array, Breadth-First Search, Matrix
Function Name: orangesRotting

Input Structure:
Input Field: list<list<int>> grid

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const copy = grid.map(r => [...r]);
  const q = [];
  let fresh = 0;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (copy[r][c] === 2) q.push([r, c, 0]);
      else if (copy[r][c] === 1) fresh++;
    }
  }

  if (fresh === 0) return 0;
  let minutes = 0;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  let head = 0;
  while (head < q.length) {
    const [r, c, d] = q[head++];
    minutes = d;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && copy[nr][nc] === 1) {
        copy[nr][nc] = 2;
        fresh--;
        q.push([nr, nc, d + 1]);
      }
    }
  }

  return fresh === 0 ? minutes : -1;
}
`,
    baselineJs: `export function solve(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const state = grid.map(r => [...r]);
  let freshCount = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (state[r][c] === 1) freshCount++;
    }
  }
  if (freshCount === 0) return 0;

  let mins = 0;
  while (true) {
    const toRot = [];
    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        if (state[r][c] === 2) {
          const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
          for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && state[nr][nc] === 1) {
              toRot.push([nr, nc]);
            }
          }
        }
      }
    }
    if (toRot.length === 0) break;
    mins++;
    for (const [r, c] of toRot) {
      if (state[r][c] === 1) {
        state[r][c] = 2;
        freshCount--;
      }
    }
  }

  return freshCount === 0 ? mins : -1;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { grid: [[2, 1, 1], [1, 1, 0], [0, 1, 1]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { grid: [[2, 1, 1], [0, 1, 1], [1, 0, 1]] } });
  cases.push({ category: "basic", description: "No fresh oranges", inputs: { grid: [[0, 2]] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { grid: [[2, 1], [1, 1]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single orange " + i, inputs: { grid: [[i % 2 === 0 ? 2 : 1]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "All empty " + i, inputs: { grid: [[0, 0], [0, 0]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const grid = [
      [2, randomInt(rng, 0, 1), randomInt(rng, 0, 1)],
      [randomInt(rng, 0, 1), randomInt(rng, 0, 1), randomInt(rng, 0, 1)],
      [randomInt(rng, 0, 1), randomInt(rng, 0, 1), randomInt(rng, 0, 1)]
    ];
    cases.push({ category: "random", description: "Random 3x3 " + i, inputs: { grid } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const m = 6, n = 6;
    const grid = [];
    for (let r = 0; r < m; r++) {
      const row = [];
      for (let c = 0; c < n; c++) {
        row.push(rng() < 0.2 ? 2 : (rng() < 0.7 ? 1 : 0));
      }
      grid.push(row);
    }
    cases.push({ category: "large", description: "Large 6x6 " + i, inputs: { grid } });
  }

  return cases;
}
`
  });

  // 87. course-schedule
  await writeProblem("course-schedule", {
    problemMd: `# Course Schedule

There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [ai, bi]\` indicates that you **must** take course \`bi\` first if you want to take course \`ai\`.

For example, the pair \`[0, 1]\` indicates that to take course \`0\` you have to first take course \`1\`.

Return \`true\` if you can finish all courses. Otherwise, return \`false\`.

### Examples

**Example 1:**
\`\`\`
Input: numCourses = 2, prerequisites = [[1, 0]]
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: numCourses = 2, prerequisites = [[1, 0], [0, 1]]
Output: 0
\`\`\`

### Constraints

- \`1 <= numCourses <= 100\`
- \`0 <= prerequisites.length <= 100\`
- \`prerequisites[i].length == 2\`
- \`0 <= ai, bi < numCourses\`
- All the pairs prerequisites[i] are **unique**.
`,
    structureMd: `Problem Name: "Course Schedule"
Difficulty: MEDIUM
Topics: Depth-First Search, Breadth-First Search, Graph, Topological Sort
Function Name: canFinish

Input Structure:
Input Field: int numCourses
Input Field: list<list<int>> prerequisites

Output Structure:
Output Field: bool result
`,
    solutionJs: `export function solve(numCourses, prerequisites) {
  const inDegree = Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);

  for (const [dest, src] of prerequisites) {
    adj[src].push(dest);
    inDegree[dest]++;
  }

  const q = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) q.push(i);
  }

  let count = 0;
  while (q.length > 0) {
    const u = q.shift();
    count++;
    for (const v of adj[u]) {
      inDegree[v]--;
      if (inDegree[v] === 0) q.push(v);
    }
  }

  return count === numCourses;
}
`,
    baselineJs: `export function solve(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [dest, src] of prerequisites) {
    adj[src].push(dest);
  }

  // 0: unvisited, 1: visiting, 2: visited
  const state = Array(numCourses).fill(0);

  function hasCycle(u) {
    state[u] = 1;
    for (const v of adj[u]) {
      if (state[v] === 1) return true;
      if (state[v] === 0 && hasCycle(v)) return true;
    }
    state[u] = 2;
    return false;
  }

  for (let i = 0; i < numCourses; i++) {
    if (state[i] === 0) {
      if (hasCycle(i)) return false;
    }
  }

  return true;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { numCourses: 2, prerequisites: [[1, 0]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { numCourses: 2, prerequisites: [[1, 0], [0, 1]] } });
  cases.push({ category: "basic", description: "No prerequisites", inputs: { numCourses: 3, prerequisites: [] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { numCourses: 3, prerequisites: [[1, 0], [2, 1]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single course " + i, inputs: { numCourses: 1, prerequisites: [] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Cycle 3 " + i, inputs: { numCourses: 3, prerequisites: [[1, 0], [2, 1], [0, 2]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = randomInt(rng, 4, 8);
    const prereqs = [];
    for (let u = 1; u < n; u++) {
      prereqs.push([u, u - 1]);
    }
    if (rng() > 0.5) prereqs.push([0, n - 1]); // add cycle
    cases.push({ category: "random", description: "Random " + i, inputs: { numCourses: n, prerequisites: prereqs } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = randomInt(rng, 10, 20);
    const prereqs = [];
    for (let u = 1; u < n; u++) {
      prereqs.push([u, randomInt(rng, 0, u - 1)]);
    }
    cases.push({ category: "large", description: "Large DAG " + i, inputs: { numCourses: n, prerequisites: prereqs } });
  }

  return cases;
}
`
  });

  // 88. course-schedule-ii
  await writeProblem("course-schedule-ii", {
    problemMd: `# Course Schedule II

There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [ai, bi]\` indicates that you **must** take course \`bi\` first if you want to take course \`ai\`.

Return the ordering of courses you should take to finish all courses. If there are multiple valid answers, courses with smaller course IDs should be chosen first.

All test cases are guaranteed to be valid DAGs where a topological ordering exists.

### Examples

**Example 1:**
\`\`\`
Input: numCourses = 2, prerequisites = [[1, 0]]
Output: 0 1
\`\`\`

**Example 2:**
\`\`\`
Input: numCourses = 4, prerequisites = [[1, 0], [2, 0], [3, 1], [3, 2]]
Output: 0 1 2 3
\`\`\`

### Constraints

- \`1 <= numCourses <= 100\`
- \`0 <= prerequisites.length <= 100\`
- \`prerequisites[i].length == 2\`
- \`0 <= ai, bi < numCourses\`
- \`ai != bi\`
- All the pairs \`[ai, bi]\` are distinct.
`,
    structureMd: `Problem Name: "Course Schedule II"
Difficulty: MEDIUM
Topics: Depth-First Search, Breadth-First Search, Graph, Topological Sort
Function Name: findOrder

Input Structure:
Input Field: int numCourses
Input Field: list<list<int>> prerequisites

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(numCourses, prerequisites) {
  const inDegree = Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);

  for (const [dest, src] of prerequisites) {
    adj[src].push(dest);
    inDegree[dest]++;
  }

  // Min-queue for deterministic ordering
  const available = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) available.push(i);
  }
  available.sort((a, b) => a - b);

  const order = [];
  while (available.length > 0) {
    const u = available.shift();
    order.push(u);
    for (const v of adj[u]) {
      inDegree[v]--;
      if (inDegree[v] === 0) {
        available.push(v);
        available.sort((a, b) => a - b);
      }
    }
  }

  return order;
}
`,
    baselineJs: `export function solve(numCourses, prerequisites) {
  const inDegree = Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);

  for (const [dest, src] of prerequisites) {
    adj[src].push(dest);
    inDegree[dest]++;
  }

  const q = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) q.push(i);
  }
  q.sort((a, b) => a - b);

  const res = [];
  while (q.length > 0) {
    const node = q.shift();
    res.push(node);
    for (const next of adj[node]) {
      inDegree[next]--;
      if (inDegree[next] === 0) {
        q.push(next);
        q.sort((a, b) => a - b);
      }
    }
  }

  return res;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { numCourses: 2, prerequisites: [[1, 0]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { numCourses: 4, prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2]] } });
  cases.push({ category: "basic", description: "Single course", inputs: { numCourses: 1, prerequisites: [] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { numCourses: 3, prerequisites: [[2, 1], [1, 0]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Independent courses " + i, inputs: { numCourses: 3, prerequisites: [] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Star prereqs " + i, inputs: { numCourses: 4, prerequisites: [[1, 0], [2, 0], [3, 0]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = randomInt(rng, 5, 8);
    const prereqs = [];
    for (let u = 1; u < n; u++) {
      prereqs.push([u, randomInt(rng, 0, u - 1)]);
    }
    cases.push({ category: "random", description: "Random DAG " + i, inputs: { numCourses: n, prerequisites: prereqs } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = randomInt(rng, 10, 20);
    const prereqs = [];
    for (let u = 1; u < n; u++) {
      prereqs.push([u, randomInt(rng, 0, u - 1)]);
    }
    cases.push({ category: "large", description: "Large DAG " + i, inputs: { numCourses: n, prerequisites: prereqs } });
  }

  return cases;
}
`
  });

  // 89. redundant-connection
  await writeProblem("redundant-connection", {
    problemMd: `# Redundant Connection

In this problem, a tree is an **undirected graph** that is connected and has no cycles.

You are given a graph that started as a tree with \`n\` nodes labeled from \`1\` to \`n\`, with one additional edge added. The added edge has two different vertices chosen from \`1\` to \`n\`, and was not an edge that already existed. The graph is represented as an array \`edges\` of length \`n\` where \`edges[i] = [ai, bi]\` indicates that there is an edge between nodes \`ai\` and \`bi\` in the graph.

Return an edge that can be removed so that the resulting graph is a tree of \`n\` nodes. If there are multiple answers, return the answer that occurs last in the input.

### Examples

**Example 1:**
\`\`\`
Input: edges = [[1, 2], [1, 3], [2, 3]]
Output: 2 3
\`\`\`

**Example 2:**
\`\`\`
Input: edges = [[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]
Output: 1 4
\`\`\`

### Constraints

- \`n == edges.length\`
- \`3 <= n <= 100\`
- \`edges[i].length == 2\`
- \`1 <= ai < bi <= edges.length\`
- \`ai != bi\`
- There are no repeated edges.
- The given graph is connected.
`,
    structureMd: `Problem Name: "Redundant Connection"
Difficulty: MEDIUM
Topics: Depth-First Search, Breadth-First Search, Union Find, Graph
Function Name: findRedundantConnection

Input Structure:
Input Field: list<list<int>> edges

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(edges) {
  const n = edges.length;
  const parent = Array.from({ length: n + 1 }, (_, i) => i);

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  function union(x, y) {
    const rx = find(x);
    const ry = find(y);
    if (rx === ry) return false;
    parent[rx] = ry;
    return true;
  }

  for (const [u, v] of edges) {
    if (!union(u, v)) return [u, v];
  }

  return [];
}
`,
    baselineJs: `export function solve(edges) {
  const n = edges.length;
  const root = Array(n + 1).fill(0).map((_, i) => i);

  function getRoot(i) {
    while (root[i] !== i) i = root[i];
    return i;
  }

  for (const [u, v] of edges) {
    const r1 = getRoot(u);
    const r2 = getRoot(v);
    if (r1 === r2) return [u, v];
    root[r1] = r2;
  }

  return [];
}
`,
    testCasesJs: `import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { edges: [[1, 2], [1, 3], [2, 3]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { edges: [[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]] } });

  for (let i = 2; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { edges: [[1, 2], [2, 3], [3, 1]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Small 4-cycle " + i, inputs: { edges: [[1, 2], [2, 3], [3, 4], [1, 4]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Triangle at end " + i, inputs: { edges: [[1, 2], [2, 3], [3, 4], [4, 5], [1, 5]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = randomInt(rng, 5, 10);
    // Tree of size n
    const tree = [];
    for (let u = 2; u <= n; u++) {
      tree.push([randomInt(rng, 1, u - 1), u]);
    }
    // Add redundant edge
    tree.push([1, n]);
    cases.push({ category: "random", description: "Random tree+cycle " + i, inputs: { edges: tree } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = randomInt(rng, 15, 30);
    const tree = [];
    for (let u = 2; u <= n; u++) {
      tree.push([randomInt(rng, 1, u - 1), u]);
    }
    tree.push([1, n]);
    cases.push({ category: "large", description: "Large tree+cycle " + i, inputs: { edges: tree } });
  }

  return cases;
}
`
  });

  // 90. number-of-connected-components-in-an-undirected-graph
  await writeProblem("number-of-connected-components-in-an-undirected-graph", {
    problemMd: `# Number of Connected Components in an Undirected Graph

You have a graph of \`n\` nodes. You are given an integer \`n\` and an array \`edges\` where \`edges[i] = [ai, bi]\` indicates that there is an edge between \`ai\` and \`bi\` in the graph.

Return the number of connected components in the graph.

### Examples

**Example 1:**
\`\`\`
Input: n = 5, edges = [[0, 1], [1, 2], [3, 4]]
Output: 2
\`\`\`

**Example 2:**
\`\`\`
Input: n = 5, edges = [[0, 1], [1, 2], [2, 3], [3, 4]]
Output: 1
\`\`\`

### Constraints

- \`1 <= n <= 100\`
- \`0 <= edges.length <= 100\`
- \`edges[i].length == 2\`
- \`0 <= ai <= bi < n\`
- \`ai != bi\`
- There are no repeated edges.
`,
    structureMd: `Problem Name: "Number of Connected Components in an Undirected Graph"
Difficulty: MEDIUM
Topics: Depth-First Search, Breadth-First Search, Union Find, Graph
Function Name: countComponents

Input Structure:
Input Field: int n
Input Field: list<list<int>> edges

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  let comps = n;
  for (const [u, v] of edges) {
    const ru = find(u);
    const rv = find(v);
    if (ru !== rv) {
      parent[ru] = rv;
      comps--;
    }
  }

  return comps;
}
`,
    baselineJs: `export function solve(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const visited = Array(n).fill(false);
  let count = 0;

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      count++;
      const q = [i];
      visited[i] = true;
      while (q.length > 0) {
        const u = q.shift();
        for (const v of adj[u]) {
          if (!visited[v]) {
            visited[v] = true;
            q.push(v);
          }
        }
      }
    }
  }

  return count;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { n: 5, edges: [[0, 1], [1, 2], [3, 4]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { n: 5, edges: [[0, 1], [1, 2], [2, 3], [3, 4]] } });
  cases.push({ category: "basic", description: "No edges", inputs: { n: 4, edges: [] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { n: 3, edges: [[0, 1]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Single node " + i, inputs: { n: 1, edges: [] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Complete graph K3 " + i, inputs: { n: 3, edges: [[0, 1], [1, 2], [0, 2]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = randomInt(rng, 5, 12);
    const edges = [];
    for (let j = 0; j < n - 2; j++) {
      edges.push([j, j + 1]);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { n, edges } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = randomInt(rng, 15, 30);
    const edges = [];
    for (let j = 0; j < n - 4; j++) {
      edges.push([j, j + 1]);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { n, edges } });
  }

  return cases;
}
`
  });

  // 91. graph-valid-tree
  await writeProblem("graph-valid-tree", {
    problemMd: `# Graph Valid Tree

Given \`n\` nodes labeled from \`0\` to \`n - 1\` and a list of undirected edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.

A valid tree has exactly \`n - 1\` edges, is connected, and contains no cycles.

### Examples

**Example 1:**
\`\`\`
Input: n = 5, edges = [[0, 1], [0, 2], [0, 3], [1, 4]]
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: n = 5, edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]
Output: 0
\`\`\`

### Constraints

- \`1 <= n <= 100\`
- \`0 <= edges.length <= 100\`
- \`edges[i].length == 2\`
- \`0 <= ai, bi < n\`
- \`ai != bi\`
- There are no duplicate edges.
`,
    structureMd: `Problem Name: "Graph Valid Tree"
Difficulty: MEDIUM
Topics: Depth-First Search, Breadth-First Search, Union Find, Graph
Function Name: validTree

Input Structure:
Input Field: int n
Input Field: list<list<int>> edges

Output Structure:
Output Field: bool result
`,
    solutionJs: `export function solve(n, edges) {
  if (edges.length !== n - 1) return false;
  const parent = Array.from({ length: n }, (_, i) => i);

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  for (const [u, v] of edges) {
    const ru = find(u);
    const rv = find(v);
    if (ru === rv) return false;
    parent[ru] = rv;
  }

  return true;
}
`,
    baselineJs: `export function solve(n, edges) {
  if (edges.length !== n - 1) return false;
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const visited = new Set();
  const q = [0];
  visited.add(0);

  while (q.length > 0) {
    const u = q.shift();
    for (const v of adj[u]) {
      if (!visited.has(v)) {
        visited.add(v);
        q.push(v);
      }
    }
  }

  return visited.size === n;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { n: 5, edges: [[0, 1], [0, 2], [0, 3], [1, 4]] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { n: 5, edges: [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]] } });
  cases.push({ category: "basic", description: "Single node", inputs: { n: 1, edges: [] } });

  for (let i = 3; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic line " + i, inputs: { n: 3, edges: [[0, 1], [1, 2]] } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Disconnected " + i, inputs: { n: 4, edges: [[0, 1], [2, 3]] } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Cycle of 3 " + i, inputs: { n: 3, edges: [[0, 1], [1, 2], [2, 0]] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = randomInt(rng, 4, 10);
    const edges = [];
    for (let u = 1; u < n; u++) {
      edges.push([randomInt(rng, 0, u - 1), u]);
    }
    cases.push({ category: "random", description: "Random tree " + i, inputs: { n, edges } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = randomInt(rng, 10, 20);
    const edges = [];
    for (let u = 1; u < n; u++) {
      edges.push([randomInt(rng, 0, u - 1), u]);
    }
    cases.push({ category: "large", description: "Large tree " + i, inputs: { n, edges } });
  }

  return cases;
}
`
  });

  // 92. word-ladder
  await writeProblem("word-ladder", {
    problemMd: `# Word Ladder

A **transformation sequence** from word \`beginWord\` to word \`endWord\` using a dictionary \`wordList\` is a sequence of words \`beginWord -> s1 -> s2 -> ... -> sk\` such that:
- Every adjacent pair of words differs by exactly one letter.
- Every \`si\` for \`1 <= i <= k\` is in \`wordList\`. (Note that \`beginWord\` does not need to be in \`wordList\`).
- \`sk == endWord\`.

Given two words, \`beginWord\` and \`endWord\`, and a dictionary \`wordList\`, return the **number of words** in the **shortest transformation sequence** from \`beginWord\` to \`endWord\`, or \`0\` if no such sequence exists.

### Examples

**Example 1:**
\`\`\`
Input:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
\`\`\`

**Example 2:**
\`\`\`
Input:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]
Output: 0
\`\`\`

### Constraints

- \`1 <= beginWord.length <= 10\`
- \`endWord.length == beginWord.length\`
- \`1 <= wordList.length <= 500\`
- \`wordList[i].length == beginWord.length\`
- \`beginWord\`, \`endWord\`, and \`wordList[i]\` consist of lowercase English letters.
- \`beginWord != endWord\`
- All the words in \`wordList\` are **unique**.
`,
    structureMd: `Problem Name: "Word Ladder"
Difficulty: HARD
Topics: Hash Table, String, Breadth-First Search
Function Name: ladderLength

Input Structure:
Input Field: String beginWord
Input Field: String endWord
Input Field: list<String> wordList

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  const queue = [[beginWord, 1]];
  const visited = new Set([beginWord]);
  const letters = "abcdefghijklmnopqrstuvwxyz";

  let head = 0;
  while (head < queue.length) {
    const [word, step] = queue[head++];
    if (word === endWord) return step;

    for (let i = 0; i < word.length; i++) {
      for (let j = 0; j < 26; j++) {
        const next = word.slice(0, i) + letters[j] + word.slice(i + 1);
        if (wordSet.has(next) && !visited.has(next)) {
          visited.add(next);
          queue.push([next, step + 1]);
        }
      }
    }
  }

  return 0;
}
`,
    baselineJs: `export function solve(beginWord, endWord, wordList) {
  if (!wordList.includes(endWord)) return 0;
  const words = [beginWord, ...wordList];
  const n = words.length;

  function diffOne(w1, w2) {
    let diff = 0;
    for (let i = 0; i < w1.length; i++) {
      if (w1[i] !== w2[i]) diff++;
      if (diff > 1) return false;
    }
    return diff === 1;
  }

  const adj = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (diffOne(words[i], words[j])) {
        adj[i].push(j);
        adj[j].push(i);
      }
    }
  }

  const dist = Array(n).fill(Infinity);
  dist[0] = 1;
  const q = [0];

  while (q.length > 0) {
    const u = q.shift();
    if (words[u] === endWord) return dist[u];
    for (const v of adj[u]) {
      if (dist[v] === Infinity) {
        dist[v] = dist[u] + 1;
        q.push(v);
      }
    }
  }

  return 0;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: {
      beginWord: "hit",
      endWord: "cog",
      wordList: ["hot", "dot", "dog", "lot", "log", "cog"]
    }
  });

  cases.push({
    category: "basic",
    description: "Example 2",
    inputs: {
      beginWord: "hit",
      endWord: "cog",
      wordList: ["hot", "dot", "dog", "lot", "log"]
    }
  });

  cases.push({
    category: "basic",
    description: "Direct transformation",
    inputs: {
      beginWord: "cat",
      endWord: "cot",
      wordList: ["cot"]
    }
  });

  for (let i = 3; i < 10; i++) {
    cases.push({
      category: "basic",
      description: "Basic ladder " + i,
      inputs: {
        beginWord: "red",
        endWord: "tax",
        wordList: ["ted", "tex", "red", "tax", "tad", "den", "rex", "pee"]
      }
    });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({
      category: "edge",
      description: "Unreachable " + i,
      inputs: {
        beginWord: "hot",
        endWord: "dog",
        wordList: ["hot", "dog"]
      }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({
      category: "corner",
      description: "Two letter words " + i,
      inputs: {
        beginWord: "ab",
        endWord: "cd",
        wordList: ["cb", "cd"]
      }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({
      category: "random",
      description: "Random ladder " + i,
      inputs: {
        beginWord: "lead",
        endWord: "gold",
        wordList: ["load", "goad", "gold"]
      }
    });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({
      category: "large",
      description: "Large ladder " + i,
      inputs: {
        beginWord: "talk",
        endWord: "tail",
        wordList: ["tall", "toll", "toil", "tail"]
      }
    });
  }

  return cases;
}
`
  });
}

main().catch(console.error);
