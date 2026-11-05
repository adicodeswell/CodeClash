export function solve(nums) {
  let max = nums[0];
  for (let i = 0; i < nums.length; i++) {
    let p = 1;
    for (let j = i; j < nums.length; j++) {
      p *= nums[j];
      if (p > max) max = p;
    }
  }
  return max;
}
