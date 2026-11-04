// Test case generator for Single Number.
// Generates 80 test cases across 6 key tiers:
// 1. Basic (0-9) - Statement examples + simple checks
// 2. Edge (10-24) - Single element arrays, 0, negative numbers, extreme +/- 10^9, positions [0, N/2, N-1]
// 3. Boundary (25-39) - Array sizes N=3 to 201 with varied signs
// 4. Random (40-59) - Diverse pair sets and random single elements
// 5. Stress (60-69) - Maximum size up to N=10,001 (5,000 pairs + 1 single)
// 6. Adversarial (70-79) - Bit pattern cancellation, powers of 2, dense low-bit sharing

import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

function buildSingleNumberCase(rng, pairCount, singleVal, minVal = -1000000, maxVal = 1000000) {
  const used = new Set([singleVal]);
  const nums = [singleVal];

  for (let i = 0; i < pairCount; i++) {
    let pairVal;
    let attempts = 0;
    while (attempts < 200) {
      attempts++;
      pairVal = randomInt(rng, minVal, maxVal);
      if (!used.has(pairVal)) break;
    }
    if (attempts >= 200) pairVal = maxVal + (i + 1) * 7;
    used.add(pairVal);
    nums.push(pairVal, pairVal);
  }

  return shuffle(rng, nums);
}

export function generateCases({ rng } = {}) {
  const cases = [];

  // ==========================================
  // Category 1: Basic Cases (0 - 9)
  // Preserving statement examples
  // ==========================================
  cases.push({
    category: "basic",
    description: "Example 1 from statement",
    inputs: { nums: [2, 2, 1] }, // output: 1
  });
  cases.push({
    category: "basic",
    description: "Example 2 from statement",
    inputs: { nums: [4, 1, 2, 1, 2] }, // output: 4
  });
  cases.push({
    category: "basic",
    description: "Example 3 from statement",
    inputs: { nums: [1] }, // output: 1
  });
  cases.push({
    category: "basic",
    description: "Single element is zero",
    inputs: { nums: [0] }, // output: 0
  });
  cases.push({
    category: "basic",
    description: "Single element is negative",
    inputs: { nums: [-1, 2, 2] }, // output: -1
  });
  cases.push({
    category: "basic",
    description: "Negative duplicate pairs",
    inputs: { nums: [-2, -2, -3] }, // output: -3
  });
  cases.push({
    category: "basic",
    description: "Single element in middle",
    inputs: { nums: [10, 20, 30, 20, 10] }, // output: 30
  });
  cases.push({
    category: "basic",
    description: "Single element at very start",
    inputs: { nums: [99, 1, 1, 2, 2] }, // output: 99
  });
  cases.push({
    category: "basic",
    description: "Single element at very end",
    inputs: { nums: [1, 1, 2, 2, 99] }, // output: 99
  });
  cases.push({
    category: "basic",
    description: "Pairs with value zero",
    inputs: { nums: [0, 5, 0] }, // output: 5
  });

  // ==========================================
  // Category 2: Edge Cases (10 - 24)
  // ==========================================
  cases.push({
    category: "edge",
    description: "Single negative value array (N=1)",
    inputs: { nums: [-42] }, // output: -42
  });
  cases.push({
    category: "edge",
    description: "Extreme positive bound (10^9)",
    inputs: { nums: [1000000000] }, // output: 10^9
  });
  cases.push({
    category: "edge",
    description: "Extreme negative bound (-10^9)",
    inputs: { nums: [-1000000000] }, // output: -10^9
  });
  cases.push({
    category: "edge",
    description: "Single element is 0 among large numbers",
    inputs: { nums: [1000000, 0, 1000000] }, // output: 0
  });
  cases.push({
    category: "edge",
    description: "Extreme +/- 10^9 pairs with 0 as single element",
    inputs: { nums: [1000000000, 0, 1000000000, -1000000000, -1000000000] }, // output: 0
  });
  cases.push({
    category: "edge",
    description: "Single value is 10^9 with smaller pairs",
    inputs: { nums: [1, 2, 1000000000, 1, 2] }, // output: 10^9
  });
  cases.push({
    category: "edge",
    description: "Single value is -10^9 with positive pairs",
    inputs: { nums: [5, 10, -1000000000, 5, 10] }, // output: -10^9
  });
  cases.push({
    category: "edge",
    description: "Single element is 1, pair is -1",
    inputs: { nums: [-1, 1, -1] }, // output: 1
  });
  cases.push({
    category: "edge",
    description: "Single element is -1, pair is 1",
    inputs: { nums: [1, -1, 1] }, // output: -1
  });
  cases.push({
    category: "edge",
    description: "Alternating signs within pairs",
    inputs: { nums: [-10, 10, -10, 10, 42] }, // output: 42
  });
  cases.push({
    category: "edge",
    description: "Consecutive integer values (N=5)",
    inputs: { nums: [1, 2, 3, 2, 1] }, // output: 3
  });
  cases.push({
    category: "edge",
    description: "Powers of two pairs with single element 0",
    inputs: { nums: [2, 4, 8, 0, 2, 4, 8] }, // output: 0
  });
  cases.push({
    category: "edge",
    description: "Single element equals sum of one pair",
    inputs: { nums: [3, 3, 6] }, // output: 6
  });
  cases.push({
    category: "edge",
    description: "Two negative pairs and one positive single",
    inputs: { nums: [-5, -15, 10, -5, -15] }, // output: 10
  });
  cases.push({
    category: "edge",
    description: "N=7 with all negative numbers",
    inputs: { nums: [-1, -2, -3, -4, -1, -2, -3] }, // output: -4
  });

  // ==========================================
  // Category 3: Boundary Cases (25 - 39)
  // Sizes N=7 to 201
  // ==========================================
  const boundarySizes = [3, 5, 7, 11, 15, 21, 31, 45, 61, 81, 101, 125, 151, 175, 201];
  for (let b = 0; b < boundarySizes.length; b++) {
    const size = boundarySizes[b];
    const pairCount = Math.floor(size / 2);
    const singleVal = randomInt(rng, -50000, 50000);
    const nums = buildSingleNumberCase(rng, pairCount, singleVal);
    cases.push({
      category: "boundary",
      description: `Boundary array size N=${size} (pairs=${pairCount})`,
      inputs: { nums },
    });
  }

  // ==========================================
  // Category 4: Randomized Cases (40 - 59)
  // Sizes 41 to 351
  // ==========================================
  for (let r = 0; r < 20; r++) {
    const pairCount = randomInt(rng, 20, 175);
    const singleVal = randomInt(rng, -1000000, 1000000);
    const nums = buildSingleNumberCase(rng, pairCount, singleVal);
    cases.push({
      category: "random",
      description: `Randomized case #${r + 1} (N=${nums.length})`,
      inputs: { nums },
    });
  }

  // ==========================================
  // Category 5: Stress Cases (60 - 69)
  // Up to N=10,001 elements (5,000 pairs + 1 single)
  // ==========================================
  // 60: N=10,001 with single element at index 0
  {
    const nums = [888888];
    for (let i = 1; i <= 5000; i++) {
      nums.push(i, i);
    }
    cases.push({
      category: "stress",
      description: "N=10,001 with single element at index 0",
      inputs: { nums },
    });
  }

  // 61: N=10,001 with single element at index 10,000 (last element)
  {
    const nums = [];
    for (let i = 1; i <= 5000; i++) {
      nums.push(i, i);
    }
    nums.push(888888);
    cases.push({
      category: "stress",
      description: "N=10,001 with single element at last index",
      inputs: { nums },
    });
  }

  // 62: N=10,001 with single element in exact middle (index 5,000)
  {
    const nums = [];
    for (let i = 1; i <= 2500; i++) nums.push(i, i);
    nums.push(888888);
    for (let i = 2501; i <= 5000; i++) nums.push(i, i);
    cases.push({
      category: "stress",
      description: "N=10,001 with single element at exact middle",
      inputs: { nums },
    });
  }

  // 63: N=10,001 completely shuffled
  cases.push({
    category: "stress",
    description: "N=10,001 5,000 pairs completely shuffled",
    inputs: { nums: buildSingleNumberCase(rng, 5000, -777777) },
  });

  // 64: N=5,001 all negative numbers
  cases.push({
    category: "stress",
    description: "N=5,001 all negative numbers",
    inputs: { nums: buildSingleNumberCase(rng, 2500, -999999, -5000000, -1) },
  });

  // 65: N=6,001 with single element 0
  cases.push({
    category: "stress",
    description: "N=6,001 with single element 0",
    inputs: { nums: buildSingleNumberCase(rng, 3000, 0) },
  });

  // 66: N=7,501 with large positive values [10^6..10^8]
  cases.push({
    category: "stress",
    description: "N=7,501 large positive values",
    inputs: { nums: buildSingleNumberCase(rng, 3750, 99999999, 1000000, 100000000) },
  });

  // 67: N=8,001 dense values around zero [-4000..4000]
  cases.push({
    category: "stress",
    description: "N=8,001 dense values around zero",
    inputs: { nums: buildSingleNumberCase(rng, 4000, 12345, -5000, 5000) },
  });

  // 68: N=9,001 with extreme single bound (10^9)
  cases.push({
    category: "stress",
    description: "N=9,001 with extreme single bound (10^9)",
    inputs: { nums: buildSingleNumberCase(rng, 4500, 1000000000) },
  });

  // 69: N=10,001 with extreme single bound (-10^9)
  cases.push({
    category: "stress",
    description: "N=10,001 with extreme single bound (-10^9)",
    inputs: { nums: buildSingleNumberCase(rng, 5000, -1000000000) },
  });

  // ==========================================
  // Category 6: Adversarial / Trap Cases (70 - 79)
  // ==========================================
  // 70: Powers of 2 pairs: [1, 1, 2, 2, 4, 4, 8, 8, 16]
  {
    const nums = [1, 1, 2, 2, 4, 4, 8, 8, 16, 16, 32, 32, 64];
    cases.push({
      category: "adversarial",
      description: "Powers of 2 pairs with power of 2 single",
      inputs: { nums: shuffle(rng, nums) },
    });
  }

  // 71: Bitmask trap: all pairs have bits set in common with single element
  {
    // single = 255 (0xFF). pairs all have low byte 0xFF
    const nums = [255];
    for (let i = 1; i <= 20; i++) {
      const v = (i << 8) | 255;
      nums.push(v, v);
    }
    cases.push({
      category: "adversarial",
      description: "Bitmask trap: all elements share 0xFF low byte",
      inputs: { nums: shuffle(rng, nums) },
    });
  }

  // 72: High bit trap: elements with 30th bit set (near 10^9)
  {
    const single = (1 << 29) + 42;
    const nums = [single];
    for (let i = 1; i <= 15; i++) {
      const v = (1 << 29) + i * 100;
      nums.push(v, v);
    }
    cases.push({
      category: "adversarial",
      description: "High bit trap: all numbers near 2^29",
      inputs: { nums: shuffle(rng, nums) },
    });
  }

  // 73: Adjacent pairs [1, 2, 1, 2, 3, 4, 3, 4, 5]
  {
    const nums = [1, 2, 1, 2, 3, 4, 3, 4, 5];
    cases.push({
      category: "adversarial",
      description: "Interleaved duplicate pairs",
      inputs: { nums },
    });
  }

  // 74: Single element 1 among high magnitude pairs
  {
    const nums = [1, 1000000000, 1000000000, 999999999, 999999999];
    cases.push({
      category: "adversarial",
      description: "Single element 1 among 10^9 pairs",
      inputs: { nums },
    });
  }

  // 75: Single element 0 with negative and positive mirror pairs
  {
    const nums = [0, -100, -100, 100, 100, -200, -200, 200, 200];
    cases.push({
      category: "adversarial",
      description: "Single element 0 with symmetric mirror pairs",
      inputs: { nums: shuffle(rng, nums) },
    });
  }

  // 76: Extreme negative single with small positive pairs
  {
    const nums = [-1000000000, 1, 2, 3, 1, 2, 3];
    cases.push({
      category: "adversarial",
      description: "Single element -10^9 with small positive pairs",
      inputs: { nums },
    });
  }

  // 77: Sparse bit patterns
  {
    const nums = [3];
    for (let k = 2; k <= 12; k++) {
      const v = (1 << k) + 1;
      nums.push(v, v);
    }
    cases.push({
      category: "adversarial",
      description: "Sparse bit patterns (2^k + 1)",
      inputs: { nums: shuffle(rng, nums) },
    });
  }

  // 78: Alternating positive and negative pairs
  {
    const nums = [42, -5, -5, 5, 5, -15, -15, 15, 15];
    cases.push({
      category: "adversarial",
      description: "Alternating sign pairs with single positive element",
      inputs: { nums },
    });
  }

  // 79: Single element appears at the boundary of a sorted list
  {
    const nums = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6];
    cases.push({
      category: "adversarial",
      description: "Sorted array with single element at the very end",
      inputs: { nums },
    });
  }

  return cases;
}
