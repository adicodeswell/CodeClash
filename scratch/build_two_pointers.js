import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve("problem-bank/problems");

async function writeProblem(slug, { problemMd, structureMd, solutionJs, baselineJs, testCasesJs }) {
  const dir = path.join(root, slug);
  await fs.mkdir(path.join(dir, "reference"), { recursive: true });
  await fs.mkdir(path.join(dir, "generators"), { recursive: true });

  await fs.writeFile(path.join(dir, "Problem.md"), problemMd.trim() + "\n");
  await fs.writeFile(path.join(dir, "Structure.md"), structureMd.trim() + "\n");
  await fs.writeFile(path.join(dir, "reference", "solution.js"), solutionJs.trim() + "\n");
  await fs.writeFile(path.join(dir, "reference", "baseline-solution.js"), baselineJs.trim() + "\n");
  await fs.writeFile(path.join(dir, "generators", "test-cases.js"), testCasesJs.trim() + "\n");
  console.log(`Created problem: ${slug}`);
}

async function main() {
  // 1. valid-palindrome
  await writeProblem("valid-palindrome", {
    problemMd: `# Valid Palindrome

A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.

### Examples

**Example 1:**
\`\`\`
Input: s = "A_man,_a_plan,_a_canal:_Panama"
Output: 1
Explanation: "amanaplanacanalpanama" is a palindrome.
\`\`\`

**Example 2:**
\`\`\`
Input: s = "race_a_car"
Output: 0
Explanation: "raceacar" is not a palindrome.
\`\`\`

**Example 3:**
\`\`\`
Input: s = "0P"
Output: 0
\`\`\`

### Constraints

- \`1 <= s.length <= 2 * 10^5\`
- \`s\` consists only of printable ASCII characters with no internal whitespace.
`,
    structureMd: `Problem Name: "Valid Palindrome"
Difficulty: EASY
Topics: Two Pointers, String
Function Name: isPalindrome

Input Structure:
Input Field: String s

Output Structure:
Output Field: bool result
`,
    solutionJs: `export function solve(s) {
  let l = 0, r = s.length - 1;
  const isAlphaNum = (c) => /[a-zA-Z0-9]/.test(c);
  while (l < r) {
    while (l < r && !isAlphaNum(s[l])) l++;
    while (l < r && !isAlphaNum(s[r])) r--;
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l++;
    r--;
  }
  return true;
}
`,
    baselineJs: `export function solve(s) {
  const filtered = s.toLowerCase().split('').filter(c => /[a-z0-9]/.test(c)).join('');
  return filtered === filtered.split('').reverse().join('');
}
`,
    testCasesJs: `import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { s: "A_man,_a_plan,_a_canal:_Panama" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "race_a_car" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "0P" } });
  cases.push({ category: "basic", description: "Single char", inputs: { s: "a" } });
  cases.push({ category: "basic", description: "Two same", inputs: { s: "aa" } });
  cases.push({ category: "basic", description: "Two different", inputs: { s: "ab" } });
  cases.push({ category: "basic", description: "Punctuation only", inputs: { s: ",._-:" } });
  cases.push({ category: "basic", description: "Odd palindrome", inputs: { s: "aba" } });
  cases.push({ category: "basic", description: "Number palindrome", inputs: { s: "12321" } });
  cases.push({ category: "basic", description: "Mixed case", inputs: { s: "AbA" } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const isPal = i % 2 === 0;
    const len = (i % 6) + 3;
    let str = "";
    for (let j = 0; j < len; j++) str += String.fromCharCode(97 + (j % 5));
    if (isPal) {
      str = str + str.split("").reverse().join("");
    } else {
      str = str + "xyz";
    }
    cases.push({ category: "edge", description: "Edge " + i, inputs: { s: str } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const isPal = i % 2 === 0;
    let s = "";
    for (let j = 0; j < 8; j++) {
      s += String.fromCharCode(65 + (j % 4)) + "_";
    }
    if (isPal) {
      s = s + s.split("").reverse().join("");
    } else {
      s = s + "Z_Q";
    }
    cases.push({ category: "corner", description: "Corner " + i, inputs: { s } });
  }

  // Random (40 - 64)
  const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.,-";
  for (let i = 40; i < 65; i++) {
    const isPal = i % 2 === 0;
    const halfLen = randomInt(rng, 5, 25);
    let half = "";
    for (let j = 0; j < halfLen; j++) half += alpha[randomInt(rng, 0, alpha.length - 1)];
    const s = isPal ? half + half.split("").reverse().join("") : half + "X9";
    cases.push({ category: "random", description: "Random " + i, inputs: { s } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const isPal = i % 2 === 0;
    const halfLen = randomInt(rng, 200, 600);
    let half = "";
    for (let j = 0; j < halfLen; j++) half += alpha[randomInt(rng, 0, alpha.length - 1)];
    const s = isPal ? half + half.split("").reverse().join("") : half + "X_diff_Z";
    cases.push({ category: "large", description: "Large " + i, inputs: { s } });
  }

  return cases;
}
`,
  });

  // 2. two-sum-ii-input-array-is-sorted
  await writeProblem("two-sum-ii-input-array-is-sorted", {
    problemMd: `# Two Sum II - Input Array Is Sorted

Given a **1-indexed** array of integers \`numbers\` that is already **sorted in non-decreasing order**, find two numbers such that they add up to a specific \`target\` number. Let these two numbers be \`numbers[index1]\` and \`numbers[index2]\` where \`1 <= index1 < index2 <= numbers.length\`.

Return the indices of the two numbers, \`index1\` and \`index2\`, added by one as an integer array \`[index1, index2]\` of length 2.

The tests are generated such that there is **exactly one solution**. You may not use the same element twice.

Your solution must use only constant extra space.

### Examples

**Example 1:**
\`\`\`
Input: numbers = [2, 7, 11, 15], target = 9
Output: 1 2
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
\`\`\`

**Example 2:**
\`\`\`
Input: numbers = [2, 3, 4], target = 6
Output: 1 3
Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].
\`\`\`

**Example 3:**
\`\`\`
Input: numbers = [-1, 0], target = -1
Output: 1 2
Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].
\`\`\`

### Constraints

- \`2 <= numbers.length <= 3 * 10^4\`
- \`-1000 <= numbers[i] <= 1000\`
- \`numbers\` is sorted in non-decreasing order.
- \`-1000 <= target <= 1000\`
- The tests are generated such that there is exactly one solution.
`,
    structureMd: `Problem Name: "Two Sum II - Input Array Is Sorted"
Difficulty: MEDIUM
Topics: Array, Two Pointers, Binary Search
Function Name: twoSum

Input Structure:
Input Field: list<int> numbers
Input Field: int target

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(numbers, target) {
  let l = 0, r = numbers.length - 1;
  while (l < r) {
    const sum = numbers[l] + numbers[r];
    if (sum === target) return [l + 1, r + 1];
    if (sum < target) l++;
    else r--;
  }
  return [];
}
`,
    baselineJs: `export function solve(numbers, target) {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) return [i + 1, j + 1];
    }
  }
  return [];
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { numbers: [2, 7, 11, 15], target: 9 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { numbers: [2, 3, 4], target: 6 } });
  cases.push({ category: "basic", description: "Example 3", inputs: { numbers: [-1, 0], target: -1 } });
  cases.push({ category: "basic", description: "Two elements", inputs: { numbers: [5, 10], target: 15 } });
  cases.push({ category: "basic", description: "Negative target", inputs: { numbers: [-10, -5, 0, 3], target: -15 } });
  cases.push({ category: "basic", description: "Zero sum", inputs: { numbers: [-4, -1, 1, 5], target: 0 } });
  cases.push({ category: "basic", description: "Duplicates", inputs: { numbers: [1, 2, 2, 4], target: 4 } });
  cases.push({ category: "basic", description: "Outer elements", inputs: { numbers: [1, 3, 5, 9], target: 10 } });
  cases.push({ category: "basic", description: "Inner elements", inputs: { numbers: [0, 4, 6, 20], target: 10 } });
  cases.push({ category: "basic", description: "Adjacent elements", inputs: { numbers: [1, 2, 3, 7], target: 5 } });

  // Helper to generate sorted array with unique pair summing to target
  function makeCase(len, minVal, maxVal) {
    const arr = [];
    for (let j = 0; j < len; j++) {
      arr.push(minVal + j * Math.max(1, Math.floor((maxVal - minVal) / len)));
    }
    const idx1 = randomInt(rng, 0, Math.floor(len / 2) - 1);
    const idx2 = randomInt(rng, Math.floor(len / 2), len - 1);
    const target = arr[idx1] + arr[idx2];
    return { numbers: arr, target };
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const c = makeCase(5 + (i % 5), -50, 50);
    cases.push({ category: "edge", description: "Edge " + i, inputs: c });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const c = makeCase(12, -200, 200);
    cases.push({ category: "corner", description: "Corner " + i, inputs: c });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const c = makeCase(randomInt(rng, 20, 60), -500, 500);
    cases.push({ category: "random", description: "Random " + i, inputs: c });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const c = makeCase(randomInt(rng, 100, 300), -1000, 1000);
    cases.push({ category: "large", description: "Large " + i, inputs: c });
  }

  return cases;
}
`,
  });

  // 3. 3sum
  await writeProblem("3sum", {
    problemMd: `# 3Sum

Given an integer array \`nums\`, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets. Triplets are returned in ascending sorted order.

### Examples

**Example 1:**
\`\`\`
Input: nums = [-1, 0, 1, 2, -1, -4]
Output:
-1 -1 2
-1 0 1
Explanation:
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1, 0, 1] and [-1, -1, 2].
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [0, 1, 1, -1]
Output:
-1 0 1
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [-2, 0, 1, 1, 2]
Output:
-2 0 2
-2 1 1
\`\`\`

### Constraints

- \`3 <= nums.length <= 3000\`
- \`-10^5 <= nums[i] <= 10^5\`
`,
    structureMd: `Problem Name: "3Sum"
Difficulty: MEDIUM
Topics: Array, Two Pointers, Sorting
Function Name: threeSum

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: list<list<int>> result
`,
    solutionJs: `export function solve(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < sorted.length - 2; i++) {
    if (i > 0 && sorted[i] === sorted[i - 1]) continue;
    let l = i + 1, r = sorted.length - 1;
    while (l < r) {
      const sum = sorted[i] + sorted[l] + sorted[r];
      if (sum === 0) {
        result.push([sorted[i], sorted[l], sorted[r]]);
        while (l < r && sorted[l] === sorted[l + 1]) l++;
        while (l < r && sorted[r] === sorted[r - 1]) r--;
        l++;
        r--;
      } else if (sum < 0) {
        l++;
      } else {
        r--;
      }
    }
  }
  return result;
}
`,
    baselineJs: `export function solve(nums) {
  const n = nums.length;
  const set = new Set();
  const triplets = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          const trip = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
          const key = trip.join(",");
          if (!set.has(key)) {
            set.add(key);
            triplets.push(trip);
          }
        }
      }
    }
  }
  triplets.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    if (a[1] !== b[1]) return a[1] - b[1];
    return a[2] - b[2];
  });
  return triplets;
}
`,
    testCasesJs: `import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [-1, 0, 1, 2, -1, -4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0, 1, 1, -1] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [-2, 0, 1, 1, 2] } });
  cases.push({ category: "basic", description: "Three zeros", inputs: { nums: [0, 0, 0] } });
  cases.push({ category: "basic", description: "Four zeros", inputs: { nums: [0, 0, 0, 0] } });
  cases.push({ category: "basic", description: "Symmetric", inputs: { nums: [-3, -1, 0, 1, 3] } });
  cases.push({ category: "basic", description: "Small set", inputs: { nums: [-1, -1, 2, -2, 4] } });
  cases.push({ category: "basic", description: "Duplicates", inputs: { nums: [-2, -2, 0, 2, 2] } });
  cases.push({ category: "basic", description: "Single pair with zero", inputs: { nums: [-5, 0, 5, 10] } });
  cases.push({ category: "basic", description: "Two triplets", inputs: { nums: [-1, 0, 1, -2, 2] } });

  function makeCaseWithTriplet(len, minVal, maxVal) {
    const a = randomInt(rng, 1, 20);
    const b = randomInt(rng, 1, 20);
    const arr = [-a, -b, a + b];
    while (arr.length < len) {
      arr.push(randomInt(rng, minVal, maxVal));
    }
    return shuffle(rng, arr);
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({ category: "edge", description: "Edge " + i, inputs: { nums: makeCaseWithTriplet(6 + (i % 4), -10, 10) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nums: makeCaseWithTriplet(12, -30, 30) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({ category: "random", description: "Random " + i, inputs: { nums: makeCaseWithTriplet(randomInt(rng, 20, 50), -100, 100) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({ category: "large", description: "Large " + i, inputs: { nums: makeCaseWithTriplet(randomInt(rng, 60, 120), -500, 500) } });
  }

  return cases;
}
`,
  });

  // 4. container-with-most-water
  await writeProblem("container-with-most-water", {
    problemMd: `# Container With Most Water

You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`-th line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

### Examples

**Example 1:**
\`\`\`
Input: height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
Output: 49
Explanation: The vertical lines are at indices [1, 8] with heights 8 and 7, distance is 7, area is min(8, 7) * 7 = 49.
\`\`\`

**Example 2:**
\`\`\`
Input: height = [1, 1]
Output: 1
\`\`\`

### Constraints

- \`n == height.length\`
- \`2 <= n <= 10^5\`
- \`0 <= height[i] <= 10^4\`
`,
    structureMd: `Problem Name: "Container With Most Water"
Difficulty: MEDIUM
Topics: Array, Two Pointers, Greedy
Function Name: maxArea

Input Structure:
Input Field: list<int> height

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(height) {
  let l = 0, r = height.length - 1, max = 0;
  while (l < r) {
    const area = Math.min(height[l], height[r]) * (r - l);
    if (area > max) max = area;
    if (height[l] < height[r]) l++;
    else r--;
  }
  return max;
}
`,
    baselineJs: `export function solve(height) {
  let max = 0;
  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const area = Math.min(height[i], height[j]) * (j - i);
      if (area > max) max = area;
    }
  }
  return max;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { height: [1, 1] } });
  cases.push({ category: "basic", description: "Ascending", inputs: { height: [1, 2, 3, 4, 5] } });
  cases.push({ category: "basic", description: "Descending", inputs: { height: [5, 4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "Equal heights", inputs: { height: [4, 4, 4, 4] } });
  cases.push({ category: "basic", description: "Peak in middle", inputs: { height: [1, 10, 1] } });
  cases.push({ category: "basic", description: "Two high ends", inputs: { height: [10, 1, 1, 10] } });
  cases.push({ category: "basic", description: "Zeros present", inputs: { height: [0, 2, 0] } });
  cases.push({ category: "basic", description: "Plateau", inputs: { height: [3, 7, 7, 3] } });
  cases.push({ category: "basic", description: "Alternating", inputs: { height: [1, 5, 2, 6, 1] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 4 + (i % 6);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 30));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { height: arr } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 0, 100));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { height: arr } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 30, 80);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 500));
    cases.push({ category: "random", description: "Random " + i, inputs: { height: arr } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 150, 400);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 10000));
    cases.push({ category: "large", description: "Large " + i, inputs: { height: arr } });
  }

  return cases;
}
`,
  });

  // 5. trapping-rain-water
  await writeProblem("trapping-rain-water", {
    problemMd: `# Trapping Rain Water

Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.

### Examples

**Example 1:**
\`\`\`
Input: height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
Output: 6
Explanation: The elevation map traps 6 units of rain water.
\`\`\`

**Example 2:**
\`\`\`
Input: height = [4, 2, 0, 3, 2, 5]
Output: 9
\`\`\`

### Constraints

- \`n == height.length\`
- \`1 <= n <= 2 * 10^4\`
- \`0 <= height[i] <= 10^5\`
`,
    structureMd: `Problem Name: "Trapping Rain Water"
Difficulty: HARD
Topics: Array, Two Pointers, Stack
Function Name: trap

Input Structure:
Input Field: list<int> height

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(height) {
  let l = 0, r = height.length - 1, lMax = 0, rMax = 0, ans = 0;
  while (l < r) {
    if (height[l] < height[r]) {
      if (height[l] >= lMax) lMax = height[l];
      else ans += lMax - height[l];
      l++;
    } else {
      if (height[r] >= rMax) rMax = height[r];
      else ans += rMax - height[r];
      r--;
    }
  }
  return ans;
}
`,
    baselineJs: `export function solve(height) {
  const n = height.length;
  if (n === 0) return 0;
  const leftMax = new Array(n).fill(0);
  const rightMax = new Array(n).fill(0);
  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  let water = 0;
  for (let i = 0; i < n; i++) water += Math.min(leftMax[i], rightMax[i]) - height[i];
  return water;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { height: [4, 2, 0, 3, 2, 5] } });
  cases.push({ category: "basic", description: "Single bar", inputs: { height: [3] } });
  cases.push({ category: "basic", description: "Two bars", inputs: { height: [3, 2] } });
  cases.push({ category: "basic", description: "Simple bowl", inputs: { height: [3, 0, 3] } });
  cases.push({ category: "basic", description: "Flat terrain", inputs: { height: [2, 2, 2, 2] } });
  cases.push({ category: "basic", description: "Ascending slope", inputs: { height: [1, 2, 3, 4] } });
  cases.push({ category: "basic", description: "Descending slope", inputs: { height: [4, 3, 2, 1] } });
  cases.push({ category: "basic", description: "Pyramid", inputs: { height: [1, 3, 5, 3, 1] } });
  cases.push({ category: "basic", description: "V shape", inputs: { height: [5, 1, 5] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 4 + (i % 6);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 0, 15));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { height: arr } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 0, 50));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { height: arr } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 20, 60);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 0, 100));
    cases.push({ category: "random", description: "Random " + i, inputs: { height: arr } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 100, 300);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 0, 1000));
    cases.push({ category: "large", description: "Large " + i, inputs: { height: arr } });
  }

  return cases;
}
`,
  });
}

main().catch(console.error);
