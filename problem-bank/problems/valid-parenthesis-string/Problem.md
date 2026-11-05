# Valid Parenthesis String

Given a string `s` containing only three types of characters: `'('`, `')'` and `'*'`, return `true` if `s` is **valid**.

The following rules define a **valid** string:
1. Any left parenthesis `'('` must have a corresponding right parenthesis `')'`.
2. Any right parenthesis `')'` must have a corresponding left parenthesis `'('`.
3. Left parenthesis `'('` must go before the corresponding right parenthesis `')'`.
4. `'*'` could be treated as a single right parenthesis `')'` or a single left parenthesis `'('` or an empty string `""`.

### Examples

**Example 1:**
```
Input: s = "()"
Output: 1
```

**Example 2:**
```
Input: s = "(*)"
Output: 1
```

**Example 3:**
```
Input: s = "(*))"
Output: 1
```

### Constraints

- `1 <= s.length <= 100`
- `s[i]` is `'('`, `')'`, or `'*'`.
