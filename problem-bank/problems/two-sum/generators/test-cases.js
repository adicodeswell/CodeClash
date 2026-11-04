// Generates ~80 high-quality, categorized test cases for Two Sum.
// Categories:
// 1. Basic (0-9) - Includes canonical examples and small sanity checks
// 2. Edge (10-24) - Minimum lengths, boundary positions, zeros, large bounds
// 3. Boundary (25-39) - Array sizes from 3 to 150, extreme values +/- 10^9
// 4. Random (40-59) - Varied sizes (50-500) and random distributions
// 5. Stress (60-69) - Maximum size (up to N = 10,000), worst-case O(N^2) killers
// 6. Adversarial (70-79) - Near-miss sums, hash collision traps, duplicate values

import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

// Fast O(N) verifier to ensure EXACTLY one pair sums to target.
function countTwoSumPairs(nums, target) {
  const seen = new Map();
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      count += seen.get(complement);
    }
    seen.set(nums[i], (seen.get(nums[i]) || 0) + 1);
  }

  return count;
}

// Helper to construct a safe array with a single guaranteed pair for target.
function buildUniquePairCase(rng, length, target, valA, valB, posA = -1, posB = -1, minVal = -10000000, maxVal = 10000000) {
  if (valA + valB !== target) {
    throw new Error(`valA (${valA}) + valB (${valB}) does not equal target (${target})`);
  }

  const nums = new Array(length);
  const used = new Set();
  used.add(valA);
  used.add(valB);

  // Determine positions for valA and valB
  let i = posA >= 0 ? posA : randomInt(rng, 0, length - 2);
  let j = posB >= 0 ? posB : randomInt(rng, i + 1, length - 1);
  if (i >= j) {
    const tmp = i;
    i = j;
    j = tmp;
  }
  if (i === j) j = (i + 1) % length;
  if (i > j) { const t = i; i = j; j = t; }

  nums[i] = valA;
  nums[j] = valB;

  // Track existing values to prevent any other pair from summing to target
  const existing = new Set([valA, valB]);

  for (let idx = 0; idx < length; idx++) {
    if (idx === i || idx === j) continue;

    let candidate;
    let attempts = 0;
    while (attempts < 500) {
      attempts++;
      candidate = randomInt(rng, minVal, maxVal);

      // Candidate cannot be valA or valB
      if (candidate === valA || candidate === valB) continue;

      // Candidate cannot complete a pair to target with any element already in array
      const complement = target - candidate;
      if (existing.has(complement)) continue;

      // If target is even, candidate cannot be target/2 if target/2 is already present
      if (candidate * 2 === target && existing.has(candidate)) continue;

      break;
    }

    if (attempts >= 500) {
      // Fallback: pick a number far away
      candidate = maxVal + idx * 13;
    }

    nums[idx] = candidate;
    existing.add(candidate);
  }

  if (countTwoSumPairs(nums, target) !== 1) {
    throw new Error(`Failed to generate unique pair case for target ${target}`);
  }

  return { nums, target };
}

export function generateCases({ rng, count = 80 } = {}) {
  const cases = [];

  // ==========================================
  // Category 1: Basic Cases (0 - 9)
  // Preserving existing 0.txt - 6.txt as samples
  // ==========================================
  cases.push({
    category: "basic",
    description: "Example 1 from statement",
    inputs: { nums: [2, 7, 11, 15], target: 9 },
  });
  cases.push({
    category: "basic",
    description: "Example 2 from statement",
    inputs: { nums: [3, 2, 4], target: 6 },
  });
  cases.push({
    category: "basic",
    description: "Example 3 from statement",
    inputs: { nums: [3, 3], target: 6 },
  });
  cases.push({
    category: "basic",
    description: "Sample with negative and target 0",
    inputs: { nums: [-3, 4, 3, 90], target: 0 },
  });
  cases.push({
    category: "basic",
    description: "Sample with all negative numbers",
    inputs: { nums: [-1, -2, -3, -4, -5], target: -8 },
  });
  cases.push({
    category: "basic",
    description: "Sample with multiple zeros and target 0",
    inputs: { nums: [0, 4, 3, 0], target: 0 },
  });
  cases.push({
    category: "basic",
    description: "Sample with target at boundaries [0, 4]",
    inputs: { nums: [1, 10, 20, 30, 9], target: 10 },
  });
  cases.push({
    category: "basic",
    description: "Small array with hundreds",
    inputs: { nums: [5, 75, 25], target: 100 },
  });
  cases.push({
    category: "basic",
    description: "Four numbers summing to 5000",
    inputs: { nums: [1000, 2000, 3500, 4000], target: 5000 },
  });
  cases.push({
    category: "basic",
    description: "Mixed positive and negative small array",
    inputs: { nums: [-50, -20, 70, 10], target: 20 },
  });

  // ==========================================
  // Category 2: Edge Cases (10 - 24)
  // ==========================================
  cases.push({
    category: "edge",
    description: "Minimum size N=2 with zeros",
    inputs: { nums: [0, 0], target: 0 },
  });
  cases.push({
    category: "edge",
    description: "Minimum size N=2 with opposite values",
    inputs: { nums: [1, -1], target: 0 },
  });
  cases.push({
    category: "edge",
    description: "Minimum size N=2 with extreme negative",
    inputs: { nums: [-1000000000, 1], target: -999999999 },
  });
  cases.push({
    category: "edge",
    description: "Minimum size N=2 with extreme positive and negative",
    inputs: { nums: [1000000000, -1000000000], target: 0 },
  });
  cases.push({
    category: "edge",
    description: "Minimum size N=2 with large positive values summing to 10^9",
    inputs: { nums: [500000000, 500000000], target: 1000000000 },
  });
  cases.push({
    category: "edge",
    description: "Minimum size N=2 with large negative values summing to -10^9",
    inputs: { nums: [-500000000, -500000000], target: -1000000000 },
  });
  cases.push({
    category: "edge",
    description: "Pair at first two indices [0, 1] in N=10",
    inputs: { nums: [10, 20, 1, 2, 3, 4, 5, 6, 7, 8], target: 30 },
  });
  cases.push({
    category: "edge",
    description: "Pair at last two indices [8, 9] in N=10",
    inputs: { nums: [1, 2, 3, 4, 5, 6, 7, 8, 50, 60], target: 110 },
  });
  cases.push({
    category: "edge",
    description: "Pair at ends [0, N-1] in N=8",
    inputs: { nums: [42, 1, 2, 3, 4, 5, 6, 58], target: 100 },
  });
  cases.push({
    category: "edge",
    description: "Trap: target/2 appears once, cannot be paired with itself",
    inputs: { nums: [5, 1, 9], target: 10 },
  });
  cases.push({
    category: "edge",
    description: "Trap: target/2 appears once in larger array",
    inputs: { nums: [15, 2, 3, 8, 22], target: 30 },
  });
  cases.push({
    category: "edge",
    description: "Multiple non-solution duplicates",
    inputs: { nums: [7, 7, 7, 7, 10, 25], target: 35 },
  });
  cases.push({
    category: "edge",
    description: "Negative target with mixed large values",
    inputs: { nums: [-500, 100, 200, -300], target: -800 },
  });
  cases.push({
    category: "edge",
    description: "Array of zeros except one single pair",
    inputs: { nums: [0, 0, 0, 17, 0, 23, 0], target: 40 },
  });
  cases.push({
    category: "edge",
    description: "Array where element equals target, but pair is elsewhere",
    inputs: { nums: [100, 20, 30, 45, 55], target: 100 },
  });

  // ==========================================
  // Category 3: Boundary Cases (25 - 39)
  // ==========================================
  cases.push({
    category: "boundary",
    description: "N=3 with target = 10^9",
    inputs: { nums: [1000000000, 0, 500], target: 1000000000 },
  });
  cases.push({
    category: "boundary",
    description: "N=3 with target = -10^9",
    inputs: { nums: [-1000000000, 0, 500], target: -1000000000 },
  });
  cases.push({
    category: "boundary",
    description: "N=4 with maximum bounds +/- 999999999 and target 0",
    inputs: { nums: [-999999999, 1, 2, 999999999], target: 0 },
  });
  cases.push({
    category: "boundary",
    description: "N=5 consecutive integers",
    inputs: { nums: [100, 101, 102, 103, 104], target: 207 },
  });
  cases.push({
    category: "boundary",
    description: "N=6 negative powers of 2",
    inputs: { nums: [-1, -2, -4, -8, -16, -32], target: -33 },
  });
  cases.push({
    category: "boundary",
    description: "N=7 positive powers of 2",
    inputs: { nums: [1, 2, 4, 8, 16, 32, 64], target: 65 },
  });

  // Generated boundary cases with sizes 10, 20, 30, 50, 75, 100, 120, 150
  const boundarySizes = [10, 20, 30, 50, 75, 100, 100, 120, 150];
  for (let bIdx = 0; bIdx < boundarySizes.length; bIdx++) {
    const size = boundarySizes[bIdx];
    const target = bIdx % 2 === 0 ? randomInt(rng, 1000, 100000) : randomInt(rng, -100000, -1000);
    const valA = randomInt(rng, -50000, 50000);
    const valB = target - valA;
    const testCase = buildUniquePairCase(rng, size, target, valA, valB);
    cases.push({
      category: "boundary",
      description: `Boundary array size N=${size} with target ${target}`,
      inputs: testCase,
    });
  }

  // ==========================================
  // Category 4: Randomized Cases (40 - 59)
  // Sizes 40 to 400 with diverse ranges
  // ==========================================
  for (let rIdx = 0; rIdx < 20; rIdx++) {
    const size = randomInt(rng, 40, 350);
    const target = randomInt(rng, -1000000, 1000000);
    const valA = randomInt(rng, -500000, 500000);
    const valB = target - valA;
    const testCase = buildUniquePairCase(rng, size, target, valA, valB);
    cases.push({
      category: "random",
      description: `Randomized case #${rIdx + 1} with N=${size}`,
      inputs: testCase,
    });
  }

  // ==========================================
  // Category 5: Stress Cases (60 - 69)
  // Large scale tests up to N=10,000 (O(N^2) killers)
  // ==========================================
  // 60: N=10,000, pair at [9998, 9999] (worst case for quadratic loop)
  cases.push({
    category: "stress",
    description: "N=10,000 with pair at last two positions [9998, 9999] (O(N^2) killer)",
    inputs: buildUniquePairCase(rng, 10000, 2000000, 999999, 1000001, 9998, 9999),
  });

  // 61: N=10,000, pair at [0, 9999] (first and last)
  cases.push({
    category: "stress",
    description: "N=10,000 with pair at first and last positions [0, 9999]",
    inputs: buildUniquePairCase(rng, 10000, 0, -5000000, 5000000, 0, 9999),
  });

  // 62: N=10,000, pair at middle [4999, 5000]
  cases.push({
    category: "stress",
    description: "N=10,000 with pair at middle [4999, 5000]",
    inputs: buildUniquePairCase(rng, 10000, 777777, 333333, 444444, 4999, 5000),
  });

  // 63: N=10,000, pair at [0, 1]
  cases.push({
    category: "stress",
    description: "N=10,000 with pair at first two elements [0, 1]",
    inputs: buildUniquePairCase(rng, 10000, 123456, 60000, 63456, 0, 1),
  });

  // 64: N=5,000, all negative numbers, pair at [4998, 4999]
  cases.push({
    category: "stress",
    description: "N=5,000 all negative numbers, pair at end",
    inputs: buildUniquePairCase(rng, 5000, -888888, -400000, -488888, 4998, 4999, -5000000, -1),
  });

  // 65: N=6,000, alternating positive/negative
  cases.push({
    category: "stress",
    description: "N=6,000 mixed values, pair at [2999, 3000]",
    inputs: buildUniquePairCase(rng, 6000, 1000000, 450000, 550000, 2999, 3000),
  });

  // 66: N=7,500, random dense values
  cases.push({
    category: "stress",
    description: "N=7,500 dense distribution, pair at [7000, 7499]",
    inputs: buildUniquePairCase(rng, 7500, -12345, -100000, 87655, 7000, 7499),
  });

  // 67: N=8,000, target = 0
  cases.push({
    category: "stress",
    description: "N=8,000 with target = 0, pair at [7998, 7999]",
    inputs: buildUniquePairCase(rng, 8000, 0, -1234567, 1234567, 7998, 7999),
  });

  // 68: N=9,000, large positive numbers
  cases.push({
    category: "stress",
    description: "N=9,000 large range numbers",
    inputs: buildUniquePairCase(rng, 9000, 50000000, 20000000, 30000000, 8000, 8999),
  });

  // 69: N=10,000, target = 10^9, pair at [500, 9500]
  cases.push({
    category: "stress",
    description: "N=10,000 with target = 10^9",
    inputs: buildUniquePairCase(rng, 10000, 1000000000, 400000000, 600000000, 500, 9500),
  });

  // ==========================================
  // Category 6: Adversarial / Trap Cases (70 - 79)
  // ==========================================
  // 70: Hash collision trap: numbers all share lower bits (congruent modulo 2^16)
  // Using powers of 2 for multipliers guarantees exact mathematical uniqueness of pair sums
  {
    const mask = 65536; // 2^16
    const nums = [];
    for (let k = 0; k < 14; k++) {
      nums.push((1 << k) * mask + 7);
    }
    const target = nums[2] + nums[11];
    cases.push({
      category: "adversarial",
      description: "Hash collision trap: all numbers congruent modulo 2^16 with unique power-of-2 sums",
      inputs: { nums, target },
    });
  }

  // 71: Many numbers close to target/2 (near misses)
  {
    // target = 100. Numbers around 50 without matching pairs: 48, 49, 50 (once), 54, 55.
    // Real pair: 42 + 58 = 100
    const nums = [48, 49, 50, 54, 55, 42, 58, 12, 91, 3];
    const target = 100;
    cases.push({
      category: "adversarial",
      description: "Near-miss trap: many elements clustered around target / 2",
      inputs: { nums, target },
    });
  }

  // 72: Arithmetic progression with exactly one pair matching
  {
    const nums = [5, 10, 16, 22, 29, 37, 47, 60, 75];
    const target = 57; // 10 + 47 = 57
    cases.push({
      category: "adversarial",
      description: "Non-linear progression with only one valid sum",
      inputs: { nums, target },
    });
  }

  // 73: Anti-two-pointer trap: unsorted array that looks almost sorted
  {
    const nums = [1, 2, 3, 4, 100, 6, 7, 8, 9, 50];
    const target = 150; // 100 + 50
    cases.push({
      category: "adversarial",
      description: "Anti-two-pointer trap: mostly sorted array with outliers forming solution",
      inputs: { nums, target },
    });
  }

  // 74: Anti-greedy trap: elements with extreme magnitude differences
  {
    const nums = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1000000, 2000000];
    const target = 3000000;
    cases.push({
      category: "adversarial",
      description: "Anti-greedy trap: powers of 2 with extreme magnitude outliers",
      inputs: { nums, target },
    });
  }

  // 75: Sparse array with huge gaps
  {
    const nums = [3, 30, 300, 3000, 30000, 300000, 3000000, 7, 70, 700];
    const target = 3000007; // 3000000 + 7
    cases.push({
      category: "adversarial",
      description: "Sparse magnitude powers with single cross-order sum",
      inputs: { nums, target },
    });
  }

  // 76: False sum traps: pairs summing to target - 1 and target + 1
  {
    // target = 1000. Pairs: 398 + 601 = 999, 402 + 599 = 1001, but ONLY 350 + 650 = 1000
    const nums = [398, 402, 599, 601, 100, 210, 350, 650, 850];
    const target = 1000;
    cases.push({
      category: "adversarial",
      description: "Near-miss trap: pairs summing to target-1 and target+1",
      inputs: { nums, target },
    });
  }

  // 77: Duplicate values of non-pair numbers
  {
    const nums = [99, 99, 99, 99, 99, 99, 99, 99, 80, 120, 1, 2, 3];
    const target = 200; // 80 + 120
    cases.push({
      category: "adversarial",
      description: "Duplicates trap: repeated non-pair elements with target 200",
      inputs: { nums, target },
    });
  }

  // 78: Negative target near-miss traps
  {
    // target = -500. Pairs: -199 + -302 = -501, -201 + -298 = -499, ONLY -150 + -350 = -500
    const nums = [-199, -302, -201, -298, -50, -10, -150, -350, 110];
    const target = -500;
    cases.push({
      category: "adversarial",
      description: "Negative near-miss trap: pairs summing to target-1 and target+1",
      inputs: { nums, target },
    });
  }

  // 79: Ultimate stress + trap: N=10,000 with repeated non-pair values and target = 0
  {
    const nums = new Array(10000);
    // Fill with repeated positive numbers: 7, 13, 21...
    for (let i = 0; i < 9998; i++) {
      nums[i] = ((i % 50) + 1) * 10; // 10, 20, ..., 500 (all positive!)
    }
    nums[9998] = -1234567;
    nums[9999] = 1234567;
    const target = 0;
    cases.push({
      category: "adversarial",
      description: "Ultimate stress + trap: N=10,000 all positive noise, pair at [9998, 9999] summing to 0",
      inputs: { nums, target },
    });
  }

  // Double check that every single generated case has exactly 1 pair!
  for (let idx = 0; idx < cases.length; idx++) {
    const c = cases[idx];
    const pairs = countTwoSumPairs(c.inputs.nums, c.inputs.target);
    if (pairs !== 1) {
      throw new Error(`Test case #${idx} (${c.description}) has ${pairs} pairs instead of 1!`);
    }
  }

  return cases;
}
