# Merge Intervals

Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

### Examples

**Example 1:**
```
Input: intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
Output:
1 6
8 10
15 18
```

**Example 2:**
```
Input: intervals = [[1, 4], [4, 5]]
Output:
1 5
```

### Constraints

- `1 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= starti <= endi <= 10^4`
