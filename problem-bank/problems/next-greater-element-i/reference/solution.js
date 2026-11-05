export function solve(nums1, nums2) {
  const nextGreater = new Map();
  const stack = [];

  for (const num of nums2) {
    while (stack.length > 0 && stack[stack.length - 1] < num) {
      nextGreater.set(stack.pop(), num);
    }
    stack.push(num);
  }

  return nums1.map(x => nextGreater.has(x) ? nextGreater.get(x) : -1);
}