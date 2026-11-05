import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('problem-bank/problems');

const problems = [
  {
    slug: 'implement-queue-using-stacks',
    title: 'Implement Queue using Stacks',
    difficulty: 'EASY',
    topics: ['Stack', 'Design', 'Queue'],
    fnName: 'myQueueOperations',
    inputs: [
      { type: 'list<String>', name: 'operations' },
      { type: 'list<list<int>>', name: 'values' }
    ],
    output: { type: 'list<String>', name: 'result' },
    description: `Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (\`push\`, \`peek\`, \`pop\`, and \`empty\`).

Implement the operations:
- \`push(x)\`: Pushes element x to the back of the queue. Output: \`null\`.
- \`pop()\`: Removes the element from the front of the queue and returns it. Output: string representation of the integer value.
- \`peek()\`: Returns the element at the front of the queue. Output: string representation of the integer value.
- \`empty()\`: Returns \`true\` if the queue is empty, \`false\` otherwise. Output: \`"true"\` or \`"false"\`.

### Examples

**Example 1:**
\`\`\`
Input:
operations = ["push", "push", "peek", "pop", "empty"]
values = [[1], [2], [], [], []]
Output: null null 1 1 false
Explanation:
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2]
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false
\`\`\`

### Constraints

- \`1 <= operations.length <= 100\`
- \`1 <= x <= 9\`
- At most 100 calls will be made to \`push\`, \`pop\`, \`peek\`, and \`empty\`.
- All the calls to \`pop\` and \`peek\` are valid.`,
    solutionCode: `export function solve(operations, values) {
  const inStack = [];
  const outStack = [];
  const result = [];

  function shift() {
    if (outStack.length === 0) {
      while (inStack.length > 0) {
        outStack.push(inStack.pop());
      }
    }
  }

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "push") {
      inStack.push(values[i][0]);
      result.push("null");
    } else if (op === "pop") {
      shift();
      result.push(String(outStack.pop()));
    } else if (op === "peek") {
      shift();
      result.push(String(outStack[outStack.length - 1]));
    } else if (op === "empty") {
      const isEmpty = inStack.length === 0 && outStack.length === 0;
      result.push(isEmpty ? "true" : "false");
    }
  }
  return result;
}`,
    baselineCode: `export function solve(operations, values) {
  const q = [];
  const result = [];
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "push") {
      q.push(values[i][0]);
      result.push("null");
    } else if (op === "pop") {
      result.push(String(q.shift()));
    } else if (op === "peek") {
      result.push(String(q[0]));
    } else if (op === "empty") {
      result.push(q.length === 0 ? "true" : "false");
    }
  }
  return result;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { operations: ["push", "push", "peek", "pop", "empty"], values: [[1], [2], [], [], []] } });
  cases.push({ category: "basic", description: "Push Pop", inputs: { operations: ["push", "pop", "empty"], values: [[5], [], []] } });
  cases.push({ category: "basic", description: "Empty initially", inputs: { operations: ["empty"], values: [[]] } });
  cases.push({ category: "basic", description: "Multiple pushes", inputs: { operations: ["push", "push", "push", "peek", "pop", "pop"], values: [[1], [2], [3], [], [], []] } });
  cases.push({ category: "basic", description: "Interleaved", inputs: { operations: ["push", "pop", "push", "pop"], values: [[10], [], [20], []] } });
  cases.push({ category: "basic", description: "Peek multiple", inputs: { operations: ["push", "peek", "peek"], values: [[7], [], []] } });
  cases.push({ category: "basic", description: "Three pushes empty check", inputs: { operations: ["push", "push", "empty", "pop", "pop", "empty"], values: [[1], [2], [], [], [], []] } });
  cases.push({ category: "basic", description: "Pop all", inputs: { operations: ["push", "push", "pop", "pop"], values: [[4], [8], [], []] } });
  cases.push({ category: "basic", description: "Pushes then peek", inputs: { operations: ["push", "push", "push", "peek"], values: [[9], [8], [7], []] } });
  cases.push({ category: "basic", description: "Alternating", inputs: { operations: ["push", "peek", "push", "peek", "pop", "peek"], values: [[1], [], [2], [], [], []] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const ops = ["push", "push", "pop", "peek", "empty"];
    const vals = [[i + 1], [i + 2], [], [], []];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { operations: ops, values: vals } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const ops = ["push", "pop"];
    const vals = [[i * 10], []];
    cases.push({ category: "corner", description: "Corner " + i, inputs: { operations: ops, values: vals } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const ops = [];
    const vals = [];
    let count = 0;
    for (let step = 0; step < 20; step++) {
      const choice = count === 0 ? "push" : (Math.random() < 0.5 ? "push" : "pop");
      if (choice === "push") {
        ops.push("push");
        vals.push([Math.floor(Math.random() * 100) + 1]);
        count++;
      } else {
        ops.push(Math.random() < 0.5 ? "pop" : "peek");
        vals.push([]);
        if (ops[ops.length - 1] === "pop") count--;
      }
    }
    ops.push("empty");
    vals.push([]);
    cases.push({ category: "random", description: "Random " + i, inputs: { operations: ops, values: vals } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const ops = [];
    const vals = [];
    for (let k = 0; k < 40; k++) {
      ops.push("push");
      vals.push([k]);
    }
    for (let k = 0; k < 40; k++) {
      ops.push("pop");
      vals.push([]);
    }
    ops.push("empty");
    vals.push([]);
    cases.push({ category: "large", description: "Large " + i, inputs: { operations: ops, values: vals } });
  }

  return cases;
}`
  },
  {
    slug: 'implement-stack-using-queues',
    title: 'Implement Stack using Queues',
    difficulty: 'EASY',
    topics: ['Stack', 'Design', 'Queue'],
    fnName: 'myStackOperations',
    inputs: [
      { type: 'list<String>', name: 'operations' },
      { type: 'list<list<int>>', name: 'values' }
    ],
    output: { type: 'list<String>', name: 'result' },
    description: `Implement a last-in-first-out (LIFO) stack using only queues. The implemented stack should support all functions of a normal stack (\`push\`, \`top\`, \`pop\`, and \`empty\`).

Implement the operations:
- \`push(x)\`: Pushes element x to the top of the stack. Output: \`null\`.
- \`pop()\`: Removes the element on the top of the stack and returns it. Output: string representation of the integer value.
- \`top()\`: Gets the top element of the stack. Output: string representation of the integer value.
- \`empty()\`: Returns \`true\` if the stack is empty, \`false\` otherwise. Output: \`"true"\` or \`"false"\`.

### Examples

**Example 1:**
\`\`\`
Input:
operations = ["push", "push", "top", "pop", "empty"]
values = [[1], [2], [], [], []]
Output: null null 2 2 false
Explanation:
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // return 2
myStack.pop(); // return 2
myStack.empty(); // return False
\`\`\`

### Constraints

- \`1 <= operations.length <= 100\`
- \`1 <= x <= 9\`
- At most 100 calls will be made to \`push\`, \`pop\`, \`top\`, and \`empty\`.
- All the calls to \`pop\` and \`top\` are valid.`,
    solutionCode: `export function solve(operations, values) {
  let q1 = [];
  let q2 = [];
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "push") {
      q2.push(values[i][0]);
      while (q1.length > 0) {
        q2.push(q1.shift());
      }
      const temp = q1;
      q1 = q2;
      q2 = temp;
      result.push("null");
    } else if (op === "pop") {
      result.push(String(q1.shift()));
    } else if (op === "top") {
      result.push(String(q1[0]));
    } else if (op === "empty") {
      result.push(q1.length === 0 ? "true" : "false");
    }
  }
  return result;
}`,
    baselineCode: `export function solve(operations, values) {
  const stack = [];
  const result = [];
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "push") {
      stack.push(values[i][0]);
      result.push("null");
    } else if (op === "pop") {
      result.push(String(stack.pop()));
    } else if (op === "top") {
      result.push(String(stack[stack.length - 1]));
    } else if (op === "empty") {
      result.push(stack.length === 0 ? "true" : "false");
    }
  }
  return result;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { operations: ["push", "push", "top", "pop", "empty"], values: [[1], [2], [], [], []] } });
  cases.push({ category: "basic", description: "Push Pop", inputs: { operations: ["push", "pop", "empty"], values: [[5], [], []] } });
  cases.push({ category: "basic", description: "Empty check", inputs: { operations: ["empty"], values: [[]] } });
  cases.push({ category: "basic", description: "Three pushes", inputs: { operations: ["push", "push", "push", "top", "pop", "pop"], values: [[1], [2], [3], [], [], []] } });
  cases.push({ category: "basic", description: "Interleaved", inputs: { operations: ["push", "pop", "push", "pop"], values: [[10], [], [20], []] } });
  cases.push({ category: "basic", description: "Top repeat", inputs: { operations: ["push", "top", "top"], values: [[7], [], []] } });
  cases.push({ category: "basic", description: "Empty middle", inputs: { operations: ["push", "empty", "pop", "empty"], values: [[1], [], [], []] } });
  cases.push({ category: "basic", description: "Reverse check", inputs: { operations: ["push", "push", "pop", "pop"], values: [[4], [8], [], []] } });
  cases.push({ category: "basic", description: "Top before pop", inputs: { operations: ["push", "push", "top"], values: [[9], [8], []] } });
  cases.push({ category: "basic", description: "Alternating top pop", inputs: { operations: ["push", "top", "push", "top", "pop", "top"], values: [[1], [], [2], [], [], []] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const ops = ["push", "push", "pop", "top", "empty"];
    const vals = [[i + 1], [i + 2], [], [], []];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { operations: ops, values: vals } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const ops = ["push", "pop"];
    const vals = [[i * 10], []];
    cases.push({ category: "corner", description: "Corner " + i, inputs: { operations: ops, values: vals } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const ops = [];
    const vals = [];
    let count = 0;
    for (let step = 0; step < 20; step++) {
      const choice = count === 0 ? "push" : (Math.random() < 0.5 ? "push" : "pop");
      if (choice === "push") {
        ops.push("push");
        vals.push([Math.floor(Math.random() * 100) + 1]);
        count++;
      } else {
        ops.push(Math.random() < 0.5 ? "pop" : "top");
        vals.push([]);
        if (ops[ops.length - 1] === "pop") count--;
      }
    }
    ops.push("empty");
    vals.push([]);
    cases.push({ category: "random", description: "Random " + i, inputs: { operations: ops, values: vals } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const ops = [];
    const vals = [];
    for (let k = 0; k < 40; k++) {
      ops.push("push");
      vals.push([k]);
    }
    for (let k = 0; k < 40; k++) {
      ops.push("pop");
      vals.push([]);
    }
    ops.push("empty");
    vals.push([]);
    cases.push({ category: "large", description: "Large " + i, inputs: { operations: ops, values: vals } });
  }

  return cases;
}`
  },
  {
    slug: 'design-circular-queue',
    title: 'Design Circular Queue',
    difficulty: 'MEDIUM',
    topics: ['Array', 'Design', 'Queue'],
    fnName: 'circularQueueOperations',
    inputs: [
      { type: 'int', name: 'k' },
      { type: 'list<String>', name: 'operations' },
      { type: 'list<list<int>>', name: 'values' }
    ],
    output: { type: 'list<String>', name: 'result' },
    description: `Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle, and the last position is connected back to the first position to make a circle.

Implement the operations:
- \`enQueue(value)\`: Inserts an element into the circular queue. Return \`"true"\` if successful, \`"false"\` if full.
- \`deQueue()\`: Deletes an element from the circular queue. Return \`"true"\` if successful, \`"false"\` if empty.
- \`Front()\`: Gets the front item from the queue. If the queue is empty, return \`"-1"\`. Otherwise string of value.
- \`Rear()\`: Gets the last item from the queue. If the queue is empty, return \`"-1"\`. Otherwise string of value.
- \`isEmpty()\`: Checks whether the circular queue is empty or not. Return \`"true"\` or \`"false"\`.
- \`isFull()\`: Checks whether the circular queue is full or not. Return \`"true"\` or \`"false"\`.

### Examples

**Example 1:**
\`\`\`
Input:
k = 3
operations = ["enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"]
values = [[1], [2], [3], [4], [], [], [], [4], []]
Output: true true true false 3 true true true 4
Explanation:
MyCircularQueue myCircularQueue = new MyCircularQueue(3);
myCircularQueue.enQueue(1); // return True
myCircularQueue.enQueue(2); // return True
myCircularQueue.enQueue(3); // return True
myCircularQueue.enQueue(4); // return False, the queue is full
myCircularQueue.Rear();     // return 3
myCircularQueue.isFull();   // return True
myCircularQueue.deQueue();  // return True
myCircularQueue.enQueue(4); // return True
myCircularQueue.Rear();     // return 4
\`\`\`

### Constraints

- \`1 <= k <= 1000\`
- \`0 <= value <= 1000\`
- At most 3000 calls will be made to \`enQueue\`, \`deQueue\`, \`Front\`, \`Rear\`, \`isEmpty\`, and \`isFull\`.`,
    solutionCode: `export function solve(k, operations, values) {
  const q = new Array(k);
  let head = 0;
  let count = 0;
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "enQueue") {
      if (count === k) {
        result.push("false");
      } else {
        q[(head + count) % k] = values[i][0];
        count++;
        result.push("true");
      }
    } else if (op === "deQueue") {
      if (count === 0) {
        result.push("false");
      } else {
        head = (head + 1) % k;
        count--;
        result.push("true");
      }
    } else if (op === "Front") {
      result.push(count === 0 ? "-1" : String(q[head]));
    } else if (op === "Rear") {
      result.push(count === 0 ? "-1" : String(q[(head + count - 1) % k]));
    } else if (op === "isEmpty") {
      result.push(count === 0 ? "true" : "false");
    } else if (op === "isFull") {
      result.push(count === k ? "true" : "false");
    }
  }
  return result;
}`,
    baselineCode: `export function solve(k, operations, values) {
  const arr = [];
  const result = [];
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "enQueue") {
      if (arr.length === k) {
        result.push("false");
      } else {
        arr.push(values[i][0]);
        result.push("true");
      }
    } else if (op === "deQueue") {
      if (arr.length === 0) {
        result.push("false");
      } else {
        arr.shift();
        result.push("true");
      }
    } else if (op === "Front") {
      result.push(arr.length === 0 ? "-1" : String(arr[0]));
    } else if (op === "Rear") {
      result.push(arr.length === 0 ? "-1" : String(arr[arr.length - 1]));
    } else if (op === "isEmpty") {
      result.push(arr.length === 0 ? "true" : "false");
    } else if (op === "isFull") {
      result.push(arr.length === k ? "true" : "false");
    }
  }
  return result;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { k: 3, operations: ["enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"], values: [[1], [2], [3], [4], [], [], [], [4], []] } });
  cases.push({ category: "basic", description: "Empty check", inputs: { k: 2, operations: ["isEmpty", "Front", "Rear"], values: [[], [], []] } });
  cases.push({ category: "basic", description: "Single capacity", inputs: { k: 1, operations: ["enQueue", "isFull", "deQueue", "isEmpty"], values: [[10], [], [], []] } });
  cases.push({ category: "basic", description: "Wrap around", inputs: { k: 2, operations: ["enQueue", "enQueue", "deQueue", "enQueue", "Front", "Rear"], values: [[1], [2], [], [3], [], []] } });
  cases.push({ category: "basic", description: "Dequeue empty", inputs: { k: 3, operations: ["deQueue"], values: [[]] } });
  cases.push({ category: "basic", description: "Front Rear same", inputs: { k: 4, operations: ["enQueue", "Front", "Rear"], values: [[42], [], []] } });
  cases.push({ category: "basic", description: "Fill empty fill", inputs: { k: 2, operations: ["enQueue", "enQueue", "deQueue", "deQueue", "isEmpty"], values: [[5], [6], [], [], []] } });
  cases.push({ category: "basic", description: "Full then reject", inputs: { k: 2, operations: ["enQueue", "enQueue", "enQueue"], values: [[1], [2], [3]] } });
  cases.push({ category: "basic", description: "Circular cycle 3", inputs: { k: 3, operations: ["enQueue", "enQueue", "deQueue", "enQueue", "enQueue", "Rear"], values: [[1], [2], [], [3], [4], []] } });
  cases.push({ category: "basic", description: "Front query check", inputs: { k: 3, operations: ["enQueue", "enQueue", "Front", "deQueue", "Front"], values: [[7], [8], [], [], []] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const k = i + 1;
    const ops = ["enQueue", "isFull", "Front", "Rear", "deQueue", "isEmpty"];
    const vals = [[i * 5], [], [], [], [], []];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { k, operations: ops, values: vals } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const ops = ["deQueue", "Front", "Rear", "isEmpty", "isFull"];
    const vals = [[], [], [], [], []];
    cases.push({ category: "corner", description: "Corner " + i, inputs: { k: 5, operations: ops, values: vals } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const k = (i % 5) + 2;
    const ops = [];
    const vals = [];
    const possible = ["enQueue", "deQueue", "Front", "Rear", "isEmpty", "isFull"];
    for (let step = 0; step < 20; step++) {
      const op = possible[Math.floor(Math.random() * possible.length)];
      ops.push(op);
      vals.push(op === "enQueue" ? [Math.floor(Math.random() * 100)] : []);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { k, operations: ops, values: vals } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const k = 50 + i * 10;
    const ops = [];
    const vals = [];
    for (let j = 0; j < 100; j++) {
      ops.push(j % 3 === 0 ? "deQueue" : "enQueue");
      vals.push(j % 3 === 0 ? [] : [j]);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { k, operations: ops, values: vals } });
  }

  return cases;
}`
  },
  {
    slug: 'asteroid-collision',
    title: 'Asteroid Collision',
    difficulty: 'MEDIUM',
    topics: ['Array', 'Stack', 'Simulation'],
    fnName: 'asteroidCollision',
    inputs: [{ type: 'list<int>', name: 'asteroids' }],
    output: { type: 'list<int>', name: 'result' },
    description: `We are given an array \`asteroids\` of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

### Examples

**Example 1:**
\`\`\`
Input: asteroids = [5, 10, -5]
Output: 5 10
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
\`\`\`

**Example 2:**
\`\`\`
Input: asteroids = [8, -8, 10]
Output: 10
Explanation: The 8 and -8 collide exploding each other. 10 remains.
\`\`\`

**Example 3:**
\`\`\`
Input: asteroids = [10, 2, -5]
Output: 10
Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.
\`\`\`

### Constraints

- \`2 <= asteroids.length <= 10^4\`
- \`-1000 <= asteroids[i] <= 1000\`
- \`asteroids[i] != 0\`
- At least one asteroid remains after all collisions.`,
    solutionCode: `export function solve(asteroids) {
  const stack = [];
  for (const ast of asteroids) {
    let alive = true;
    while (alive && ast < 0 && stack.length > 0 && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];
      if (top < -ast) {
        stack.pop();
      } else if (top === -ast) {
        stack.pop();
        alive = false;
      } else {
        alive = false;
      }
    }
    if (alive) {
      stack.push(ast);
    }
  }
  return stack;
}`,
    baselineCode: `export function solve(asteroids) {
  const res = [];
  for (let i = 0; i < asteroids.length; i++) {
    const a = asteroids[i];
    let exploded = false;
    while (res.length > 0 && a < 0 && res[res.length - 1] > 0) {
      const top = res[res.length - 1];
      if (top < -a) {
        res.pop();
      } else if (top === -a) {
        res.pop();
        exploded = true;
        break;
      } else {
        exploded = true;
        break;
      }
    }
    if (!exploded) {
      res.push(a);
    }
  }
  return res;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { asteroids: [5, 10, -5] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { asteroids: [8, -8, 10] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { asteroids: [10, 2, -5] } });
  cases.push({ category: "basic", description: "All positive", inputs: { asteroids: [1, 2, 3, 4] } });
  cases.push({ category: "basic", description: "All negative", inputs: { asteroids: [-1, -2, -3] } });
  cases.push({ category: "basic", description: "Moving apart", inputs: { asteroids: [-5, 5] } });
  cases.push({ category: "basic", description: "Massive survivor", inputs: { asteroids: [100, -10, -20, -30] } });
  cases.push({ category: "basic", description: "Alternate collapse", inputs: { asteroids: [-1, -2, 10, -5, 2] } });
  cases.push({ category: "basic", description: "Equal opposite", inputs: { asteroids: [5, -5, 20] } });
  cases.push({ category: "basic", description: "Multiple collisions", inputs: { asteroids: [1, 2, 3, -10, 50] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const asteroids = [-100, ...Array.from({ length: i + 1 }, (_, idx) => idx + 1)];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { asteroids } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const asteroids = [1000, ...Array(i + 2).fill(-10)];
    cases.push({ category: "corner", description: "Corner " + i, inputs: { asteroids } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 5;
    const asteroids = Array.from({ length: len }, () => {
      const v = Math.floor(Math.random() * 50) + 1;
      return Math.random() < 0.5 ? v : -v;
    });
    asteroids.push(999); // ensure at least one survives
    cases.push({ category: "random", description: "Random " + i, inputs: { asteroids } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 500 + i * 50;
    const asteroids = Array.from({ length: len }, (_, idx) => (idx % 2 === 0 ? 50 : -20));
    asteroids.push(1000);
    cases.push({ category: "large", description: "Large " + i, inputs: { asteroids } });
  }

  return cases;
}`
  },
  {
    slug: 'decode-string',
    title: 'Decode String',
    difficulty: 'MEDIUM',
    topics: ['String', 'Stack', 'Recursion'],
    fnName: 'decodeString',
    inputs: [{ type: 'String', name: 's' }],
    output: { type: 'String', name: 'result' },
    description: `Given an encoded string, return its decoded string.

The encoding rule is: \`k[encoded_string]\`, where the \`encoded_string\` inside the square brackets is being repeated exactly \`k\` times. Note that \`k\` is guaranteed to be a positive integer.

You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc.

### Examples

**Example 1:**
\`\`\`
Input: s = "3[a]2[bc]"
Output: aaabcbc
\`\`\`

**Example 2:**
\`\`\`
Input: s = "3[a2[c]]"
Output: accaccacc
\`\`\`

**Example 3:**
\`\`\`
Input: s = "2[abc]3[cd]ef"
Output: abcabccdcdcdef
\`\`\`

### Constraints

- \`1 <= s.length <= 30\`
- \`s\` consists of lowercase English letters, digits, and square brackets \`'['\` and \`']'\`.
- \`s\` is guaranteed to be a valid input.
- All the integers in \`s\` are in the range \`[1, 300]\`.`,
    solutionCode: `export function solve(s) {
  const countStack = [];
  const stringStack = [];
  let curStr = "";
  let curNum = 0;

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch >= '0' && ch <= '9') {
      curNum = curNum * 10 + Number(ch);
    } else if (ch === '[') {
      countStack.push(curNum);
      stringStack.push(curStr);
      curStr = "";
      curNum = 0;
    } else if (ch === ']') {
      const repeatTimes = countStack.pop();
      const prevStr = stringStack.pop();
      curStr = prevStr + curStr.repeat(repeatTimes);
    } else {
      curStr += ch;
    }
  }
  return curStr;
}`,
    baselineCode: `export function solve(s) {
  while (s.includes('[')) {
    s = s.replace(/(\\d+)\\[([a-z]+)\\]/g, (_, count, str) => str.repeat(Number(count)));
  }
  return s;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "3[a]2[bc]" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "3[a2[c]]" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "2[abc]3[cd]ef" } });
  cases.push({ category: "basic", description: "Single char repeated", inputs: { s: "4[z]" } });
  cases.push({ category: "basic", description: "No encoding", inputs: { s: "abcdef" } });
  cases.push({ category: "basic", description: "Nested triple", inputs: { s: "2[2[2[a]]]" } });
  cases.push({ category: "basic", description: "Mixed pre post", inputs: { s: "pre2[ab]post" } });
  cases.push({ category: "basic", description: "Single repetition", inputs: { s: "1[abc]" } });
  cases.push({ category: "basic", description: "Two digits count", inputs: { s: "10[a]" } });
  cases.push({ category: "basic", description: "Multiple independent", inputs: { s: "2[a]2[b]2[c]" } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const s = (i + 1) + "[x]";
    cases.push({ category: "edge", description: "Edge " + i, inputs: { s } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const s = "a" + (i + 1) + "[b]c";
    cases.push({ category: "corner", description: "Corner " + i, inputs: { s } });
  }

  // Random (25)
  const tokens = ["a", "b", "c", "ab", "xy"];
  for (let i = 0; i < 25; i++) {
    const k1 = (i % 4) + 1;
    const k2 = ((i + 1) % 3) + 1;
    const t1 = tokens[i % tokens.length];
    const t2 = tokens[(i + 2) % tokens.length];
    const s = k1 + "[" + t1 + k2 + "[" + t2 + "]]";
    cases.push({ category: "random", description: "Random " + i, inputs: { s } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const s = "2[ab3[c]]4[d]";
    cases.push({ category: "large", description: "Large " + i, inputs: { s } });
  }

  return cases;
}`
  },
  {
    slug: 'simplify-path',
    title: 'Simplify Path',
    difficulty: 'MEDIUM',
    topics: ['String', 'Stack'],
    fnName: 'simplifyPath',
    inputs: [{ type: 'String', name: 'path' }],
    output: { type: 'String', name: 'result' },
    description: `Given an absolute path for a Unix-style file system, convert it to the simplified canonical path.

In Unix-style file system:
- A period \`'.'\` refers to the current directory.
- A double period \`'..'\` refers to the directory up a level.
- Any multiple consecutive slashes, such as \`'//'\`, are treated as a single slash \`'/'\`.

The canonical path should have the following format:
- The path starts with a single slash \`'/'\`.
- Any two directories are separated by a single slash \`'/'\`.
- The path does not end with a trailing \`'/'\`.
- The path only contains the directories on the path from the root directory to the target file or directory.

### Examples

**Example 1:**
\`\`\`
Input: path = "/home/"
Output: /home
\`\`\`

**Example 2:**
\`\`\`
Input: path = "/../"
Output: /
\`\`\`

**Example 3:**
\`\`\`
Input: path = "/home//foo/"
Output: /home/foo
\`\`\`

### Constraints

- \`1 <= path.length <= 3000\`
- \`path\` consists of English letters, digits, period \`'.'\`, slash \`'/'\` or \`'_'\`.
- \`path\` is a valid absolute Unix path.`,
    solutionCode: `export function solve(path) {
  const parts = path.split('/');
  const stack = [];
  for (const p of parts) {
    if (p === '' || p === '.') {
      continue;
    } else if (p === '..') {
      if (stack.length > 0) stack.pop();
    } else {
      stack.push(p);
    }
  }
  return '/' + stack.join('/');
}`,
    baselineCode: `export function solve(path) {
  const tokens = path.split('/').filter(x => x !== '' && x !== '.');
  const res = [];
  for (const t of tokens) {
    if (t === '..') {
      if (res.length > 0) res.pop();
    } else {
      res.push(t);
    }
  }
  return '/' + res.join('/');
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { path: "/home/" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { path: "/../" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { path: "/home//foo/" } });
  cases.push({ category: "basic", description: "Root only", inputs: { path: "/" } });
  cases.push({ category: "basic", description: "Multiple slashes", inputs: { path: "///" } });
  cases.push({ category: "basic", description: "Relative dots", inputs: { path: "/a/./b/../../c/" } });
  cases.push({ category: "basic", description: "Hidden file name", inputs: { path: "/.../a/../b/c/../d/./" } });
  cases.push({ category: "basic", description: "Complex traversal", inputs: { path: "/a/../../b/../c//.//" } });
  cases.push({ category: "basic", description: "Deep path", inputs: { path: "/a/b/c/d/e/f/g" } });
  cases.push({ category: "basic", description: "Underscores and digits", inputs: { path: "/user_123/bin/../lib" } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const dots = Array(i + 2).fill("..").join("/");
    cases.push({ category: "edge", description: "Edge " + i, inputs: { path: "/" + dots } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const slashes = "/".repeat(i + 4) + "folder" + "/".repeat(i + 2);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { path: slashes } });
  }

  // Random (25)
  const segments = ["a", "b", "c", ".", "..", "...", "dir_1", "doc"];
  for (let i = 0; i < 25; i++) {
    const len = (i % 8) + 3;
    const chosen = Array.from({ length: len }, () => segments[Math.floor(Math.random() * segments.length)]);
    cases.push({ category: "random", description: "Random " + i, inputs: { path: "/" + chosen.join("/") } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const parts = Array.from({ length: 100 }, (_, idx) => (idx % 3 === 0 ? ".." : "folder_" + idx));
    cases.push({ category: "large", description: "Large " + i, inputs: { path: "/" + parts.join("/") } });
  }

  return cases;
}`
  },
  {
    slug: 'remove-all-adjacent-duplicates-in-string',
    title: 'Remove All Adjacent Duplicates In String',
    difficulty: 'EASY',
    topics: ['String', 'Stack'],
    fnName: 'removeDuplicates',
    inputs: [{ type: 'String', name: 's' }],
    output: { type: 'String', name: 'result' },
    description: `You are given a string \`s\` consisting of lowercase English letters. A duplicate removal consists of choosing two adjacent and equal letters and removing them.

We repeatedly make duplicate removals on \`s\` until we no longer can.

Return the final string after all such duplicate removals have been made.

### Examples

**Example 1:**
\`\`\`
Input: s = "abbaca"
Output: ca
Explanation: 
For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal, and this is the only possible move.  The result of this move is that the string is "aaca", of which only "aa" is possible, so the final string is "ca".
\`\`\`

**Example 2:**
\`\`\`
Input: s = "azxxzy"
Output: ay
\`\`\`

### Constraints

- \`1 <= s.length <= 10^5\`
- \`s\` consists of lowercase English letters.
- The final result after all duplicate removals contains at least one character.`,
    solutionCode: `export function solve(s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (stack.length > 0 && stack[stack.length - 1] === ch) {
      stack.pop();
    } else {
      stack.push(ch);
    }
  }
  return stack.join('');
}`,
    baselineCode: `export function solve(s) {
  let changed = true;
  let cur = s;
  while (changed) {
    changed = false;
    for (let i = 0; i < cur.length - 1; i++) {
      if (cur[i] === cur[i + 1]) {
        cur = cur.slice(0, i) + cur.slice(i + 2);
        changed = true;
        break;
      }
    }
  }
  return cur;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "abbaca" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "azxxzy" } });
  cases.push({ category: "basic", description: "Single char", inputs: { s: "a" } });
  cases.push({ category: "basic", description: "No duplicates", inputs: { s: "abcde" } });
  cases.push({ category: "basic", description: "Pair then single", inputs: { s: "aab" } });
  cases.push({ category: "basic", description: "Single then pair", inputs: { s: "baa" } });
  cases.push({ category: "basic", description: "Cascade into single", inputs: { s: "abccbaX" } });
  cases.push({ category: "basic", description: "Alternating pairs", inputs: { s: "aabbccd" } });
  cases.push({ category: "basic", description: "Nested with distinct center", inputs: { s: "abbaX" } });
  cases.push({ category: "basic", description: "Multiple characters", inputs: { s: "mississippi" } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const s = "a".repeat((i + 1) * 2) + "z";
    cases.push({ category: "edge", description: "Edge " + i, inputs: { s } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const s = "abcdef".slice(0, (i % 5) + 2);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { s } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 4;
    let s = "";
    for (let j = 0; j < len; j++) {
      s += String.fromCharCode(97 + (j % 4));
    }
    s += "z"; // ensure non-empty
    cases.push({ category: "random", description: "Random " + i, inputs: { s } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    let s = "";
    for (let j = 0; j < 50; j++) {
      s += "aa";
    }
    s += "winner";
    cases.push({ category: "large", description: "Large " + i, inputs: { s } });
  }

  return cases;
}`
  },
  {
    slug: 'basic-calculator-ii',
    title: 'Basic Calculator II',
    difficulty: 'MEDIUM',
    topics: ['Math', 'String', 'Stack'],
    fnName: 'calculate',
    inputs: [{ type: 'String', name: 's' }],
    output: { type: 'int', name: 'result' },
    description: `Given a string \`s\` which represents an expression, evaluate this expression and return its value. 

The integer division should truncate toward zero.

You may assume that the given expression is always valid. All intermediate results will be in the range of \`[-2^31, 2^31 - 1]\`.

### Examples

**Example 1:**
\`\`\`
Input: s = "3+2*2"
Output: 7
\`\`\`

**Example 2:**
\`\`\`
Input: s = " 3/2 "
Output: 1
\`\`\`

**Example 3:**
\`\`\`
Input: s = " 3+5 / 2 "
Output: 5
\`\`\`

### Constraints

- \`1 <= s.length <= 3 * 10^5\`
- \`s\` consists of integers and operators (\`'+'\`, \`'-'\`, \`'*'\`, \`'/'\`) separated by some number of spaces.
- \`s\` represents a valid expression.
- All the integers in the expression are non-negative integers in the range \`[0, 2^31 - 1]\`.
- The answer is guaranteed to fit in a 32-bit integer.`,
    solutionCode: `export function solve(s) {
  const stack = [];
  let num = 0;
  let sign = '+';

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch >= '0' && ch <= '9') {
      num = num * 10 + Number(ch);
    }
    if ((ch !== ' ' && (ch < '0' || ch > '9')) || i === s.length - 1) {
      if (sign === '+') {
        stack.push(num);
      } else if (sign === '-') {
        stack.push(-num);
      } else if (sign === '*') {
        stack.push(stack.pop() * num);
      } else if (sign === '/') {
        const prev = stack.pop();
        stack.push(Math.trunc(prev / num));
      }
      sign = ch;
      num = 0;
    }
  }

  return stack.reduce((a, b) => a + b, 0);
}`,
    baselineCode: `export function solve(s) {
  const tokens = [];
  let cur = "";
  for (const c of s) {
    if (c === ' ') continue;
    if ('+-*/'.includes(c)) {
      tokens.push(Number(cur));
      tokens.push(c);
      cur = "";
    } else {
      cur += c;
    }
  }
  tokens.push(Number(cur));

  // Pass 1: * and /
  const pass1 = [];
  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i];
    if (t === '*' || t === '/') {
      const prev = pass1.pop();
      const next = tokens[i + 1];
      pass1.push(t === '*' ? prev * next : Math.trunc(prev / next));
      i += 2;
    } else {
      pass1.push(t);
      i++;
    }
  }

  // Pass 2: + and -
  let ans = pass1[0];
  let j = 1;
  while (j < pass1.length) {
    const op = pass1[j];
    const next = pass1[j + 1];
    ans = op === '+' ? ans + next : ans - next;
    j += 2;
  }
  return ans;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { s: "3+2*2" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "3/2" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "3+5/2" } });
  cases.push({ category: "basic", description: "Single number", inputs: { s: "42" } });
  cases.push({ category: "basic", description: "Subtraction and division", inputs: { s: "14-3/2" } });
  cases.push({ category: "basic", description: "Consecutive multiplication", inputs: { s: "2*3*4" } });
  cases.push({ category: "basic", description: "Division chain", inputs: { s: "100/2/5" } });
  cases.push({ category: "basic", description: "Mixed expression", inputs: { s: "1+2*3-4/2" } });
  cases.push({ category: "basic", description: "Zero terms", inputs: { s: "0+0*5" } });
  cases.push({ category: "basic", description: "Large numbers", inputs: { s: "1000+200*300" } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const s = String((i + 1) * 10) + "/3";
    cases.push({ category: "edge", description: "Edge " + i, inputs: { s } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const s = String(i + 1) + "+0";
    cases.push({ category: "corner", description: "Corner " + i, inputs: { s } });
  }

  // Random (25)
  const ops = ['+', '-', '*', '/'];
  for (let i = 0; i < 25; i++) {
    let s = String(Math.floor(Math.random() * 20) + 1);
    for (let j = 0; j < 4; j++) {
      const op = ops[Math.floor(Math.random() * ops.length)];
      const val = Math.floor(Math.random() * 20) + 1;
      s += op + val;
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { s } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    let s = "100";
    for (let j = 0; j < 30; j++) {
      s += "+" + (j * 2) + "*2";
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { s } });
  }

  return cases;
}`
  },
  {
    slug: 'next-greater-element-i',
    title: 'Next Greater Element I',
    difficulty: 'EASY',
    topics: ['Array', 'Hash Table', 'Stack', 'Monotonic Stack'],
    fnName: 'nextGreaterElement',
    inputs: [
      { type: 'list<int>', name: 'nums1' },
      { type: 'list<int>', name: 'nums2' }
    ],
    output: { type: 'list<int>', name: 'result' },
    description: `The next greater element of some element \`x\` in an array is the first greater element that is to the right of \`x\` in the same array.

You are given two distinct 0-indexed integer arrays \`nums1\` and \`nums2\`, where \`nums1\` is a subset of \`nums2\`.

For each \`0 <= i < nums1.length\`, find the index \`j\` such that \`nums1[i] == nums2[j]\` and determine the next greater element of \`nums2[j]\` in \`nums2\`. If there is no next greater element, then the answer for this query is \`-1\`.

Return an array \`ans\` of length \`nums1.length\` such that \`ans[i]\` is the next greater element as described above.

### Examples

**Example 1:**
\`\`\`
Input:
nums1 = [4, 1, 2]
nums2 = [1, 3, 4, 2]
Output: -1 3 -1
Explanation: The next greater element for each value of nums1 is as follows:
- 4 is underlined in nums2 = [1, 3, 4, 2]. There is no next greater element, so the answer is -1.
- 1 is underlined in nums2 = [1, 3, 4, 2]. The next greater element is 3.
- 2 is underlined in nums2 = [1, 3, 4, 2]. There is no next greater element, so the answer is -1.
\`\`\`

**Example 2:**
\`\`\`
Input:
nums1 = [2, 4]
nums2 = [1, 2, 3, 4]
Output: 3 -1
\`\`\`

### Constraints

- \`1 <= nums1.length <= nums2.length <= 1000\`
- \`0 <= nums1[i], nums2[i] <= 10^4\`
- All integers in \`nums1\` and \`nums2\` are unique.
- All the integers of \`nums1\` also appear in \`nums2\`.`,
    solutionCode: `export function solve(nums1, nums2) {
  const nextGreater = new Map();
  const stack = [];

  for (const num of nums2) {
    while (stack.length > 0 && stack[stack.length - 1] < num) {
      nextGreater.set(stack.pop(), num);
    }
    stack.push(num);
  }

  return nums1.map(x => nextGreater.has(x) ? nextGreater.get(x) : -1);
}`,
    baselineCode: `export function solve(nums1, nums2) {
  const ans = [];
  for (const x of nums1) {
    const idx = nums2.indexOf(x);
    let found = -1;
    for (let j = idx + 1; j < nums2.length; j++) {
      if (nums2[j] > x) {
        found = nums2[j];
        break;
      }
    }
    ans.push(found);
  }
  return ans;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums1: [4, 1, 2], nums2: [1, 3, 4, 2] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums1: [2, 4], nums2: [1, 2, 3, 4] } });
  cases.push({ category: "basic", description: "Single element", inputs: { nums1: [1], nums2: [1] } });
  cases.push({ category: "basic", description: "Two elements greater", inputs: { nums1: [1], nums2: [1, 2] } });
  cases.push({ category: "basic", description: "Two elements smaller", inputs: { nums1: [2], nums2: [2, 1] } });
  cases.push({ category: "basic", description: "All decreasing", inputs: { nums1: [4, 3, 2], nums2: [5, 4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "All increasing", inputs: { nums1: [1, 2, 3], nums2: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "Alternating peaks", inputs: { nums1: [2, 1], nums2: [2, 3, 1, 4] } });
  cases.push({ category: "basic", description: "Subset unordered", inputs: { nums1: [10, 5], nums2: [1, 5, 2, 10, 20] } });
  cases.push({ category: "basic", description: "Identical arrays", inputs: { nums1: [3, 1, 4], nums2: [3, 1, 4] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const nums2 = Array.from({ length: i + 2 }, (_, idx) => idx + 1);
    const nums1 = [nums2[0]];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { nums1, nums2 } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const nums2 = Array.from({ length: i + 3 }, (_, idx) => 100 - idx);
    const nums1 = [nums2[1]];
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nums1, nums2 } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len2 = (i % 20) + 5;
    const set = new Set();
    while (set.size < len2) {
      set.add(Math.floor(Math.random() * 1000));
    }
    const nums2 = Array.from(set);
    const len1 = Math.floor(Math.random() * (len2 - 1)) + 1;
    const nums1 = nums2.slice(0, len1);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums1, nums2 } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len2 = 500 + i * 20;
    const nums2 = Array.from({ length: len2 }, (_, idx) => idx);
    const nums1 = Array.from({ length: 50 }, (_, idx) => idx * 5);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums1, nums2 } });
  }

  return cases;
}`
  },
  {
    slug: 'online-stock-span',
    title: 'Online Stock Span',
    difficulty: 'MEDIUM',
    topics: ['Stack', 'Design', 'Monotonic Stack'],
    fnName: 'stockSpanner',
    inputs: [{ type: 'list<int>', name: 'prices' }],
    output: { type: 'list<int>', name: 'result' },
    description: `Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day.

The span of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.

Return the array of spans for all consecutive days in \`prices\`.

### Examples

**Example 1:**
\`\`\`
Input: prices = [100, 80, 60, 70, 60, 75, 85]
Output: 1 1 1 2 1 4 6
Explanation:
- 100: span 1
- 80: span 1
- 60: span 1
- 70: span 2 (70, 60)
- 60: span 1
- 75: span 4 (75, 60, 70, 60)
- 85: span 6 (85, 75, 60, 70, 60, 80)
\`\`\`

### Constraints

- \`1 <= prices.length <= 10^4\`
- \`1 <= prices[i] <= 10^5\``,
    solutionCode: `export function solve(prices) {
  const stack = []; // [price, span]
  const result = [];
  for (const price of prices) {
    let span = 1;
    while (stack.length > 0 && stack[stack.length - 1][0] <= price) {
      span += stack.pop()[1];
    }
    stack.push([price, span]);
    result.push(span);
  }
  return result;
}`,
    baselineCode: `export function solve(prices) {
  const result = [];
  for (let i = 0; i < prices.length; i++) {
    let span = 1;
    let j = i - 1;
    while (j >= 0 && prices[j] <= prices[i]) {
      span++;
      j--;
    }
    result.push(span);
  }
  return result;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { prices: [100, 80, 60, 70, 60, 75, 85] } });
  cases.push({ category: "basic", description: "Single day", inputs: { prices: [50] } });
  cases.push({ category: "basic", description: "Monotonically increasing", inputs: { prices: [10, 20, 30, 40, 50] } });
  cases.push({ category: "basic", description: "Monotonically decreasing", inputs: { prices: [50, 40, 30, 20, 10] } });
  cases.push({ category: "basic", description: "All identical", inputs: { prices: [30, 30, 30, 30] } });
  cases.push({ category: "basic", description: "Valley shape", inputs: { prices: [50, 30, 10, 30, 60] } });
  cases.push({ category: "basic", description: "Peak shape", inputs: { prices: [10, 30, 50, 30, 10] } });
  cases.push({ category: "basic", description: "Alternate", inputs: { prices: [10, 20, 10, 20, 10] } });
  cases.push({ category: "basic", description: "Two prices", inputs: { prices: [100, 200] } });
  cases.push({ category: "basic", description: "Two prices drop", inputs: { prices: [200, 100] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const prices = Array.from({ length: i + 2 }, (_, idx) => (idx + 1) * 10);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { prices } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const prices = Array(i + 3).fill(100);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { prices } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 25) + 5;
    const prices = Array.from({ length: len }, () => Math.floor(Math.random() * 500) + 1);
    cases.push({ category: "random", description: "Random " + i, inputs: { prices } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 500 + i * 50;
    const prices = Array.from({ length: len }, (_, idx) => (idx * 17) % 500 + 10);
    cases.push({ category: "large", description: "Large " + i, inputs: { prices } });
  }

  return cases;
}`
  },
  {
    slug: 'remove-k-digits',
    title: 'Remove K Digits',
    difficulty: 'MEDIUM',
    topics: ['String', 'Stack', 'Greedy', 'Monotonic Stack'],
    fnName: 'removeKdigits',
    inputs: [
      { type: 'String', name: 'num' },
      { type: 'int', name: 'k' }
    ],
    output: { type: 'String', name: 'result' },
    description: `Given string \`num\` representing a non-negative integer and an integer \`k\`, return the smallest possible integer represented as a string after removing \`k\` digits from \`num\`.

If the result is empty or represents zero, return \`"0"\`.

### Examples

**Example 1:**
\`\`\`
Input:
num = "1432219"
k = 3
Output: 1219
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.
\`\`\`

**Example 2:**
\`\`\`
Input:
num = "10200"
k = 1
Output: 200
Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.
\`\`\`

**Example 3:**
\`\`\`
Input:
num = "10"
k = 2
Output: 0
Explanation: Remove all the digits from the number and it is left with nothing which is 0.
\`\`\`

### Constraints

- \`1 <= k <= num.length <= 10^5\`
- \`num\` consists of only digits.
- \`num\` does not have any leading zeros except for the zero itself.`,
    solutionCode: `export function solve(num, k) {
  if (k >= num.length) return "0";
  const stack = [];
  let toRemove = k;

  for (let i = 0; i < num.length; i++) {
    const digit = num[i];
    while (toRemove > 0 && stack.length > 0 && stack[stack.length - 1] > digit) {
      stack.pop();
      toRemove--;
    }
    stack.push(digit);
  }

  while (toRemove > 0) {
    stack.pop();
    toRemove--;
  }

  // Remove leading zeros
  let start = 0;
  while (start < stack.length && stack[start] === '0') {
    start++;
  }

  const res = stack.slice(start).join('');
  return res.length === 0 ? "0" : res;
}`,
    baselineCode: `export function solve(num, k) {
  if (k >= num.length) return "0";
  const st = [];
  let rem = k;
  for (const c of num) {
    while (rem > 0 && st.length > 0 && st[st.length - 1] > c) {
      st.pop();
      rem--;
    }
    st.push(c);
  }
  while (rem > 0) {
    st.pop();
    rem--;
  }
  let str = st.join('').replace(/^0+/, '');
  return str === '' ? "0" : str;
}`,
    testGenCode: `export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { num: "1432219", k: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { num: "10200", k: 1 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { num: "10", k: 2 } });
  cases.push({ category: "basic", description: "k is 0", inputs: { num: "12345", k: 0 } });
  cases.push({ category: "basic", description: "Remove all", inputs: { num: "9", k: 1 } });
  cases.push({ category: "basic", description: "Increasing string", inputs: { num: "123456", k: 2 } });
  cases.push({ category: "basic", description: "Decreasing string", inputs: { num: "654321", k: 2 } });
  cases.push({ category: "basic", description: "All zeros after remove", inputs: { num: "1000", k: 1 } });
  cases.push({ category: "basic", description: "Duplicate digits", inputs: { num: "112", k: 1 } });
  cases.push({ category: "basic", description: "Alternating digits", inputs: { num: "121212", k: 3 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const num = "1" + "0".repeat(i + 1);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { num, k: 1 } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const num = Array.from({ length: i + 3 }, (_, idx) => (idx % 9) + 1).join('');
    cases.push({ category: "corner", description: "Corner " + i, inputs: { num, k: i + 2 } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 5;
    let num = String(Math.floor(Math.random() * 9) + 1);
    for (let j = 1; j < len; j++) {
      num += String(Math.floor(Math.random() * 10));
    }
    const k = Math.floor(Math.random() * (len - 1)) + 1;
    cases.push({ category: "random", description: "Random " + i, inputs: { num, k } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    let num = "9";
    for (let j = 0; j < 300; j++) {
      num += String((j * 7) % 10);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { num, k: 50 + i * 5 } });
  }

  return cases;
}`
  }
];

function buildProblem(p) {
  const dir = path.join(ROOT, p.slug);
  fs.mkdirSync(path.join(dir, 'generators'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'reference'), { recursive: true });

  const inputFields = p.inputs.map(i => `Input Field: ${i.type} ${i.name}`).join('\n');
  const structureMd = `Problem Name: "${p.title}"
Difficulty: ${p.difficulty}
Topics: ${p.topics.join(', ')}
Function Name: ${p.fnName}

Input Structure:
${inputFields}

Output Structure:
Output Field: ${p.output.type} ${p.output.name}
`;
  fs.writeFileSync(path.join(dir, 'Structure.md'), structureMd, 'utf8');

  const problemMd = `# ${p.title}\n\n${p.description}\n`;
  fs.writeFileSync(path.join(dir, 'Problem.md'), problemMd, 'utf8');

  fs.writeFileSync(path.join(dir, 'reference/solution.js'), p.solutionCode, 'utf8');
  fs.writeFileSync(path.join(dir, 'reference/baseline-solution.js'), p.baselineCode, 'utf8');
  fs.writeFileSync(path.join(dir, 'generators/test-cases.js'), p.testGenCode, 'utf8');

  console.log(`Created problem: ${p.slug}`);
}

for (const p of problems) {
  buildProblem(p);
}
