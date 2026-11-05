export function solve(stones) {
  const arr = [...stones];
  while (arr.length > 1) {
    arr.sort((a, b) => a - b);
    const y = arr.pop();
    const x = arr.pop();
    if (y > x) {
      arr.push(y - x);
    }
  }
  return arr.length === 0 ? 0 : arr[0];
}
