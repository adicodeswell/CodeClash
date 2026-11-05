export function solve(nums) {
  const res = [];

  function perm(arr, l, r) {
    if (l === r) {
      res.push([...arr]);
      return;
    }
    for (let i = l; i <= r; i++) {
      [arr[l], arr[i]] = [arr[i], arr[l]];
      perm(arr, l + 1, r);
      [arr[l], arr[i]] = [arr[i], arr[l]];
    }
  }

  perm([...nums], 0, nums.length - 1);

  res.sort((a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  });

  return res;
}
