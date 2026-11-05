# Combination Sum

Given an array of **distinct** integers `candidates` and a target integer `target`, return a list of all **unique combinations** of `candidates` where the chosen numbers sum to `target`. You may return the combinations in any order.

The **same** number may be chosen from `candidates` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

To guarantee a unique deterministic output:
1. Each combination must have its elements sorted in ascending order.
2. The list of combinations must be sorted primarily by size ascending, then element-by-element ascending.

### Examples

**Example 1:**
```
Input: candidates = [2, 3, 6, 7], target = 7
Output:
7
2 2 3
```

**Example 2:**
```
Input: candidates = [2, 3, 5], target = 8
Output:
3 5
2 3 3
2 2 2 2
```

### Constraints

- `1 <= candidates.length <= 30`
- `2 <= candidates[i] <= 40`
- All elements of `candidates` are **distinct**.
- `1 <= target <= 40`
