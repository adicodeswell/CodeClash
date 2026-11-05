# Clone Graph

Given a reference of a node in a **connected** undirected graph, return a **deep copy** (clone) of the graph.

The graph is represented as an adjacency list where `adjList[i]` is a list of neighbors of the `i+1`-th node (1-indexed).

Return the cloned graph represented as its adjacency list, with each neighbor list sorted in ascending order.

### Examples

**Example 1:**
```
Input: adjList = [[2, 4], [1, 3], [2, 4], [1, 3]]
Output:
2 4
1 3
2 4
1 3
```

**Example 2:**
```
Input: adjList = [[]]
Output:

```

### Constraints

- The number of nodes in the graph is in the range `[1, 100]`.
- `1 <= Node.val <= 100`
- `Node.val` is unique for each node.
- There are no repeated edges and no self-loops in the graph.
- The Graph is connected and all nodes can be visited starting from the given node.
