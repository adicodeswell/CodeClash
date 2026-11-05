# Longest Sub-Array with Sum K

Given an array `arr` containing integers (which may include negative numbers) and an integer `k`, find the length of the longest subarray with sum equal to `k`. If no such subarray exists, return `0`.

### Examples

**Example 1:**
```
Input: arr = [10, 5, 2, 7, 1, 9], k = 15
Output: 4
Explanation: The subarray is [5, 2, 7, 1] with length 4.
```

**Example 2:**
```
Input: arr = [-1, 2, 3], k = 6
Output: 0
```

**Example 3:**
```
Input: arr = [1, -1, 5, -2, 3], k = 3
Output: 4
Explanation: The subarray is [1, -1, 5, -2] with sum 3 and length 4.
```

### Constraints

- `1 <= arr.length <= 10^5`
- `-10^5 <= arr[i] <= 10^5`
- `-10^9 <= k <= 10^9`
