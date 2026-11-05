export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { deadends: ["0201", "0101", "0102", "1212", "2002"], target: "0202" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { deadends: ["8888"], target: "0009" } });
  cases.push({ category: "basic", description: "Example 3 (Blocked)", inputs: { deadends: ["8887", "8889", "8878", "8898", "8788", "8988", "7888", "9888"], target: "8888" } });
  cases.push({ category: "basic", description: "Start blocked", inputs: { deadends: ["0000"], target: "8888" } });
  cases.push({ category: "basic", description: "Target at start", inputs: { deadends: ["1111"], target: "0000" } });
  cases.push({ category: "basic", description: "One step forward", inputs: { deadends: ["9999"], target: "1000" } });
  cases.push({ category: "basic", description: "One step backward", inputs: { deadends: ["1111"], target: "9000" } });
  cases.push({ category: "basic", description: "Two steps", inputs: { deadends: ["0001"], target: "0002" } });
  cases.push({ category: "basic", description: "Four wheel change", inputs: { deadends: ["0001", "0010"], target: "1111" } });
  cases.push({ category: "basic", description: "Wrap around all", inputs: { deadends: ["0001"], target: "9999" } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const deadends = ["000" + (i % 9 + 1)];
    const target = (i % 2 === 0) ? "00" + String(i % 5) + "0" : "0" + String(i % 5) + "00";
    cases.push({ category: "edge", description: "Edge " + i, inputs: { deadends, target } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const target = "0000";
    const deadends = ["1234", "5678"];
    cases.push({ category: "corner", description: "Corner " + i, inputs: { deadends, target } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const d1 = Math.floor(Math.random() * 9);
    const d2 = Math.floor(Math.random() * 9);
    const target = "00" + d1 + d2;
    const deadends = ["0101", "0011"];
    cases.push({ category: "random", description: "Random " + i, inputs: { deadends, target } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const target = "020" + (i % 10);
    const deadends = ["0100", "0101", "0102", "0103", "0104"];
    cases.push({ category: "large", description: "Large " + i, inputs: { deadends, target } });
  }

  return cases;
}