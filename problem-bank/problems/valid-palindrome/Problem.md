# Valid Palindrome

A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

### Examples

**Example 1:**
```
Input: s = "A_man,_a_plan,_a_canal:_Panama"
Output: 1
Explanation: "amanaplanacanalpanama" is a palindrome.
```

**Example 2:**
```
Input: s = "race_a_car"
Output: 0
Explanation: "raceacar" is not a palindrome.
```

**Example 3:**
```
Input: s = "0P"
Output: 0
```

### Constraints

- `1 <= s.length <= 2 * 10^5`
- `s` consists only of printable ASCII characters with no internal whitespace.
