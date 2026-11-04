// Baseline frequency counting solution for Majority Element.
// Validates that the majority element appears strictly more than floor(N / 2) times.

export function solve(nums) {
  if (!nums || nums.length === 0) {
    throw new Error("Invalid test case: array cannot be empty for Majority Element");
  }

  const threshold = Math.floor(nums.length / 2);
  const counts = new Map();

  for (const num of nums) {
    const nextCount = (counts.get(num) || 0) + 1;
    counts.set(num, nextCount);
    if (nextCount > threshold) {
      return num;
    }
  }

  throw new Error(
    `Invalid test case: no element appears > floor(${nums.length} / 2) = ${threshold} times`
  );
}
