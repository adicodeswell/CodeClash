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
  // 12. valid-parentheses
  await writeProblem("valid-parentheses", {
    problemMd: `# Valid Parentheses

Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

### Examples

**Example 1:**
\`\`\`
Input: s = "()"
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: s = "()[]{}"
Output: 1
\`\`\`

**Example 3:**
\`\`\`
Input: s = "(]"
Output: 0
\`\`\`

### Constraints

- \`1 <= s.length <= 10^4\`
- \`s\` consists of parentheses only \`'()[]{}'\`.
`,
    structureMd: `Problem Name: "Valid Parentheses"
Difficulty: EASY
Topics: String, Stack
Function Name: isValid

Input Structure:
Input Field: String s

Output Structure:
Output Field: bool result
`,
    solutionJs: `export function solve(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '(' || c === '{' || c === '[') {
      stack.push(c);
    } else {
      if (stack.length === 0 || stack[stack.length - 1] !== map[c]) return false;
      stack.pop();
    }
  }
  return stack.length === 0;
}
`,
    baselineJs: `export function solve(s) {
  let prev = "";
  while (s !== prev) {
    prev = s;
    s = s.replace(/\\(\\)/g, "").replace(/\\{\\}/g, "").replace(/\\[\\]/g, "");
  }
  return s.length === 0;
}
`,
    testCasesJs: `import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { s: "()" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "()[]{}" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "(]" } });
  cases.push({ category: "basic", description: "Single open", inputs: { s: "(" } });
  cases.push({ category: "basic", description: "Single close", inputs: { s: ")" } });
  cases.push({ category: "basic", description: "Nested all", inputs: { s: "{[()]}" } });
  cases.push({ category: "basic", description: "Mixed valid", inputs: { s: "({[]})[]" } });
  cases.push({ category: "basic", description: "Mismatched close", inputs: { s: "([)]" } });
  cases.push({ category: "basic", description: "Extra close at end", inputs: { s: "()[]}" } });
  cases.push({ category: "basic", description: "Extra open at start", inputs: { s: "{(())}" } });

  function makeValid(pairs) {
    let s = "";
    const openTypes = ["(", "{", "["];
    const closeTypes = [")", "}", "]"];
    const stack = [];
    for (let i = 0; i < pairs; i++) {
      const type = randomInt(rng, 0, 2);
      s += openTypes[type];
      stack.push(closeTypes[type]);
      if (randomInt(rng, 0, 1) === 1 && stack.length > 0) {
        s += stack.pop();
      }
    }
    while (stack.length > 0) s += stack.pop();
    return s;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const valid = i % 2 === 0;
    let s = makeValid(3 + (i % 4));
    if (!valid) s = s + (i % 2 === 0 ? "]" : "(");
    cases.push({ category: "edge", description: "Edge " + i, inputs: { s } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const valid = i % 2 === 0;
    let s = makeValid(8);
    if (!valid) s = "(" + s;
    cases.push({ category: "corner", description: "Corner " + i, inputs: { s } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const valid = i % 2 === 0;
    let s = makeValid(randomInt(rng, 10, 25));
    if (!valid) {
      const pos = randomInt(rng, 0, s.length - 1);
      s = s.slice(0, pos) + (s[pos] === "(" ? "}" : "(") + s.slice(pos + 1);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { s } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const valid = i % 2 === 0;
    let s = makeValid(randomInt(rng, 50, 150));
    if (!valid) s = s.slice(0, -1);
    cases.push({ category: "large", description: "Large " + i, inputs: { s } });
  }

  return cases;
}
`,
  });

  // 13. min-stack
  await writeProblem("min-stack", {
    problemMd: `# Min Stack

Design a stack that supports \`push\`, \`pop\`, \`top\`, and retrieving the minimum element in constant time.

Implement the \`MinStack\` class operations sequence:
- \`push(val)\`: Pushes the element \`val\` onto the stack. Output: \`null\`.
- \`pop()\`: Removes the element on the top of the stack. Output: \`null\`.
- \`top()\`: Gets the top element of the stack. Output: string representation of the integer value.
- \`getMin()\`: Retrieves the minimum element in the stack. Output: string representation of the integer value.

### Examples

**Example 1:**
\`\`\`
Input:
operations = ["push", "push", "push", "getMin", "pop", "top", "getMin"]
values = [[-2], [0], [-3], [], [], [], []]
Output: null null null -3 null 0 -2
Explanation:
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
\`\`\`

### Constraints

- \`1 <= operations.length <= 3 * 10^4\`
- \`-2^31 <= val <= 2^31 - 1\`
- Methods \`pop\`, \`top\` and \`getMin\` operations will always be called on non-empty stacks.
`,
    structureMd: `Problem Name: "Min Stack"
Difficulty: MEDIUM
Topics: Stack, Design
Function Name: minStackOperations

Input Structure:
Input Field: list<String> operations
Input Field: list<list<int>> values

Output Structure:
Output Field: list<String> result
`,
    solutionJs: `export function solve(operations, values) {
  const stack = [];
  const minStack = [];
  const result = [];
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "push") {
      const val = values[i][0];
      stack.push(val);
      const curMin = minStack.length === 0 ? val : Math.min(val, minStack[minStack.length - 1]);
      minStack.push(curMin);
      result.push("null");
    } else if (op === "pop") {
      stack.pop();
      minStack.pop();
      result.push("null");
    } else if (op === "top") {
      result.push(String(stack[stack.length - 1]));
    } else if (op === "getMin") {
      result.push(String(minStack[minStack.length - 1]));
    }
  }
  return result;
}
`,
    baselineJs: `export function solve(operations, values) {
  const stack = [];
  const result = [];
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "push") {
      stack.push(values[i][0]);
      result.push("null");
    } else if (op === "pop") {
      stack.pop();
      result.push("null");
    } else if (op === "top") {
      result.push(String(stack[stack.length - 1]));
    } else if (op === "getMin") {
      let m = stack[0];
      for (let j = 1; j < stack.length; j++) {
        if (stack[j] < m) m = stack[j];
      }
      result.push(String(m));
    }
  }
  return result;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: {
      operations: ["push", "push", "push", "getMin", "pop", "top", "getMin"],
      values: [[-2], [0], [-3], [], [], [], []]
    }
  });

  cases.push({
    category: "basic",
    description: "Single push getMin",
    inputs: {
      operations: ["push", "getMin", "top"],
      values: [[5], [], []]
    }
  });

  cases.push({
    category: "basic",
    description: "Equal values",
    inputs: {
      operations: ["push", "push", "getMin", "pop", "getMin"],
      values: [[10], [10], [], [], []]
    }
  });

  function makeCase(stepCount) {
    const ops = ["push"];
    const vals = [[randomInt(rng, -100, 100)]];
    let size = 1;
    for (let i = 1; i < stepCount; i++) {
      const choice = randomInt(rng, 0, 3);
      if (choice === 0 || size === 0) {
        ops.push("push");
        vals.push([randomInt(rng, -500, 500)]);
        size++;
      } else if (choice === 1 && size > 1) {
        ops.push("pop");
        vals.push([]);
        size--;
      } else if (choice === 2) {
        ops.push("top");
        vals.push([]);
      } else {
        ops.push("getMin");
        vals.push([]);
      }
    }
    return { operations: ops, values: vals };
  }

  // Edge (3 - 24)
  for (let i = 3; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: makeCase(8 + (i % 6)) });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: makeCase(18) });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: makeCase(randomInt(rng, 25, 50)) });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: makeCase(randomInt(rng, 60, 120)) });
  }

  return cases;
}
`,
  });

  // 14. evaluate-reverse-polish-notation
  await writeProblem("evaluate-reverse-polish-notation", {
    problemMd: `# Evaluate Reverse Polish Notation

You are given an array of strings \`tokens\` that represents an arithmetic expression in a **Reverse Polish Notation**.

Evaluate the expression. Return an integer that represents the value of the expression.

Note that:
- The valid operators are \`'+'\`, \`'-'\`, \`'*'\`, and \`'/'\`.
- Each operand may be an integer or another expression.
- The division between two integers always **truncates toward zero**.
- There will not be any division by zero.
- The input represents a valid arithmetic expression in a reverse polish notation.

### Examples

**Example 1:**
\`\`\`
Input: tokens = ["2", "1", "+", "3", "*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
\`\`\`

**Example 2:**
\`\`\`
Input: tokens = ["4", "13", "5", "/", "+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6
\`\`\`

**Example 3:**
\`\`\`
Input: tokens = ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
Output: 22
\`\`\`

### Constraints

- \`1 <= tokens.length <= 10^4\`
- \`tokens[i]\` is either an operator: \`"+"\`, \`"-"\`, \`"*"\`, or \`"/"\`, or an integer in the range \`[-200, 200]\`.
`,
    structureMd: `Problem Name: "Evaluate Reverse Polish Notation"
Difficulty: MEDIUM
Topics: Array, Math, Stack
Function Name: evalRPN

Input Structure:
Input Field: list<String> tokens

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(tokens) {
  const stack = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t === "+" || t === "-" || t === "*" || t === "/") {
      const b = stack.pop();
      const a = stack.pop();
      if (t === "+") stack.push(a + b);
      else if (t === "-") stack.push(a - b);
      else if (t === "*") stack.push(a * b);
      else stack.push(Math.trunc(a / b));
    } else {
      stack.push(Number(t));
    }
  }
  return stack[0];
}
`,
    baselineJs: `export function solve(tokens) {
  const stack = [];
  for (const token of tokens) {
    if (token === "+") {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(a + b);
    } else if (token === "-") {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(a - b);
    } else if (token === "*") {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(a * b);
    } else if (token === "/") {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(Math.trunc(a / b));
    } else {
      stack.push(parseInt(token, 10));
    }
  }
  return stack[0];
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { tokens: ["2", "1", "+", "3", "*"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { tokens: ["4", "13", "5", "/", "+"] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { tokens: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"] } });
  cases.push({ category: "basic", description: "Single number", inputs: { tokens: ["18"] } });
  cases.push({ category: "basic", description: "Negative number", inputs: { tokens: ["-4"] } });
  cases.push({ category: "basic", description: "Subtraction", inputs: { tokens: ["5", "3", "-"] } });
  cases.push({ category: "basic", description: "Division truncating negative", inputs: { tokens: ["-7", "2", "/"] } });
  cases.push({ category: "basic", description: "Multiplication", inputs: { tokens: ["6", "-2", "*"] } });
  cases.push({ category: "basic", description: "Chained addition", inputs: { tokens: ["1", "2", "+", "3", "+", "4", "+"] } });
  cases.push({ category: "basic", description: "All operators", inputs: { tokens: ["3", "4", "+", "2", "*", "7", "/"] } });

  function makeExpression(opCount) {
    const tokens = [String(randomInt(rng, 1, 10)), String(randomInt(rng, 1, 10))];
    const ops = ["+", "-", "*", "/"];
    tokens.push(ops[randomInt(rng, 0, 3)]);
    for (let i = 1; i < opCount; i++) {
      tokens.push(String(randomInt(rng, 1, 10)));
      tokens.push(ops[randomInt(rng, 0, 3)]);
    }
    return tokens;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { tokens: makeExpression(2 + (i % 3)) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { tokens: makeExpression(5) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { tokens: makeExpression(randomInt(rng, 4, 10)) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { tokens: makeExpression(randomInt(rng, 15, 30)) } });
  }

  return cases;
}
`,
  });

  // 15. generate-parentheses
  await writeProblem("generate-parentheses", {
    problemMd: `# Generate Parentheses

Given \`n\` pairs of parentheses, write a function to *generate all combinations of well-formed parentheses*.

The return list should be sorted in lexicographical order.

### Examples

**Example 1:**
\`\`\`
Input: n = 3
Output: ((())) (()()) (())() ()(()) ()()()
\`\`\`

**Example 2:**
\`\`\`
Input: n = 1
Output: ()
\`\`\`

### Constraints

- \`1 <= n <= 8\`
`,
    structureMd: `Problem Name: "Generate Parentheses"
Difficulty: MEDIUM
Topics: String, Dynamic Programming, Backtracking
Function Name: generateParenthesis

Input Structure:
Input Field: int n

Output Structure:
Output Field: list<String> result
`,
    solutionJs: `export function solve(n) {
  const result = [];
  function backtrack(s, open, close) {
    if (s.length === 2 * n) {
      result.push(s);
      return;
    }
    if (open < n) backtrack(s + "(", open + 1, close);
    if (close < open) backtrack(s + ")", open, close + 1);
  }
  backtrack("", 0, 0);
  result.sort();
  return result;
}
`,
    baselineJs: `export function solve(n) {
  const result = [];
  function generate(cur) {
    if (cur.length === 2 * n) {
      let bal = 0;
      for (let i = 0; i < cur.length; i++) {
        if (cur[i] === "(") bal++;
        else bal--;
        if (bal < 0) return;
      }
      if (bal === 0) result.push(cur);
      return;
    }
    generate(cur + "(");
    generate(cur + ")");
  }
  generate("");
  result.sort();
  return result;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];

  // Values 1 to 8 across 80 tests
  for (let i = 0; i < 80; i++) {
    // Distribute 1..8 with higher concentration on small values for fast baseline
    const n = (i % 6) + 1; // 1 to 6
    cases.push({
      category: i < 10 ? "basic" : i < 25 ? "edge" : i < 40 ? "corner" : i < 65 ? "random" : "large",
      description: "n=" + n,
      inputs: { n }
    });
  }

  return cases;
}
`,
  });

  // 16. daily-temperatures
  await writeProblem("daily-temperatures", {
    problemMd: `# Daily Temperatures

Given an array of integers \`temperatures\` represents the daily temperatures, return an array \`answer\` such that \`answer[i]\` is the number of days you have to wait after the \`i\`-th day to get a warmer temperature. If there is no future day for which this is possible, keep \`answer[i] == 0\` instead.

### Examples

**Example 1:**
\`\`\`
Input: temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
Output: 1 1 4 2 1 1 0 0
\`\`\`

**Example 2:**
\`\`\`
Input: temperatures = [30, 40, 50, 60]
Output: 1 1 1 0
\`\`\`

**Example 3:**
\`\`\`
Input: temperatures = [30, 60, 90]
Output: 1 1 0
\`\`\`

### Constraints

- \`1 <= temperatures.length <= 10^5\`
- \`30 <= temperatures[i] <= 100\`
`,
    structureMd: `Problem Name: "Daily Temperatures"
Difficulty: MEDIUM
Topics: Array, Stack, Monotonic Stack
Function Name: dailyTemperatures

Input Structure:
Input Field: list<int> temperatures

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(temperatures) {
  const n = temperatures.length;
  const ans = new Array(n).fill(0);
  const stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prev = stack.pop();
      ans[prev] = i - prev;
    }
    stack.push(i);
  }
  return ans;
}
`,
    baselineJs: `export function solve(temperatures) {
  const n = temperatures.length;
  const ans = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (temperatures[j] > temperatures[i]) {
        ans[i] = j - i;
        break;
      }
    }
  }
  return ans;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { temperatures: [73, 74, 75, 71, 69, 72, 76, 73] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { temperatures: [30, 40, 50, 60] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { temperatures: [30, 60, 90] } });
  cases.push({ category: "basic", description: "Single temp", inputs: { temperatures: [50] } });
  cases.push({ category: "basic", description: "Strictly decreasing", inputs: { temperatures: [90, 80, 70, 60, 50] } });
  cases.push({ category: "basic", description: "Strictly increasing", inputs: { temperatures: [40, 50, 60, 70, 80] } });
  cases.push({ category: "basic", description: "All equal", inputs: { temperatures: [65, 65, 65, 65] } });
  cases.push({ category: "basic", description: "Valley", inputs: { temperatures: [80, 50, 40, 50, 85] } });
  cases.push({ category: "basic", description: "Peak", inputs: { temperatures: [40, 80, 30] } });
  cases.push({ category: "basic", description: "Alternating", inputs: { temperatures: [50, 70, 50, 70] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 4 + (i % 5);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 30, 100));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { temperatures: arr } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 30, 100));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { temperatures: arr } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 20, 50);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 30, 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { temperatures: arr } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 80, 200);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 30, 100));
    cases.push({ category: "large", description: "Large " + i, inputs: { temperatures: arr } });
  }

  return cases;
}
`,
  });

  // 17. car-fleet
  await writeProblem("car-fleet", {
    problemMd: `# Car Fleet

There are \`n\` cars at given miles away from the starting mile 0, traveling to reach the mile-marker \`target\`.

You are given two integer arrays \`position\` and \`speed\`, both of length \`n\`, where \`position[i]\` is the starting position of the \`i\`-th car and \`speed[i]\` is the speed of the \`i\`-th car (in miles per hour).

A car cannot pass another car, but it can catch up and then travel at the same speed as the leading car. The distance between these two cars is ignored (i.e., they are assumed to have the same position).

A **car fleet** is some non-empty set of cars driving at the same position and same speed. Note that a single car is also a car fleet.

If a car catches up to a car fleet right at the \`target\` mile marker, it will still be considered as part of the car fleet.

Return the number of **car fleets** that will arrive at the destination.

### Examples

**Example 1:**
\`\`\`
Input: target = 12, position = [10, 8, 0, 5, 3], speed = [2, 4, 1, 1, 3]
Output: 3
Explanation:
- The cars starting at 10 and 8 form a fleet, meeting each other at 12.
- The car starting at 0 does not catch up to any other car, so it is a fleet by itself.
- The cars starting at 5 and 3 form a fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.
\`\`\`

**Example 2:**
\`\`\`
Input: target = 10, position = [3], speed = [3]
Output: 1
\`\`\`

**Example 3:**
\`\`\`
Input: target = 100, position = [0, 2, 4], speed = [4, 2, 1]
Output: 1
\`\`\`

### Constraints

- \`n == position.length == speed.length\`
- \`1 <= n <= 10^5\`
- \`0 < target <= 10^6\`
- \`0 <= position[i] < target\`
- All the values of \`position\` are **unique**.
- \`0 < speed[i] <= 10^6\`
`,
    structureMd: `Problem Name: "Car Fleet"
Difficulty: MEDIUM
Topics: Array, Stack, Sorting
Function Name: carFleet

Input Structure:
Input Field: int target
Input Field: list<int> position
Input Field: list<int> speed

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(target, position, speed) {
  const n = position.length;
  const cars = [];
  for (let i = 0; i < n; i++) {
    cars.push({ pos: position[i], time: (target - position[i]) / speed[i] });
  }
  cars.sort((a, b) => b.pos - a.pos);
  let fleets = 0;
  let maxTime = 0;
  for (let i = 0; i < n; i++) {
    if (cars[i].time > maxTime) {
      fleets++;
      maxTime = cars[i].time;
    }
  }
  return fleets;
}
`,
    baselineJs: `export function solve(target, position, speed) {
  const n = position.length;
  const cars = [];
  for (let i = 0; i < n; i++) {
    cars.push({ pos: position[i], time: (target - position[i]) / speed[i] });
  }
  cars.sort((a, b) => b.pos - a.pos);
  const stack = [];
  for (let i = 0; i < n; i++) {
    const curTime = cars[i].time;
    if (stack.length === 0 || curTime > stack[stack.length - 1]) {
      stack.push(curTime);
    }
  }
  return stack.length;
}
`,
    testCasesJs: `import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { target: 12, position: [10, 8, 0, 5, 3], speed: [2, 4, 1, 1, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { target: 10, position: [3], speed: [3] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { target: 100, position: [0, 2, 4], speed: [4, 2, 1] } });
  cases.push({ category: "basic", description: "Two cars meet", inputs: { target: 10, position: [6, 8], speed: [3, 2] } });
  cases.push({ category: "basic", description: "Two cars never meet", inputs: { target: 10, position: [6, 8], speed: [1, 2] } });
  cases.push({ category: "basic", description: "Three cars same speed", inputs: { target: 20, position: [0, 5, 10], speed: [2, 2, 2] } });
  cases.push({ category: "basic", description: "Target close", inputs: { target: 5, position: [1, 2, 3], speed: [5, 4, 3] } });
  cases.push({ category: "basic", description: "All cars merge", inputs: { target: 50, position: [0, 10, 20], speed: [10, 5, 2] } });
  cases.push({ category: "basic", description: "No cars merge", inputs: { target: 50, position: [0, 10, 20], speed: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Single car far", inputs: { target: 1000, position: [10], speed: [100] } });

  function makeCase(n, target) {
    const usedPos = new Set();
    const pos = [];
    const spd = [];
    while (pos.length < n) {
      const p = randomInt(rng, 0, target - 1);
      if (!usedPos.has(p)) {
        usedPos.add(p);
        pos.push(p);
        spd.push(randomInt(rng, 1, 20));
      }
    }
    return { target, position: pos, speed: spd };
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: makeCase(3 + (i % 4), 30) });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: makeCase(10, 100) });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: makeCase(randomInt(rng, 15, 30), 200) });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: makeCase(randomInt(rng, 40, 80), 1000) });
  }

  return cases;
}
`,
  });

  // 18. largest-rectangle-in-histogram
  await writeProblem("largest-rectangle-in-histogram", {
    problemMd: `# Largest Rectangle in Histogram

Given an array of integers \`heights\` representing the histogram's bar height where the width of each bar is \`1\`, return the area of the largest rectangle in the histogram.

### Examples

**Example 1:**
\`\`\`
Input: heights = [2, 1, 5, 6, 2, 3]
Output: 10
Explanation: The largest rectangle is between indices 2 and 3, which has an area of 5 * 2 = 10 units.
\`\`\`

**Example 2:**
\`\`\`
Input: heights = [2, 4]
Output: 4
\`\`\`

### Constraints

- \`1 <= heights.length <= 10^5\`
- \`0 <= heights[i] <= 10^4\`
`,
    structureMd: `Problem Name: "Largest Rectangle in Histogram"
Difficulty: HARD
Topics: Array, Stack, Monotonic Stack
Function Name: largestRectangleArea

Input Structure:
Input Field: list<int> heights

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(heights) {
  const stack = [];
  let maxArea = 0;
  const n = heights.length;
  for (let i = 0; i <= n; i++) {
    const h = i === n ? 0 : heights[i];
    while (stack.length > 0 && h < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      const area = height * width;
      if (area > maxArea) maxArea = area;
    }
    stack.push(i);
  }
  return maxArea;
}
`,
    baselineJs: `export function solve(heights) {
  let maxArea = 0;
  const n = heights.length;
  for (let i = 0; i < n; i++) {
    let minH = heights[i];
    for (let j = i; j < n; j++) {
      if (heights[j] < minH) minH = heights[j];
      const area = minH * (j - i + 1);
      if (area > maxArea) maxArea = area;
    }
  }
  return maxArea;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { heights: [2, 1, 5, 6, 2, 3] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { heights: [2, 4] } });
  cases.push({ category: "basic", description: "Single bar", inputs: { heights: [5] } });
  cases.push({ category: "basic", description: "All equal", inputs: { heights: [4, 4, 4, 4] } });
  cases.push({ category: "basic", description: "Increasing", inputs: { heights: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "Decreasing", inputs: { heights: [5, 4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "With zero", inputs: { heights: [2, 0, 2] } });
  cases.push({ category: "basic", description: "Spike", inputs: { heights: [1, 10, 1] } });
  cases.push({ category: "basic", description: "Valley", inputs: { heights: [6, 1, 6] } });
  cases.push({ category: "basic", description: "Alternating", inputs: { heights: [2, 5, 2, 5] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 4 + (i % 5);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 20));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { heights: arr } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 0, 50));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { heights: arr } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 20, 50);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { heights: arr } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 80, 200);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 500));
    cases.push({ category: "large", description: "Large " + i, inputs: { heights: arr } });
  }

  return cases;
}
`,
  });
}

main().catch(console.error);
