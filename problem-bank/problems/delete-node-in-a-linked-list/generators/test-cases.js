export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [4, 5, 1, 9], nodeVal: 5 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [4, 5, 1, 9], nodeVal: 1 } });
  cases.push({ category: "basic", description: "Two nodes", inputs: { head: [1, 2], nodeVal: 1 } });
  cases.push({ category: "basic", description: "Three nodes middle", inputs: { head: [1, 2, 3], nodeVal: 2 } });
  cases.push({ category: "basic", description: "Four nodes first", inputs: { head: [10, 20, 30, 40], nodeVal: 10 } });
  cases.push({ category: "basic", description: "Four nodes third", inputs: { head: [10, 20, 30, 40], nodeVal: 30 } });
  cases.push({ category: "basic", description: "Five nodes", inputs: { head: [100, 200, 300, 400, 500], nodeVal: 300 } });
  cases.push({ category: "basic", description: "Negatives", inputs: { head: [-5, -4, -3, -2, -1], nodeVal: -3 } });
  cases.push({ category: "basic", description: "Zeros", inputs: { head: [0, 1, 2], nodeVal: 0 } });
  cases.push({ category: "basic", description: "Multiples of 7", inputs: { head: [7, 14, 21, 28], nodeVal: 14 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const head = Array.from({ length: i + 3 }, (_, idx) => idx + 10);
    const nodeVal = head[1]; // not last node
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head, nodeVal } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const head = Array.from({ length: 15 }, (_, idx) => idx * 10 - 50);
    const nodeVal = head[i % (head.length - 1)];
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head, nodeVal } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 5;
    const set = new Set();
    while (set.size < len) {
      set.add(Math.floor(Math.random() * 2000) - 1000);
    }
    const head = Array.from(set);
    const nodeVal = head[Math.floor(Math.random() * (head.length - 1))];
    cases.push({ category: "random", description: "Random " + i, inputs: { head, nodeVal } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 500 + i * 20;
    const head = Array.from({ length: len }, (_, idx) => idx);
    const nodeVal = head[100 + i * 5];
    cases.push({ category: "large", description: "Large " + i, inputs: { head, nodeVal } });
  }

  return cases;
}