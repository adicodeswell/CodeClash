export function solve(nums, k) {
  const arr = [...nums];
  arr.sort((a, b) => a - b);
  return arr[arr.length - k];
}
