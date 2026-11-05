export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { operations: ["pushFront", "pushBack", "pushMiddle", "pushMiddle", "popFront", "popMiddle", "popMiddle", "popBack", "popFront"], values: [[1], [2], [3], [4], [], [], [], [], []] } });
  cases.push({ category: "basic", description: "Pop empty", inputs: { operations: ["popFront", "popMiddle", "popBack"], values: [[], [], []] } });
  cases.push({ category: "basic", description: "Single push pop", inputs: { operations: ["pushMiddle", "popMiddle"], values: [[99], []] } });
  cases.push({ category: "basic", description: "Push fronts", inputs: { operations: ["pushFront", "pushFront", "popBack", "popBack"], values: [[1], [2], [], []] } });
  cases.push({ category: "basic", description: "Push backs", inputs: { operations: ["pushBack", "pushBack", "popFront", "popFront"], values: [[1], [2], [], []] } });
  cases.push({ category: "basic", description: "Alternating push pop", inputs: { operations: ["pushFront", "popFront", "pushBack", "popBack"], values: [[10], [], [20], []] } });
  cases.push({ category: "basic", description: "Middle push even odd", inputs: { operations: ["pushBack", "pushBack", "pushMiddle", "popMiddle"], values: [[1], [3], [2], []] } });
  cases.push({ category: "basic", description: "Repeated middle pops", inputs: { operations: ["pushBack", "pushBack", "pushBack", "popMiddle", "popMiddle", "popMiddle"], values: [[1], [2], [3], [], [], []] } });
  cases.push({ category: "basic", description: "Mix all push types", inputs: { operations: ["pushFront", "pushMiddle", "pushBack", "popFront", "popBack"], values: [[5], [10], [15], [], []] } });
  cases.push({ category: "basic", description: "Empty check at end", inputs: { operations: ["pushFront", "popMiddle", "popFront"], values: [[7], [], []] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const ops = ["pushMiddle", "pushMiddle", "popMiddle", "popMiddle"];
    const vals = [[i + 1], [i + 2], [], []];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { operations: ops, values: vals } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const ops = ["popFront", "popMiddle", "popBack"];
    const vals = [[], [], []];
    cases.push({ category: "corner", description: "Corner " + i, inputs: { operations: ops, values: vals } });
  }

  // Random (25)
  const opsList = ["pushFront", "pushMiddle", "pushBack", "popFront", "popMiddle", "popBack"];
  for (let i = 0; i < 25; i++) {
    const ops = [];
    const vals = [];
    for (let step = 0; step < 20; step++) {
      const op = opsList[Math.floor(Math.random() * opsList.length)];
      ops.push(op);
      vals.push(op.startsWith("push") ? [Math.floor(Math.random() * 100) + 1] : []);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { operations: ops, values: vals } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const ops = [];
    const vals = [];
    for (let k = 0; k < 100; k++) {
      ops.push(k % 2 === 0 ? "pushMiddle" : "popMiddle");
      vals.push(k % 2 === 0 ? [k] : []);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { operations: ops, values: vals } });
  }

  return cases;
}