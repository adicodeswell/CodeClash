# N-Queens

The **n-queens** puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.

Given an integer `n`, return all distinct solutions to the **n-queens puzzle**.

Each solution contains a distinct board configuration of the n-queens' placement, where `'Q'` and `'.'` both indicate a queen and an empty space, respectively.

You must return the list of solutions sorted in **lexicographical order** row-by-row to guarantee a unique, deterministic result.

### Examples

**Example 1:**
```
Input: n = 4
Output:
.Q.. ...Q Q... ..Q.
..Q. Q... ...Q .Q..
```

**Example 2:**
```
Input: n = 1
Output:
Q
```

### Constraints

- `n in [1, 9]` where solutions exist (e.g. `n = 1` or `4 <= n <= 9`).
