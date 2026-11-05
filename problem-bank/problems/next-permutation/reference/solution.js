export function solve(nums) {
  const arr = [...nums];
  let i = arr.length - 2;
  while (i >= 0 && arr[i] >= arr[i + 1]) i--;

  if (i >= 0) {
    let j = arr.length - 1;
    while (arr[j] <= arr[i]) j--;
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  let l = i + 1, r = arr.length - 1;
  while (l < r) {
    const temp = arr[l];
    arr[l] = arr[r];
    arr[r] = temp;
    l++;
    r--;
  }
  return arr;
}
