# Kth Largest Element in a Stream

Design a class to find the `k`-th largest element in a stream. Note that it is the `k`-th largest element in the sorted order, not the `k`-th distinct element.

Given:
- `k`: The rank of the largest element to maintain.
- `nums`: An initial array of integers.
- `valList`: A stream of integers to be added sequentially.

For each integer in `valList`, add it to the stream and return the `k`-th largest element among all integers added so far.

### Examples

**Example 1:**
```
Input:
k = 3
nums = [4, 5, 8, 2]
valList = [3, 5, 10, 9, 4]
Output: 4 5 5 8 8
```

### Constraints

- `1 <= k <= 10^4`
- `0 <= nums.length <= 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `1 <= valList.length <= 10^4`
- `-10^4 <= valList[i] <= 10^4`
- At least `k` elements will be present when `add` is called.
