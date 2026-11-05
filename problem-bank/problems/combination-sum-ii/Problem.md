# Combination Sum II

Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`.

Each number in `candidates` may only be used **once** in the combination.

Note: The solution set must not contain duplicate combinations.

To guarantee a unique deterministic output:
1. Each combination must have its elements sorted in ascending order.
2. The list of combinations must be sorted primarily by size ascending, then element-by-element ascending.

### Examples

**Example 1:**
```
Input: candidates = [10, 1, 2, 7, 6, 1, 5], target = 8
Output:
1 7
2 6
1 1 6
1 2 5
```

**Example 2:**
```
Input: candidates = [2, 5, 2, 1, 2], target = 5
Output:
5
1 2 2
```

### Constraints

- `1 <= candidates.length <= 50`
- `1 <= candidates[i] <= 30`
- `1 <= target <= 30`
