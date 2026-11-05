# Find K-Length Substrings With No Repeated Characters

Given a string `s` and an integer `k`, return the number of substrings in `s` of length `k` with no repeated characters.

### Examples

**Example 1:**
```
Input: s = "havefunonleetcode", k = 5
Output: 6
Explanation: There are 6 substrings: "havef", "avefu", "vefun", "efuno", "etcod", "tcode".
```

**Example 2:**
```
Input: s = "home", k = 5
Output: 0
Explanation: k is larger than the length of s.
```

### Constraints

- `1 <= s.length <= 10^4`
- `s` consists of lowercase English letters.
- `1 <= k <= 10^4`
