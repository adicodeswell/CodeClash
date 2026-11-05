# Defuse the Bomb

You have a bomb to defuse, and your informer would like to provide you with a legendary circular list of `code` of length `n` and a key `k`.

To decrypt the code, you must replace every number. All the numbers are replaced simultaneously.
- If `k > 0`, replace the `i`-th number with the sum of the **next** `k` numbers.
- If `k < 0`, replace the `i`-th number with the sum of the **previous** `k` numbers.
- If `k == 0`, replace the `i`-th number with `0`.

As `code` is circular, the next element of `code[n-1]` is `code[0]`, and the previous element of `code[0]` is `code[n-1]`.

Given the circular list `code` and an integer key `k`, return the decrypted code to defuse the bomb!

### Examples

**Example 1:**
```
Input: code = [5, 7, 1, 4], k = 3
Output: 12 10 16 13
Explanation:
- [5] replaced by 7 + 1 + 4 = 12
- [7] replaced by 1 + 4 + 5 = 10
- [1] replaced by 4 + 5 + 7 = 16
- [4] replaced by 5 + 7 + 1 = 13
```

**Example 2:**
```
Input: code = [1, 2, 3, 4], k = 0
Output: 0 0 0 0
```

**Example 3:**
```
Input: code = [2, 4, 9, 3], k = -2
Output: 12 5 6 13
```

### Constraints

- `n == code.length`
- `1 <= n <= 100`
- `1 <= code[i] <= 100`
- `-(n - 1) <= k <= n - 1`
