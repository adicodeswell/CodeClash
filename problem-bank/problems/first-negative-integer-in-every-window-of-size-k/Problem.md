# First Negative Integer in Every Window of Size K

Given an array `arr` and a positive integer `k`, find the first negative integer for each and every contiguous window of size `k`. If a window does not contain a negative integer, then return `0` for that window.

### Examples

**Example 1:**
```
Input: arr = [-8, 2, 3, -6, 10], k = 2
Output: -8 0 -6 -6
Explanation:
- Window [-8, 2]: first negative is -8
- Window [2, 3]: no negative, so 0
- Window [3, -6]: first negative is -6
- Window [-6, 10]: first negative is -6
```

**Example 2:**
```
Input: arr = [12, -1, -7, 8, -15, 30, 16, 28], k = 3
Output: -1 -1 -7 -15 -15 0
```

### Constraints

- `1 <= arr.length <= 10^5`
- `1 <= k <= arr.length`
- `-10^5 <= arr[i] <= 10^5`
