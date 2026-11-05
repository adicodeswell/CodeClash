export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: {
      operations: ["add", "add", "add", "count", "count", "add", "count"],
      points: [[3, 10], [11, 2], [3, 2], [11, 10], [14, 8], [11, 2], [11, 10]]
    }
  });
  cases.push({
    category: "basic",
    description: "Single add count",
    inputs: {
      operations: ["add", "count"],
      points: [[0, 0], [0, 0]]
    }
  });
  cases.push({
    category: "basic",
    description: "Form square",
    inputs: {
      operations: ["add", "add", "add", "add", "count"],
      points: [[0, 0], [0, 2], [2, 0], [2, 2], [0, 0]]
    }
  });
  for (let i = 3; i < 10; i++) {
    const s = 1 + i;
    cases.push({
      category: "basic",
      description: "Basic square " + i,
      inputs: {
        operations: ["add", "add", "add", "count"],
        points: [[0, 0], [0, s], [s, 0], [s, s]]
      }
    });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({
      category: "edge",
      description: "Edge diagonal " + i,
      inputs: {
        operations: ["add", "count", "add", "count"],
        points: [[i, i], [i, i], [i + 1, i + 1], [i + 1, i + 1]]
      }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({
      category: "corner",
      description: "Corner multiple adds " + i,
      inputs: {
        operations: ["add", "add", "add", "add", "count", "count"],
        points: [[1, 1], [1, 3], [3, 1], [3, 3], [1, 1], [3, 3]]
      }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const ops = [];
    const pts = [];
    for (let j = 0; j < 25; j++) {
      const isAdd = Math.random() < 0.7;
      ops.push(isAdd ? "add" : "count");
      pts.push([Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)]);
    }
    cases.push({ category: "random", description: "Random " + i, inputs: { operations: ops, points: pts } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const ops = [];
    const pts = [];
    for (let j = 0; j < 80; j++) {
      const isAdd = Math.random() < 0.65;
      ops.push(isAdd ? "add" : "count");
      pts.push([Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)]);
    }
    cases.push({ category: "large", description: "Large " + i, inputs: { operations: ops, points: pts } });
  }

  return cases;
}
