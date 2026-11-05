export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { heights: [4, 2, 7, 6, 9, 14, 12], bricks: 5, ladders: 1 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { heights: [4, 12, 2, 7, 3, 18, 20, 3, 19], bricks: 10, ladders: 2 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { heights: [14, 3, 19, 3], bricks: 17, ladders: 0 } });
  cases.push({ category: "basic", description: "Single building", inputs: { heights: [5], bricks: 0, ladders: 0 } });
  cases.push({ category: "basic", description: "Decreasing heights", inputs: { heights: [10, 8, 6, 4, 2], bricks: 0, ladders: 0 } });
  cases.push({ category: "basic", description: "Equal heights", inputs: { heights: [5, 5, 5, 5], bricks: 0, ladders: 0 } });
  cases.push({ category: "basic", description: "Ladders only", inputs: { heights: [1, 10, 20], bricks: 0, ladders: 2 } });
  cases.push({ category: "basic", description: "Bricks only", inputs: { heights: [1, 5, 10], bricks: 9, ladders: 0 } });
  cases.push({ category: "basic", description: "Blocked immediately", inputs: { heights: [1, 100], bricks: 10, ladders: 0 } });
  cases.push({ category: "basic", description: "Reach all with surplus", inputs: { heights: [2, 7, 9, 3, 1, 25], bricks: 100, ladders: 5 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const heights = Array.from({ length: i + 2 }, (_, idx) => (idx + 1) * 10);
    cases.push({ category: "edge", description: "Edge " + i, inputs: { heights, bricks: 10, ladders: 1 } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const heights = Array(i + 3).fill(50);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { heights, bricks: 0, ladders: 0 } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 20) + 5;
    const heights = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
    const bricks = Math.floor(Math.random() * 50);
    const ladders = Math.floor(Math.random() * 3);
    cases.push({ category: "random", description: "Random " + i, inputs: { heights, bricks, ladders } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 300 + i * 20;
    const heights = Array.from({ length: len }, (_, idx) => (idx * 13) % 100 + 1);
    cases.push({ category: "large", description: "Large " + i, inputs: { heights, bricks: 500, ladders: 10 } });
  }

  return cases;
}