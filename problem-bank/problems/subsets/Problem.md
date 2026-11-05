# Subsets

Given an integer array `nums` of **unique** elements, return all possible subsets (the power set).

The solution set **must not** contain duplicate subsets. Return the subsets sorted in canonical order:
1. Subsets of smaller size appear before subsets of larger size.
2. For subsets of the same size, sort them element-by-element in ascending order.
3. Elements within each subset must be sorted in ascending order.

### Examples

**Example 1:**
```
Input: nums = [1, 2, 3]
Output:
1
2
3
1 2
1 3
2 3
1 2 3
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
- All the numbers of `nums` are **unique**.
