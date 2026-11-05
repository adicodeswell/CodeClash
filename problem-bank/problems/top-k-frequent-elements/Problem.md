# Top K Frequent Elements

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.

To ensure deterministic evaluation across all languages, return the `k` elements sorted in **ascending order**.

### Examples

**Example 1:**
```
Input: nums = [1, 1, 1, 2, 2, 3], k = 2
Output: [1, 2]
Explanation: 1 appears 3 times, 2 appears 2 times, and 3 appears 1 time.
```

**Example 2:**
```
Input: nums = [1], k = 1
Output: [1]
```

### Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `k` is in the range `[1, the number of unique elements in the array]`.
- It is guaranteed that the answer is unique (no ties for the kth frequency boundary).
