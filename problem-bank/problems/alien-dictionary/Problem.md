# Alien Dictionary

There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you.

You are given a list of strings `words` from the alien language's dictionary, where the strings in `words` are **sorted lexicographically** by the rules of this new language.

Return a string of the unique letters in the new alien language sorted in **lexicographically increasing order** by the new language's rules. If multiple orders are valid, return any valid order.

### Examples

**Example 1:**
```
Input: words = ["wrt","wrf","er","ett","rftt"]
Output: wertf
```

**Example 2:**
```
Input: words = ["z","x"]
Output: zx
```

### Constraints

- `1 <= words.length <= 100`
- `1 <= words[i].length <= 100`
- `words[i]` consists of only lowercase English letters.
