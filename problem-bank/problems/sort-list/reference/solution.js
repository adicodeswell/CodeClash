export function solve(head) {
  function merge(left, right) {
    const result = [];
    let l = 0, r = 0;
    while (l < left.length && r < right.length) {
      if (left[l] <= right[r]) {
        result.push(left[l++]);
      } else {
        result.push(right[r++]);
      }
    }
    while (l < left.length) result.push(left[l++]);
    while (r < right.length) result.push(right[r++]);
    return result;
  }

  function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
  }

  return mergeSort(head);
}