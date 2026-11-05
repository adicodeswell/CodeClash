export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { head: [1, 2, 2, 1] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { head: [1, 2] } });
  cases.push({ category: "basic", description: "Single node", inputs: { head: [1] } });
  cases.push({ category: "basic", description: "Odd palindrome", inputs: { head: [1, 2, 3, 2, 1] } });
  cases.push({ category: "basic", description: "Not palindrome", inputs: { head: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "All same", inputs: { head: [7, 7, 7, 7] } });
  cases.push({ category: "basic", description: "Zeros mid", inputs: { head: [1, 0, 1] } });
  cases.push({ category: "basic", description: "Two zeros", inputs: { head: [0, 0] } });
  cases.push({ category: "basic", description: "Even palindrome 6", inputs: { head: [1, 2, 3, 3, 2, 1] } });
  cases.push({ category: "basic", description: "Almost palindrome", inputs: { head: [1, 2, 3, 4, 2, 1] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const isPal = i % 2 === 0;
    const half = Array.from({ length: i + 1 }, (_, idx) => idx % 10);
    const head = isPal ? [...half, ...half.slice().reverse()] : [...half, 9];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { head } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { head: Array(20 + i).fill(i % 10) } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len = (i % 30) + 4;
    const isPal = i % 2 === 0;
    if (isPal) {
      const half = Array.from({ length: Math.floor(len / 2) }, () => Math.floor(Math.random() * 10));
      const mid = len % 2 === 1 ? [Math.floor(Math.random() * 10)] : [];
      cases.push({ category: "random", description: "Random " + i, inputs: { head: [...half, ...mid, ...half.slice().reverse()] } });
    } else {
      const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 10));
      arr[0] = 1;
      arr[arr.length - 1] = 2;
      cases.push({ category: "random", description: "Random " + i, inputs: { head: arr } });
    }
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len = 1000 + i * 100;
    const isPal = i % 2 === 0;
    const half = Array.from({ length: Math.floor(len / 2) }, (_, idx) => idx % 10);
    const head = isPal ? [...half, ...half.slice().reverse()] : [...half, 8, ...half.slice().reverse()];
    cases.push({ category: "large", description: "Large " + i, inputs: { head } });
  }

  return cases;
}