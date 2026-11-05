# Find All Anagrams in a String

Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`. You may return the answer in **any order**.

An **anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

### Examples

**Example 1:**
```
Input: s = "cbaebabacd", p = "abc"
Output: 0 6
Explanation:
- The substring with start index = 0 is "cba", which is an anagram of "abc".
- The substring with start index = 6 is "bac", which is an anagram of "abc".
```

**Example 2:**
```
Input: s = "abab", p = "ab"
Output: 0 1 2
Explanation:
- Start index 0: "ab"
- Start index 1: "ba"
- Start index 2: "ab"
```

### Constraints

- `1 <= s.length, p.length <= 3 * 10^4`
- `s` and `p` consist of lowercase English letters.
