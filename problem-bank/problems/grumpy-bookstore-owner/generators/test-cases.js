export function generateCases({ rng }) {
  const cases = [];
  cases.push({ category: "basic", description: "Example 1", inputs: { customers: [1, 0, 1, 2, 1, 1, 7, 5], grumpy: [0, 1, 0, 1, 0, 1, 0, 1], minutes: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { customers: [1], grumpy: [0], minutes: 1 } });
  cases.push({ category: "basic", description: "Always grumpy", inputs: { customers: [2, 3, 4], grumpy: [1, 1, 1], minutes: 2 } });
  cases.push({ category: "basic", description: "Never grumpy", inputs: { customers: [2, 3, 4], grumpy: [0, 0, 0], minutes: 1 } });
  for (let i = 4; i < 10; i++) {
    cases.push({ category: "basic", description: "Basic " + i, inputs: { customers: [1, 2, 3, 4, 5], grumpy: [1, 0, 1, 0, 1], minutes: 2 } });
  }
  for (let i = 10; i < 25; i++) {
    const len = i - 8;
    cases.push({ category: "edge", description: "minutes = len " + i, inputs: { customers: Array.from({ length: len }, (_, idx) => idx + 1), grumpy: new Array(len).fill(1), minutes: len } });
  }
  for (let i = 25; i < 40; i++) {
    const len = i - 20;
    cases.push({ category: "corner", description: "minutes = 1 " + i, inputs: { customers: Array.from({ length: len }, () => 10), grumpy: Array.from({ length: len }, (_, idx) => idx % 2), minutes: 1 } });
  }
  for (let i = 40; i < 65; i++) {
    const len = 10 + (i % 15);
    const minutes = 1 + (i % len);
    const customers = Array.from({ length: len }, () => Math.floor(Math.random() * 20));
    const grumpy = Array.from({ length: len }, () => (Math.random() < 0.5 ? 0 : 1));
    cases.push({ category: "random", description: "Random " + i, inputs: { customers, grumpy, minutes } });
  }
  for (let i = 65; i < 80; i++) {
    const len = 80 + (i - 65) * 20;
    const minutes = 5 + (i % 15);
    const customers = Array.from({ length: len }, () => Math.floor(Math.random() * 50));
    const grumpy = Array.from({ length: len }, () => (Math.random() < 0.5 ? 0 : 1));
    cases.push({ category: "large", description: "Large " + i, inputs: { customers, grumpy, minutes } });
  }
  return cases;
}
