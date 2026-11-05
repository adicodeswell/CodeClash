export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums1: [4, 1, 2], nums2: [1, 3, 4, 2] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums1: [2, 4], nums2: [1, 2, 3, 4] } });
  cases.push({ category: "basic", description: "Single element", inputs: { nums1: [1], nums2: [1] } });
  cases.push({ category: "basic", description: "Two elements greater", inputs: { nums1: [1], nums2: [1, 2] } });
  cases.push({ category: "basic", description: "Two elements smaller", inputs: { nums1: [2], nums2: [2, 1] } });
  cases.push({ category: "basic", description: "All decreasing", inputs: { nums1: [4, 3, 2], nums2: [5, 4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "All increasing", inputs: { nums1: [1, 2, 3], nums2: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "Alternating peaks", inputs: { nums1: [2, 1], nums2: [2, 3, 1, 4] } });
  cases.push({ category: "basic", description: "Subset unordered", inputs: { nums1: [10, 5], nums2: [1, 5, 2, 10, 20] } });
  cases.push({ category: "basic", description: "Identical arrays", inputs: { nums1: [3, 1, 4], nums2: [3, 1, 4] } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const nums2 = Array.from({ length: i + 2 }, (_, idx) => idx + 1);
    const nums1 = [nums2[0]];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { nums1, nums2 } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const nums2 = Array.from({ length: i + 3 }, (_, idx) => 100 - idx);
    const nums1 = [nums2[1]];
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nums1, nums2 } });
  }

  // Random (25)
  for (let i = 0; i < 25; i++) {
    const len2 = (i % 20) + 5;
    const set = new Set();
    while (set.size < len2) {
      set.add(Math.floor(Math.random() * 1000));
    }
    const nums2 = Array.from(set);
    const len1 = Math.floor(Math.random() * (len2 - 1)) + 1;
    const nums1 = nums2.slice(0, len1);
    cases.push({ category: "random", description: "Random " + i, inputs: { nums1, nums2 } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const len2 = 500 + i * 20;
    const nums2 = Array.from({ length: len2 }, (_, idx) => idx);
    const nums1 = Array.from({ length: 50 }, (_, idx) => idx * 5);
    cases.push({ category: "large", description: "Large " + i, inputs: { nums1, nums2 } });
  }

  return cases;
}