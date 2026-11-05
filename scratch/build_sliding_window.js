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
  // 6. best-time-to-buy-and-sell-stock
  await writeProblem("best-time-to-buy-and-sell-stock", {
    problemMd: `# Best Time to Buy and Sell Stock

You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`-th day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.

### Examples

**Example 1:**
\`\`\`
Input: prices = [7, 1, 5, 3, 6, 4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.
\`\`\`

**Example 2:**
\`\`\`
Input: prices = [7, 6, 4, 3, 1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
\`\`\`

### Constraints

- \`1 <= prices.length <= 10^5\`
- \`0 <= prices[i] <= 10^4\`
`,
    structureMd: `Problem Name: "Best Time to Buy and Sell Stock"
Difficulty: EASY
Topics: Array, Dynamic Programming
Function Name: maxProfit

Input Structure:
Input Field: list<int> prices

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) minPrice = prices[i];
    else if (prices[i] - minPrice > maxProfit) maxProfit = prices[i] - minPrice;
  }
  return maxProfit;
}
`,
    baselineJs: `export function solve(prices) {
  let maxProfit = 0;
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      if (prices[j] - prices[i] > maxProfit) {
        maxProfit = prices[j] - prices[i];
      }
    }
  }
  return maxProfit;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { prices: [7, 1, 5, 3, 6, 4] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { prices: [7, 6, 4, 3, 1] } });
  cases.push({ category: "basic", description: "Single element", inputs: { prices: [10] } });
  cases.push({ category: "basic", description: "Two elements up", inputs: { prices: [1, 5] } });
  cases.push({ category: "basic", description: "Two elements down", inputs: { prices: [5, 1] } });
  cases.push({ category: "basic", description: "Equal prices", inputs: { prices: [3, 3, 3, 3] } });
  cases.push({ category: "basic", description: "Valley then peak", inputs: { prices: [2, 4, 1] } });
  cases.push({ category: "basic", description: "Steady climb", inputs: { prices: [1, 2, 3, 4, 5, 6] } });
  cases.push({ category: "basic", description: "Late spike", inputs: { prices: [5, 4, 3, 2, 20] } });
  cases.push({ category: "basic", description: "Early spike", inputs: { prices: [20, 5, 4, 3, 2] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 3 + (i % 6);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 50));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { prices: arr } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 0, 100));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { prices: arr } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 20, 60);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 500));
    cases.push({ category: "random", description: "Random " + i, inputs: { prices: arr } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 100, 300);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, 1, 10000));
    cases.push({ category: "large", description: "Large " + i, inputs: { prices: arr } });
  }

  return cases;
}
`,
  });

  // 7. longest-substring-without-repeating-characters
  await writeProblem("longest-substring-without-repeating-characters", {
    problemMd: `# Longest Substring Without Repeating Characters

Given a string \`s\`, find the length of the **longest substring** without repeating characters.

### Examples

**Example 1:**
\`\`\`
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
\`\`\`

**Example 2:**
\`\`\`
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
\`\`\`

**Example 3:**
\`\`\`
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
\`\`\`

### Constraints

- \`1 <= s.length <= 5 * 10^4\`
- \`s\` consists of English letters, digits, and printable symbols with no internal whitespace.
`,
    structureMd: `Problem Name: "Longest Substring Without Repeating Characters"
Difficulty: MEDIUM
Topics: Hash Table, String, Sliding Window
Function Name: lengthOfLongestSubstring

Input Structure:
Input Field: String s

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(s) {
  let maxLen = 0, l = 0;
  const map = new Map();
  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    if (map.has(c) && map.get(c) >= l) {
      l = map.get(c) + 1;
    }
    map.set(c, r);
    if (r - l + 1 > maxLen) maxLen = r - l + 1;
  }
  return maxLen;
}
`,
    baselineJs: `export function solve(s) {
  let maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    const set = new Set();
    for (let j = i; j < s.length; j++) {
      if (set.has(s[j])) break;
      set.add(s[j]);
      if (j - i + 1 > maxLen) maxLen = j - i + 1;
    }
  }
  return maxLen;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { s: "abcabcbb" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "bbbbb" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "pwwkew" } });
  cases.push({ category: "basic", description: "Single char", inputs: { s: "a" } });
  cases.push({ category: "basic", description: "All unique", inputs: { s: "abcdefg" } });
  cases.push({ category: "basic", description: "Two chars alternating", inputs: { s: "abababab" } });
  cases.push({ category: "basic", description: "Numbers", inputs: { s: "123456789" } });
  cases.push({ category: "basic", description: "Symbols", inputs: { s: "!@#$%^&*()" } });
  cases.push({ category: "basic", description: "Sandwich", inputs: { s: "abccba" } });
  cases.push({ category: "basic", description: "Duplicate at ends", inputs: { s: "a12345a" } });

  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-.,";

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 3 + (i % 6);
    let s = "";
    for (let j = 0; j < len; j++) s += chars[randomInt(rng, 0, 5)];
    cases.push({ category: "edge", description: "Edge " + i, inputs: { s } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    let s = "";
    for (let j = 0; j < len; j++) s += chars[randomInt(rng, 0, 10)];
    cases.push({ category: "corner", description: "Corner " + i, inputs: { s } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 20, 60);
    let s = "";
    for (let j = 0; j < len; j++) s += chars[randomInt(rng, 0, 25)];
    cases.push({ category: "random", description: "Random " + i, inputs: { s } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 80, 200);
    let s = "";
    for (let j = 0; j < len; j++) s += chars[randomInt(rng, 0, chars.length - 1)];
    cases.push({ category: "large", description: "Large " + i, inputs: { s } });
  }

  return cases;
}
`,
  });

  // 8. longest-repeating-character-replacement
  await writeProblem("longest-repeating-character-replacement", {
    problemMd: `# Longest Repeating Character Replacement

You are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most \`k\` times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

### Examples

**Example 1:**
\`\`\`
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
\`\`\`

**Example 2:**
\`\`\`
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.
\`\`\`

### Constraints

- \`1 <= s.length <= 10^5\`
- \`s\` consists of only uppercase English letters.
- \`0 <= k <= s.length\`
`,
    structureMd: `Problem Name: "Longest Repeating Character Replacement"
Difficulty: MEDIUM
Topics: Hash Table, String, Sliding Window
Function Name: characterReplacement

Input Structure:
Input Field: String s
Input Field: int k

Output Structure:
Output Field: int result
`,
    solutionJs: `export function solve(s, k) {
  let l = 0, maxFreq = 0, maxLen = 0;
  const count = new Array(26).fill(0);
  for (let r = 0; r < s.length; r++) {
    const idx = s.charCodeAt(r) - 65;
    count[idx]++;
    if (count[idx] > maxFreq) maxFreq = count[idx];
    while (r - l + 1 - maxFreq > k) {
      count[s.charCodeAt(l) - 65]--;
      l++;
    }
    if (r - l + 1 > maxLen) maxLen = r - l + 1;
  }
  return maxLen;
}
`,
    baselineJs: `export function solve(s, k) {
  let maxLen = 0;
  for (let c = 0; c < 26; c++) {
    const target = String.fromCharCode(65 + c);
    let l = 0, changes = 0;
    for (let r = 0; r < s.length; r++) {
      if (s[r] !== target) changes++;
      while (changes > k) {
        if (s[l] !== target) changes--;
        l++;
      }
      if (r - l + 1 > maxLen) maxLen = r - l + 1;
    }
  }
  return maxLen;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { s: "ABAB", k: 2 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "AABABBA", k: 1 } });
  cases.push({ category: "basic", description: "k=0", inputs: { s: "ABBB", k: 0 } });
  cases.push({ category: "basic", description: "All same", inputs: { s: "AAAA", k: 2 } });
  cases.push({ category: "basic", description: "k >= len", inputs: { s: "ABCD", k: 4 } });
  cases.push({ category: "basic", description: "Single char", inputs: { s: "X", k: 0 } });
  cases.push({ category: "basic", description: "Alternating with k=1", inputs: { s: "ABABAB", k: 1 } });
  cases.push({ category: "basic", description: "Two different blocks", inputs: { s: "AAABBB", k: 1 } });
  cases.push({ category: "basic", description: "Three distinct", inputs: { s: "ABCDE", k: 2 } });
  cases.push({ category: "basic", description: "Dense cluster", inputs: { s: "BAAAB", k: 2 } });

  function makeStr(len, alphabetSize) {
    let s = "";
    for (let i = 0; i < len; i++) s += String.fromCharCode(65 + (i % alphabetSize));
    return s;
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 4 + (i % 5);
    const k = i % 3;
    cases.push({ category: "edge", description: "Edge " + i, inputs: { s: makeStr(len, 3), k } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    const k = (i % 4) + 1;
    let s = "";
    for (let j = 0; j < len; j++) s += String.fromCharCode(65 + randomInt(rng, 0, 3));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { s, k } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 20, 50);
    const k = randomInt(rng, 0, 5);
    let s = "";
    for (let j = 0; j < len; j++) s += String.fromCharCode(65 + randomInt(rng, 0, 4));
    cases.push({ category: "random", description: "Random " + i, inputs: { s, k } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 80, 200);
    const k = randomInt(rng, 1, 10);
    let s = "";
    for (let j = 0; j < len; j++) s += String.fromCharCode(65 + randomInt(rng, 0, 5));
    cases.push({ category: "large", description: "Large " + i, inputs: { s, k } });
  }

  return cases;
}
`,
  });

  // 9. permutation-in-string
  await writeProblem("permutation-in-string", {
    problemMd: `# Permutation in String

Given two strings \`s1\` and \`s2\`, return \`true\` if \`s2\` contains a permutation of \`s1\`, or \`false\` otherwise.

In other words, return \`true\` if one of \`s1\`'s permutations is the substring of \`s2\`.

### Examples

**Example 1:**
\`\`\`
Input: s1 = "ab", s2 = "eidbaooo"
Output: 1
Explanation: s2 contains one permutation of s1 ("ba").
\`\`\`

**Example 2:**
\`\`\`
Input: s1 = "ab", s2 = "eidboaoo"
Output: 0
\`\`\`

### Constraints

- \`1 <= s1.length, s2.length <= 10^4\`
- \`s1\` and \`s2\` consist of lowercase English letters with no internal whitespace.
`,
    structureMd: `Problem Name: "Permutation in String"
Difficulty: MEDIUM
Topics: Hash Table, Two Pointers, String, Sliding Window
Function Name: checkInclusion

Input Structure:
Input Field: String s1
Input Field: String s2

Output Structure:
Output Field: bool result
`,
    solutionJs: `export function solve(s1, s2) {
  if (s1.length > s2.length) return false;
  const count1 = new Array(26).fill(0);
  const count2 = new Array(26).fill(0);
  for (let i = 0; i < s1.length; i++) {
    count1[s1.charCodeAt(i) - 97]++;
    count2[s2.charCodeAt(i) - 97]++;
  }
  let matches = 0;
  for (let i = 0; i < 26; i++) {
    if (count1[i] === count2[i]) matches++;
  }
  for (let i = 0; i < s2.length - s1.length; i++) {
    if (matches === 26) return true;
    const r = s2.charCodeAt(i + s1.length) - 97;
    const l = s2.charCodeAt(i) - 97;
    count2[r]++;
    if (count2[r] === count1[r]) matches++;
    else if (count2[r] === count1[r] + 1) matches--;

    count2[l]--;
    if (count2[l] === count1[l]) matches++;
    else if (count2[l] === count1[l] - 1) matches--;
  }
  return matches === 26;
}
`,
    baselineJs: `export function solve(s1, s2) {
  if (s1.length > s2.length) return false;
  const target = s1.split("").sort().join("");
  const len = s1.length;
  for (let i = 0; i <= s2.length - len; i++) {
    const sub = s2.slice(i, i + len).split("").sort().join("");
    if (sub === target) return true;
  }
  return false;
}
`,
    testCasesJs: `import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { s1: "ab", s2: "eidbaooo" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s1: "ab", s2: "eidboaoo" } });
  cases.push({ category: "basic", description: "Exact match", inputs: { s1: "abc", s2: "abc" } });
  cases.push({ category: "basic", description: "Reversed match", inputs: { s1: "abc", s2: "cba" } });
  cases.push({ category: "basic", description: "Single char match", inputs: { s1: "a", s2: "a" } });
  cases.push({ category: "basic", description: "Single char fail", inputs: { s1: "a", s2: "b" } });
  cases.push({ category: "basic", description: "Longer s1", inputs: { s1: "abcd", s2: "abc" } });
  cases.push({ category: "basic", description: "Permutation at start", inputs: { s1: "xyz", s2: "zyxabc" } });
  cases.push({ category: "basic", description: "Permutation at end", inputs: { s1: "xyz", s2: "abczyx" } });
  cases.push({ category: "basic", description: "All same letters", inputs: { s1: "aaa", s2: "baaa" } });

  function makeCase(len1, len2, shouldMatch) {
    let s1 = "";
    for (let i = 0; i < len1; i++) s1 += String.fromCharCode(97 + randomInt(rng, 0, 4));
    let s2 = "";
    for (let i = 0; i < len2; i++) s2 += String.fromCharCode(97 + randomInt(rng, 5, 9));
    if (shouldMatch) {
      const perm = shuffle(rng, s1.split("")).join("");
      const insertPos = randomInt(rng, 0, Math.max(0, len2 - len1));
      s2 = s2.slice(0, insertPos) + perm + s2.slice(insertPos);
    }
    return { s1, s2 };
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const match = i % 2 === 0;
    const c = makeCase(2 + (i % 3), 6 + (i % 4), match);
    cases.push({ category: "edge", description: "Edge " + i, inputs: c });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const match = i % 2 === 0;
    const c = makeCase(4, 15, match);
    cases.push({ category: "corner", description: "Corner " + i, inputs: c });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const match = i % 2 === 0;
    const c = makeCase(randomInt(rng, 3, 6), randomInt(rng, 20, 50), match);
    cases.push({ category: "random", description: "Random " + i, inputs: c });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const match = i % 2 === 0;
    const c = makeCase(randomInt(rng, 5, 10), randomInt(rng, 80, 200), match);
    cases.push({ category: "large", description: "Large " + i, inputs: c });
  }

  return cases;
}
`,
  });

  // 10. minimum-window-substring
  await writeProblem("minimum-window-substring", {
    problemMd: `# Minimum Window Substring

Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the **minimum window substring** of \`s\` such that every character in \`t\` (**including duplicates**) is included in the window.

The test cases will be generated such that the answer is unique and non-empty.

### Examples

**Example 1:**
\`\`\`
Input: s = "ADOBECODEBANC", t = "ABC"
Output: BANC
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
\`\`\`

**Example 2:**
\`\`\`
Input: s = "a", t = "a"
Output: a
Explanation: The entire string s is the minimum window.
\`\`\`

**Example 3:**
\`\`\`
Input: s = "aabccba", t = "abc"
Output: abc
\`\`\`

### Constraints

- \`m == s.length\`, \`n == t.length\`
- \`1 <= m, n <= 10^5\`
- \`s\` and \`t\` consist of uppercase and lowercase English letters with no internal whitespace.
- The input is generated such that a valid non-empty window always exists.
`,
    structureMd: `Problem Name: "Minimum Window Substring"
Difficulty: HARD
Topics: Hash Table, String, Sliding Window
Function Name: minWindow

Input Structure:
Input Field: String s
Input Field: String t

Output Structure:
Output Field: String result
`,
    solutionJs: `export function solve(s, t) {
  if (!s || !t) return "";
  const need = {};
  for (let i = 0; i < t.length; i++) need[t[i]] = (need[t[i]] || 0) + 1;
  let missing = t.length;
  let bestL = 0, bestLen = Infinity;
  let l = 0;
  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    if (need[c] !== undefined) {
      if (need[c] > 0) missing--;
      need[c]--;
    }
    while (missing === 0) {
      if (r - l + 1 < bestLen) {
        bestLen = r - l + 1;
        bestL = l;
      }
      const leftChar = s[l];
      if (need[leftChar] !== undefined) {
        need[leftChar]++;
        if (need[leftChar] > 0) missing++;
      }
      l++;
    }
  }
  return bestLen === Infinity ? "" : s.slice(bestL, bestL + bestLen);
}
`,
    baselineJs: `export function solve(s, t) {
  const need = {};
  for (let i = 0; i < t.length; i++) need[t[i]] = (need[t[i]] || 0) + 1;
  let minLen = Infinity, minSub = "";
  for (let i = 0; i < s.length; i++) {
    const cur = {};
    for (let j = i; j < s.length; j++) {
      cur[s[j]] = (cur[s[j]] || 0) + 1;
      let ok = true;
      for (const k of Object.keys(need)) {
        if ((cur[k] || 0) < need[k]) { ok = false; break; }
      }
      if (ok) {
        if (j - i + 1 < minLen) {
          minLen = j - i + 1;
          minSub = s.slice(i, j + 1);
        }
        break;
      }
    }
  }
  return minSub;
}
`,
    testCasesJs: `import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { s: "ADOBECODEBANC", t: "ABC" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { s: "a", t: "a" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { s: "aabccba", t: "abc" } });
  cases.push({ category: "basic", description: "Exact same", inputs: { s: "ABC", t: "ABC" } });
  cases.push({ category: "basic", description: "Duplicates in t", inputs: { s: "AAABBBCCC", t: "AABC" } });
  cases.push({ category: "basic", description: "Window at end", inputs: { s: "ZZZZZABC", t: "ABC" } });
  cases.push({ category: "basic", description: "Window at start", inputs: { s: "ABCZZZZZ", t: "ABC" } });
  cases.push({ category: "basic", description: "Interleaved chars", inputs: { s: "AxBxCxDxEx", t: "ABC" } });
  cases.push({ category: "basic", description: "Case sensitivity", inputs: { s: "aAbBcC", t: "aB" } });
  cases.push({ category: "basic", description: "Single char repeated", inputs: { s: "aaaaaa", t: "aa" } });

  function makeCase(sLen, tLen) {
    let t = "";
    for (let i = 0; i < tLen; i++) t += String.fromCharCode(65 + randomInt(rng, 0, 4));
    let s = "";
    for (let i = 0; i < sLen; i++) s += String.fromCharCode(65 + randomInt(rng, 5, 8));
    // Embed t into s at random locations so a window always exists
    const tChars = shuffle(rng, t.split(""));
    const embedPositions = [];
    while (embedPositions.length < tLen) {
      const pos = randomInt(rng, 0, sLen - 1);
      if (!embedPositions.includes(pos)) embedPositions.push(pos);
    }
    embedPositions.sort((a, b) => a - b);
    const sArr = s.split("");
    for (let i = 0; i < tLen; i++) {
      sArr[embedPositions[i]] = tChars[i];
    }
    return { s: sArr.join(""), t };
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const c = makeCase(8 + (i % 4), 2 + (i % 2));
    cases.push({ category: "edge", description: "Edge " + i, inputs: c });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const c = makeCase(15, 3);
    cases.push({ category: "corner", description: "Corner " + i, inputs: c });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const c = makeCase(randomInt(rng, 25, 50), randomInt(rng, 2, 4));
    cases.push({ category: "random", description: "Random " + i, inputs: c });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const c = makeCase(randomInt(rng, 70, 150), randomInt(rng, 3, 5));
    cases.push({ category: "large", description: "Large " + i, inputs: c });
  }

  return cases;
}
`,
  });

  // 11. sliding-window-maximum
  await writeProblem("sliding-window-maximum", {
    problemMd: `# Sliding Window Maximum

You are given an array of integers \`nums\`, there is a sliding window of size \`k\` which is moving from the very left of the array to the very right. You can only see the \`k\` numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

### Examples

**Example 1:**
\`\`\`
Input: nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
Output: 3 3 5 5 6 7
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1], k = 1
Output: 1
\`\`\`

### Constraints

- \`1 <= nums.length <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`1 <= k <= nums.length\`
`,
    structureMd: `Problem Name: "Sliding Window Maximum"
Difficulty: HARD
Topics: Array, Queue, Sliding Window, Monotonic Queue
Function Name: maxSlidingWindow

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: list<int> result
`,
    solutionJs: `export function solve(nums, k) {
  const result = [];
  const q = []; // stores indices
  for (let i = 0; i < nums.length; i++) {
    while (q.length > 0 && q[0] <= i - k) q.shift();
    while (q.length > 0 && nums[q[q.length - 1]] <= nums[i]) q.pop();
    q.push(i);
    if (i >= k - 1) result.push(nums[q[0]]);
  }
  return result;
}
`,
    baselineJs: `export function solve(nums, k) {
  const result = [];
  for (let i = 0; i <= nums.length - k; i++) {
    let max = nums[i];
    for (let j = i + 1; j < i + k; j++) {
      if (nums[j] > max) max = nums[j];
    }
    result.push(max);
  }
  return result;
}
`,
    testCasesJs: `import { randomInt } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  cases.push({ category: "basic", description: "Example 1", inputs: { nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3 } });
  cases.push({ category: "basic", description: "Example 2", inputs: { nums: [1], k: 1 } });
  cases.push({ category: "basic", description: "k=1", inputs: { nums: [1, -1], k: 1 } });
  cases.push({ category: "basic", description: "k=nums.length", inputs: { nums: [9, 11], k: 2 } });
  cases.push({ category: "basic", description: "All decreasing", inputs: { nums: [7, 6, 5, 4, 3, 2, 1], k: 3 } });
  cases.push({ category: "basic", description: "All increasing", inputs: { nums: [1, 2, 3, 4, 5, 6, 7], k: 3 } });
  cases.push({ category: "basic", description: "Equal elements", inputs: { nums: [4, 4, 4, 4, 4], k: 2 } });
  cases.push({ category: "basic", description: "Alternating", inputs: { nums: [1, 3, 1, 3, 1, 3], k: 2 } });
  cases.push({ category: "basic", description: "Peak in middle", inputs: { nums: [1, 2, 10, 2, 1], k: 3 } });
  cases.push({ category: "basic", description: "Negative elements", inputs: { nums: [-7, -8, -7, 5, 7, 1, 6, 0], k: 4 } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const len = 4 + (i % 5);
    const k = 1 + (i % len);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -20, 20));
    cases.push({ category: "edge", description: "Edge " + i, inputs: { nums: arr, k } });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const len = 15;
    const k = 1 + (i % 5);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -100, 100));
    cases.push({ category: "corner", description: "Corner " + i, inputs: { nums: arr, k } });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const len = randomInt(rng, 20, 60);
    const k = randomInt(rng, 2, Math.min(10, len));
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -500, 500));
    cases.push({ category: "random", description: "Random " + i, inputs: { nums: arr, k } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    const len = randomInt(rng, 80, 200);
    const k = randomInt(rng, 5, 20);
    const arr = [];
    for (let j = 0; j < len; j++) arr.push(randomInt(rng, -1000, 1000));
    cases.push({ category: "large", description: "Large " + i, inputs: { nums: arr, k } });
  }

  return cases;
}
`,
  });
}

main().catch(console.error);
