import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { strs: ["eat", "tea", "tan", "ate", "nat", "bat"] } });
  cases.push({ category: "basic", description: "Single string", inputs: { strs: ["a"] } });
  cases.push({ category: "basic", description: "All identical", inputs: { strs: ["abc", "abc", "abc"] } });
  cases.push({ category: "basic", description: "No anagrams", inputs: { strs: ["abc", "def", "ghi"] } });
  cases.push({ category: "basic", description: "Two pairs", inputs: { strs: ["ab", "ba", "xy", "yx"] } });
  cases.push({ category: "basic", description: "Permutations of length 3", inputs: { strs: ["abc", "acb", "bac", "bca", "cab", "cba"] } });
  cases.push({ category: "basic", description: "Single letters", inputs: { strs: ["a", "b", "a", "c", "b"] } });
  cases.push({ category: "basic", description: "Variable lengths", inputs: { strs: ["a", "ab", "ba", "abc", "bca"] } });
  cases.push({ category: "basic", description: "Duplicates inside anagram group", inputs: { strs: ["cat", "tac", "cat", "act"] } });
  cases.push({ category: "basic", description: "Subtle differences", inputs: { strs: ["listen", "silent", "enlist", "banana"] } });

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const wordCount = (i % 8) + 2;
    const baseWord = "word" + i;
    const list = [];
    for (let j = 0; j < wordCount; j++) {
      list.push(shuffle(rng, baseWord.split("")).join(""));
    }
    cases.push({
      category: "edge",
      description: `Edge cluster size ${wordCount}`,
      inputs: { strs: shuffle(rng, list) }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const list = [];
    const roots = ["alpha", "beta", "gamma", "delta"];
    for (const r of roots) {
      const count = randomInt(rng, 1, 3);
      for (let k = 0; k < count; k++) {
        list.push(shuffle(rng, r.split("")).join(""));
      }
    }
    cases.push({
      category: "corner",
      description: `Corner multi-cluster ${i}`,
      inputs: { strs: shuffle(rng, list) }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const list = [];
    const numClusters = randomInt(rng, 4, 10);
    for (let c = 0; c < numClusters; c++) {
      const len = randomInt(rng, 3, 7);
      const chars = [];
      for (let j = 0; j < len; j++) chars.push(alphabet[randomInt(rng, 0, 15)]);
      const clusterSize = randomInt(rng, 1, 4);
      for (let k = 0; k < clusterSize; k++) {
        list.push(shuffle(rng, chars).join(""));
      }
    }
    cases.push({
      category: "random",
      description: `Random cluster set ${i}`,
      inputs: { strs: shuffle(rng, list) }
    });
  }

  // Stress (65 - 79)
  for (let i = 65; i < 80; i++) {
    const list = [];
    const numClusters = 25;
    for (let c = 0; c < numClusters; c++) {
      const len = 6;
      const chars = [];
      for (let j = 0; j < len; j++) chars.push(alphabet[(c + j) % 26]);
      const clusterSize = 4;
      for (let k = 0; k < clusterSize; k++) {
        list.push(shuffle(rng, chars).join(""));
      }
    }
    cases.push({
      category: "stress",
      description: `Stress 100 words ${i}`,
      inputs: { strs: shuffle(rng, list) }
    });
  }

  return cases;
}
