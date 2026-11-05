export function solve(nums, k) {
  if (k <= 1) return 0;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let p = 1;
    for (let j = i; j < nums.length; j++) {
      p *= nums[j];
      if (p < k) count++;
      else break;
    }
  }
  return count;
}
