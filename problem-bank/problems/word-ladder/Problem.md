# Word Ladder

A **transformation sequence** from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:
- Every adjacent pair of words differs by exactly one letter.
- Every `si` for `1 <= i <= k` is in `wordList`. (Note that `beginWord` does not need to be in `wordList`).
- `sk == endWord`.

Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return the **number of words** in the **shortest transformation sequence** from `beginWord` to `endWord`, or `0` if no such sequence exists.

### Examples

**Example 1:**
```
Input:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
```

**Example 2:**
```
Input:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]
Output: 0
```

### Constraints

- `1 <= beginWord.length <= 10`
- `endWord.length == beginWord.length`
- `1 <= wordList.length <= 500`
- `wordList[i].length == beginWord.length`
- `beginWord`, `endWord`, and `wordList[i]` consist of lowercase English letters.
- `beginWord != endWord`
- All the words in `wordList` are **unique**.
