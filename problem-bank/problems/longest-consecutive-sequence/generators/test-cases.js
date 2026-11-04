// Test case generator for Longest Consecutive Sequence.
// Yields ~80 test cases across 6 key tiers:
// 1. Basic (0-9) - Statement samples + small manual checks
// 2. Edge (10-24) - Empty array, single elements, duplicates, extreme range +/- 10^9
// 3. Boundary (25-39) - Array sizes 5 to 200, consecutive sequences at edges
// 4. Random (40-59) - Varied sizes with controlled cluster runs
// 5. Stress (60-69) - Large arrays up to N=10,000 (O(N^2) killers)
// 6. Adversarial (70-79) - Trap cases, all consecutive reverse-sorted, multiple equal streaks

import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng } = {}) {
  const cases = [];

  // ==========================================
  // Category 1: Basic Cases (0 - 9)
  // Preserving existing 0.txt and 1.txt from Problem.md
  // ==========================================
  cases.push({
    category: "basic",
    description: "Example 1 from statement",
    inputs: { nums: [100, 4, 200, 1, 3, 2] }, // output: 4
  });
  cases.push({
    category: "basic",
    description: "Example 2 from statement",
    inputs: { nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1] }, // output: 9
  });
  cases.push({
    category: "basic",
    description: "Already sorted small array",
    inputs: { nums: [1, 2, 3, 4, 5] },
  });
  cases.push({
    category: "basic",
    description: "Reverse sorted small array",
    inputs: { nums: [10, 9, 8, 7] },
  });
  cases.push({
    category: "basic",
    description: "All negative consecutive sequence",
    inputs: { nums: [-5, -2, -4, -1, -3] },
  });
  cases.push({
    category: "basic",
    description: "No two consecutive elements",
    inputs: { nums: [10, 20, 30, 40, 50] },
  });
  cases.push({
    category: "basic",
    description: "Sequence spanning zero",
    inputs: { nums: [-2, 1, 0, -1, 2] },
  });
  cases.push({
    category: "basic",
    description: "Multiple duplicate numbers",
    inputs: { nums: [1, 2, 0, 1] },
  });
  cases.push({
    category: "basic",
    description: "Two disjoint streaks of length 3",
    inputs: { nums: [1, 2, 3, 10, 11, 12] },
  });
  cases.push({
    category: "basic",
    description: "Streaks with gaps of size 2",
    inputs: { nums: [1, 3, 5, 7, 9] },
  });

  // ==========================================
  // Category 2: Edge Cases (10 - 24)
  // ==========================================
  cases.push({
    category: "edge",
    description: "Empty array",
    inputs: { nums: [] }, // output: 0
  });
  cases.push({
    category: "edge",
    description: "Single positive element",
    inputs: { nums: [42] }, // output: 1
  });
  cases.push({
    category: "edge",
    description: "Single zero element",
    inputs: { nums: [0] }, // output: 1
  });
  cases.push({
    category: "edge",
    description: "Single negative element",
    inputs: { nums: [-100] }, // output: 1
  });
  cases.push({
    category: "edge",
    description: "All duplicate elements (N=6)",
    inputs: { nums: [7, 7, 7, 7, 7, 7] }, // output: 1
  });
  cases.push({
    category: "edge",
    description: "Two consecutive elements",
    inputs: { nums: [1, 2] }, // output: 2
  });
  cases.push({
    category: "edge",
    description: "Two non-consecutive elements",
    inputs: { nums: [1, 3] }, // output: 1
  });
  cases.push({
    category: "edge",
    description: "Extreme positive bound (10^9)",
    inputs: { nums: [1000000000] }, // output: 1
  });
  cases.push({
    category: "edge",
    description: "Extreme negative bound (-10^9)",
    inputs: { nums: [-1000000000] }, // output: 1
  });
  cases.push({
    category: "edge",
    description: "Consecutive at extreme bounds (10^9, 10^9 - 1)",
    inputs: { nums: [999999999, 1000000000] }, // output: 2
  });
  cases.push({
    category: "edge",
    description: "Consecutive at negative bounds (-10^9, -10^9 + 1)",
    inputs: { nums: [-1000000000, -999999999] }, // output: 2
  });
  cases.push({
    category: "edge",
    description: "Extreme positive and negative with zero",
    inputs: { nums: [-1000000000, 0, 1000000000] }, // output: 1
  });
  cases.push({
    category: "edge",
    description: "Large duplicates with a 3-element streak",
    inputs: { nums: [10, 10, 10, 11, 11, 12, 10] }, // output: 3
  });
  cases.push({
    category: "edge",
    description: "Alternating signs near zero",
    inputs: { nums: [-1, 1, -2, 2, 0] }, // output: 5
  });
  cases.push({
    category: "edge",
    description: "Two identical pairs",
    inputs: { nums: [100, 101, 100, 101] }, // output: 2
  });

  // ==========================================
  // Category 3: Boundary Cases (25 - 39)
  // ==========================================
  const boundaryLengths = [5, 8, 12, 15, 20, 25, 30, 40, 50, 60, 75, 100, 125, 150, 200];
  for (let b = 0; b < boundaryLengths.length; b++) {
    const len = boundaryLengths[b];
    const streakLen = Math.max(2, Math.floor(len / 3));
    const startVal = randomInt(rng, -1000, 1000);
    const nums = [];
    // Primary streak
    for (let s = 0; s < streakLen; s++) {
      nums.push(startVal + s);
    }
    // Noise elements with large gaps
    while (nums.length < len) {
      nums.push(startVal + streakLen + 100 + nums.length * 17);
    }
    cases.push({
      category: "boundary",
      description: `Boundary array N=${len} with streak of ${streakLen}`,
      inputs: { nums: shuffle(rng, nums) },
    });
  }

  // ==========================================
  // Category 4: Randomized Cases (40 - 59)
  // Sizes 50 to 500 with multiple competing streaks
  // ==========================================
  for (let r = 0; r < 20; r++) {
    const len = randomInt(rng, 50, 400);
    const numStreaks = randomInt(rng, 2, 6);
    const nums = [];
    for (let s = 0; s < numStreaks; s++) {
      const sLen = randomInt(rng, 5, 25);
      const sBase = randomInt(rng, -50000, 50000);
      for (let k = 0; k < sLen; k++) {
        nums.push(sBase + k);
      }
    }
    while (nums.length < len) {
      nums.push(randomInt(rng, -100000, 100000));
    }
    cases.push({
      category: "random",
      description: `Random clustered distribution #${r + 1} (N=${len})`,
      inputs: { nums: shuffle(rng, nums) },
    });
  }

  // ==========================================
  // Category 5: Stress Cases (60 - 69)
  // Up to N=10,000 elements
  // ==========================================
  // 60: 10,000 completely consecutive elements [1..10000] shuffled
  {
    const nums = Array.from({ length: 10000 }, (_, i) => i + 1);
    cases.push({
      category: "stress",
      description: "10,000 consecutive integers [1..10,000] shuffled",
      inputs: { nums: shuffle(rng, nums) },
    });
  }

  // 61: 10,000 reverse-sorted consecutive elements
  {
    const nums = Array.from({ length: 10000 }, (_, i) => 10000 - i);
    cases.push({
      category: "stress",
      description: "10,000 consecutive integers reverse-sorted (worst case for naive search)",
      inputs: { nums },
    });
  }

  // 62: 10,000 elements with negative streak of 5,000
  {
    const nums = [];
    for (let i = 0; i < 5000; i++) nums.push(-10000 + i);
    for (let i = 0; i < 5000; i++) nums.push(i * 10);
    cases.push({
      category: "stress",
      description: "N=10,000 with a 5,000 negative element consecutive streak",
      inputs: { nums: shuffle(rng, nums) },
    });
  }

  // 63: 10,000 elements all distinct with no two consecutive (odd numbers)
  {
    const nums = Array.from({ length: 10000 }, (_, i) => i * 2 + 1);
    cases.push({
      category: "stress",
      description: "N=10,000 all odd integers (longest streak = 1)",
      inputs: { nums: shuffle(rng, nums) },
    });
  }

  // 64: 8,000 elements with extensive duplicates
  {
    const nums = [];
    for (let i = 0; i < 1000; i++) {
      for (let dup = 0; dup < 8; dup++) {
        nums.push(i);
      }
    }
    cases.push({
      category: "stress",
      description: "N=8,000 with 8 duplicates per consecutive number",
      inputs: { nums: shuffle(rng, nums) },
    });
  }

  // 65: 7,500 elements with a single streak of 7,000
  {
    const nums = Array.from({ length: 7000 }, (_, i) => i - 3500);
    for (let i = 0; i < 500; i++) nums.push(100000 + i * 5);
    cases.push({
      category: "stress",
      description: "N=7,500 with a 7,000 streak centered at zero",
      inputs: { nums: shuffle(rng, nums) },
    });
  }

  // 66: 6,000 random elements across narrow range [-500..500] (lots of duplicates and full coverage)
  {
    const nums = Array.from({ length: 6000 }, () => randomInt(rng, -500, 500));
    cases.push({
      category: "stress",
      description: "N=6,000 dense narrow-range distribution",
      inputs: { nums },
    });
  }

  // 67: 9,000 elements consisting of 30 equal streaks of 300 elements
  {
    const nums = [];
    for (let s = 0; s < 30; s++) {
      const base = s * 5000;
      for (let k = 0; k < 300; k++) {
        nums.push(base + k);
      }
    }
    cases.push({
      category: "stress",
      description: "N=9,000 consisting of 30 separate 300-element streaks",
      inputs: { nums: shuffle(rng, nums) },
    });
  }

  // 68: 10,000 elements: streak at the very beginning of the array
  {
    const streak = Array.from({ length: 4000 }, (_, i) => i);
    const noise = Array.from({ length: 6000 }, (_, i) => 50000 + i * 2);
    cases.push({
      category: "stress",
      description: "N=10,000 with 4,000 streak at the start",
      inputs: { nums: [...streak, ...noise] },
    });
  }

  // 69: 10,000 elements: streak at the very end of the array
  {
    const noise = Array.from({ length: 6000 }, (_, i) => 50000 + i * 2);
    const streak = Array.from({ length: 4000 }, (_, i) => i);
    cases.push({
      category: "stress",
      description: "N=10,000 with 4,000 streak at the end",
      inputs: { nums: [...noise, ...streak] },
    });
  }

  // ==========================================
  // Category 6: Adversarial / Trap Cases (70 - 79)
  // ==========================================
  // 70: Interleaved sequences [1, 100, 2, 101, 3, 102, ...]
  {
    const nums = [];
    for (let i = 1; i <= 50; i++) {
      nums.push(i);
      nums.push(i + 1000);
    }
    cases.push({
      category: "adversarial",
      description: "Interleaved sequences of length 50",
      inputs: { nums },
    });
  }

  // 71: Anti-hash collision (numbers sharing lower bits)
  {
    const mask = 65536;
    const nums = [];
    for (let i = 0; i < 30; i++) {
      nums.push(i * mask);
      nums.push(i * mask + 1);
    }
    cases.push({
      category: "adversarial",
      description: "Hash collision test: numbers with identical low bits",
      inputs: { nums: shuffle(rng, nums) },
    });
  }

  // 72: Streaks separated by exact missing numbers (off-by-one gaps)
  {
    // [1..10], missing 11, [12..25] (length 14)
    const nums = [];
    for (let i = 1; i <= 10; i++) nums.push(i);
    for (let i = 12; i <= 25; i++) nums.push(i);
    cases.push({
      category: "adversarial",
      description: "Streaks separated by an off-by-one missing number",
      inputs: { nums: shuffle(rng, nums) },
    });
  }

  // 73: Mountain pattern consecutive sequence [1, 3, 5, 4, 2] -> 1, 2, 3, 4, 5
  {
    const nums = [1, 3, 5, 7, 9, 8, 6, 4, 2];
    cases.push({
      category: "adversarial",
      description: "Mountain odd/even interleaved permutation",
      inputs: { nums },
    });
  }

  // 74: Extreme value jumps: -10^9, -999999999, 0, 999999999, 10^9
  {
    const nums = [-1000000000, -999999999, 0, 999999999, 1000000000];
    cases.push({
      category: "adversarial",
      description: "Dual extreme-boundary streaks separated by zero",
      inputs: { nums: shuffle(rng, nums) },
    });
  }

  // 75: High frequency identical streak: [1, 2, 3] repeated 20 times
  {
    const nums = [];
    for (let i = 0; i < 20; i++) {
      nums.push(1, 2, 3);
    }
    cases.push({
      category: "adversarial",
      description: "Repeated small streak with high duplicate density",
      inputs: { nums },
    });
  }

  // 76: Negative arithmetic progression (step -1 vs step -2)
  {
    const nums = [-10, -9, -8, -6, -4, -2, 0, 1, 2, 3, 4];
    cases.push({
      category: "adversarial",
      description: "Negative sequence with partial gaps",
      inputs: { nums: shuffle(rng, nums) },
    });
  }

  // 77: Fibonacci sequence (rapidly growing, checks non-consecutive growth)
  {
    const nums = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
    cases.push({
      category: "adversarial",
      description: "Fibonacci numbers (checks head consecutive vs exponential gaps)",
      inputs: { nums },
    });
  }

  // 78: Two equal length maximum streaks (tie breaking)
  {
    const nums = [1, 2, 3, 4, 5, 50, 51, 52, 53, 54];
    cases.push({
      category: "adversarial",
      description: "Two disjoint streaks of equal maximum length (5)",
      inputs: { nums: shuffle(rng, nums) },
    });
  }

  // 79: Dense shuffled run [-500..500] with single missing number (0)
  {
    const nums = [];
    for (let i = -500; i <= 500; i++) {
      if (i !== 0) nums.push(i);
    }
    cases.push({
      category: "adversarial",
      description: "1,000 numbers with single missing zero split into two equal 500-streaks",
      inputs: { nums: shuffle(rng, nums) },
    });
  }

  return cases;
}
