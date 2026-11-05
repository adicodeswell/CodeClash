# Implement Trie (Prefix Tree)

A **trie** (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement a Trie data structure supporting the following operations given by `operations` and corresponding parameters `words`:
- `"insert"`: Inserts the string `word` into the trie. Returns `"null"`.
- `"search"`: Returns `"true"` if the string `word` is in the trie (i.e., was inserted before), and `"false"` otherwise.
- `"startsWith"`: Returns `"true"` if there is a previously inserted string `word` that has the prefix `prefix`, and `"false"` otherwise.

### Examples

**Example 1:**
```
Input:
operations = ["insert", "search", "search", "startsWith", "insert", "search"]
words = ["apple", "apple", "app", "app", "app", "app"]
Output: null true false true null true
```

### Constraints

- `1 <= operations.length <= 100`
- `operations.length == words.length`
- `1 <= words[i].length <= 20`
- `words[i]` consists only of lowercase English letters.
- At most `3 * 10^4` calls in total will be made to `insert`, `search`, and `startsWith`.
