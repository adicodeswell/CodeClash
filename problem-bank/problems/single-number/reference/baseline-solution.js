// Baseline Set-based reference solution for Single Number.
// Rigorously asserts that all duplicate pairs cancel out and exactly one single number remains.

export function solve(nums) {
  if (!nums || nums.length === 0) {
    throw new Error("Invalid test case: array cannot be empty for Single Number");
  }

  const set = new Set();
  for (const num of nums) {
    if (set.has(num)) {
      set.delete(num);
    } else {
      set.add(num);
    }
  }

  if (set.size !== 1) {
    throw new Error(
      `Invalid test case: expected exactly 1 unpaired element, but found ${set.size} element(s): [${[...set].join(", ")}]`
    );
  }

  return Array.from(set)[0];
}
