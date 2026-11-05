export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: {
      beginWord: "hit",
      endWord: "cog",
      wordList: ["hot", "dot", "dog", "lot", "log", "cog"]
    }
  });

  cases.push({
    category: "basic",
    description: "Example 2",
    inputs: {
      beginWord: "hit",
      endWord: "cog",
      wordList: ["hot", "dot", "dog", "lot", "log"]
    }
  });

  cases.push({
    category: "basic",
    description: "Direct transformation",
    inputs: {
      beginWord: "cat",
      endWord: "cot",
      wordList: ["cot"]
    }
  });

  for (let i = 3; i < 10; i++) {
    cases.push({
      category: "basic",
      description: "Basic ladder " + i,
      inputs: {
        beginWord: "red",
        endWord: "tax",
        wordList: ["ted", "tex", "red", "tax", "tad", "den", "rex", "pee"]
      }
    });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({
      category: "edge",
      description: "Unreachable " + i,
      inputs: {
        beginWord: "hot",
        endWord: "dog",
        wordList: ["hot", "dog"]
      }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({
      category: "corner",
      description: "Two letter words " + i,
      inputs: {
        beginWord: "ab",
        endWord: "cd",
        wordList: ["cb", "cd"]
      }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    cases.push({
      category: "random",
      description: "Random ladder " + i,
      inputs: {
        beginWord: "lead",
        endWord: "gold",
        wordList: ["load", "goad", "gold"]
      }
    });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    cases.push({
      category: "large",
      description: "Large ladder " + i,
      inputs: {
        beginWord: "talk",
        endWord: "tail",
        wordList: ["tall", "toll", "toil", "tail"]
      }
    });
  }

  return cases;
}
