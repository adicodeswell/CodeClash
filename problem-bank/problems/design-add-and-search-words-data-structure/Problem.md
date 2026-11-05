# Design Add and Search Words Data Structure

Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the data structure supporting the following operations given by `operations` and `words`:
- `"addWord"`: Adds `word` to the data structure. Returns `"null"`.
- `"search"`: Returns `"true"` if there is any string in the data structure that matches `word` or `"false"` otherwise. A `word` may contain dots `'.'` where dots can be matched with any letter.

### Examples

**Example 1:**
```
Input:
operations = ["addWord", "addWord", "addWord", "search", "search", "search", "search"]
words = ["bad", "dad", "mad", "pad", "bad", ".ad", "b.."]
Output: null null null false true true true
```

### Constraints

- `1 <= operations.length <= 100`
- `operations.length == words.length`
- `1 <= words[i].length <= 25`
- `words[i]` in `addWord` consists of only lowercase English letters.
- `words[i]` in `search` consists of `'.'` or lowercase English letters.
- There will be at most `2` dots in `words[i]` for `search` queries.
