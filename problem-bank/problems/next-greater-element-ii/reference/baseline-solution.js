export function solve(nums) {
  const n = nums.length;
  const res = [];
  for (let i = 0; i < n; i++) {
    let found = -1;
    for (let j = 1; j < n; j++) {
      const idx = (i + j) % n;
      if (nums[idx] > nums[i]) {
        found = nums[idx];
        break;
      }
    }
    res.push(found);
  }
  return res;
}
