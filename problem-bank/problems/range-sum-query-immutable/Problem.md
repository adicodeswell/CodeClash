# Range Sum Query - Immutable

Given an integer array `nums`, handle multiple queries of the following type:
- Calculate the sum of the elements of `nums` between indices `left` and `right` inclusive where `left <= right`.

Return an array of answers for each query in the order given.

### Examples

**Example 1:**
```
Input: nums = [-2, 0, 3, -5, 2, -1], queries = [[0, 2], [2, 5], [0, 5]]
Output: 1 -1 -3
Explanation:
- sumRange(0, 2) -> (-2) + 0 + 3 = 1
- sumRange(2, 5) -> 3 + (-5) + 2 + (-1) = -1
- sumRange(0, 5) -> (-2) + 0 + 3 + (-5) + 2 + (-1) = -3
```

### Constraints

- `1 <= nums.length <= 10^4`
- `-10^5 <= nums[i] <= 10^5`
- `0 <= left <= right < nums.length`
- `1 <= queries.length <= 10^4`
