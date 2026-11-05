# Surrounded Regions

Given an `m x n` matrix `board` containing `'X'` and `'O'`, capture all regions that are 4-directionally surrounded by `'X'`.

A region is captured by flipping all `'O'`s into `'X'`s in that surrounded region. An `'O'` is not flipped if it is on the border of the board or connected to an `'O'` on the border.

Return the modified board.

### Examples

**Example 1:**
```
Input:
board = [
  ["X","X","X","X"],
  ["X","O","O","X"],
  ["X","X","O","X"],
  ["X","O","X","X"]
]
Output:
X X X X
X X X X
X X X X
X O X X
```

**Example 2:**
```
Input: board = [["X"]]
Output:
X
```

### Constraints

- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 50`
- `board[i][j]` is `'X'` or `'O'`.
