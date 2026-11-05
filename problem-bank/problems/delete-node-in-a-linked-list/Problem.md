# Delete Node in a Linked List

There is a singly-linked list `head` and we want to delete a node in it.

You are given the node value to be deleted `nodeVal`. You will not be given access to the first node of `head`.

All the values of the linked list are unique, and it is guaranteed that the given node is not the last node in the linked list.

Return the updated linked list.

### Examples

**Example 1:**
```
Input:
head = [4, 5, 1, 9]
nodeVal = 5
Output: 4 1 9
Explanation: You are given the second node with value 5, the linked list should become 4 -> 1 -> 9 after calling your function.
```

**Example 2:**
```
Input:
head = [4, 5, 1, 9]
nodeVal = 1
Output: 4 5 9
Explanation: You are given the third node with value 1, the linked list should become 4 -> 5 -> 9 after calling your function.
```

### Constraints

- The number of the nodes in the given list is in the range `[2, 1000]`.
- `-1000 <= Node.val <= 1000`
- Each the value of the node in the list is unique.
- The given node is an existing node in the list and is not the last node.
