# Range Sum Query 2D - Immutable

Given a 2D matrix `matrix`, handle multiple queries of the following type:
- Calculate the sum of the elements of `matrix` inside the rectangle defined by its **upper left corner** `(row1, col1)` and **lower right corner** `(row2, col2)`.

Return an array of answers for each query in the order given.

### Examples

**Example 1:**
```
Input:
matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
]
queries = [[2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
Output: 8 11 12
```

### Constraints

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 200`
- `-10^5 <= matrix[i][j] <= 10^5`
- `0 <= row1 <= row2 < m`
- `0 <= col1 <= col2 < n`
- `1 <= queries.length <= 10^4`
