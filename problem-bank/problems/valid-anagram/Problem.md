# Valid Anagram

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

### Examples

**Example 1:**
```
Input: s = "anagram", t = "nagaram"
Output: 1
Explanation: Both strings contain the exact same letters with matching counts.
```

**Example 2:**
```
Input: s = "rat", t = "car"
Output: 0
Explanation: "rat" and "car" have different characters.
```

### Constraints

- `1 <= s.length, t.length <= 5 * 10^4`
- `s` and `t` consist of lowercase English letters.
