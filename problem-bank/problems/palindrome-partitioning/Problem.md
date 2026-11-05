# Palindrome Partitioning

Given a string `s`, partition `s` such that every substring of the partition is a **palindrome**.

Return all possible palindrome partitionings of `s`.

You must return the list of partitions sorted in lexicographical order (comparing joined strings) to guarantee a unique, deterministic result.

### Examples

**Example 1:**
```
Input: s = "aab"
Output:
a a b
aa b
```

**Example 2:**
```
Input: s = "a"
Output:
a
```

### Constraints

- `1 <= s.length <= 12`
- `s` contains only lowercase English letters.
