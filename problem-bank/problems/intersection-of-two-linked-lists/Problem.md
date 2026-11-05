# Intersection of Two Linked Lists

Given the heads of two singly linked-lists `headA` and `headB`, return the value of the node at which the two lists intersect. If the two linked lists have no intersection at all, return 0.

The parameters:
- `intersectVal`: The value of the node where the intersection occurs. 0 if there is no intersected node.
- `listA`: The first linked list.
- `listB`: The second linked list.
- `skipA`: The number of nodes in `listA` (starting from the head) to skip to reach the intersected node.
- `skipB`: The number of nodes in `listB` (starting from the head) to skip to reach the intersected node.

### Examples

**Example 1:**
```
Input:
intersectVal = 8
listA = [4, 1, 8, 4, 5]
listB = [5, 6, 1, 8, 4, 5]
skipA = 2
skipB = 3
Output: 8
Explanation: The intersected node's value is 8.
```

**Example 2:**
```
Input:
intersectVal = 0
listA = [2, 6, 4]
listB = [1, 5]
skipA = 3
skipB = 2
Output: 0
Explanation: From the head of A, it reads as [2, 6, 4]. From the head of B, it reads as [1, 5]. Since the two lists do not intersect, intersectVal must be 0.
```

### Constraints

- The number of nodes of `listA` is in the `m`.
- The number of nodes of `listB` is in the `n`.
- `1 <= m, n <= 3 * 10^4`
- `1 <= Node.val <= 10^5`
- `0 <= skipA < m`
- `0 <= skipB < n`
- `intersectVal == 0` if `listA` and `listB` do not intersect.
