# Next Permutation

A **permutation** of an array of integers is an arrangement of its members into a sequence or linear order.

The **next permutation** of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the **next permutation** of that array is the permutation that follows it in the sorted container.

If such an arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).

Return the next permutation array.

### Examples

**Example 1:**
```
Input: nums = [1, 2, 3]
Output: 1 3 2
```

**Example 2:**
```
Input: nums = [3, 2, 1]
Output: 1 2 3
```

**Example 3:**
```
Input: nums = [1, 1, 5]
Output: 1 5 1
```

### Constraints

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 100`
