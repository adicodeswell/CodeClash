export function generateCases({ rng }) {
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
}