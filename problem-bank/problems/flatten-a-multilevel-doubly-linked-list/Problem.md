# Flatten a Multilevel Doubly Linked List

You are given a doubly linked list, which contains nodes that have a next pointer, a previous pointer, and an additional child pointer. This child pointer may or may not point to a separate doubly linked list, also containing these special nodes. These child lists may have one or more children of their own, and so on, to produce a multilevel data structure.

Given the head of the first level of the list, flatten the list so that all the nodes appear in a single-level, doubly linked list (in depth-first order).

For simplicity, the multilevel doubly linked list is represented as an array of tuples `[val, next_index, child_index]`, where `next_index` is the 0-based index of the next node on the same level (`-1` if none), and `child_index` is the 0-based index of the child node (`-1` if none). Head is at index 0.

Return the flattened list of node values.

### Examples

**Example 1:**
```
Input: nodes = [
  [1, 1, -1],
  [2, 2, -1],
  [3, 3, 3],
  [4, -1, -1],
  [7, 5, -1],
  [8, -1, -1]
]
Output: 1 2 3 7 8 4
Explanation:
Node 3 has child node 7 (index 4).
The order is 1 -> 2 -> 3 -> 7 -> 8 -> 4.
```

**Example 2:**
```
Input: nodes = [
  [1, -1, 1],
  [2, -1, 2],
  [3, -1, -1]
]
Output: 1 2 3
Explanation:
Each node has a child pointing to the next level.
```

### Constraints

- `1 <= nodes.length <= 1000`
- `-1000 <= val <= 1000`
- The list structure forms a valid multilevel tree without cycles.
