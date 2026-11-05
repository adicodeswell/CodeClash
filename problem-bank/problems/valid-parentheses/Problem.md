# Valid Parentheses

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

### Examples

**Example 1:**
```
Input: s = "()"
Output: 1
```

**Example 2:**
```
Input: s = "()[]{}"
Output: 1
```

**Example 3:**
```
Input: s = "(]"
Output: 0
```

### Constraints

- `1 <= s.length <= 10^4`
- `s` consists of parentheses only `'()[]{}'`.
