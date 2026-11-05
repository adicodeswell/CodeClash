export function generateCases({ rng }) {
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
}