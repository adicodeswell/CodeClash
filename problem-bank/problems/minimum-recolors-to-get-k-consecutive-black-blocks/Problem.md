# Minimum Recolors to Get K Consecutive Black Blocks

You are given a **0-indexed** string `blocks` of length `n`, where `blocks[i]` is either `'W'` or `'B'`, representing the color of the `i`-th block. The characters `'W'` and `'B'` denote the colors white and black, respectively.

You are also given an integer `k`, which is the desired number of **consecutive** black blocks.

In one operation, you can **recolor** a white block such that it becomes a black block.

Return the **minimum** number of operations needed such that there is at least **one** occurrence of `k` consecutive black blocks.

### Examples

**Example 1:**
```
Input: blocks = "WBBWWBBWBW", k = 7
Output: 3
Explanation: One way to achieve 7 consecutive black blocks is to recolor blocks[0], blocks[3], and blocks[4].
```

**Example 2:**
```
Input: blocks = "WBWBBBW", k = 2
Output: 0
Explanation: "BBB" already contains 2 consecutive black blocks.
```

### Constraints

- `n == blocks.length`
- `1 <= n <= 100`
- `blocks[i]` is either `'W'` or `'B'`.
- `1 <= k <= n`
