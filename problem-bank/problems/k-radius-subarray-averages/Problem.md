# K Radius Subarray Averages

You are given a **0-indexed** array `nums` of `n` integers, and an integer `k`.

The **k-radius average** for a subarray of `nums` centered at index `i` with the radius `k` is the average of all elements in `nums` between the indices `i - k` and `i + k` (inclusive). If there are less than `k` elements before or after index `i`, then the k-radius average is `-1`.

Build and return an array `avgs` of length `n` where `avgs[i]` is the **k-radius average** for the subarray centered at index `i`.

The average of `x` elements is the sum of the `x` elements divided by `x`, using **integer division** (i.e. truncating toward zero).

### Examples

**Example 1:**
```
Input: nums = [7, 4, 3, 9, 1, 8, 5, 2, 6], k = 3
Output: -1 -1 -1 5 4 4 -1 -1 -1
Explanation:
- Indices 0, 1, 2 and 6, 7, 8 have less than 3 elements before/after, so -1.
- Center 3: (7+4+3+9+1+8+5) / 7 = 37 / 7 = 5
- Center 4: (4+3+9+1+8+5+2) / 7 = 32 / 7 = 4
- Center 5: (3+9+1+8+5+2+6) / 7 = 34 / 7 = 4
```

**Example 2:**
```
Input: nums = [100000], k = 0
Output: 100000
```

**Example 3:**
```
Input: nums = [8], k = 100
Output: -1
```

### Constraints

- `n == nums.length`
- `1 <= n <= 10^5`
- `0 <= nums[i], k <= 10^5`
