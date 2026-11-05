# Maximum Sum of Distinct Subarrays With Length K

You are given an integer array `nums` and an integer `k`. Find the maximum subarray sum of all the subarrays of `nums` that meet the following conditions:
- The length of the subarray is `k`, and
- All the elements of the subarray are **distinct**.

Return the maximum subarray sum of all the subarrays that meet the conditions. If no subarray meets the conditions, return `0`.

### Examples

**Example 1:**
```
Input: nums = [1, 5, 4, 2, 9, 9, 9], k = 3
Output: 15
Explanation: The subarrays of nums with length 3 are:
- [1, 5, 4]: distinct, sum = 10
- [5, 4, 2]: distinct, sum = 11
- [4, 2, 9]: distinct, sum = 15 (max)
- [2, 9, 9]: contains duplicate 9
- [9, 9, 9]: contains duplicate 9
```

**Example 2:**
```
Input: nums = [4, 4, 4], k = 3
Output: 0
Explanation: No subarray of length 3 has distinct elements.
```

### Constraints

- `1 <= k <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`
