export function solve(nums) {
  const arr = [...nums];
  let i = arr.length - 2;
  while (i >= 0 && arr[i] >= arr[i + 1]) i--;
  if (i >= 0) {
    let j = arr.length - 1;
    while (arr[j] <= arr[i]) j--;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const rest = arr.slice(i + 1).reverse();
  for (let k = 0; k < rest.length; k++) {
    arr[i + 1 + k] = rest[k];
  }
  return arr;
}
