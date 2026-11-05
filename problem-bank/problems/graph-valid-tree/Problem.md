# Graph Valid Tree

Given `n` nodes labeled from `0` to `n - 1` and a list of undirected edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.

A valid tree has exactly `n - 1` edges, is connected, and contains no cycles.

### Examples

**Example 1:**
```
Input: n = 5, edges = [[0, 1], [0, 2], [0, 3], [1, 4]]
Output: 1
```

**Example 2:**
```
Input: n = 5, edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]
Output: 0
```

### Constraints

- `1 <= n <= 100`
- `0 <= edges.length <= 100`
- `edges[i].length == 2`
- `0 <= ai, bi < n`
- `ai != bi`
- There are no duplicate edges.
