# Copy List with Random Pointer

A linked list of length `n` is given such that each node contains an additional random pointer, which could point to any node in the list, or `null`.

Construct a **deep copy** of the list. The deep copy should consist of exactly `n` brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the `next` and `random` pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.

For simplicity, the list is represented as an array of pairs `[val, random_index]` where `random_index` is the 0-based index of the node that the `random` pointer points to, or `-1` if it does not point to any node.

Return the copied list represented in the same format.

### Examples

**Example 1:**
```
Input: nodes = [[7, -1], [13, 0], [11, 4], [10, 2], [1, 0]]
Output:
7 -1
13 0
11 4
10 2
1 0
```

**Example 2:**
```
Input: nodes = [[1, 1], [2, 1]]
Output:
1 1
2 1
```

### Constraints

- `1 <= nodes.length <= 1000`
- `-10^4 <= val <= 10^4`
- `-1 <= random_index < nodes.length`
