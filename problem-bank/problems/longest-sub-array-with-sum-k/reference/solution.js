export function solve(arr, k) {
  const map = new Map();
  map.set(0, -1);
  let sum = 0, maxLen = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (map.has(sum - k)) {
      maxLen = Math.max(maxLen, i - map.get(sum - k));
    }
    if (!map.has(sum)) {
      map.set(sum, i);
    }
  }
  return maxLen;
}
