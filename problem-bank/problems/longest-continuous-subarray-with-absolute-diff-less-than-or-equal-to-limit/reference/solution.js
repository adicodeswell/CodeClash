export function solve(nums, limit) {
  const maxQ = [];
  const minQ = [];
  let l = 0, maxLen = 0;
  for (let r = 0; r < nums.length; r++) {
    while (maxQ.length > 0 && nums[maxQ[maxQ.length - 1]] <= nums[r]) maxQ.pop();
    maxQ.push(r);
    while (minQ.length > 0 && nums[minQ[minQ.length - 1]] >= nums[r]) minQ.pop();
    minQ.push(r);

    while (nums[maxQ[0]] - nums[minQ[0]] > limit) {
      l++;
      if (maxQ[0] < l) maxQ.shift();
      if (minQ[0] < l) minQ.shift();
    }
    maxLen = Math.max(maxLen, r - l + 1);
  }
  return maxLen;
}
