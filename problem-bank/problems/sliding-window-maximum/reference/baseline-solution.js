export function solve(nums, k) {
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
