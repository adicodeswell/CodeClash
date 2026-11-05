export function solve(operations, values) {
  const nums = [];
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "addNum") {
      const val = values[i][0];
      // Binary search insert to keep sorted
      let low = 0, high = nums.length;
      while (low < high) {
        const mid = (low + high) >> 1;
        if (nums[mid] < val) low = mid + 1;
        else high = mid;
      }
      nums.splice(low, 0, val);
      result.push("null");
    } else if (op === "findMedian") {
      const n = nums.length;
      let med;
      if (n % 2 === 1) {
        med = nums[n >> 1];
      } else {
        med = (nums[(n >> 1) - 1] + nums[n >> 1]) / 2.0;
      }
      result.push(med.toFixed(1));
    }
  }

  return result;
}
