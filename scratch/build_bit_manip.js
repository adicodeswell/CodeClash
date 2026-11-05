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
  // 145. number-of-1-bits
  await writeProblem("number-of-1-bits", {
    problemMd: `# Number of 1 Bits

Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).

### Examples

**Example 1:**
\`\`\`
Input: n = 11
Output: 3
Explanation: The input binary string 1011 has a total of three set bits.
\`\`\`

**Example 2:**
\`\`\`
Input: n = 128
Output: 1
Explanation: The input binary string 10000000 has a total of one set bit.
\`\`\`

**Example 3:**
\`\`\`
Input: n = 2147483645
Output: 30
\`\`\`

### Constraints

- \`1 <= n <= 2^31 - 1\`
`,
    structureMd: `Problem Name: "Number of 1 Bits"
Difficulty: EASY
Topics: Bit Manipulation
Function Name: hammingWeight

Input Structure:
Input Field: int n

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(n) {
  let count = 0;
  let num = n >>> 0;
  while (num > 0) {
    num &= (num - 1);
    count++;
  }
  return count;
}
`,
    baselineJs: `export function solve(n) {
  return (n >>> 0).toString(2).split("").filter((c) => c === "1").length;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "11 -> 3", inputs: { n: 11 } });
  cases.push({ category: "basic", description: "128 -> 1", inputs: { n: 128 } });
  cases.push({ category: "basic", description: "2147483645 -> 30", inputs: { n: 2147483645 } });
  cases.push({ category: "basic", description: "1 -> 1", inputs: { n: 1 } });
  cases.push({ category: "basic", description: "2 -> 1", inputs: { n: 2 } });
  cases.push({ category: "basic", description: "3 -> 2", inputs: { n: 3 } });
  cases.push({ category: "basic", description: "7 -> 3", inputs: { n: 7 } });
  cases.push({ category: "basic", description: "15 -> 4", inputs: { n: 15 } });
  cases.push({ category: "basic", description: "31 -> 5", inputs: { n: 31 } });
  cases.push({ category: "basic", description: "63 -> 6", inputs: { n: 63 } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const pow = Math.pow(2, (i - 10) * 2);
    cases.push({ category: "edge", description: "Power of 2 " + pow, inputs: { n: pow } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const allOnes = Math.pow(2, (i - 24) * 2) - 1;
    cases.push({ category: "corner", description: "All ones " + allOnes, inputs: { n: allOnes } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = Math.floor(Math.random() * 2000000000) + 1;
    cases.push({ category: "random", description: "Random " + i, inputs: { n } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = 2147483647 - (i - 65);
    cases.push({ category: "large", description: "Near INT_MAX " + i, inputs: { n } });
  }

  return cases;
}
`
  });

  // 146. counting-bits
  await writeProblem("counting-bits", {
    problemMd: `# Counting Bits

Given an integer \`n\`, return an array \`ans\` of length \`n + 1\` such that for each \`i\` (\`0 <= i <= n\`), \`ans[i]\` is the **number of \`1\`'s** in the binary representation of \`i\`.

### Examples

**Example 1:**
\`\`\`
Input: n = 2
Output: 0 1 1
Explanation:
0 --> 0
1 --> 1
2 --> 10
\`\`\`

**Example 2:**
\`\`\`
Input: n = 5
Output: 0 1 1 2 1 2
Explanation:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101
\`\`\`

### Constraints

- \`0 <= n <= 10^4\`
`,
    structureMd: `Problem Name: "Counting Bits"
Difficulty: EASY
Topics: Dynamic Programming, Bit Manipulation
Function Name: countBits

Input Structure:
Input Field: int n

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(n) {
  const ans = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    ans[i] = ans[i >> 1] + (i & 1);
  }
  return ans;
}
`,
    baselineJs: `export function solve(n) {
  const ans = [];
  for (let i = 0; i <= n; i++) {
    ans.push(i.toString(2).split("").filter((c) => c === "1").length);
  }
  return ans;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "n = 2", inputs: { n: 2 } });
  cases.push({ category: "basic", description: "n = 5", inputs: { n: 5 } });
  cases.push({ category: "basic", description: "n = 0", inputs: { n: 0 } });
  cases.push({ category: "basic", description: "n = 1", inputs: { n: 1 } });
  cases.push({ category: "basic", description: "n = 3", inputs: { n: 3 } });
  cases.push({ category: "basic", description: "n = 4", inputs: { n: 4 } });
  cases.push({ category: "basic", description: "n = 7", inputs: { n: 7 } });
  cases.push({ category: "basic", description: "n = 8", inputs: { n: 8 } });
  cases.push({ category: "basic", description: "n = 10", inputs: { n: 10 } });
  cases.push({ category: "basic", description: "n = 15", inputs: { n: 15 } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const pow = Math.pow(2, (i - 10) % 8 + 2);
    cases.push({ category: "edge", description: "Power of 2 " + pow, inputs: { n: pow } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const powM1 = Math.pow(2, (i - 24) % 8 + 2) - 1;
    cases.push({ category: "corner", description: "Power of 2 minus 1 " + powM1, inputs: { n: powM1 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = Math.floor(Math.random() * 200) + 1;
    cases.push({ category: "random", description: "Random " + i, inputs: { n } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = 500 + (i - 65) * 50;
    cases.push({ category: "large", description: "Large " + i, inputs: { n } });
  }

  return cases;
}
`
  });

  // 147. reverse-bits
  await writeProblem("reverse-bits", {
    problemMd: `# Reverse Bits

Reverse bits of a given 32 bits unsigned integer.

### Examples

**Example 1:**
\`\`\`
Input: n = 43261596
Output: 964176192
Explanation:
43261596 in binary is 00000010100101000001111010011100.
Reversing the bits gives 00111001011110000010100101000000 which is 964176192.
\`\`\`

**Example 2:**
\`\`\`
Input: n = 1
Output: 2147483648
Explanation:
1 in 32-bit binary is 00000000000000000000000000000001.
Reversing the bits gives 10000000000000000000000000000000 which is 2147483648.
\`\`\`

### Constraints

- \`0 <= n <= 4294967295\`
`,
    structureMd: `Problem Name: "Reverse Bits"
Difficulty: EASY
Topics: Bit Manipulation
Function Name: reverseBits

Input Structure:
Input Field: long n

Output Structure:
Output Field: long result
`,
    solutionJs: `export function solve(n) {
  let res = 0;
  for (let i = 0; i < 32; i++) {
    res = (res * 2) + (n % 2);
    n = Math.floor(n / 2);
  }
  return res;
}
`,
    baselineJs: `export function solve(n) {
  const binary = n.toString(2).padStart(32, "0");
  const reversed = binary.split("").reverse().join("");
  return parseInt(reversed, 2);
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { n: 43261596 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { n: 1 } });
  cases.push({ category: "basic", description: "0", inputs: { n: 0 } });
  cases.push({ category: "basic", description: "2", inputs: { n: 2 } });
  cases.push({ category: "basic", description: "4", inputs: { n: 4 } });
  cases.push({ category: "basic", description: "3", inputs: { n: 3 } });
  cases.push({ category: "basic", description: "7", inputs: { n: 7 } });
  cases.push({ category: "basic", description: "2147483648", inputs: { n: 2147483648 } });
  cases.push({ category: "basic", description: "4294967295", inputs: { n: 4294967295 } });
  cases.push({ category: "basic", description: "1073741824", inputs: { n: 1073741824 } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const pow = Math.pow(2, i);
    cases.push({ category: "edge", description: "Power of 2 " + pow, inputs: { n: pow } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const allOnes = Math.pow(2, i - 15) - 1;
    cases.push({ category: "corner", description: "All ones " + allOnes, inputs: { n: allOnes } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = Math.floor(Math.random() * 4000000000) + 1;
    cases.push({ category: "random", description: "Random " + i, inputs: { n } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = 4294967295 - (i - 65);
    cases.push({ category: "large", description: "Large " + i, inputs: { n } });
  }

  return cases;
}
`
  });

  // 148. missing-number
  await writeProblem("missing-number", {
    problemMd: `# Missing Number

Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return the only number in the range that is missing from the array.

### Examples

**Example 1:**
\`\`\`
Input: nums = [3, 0, 1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0, 3]. 2 is the missing number in the range since it does not appear in nums.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [0, 1]
Output: 2
Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0, 2]. 2 is the missing number in the range since it does not appear in nums.
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [9, 6, 4, 2, 3, 5, 7, 0, 1]
Output: 8
Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0, 9]. 8 is the missing number in the range since it does not appear in nums.
\`\`\`

### Constraints

- \`n == nums.length\`
- \`1 <= n <= 10^4\`
- \`0 <= nums[i] <= n\`
- All the numbers of \`nums\` are **unique**.
`,
    structureMd: `Problem Name: "Missing Number"
Difficulty: EASY
Topics: Array, Math, Bit Manipulation
Function Name: missingNumber

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(nums) {
  let xor = nums.length;
  for (let i = 0; i < nums.length; i++) {
    xor ^= i ^ nums[i];
  }
  return xor;
}
`,
    baselineJs: `export function solve(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];

  // Helper to create permutation missing target
  function makeMissing(n, missing) {
    const arr = [];
    for (let i = 0; i <= n; i++) {
      if (i !== missing) arr.push(i);
    }
    // Shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [3, 0, 1] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [0, 1] } });
  cases.push({ category: "basic", description: "Example 3", inputs: { nums: [9, 6, 4, 2, 3, 5, 7, 0, 1] } });
  cases.push({ category: "basic", description: "Missing 0", inputs: { nums: [1] } });
  cases.push({ category: "basic", description: "Missing 1", inputs: { nums: [0] } });
  cases.push({ category: "basic", description: "Missing 2", inputs: { nums: [0, 1] } });
  cases.push({ category: "basic", description: "Missing 0 in 3", inputs: { nums: [1, 2, 3] } });
  cases.push({ category: "basic", description: "Missing 3 in 3", inputs: { nums: [0, 1, 2] } });
  cases.push({ category: "basic", description: "Missing 1 in 3", inputs: { nums: [0, 2, 3] } });
  cases.push({ category: "basic", description: "Missing 2 in 4", inputs: { nums: [0, 1, 3, 4] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const n = i - 8;
    const missing = (i % 2 === 0) ? 0 : n;
    cases.push({ category: "edge", description: "Missing boundary " + i, inputs: { nums: makeMissing(n, missing) } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const n = i - 20;
    const missing = Math.floor(n / 2);
    cases.push({ category: "corner", description: "Missing midpoint " + i, inputs: { nums: makeMissing(n, missing) } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const n = 10 + (i % 20);
    const missing = Math.floor(Math.random() * (n + 1));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums: makeMissing(n, missing) } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const n = 100 + (i - 65) * 20;
    const missing = Math.floor(Math.random() * (n + 1));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums: makeMissing(n, missing) } });
  }

  return cases;
}
`
  });

  // 149. get-sum
  await writeProblem("get-sum", {
    problemMd: `# Sum of Two Integers

Given two integers \`a\` and \`b\`, return the sum of the two integers without using the operators \`+\` and \`-\`.

### Examples

**Example 1:**
\`\`\`
Input: a = 1, b = 2
Output: 3
\`\`\`

**Example 2:**
\`\`\`
Input: a = 2, b = 3
Output: 5
\`\`\`

**Example 3:**
\`\`\`
Input: a = -1, b = 1
Output: 0
\`\`\`

### Constraints

- \`-1000 <= a, b <= 1000\`
`,
    structureMd: `Problem Name: "Sum of Two Integers"
Difficulty: MEDIUM
Topics: Math, Bit Manipulation
Function Name: getSum

Input Structure:
Input Field: int a
Input Field: int b

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}
`,
    baselineJs: `export function solve(a, b) {
  return a + b;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "1 + 2", inputs: { a: 1, b: 2 } });
  cases.push({ category: "basic", description: "2 + 3", inputs: { a: 2, b: 3 } });
  cases.push({ category: "basic", description: "-1 + 1", inputs: { a: -1, b: 1 } });
  cases.push({ category: "basic", description: "0 + 0", inputs: { a: 0, b: 0 } });
  cases.push({ category: "basic", description: "0 + 5", inputs: { a: 0, b: 5 } });
  cases.push({ category: "basic", description: "5 + 0", inputs: { a: 5, b: 0 } });
  cases.push({ category: "basic", description: "-5 + 0", inputs: { a: -5, b: 0 } });
  cases.push({ category: "basic", description: "-2 + -3", inputs: { a: -2, b: -3 } });
  cases.push({ category: "basic", description: "10 + 20", inputs: { a: 10, b: 20 } });
  cases.push({ category: "basic", description: "-10 + 20", inputs: { a: -10, b: 20 } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const a = (i - 17) * 50;
    cases.push({ category: "edge", description: "Opposites " + i, inputs: { a, b: -a } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const val = (i - 32) * 60;
    cases.push({ category: "corner", description: "Corner zero " + i, inputs: { a: val, b: 0 } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const a = Math.floor(Math.random() * 1000) - 500;
    const b = Math.floor(Math.random() * 1000) - 500;
    cases.push({ category: "random", description: "Random " + i, inputs: { a, b } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const a = 500 + (i - 65) * 30;
    const b = 500 - (i - 65) * 20;
    cases.push({ category: "large", description: "Large " + i, inputs: { a, b } });
  }

  return cases;
}
`
  });

  // 150. reverse-integer
  await writeProblem("reverse-integer", {
    problemMd: `# Reverse Integer

Given a signed 32-bit integer \`x\`, return \`x\` with its digits reversed. If reversing \`x\` causes the value to go outside the signed 32-bit integer range \`[-2^31, 2^31 - 1]\`, then return \`0\`.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

### Examples

**Example 1:**
\`\`\`
Input: x = 123
Output: 321
\`\`\`

**Example 2:**
\`\`\`
Input: x = -123
Output: -321
\`\`\`

**Example 3:**
\`\`\`
Input: x = 120
Output: 21
\`\`\`

**Example 4:**
\`\`\`
Input: x = 1534236469
Output: 0
Explanation: Reversing 1534236469 gives 9646324351 which overflows a 32-bit signed integer.
\`\`\`

### Constraints

- \`-2^31 <= x <= 2^31 - 1\`
`,
    structureMd: `Problem Name: "Reverse Integer"
Difficulty: MEDIUM
Topics: Math
Function Name: reverse

Input Structure:
Input Field: int x

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(x) {
  const sign = x < 0 ? -1 : 1;
  let num = Math.abs(x);
  let res = 0;
  while (num > 0) {
    res = res * 10 + (num % 10);
    num = Math.floor(num / 10);
  }
  res = sign * res;
  if (res < -2147483648 || res > 2147483647) return 0;
  return res;
}
`,
    baselineJs: `export function solve(x) {
  const sign = Math.sign(x);
  const s = Math.abs(x).toString().split("").reverse().join("");
  const res = sign * Number(s);
  if (res < -2147483648 || res > 2147483647) return 0;
  return res;
}
`,
    testCasesJs: `export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "123 -> 321", inputs: { x: 123 } });
  cases.push({ category: "basic", description: "-123 -> -321", inputs: { x: -123 } });
  cases.push({ category: "basic", description: "120 -> 21", inputs: { x: 120 } });
  cases.push({ category: "basic", description: "0 -> 0", inputs: { x: 0 } });
  cases.push({ category: "basic", description: "1534236469 -> 0 (overflow)", inputs: { x: 1534236469 } });
  cases.push({ category: "basic", description: "-2147483412 -> -2143847412", inputs: { x: -2147483412 } });
  cases.push({ category: "basic", description: "1 -> 1", inputs: { x: 1 } });
  cases.push({ category: "basic", description: "-1 -> -1", inputs: { x: -1 } });
  cases.push({ category: "basic", description: "10 -> 1", inputs: { x: 10 } });
  cases.push({ category: "basic", description: "100 -> 1", inputs: { x: 100 } });

  // Edge (10 - 24)
  for (let i = 10; i < 18; i++) {
    const val = Math.pow(10, i - 10);
    cases.push({ category: "edge", description: "Power of 10 " + val, inputs: { x: val } });
  }
  for (let i = 18; i < 25; i++) {
    const val = -Math.pow(10, i - 18);
    cases.push({ category: "edge", description: "Negative power of 10 " + val, inputs: { x: val } });
  }

  // Corner (25 - 39)
  // Overflows
  const overflowVals = [
    2147483647, -2147483648, 1534236469, -1563847412,
    1999999999, -1999999999, 1463847412, -1463847412,
    2147483641, -2147483641, 1000000003, -1000000003,
    1000000009, -1000000009, 2000000002
  ];
  for (let i = 25; i < 40; i++) {
    cases.push({ category: "corner", description: "Near boundary " + i, inputs: { x: overflowVals[i - 25] } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const sign = Math.random() < 0.5 ? -1 : 1;
    const x = sign * Math.floor(Math.random() * 1000000);
    cases.push({ category: "random", description: "Random " + i, inputs: { x } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const sign = i % 2 === 0 ? 1 : -1;
    const x = sign * (100000000 + (i - 65) * 5000000);
    cases.push({ category: "large", description: "Large " + i, inputs: { x } });
  }

  return cases;
}
`
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
