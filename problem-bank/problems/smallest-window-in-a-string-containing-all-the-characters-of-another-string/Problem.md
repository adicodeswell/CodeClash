# Smallest Window in a String Containing All Characters of Another String

Given two strings `s` and `p`. Find the smallest window in string `s` consisting of all characters of string `p`. If no such window exists, return `"-1"`.

### Examples

**Example 1:**
```
Input: s = "timetopractice", p = "toc"
Output: toprac
Explanation: "toprac" is the smallest substring in "timetopractice" containing 't', 'o', and 'c'.
```

**Example 2:**
```
Input: s = "zoomlazapzo", p = "oza"
Output: apzo
Explanation: "apzo" is the smallest substring in which 'o', 'z' and 'a' are present.
```

### Constraints

- `1 <= s.length, p.length <= 10^5`
- `s` and `p` consist of lowercase English letters.
