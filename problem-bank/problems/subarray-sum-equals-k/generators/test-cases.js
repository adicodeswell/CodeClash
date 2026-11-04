// Test case generator for Subarray Sum Equals K.
// Produces 80 test cases across 6 key tiers:
// 1. Basic (0-9) - Statement examples + simple checks
// 2. Edge (10-24) - Single elements, zero arrays, k=0, negative numbers, no matching subarrays (count=0)
// 3. Boundary (25-39) - Array sizes N=3 to 200, positive and negative targets
// 4. Random (40-59) - Diverse distributions and varied k values
// 5. Stress (60-69) - Maximum size up to N=10,000 (combinatorial explosions, all zeros)
// 6. Adversarial (70-79) - Non-monotonic prefix sums, alternating signs, rapid prefix oscillations

import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng } = {}) {
  const cases = [];

  // ==========================================
  // Category 1: Basic Cases (0 - 9)
  // Preserving statement examples
  // ==========================================
  cases.push({
    category: "basic",
    description: "Example 1 from statement",
    inputs: { nums: [1, 1, 1], k: 2 }, // output: 2
  });
  cases.push({
    category: "basic",
    description: "Example 2 from statement",
    inputs: { nums: [1, 2, 3], k: 3 }, // output: 2
  });
  cases.push({
    category: "basic",
    description: "Entire array equals k",
    inputs: { nums: [1, 2, 3, 4], k: 10 }, // output: 1
  });
  cases.push({
    category: "basic",
    description: "Zero matching subarrays",
    inputs: { nums: [1, 2, 3], k: 100 }, // output: 0
  });
  cases.push({
    category: "basic",
    description: "Negative numbers with positive k",
    inputs: { nums: [-1, -1, 1], k: 0 }, // output: 1
  });
  cases.push({
    category: "basic",
    description: "Single zero element with k=0",
    inputs: { nums: [0], k: 0 }, // output: 1
  });
  cases.push({
    category: "basic",
    description: "Small array with multiple zeros",
    inputs: { nums: [0, 0, 0], k: 0 }, // output: 6
  });
  cases.push({
    category: "basic",
    description: "Alternating positive and negative numbers with k=0",
    inputs: { nums: [1, -1, 1, -1], k: 0 }, // output: 4
  });
  cases.push({
    category: "basic",
    description: "Negative target k",
    inputs: { nums: [-2, -3, -1], k: -5 }, // output: 1
  });
  cases.push({
    category: "basic",
    description: "All elements equal to k",
    inputs: { nums: [5, 5, 5], k: 5 }, // output: 3
  });

  // ==========================================
  // Category 2: Edge Cases (10 - 24)
  // ==========================================
  cases.push({
    category: "edge",
    description: "Single element matching k",
    inputs: { nums: [42], k: 42 }, // output: 1
  });
  cases.push({
    category: "edge",
    description: "Single element not matching k",
    inputs: { nums: [42], k: 10 }, // output: 0
  });
  cases.push({
    category: "edge",
    description: "Single negative element matching negative k",
    inputs: { nums: [-100], k: -100 }, // output: 1
  });
  cases.push({
    category: "edge",
    description: "Single element zero with k=100",
    inputs: { nums: [0], k: 100 }, // output: 0
  });
  cases.push({
    category: "edge",
    description: "Two elements summing to k",
    inputs: { nums: [20, 30], k: 50 }, // output: 1
  });
  cases.push({
    category: "edge",
    description: "Two opposite elements with k=0",
    inputs: { nums: [50, -50], k: 0 }, // output: 1
  });
  cases.push({
    category: "edge",
    description: "Four zeros with k=0 (combinatorial 4*5/2 = 10)",
    inputs: { nums: [0, 0, 0, 0], k: 0 }, // output: 10
  });
  cases.push({
    category: "edge",
    description: "Target k is 0 with all positive numbers (impossible)",
    inputs: { nums: [1, 2, 3, 4, 5], k: 0 }, // output: 0
  });
  cases.push({
    category: "edge",
    description: "Target k is positive with all negative numbers (impossible)",
    inputs: { nums: [-1, -2, -3, -4], k: 5 }, // output: 0
  });
  cases.push({
    category: "edge",
    description: "Negative k formed by positive + negative",
    inputs: { nums: [10, -25, 5], k: -15 }, // output: 1
  });
  cases.push({
    category: "edge",
    description: "Subarrays of length 1 only",
    inputs: { nums: [7, 14, 7, 21, 7], k: 7 }, // output: 3
  });
  cases.push({
    category: "edge",
    description: "Subarray spanning entire array plus internal subarrays",
    inputs: { nums: [3, 4, 7, 2, -3, 1, 4, 2], k: 7 }, // output: 4
  });
  cases.push({
    category: "edge",
    description: "All elements are -1 with k=-2",
    inputs: { nums: [-1, -1, -1, -1], k: -2 }, // output: 3
  });
  cases.push({
    category: "edge",
    description: "Zero prefix and suffix around target",
    inputs: { nums: [0, 10, 0], k: 10 }, // output: 4
  });
  cases.push({
    category: "edge",
    description: "Large constraint bounds: elements near +/- 1000",
    inputs: { nums: [1000, -1000, 1000, -1000], k: 0 }, // output: 4
  });

  // ==========================================
  // Category 3: Boundary Cases (25 - 39)
  // Sizes N=5 to 200
  // ==========================================
  const boundarySizes = [5, 8, 12, 16, 20, 25, 30, 40, 50, 60, 75, 100, 125, 150, 200];
  for (let b = 0; b < boundarySizes.length; b++) {
    const size = boundarySizes[b];
    const k = b % 2 === 0 ? randomInt(rng, 1, 50) : randomInt(rng, -50, -1);
    const nums = [];
    for (let i = 0; i < size; i++) {
      nums.push(randomInt(rng, -20, 20));
    }
    cases.push({
      category: "boundary",
      description: `Boundary array size N=${size} with k=${k}`,
      inputs: { nums, k },
    });
  }

  // ==========================================
  // Category 4: Randomized Cases (40 - 59)
  // Sizes 40 to 350
  // ==========================================
  for (let r = 0; r < 20; r++) {
    const size = randomInt(rng, 40, 300);
    const k = randomInt(rng, -100, 100);
    const nums = [];
    for (let i = 0; i < size; i++) {
      nums.push(randomInt(rng, -50, 50));
    }
    cases.push({
      category: "random",
      description: `Randomized case #${r + 1} (N=${size}, k=${k})`,
      inputs: { nums, k },
    });
  }

  // ==========================================
  // Category 5: Stress Cases (60 - 69)
  // Maximum size up to N=10,000 (O(N^2) killers)
  // ==========================================
  // 60: 10,000 all zeros with k=0 -> 10000 * 10001 / 2 = 50,005,000 subarrays!
  cases.push({
    category: "stress",
    description: "N=10,000 all zeros with k=0 (produces 50,005,000 subarrays)",
    inputs: { nums: Array(10000).fill(0), k: 0 },
  });

  // 61: 10,000 all ones with k=5000 -> 5,001 subarrays
  cases.push({
    category: "stress",
    description: "N=10,000 all ones with k=5000",
    inputs: { nums: Array(10000).fill(1), k: 5000 },
  });

  // 62: 10,000 alternating +1 and -1 with k=0
  {
    const nums = [];
    for (let i = 0; i < 5000; i++) nums.push(1, -1);
    cases.push({
      category: "stress",
      description: "N=10,000 alternating +1 and -1 with k=0",
      inputs: { nums, k: 0 },
    });
  }

  // 63: 10,000 elements all -1 with k=-1000
  cases.push({
    category: "stress",
    description: "N=10,000 all -1 with k=-1000",
    inputs: { nums: Array(10000).fill(-1), k: -1000 },
  });

  // 64: 5,000 elements with target k impossible to reach
  cases.push({
    category: "stress",
    description: "N=5,000 all positive numbers with k=-10",
    inputs: { nums: Array(5000).fill(5), k: -10 },
  });

  // 65: 6,000 random elements in [-10..10] with k=0
  {
    const nums = Array.from({ length: 6000 }, () => randomInt(rng, -10, 10));
    cases.push({
      category: "stress",
      description: "N=6,000 dense zero-sum oscillations",
      inputs: { nums, k: 0 },
    });
  }

  // 66: 7,500 elements all zeros except 1 at ends, k=1
  {
    const nums = Array(7500).fill(0);
    nums[0] = 1;
    nums[7499] = 1;
    cases.push({
      category: "stress",
      description: "N=7,500 zeros with single 1 at each end",
      inputs: { nums, k: 1 },
    });
  }

  // 67: 8,000 elements with maximum magnitude [-1000..1000]
  {
    const nums = Array.from({ length: 8000 }, () => randomInt(rng, -1000, 1000));
    cases.push({
      category: "stress",
      description: "N=8,000 full-range values [-1000..1000]",
      inputs: { nums, k: 250 },
    });
  }

  // 68: 9,000 elements alternating blocks of 100 ones and 100 minus ones
  {
    const nums = [];
    for (let b = 0; b < 45; b++) {
      for (let i = 0; i < 100; i++) nums.push(1);
      for (let i = 0; i < 100; i++) nums.push(-1);
    }
    cases.push({
      category: "stress",
      description: "N=9,000 square-wave blocks of +/- 1",
      inputs: { nums, k: 50 },
    });
  }

  // 69: 10,000 elements strictly positive with k=10000 (entire array)
  cases.push({
    category: "stress",
    description: "N=10,000 with k equal to total array sum",
    inputs: { nums: Array(10000).fill(1), k: 10000 },
  });

  // ==========================================
  // Category 6: Adversarial / Trap Cases (70 - 79)
  // Non-monotonic prefix sums & prefix hash collisions
  // ==========================================
  // 70: Prefix sum returns to the same value 10 times
  {
    // [1, -1, 1, -1, 1, -1, 1, -1, 1, -1] with k=0
    const nums = [2, -2, 2, -2, 2, -2, 2, -2, 2, -2];
    cases.push({
      category: "adversarial",
      description: "Multiple zero-sum loops (prefix returns to 0 five times)",
      inputs: { nums, k: 0 },
    });
  }

  // 71: Zero element sandwich: [0, 5, 0, 5, 0] with k=5
  {
    const nums = [0, 5, 0, 5, 0];
    cases.push({
      category: "adversarial",
      description: "Zero-padding expansion for target k",
      inputs: { nums, k: 5 },
    });
  }

  // 72: Repeated identical prefixes followed by huge jump
  {
    const nums = [0, 0, 0, 0, 100, 0, 0, 0];
    cases.push({
      category: "adversarial",
      description: "Clusters of zeros separated by non-zero",
      inputs: { nums, k: 100 },
    });
  }

  // 73: Mountain prefix sum: ascends to 1000 then descends to 0
  {
    const nums = [];
    for (let i = 0; i < 20; i++) nums.push(50);
    for (let i = 0; i < 20; i++) nums.push(-50);
    cases.push({
      category: "adversarial",
      description: "Mountain prefix sum (ramp up and ramp down)",
      inputs: { nums, k: 100 },
    });
  }

  // 74: Off-by-one near misses: subarrays sum to k-1 and k+1, only one equals k
  {
    const nums = [10, 20, 29, 31, 30, 40];
    cases.push({
      category: "adversarial",
      description: "Near-miss subarray sums (k-1, k+1, and k=30)",
      inputs: { nums, k: 30 },
    });
  }

  // 75: High frequency cancellation: [1, 2, -3, 1, 2, -3]
  {
    const nums = [1, 2, -3, 1, 2, -3, 1, 2, -3];
    cases.push({
      category: "adversarial",
      description: "Repeated 3-element zero-sum cycle",
      inputs: { nums, k: 3 },
    });
  }

  // 76: Negative values only with negative k
  {
    const nums = [-5, -10, -15, -20, -25];
    cases.push({
      category: "adversarial",
      description: "Strictly decreasing negative prefix sums",
      inputs: { nums, k: -25 },
    });
  }

  // 77: k is larger than maximum possible subarray sum
  {
    const nums = [1, 2, 3, 4, 5];
    cases.push({
      category: "adversarial",
      description: "k exceeds total sum of all elements",
      inputs: { nums, k: 1000 },
    });
  }

  // 78: k is smaller than minimum possible subarray sum
  {
    const nums = [-1, -2, -3, -4, -5];
    cases.push({
      category: "adversarial",
      description: "k is smaller than sum of all negative elements",
      inputs: { nums, k: -1000 },
    });
  }

  // 79: Symmetric palindrome array [1, -1, 0, 0, -1, 1]
  {
    const nums = [1, -1, 0, 0, -1, 1];
    cases.push({
      category: "adversarial",
      description: "Symmetric palindrome array with k=0",
      inputs: { nums, k: 0 },
    });
  }

  return cases;
}
