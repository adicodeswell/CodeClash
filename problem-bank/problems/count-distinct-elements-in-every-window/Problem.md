# Count Distinct Elements in Every Window

Given an integer array `arr` and a number `k`, find the count of distinct elements in every window of size `k` in the array.

### Examples

**Example 1:**
```
Input: arr = [1, 2, 1, 3, 4, 2, 3], k = 4
Output: 3 4 4 3
Explanation:
- Window [1, 2, 1, 3] has 3 distinct elements (1, 2, 3)
- Window [2, 1, 3, 4] has 4 distinct elements (1, 2, 3, 4)
- Window [1, 3, 4, 2] has 4 distinct elements (1, 2, 3, 4)
- Window [3, 4, 2, 3] has 3 distinct elements (2, 3, 4)
```

**Example 2:**
```
Input: arr = [4, 1, 1], k = 2
Output: 2 1
```

### Constraints

- `1 <= k <= arr.length <= 10^5`
- `1 <= arr[i] <= 10^5`
