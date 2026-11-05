# Take K of Each Character From Left and Right

You are given a string `s` consisting of the characters `'a'`, `'b'`, and `'c'` and a non-negative integer `k`. Each minute, you may take either the **leftmost** character of `s`, or the **rightmost** character of `s`.

You want to take **at least** `k` of each character.

Return the **minimum** number of minutes needed to take at least `k` of each character, or return `-1` if it is not possible to take `k` of each character.

### Examples

**Example 1:**
```
Input: s = "aabaaaacaabc", k = 2
Output: 8
Explanation:
- Take three characters from the left: "aab" (2 'a's, 1 'b')
- Take five characters from the right: "caabc" (3 'a's, 1 'b', 1 'c')
A total of 8 characters taken.
```

**Example 2:**
```
Input: s = "a", k = 1
Output: -1
Explanation: It is not possible to take 1 'b' or 1 'c'.
```

### Constraints

- `1 <= s.length <= 10^5`
- `s` consists of only the letters `'a'`, `'b'`, and `'c'`.
- `0 <= k <= s.length`
