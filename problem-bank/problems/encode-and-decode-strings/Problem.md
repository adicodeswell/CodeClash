# Encode and Decode Strings

Design an algorithm to encode a list of strings to a single string and decode that string back to the original list of strings.

Implement the function:
```
encodeAndDecode(strs: list<String>) -> list<String>
```
which simulates the complete serialization and deserialization roundtrip, returning the reconstructed list of strings matching the input exactly.

### Examples

**Example 1:**
```
Input: strs = ["lint", "code", "love", "you"]
Output: ["lint", "code", "love", "you"]
Explanation: One possible encoding is "4#lint4#code4#love3#you". Decoding it returns ["lint","code","love","you"].
```

**Example 2:**
```
Input: strs = ["we", "say", ":", "yes"]
Output: ["we", "say", ":", "yes"]
```

### Constraints

- `1 <= strs.length <= 200`
- `1 <= strs[i].length <= 200`
- `strs[i]` consists of characters without whitespace (such as alphanumeric characters, colons, hashes, punctuation).
