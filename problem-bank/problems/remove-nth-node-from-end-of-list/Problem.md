# Remove Nth Node From End of List

Given the head of a linked list represented as an array, remove the `n`-th node from the end of the list and return its head.

### Examples

**Example 1:**
```
Input: head = [1, 2, 3, 4, 5], n = 2
Output: 1 2 3 5
Explanation: The 2nd node from the end is 4. Removing it results in [1, 2, 3, 5].
```

**Example 2:**
```
Input: head = [1, 2], n = 1
Output: 1
```

**Example 3:**
```
Input: head = [1, 2], n = 2
Output: 2
```

### Constraints

- `2 <= head.length <= 30`
- `0 <= head[i] <= 100`
- `1 <= n <= head.length`
