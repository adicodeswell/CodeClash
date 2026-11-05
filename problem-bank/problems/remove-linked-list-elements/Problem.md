# Remove Linked List Elements

Given the head of a linked list and an integer `val`, remove all the nodes of the linked list that have `Node.val == val`, and return the new head.

### Examples

**Example 1:**
```
Input:
head = [1, 2, 6, 3, 4, 5, 6]
val = 6
Output: 1 2 3 4 5
```

**Example 2:**
```
Input:
head = [1, 2, 3]
val = 4
Output: 1 2 3
```

### Constraints

- The number of nodes in the list is in the range `[1, 1000]`.
- `1 <= Node.val <= 100`
- `0 <= val <= 100`
- At least one node in `head` has a value different from `val`.
