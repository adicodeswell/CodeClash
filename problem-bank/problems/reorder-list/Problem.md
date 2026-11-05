# Reorder List

You are given the head of a singly linked-list represented as an array:
`L0 → L1 → … → Ln - 1 → Ln`

Reorder the list to be on the following form:
`L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …`

Return the reordered list.

### Examples

**Example 1:**
```
Input: head = [1, 2, 3, 4]
Output: 1 4 2 3
```

**Example 2:**
```
Input: head = [1, 2, 3, 4, 5]
Output: 1 5 2 4 3
```

### Constraints

- `1 <= head.length <= 5 * 10^4`
- `1 <= head[i] <= 1000`
