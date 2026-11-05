# Next Smaller Element

Given an integer array `arr` of size `n`. For each element in the array, check whether the right adjacent element is smaller than the current element. If it is smaller, then that element will be the immediate smaller element. If not, then consider it as `-1`.

The last element in the array will always have `-1` since it has no right adjacent element.

### Examples

**Example 1:**
```
Input: arr = [4, 2, 1, 5, 3]
Output: 2 1 -1 3 -1
Explanation:
- For 4, next is 2 (smaller), so 2.
- For 2, next is 1 (smaller), so 1.
- For 1, next is 5 (greater), so -1.
- For 5, next is 3 (smaller), so 3.
- For 3, no next element, so -1.
```

**Example 2:**
```
Input: arr = [5, 6, 2, 3, 1, 7]
Output: -1 2 -1 1 -1 -1
```

### Constraints

- `1 <= arr.length <= 10^5`
- `1 <= arr[i] <= 10^5`
