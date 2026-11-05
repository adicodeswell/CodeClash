export function solve(nums) {
  const n = nums.length;
  const prefix = new Array(n);
  const suffix = new Array(n);

  prefix[0] = nums[0];
  for (let i = 1; i < n; i++) prefix[i] = prefix[i - 1] * nums[i];

  suffix[n - 1] = nums[n - 1];
  for (let i = n - 2; i >= 0; i--) suffix[i] = suffix[i + 1] * nums[i];

  const ans = new Array(n);
  for (let i = 0; i < n; i++) {
    const left = i > 0 ? prefix[i - 1] : 1;
    const right = i < n - 1 ? suffix[i + 1] : 1;
    ans[i] = left * right;
  }
  return ans;
}
