# Minimum Interval to Include Each Query

You are given a 2D integer array `intervals`, where `intervals[i] = [lefti, righti]` describes the `i`-th interval starting at `lefti` and ending at `righti` (inclusive). The **size** of an interval is its length: `righti - lefti + 1`.

You are also given an integer array `queries`. The answer to the `j`-th query is the **size of the smallest interval** `i` such that `lefti <= queries[j] <= righti`. If no such interval exists, the answer is `-1`.

Return an array containing the answers to the queries.

### Examples

**Example 1:**
```
Input: intervals = [[1, 4], [2, 4], [3, 6], [4, 4]], queries = [2, 3, 4, 5]
Output: 3 3 1 4
```

**Example 2:**
```
Input: intervals = [[2, 3], [2, 5], [1, 8], [20, 25]], queries = [2, 19, 5, 22]
Output: 2 -1 4 6
```

### Constraints

- `1 <= intervals.length <= 10^5`
- `1 <= queries.length <= 10^5`
- `intervals[i].length == 2`
- `1 <= lefti <= righti <= 10^7`
- `1 <= queries[j] <= 10^7`
