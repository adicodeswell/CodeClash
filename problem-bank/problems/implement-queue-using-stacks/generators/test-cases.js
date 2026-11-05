export function generateCases({ rng }) {
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
}