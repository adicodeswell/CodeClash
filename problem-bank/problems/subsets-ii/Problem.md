# Subsets II

Given an integer array `nums` that may contain **duplicates**, return all possible subsets (the power set).

The solution set **must not** contain duplicate subsets. Return the subsets sorted in canonical order:
1. Subsets of smaller size appear before subsets of larger size.
2. For subsets of the same size, sort them element-by-element in ascending order.
3. Elements within each subset must be sorted in ascending order.

### Examples

**Example 1:**
```
Input: nums = [1, 2, 2]
Output:
1
2
1 2
2 2
1 2 2
```

**Example 2:**
```
Input: nums = [0]
Output:
0
```

### Constraints

- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`
