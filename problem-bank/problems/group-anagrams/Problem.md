# Group Anagrams

Given an array of strings `strs`, group the anagrams together.

To ensure deterministic evaluation across all languages:
1. Sort the strings within each anagram group in lexicographical order.
2. Sort all groups lexicographically by their first string in ascending order.

### Examples

**Example 1:**
```
Input: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
Output:
ate eat tea
bat
nat tan
```

**Example 2:**
```
Input: strs = ["a"]
Output:
a
```

### Constraints

- `1 <= strs.length <= 10^4`
- `1 <= strs[i].length <= 100`
- `strs[i]` consists of lowercase English letters without whitespace.
