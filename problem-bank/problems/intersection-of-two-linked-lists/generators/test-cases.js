export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { intersectVal: 8, listA: [4, 1, 8, 4, 5], listB: [5, 6, 1, 8, 4, 5], skipA: 2, skipB: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { intersectVal: 2, listA: [1, 9, 1, 2, 4], listB: [3, 2, 4], skipA: 3, skipB: 1 } });
  cases.push({ category: "basic", description: "Example 3 (No intersection)", inputs: { intersectVal: 0, listA: [2, 6, 4], listB: [1, 5], skipA: 3, skipB: 2 } });
  cases.push({ category: "basic", description: "Single node intersect", inputs: { intersectVal: 5, listA: [5], listB: [5], skipA: 0, skipB: 0 } });
  cases.push({ category: "basic", description: "No intersect small", inputs: { intersectVal: 0, listA: [1, 2], listB: [3, 4], skipA: 2, skipB: 2 } });
  cases.push({ category: "basic", description: "Intersect at tail", inputs: { intersectVal: 10, listA: [1, 2, 10], listB: [3, 10], skipA: 2, skipB: 1 } });
  cases.push({ category: "basic", description: "Identical lists", inputs: { intersectVal: 7, listA: [7, 8, 9], listB: [7, 8, 9], skipA: 0, skipB: 0 } });
  cases.push({ category: "basic", description: "Single disjoint", inputs: { intersectVal: 0, listA: [100], listB: [200], skipA: 1, skipB: 1 } });
  cases.push({ category: "basic", description: "Intersect val 4", inputs: { intersectVal: 4, listA: [1, 4], listB: [2, 3, 4], skipA: 1, skipB: 2 } });
  cases.push({ category: "basic", description: "Disjoint 3", inputs: { intersectVal: 0, listA: [1, 3, 5], listB: [2, 4, 6], skipA: 3, skipB: 3 } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const intersect = i % 2 === 0;
    const v = intersect ? (i + 1) * 10 : 0;
    const listA = [1, 2, ...(intersect ? [v, v + 1] : [3, 4])];
    const listB = [5, ...(intersect ? [v, v + 1] : [6, 7])];
    const skipA = 2;
    const skipB = 1;
    cases.push({ category: "edge", description: "Edge " + i, inputs: { intersectVal: v, listA, listB, skipA, skipB } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const listA = Array.from({ length: 10 }, (_, idx) => idx + 1);
    const listB = Array.from({ length: 8 }, (_, idx) => idx + 20);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { intersectVal: 0, listA, listB, skipA: 10, skipB: 8 } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const intersect = i % 2 === 1;
    const v = intersect ? Math.floor(Math.random() * 500) + 1 : 0;
    const skipA = (i % 5) + 1;
    const skipB = (i % 4) + 1;
    const common = intersect ? [v, v + 2] : [];
    const listA = [...Array.from({ length: skipA }, (_, idx) => idx + 100), ...common];
    const listB = [...Array.from({ length: skipB }, (_, idx) => idx + 200), ...common];
    cases.push({ category: "random", description: "Random " + i, inputs: { intersectVal: v, listA, listB, skipA, skipB } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const v = (i + 1) * 77;
    const listA = [...Array.from({ length: 500 }, (_, idx) => idx), v];
    const listB = [...Array.from({ length: 400 }, (_, idx) => idx + 1000), v];
    cases.push({ category: "large", description: "Large " + i, inputs: { intersectVal: v, listA, listB, skipA: 500, skipB: 400 } });
  }

  return cases;
}