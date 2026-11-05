# Maximum Sum of Almost Unique Subarray

You are given an integer array `nums` and two positive integers `m` and `k`.

Return the **maximum sum** of an almost unique subarray of `nums` of length `k`. An almost unique subarray is a subarray that has **at least** `m` distinct elements. If no such subarray exists, return `0`.

### Examples

**Example 1:**
```
Input: nums = [2, 6, 7, 3, 1, 7], m = 3, k = 4
Output: 18
Explanation:
- [2, 6, 7, 3]: 4 distinct, sum = 18
- [6, 7, 3, 1]: 4 distinct, sum = 17
- [7, 3, 1, 7]: 3 distinct, sum = 18
Max sum is 18.
```

**Example 2:**
```
Input: nums = [5, 9, 9, 2, 4, 5, 4], m = 1, k = 3
Output: 23
Explanation: Subarray [5, 9, 9] has 2 distinct (>= 1) and sum = 23.
```

**Example 3:**
```
Input: nums = [1, 2, 1, 2, 1, 2, 1], m = 3, k = 3
Output: 0
```

### Constraints

- `1 <= nums.length <= 10^5`
- `1 <= m <= k <= nums.length`
- `1 <= nums[i] <= 10^9`
