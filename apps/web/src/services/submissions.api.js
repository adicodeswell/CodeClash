/**
 * submissions.api.js - Centralized API service for Run and Submit actions.
 * Enforces Phase 5 / Phase 6 boundaries: establishes interface contracts
 * and renders the 3 sample test cases without running untrusted code on the server.
 * Full sandboxed execution via Judge0 containers will be connected in Phase 6.
 */

const PROBLEM_SAMPLE_TESTS = {
  "two-sum": [
    {
      id: 1,
      input: "nums = [2,7,11,15], target = 9",
      expected: "[0,1]",
    },
    {
      id: 2,
      input: "nums = [3,2,4], target = 6",
      expected: "[1,2]",
    },
    {
      id: 3,
      input: "nums = [3,3], target = 6",
      expected: "[0,1]",
    },
  ],
  "majority-element": [
    {
      id: 1,
      input: "nums = [3,2,3]",
      expected: "3",
    },
    {
      id: 2,
      input: "nums = [2,2,1,1,1,2,2]",
      expected: "2",
    },
    {
      id: 3,
      input: "nums = [1]",
      expected: "1",
    },
  ],
  "single-number": [
    {
      id: 1,
      input: "nums = [2,2,1]",
      expected: "1",
    },
    {
      id: 2,
      input: "nums = [4,1,2,1,2]",
      expected: "4",
    },
    {
      id: 3,
      input: "nums = [1]",
      expected: "1",
    },
  ],
  "subarray-sum-equals-k": [
    {
      id: 1,
      input: "nums = [1,1,1], k = 2",
      expected: "2",
    },
    {
      id: 2,
      input: "nums = [1,2,3], k = 3",
      expected: "2",
    },
    {
      id: 3,
      input: "nums = [1,-1,0], k = 0",
      expected: "3",
    },
  ],
  "longest-consecutive-sequence": [
    {
      id: 1,
      input: "nums = [100,4,200,1,3,2]",
      expected: "4",
    },
    {
      id: 2,
      input: "nums = [0,3,7,2,5,8,4,6,0,1]",
      expected: "9",
    },
    {
      id: 3,
      input: "nums = [1,2,0,1]",
      expected: "3",
    },
  ],
};

function getSampleTestCases(slug) {
  if (PROBLEM_SAMPLE_TESTS[slug]) {
    return PROBLEM_SAMPLE_TESTS[slug];
  }
  return [
    { id: 1, input: "Sample input 1", expected: "Sample output 1" },
    { id: 2, input: "Sample input 2", expected: "Sample output 2" },
    { id: 3, input: "Sample input 3", expected: "Sample output 3" },
  ];
}

/**
 * Run solution against the 3 sample test cases.
 * Prepares the sample test case interface for Phase 6 Judge0 evaluation.
 */
export async function runCode({ problemSlug, language, sourceCode }) {
  if (!problemSlug) {
    throw new Error("Problem slug is required.");
  }
  if (!language) {
    throw new Error("Language must be selected.");
  }
  if (!sourceCode || !sourceCode.trim()) {
    throw new Error("Source code cannot be empty.");
  }

  // Simulate interface dispatch latency
  await new Promise((resolve) => setTimeout(resolve, 450));

  const sampleCases = getSampleTestCases(problemSlug);

  return {
    status: "READY",
    type: "RUN",
    problemSlug,
    language,
    testCases: sampleCases,
    phaseNotice:
      "Run interface and sample test cases are established. Sandboxed container execution will evaluate code outputs via Judge0 in Phase 6.",
  };
}

/**
 * Submit solution for full judging evaluation.
 */
export async function submitCode({ problemSlug, language, sourceCode }) {
  if (!problemSlug) {
    throw new Error("Problem slug is required.");
  }
  if (!language) {
    throw new Error("Language must be selected.");
  }
  if (!sourceCode || !sourceCode.trim()) {
    throw new Error("Source code cannot be empty.");
  }

  // Simulate submission dispatch latency
  await new Promise((resolve) => setTimeout(resolve, 550));

  return {
    submissionId: `sub_${Date.now()}`,
    status: "QUEUED",
    type: "SUBMIT",
    problemSlug,
    language,
    submittedAt: new Date().toISOString(),
    phaseNotice:
      "Submission successfully registered. The judging worker queue and Judge0 sandboxed runner will evaluate all hidden test cases in Phase 6.",
  };
}
