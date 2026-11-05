# Find the K-Beauty of a Number

The **k-beauty** of an integer `num` is the number of **substrings** of `num` when read as a string of length `k` that meet the following conditions:
- It is a **divisor** of `num`.
- It is not `0`.

Return the k-beauty of `num`.

Leading zeros are allowed in substrings.

### Examples

**Example 1:**
```
Input: num = 240, k = 2
Output: 2
Explanation: Substrings of length 2:
- "24": 240 % 24 = 0 (divisor)
- "40": 240 % 40 = 0 (divisor)
```

**Example 2:**
```
Input: num = 430043, k = 2
Output: 2
Explanation: "43", "30", "00", "04", "43". Divisors are "43" and "43".
```

### Constraints

- `1 <= num <= 10^9`
- `1 <= k <= num.toString().length`
