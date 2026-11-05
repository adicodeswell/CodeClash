export function solve(nums) {
  const arr = [...nums];
  let l = 0, m = 0, r = arr.length - 1;
  while (m <= r) {
    if (arr[m] === 0) {
      const temp = arr[l];
      arr[l] = arr[m];
      arr[m] = temp;
      l++;
      m++;
    } else if (arr[m] === 1) {
      m++;
    } else {
      const temp = arr[r];
      arr[r] = arr[m];
      arr[m] = temp;
      r--;
    }
  }
  return arr;
}
