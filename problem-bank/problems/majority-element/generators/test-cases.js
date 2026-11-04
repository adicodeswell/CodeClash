// Test case generator for Majority Element.
// Produces 80 test cases across 6 key tiers:
// 1. Basic (0-9) - Statement examples + simple checks
// 2. Edge (10-24) - Single element, exact floor(N/2)+1 minimum threshold, zeros, negative numbers
// 3. Boundary (25-39) - Odd and even lengths from N=3 to 201, all-identical arrays
// 4. Random (40-59) - Diverse distributions and randomized noise
// 5. Stress (60-69) - Large arrays up to N=10,000
// 6. Adversarial (70-79) - Boyer-Moore vote cancellation sequences, end-heavy candidates

import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

function buildMajorityCase(rng, length, majorityVal, majorityCount, minNoise = -1000000, maxNoise = 1000000, distinctNoise = false) {
  const threshold = Math.floor(length / 2);
  const count = majorityCount !== undefined ? majorityCount : threshold + 1;
  const noiseCount = length - count;

  const nums = [];
  for (let i = 0; i < count; i++) {
    nums.push(majorityVal);
  }

  for (let i = 0; i < noiseCount; i++) {
    let noise;
    if (distinctNoise) {
      noise = maxNoise + (i + 1) * 7;
    } else {
      do {
        noise = randomInt(rng, minNoise, maxNoise);
      } while (noise === majorityVal);
    }
    nums.push(noise);
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
    inputs: { nums: [3, 2, 3] }, // output: 3
  });
  cases.push({
    category: "basic",
    description: "Example 2 from statement",
    inputs: { nums: [2, 2, 1, 1, 1, 2, 2] }, // output: 2
  });
  cases.push({
    category: "basic",
    description: "Small array with alternating elements",
    inputs: { nums: [1, 2, 1, 2, 1] }, // output: 1
  });
  cases.push({
    category: "basic",
    description: "All elements identical",
    inputs: { nums: [5, 5, 5, 5] }, // output: 5
  });
  cases.push({
    category: "basic",
    description: "Negative numbers majority",
    inputs: { nums: [-1, -1, 2, -1, 3] }, // output: -1
  });
  cases.push({
    category: "basic",
    description: "Zeros majority",
    inputs: { nums: [0, 1, 0, 0, 2] }, // output: 0
  });
  cases.push({
    category: "basic",
    description: "Small even array (N=4)",
    inputs: { nums: [7, 7, 7, 3] }, // output: 7
  });
  cases.push({
    category: "basic",
    description: "Majority element at start",
    inputs: { nums: [9, 9, 9, 1, 2] }, // output: 9
  });
  cases.push({
    category: "basic",
    description: "Majority element at end",
    inputs: { nums: [1, 2, 8, 8, 8] }, // output: 8
  });
  cases.push({
    category: "basic",
    description: "Balanced with three different noise elements",
    inputs: { nums: [4, 1, 4, 2, 4, 3, 4] }, // output: 4
  });

  // ==========================================
  // Category 2: Edge Cases (10 - 24)
  // ==========================================
  cases.push({
    category: "edge",
    description: "Single element array",
    inputs: { nums: [42] }, // output: 42
  });
  cases.push({
    category: "edge",
    description: "Single negative element",
    inputs: { nums: [-99] }, // output: -99
  });
  cases.push({
    category: "edge",
    description: "Single zero element",
    inputs: { nums: [0] }, // output: 0
  });
  cases.push({
    category: "edge",
    description: "N=2 identical elements",
    inputs: { nums: [100, 100] }, // output: 100
  });
  cases.push({
    category: "edge",
    description: "N=3 minimal majority (2 out of 3)",
    inputs: { nums: [10, 20, 10] }, // output: 10
  });
  cases.push({
    category: "edge",
    description: "Extreme positive bound (10^9)",
    inputs: { nums: [1000000000, 1, 1000000000] }, // output: 10^9
  });
  cases.push({
    category: "edge",
    description: "Extreme negative bound (-10^9)",
    inputs: { nums: [-1000000000, 0, -1000000000] }, // output: -10^9
  });
  cases.push({
    category: "edge",
    description: "Minimal majority threshold for even N=6 (4 out of 6)",
    inputs: { nums: [5, 1, 5, 2, 5, 5] }, // output: 5
  });
  cases.push({
    category: "edge",
    description: "Minimal majority threshold for odd N=7 (4 out of 7)",
    inputs: { nums: [8, 1, 8, 2, 8, 3, 8] }, // output: 8
  });
  cases.push({
    category: "edge",
    description: "All negative elements with majority",
    inputs: { nums: [-5, -10, -5, -20, -5] }, // output: -5
  });
  cases.push({
    category: "edge",
    description: "Majority element is 0 among large numbers",
    inputs: { nums: [1000000, 0, 0, -1000000, 0] }, // output: 0
  });
  cases.push({
    category: "edge",
    description: "Two noise numbers with majority appearing 4 times (N=7)",
    inputs: { nums: [1, 2, 9, 1, 9, 9, 9] }, // output: 9
  });
  cases.push({
    category: "edge",
    description: "Entire array is identical negative values",
    inputs: { nums: [-42, -42, -42, -42, -42] }, // output: -42
  });
  cases.push({
    category: "edge",
    description: "Majority value close to noise (e.g. 100 vs 101)",
    inputs: { nums: [100, 101, 100, 101, 100] }, // output: 100
  });
  cases.push({
    category: "edge",
    description: "N=8 with 5 majority elements",
    inputs: { nums: [3, 1, 3, 2, 3, 4, 3, 3] }, // output: 3
  });

  // ==========================================
  // Category 3: Boundary Cases (25 - 39)
  // Sizes N=9 to 201
  // ==========================================
  const boundarySizes = [9, 11, 15, 21, 25, 31, 41, 51, 65, 81, 99, 101, 125, 151, 201];
  for (let b = 0; b < boundarySizes.length; b++) {
    const size = boundarySizes[b];
    const majorityVal = randomInt(rng, -100000, 100000);
    const nums = buildMajorityCase(rng, size, majorityVal);
    cases.push({
      category: "boundary",
      description: `Boundary array size N=${size}`,
      inputs: { nums },
    });
  }

  // ==========================================
  // Category 4: Randomized Cases (40 - 59)
  // Sizes 40 to 400 with varied noise
  // ==========================================
  for (let r = 0; r < 20; r++) {
    const size = randomInt(rng, 40, 350);
    const majorityVal = randomInt(rng, -1000000, 1000000);
    const extra = randomInt(rng, 1, Math.max(1, Math.floor(size / 6)));
    const majorityCount = Math.floor(size / 2) + extra;
    const nums = buildMajorityCase(rng, size, majorityVal, majorityCount);
    cases.push({
      category: "random",
      description: `Random case #${r + 1} (N=${size}, majority count ${majorityCount})`,
      inputs: { nums },
    });
  }

  // ==========================================
  // Category 5: Stress Cases (60 - 69)
  // Up to N=10,000 elements
  // ==========================================
  // 60: N=10,000 exact minimum threshold (5,001 majority elements)
  cases.push({
    category: "stress",
    description: "N=10,000 with exact minimum majority count (5,001 vs 4,999)",
    inputs: { nums: buildMajorityCase(rng, 10000, 777777, 5001, -100000, 100000, true) },
  });

  // 61: N=10,000 all identical elements
  cases.push({
    category: "stress",
    description: "N=10,000 all identical elements",
    inputs: { nums: Array(10000).fill(123456) },
  });

  // 62: N=10,000 negative majority with extreme bound (-10^9)
  cases.push({
    category: "stress",
    description: "N=10,000 with extreme negative bound majority (-10^9)",
    inputs: { nums: buildMajorityCase(rng, 10000, -1000000000, 6000) },
  });

  // 63: N=10,000 positive majority with extreme bound (10^9)
  cases.push({
    category: "stress",
    description: "N=10,000 with extreme positive bound majority (10^9)",
    inputs: { nums: buildMajorityCase(rng, 10000, 1000000000, 6000) },
  });

  // 64: N=5,000 with 50% + 1 majority elements grouped at the start
  {
    const nums = [];
    for (let i = 0; i < 2501; i++) nums.push(888);
    for (let i = 0; i < 2499; i++) nums.push(i);
    cases.push({
      category: "stress",
      description: "N=5,000 all majority elements clustered at start",
      inputs: { nums },
    });
  }

  // 65: N=5,000 with 50% + 1 majority elements grouped at the end
  {
    const nums = [];
    for (let i = 0; i < 2499; i++) nums.push(i);
    for (let i = 0; i < 2501; i++) nums.push(888);
    cases.push({
      category: "stress",
      description: "N=5,000 all majority elements clustered at end",
      inputs: { nums },
    });
  }

  // 66: N=7,500 alternating majority and noise elements
  {
    const nums = [];
    for (let i = 0; i < 3749; i++) {
      nums.push(999);
      nums.push(i + 10000);
    }
    nums.push(999);
    nums.push(999);
    cases.push({
      category: "stress",
      description: "N=7,500 interleaved majority and distinct noise",
      inputs: { nums },
    });
  }

  // 67: N=8,000 with 90% overwhelming majority
  cases.push({
    category: "stress",
    description: "N=8,000 overwhelming 90% majority",
    inputs: { nums: buildMajorityCase(rng, 8000, 42, 7200) },
  });

  // 68: N=9,000 dense narrow noise range [-5..5]
  cases.push({
    category: "stress",
    description: "N=9,000 narrow noise range [-5..5]",
    inputs: { nums: buildMajorityCase(rng, 9000, 10, 4600, -5, 5) },
  });

  // 69: N=10,000 with majority element 0
  cases.push({
    category: "stress",
    description: "N=10,000 with majority element 0",
    inputs: { nums: buildMajorityCase(rng, 10000, 0, 5200) },
  });

  // ==========================================
  // Category 6: Adversarial / Trap Cases (70 - 79)
  // Boyer-Moore vote cancellation sequences
  // ==========================================
  // 70: Strict vote cancellation pairs at start, real majority candidate wins at the end
  {
    // [1, 2, 3, 4, 5, 6, 99, 99, 99, 99, 99] (N=11, 5 pairs of cancellation + 5 99s)
    const nums = [1, 2, 3, 4, 5, 6, 99, 99, 99, 99, 99, 99, 99]; // 6 noise, 7 majority (N=13)
    cases.push({
      category: "adversarial",
      description: "Boyer-Moore trap: rapid cancellation before majority appears",
      inputs: { nums },
    });
  }

  // 71: Fake candidate leads until the final 2 elements
  {
    // [1, 1, 1, 1, 2, 2, 2, 2, 2] (N=9, 1 appears 4 times, 2 appears 5 times)
    const nums = [1, 1, 1, 1, 2, 2, 2, 2, 2];
    cases.push({
      category: "adversarial",
      description: "Near-tie: fake candidate has early lead (4 vs 5)",
      inputs: { nums },
    });
  }

  // 72: High frequency false leads in 3-way race
  {
    // [1, 1, 1, 2, 2, 2, 3, 3, 3, 3] (N=10 -> wait, majority in 10 is >5. 11 elements: 3 appears 6 times:
    // [1, 1, 2, 2, 3, 3, 3, 3, 3] (N=9: 1 appears 2, 2 appears 2, 3 appears 5)
    const nums = [1, 1, 2, 2, 3, 3, 3, 3, 3];
    cases.push({
      category: "adversarial",
      description: "3-way candidate race where majority overtakes late",
      inputs: { nums },
    });
  }

  // 73: Interleaved cancelling pattern: [A, B, A, C, A, D, A, E, A]
  {
    const nums = [10, 1, 10, 2, 10, 3, 10, 4, 10]; // N=9, 10 appears 5 times
    cases.push({
      category: "adversarial",
      description: "Strict alternating cancellation: count repeatedly resets to 1 and 0",
      inputs: { nums },
    });
  }

  // 74: Noise elements all identical, majority just +1
  {
    // N=9: four 100s and five 200s
    const nums = [100, 200, 100, 200, 100, 200, 100, 200, 200];
    cases.push({
      category: "adversarial",
      description: "Single competing noise value with minimum threshold difference (+1)",
      inputs: { nums },
    });
  }

  // 75: Extreme magnitude contrast: majority is 1, noise is 10^9
  {
    const nums = [1000000000, 1, 1000000000, 1, 1];
    cases.push({
      category: "adversarial",
      description: "Extreme magnitude difference between majority and noise",
      inputs: { nums },
    });
  }

  // 76: Extreme magnitude contrast: majority is -10^9, noise is 10^9
  {
    const nums = [-1000000000, 1000000000, -1000000000, 1000000000, -1000000000];
    cases.push({
      category: "adversarial",
      description: "Opposite extreme limits (+/- 10^9)",
      inputs: { nums },
    });
  }

  // 77: Zero vs non-zero binary alternation
  {
    const nums = [0, 1, 0, 1, 0, 1, 0];
    cases.push({
      category: "adversarial",
      description: "Binary 0 and 1 alternation",
      inputs: { nums },
    });
  }

  // 78: Long sequence of unique noise followed by burst of majority
  {
    // N=15: 7 distinct noise elements, then 8 majority elements
    const nums = [1, 2, 3, 4, 5, 6, 7, 50, 50, 50, 50, 50, 50, 50, 50];
    cases.push({
      category: "adversarial",
      description: "Strictly unique noise prefix followed by solid majority suffix",
      inputs: { nums },
    });
  }

  // 79: Long burst of majority followed by alternating noise
  {
    // N=15: 8 majority elements followed by 7 distinct noise elements
    const nums = [50, 50, 50, 50, 50, 50, 50, 50, 1, 2, 3, 4, 5, 6, 7];
    cases.push({
      category: "adversarial",
      description: "Solid majority prefix followed by strictly unique noise suffix",
      inputs: { nums },
    });
  }

  return cases;
}
