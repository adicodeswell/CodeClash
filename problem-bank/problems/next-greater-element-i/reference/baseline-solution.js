export function solve(nums1, nums2) {
  const ans = [];
  for (const x of nums1) {
    const idx = nums2.indexOf(x);
    let found = -1;
    for (let j = idx + 1; j < nums2.length; j++) {
      if (nums2[j] > x) {
        found = nums2[j];
        break;
      }
    }
    ans.push(found);
  }
  return ans;
}