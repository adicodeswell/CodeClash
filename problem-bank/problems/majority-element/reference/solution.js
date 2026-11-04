// Optimal O(N) time, O(1) space Boyer-Moore Voting Algorithm for Majority Element.
export function solve(nums) {
  let candidate = nums[0];
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    if (count === 0) {
      candidate = nums[i];
    }
    count += nums[i] === candidate ? 1 : -1;
  }

  return candidate;
}
