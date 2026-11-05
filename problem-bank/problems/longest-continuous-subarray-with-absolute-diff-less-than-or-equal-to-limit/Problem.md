# Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit

Given an array of integers `nums` and an integer `limit`, return the size of the longest **non-empty** subarray such that the absolute difference between any two elements of this subarray is less than or equal to `limit`.

### Examples

**Example 1:**
```
Input: nums = [8, 2, 4, 7], limit = 4
Output: 2
Explanation: Subarrays with diff <= 4:
[8], [2], [4], [7], [2, 4], [4, 7].
Longest size is 2.
```

**Example 2:**
```
Input: nums = [10, 1, 2, 4, 7, 2], limit = 5
Output: 4
Explanation: Subarray [2, 4, 7, 2] has diff <= 5 (7 - 2 = 5).
```

**Example 3:**
```
Input: nums = [4, 2, 2, 2, 4, 4, 2, 2], limit = 0
Output: 3
```

### Constraints

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `0 <= limit <= 10^9`
