# CodeClash Problem Bank & Specification Manifest

> **Official CodeClash Problem Bank Specification & Manifest**  
> Complete technical reference for all 253 canonical CodeClash problems categorized across 26 core algorithmic patterns, with exact slugs, difficulties, function names, parameter types, return types, and production-ready `Structure.md` definitions strictly adhering to CodeClash's `structure.js` engine.

---

## 📊 Summary & Category Breakdown

| # | Category / Pattern | Total | Easy | Medium | Hard | Problem Range |
|---|--------------------|:-----:|:----:|:------:|:----:|:-------------:|
| 1 | [Arrays and Hashing](#1-arrays-and-hashing) | 9 | 3 | 6 | 0 | #1 – #9 |
| 2 | [Two Pointers](#2-two-pointers) | 5 | 1 | 3 | 1 | #10 – #14 |
| 3 | [Sliding Window](#3-sliding-window) | 6 | 1 | 3 | 2 | #15 – #20 |
| 4 | [Stack](#4-stack) | 7 | 1 | 5 | 1 | #21 – #27 |
| 5 | [Binary Search](#5-binary-search) | 7 | 1 | 5 | 1 | #28 – #34 |
| 6 | [Linked List](#6-linked-list) | 11 | 3 | 6 | 2 | #35 – #45 |
| 7 | [Trees](#7-trees) | 15 | 6 | 7 | 2 | #46 – #60 |
| 8 | [Tries](#8-tries) | 3 | 0 | 2 | 1 | #61 – #63 |
| 9 | [Heap and Priority Queue](#9-heap-and-priority-queue) | 7 | 2 | 4 | 1 | #64 – #70 |
| 10 | [Backtracking](#10-backtracking) | 9 | 0 | 8 | 1 | #71 – #79 |
| 11 | [Graphs](#11-graphs) | 13 | 0 | 12 | 1 | #80 – #92 |
| 12 | [Advanced Graphs](#12-advanced-graphs) | 6 | 0 | 3 | 3 | #93 – #98 |
| 13 | [1-D Dynamic Programming](#13-1-d-dynamic-programming) | 12 | 2 | 10 | 0 | #99 – #110 |
| 14 | [2-D Dynamic Programming](#14-2-d-dynamic-programming) | 11 | 0 | 7 | 4 | #111 – #121 |
| 15 | [Greedy](#15-greedy) | 8 | 0 | 8 | 0 | #122 – #129 |
| 16 | [Intervals](#16-intervals) | 6 | 1 | 4 | 1 | #130 – #135 |
| 17 | [Math and Geometry](#17-math-and-geometry) | 8 | 2 | 6 | 0 | #136 – #143 |
| 18 | [Bit Manipulation](#18-bit-manipulation) | 7 | 5 | 2 | 0 | #144 – #150 |
| 19 | [Fixed-Size Sliding Window](#19-fixed-size-sliding-window) | 18 | 7 | 11 | 0 | #151 – #168 |
| 20 | [Variable-Size Sliding Window](#20-variable-size-sliding-window) | 16 | 0 | 14 | 2 | #169 – #184 |
| 21 | [Prefix Sum](#21-prefix-sum) | 8 | 1 | 7 | 0 | #185 – #192 |
| 22 | [Fast Two-Pointer and Array Patterns](#22-fast-two-pointer-and-array-patterns) | 9 | 1 | 6 | 2 | #193 – #201 |
| 23 | [Advanced Linked List](#23-advanced-linked-list) | 13 | 4 | 9 | 0 | #202 – #214 |
| 24 | [Advanced Stacks and Queues](#24-advanced-stacks-and-queues) | 21 | 6 | 14 | 1 | #215 – #235 |
| 25 | [Advanced Bitwise Operations](#25-advanced-bitwise-operations) | 6 | 1 | 5 | 0 | #236 – #241 |
| 26 | [Core Competitive Algorithms](#26-core-competitive-algorithms) | 12 | 5 | 5 | 2 | #242 – #253 |
| **Total** | **All 26 Categories** | **253** | **53** | **172** | **28** | **#1 – #253** |

---

## Supported CodeClash Types Reference
All types in the specifications below conform strictly to `problem-bank/scripts/structure.js`:
- **Primitives**: `int`, `long`, `double`, `bool`, `String`
- **1D Arrays**: `list<int>`, `list<long>`, `list<double>`, `list<bool>`, `list<String>`
- **2D Arrays / Matrices**: `list<list<int>>`, `list<list<long>>`, `list<list<double>>`, `list<list<bool>>`, `list<list<String>>`

---

## 1. Arrays and Hashing

### 1. Contains Duplicate
- **Slug**: `contains-duplicate`
- **Difficulty**: EASY
- **Topics**: Array, Hash Table
- **Function Name**: `containsDuplicate`
- **Parameters**: `nums: list<int>`
- **Return Type**: `bool`
- **Description**: Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.
```markdown
Problem Name: "Contains Duplicate"
Difficulty: EASY
Topics: Array, Hash Table
Function Name: containsDuplicate

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: bool result
```

### 2. Valid Anagram
- **Slug**: `valid-anagram`
- **Difficulty**: EASY
- **Topics**: Hash Table, String, Sorting
- **Function Name**: `isAnagram`
- **Parameters**: `s: String`, `t: String`
- **Return Type**: `bool`
- **Description**: Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.
```markdown
Problem Name: "Valid Anagram"
Difficulty: EASY
Topics: Hash Table, String, Sorting
Function Name: isAnagram

Input Structure:
Input Field: String s
Input Field: String t

Output Structure:
Output Field: bool result
```

### 3. Two Sum
- **Slug**: `two-sum`
- **Difficulty**: EASY
- **Topics**: Array, Hash Table
- **Function Name**: `twoSum`
- **Parameters**: `nums: list<int>`, `target: int`
- **Return Type**: `list<int>`
- **Description**: Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.
```markdown
Problem Name: "Two Sum"
Difficulty: EASY
Topics: Array, Hash Table
Function Name: twoSum

Input Structure:
Input Field: list<int> nums
Input Field: int target

Output Structure:
Output Field: list<int> result
```

### 4. Group Anagrams
- **Slug**: `group-anagrams`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, String, Sorting
- **Function Name**: `groupAnagrams`
- **Parameters**: `strs: list<String>`
- **Return Type**: `list<list<String>>`
- **Description**: Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.
```markdown
Problem Name: "Group Anagrams"
Difficulty: MEDIUM
Topics: Array, Hash Table, String, Sorting
Function Name: groupAnagrams

Input Structure:
Input Field: list<String> strs

Output Structure:
Output Field: list<list<String>> result
```

### 5. Top K Frequent Elements
- **Slug**: `top-k-frequent-elements`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Divide and Conquer, Sorting, Heap, Bucket Sort
- **Function Name**: `topKFrequent`
- **Parameters**: `nums: list<int>`, `k: int`
- **Return Type**: `list<int>`
- **Description**: Given an integer array `nums` and an integer `k`, return the `k` most frequent elements in any order.
```markdown
Problem Name: "Top K Frequent Elements"
Difficulty: MEDIUM
Topics: Array, Hash Table, Heap, Bucket Sort
Function Name: topKFrequent

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: list<int> result
```

### 6. Product of Array Except Self
- **Slug**: `product-of-array-except-self`
- **Difficulty**: MEDIUM
- **Topics**: Array, Prefix Sum
- **Function Name**: `productExceptSelf`
- **Parameters**: `nums: list<int>`
- **Return Type**: `list<int>`
- **Description**: Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all elements of `nums` except `nums[i]`, in O(n) time without division.
```markdown
Problem Name: "Product of Array Except Self"
Difficulty: MEDIUM
Topics: Array, Prefix Sum
Function Name: productExceptSelf

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: list<int> result
```

### 7. Valid Sudoku
- **Slug**: `valid-sudoku`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Matrix
- **Function Name**: `isValidSudoku`
- **Parameters**: `board: list<list<String>>`
- **Return Type**: `bool`
- **Description**: Determine if a 9 x 9 Sudoku board is valid. Only filled cells need to be validated according to standard rules.
```markdown
Problem Name: "Valid Sudoku"
Difficulty: MEDIUM
Topics: Array, Hash Table, Matrix
Function Name: isValidSudoku

Input Structure:
Input Field: list<list<String>> board

Output Structure:
Output Field: bool result
```

### 8. Encode and Decode Strings
- **Slug**: `encode-and-decode-strings`
- **Difficulty**: MEDIUM
- **Topics**: Array, String, Design
- **Function Name**: `encodeAndDecode`
- **Parameters**: `strs: list<String>`
- **Return Type**: `list<String>`
- **Description**: Design an algorithm to encode a list of strings to a single string and decode that string back to the original list of strings.
```markdown
Problem Name: "Encode and Decode Strings"
Difficulty: MEDIUM
Topics: Array, String, Design
Function Name: encodeAndDecode

Input Structure:
Input Field: list<String> strs

Output Structure:
Output Field: list<String> result
```

### 9. Longest Consecutive Sequence
- **Slug**: `longest-consecutive-sequence`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Union Find
- **Function Name**: `longestConsecutive`
- **Parameters**: `nums: list<int>`
- **Return Type**: `int`
- **Description**: Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence in O(n) time.
```markdown
Problem Name: "Longest Consecutive Sequence"
Difficulty: MEDIUM
Topics: Array, Hash Table, Union Find
Function Name: longestConsecutive

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
```


## 2. Two Pointers

### 10. Valid Palindrome
- **Slug**: `valid-palindrome`
- **Difficulty**: EASY
- **Topics**: Two Pointers, String
- **Function Name**: `isPalindrome`
- **Parameters**: `s: String`
- **Return Type**: `bool`
- **Description**: A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.
```markdown
Problem Name: "Valid Palindrome"
Difficulty: EASY
Topics: Two Pointers, String
Function Name: isPalindrome

Input Structure:
Input Field: String s

Output Structure:
Output Field: bool result
```

### 11. Two Sum II - Input Array Is Sorted
- **Slug**: `two-sum-ii-input-array-is-sorted`
- **Difficulty**: MEDIUM
- **Topics**: Array, Two Pointers, Binary Search
- **Function Name**: `twoSum`
- **Parameters**: `numbers: list<int>`, `target: int`
- **Return Type**: `list<int>`
- **Description**: Given a 1-indexed sorted integer array `numbers`, find two numbers that sum up to `target` and return their 1-based indices `[index1, index2]`.
```markdown
Problem Name: "Two Sum II - Input Array Is Sorted"
Difficulty: MEDIUM
Topics: Array, Two Pointers, Binary Search
Function Name: twoSum

Input Structure:
Input Field: list<int> numbers
Input Field: int target

Output Structure:
Output Field: list<int> result
```

### 12. 3Sum
- **Slug**: `3sum`
- **Difficulty**: MEDIUM
- **Topics**: Array, Two Pointers, Sorting
- **Function Name**: `threeSum`
- **Parameters**: `nums: list<int>`
- **Return Type**: `list<list<int>>`
- **Description**: Given an integer array `nums`, return all unique triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.
```markdown
Problem Name: "3Sum"
Difficulty: MEDIUM
Topics: Array, Two Pointers, Sorting
Function Name: threeSum

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: list<list<int>> result
```

### 13. Container With Most Water
- **Slug**: `container-with-most-water`
- **Difficulty**: MEDIUM
- **Topics**: Array, Two Pointers, Greedy
- **Function Name**: `maxArea`
- **Parameters**: `height: list<int>`
- **Return Type**: `int`
- **Description**: Given an integer array `height` representing vertical lines, find two lines that together with the x-axis form a container containing the maximum water.
```markdown
Problem Name: "Container With Most Water"
Difficulty: MEDIUM
Topics: Array, Two Pointers, Greedy
Function Name: maxArea

Input Structure:
Input Field: list<int> height

Output Structure:
Output Field: int result
```

### 14. Trapping Rain Water
- **Slug**: `trapping-rain-water`
- **Difficulty**: HARD
- **Topics**: Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack
- **Function Name**: `trap`
- **Parameters**: `height: list<int>`
- **Return Type**: `int`
- **Description**: Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
```markdown
Problem Name: "Trapping Rain Water"
Difficulty: HARD
Topics: Array, Two Pointers, Stack
Function Name: trap

Input Structure:
Input Field: list<int> height

Output Structure:
Output Field: int result
```


## 3. Sliding Window

### 15. Best Time to Buy and Sell Stock
- **Slug**: `best-time-to-buy-and-sell-stock`
- **Difficulty**: EASY
- **Topics**: Array, Dynamic Programming
- **Function Name**: `maxProfit`
- **Parameters**: `prices: list<int>`
- **Return Type**: `int`
- **Description**: You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit.
```markdown
Problem Name: "Best Time to Buy and Sell Stock"
Difficulty: EASY
Topics: Array, Dynamic Programming
Function Name: maxProfit

Input Structure:
Input Field: list<int> prices

Output Structure:
Output Field: int result
```

### 16. Longest Substring Without Repeating Characters
- **Slug**: `longest-substring-without-repeating-characters`
- **Difficulty**: MEDIUM
- **Topics**: Hash Table, String, Sliding Window
- **Function Name**: `lengthOfLongestSubstring`
- **Parameters**: `s: String`
- **Return Type**: `int`
- **Description**: Given a string `s`, find the length of the longest substring without repeating characters.
```markdown
Problem Name: "Longest Substring Without Repeating Characters"
Difficulty: MEDIUM
Topics: Hash Table, String, Sliding Window
Function Name: lengthOfLongestSubstring

Input Structure:
Input Field: String s

Output Structure:
Output Field: int result
```

### 17. Longest Repeating Character Replacement
- **Slug**: `longest-repeating-character-replacement`
- **Difficulty**: MEDIUM
- **Topics**: Hash Table, String, Sliding Window
- **Function Name**: `characterReplacement`
- **Parameters**: `s: String`, `k: int`
- **Return Type**: `int`
- **Description**: You can choose any character of string `s` and change it to any uppercase English letter at most `k` times. Return the length of the longest substring containing the same letter.
```markdown
Problem Name: "Longest Repeating Character Replacement"
Difficulty: MEDIUM
Topics: Hash Table, String, Sliding Window
Function Name: characterReplacement

Input Structure:
Input Field: String s
Input Field: int k

Output Structure:
Output Field: int result
```

### 18. Permutation in String
- **Slug**: `permutation-in-string`
- **Difficulty**: MEDIUM
- **Topics**: Hash Table, Two Pointers, String, Sliding Window
- **Function Name**: `checkInclusion`
- **Parameters**: `s1: String`, `s2: String`
- **Return Type**: `bool`
- **Description**: Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`, or `false` otherwise.
```markdown
Problem Name: "Permutation in String"
Difficulty: MEDIUM
Topics: Hash Table, Two Pointers, String, Sliding Window
Function Name: checkInclusion

Input Structure:
Input Field: String s1
Input Field: String s2

Output Structure:
Output Field: bool result
```

### 19. Minimum Window Substring
- **Slug**: `minimum-window-substring`
- **Difficulty**: HARD
- **Topics**: Hash Table, String, Sliding Window
- **Function Name**: `minWindow`
- **Parameters**: `s: String`, `t: String`
- **Return Type**: `String`
- **Description**: Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window.
```markdown
Problem Name: "Minimum Window Substring"
Difficulty: HARD
Topics: Hash Table, String, Sliding Window
Function Name: minWindow

Input Structure:
Input Field: String s
Input Field: String t

Output Structure:
Output Field: String result
```

### 20. Sliding Window Maximum
- **Slug**: `sliding-window-maximum`
- **Difficulty**: HARD
- **Topics**: Array, Queue, Sliding Window, Heap, Monotonic Queue
- **Function Name**: `maxSlidingWindow`
- **Parameters**: `nums: list<int>`, `k: int`
- **Return Type**: `list<int>`
- **Description**: You are given an array of integers `nums` and a sliding window of size `k` moving from left to right. Return the max sliding window.
```markdown
Problem Name: "Sliding Window Maximum"
Difficulty: HARD
Topics: Array, Queue, Sliding Window, Monotonic Queue
Function Name: maxSlidingWindow

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: list<int> result
```


## 4. Stack

### 21. Valid Parentheses
- **Slug**: `valid-parentheses`
- **Difficulty**: EASY
- **Topics**: String, Stack
- **Function Name**: `isValid`
- **Parameters**: `s: String`
- **Return Type**: `bool`
- **Description**: Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.
```markdown
Problem Name: "Valid Parentheses"
Difficulty: EASY
Topics: String, Stack
Function Name: isValid

Input Structure:
Input Field: String s

Output Structure:
Output Field: bool result
```

### 22. Min Stack
- **Slug**: `min-stack`
- **Difficulty**: MEDIUM
- **Topics**: Stack, Design
- **Function Name**: `minStackOperations`
- **Parameters**: `operations: list<String>`, `values: list<list<int>>`
- **Return Type**: `list<String>`
- **Description**: Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum element in constant time.
```markdown
Problem Name: "Min Stack"
Difficulty: MEDIUM
Topics: Stack, Design
Function Name: minStackOperations

Input Structure:
Input Field: list<String> operations
Input Field: list<list<int>> values

Output Structure:
Output Field: list<String> result
```

### 23. Evaluate Reverse Polish Notation
- **Slug**: `evaluate-reverse-polish-notation`
- **Difficulty**: MEDIUM
- **Topics**: Array, Math, Stack
- **Function Name**: `evalRPN`
- **Parameters**: `tokens: list<String>`
- **Return Type**: `int`
- **Description**: Evaluate the value of an arithmetic expression in Reverse Polish Notation. Valid operators are `+`, `-`, `*`, and `/`.
```markdown
Problem Name: "Evaluate Reverse Polish Notation"
Difficulty: MEDIUM
Topics: Array, Math, Stack
Function Name: evalRPN

Input Structure:
Input Field: list<String> tokens

Output Structure:
Output Field: int result
```

### 24. Generate Parentheses
- **Slug**: `generate-parentheses`
- **Difficulty**: MEDIUM
- **Topics**: String, Dynamic Programming, Backtracking
- **Function Name**: `generateParenthesis`
- **Parameters**: `n: int`
- **Return Type**: `list<String>`
- **Description**: Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
```markdown
Problem Name: "Generate Parentheses"
Difficulty: MEDIUM
Topics: String, Dynamic Programming, Backtracking
Function Name: generateParenthesis

Input Structure:
Input Field: int n

Output Structure:
Output Field: list<String> result
```

### 25. Daily Temperatures
- **Slug**: `daily-temperatures`
- **Difficulty**: MEDIUM
- **Topics**: Array, Stack, Monotonic Stack
- **Function Name**: `dailyTemperatures`
- **Parameters**: `temperatures: list<int>`
- **Return Type**: `list<int>`
- **Description**: Given an array of integers `temperatures`, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`-th day to get a warmer temperature.
```markdown
Problem Name: "Daily Temperatures"
Difficulty: MEDIUM
Topics: Array, Stack, Monotonic Stack
Function Name: dailyTemperatures

Input Structure:
Input Field: list<int> temperatures

Output Structure:
Output Field: list<int> result
```

### 26. Car Fleet
- **Slug**: `car-fleet`
- **Difficulty**: MEDIUM
- **Topics**: Array, Stack, Sorting, Monotonic Stack
- **Function Name**: `carFleet`
- **Parameters**: `target: int`, `position: list<int>`, `speed: list<int>`
- **Return Type**: `int`
- **Description**: `n` cars are heading towards destination `target` along a one-lane road. Return the number of car fleets that will arrive at the destination.
```markdown
Problem Name: "Car Fleet"
Difficulty: MEDIUM
Topics: Array, Stack, Sorting
Function Name: carFleet

Input Structure:
Input Field: int target
Input Field: list<int> position
Input Field: list<int> speed

Output Structure:
Output Field: int result
```

### 27. Largest Rectangle in Histogram
- **Slug**: `largest-rectangle-in-histogram`
- **Difficulty**: HARD
- **Topics**: Array, Stack, Monotonic Stack
- **Function Name**: `largestRectangleArea`
- **Parameters**: `heights: list<int>`
- **Return Type**: `int`
- **Description**: Given an array of integers `heights` representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.
```markdown
Problem Name: "Largest Rectangle in Histogram"
Difficulty: HARD
Topics: Array, Stack, Monotonic Stack
Function Name: largestRectangleArea

Input Structure:
Input Field: list<int> heights

Output Structure:
Output Field: int result
```


## 5. Binary Search

### 28. Binary Search
- **Slug**: `binary-search`
- **Difficulty**: EASY
- **Topics**: Array, Binary Search
- **Function Name**: `search`
- **Parameters**: `nums: list<int>`, `target: int`
- **Return Type**: `int`
- **Description**: Given an array of integers `nums` sorted in ascending order, and an integer `target`, search `target` in `nums`. If `target` exists, return its index; otherwise, return `-1`.
```markdown
Problem Name: "Binary Search"
Difficulty: EASY
Topics: Array, Binary Search
Function Name: search

Input Structure:
Input Field: list<int> nums
Input Field: int target

Output Structure:
Output Field: int result
```

### 29. Search a 2D Matrix
- **Slug**: `search-a-2d-matrix`
- **Difficulty**: MEDIUM
- **Topics**: Array, Binary Search, Matrix
- **Function Name**: `searchMatrix`
- **Parameters**: `matrix: list<list<int>>`, `target: int`
- **Return Type**: `bool`
- **Description**: Write an efficient algorithm that searches for a value `target` in an `m x n` integer matrix where each row is sorted and first integer of each row is greater than last of previous.
```markdown
Problem Name: "Search a 2D Matrix"
Difficulty: MEDIUM
Topics: Array, Binary Search, Matrix
Function Name: searchMatrix

Input Structure:
Input Field: list<list<int>> matrix
Input Field: int target

Output Structure:
Output Field: bool result
```

### 30. Koko Eating Bananas
- **Slug**: `koko-eating-bananas`
- **Difficulty**: MEDIUM
- **Topics**: Array, Binary Search
- **Function Name**: `minEatingSpeed`
- **Parameters**: `piles: list<int>`, `h: int`
- **Return Type**: `int`
- **Description**: Koko loves to eat bananas. Return the minimum integer speed `k` such that she can eat all the bananas within `h` hours.
```markdown
Problem Name: "Koko Eating Bananas"
Difficulty: MEDIUM
Topics: Array, Binary Search
Function Name: minEatingSpeed

Input Structure:
Input Field: list<int> piles
Input Field: int h

Output Structure:
Output Field: int result
```

### 31. Find Minimum in Rotated Sorted Array
- **Slug**: `find-minimum-in-rotated-sorted-array`
- **Difficulty**: MEDIUM
- **Topics**: Array, Binary Search
- **Function Name**: `findMin`
- **Parameters**: `nums: list<int>`
- **Return Type**: `int`
- **Description**: Given the sorted rotated array `nums` of unique elements, return the minimum element of this array in O(log n) time.
```markdown
Problem Name: "Find Minimum in Rotated Sorted Array"
Difficulty: MEDIUM
Topics: Array, Binary Search
Function Name: findMin

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
```

### 32. Search in Rotated Sorted Array
- **Slug**: `search-in-rotated-sorted-array`
- **Difficulty**: MEDIUM
- **Topics**: Array, Binary Search
- **Function Name**: `search`
- **Parameters**: `nums: list<int>`, `target: int`
- **Return Type**: `int`
- **Description**: Given the array `nums` after possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.
```markdown
Problem Name: "Search in Rotated Sorted Array"
Difficulty: MEDIUM
Topics: Array, Binary Search
Function Name: search

Input Structure:
Input Field: list<int> nums
Input Field: int target

Output Structure:
Output Field: int result
```

### 33. Time Based Key-Value Store
- **Slug**: `time-based-key-value-store`
- **Difficulty**: MEDIUM
- **Topics**: Hash Table, String, Binary Search, Design
- **Function Name**: `timeMapOperations`
- **Parameters**: `operations: list<String>`, `keys: list<String>`, `values: list<String>`, `timestamps: list<int>`
- **Return Type**: `list<String>`
- **Description**: Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.
```markdown
Problem Name: "Time Based Key-Value Store"
Difficulty: MEDIUM
Topics: Hash Table, String, Binary Search, Design
Function Name: timeMapOperations

Input Structure:
Input Field: list<String> operations
Input Field: list<String> keys
Input Field: list<String> values
Input Field: list<int> timestamps

Output Structure:
Output Field: list<String> result
```

### 34. Median of Two Sorted Arrays
- **Slug**: `median-of-two-sorted-arrays`
- **Difficulty**: HARD
- **Topics**: Array, Binary Search, Divide and Conquer
- **Function Name**: `findMedianSortedArrays`
- **Parameters**: `nums1: list<int>`, `nums2: list<int>`
- **Return Type**: `double`
- **Description**: Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays in O(log(m+n)) runtime.
```markdown
Problem Name: "Median of Two Sorted Arrays"
Difficulty: HARD
Topics: Array, Binary Search, Divide and Conquer
Function Name: findMedianSortedArrays

Input Structure:
Input Field: list<int> nums1
Input Field: list<int> nums2

Output Structure:
Output Field: double result
```


## 6. Linked List

### 35. Reverse Linked List
- **Slug**: `reverse-linked-list`
- **Difficulty**: EASY
- **Topics**: Linked List, Recursion
- **Function Name**: `reverseList`
- **Parameters**: `head: list<int>`
- **Return Type**: `list<int>`
- **Description**: Given the head of a singly linked list, reverse the list, and return the reversed list.
```markdown
Problem Name: "Reverse Linked List"
Difficulty: EASY
Topics: Linked List, Recursion
Function Name: reverseList

Input Structure:
Input Field: list<int> head

Output Structure:
Output Field: list<int> result
```

### 36. Merge Two Sorted Lists
- **Slug**: `merge-two-sorted-lists`
- **Difficulty**: EASY
- **Topics**: Linked List, Recursion
- **Function Name**: `mergeTwoLists`
- **Parameters**: `list1: list<int>`, `list2: list<int>`
- **Return Type**: `list<int>`
- **Description**: You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list and return its head.
```markdown
Problem Name: "Merge Two Sorted Lists"
Difficulty: EASY
Topics: Linked List, Recursion
Function Name: mergeTwoLists

Input Structure:
Input Field: list<int> list1
Input Field: list<int> list2

Output Structure:
Output Field: list<int> result
```

### 37. Reorder List
- **Slug**: `reorder-list`
- **Difficulty**: MEDIUM
- **Topics**: Linked List, Two Pointers, Stack
- **Function Name**: `reorderList`
- **Parameters**: `head: list<int>`
- **Return Type**: `list<int>`
- **Description**: Reorder the linked list to be: `L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …`.
```markdown
Problem Name: "Reorder List"
Difficulty: MEDIUM
Topics: Linked List, Two Pointers
Function Name: reorderList

Input Structure:
Input Field: list<int> head

Output Structure:
Output Field: list<int> result
```

### 38. Remove Nth Node From End of List
- **Slug**: `remove-nth-node-from-end-of-list`
- **Difficulty**: MEDIUM
- **Topics**: Linked List, Two Pointers
- **Function Name**: `removeNthFromEnd`
- **Parameters**: `head: list<int>`, `n: int`
- **Return Type**: `list<int>`
- **Description**: Given the head of a linked list, remove the `n`-th node from the end of the list and return its head.
```markdown
Problem Name: "Remove Nth Node From End of List"
Difficulty: MEDIUM
Topics: Linked List, Two Pointers
Function Name: removeNthFromEnd

Input Structure:
Input Field: list<int> head
Input Field: int n

Output Structure:
Output Field: list<int> result
```

### 39. Copy List with Random Pointer
- **Slug**: `copy-list-with-random-pointer`
- **Difficulty**: MEDIUM
- **Topics**: Hash Table, Linked List
- **Function Name**: `copyRandomList`
- **Parameters**: `nodes: list<list<int>>`
- **Return Type**: `list<list<int>>`
- **Description**: Construct a deep copy of a linked list of length `n`, where each node contains an additional `random` pointer.
```markdown
Problem Name: "Copy List with Random Pointer"
Difficulty: MEDIUM
Topics: Hash Table, Linked List
Function Name: copyRandomList

Input Structure:
Input Field: list<list<int>> nodes

Output Structure:
Output Field: list<list<int>> result
```

### 40. Add Two Numbers
- **Slug**: `add-two-numbers`
- **Difficulty**: MEDIUM
- **Topics**: Linked List, Math, Recursion
- **Function Name**: `addTwoNumbers`
- **Parameters**: `l1: list<int>`, `l2: list<int>`
- **Return Type**: `list<int>`
- **Description**: You are given two non-empty linked lists representing two non-negative integers stored in reverse order. Add the two numbers and return the sum as a linked list.
```markdown
Problem Name: "Add Two Numbers"
Difficulty: MEDIUM
Topics: Linked List, Math
Function Name: addTwoNumbers

Input Structure:
Input Field: list<int> l1
Input Field: list<int> l2

Output Structure:
Output Field: list<int> result
```

### 41. Linked List Cycle
- **Slug**: `linked-list-cycle`
- **Difficulty**: EASY
- **Topics**: Hash Table, Linked List, Two Pointers
- **Function Name**: `hasCycle`
- **Parameters**: `head: list<int>`, `pos: int`
- **Return Type**: `bool`
- **Description**: Given `head`, the head of a linked list, determine if the linked list has a cycle in it.
```markdown
Problem Name: "Linked List Cycle"
Difficulty: EASY
Topics: Hash Table, Linked List, Two Pointers
Function Name: hasCycle

Input Structure:
Input Field: list<int> head
Input Field: int pos

Output Structure:
Output Field: bool result
```

### 42. Find the Duplicate Number
- **Slug**: `find-the-duplicate-number`
- **Difficulty**: MEDIUM
- **Topics**: Array, Two Pointers, Binary Search, Bit Manipulation
- **Function Name**: `findDuplicate`
- **Parameters**: `nums: list<int>`
- **Return Type**: `int`
- **Description**: Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]`, find the repeated number without modifying `nums` in O(1) extra space.
```markdown
Problem Name: "Find the Duplicate Number"
Difficulty: MEDIUM
Topics: Array, Two Pointers, Binary Search
Function Name: findDuplicate

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
```

### 43. LRU Cache
- **Slug**: `lru-cache`
- **Difficulty**: MEDIUM
- **Topics**: Hash Table, Linked List, Design, Doubly-Linked List
- **Function Name**: `lruCacheOperations`
- **Parameters**: `capacity: int`, `operations: list<String>`, `values: list<list<int>>`
- **Return Type**: `list<String>`
- **Description**: Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) `get` and `put`.
```markdown
Problem Name: "LRU Cache"
Difficulty: MEDIUM
Topics: Hash Table, Linked List, Design
Function Name: lruCacheOperations

Input Structure:
Input Field: int capacity
Input Field: list<String> operations
Input Field: list<list<int>> values

Output Structure:
Output Field: list<String> result
```

### 44. Merge k Sorted Lists
- **Slug**: `merge-k-sorted-lists`
- **Difficulty**: HARD
- **Topics**: Linked List, Divide and Conquer, Heap
- **Function Name**: `mergeKLists`
- **Parameters**: `lists: list<list<int>>`
- **Return Type**: `list<int>`
- **Description**: You are given an array of `k` linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.
```markdown
Problem Name: "Merge k Sorted Lists"
Difficulty: HARD
Topics: Linked List, Divide and Conquer, Heap
Function Name: mergeKLists

Input Structure:
Input Field: list<list<int>> lists

Output Structure:
Output Field: list<int> result
```

### 45. Reverse Nodes in k-Group
- **Slug**: `reverse-nodes-in-k-group`
- **Difficulty**: HARD
- **Topics**: Linked List, Recursion
- **Function Name**: `reverseKGroup`
- **Parameters**: `head: list<int>`, `k: int`
- **Return Type**: `list<int>`
- **Description**: Given the `head` of a linked list, reverse the nodes of the list `k` at a time, and return the modified list.
```markdown
Problem Name: "Reverse Nodes in k-Group"
Difficulty: HARD
Topics: Linked List, Recursion
Function Name: reverseKGroup

Input Structure:
Input Field: list<int> head
Input Field: int k

Output Structure:
Output Field: list<int> result
```


## 7. Trees

### 46. Invert Binary Tree
- **Slug**: `invert-binary-tree`
- **Difficulty**: EASY
- **Topics**: Tree, Depth-First Search, Breadth-First Search, Binary Tree
- **Function Name**: `invertTree`
- **Parameters**: `root: list<String>`
- **Return Type**: `list<String>`
- **Description**: Given the root of a binary tree, invert the tree, and return its root (serialized as level-order array).
```markdown
Problem Name: "Invert Binary Tree"
Difficulty: EASY
Topics: Tree, Binary Tree
Function Name: invertTree

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: list<String> result
```

### 47. Maximum Depth of Binary Tree
- **Slug**: `maximum-depth-of-binary-tree`
- **Difficulty**: EASY
- **Topics**: Tree, Depth-First Search, Breadth-First Search, Binary Tree
- **Function Name**: `maxDepth`
- **Parameters**: `root: list<String>`
- **Return Type**: `int`
- **Description**: Given the root of a binary tree, return its maximum depth (number of nodes along longest path from root down to furthest leaf node).
```markdown
Problem Name: "Maximum Depth of Binary Tree"
Difficulty: EASY
Topics: Tree, Binary Tree
Function Name: maxDepth

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: int result
```

### 48. Diameter of Binary Tree
- **Slug**: `diameter-of-binary-tree`
- **Difficulty**: EASY
- **Topics**: Tree, Depth-First Search, Binary Tree
- **Function Name**: `diameterOfBinaryTree`
- **Parameters**: `root: list<String>`
- **Return Type**: `int`
- **Description**: Return the length of the diameter of the tree (length of the longest path between any two nodes in a tree).
```markdown
Problem Name: "Diameter of Binary Tree"
Difficulty: EASY
Topics: Tree, Binary Tree
Function Name: diameterOfBinaryTree

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: int result
```

### 49. Balanced Binary Tree
- **Slug**: `balanced-binary-tree`
- **Difficulty**: EASY
- **Topics**: Tree, Depth-First Search, Binary Tree
- **Function Name**: `isBalanced`
- **Parameters**: `root: list<String>`
- **Return Type**: `bool`
- **Description**: Given a binary tree, determine if it is height-balanced (depth of the two subtrees of every node never differs by more than one).
```markdown
Problem Name: "Balanced Binary Tree"
Difficulty: EASY
Topics: Tree, Binary Tree
Function Name: isBalanced

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: bool result
```

### 50. Same Tree
- **Slug**: `same-tree`
- **Difficulty**: EASY
- **Topics**: Tree, Depth-First Search, Breadth-First Search, Binary Tree
- **Function Name**: `isSameTree`
- **Parameters**: `p: list<String>`, `q: list<String>`
- **Return Type**: `bool`
- **Description**: Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.
```markdown
Problem Name: "Same Tree"
Difficulty: EASY
Topics: Tree, Binary Tree
Function Name: isSameTree

Input Structure:
Input Field: list<String> p
Input Field: list<String> q

Output Structure:
Output Field: bool result
```

### 51. Subtree of Another Tree
- **Slug**: `subtree-of-another-tree`
- **Difficulty**: EASY
- **Topics**: Tree, Depth-First Search, Binary Tree, String Matching, Hash Function
- **Function Name**: `isSubtree`
- **Parameters**: `root: list<String>`, `subRoot: list<String>`
- **Return Type**: `bool`
- **Description**: Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values of `subRoot`.
```markdown
Problem Name: "Subtree of Another Tree"
Difficulty: EASY
Topics: Tree, Binary Tree
Function Name: isSubtree

Input Structure:
Input Field: list<String> root
Input Field: list<String> subRoot

Output Structure:
Output Field: bool result
```

### 52. Lowest Common Ancestor of a Binary Search Tree
- **Slug**: `lowest-common-ancestor-of-a-binary-search-tree`
- **Difficulty**: MEDIUM
- **Topics**: Tree, Depth-First Search, Binary Search Tree, Binary Tree
- **Function Name**: `lowestCommonAncestor`
- **Parameters**: `root: list<String>`, `p: int`, `q: int`
- **Return Type**: `int`
- **Description**: Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.
```markdown
Problem Name: "Lowest Common Ancestor of a Binary Search Tree"
Difficulty: MEDIUM
Topics: Tree, Binary Search Tree, Binary Tree
Function Name: lowestCommonAncestor

Input Structure:
Input Field: list<String> root
Input Field: int p
Input Field: int q

Output Structure:
Output Field: int result
```

### 53. Binary Tree Level Order Traversal
- **Slug**: `binary-tree-level-order-traversal`
- **Difficulty**: MEDIUM
- **Topics**: Tree, Breadth-First Search, Binary Tree
- **Function Name**: `levelOrder`
- **Parameters**: `root: list<String>`
- **Return Type**: `list<list<int>>`
- **Description**: Given the root of a binary tree, return the level order traversal of its nodes' values (from left to right, level by level).
```markdown
Problem Name: "Binary Tree Level Order Traversal"
Difficulty: MEDIUM
Topics: Tree, Breadth-First Search, Binary Tree
Function Name: levelOrder

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: list<list<int>> result
```

### 54. Binary Tree Right Side View
- **Slug**: `binary-tree-right-side-view`
- **Difficulty**: MEDIUM
- **Topics**: Tree, Depth-First Search, Breadth-First Search, Binary Tree
- **Function Name**: `rightSideView`
- **Parameters**: `root: list<String>`
- **Return Type**: `list<int>`
- **Description**: Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.
```markdown
Problem Name: "Binary Tree Right Side View"
Difficulty: MEDIUM
Topics: Tree, Breadth-First Search, Binary Tree
Function Name: rightSideView

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: list<int> result
```

### 55. Count Good Nodes in Binary Tree
- **Slug**: `count-good-nodes-in-binary-tree`
- **Difficulty**: MEDIUM
- **Topics**: Tree, Depth-First Search, Breadth-First Search, Binary Tree
- **Function Name**: `goodNodes`
- **Parameters**: `root: list<String>`
- **Return Type**: `int`
- **Description**: Given a binary tree `root`, a node `X` in the tree is named good if in the path from the root to `X` there are no nodes with a value greater than `X`. Return the number of good nodes.
```markdown
Problem Name: "Count Good Nodes in Binary Tree"
Difficulty: MEDIUM
Topics: Tree, Depth-First Search, Binary Tree
Function Name: goodNodes

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: int result
```

### 56. Validate Binary Search Tree
- **Slug**: `validate-binary-search-tree`
- **Difficulty**: MEDIUM
- **Topics**: Tree, Depth-First Search, Binary Search Tree, Binary Tree
- **Function Name**: `isValidBST`
- **Parameters**: `root: list<String>`
- **Return Type**: `bool`
- **Description**: Given the root of a binary tree, determine if it is a valid binary search tree (BST).
```markdown
Problem Name: "Validate Binary Search Tree"
Difficulty: MEDIUM
Topics: Tree, Binary Search Tree, Binary Tree
Function Name: isValidBST

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: bool result
```

### 57. Kth Smallest Element in a BST
- **Slug**: `kth-smallest-element-in-a-bst`
- **Difficulty**: MEDIUM
- **Topics**: Tree, Depth-First Search, Binary Search Tree, Binary Tree
- **Function Name**: `kthSmallest`
- **Parameters**: `root: list<String>`, `k: int`
- **Return Type**: `int`
- **Description**: Given the root of a binary search tree and an integer `k`, return the `k`-th smallest value (1-indexed) of all the values of the nodes in the tree.
```markdown
Problem Name: "Kth Smallest Element in a BST"
Difficulty: MEDIUM
Topics: Tree, Binary Search Tree, Binary Tree
Function Name: kthSmallest

Input Structure:
Input Field: list<String> root
Input Field: int k

Output Structure:
Output Field: int result
```

### 58. Construct Binary Tree from Preorder and Inorder Traversal
- **Slug**: `construct-binary-tree-from-preorder-and-inorder-traversal`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Divide and Conquer, Tree, Binary Tree
- **Function Name**: `buildTree`
- **Parameters**: `preorder: list<int>`, `inorder: list<int>`
- **Return Type**: `list<String>`
- **Description**: Given two integer arrays `preorder` and `inorder`, construct and return the binary tree (serialized in level-order).
```markdown
Problem Name: "Construct Binary Tree from Preorder and Inorder Traversal"
Difficulty: MEDIUM
Topics: Array, Tree, Binary Tree
Function Name: buildTree

Input Structure:
Input Field: list<int> preorder
Input Field: list<int> inorder

Output Structure:
Output Field: list<String> result
```

### 59. Binary Tree Maximum Path Sum
- **Slug**: `binary-tree-maximum-path-sum`
- **Difficulty**: HARD
- **Topics**: Dynamic Programming, Tree, Depth-First Search, Binary Tree
- **Function Name**: `maxPathSum`
- **Parameters**: `root: list<String>`
- **Return Type**: `int`
- **Description**: A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge. Return the maximum path sum of any non-empty path.
```markdown
Problem Name: "Binary Tree Maximum Path Sum"
Difficulty: HARD
Topics: Tree, Depth-First Search, Dynamic Programming
Function Name: maxPathSum

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: int result
```

### 60. Serialize and Deserialize Binary Tree
- **Slug**: `serialize-and-deserialize-binary-tree`
- **Difficulty**: HARD
- **Topics**: String, Tree, Depth-First Search, Breadth-First Search, Design, Binary Tree
- **Function Name**: `serializeAndDeserialize`
- **Parameters**: `root: list<String>`
- **Return Type**: `list<String>`
- **Description**: Design an algorithm to serialize and deserialize a binary tree.
```markdown
Problem Name: "Serialize and Deserialize Binary Tree"
Difficulty: HARD
Topics: Tree, Design, Binary Tree
Function Name: serializeAndDeserialize

Input Structure:
Input Field: list<String> root

Output Structure:
Output Field: list<String> result
```


## 8. Tries

### 61. Implement Trie (Prefix Tree)
- **Slug**: `implement-trie-prefix-tree`
- **Difficulty**: MEDIUM
- **Topics**: Hash Table, String, Design, Trie
- **Function Name**: `trieOperations`
- **Parameters**: `operations: list<String>`, `words: list<String>`
- **Return Type**: `list<String>`
- **Description**: A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement `insert`, `search`, and `startsWith`.
```markdown
Problem Name: "Implement Trie (Prefix Tree)"
Difficulty: MEDIUM
Topics: Hash Table, String, Design, Trie
Function Name: trieOperations

Input Structure:
Input Field: list<String> operations
Input Field: list<String> words

Output Structure:
Output Field: list<String> result
```

### 62. Design Add and Search Words Data Structure
- **Slug**: `design-add-and-search-words-data-structure`
- **Difficulty**: MEDIUM
- **Topics**: String, Depth-First Search, Design, Trie
- **Function Name**: `wordDictionaryOperations`
- **Parameters**: `operations: list<String>`, `words: list<String>`
- **Return Type**: `list<String>`
- **Description**: Design a data structure that supports adding new words and finding if a string matches any previously added string with `.` wildcard support.
```markdown
Problem Name: "Design Add and Search Words Data Structure"
Difficulty: MEDIUM
Topics: String, Design, Trie
Function Name: wordDictionaryOperations

Input Structure:
Input Field: list<String> operations
Input Field: list<String> words

Output Structure:
Output Field: list<String> result
```

### 63. Word Search II
- **Slug**: `word-search-ii`
- **Difficulty**: HARD
- **Topics**: Array, String, Backtracking, Trie, Matrix
- **Function Name**: `findWords`
- **Parameters**: `board: list<list<String>>`, `words: list<String>`
- **Return Type**: `list<String>`
- **Description**: Given an `m x n` board of characters and a list of strings `words`, return all words on the board.
```markdown
Problem Name: "Word Search II"
Difficulty: HARD
Topics: Array, String, Backtracking, Trie, Matrix
Function Name: findWords

Input Structure:
Input Field: list<list<String>> board
Input Field: list<String> words

Output Structure:
Output Field: list<String> result
```


## 9. Heap and Priority Queue

### 64. Kth Largest Element in a Stream
- **Slug**: `kth-largest-element-in-a-stream`
- **Difficulty**: EASY
- **Topics**: Tree, Design, Binary Search Tree, Heap, Binary Tree, Data Stream
- **Function Name**: `kthLargestStream`
- **Parameters**: `k: int`, `nums: list<int>`, `valList: list<int>`
- **Return Type**: `list<int>`
- **Description**: Design a class to find the `k`-th largest element in a stream. Note that it is the `k`-th largest element in sorted order, not the `k`-th distinct element.
```markdown
Problem Name: "Kth Largest Element in a Stream"
Difficulty: EASY
Topics: Heap, Design, Data Stream
Function Name: kthLargestStream

Input Structure:
Input Field: int k
Input Field: list<int> nums
Input Field: list<int> valList

Output Structure:
Output Field: list<int> result
```

### 65. Last Stone Weight
- **Slug**: `last-stone-weight`
- **Difficulty**: EASY
- **Topics**: Array, Heap
- **Function Name**: `lastStoneWeight`
- **Parameters**: `stones: list<int>`
- **Return Type**: `int`
- **Description**: We have a collection of stones, each with a positive integer weight. Each turn, we choose the two heaviest stones and smash them together. Return the weight of the last remaining stone, or 0.
```markdown
Problem Name: "Last Stone Weight"
Difficulty: EASY
Topics: Array, Heap
Function Name: lastStoneWeight

Input Structure:
Input Field: list<int> stones

Output Structure:
Output Field: int result
```

### 66. K Closest Points to Origin
- **Slug**: `k-closest-points-to-origin`
- **Difficulty**: MEDIUM
- **Topics**: Array, Math, Divide and Conquer, Geometry, Sorting, Heap, Quickselect
- **Function Name**: `kClosest`
- **Parameters**: `points: list<list<int>>`, `k: int`
- **Return Type**: `list<list<int>>`
- **Description**: Given an array of points where `points[i] = [xi, yi]` represents a point on the X-Y plane and an integer `k`, return the `k` closest points to the origin `(0, 0)`.
```markdown
Problem Name: "K Closest Points to Origin"
Difficulty: MEDIUM
Topics: Array, Math, Geometry, Heap
Function Name: kClosest

Input Structure:
Input Field: list<list<int>> points
Input Field: int k

Output Structure:
Output Field: list<list<int>> result
```

### 67. Kth Largest Element in an Array
- **Slug**: `kth-largest-element-in-an-array`
- **Difficulty**: MEDIUM
- **Topics**: Array, Divide and Conquer, Sorting, Heap, Quickselect
- **Function Name**: `findKthLargest`
- **Parameters**: `nums: list<int>`, `k: int`
- **Return Type**: `int`
- **Description**: Given an integer array `nums` and an integer `k`, return the `k`-th largest element in the array without sorting in O(n) average time.
```markdown
Problem Name: "Kth Largest Element in an Array"
Difficulty: MEDIUM
Topics: Array, Divide and Conquer, Sorting, Heap
Function Name: findKthLargest

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: int result
```

### 68. Task Scheduler
- **Slug**: `task-scheduler`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Greedy, Sorting, Heap, Counting
- **Function Name**: `leastInterval`
- **Parameters**: `tasks: list<String>`, `n: int`
- **Return Type**: `int`
- **Description**: Given a characters array `tasks` representing CPU tasks and a non-negative integer `n` cooldown period, return the least number of units of times that the CPU will take to finish all tasks.
```markdown
Problem Name: "Task Scheduler"
Difficulty: MEDIUM
Topics: Array, Hash Table, Greedy, Heap
Function Name: leastInterval

Input Structure:
Input Field: list<String> tasks
Input Field: int n

Output Structure:
Output Field: int result
```

### 69. Design Twitter
- **Slug**: `design-twitter`
- **Difficulty**: MEDIUM
- **Topics**: Hash Table, Linked List, Design, Heap
- **Function Name**: `twitterOperations`
- **Parameters**: `operations: list<String>`, `values: list<list<int>>`
- **Return Type**: `list<String>`
- **Description**: Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and see the 10 most recent tweets in their news feed.
```markdown
Problem Name: "Design Twitter"
Difficulty: MEDIUM
Topics: Hash Table, Design, Heap
Function Name: twitterOperations

Input Structure:
Input Field: list<String> operations
Input Field: list<list<int>> values

Output Structure:
Output Field: list<String> result
```

### 70. Find Median from Data Stream
- **Slug**: `find-median-from-data-stream`
- **Difficulty**: HARD
- **Topics**: Two Pointers, Design, Sorting, Heap, Data Stream
- **Function Name**: `medianFinderOperations`
- **Parameters**: `operations: list<String>`, `values: list<list<int>>`
- **Return Type**: `list<double>`
- **Description**: Design a data structure that supports adding integer numbers from a data stream and finding the median of all elements added so far in O(log n) time.
```markdown
Problem Name: "Find Median from Data Stream"
Difficulty: HARD
Topics: Design, Heap, Data Stream
Function Name: medianFinderOperations

Input Structure:
Input Field: list<String> operations
Input Field: list<list<int>> values

Output Structure:
Output Field: list<double> result
```


## 10. Backtracking

### 71. Subsets
- **Slug**: `subsets`
- **Difficulty**: MEDIUM
- **Topics**: Array, Backtracking, Bit Manipulation
- **Function Name**: `subsets`
- **Parameters**: `nums: list<int>`
- **Return Type**: `list<list<int>>`
- **Description**: Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.
```markdown
Problem Name: "Subsets"
Difficulty: MEDIUM
Topics: Array, Backtracking, Bit Manipulation
Function Name: subsets

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: list<list<int>> result
```

### 72. Combination Sum
- **Slug**: `combination-sum`
- **Difficulty**: MEDIUM
- **Topics**: Array, Backtracking
- **Function Name**: `combinationSum`
- **Parameters**: `candidates: list<int>`, `target: int`
- **Return Type**: `list<list<int>>`
- **Description**: Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`.
```markdown
Problem Name: "Combination Sum"
Difficulty: MEDIUM
Topics: Array, Backtracking
Function Name: combinationSum

Input Structure:
Input Field: list<int> candidates
Input Field: int target

Output Structure:
Output Field: list<list<int>> result
```

### 73. Combination Sum II
- **Slug**: `combination-sum-ii`
- **Difficulty**: MEDIUM
- **Topics**: Array, Backtracking
- **Function Name**: `combinationSum2`
- **Parameters**: `candidates: list<int>`, `target: int`
- **Return Type**: `list<list<int>>`
- **Description**: Given a collection of candidate numbers `candidates` and a target number `target`, find all unique combinations in `candidates` where the candidate numbers sum to `target`. Each number may only be used once.
```markdown
Problem Name: "Combination Sum II"
Difficulty: MEDIUM
Topics: Array, Backtracking
Function Name: combinationSum2

Input Structure:
Input Field: list<int> candidates
Input Field: int target

Output Structure:
Output Field: list<list<int>> result
```

### 74. Permutations
- **Slug**: `permutations`
- **Difficulty**: MEDIUM
- **Topics**: Array, Backtracking
- **Function Name**: `permute`
- **Parameters**: `nums: list<int>`
- **Return Type**: `list<list<int>>`
- **Description**: Given an array `nums` of distinct integers, return all the possible permutations in any order.
```markdown
Problem Name: "Permutations"
Difficulty: MEDIUM
Topics: Array, Backtracking
Function Name: permute

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: list<list<int>> result
```

### 75. Subsets II
- **Slug**: `subsets-ii`
- **Difficulty**: MEDIUM
- **Topics**: Array, Backtracking, Bit Manipulation
- **Function Name**: `subsetsWithDup`
- **Parameters**: `nums: list<int>`
- **Return Type**: `list<list<int>>`
- **Description**: Given an integer array `nums` that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets.
```markdown
Problem Name: "Subsets II"
Difficulty: MEDIUM
Topics: Array, Backtracking
Function Name: subsetsWithDup

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: list<list<int>> result
```

### 76. Word Search
- **Slug**: `word-search`
- **Difficulty**: MEDIUM
- **Topics**: Array, String, Backtracking, Matrix
- **Function Name**: `exist`
- **Parameters**: `board: list<list<String>>`, `word: String`
- **Return Type**: `bool`
- **Description**: Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.
```markdown
Problem Name: "Word Search"
Difficulty: MEDIUM
Topics: Array, String, Backtracking, Matrix
Function Name: exist

Input Structure:
Input Field: list<list<String>> board
Input Field: String word

Output Structure:
Output Field: bool result
```

### 77. Palindrome Partitioning
- **Slug**: `palindrome-partitioning`
- **Difficulty**: MEDIUM
- **Topics**: String, Dynamic Programming, Backtracking
- **Function Name**: `partition`
- **Parameters**: `s: String`
- **Return Type**: `list<list<String>>`
- **Description**: Given a string `s`, partition `s` such that every substring of the partition is a palindrome. Return all possible palindrome partitionings of `s`.
```markdown
Problem Name: "Palindrome Partitioning"
Difficulty: MEDIUM
Topics: String, Dynamic Programming, Backtracking
Function Name: partition

Input Structure:
Input Field: String s

Output Structure:
Output Field: list<list<String>> result
```

### 78. Letter Combinations of a Phone Number
- **Slug**: `letter-combinations-of-a-phone-number`
- **Difficulty**: MEDIUM
- **Topics**: Hash Table, String, Backtracking
- **Function Name**: `letterCombinations`
- **Parameters**: `digits: String`
- **Return Type**: `list<String>`
- **Description**: Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent according to telephone buttons.
```markdown
Problem Name: "Letter Combinations of a Phone Number"
Difficulty: MEDIUM
Topics: Hash Table, String, Backtracking
Function Name: letterCombinations

Input Structure:
Input Field: String digits

Output Structure:
Output Field: list<String> result
```

### 79. N-Queens
- **Slug**: `n-queens`
- **Difficulty**: HARD
- **Topics**: Array, Backtracking
- **Function Name**: `solveNQueens`
- **Parameters**: `n: int`
- **Return Type**: `list<list<String>>`
- **Description**: The `n`-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other. Return all distinct solutions.
```markdown
Problem Name: "N-Queens"
Difficulty: HARD
Topics: Array, Backtracking
Function Name: solveNQueens

Input Structure:
Input Field: int n

Output Structure:
Output Field: list<list<String>> result
```


## 11. Graphs

### 80. Number of Islands
- **Slug**: `number-of-islands`
- **Difficulty**: MEDIUM
- **Topics**: Array, Depth-First Search, Breadth-First Search, Union Find, Matrix
- **Function Name**: `numIslands`
- **Parameters**: `grid: list<list<String>>`
- **Return Type**: `int`
- **Description**: Given an `m x n` 2D binary grid which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.
```markdown
Problem Name: "Number of Islands"
Difficulty: MEDIUM
Topics: Array, Depth-First Search, Breadth-First Search, Matrix
Function Name: numIslands

Input Structure:
Input Field: list<list<String>> grid

Output Structure:
Output Field: int result
```

### 81. Max Area of Island
- **Slug**: `max-area-of-island`
- **Difficulty**: MEDIUM
- **Topics**: Array, Depth-First Search, Breadth-First Search, Union Find, Matrix
- **Function Name**: `maxAreaOfIsland`
- **Parameters**: `grid: list<list<int>>`
- **Return Type**: `int`
- **Description**: You are given an `m x n` binary matrix `grid`. An island is a 4-directionally connected group of `1`'s. Return the maximum area of an island in `grid`.
```markdown
Problem Name: "Max Area of Island"
Difficulty: MEDIUM
Topics: Array, Depth-First Search, Breadth-First Search, Matrix
Function Name: maxAreaOfIsland

Input Structure:
Input Field: list<list<int>> grid

Output Structure:
Output Field: int result
```

### 82. Clone Graph
- **Slug**: `clone-graph`
- **Difficulty**: MEDIUM
- **Topics**: Hash Table, Depth-First Search, Breadth-First Search, Graph
- **Function Name**: `cloneGraph`
- **Parameters**: `adjList: list<list<int>>`
- **Return Type**: `list<list<int>>`
- **Description**: Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph represented by its adjacency list.
```markdown
Problem Name: "Clone Graph"
Difficulty: MEDIUM
Topics: Hash Table, Depth-First Search, Breadth-First Search, Graph
Function Name: cloneGraph

Input Structure:
Input Field: list<list<int>> adjList

Output Structure:
Output Field: list<list<int>> result
```

### 83. Walls and Gates
- **Slug**: `walls-and-gates`
- **Difficulty**: MEDIUM
- **Topics**: Array, Breadth-First Search, Matrix
- **Function Name**: `wallsAndGates`
- **Parameters**: `rooms: list<list<int>>`
- **Return Type**: `list<list<int>>`
- **Description**: You are given an `m x n` grid `rooms` initialized with `-1` (wall), `0` (gate), and `INF` (empty room). Fill each empty room with the distance to its nearest gate.
```markdown
Problem Name: "Walls and Gates"
Difficulty: MEDIUM
Topics: Array, Breadth-First Search, Matrix
Function Name: wallsAndGates

Input Structure:
Input Field: list<list<int>> rooms

Output Structure:
Output Field: list<list<int>> result
```

### 84. Pacific Atlantic Water Flow
- **Slug**: `pacific-atlantic-water-flow`
- **Difficulty**: MEDIUM
- **Topics**: Array, Depth-First Search, Breadth-First Search, Matrix
- **Function Name**: `pacificAtlantic`
- **Parameters**: `heights: list<list<int>>`
- **Return Type**: `list<list<int>>`
- **Description**: Return a 2D list of grid coordinates `[r, c]` where rain water can flow to both the Pacific and Atlantic oceans.
```markdown
Problem Name: "Pacific Atlantic Water Flow"
Difficulty: MEDIUM
Topics: Array, Depth-First Search, Breadth-First Search, Matrix
Function Name: pacificAtlantic

Input Structure:
Input Field: list<list<int>> heights

Output Structure:
Output Field: list<list<int>> result
```

### 85. Surrounded Regions
- **Slug**: `surrounded-regions`
- **Difficulty**: MEDIUM
- **Topics**: Array, Depth-First Search, Breadth-First Search, Union Find, Matrix
- **Function Name**: `solve`
- **Parameters**: `board: list<list<String>>`
- **Return Type**: `list<list<String>>`
- **Description**: Given an `m x n` matrix `board` containing `'X'` and `'O'`, capture all regions that are 4-directionally surrounded by `'X'`.
```markdown
Problem Name: "Surrounded Regions"
Difficulty: MEDIUM
Topics: Array, Depth-First Search, Breadth-First Search, Matrix
Function Name: solve

Input Structure:
Input Field: list<list<String>> board

Output Structure:
Output Field: list<list<String>> result
```

### 86. Rotting Oranges
- **Slug**: `rotting-oranges`
- **Difficulty**: MEDIUM
- **Topics**: Array, Breadth-First Search, Matrix
- **Function Name**: `orangesRotting`
- **Parameters**: `grid: list<list<int>>`
- **Return Type**: `int`
- **Description**: You are given an `m x n` grid where each cell represents empty, fresh, or rotten orange. Return the minimum number of minutes that must elapse until no cell has a fresh orange (-1 if impossible).
```markdown
Problem Name: "Rotting Oranges"
Difficulty: MEDIUM
Topics: Array, Breadth-First Search, Matrix
Function Name: orangesRotting

Input Structure:
Input Field: list<list<int>> grid

Output Structure:
Output Field: int result
```

### 87. Course Schedule
- **Slug**: `course-schedule`
- **Difficulty**: MEDIUM
- **Topics**: Depth-First Search, Breadth-First Search, Graph, Topological Sort
- **Function Name**: `canFinish`
- **Parameters**: `numCourses: int`, `prerequisites: list<list<int>>`
- **Return Type**: `bool`
- **Description**: There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. Return `true` if you can finish all courses.
```markdown
Problem Name: "Course Schedule"
Difficulty: MEDIUM
Topics: Depth-First Search, Breadth-First Search, Graph, Topological Sort
Function Name: canFinish

Input Structure:
Input Field: int numCourses
Input Field: list<list<int>> prerequisites

Output Structure:
Output Field: bool result
```

### 88. Course Schedule II
- **Slug**: `course-schedule-ii`
- **Difficulty**: MEDIUM
- **Topics**: Depth-First Search, Breadth-First Search, Graph, Topological Sort
- **Function Name**: `findOrder`
- **Parameters**: `numCourses: int`, `prerequisites: list<list<int>>`
- **Return Type**: `list<int>`
- **Description**: Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible, return an empty array.
```markdown
Problem Name: "Course Schedule II"
Difficulty: MEDIUM
Topics: Depth-First Search, Breadth-First Search, Graph, Topological Sort
Function Name: findOrder

Input Structure:
Input Field: int numCourses
Input Field: list<list<int>> prerequisites

Output Structure:
Output Field: list<int> result
```

### 89. Redundant Connection
- **Slug**: `redundant-connection`
- **Difficulty**: MEDIUM
- **Topics**: Depth-First Search, Breadth-First Search, Union Find, Graph
- **Function Name**: `findRedundantConnection`
- **Parameters**: `edges: list<list<int>>`
- **Return Type**: `list<int>`
- **Description**: In this problem, a tree is an undirected graph that is connected and has no cycles. Return an edge that can be removed so that the resulting graph is a tree.
```markdown
Problem Name: "Redundant Connection"
Difficulty: MEDIUM
Topics: Depth-First Search, Breadth-First Search, Union Find, Graph
Function Name: findRedundantConnection

Input Structure:
Input Field: list<list<int>> edges

Output Structure:
Output Field: list<int> result
```

### 90. Number of Connected Components in an Undirected Graph
- **Slug**: `number-of-connected-components-in-an-undirected-graph`
- **Difficulty**: MEDIUM
- **Topics**: Depth-First Search, Breadth-First Search, Union Find, Graph
- **Function Name**: `countComponents`
- **Parameters**: `n: int`, `edges: list<list<int>>`
- **Return Type**: `int`
- **Description**: You have a graph of `n` nodes. You are given an integer `n` and an array `edges`. Return the number of connected components in the graph.
```markdown
Problem Name: "Number of Connected Components in an Undirected Graph"
Difficulty: MEDIUM
Topics: Depth-First Search, Breadth-First Search, Union Find, Graph
Function Name: countComponents

Input Structure:
Input Field: int n
Input Field: list<list<int>> edges

Output Structure:
Output Field: int result
```

### 91. Graph Valid Tree
- **Slug**: `graph-valid-tree`
- **Difficulty**: MEDIUM
- **Topics**: Depth-First Search, Breadth-First Search, Union Find, Graph
- **Function Name**: `validTree`
- **Parameters**: `n: int`, `edges: list<list<int>>`
- **Return Type**: `bool`
- **Description**: Given `n` nodes labeled from `0` to `n - 1` and a list of undirected edges, write a function to check whether these edges make up a valid tree.
```markdown
Problem Name: "Graph Valid Tree"
Difficulty: MEDIUM
Topics: Depth-First Search, Breadth-First Search, Union Find, Graph
Function Name: validTree

Input Structure:
Input Field: int n
Input Field: list<list<int>> edges

Output Structure:
Output Field: bool result
```

### 92. Word Ladder
- **Slug**: `word-ladder`
- **Difficulty**: HARD
- **Topics**: Hash Table, String, Breadth-First Search
- **Function Name**: `ladderLength`
- **Parameters**: `beginWord: String`, `endWord: String`, `wordList: list<String>`
- **Return Type**: `int`
- **Description**: A transformation sequence from word `beginWord` to word `endWord` using a dictionary `wordList`. Return the number of words in the shortest transformation sequence, or 0 if no such sequence exists.
```markdown
Problem Name: "Word Ladder"
Difficulty: HARD
Topics: Hash Table, String, Breadth-First Search
Function Name: ladderLength

Input Structure:
Input Field: String beginWord
Input Field: String endWord
Input Field: list<String> wordList

Output Structure:
Output Field: int result
```


## 12. Advanced Graphs

### 93. Reconstruct Itinerary
- **Slug**: `reconstruct-itinerary`
- **Difficulty**: HARD
- **Topics**: Depth-First Search, Graph, Eulerian Circuit
- **Function Name**: `findItinerary`
- **Parameters**: `tickets: list<list<String>>`
- **Return Type**: `list<String>`
- **Description**: Reconstruct the itinerary in order from a list of airline tickets, beginning with `'JFK'`. If there are multiple valid itineraries, return the one that has the smallest lexical order.
```markdown
Problem Name: "Reconstruct Itinerary"
Difficulty: HARD
Topics: Depth-First Search, Graph, Eulerian Circuit
Function Name: findItinerary

Input Structure:
Input Field: list<list<String>> tickets

Output Structure:
Output Field: list<String> result
```

### 94. Min Cost to Connect All Points
- **Slug**: `min-cost-to-connect-all-points`
- **Difficulty**: MEDIUM
- **Topics**: Array, Union Find, Graph, Minimum Spanning Tree
- **Function Name**: `minCostConnectPoints`
- **Parameters**: `points: list<list<int>>`
- **Return Type**: `int`
- **Description**: Return the minimum cost to make all points connected. The cost of connecting two points `[xi, yi]` and `[xj, yj]` is the Manhattan distance between them.
```markdown
Problem Name: "Min Cost to Connect All Points"
Difficulty: MEDIUM
Topics: Array, Graph, Minimum Spanning Tree
Function Name: minCostConnectPoints

Input Structure:
Input Field: list<list<int>> points

Output Structure:
Output Field: int result
```

### 95. Network Delay Time
- **Slug**: `network-delay-time`
- **Difficulty**: MEDIUM
- **Topics**: Depth-First Search, Breadth-First Search, Graph, Heap, Shortest Path
- **Function Name**: `networkDelayTime`
- **Parameters**: `times: list<list<int>>`, `n: int`, `k: int`
- **Return Type**: `int`
- **Description**: You are given a network of `n` nodes labeled `1` to `n`. Return the minimum time it takes for all the `n` nodes to receive a signal sent from node `k`. Return `-1` if impossible.
```markdown
Problem Name: "Network Delay Time"
Difficulty: MEDIUM
Topics: Graph, Heap, Shortest Path
Function Name: networkDelayTime

Input Structure:
Input Field: list<list<int>> times
Input Field: int n
Input Field: int k

Output Structure:
Output Field: int result
```

### 96. Swim in Rising Water
- **Slug**: `swim-in-rising-water`
- **Difficulty**: HARD
- **Topics**: Array, Binary Search, Depth-First Search, Breadth-First Search, Union Find, Heap, Matrix
- **Function Name**: `swimInWater`
- **Parameters**: `grid: list<list<int>>`
- **Return Type**: `int`
- **Description**: You are given an `n x n` integer matrix `grid` where each value `grid[i][j]` represents the elevation at that point. Return the minimum time until you can reach the bottom right square `(n - 1, n - 1)` from `(0, 0)`.
```markdown
Problem Name: "Swim in Rising Water"
Difficulty: HARD
Topics: Binary Search, Depth-First Search, Heap, Matrix
Function Name: swimInWater

Input Structure:
Input Field: list<list<int>> grid

Output Structure:
Output Field: int result
```

### 97. Alien Dictionary
- **Slug**: `alien-dictionary`
- **Difficulty**: HARD
- **Topics**: Array, String, Depth-First Search, Breadth-First Search, Graph, Topological Sort
- **Function Name**: `alienOrder`
- **Parameters**: `words: list<String>`
- **Return Type**: `String`
- **Description**: There is a new alien language that uses the English alphabet. The letters are sorted lexicographically by the rules of this new language. Return a string of the unique letters in sorted lexicographical order.
```markdown
Problem Name: "Alien Dictionary"
Difficulty: HARD
Topics: String, Graph, Topological Sort
Function Name: alienOrder

Input Structure:
Input Field: list<String> words

Output Structure:
Output Field: String result
```

### 98. Cheapest Flights Within K Stops
- **Slug**: `cheapest-flights-within-k-stops`
- **Difficulty**: MEDIUM
- **Topics**: Dynamic Programming, Depth-First Search, Breadth-First Search, Graph, Heap, Shortest Path
- **Function Name**: `findCheapestPrice`
- **Parameters**: `n: int`, `flights: list<list<int>>`, `src: int`, `dst: int`, `k: int`
- **Return Type**: `int`
- **Description**: There are `n` cities connected by some number of flights. Return the cheapest price from `src` to `dst` with at most `k` stops. If there is no such route, return `-1`.
```markdown
Problem Name: "Cheapest Flights Within K Stops"
Difficulty: MEDIUM
Topics: Dynamic Programming, Graph, Shortest Path
Function Name: findCheapestPrice

Input Structure:
Input Field: int n
Input Field: list<list<int>> flights
Input Field: int src
Input Field: int dst
Input Field: int k

Output Structure:
Output Field: int result
```


## 13. 1-D Dynamic Programming

### 99. Climbing Stairs
- **Slug**: `climbing-stairs`
- **Difficulty**: EASY
- **Topics**: Math, Dynamic Programming, Memoization
- **Function Name**: `climbStairs`
- **Parameters**: `n: int`
- **Return Type**: `int`
- **Description**: You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
```markdown
Problem Name: "Climbing Stairs"
Difficulty: EASY
Topics: Math, Dynamic Programming
Function Name: climbStairs

Input Structure:
Input Field: int n

Output Structure:
Output Field: int result
```

### 100. Min Cost Climbing Stairs
- **Slug**: `min-cost-climbing-stairs`
- **Difficulty**: EASY
- **Topics**: Array, Dynamic Programming
- **Function Name**: `minCostClimbingStairs`
- **Parameters**: `cost: list<int>`
- **Return Type**: `int`
- **Description**: You are given an integer array `cost` where `cost[i]` is the cost of `i`-th step on a staircase. Return the minimum cost to reach the top of the floor starting from index 0 or 1.
```markdown
Problem Name: "Min Cost Climbing Stairs"
Difficulty: EASY
Topics: Array, Dynamic Programming
Function Name: minCostClimbingStairs

Input Structure:
Input Field: list<int> cost

Output Structure:
Output Field: int result
```

### 101. House Robber
- **Slug**: `house-robber`
- **Difficulty**: MEDIUM
- **Topics**: Array, Dynamic Programming
- **Function Name**: `rob`
- **Parameters**: `nums: list<int>`
- **Return Type**: `int`
- **Description**: You are a professional robber planning to rob houses along a street. Determine the maximum amount of money you can rob tonight without alerting the police (cannot rob adjacent houses).
```markdown
Problem Name: "House Robber"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming
Function Name: rob

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
```

### 102. House Robber II
- **Slug**: `house-robber-ii`
- **Difficulty**: MEDIUM
- **Topics**: Array, Dynamic Programming
- **Function Name**: `rob`
- **Parameters**: `nums: list<int>`
- **Return Type**: `int`
- **Description**: You are a professional robber planning to rob houses arranged in a circle. Return the maximum amount of money you can rob tonight without robbing adjacent houses.
```markdown
Problem Name: "House Robber II"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming
Function Name: rob

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
```

### 103. Longest Palindromic Substring
- **Slug**: `longest-palindromic-substring`
- **Difficulty**: MEDIUM
- **Topics**: Two Pointers, String, Dynamic Programming
- **Function Name**: `longestPalindrome`
- **Parameters**: `s: String`
- **Return Type**: `String`
- **Description**: Given a string `s`, return the longest palindromic substring in `s`.
```markdown
Problem Name: "Longest Palindromic Substring"
Difficulty: MEDIUM
Topics: Two Pointers, String, Dynamic Programming
Function Name: longestPalindrome

Input Structure:
Input Field: String s

Output Structure:
Output Field: String result
```

### 104. Palindromic Substrings
- **Slug**: `palindromic-substrings`
- **Difficulty**: MEDIUM
- **Topics**: Two Pointers, String, Dynamic Programming
- **Function Name**: `countSubstrings`
- **Parameters**: `s: String`
- **Return Type**: `int`
- **Description**: Given a string `s`, return the number of palindromic substrings in it. A substring is a contiguous sequence of characters within the string.
```markdown
Problem Name: "Palindromic Substrings"
Difficulty: MEDIUM
Topics: Two Pointers, String, Dynamic Programming
Function Name: countSubstrings

Input Structure:
Input Field: String s

Output Structure:
Output Field: int result
```

### 105. Decode Ways
- **Slug**: `decode-ways`
- **Difficulty**: MEDIUM
- **Topics**: String, Dynamic Programming
- **Function Name**: `numDecodings`
- **Parameters**: `s: String`
- **Return Type**: `int`
- **Description**: A message containing letters from A-Z can be encoded into numbers using 'A' -> "1", 'B' -> "2", ... 'Z' -> "26". Given a string `s` containing only digits, return the number of ways to decode it.
```markdown
Problem Name: "Decode Ways"
Difficulty: MEDIUM
Topics: String, Dynamic Programming
Function Name: numDecodings

Input Structure:
Input Field: String s

Output Structure:
Output Field: int result
```

### 106. Coin Change
- **Slug**: `coin-change`
- **Difficulty**: MEDIUM
- **Topics**: Array, Dynamic Programming, Breadth-First Search
- **Function Name**: `coinChange`
- **Parameters**: `coins: list<int>`, `amount: int`
- **Return Type**: `int`
- **Description**: You are given an integer array `coins` representing coins of different denominations and an integer `amount`. Return the fewest number of coins that you need to make up that amount, or -1 if impossible.
```markdown
Problem Name: "Coin Change"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming
Function Name: coinChange

Input Structure:
Input Field: list<int> coins
Input Field: int amount

Output Structure:
Output Field: int result
```

### 107. Maximum Product Subarray
- **Slug**: `maximum-product-subarray`
- **Difficulty**: MEDIUM
- **Topics**: Array, Dynamic Programming
- **Function Name**: `maxProduct`
- **Parameters**: `nums: list<int>`
- **Return Type**: `int`
- **Description**: Given an integer array `nums`, find a subarray that has the largest product, and return the product.
```markdown
Problem Name: "Maximum Product Subarray"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming
Function Name: maxProduct

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
```

### 108. Word Break
- **Slug**: `word-break`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, String, Dynamic Programming, Trie, Memoization
- **Function Name**: `wordBreak`
- **Parameters**: `s: String`, `wordDict: list<String>`
- **Return Type**: `bool`
- **Description**: Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.
```markdown
Problem Name: "Word Break"
Difficulty: MEDIUM
Topics: Array, String, Dynamic Programming, Trie
Function Name: wordBreak

Input Structure:
Input Field: String s
Input Field: list<String> wordDict

Output Structure:
Output Field: bool result
```

### 109. Longest Increasing Subsequence
- **Slug**: `longest-increasing-subsequence`
- **Difficulty**: MEDIUM
- **Topics**: Array, Binary Search, Dynamic Programming
- **Function Name**: `lengthOfLIS`
- **Parameters**: `nums: list<int>`
- **Return Type**: `int`
- **Description**: Given an integer array `nums`, return the length of the longest strictly increasing subsequence.
```markdown
Problem Name: "Longest Increasing Subsequence"
Difficulty: MEDIUM
Topics: Array, Binary Search, Dynamic Programming
Function Name: lengthOfLIS

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
```

### 110. Partition Equal Subset Sum
- **Slug**: `partition-equal-subset-sum`
- **Difficulty**: MEDIUM
- **Topics**: Array, Dynamic Programming
- **Function Name**: `canPartition`
- **Parameters**: `nums: list<int>`
- **Return Type**: `bool`
- **Description**: Given an integer array `nums`, return `true` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal, or `false` otherwise.
```markdown
Problem Name: "Partition Equal Subset Sum"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming
Function Name: canPartition

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: bool result
```


## 14. 2-D Dynamic Programming

### 111. Unique Paths
- **Slug**: `unique-paths`
- **Difficulty**: MEDIUM
- **Topics**: Math, Dynamic Programming, Combinatorics
- **Function Name**: `uniquePaths`
- **Parameters**: `m: int`, `n: int`
- **Return Type**: `int`
- **Description**: There is a robot on an `m x n` grid. The robot can only move either down or right at any point in time. Return the number of possible unique paths that the robot can take to reach the bottom-right corner.
```markdown
Problem Name: "Unique Paths"
Difficulty: MEDIUM
Topics: Math, Dynamic Programming
Function Name: uniquePaths

Input Structure:
Input Field: int m
Input Field: int n

Output Structure:
Output Field: int result
```

### 112. Longest Common Subsequence
- **Slug**: `longest-common-subsequence`
- **Difficulty**: MEDIUM
- **Topics**: String, Dynamic Programming
- **Function Name**: `longestCommonSubsequence`
- **Parameters**: `text1: String`, `text2: String`
- **Return Type**: `int`
- **Description**: Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return 0.
```markdown
Problem Name: "Longest Common Subsequence"
Difficulty: MEDIUM
Topics: String, Dynamic Programming
Function Name: longestCommonSubsequence

Input Structure:
Input Field: String text1
Input Field: String text2

Output Structure:
Output Field: int result
```

### 113. Best Time to Buy and Sell Stock with Cooldown
- **Slug**: `best-time-to-buy-and-sell-stock-with-cooldown`
- **Difficulty**: MEDIUM
- **Topics**: Array, Dynamic Programming
- **Function Name**: `maxProfit`
- **Parameters**: `prices: list<int>`
- **Return Type**: `int`
- **Description**: You are given an array `prices` where `prices[i]` is the price of a stock on day `i`. After you sell your stock, you cannot buy stock on the next day (cooldown of one day). Find the maximum profit.
```markdown
Problem Name: "Best Time to Buy and Sell Stock with Cooldown"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming
Function Name: maxProfit

Input Structure:
Input Field: list<int> prices

Output Structure:
Output Field: int result
```

### 114. Coin Change II
- **Slug**: `coin-change-ii`
- **Difficulty**: MEDIUM
- **Topics**: Array, Dynamic Programming
- **Function Name**: `change`
- **Parameters**: `amount: int`, `coins: list<int>`
- **Return Type**: `int`
- **Description**: You are given an integer array `coins` representing coins of different denominations and an integer `amount`. Return the number of combinations that make up that amount (unlimited quantity of each coin).
```markdown
Problem Name: "Coin Change II"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming
Function Name: change

Input Structure:
Input Field: int amount
Input Field: list<int> coins

Output Structure:
Output Field: int result
```

### 115. Target Sum
- **Slug**: `target-sum`
- **Difficulty**: MEDIUM
- **Topics**: Array, Dynamic Programming, Backtracking
- **Function Name**: `findTargetSumWays`
- **Parameters**: `nums: list<int>`, `target: int`
- **Return Type**: `int`
- **Description**: You are given an integer array `nums` and an integer `target`. Build an expression out of `nums` by adding either `+` or `-` before each integer. Return the number of different expressions that evaluate to `target`.
```markdown
Problem Name: "Target Sum"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming
Function Name: findTargetSumWays

Input Structure:
Input Field: list<int> nums
Input Field: int target

Output Structure:
Output Field: int result
```

### 116. Interleaving String
- **Slug**: `interleaving-string`
- **Difficulty**: MEDIUM
- **Topics**: String, Dynamic Programming
- **Function Name**: `isInterleave`
- **Parameters**: `s1: String`, `s2: String`, `s3: String`
- **Return Type**: `bool`
- **Description**: Given strings `s1`, `s2`, and `s3`, find whether `s3` is formed by an interleaving of `s1` and `s2`.
```markdown
Problem Name: "Interleaving String"
Difficulty: MEDIUM
Topics: String, Dynamic Programming
Function Name: isInterleave

Input Structure:
Input Field: String s1
Input Field: String s2
Input Field: String s3

Output Structure:
Output Field: bool result
```

### 117. Longest Increasing Path in a Matrix
- **Slug**: `longest-increasing-path-in-a-matrix`
- **Difficulty**: HARD
- **Topics**: Array, Dynamic Programming, Depth-First Search, Breadth-First Search, Graph, Topological Sort, Memoization, Matrix
- **Function Name**: `longestIncreasingPath`
- **Parameters**: `matrix: list<list<int>>`
- **Return Type**: `int`
- **Description**: Given an `m x n` integers matrix, return the length of the longest increasing path in matrix moving 4-directionally.
```markdown
Problem Name: "Longest Increasing Path in a Matrix"
Difficulty: HARD
Topics: Depth-First Search, Dynamic Programming, Matrix
Function Name: longestIncreasingPath

Input Structure:
Input Field: list<list<int>> matrix

Output Structure:
Output Field: int result
```

### 118. Distinct Subsequences
- **Slug**: `distinct-subsequences`
- **Difficulty**: HARD
- **Topics**: String, Dynamic Programming
- **Function Name**: `numDistinct`
- **Parameters**: `s: String`, `t: String`
- **Return Type**: `int`
- **Description**: Given two strings `s` and `t`, return the number of distinct subsequences of `s` which equals `t`.
```markdown
Problem Name: "Distinct Subsequences"
Difficulty: HARD
Topics: String, Dynamic Programming
Function Name: numDistinct

Input Structure:
Input Field: String s
Input Field: String t

Output Structure:
Output Field: int result
```

### 119. Edit Distance
- **Slug**: `edit-distance`
- **Difficulty**: MEDIUM
- **Topics**: String, Dynamic Programming
- **Function Name**: `minDistance`
- **Parameters**: `word1: String`, `word2: String`
- **Return Type**: `int`
- **Description**: Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2` (insert, delete, or replace a character).
```markdown
Problem Name: "Edit Distance"
Difficulty: MEDIUM
Topics: String, Dynamic Programming
Function Name: minDistance

Input Structure:
Input Field: String word1
Input Field: String word2

Output Structure:
Output Field: int result
```

### 120. Burst Balloons
- **Slug**: `burst-balloons`
- **Difficulty**: HARD
- **Topics**: Array, Dynamic Programming
- **Function Name**: `maxCoins`
- **Parameters**: `nums: list<int>`
- **Return Type**: `int`
- **Description**: You are given `n` balloons indexed from `0` to `n - 1`. If you burst the `i`-th balloon, you get `nums[i - 1] * nums[i] * nums[i + 1]` coins. Return the maximum coins you can collect by bursting the balloons wisely.
```markdown
Problem Name: "Burst Balloons"
Difficulty: HARD
Topics: Array, Dynamic Programming
Function Name: maxCoins

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
```

### 121. Regular Expression Matching
- **Slug**: `regular-expression-matching`
- **Difficulty**: HARD
- **Topics**: String, Dynamic Programming, Recursion
- **Function Name**: `isMatch`
- **Parameters**: `s: String`, `p: String`
- **Return Type**: `bool`
- **Description**: Given an input string `s` and a pattern `p`, implement regular expression matching with support for `.` (matches any single character) and `*` (matches zero or more of preceding element).
```markdown
Problem Name: "Regular Expression Matching"
Difficulty: HARD
Topics: String, Dynamic Programming, Recursion
Function Name: isMatch

Input Structure:
Input Field: String s
Input Field: String p

Output Structure:
Output Field: bool result
```


## 15. Greedy

### 122. Maximum Subarray
- **Slug**: `maximum-subarray`
- **Difficulty**: MEDIUM
- **Topics**: Array, Divide and Conquer, Dynamic Programming
- **Function Name**: `maxSubArray`
- **Parameters**: `nums: list<int>`
- **Return Type**: `int`
- **Description**: Given an integer array `nums`, find the subarray with the largest sum, and return its sum (Kadane's Algorithm).
```markdown
Problem Name: "Maximum Subarray"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming, Greedy
Function Name: maxSubArray

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
```

### 123. Jump Game
- **Slug**: `jump-game`
- **Difficulty**: MEDIUM
- **Topics**: Array, Dynamic Programming, Greedy
- **Function Name**: `canJump`
- **Parameters**: `nums: list<int>`
- **Return Type**: `bool`
- **Description**: You are given an integer array `nums`. You are initially positioned at the array's first index, and each element represents your maximum jump length. Return `true` if you can reach the last index.
```markdown
Problem Name: "Jump Game"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming, Greedy
Function Name: canJump

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: bool result
```

### 124. Jump Game II
- **Slug**: `jump-game-ii`
- **Difficulty**: MEDIUM
- **Topics**: Array, Dynamic Programming, Greedy
- **Function Name**: `jump`
- **Parameters**: `nums: list<int>`
- **Return Type**: `int`
- **Description**: You are given a 0-indexed array of integers `nums`. Return the minimum number of jumps to reach `nums[n - 1]`.
```markdown
Problem Name: "Jump Game II"
Difficulty: MEDIUM
Topics: Array, Dynamic Programming, Greedy
Function Name: jump

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
```

### 125. Gas Station
- **Slug**: `gas-station`
- **Difficulty**: MEDIUM
- **Topics**: Array, Greedy
- **Function Name**: `canCompleteCircuit`
- **Parameters**: `gas: list<int>`, `cost: list<int>`
- **Return Type**: `int`
- **Description**: Given two integer arrays `gas` and `cost`, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1.
```markdown
Problem Name: "Gas Station"
Difficulty: MEDIUM
Topics: Array, Greedy
Function Name: canCompleteCircuit

Input Structure:
Input Field: list<int> gas
Input Field: list<int> cost

Output Structure:
Output Field: int result
```

### 126. Hand of Straights
- **Slug**: `hand-of-straights`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Greedy, Sorting
- **Function Name**: `isNStraightHand`
- **Parameters**: `hand: list<int>`, `groupSize: int`
- **Return Type**: `bool`
- **Description**: Alice has some number of cards and wants to rearrange them into groups of `groupSize` consecutive cards. Return `true` if she can.
```markdown
Problem Name: "Hand of Straights"
Difficulty: MEDIUM
Topics: Array, Hash Table, Greedy, Sorting
Function Name: isNStraightHand

Input Structure:
Input Field: list<int> hand
Input Field: int groupSize

Output Structure:
Output Field: bool result
```

### 127. Merge Triplets to Form Target Triplet
- **Slug**: `merge-triplets-to-form-target-triplet`
- **Difficulty**: MEDIUM
- **Topics**: Array, Greedy
- **Function Name**: `mergeTriplets`
- **Parameters**: `triplets: list<list<int>>`, `target: list<int>`
- **Return Type**: `bool`
- **Description**: Return `true` if it is possible to obtain the `target` triplet by merging triplets taking component-wise maximums.
```markdown
Problem Name: "Merge Triplets to Form Target Triplet"
Difficulty: MEDIUM
Topics: Array, Greedy
Function Name: mergeTriplets

Input Structure:
Input Field: list<list<int>> triplets
Input Field: list<int> target

Output Structure:
Output Field: bool result
```

### 128. Partition Labels
- **Slug**: `partition-labels`
- **Difficulty**: MEDIUM
- **Topics**: Hash Table, Two Pointers, String, Greedy
- **Function Name**: `partitionLabels`
- **Parameters**: `s: String`
- **Return Type**: `list<int>`
- **Description**: You are given a string `s`. Partition the string into as many parts as possible so that each letter appears in at most one part. Return a list of integers representing the size of these parts.
```markdown
Problem Name: "Partition Labels"
Difficulty: MEDIUM
Topics: Two Pointers, String, Greedy
Function Name: partitionLabels

Input Structure:
Input Field: String s

Output Structure:
Output Field: list<int> result
```

### 129. Valid Parenthesis String
- **Slug**: `valid-parenthesis-string`
- **Difficulty**: MEDIUM
- **Topics**: String, Dynamic Programming, Stack, Greedy
- **Function Name**: `checkValidString`
- **Parameters**: `s: String`
- **Return Type**: `bool`
- **Description**: Given a string `s` containing only `'('`, `')'` and `'*'`, return `true` if `s` is valid. `*` can be treated as `'('`, `')'`, or empty string `""`.
```markdown
Problem Name: "Valid Parenthesis String"
Difficulty: MEDIUM
Topics: String, Dynamic Programming, Greedy
Function Name: checkValidString

Input Structure:
Input Field: String s

Output Structure:
Output Field: bool result
```


## 16. Intervals

### 130. Insert Interval
- **Slug**: `insert-interval`
- **Difficulty**: MEDIUM
- **Topics**: Array
- **Function Name**: `insert`
- **Parameters**: `intervals: list<list<int>>`, `newInterval: list<int>`
- **Return Type**: `list<list<int>>`
- **Description**: You are given an array of non-overlapping intervals sorted in ascending order by start point. Insert `newInterval` into `intervals` such that intervals remain sorted and non-overlapping (merge if necessary).
```markdown
Problem Name: "Insert Interval"
Difficulty: MEDIUM
Topics: Array, Intervals
Function Name: insert

Input Structure:
Input Field: list<list<int>> intervals
Input Field: list<int> newInterval

Output Structure:
Output Field: list<list<int>> result
```

### 131. Merge Intervals
- **Slug**: `merge-intervals`
- **Difficulty**: MEDIUM
- **Topics**: Array, Sorting
- **Function Name**: `merge`
- **Parameters**: `intervals: list<list<int>>`
- **Return Type**: `list<list<int>>`
- **Description**: Given an array of intervals, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
```markdown
Problem Name: "Merge Intervals"
Difficulty: MEDIUM
Topics: Array, Sorting, Intervals
Function Name: merge

Input Structure:
Input Field: list<list<int>> intervals

Output Structure:
Output Field: list<list<int>> result
```

### 132. Non-overlapping Intervals
- **Slug**: `non-overlapping-intervals`
- **Difficulty**: MEDIUM
- **Topics**: Array, Dynamic Programming, Greedy, Sorting
- **Function Name**: `eraseOverlapIntervals`
- **Parameters**: `intervals: list<list<int>>`
- **Return Type**: `int`
- **Description**: Given an array of intervals `intervals`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.
```markdown
Problem Name: "Non-overlapping Intervals"
Difficulty: MEDIUM
Topics: Array, Greedy, Sorting, Intervals
Function Name: eraseOverlapIntervals

Input Structure:
Input Field: list<list<int>> intervals

Output Structure:
Output Field: int result
```

### 133. Meeting Rooms
- **Slug**: `meeting-rooms`
- **Difficulty**: EASY
- **Topics**: Array, Sorting
- **Function Name**: `canAttendMeetings`
- **Parameters**: `intervals: list<list<int>>`
- **Return Type**: `bool`
- **Description**: Given an array of meeting time intervals consisting of start and end times `[[s1,e1],[s2,e2],...]`, determine if a person could attend all meetings.
```markdown
Problem Name: "Meeting Rooms"
Difficulty: EASY
Topics: Array, Sorting, Intervals
Function Name: canAttendMeetings

Input Structure:
Input Field: list<list<int>> intervals

Output Structure:
Output Field: bool result
```

### 134. Meeting Rooms II
- **Slug**: `meeting-rooms-ii`
- **Difficulty**: MEDIUM
- **Topics**: Array, Two Pointers, Greedy, Sorting, Heap, Prefix Sum
- **Function Name**: `minMeetingRooms`
- **Parameters**: `intervals: list<list<int>>`
- **Return Type**: `int`
- **Description**: Given an array of meeting time intervals consisting of start and end times `[[s1,e1],[s2,e2],...]`, find the minimum number of conference rooms required.
```markdown
Problem Name: "Meeting Rooms II"
Difficulty: MEDIUM
Topics: Array, Sorting, Heap, Intervals
Function Name: minMeetingRooms

Input Structure:
Input Field: list<list<int>> intervals

Output Structure:
Output Field: int result
```

### 135. Minimum Interval to Include Each Query
- **Slug**: `minimum-interval-to-include-each-query`
- **Difficulty**: HARD
- **Topics**: Array, Binary Search, Line Sweep, Sorting, Heap
- **Function Name**: `minInterval`
- **Parameters**: `intervals: list<list<int>>`, `queries: list<int>`
- **Return Type**: `list<int>`
- **Description**: Return an array containing answers to queries where the answer to query `j` is the size of the smallest interval `i` such that `lefti <= queries[j] <= righti`. Return `-1` if no interval contains it.
```markdown
Problem Name: "Minimum Interval to Include Each Query"
Difficulty: HARD
Topics: Array, Sorting, Heap, Intervals
Function Name: minInterval

Input Structure:
Input Field: list<list<int>> intervals
Input Field: list<int> queries

Output Structure:
Output Field: list<int> result
```


## 17. Math and Geometry

### 136. Rotate Image
- **Slug**: `rotate-image`
- **Difficulty**: MEDIUM
- **Topics**: Array, Math, Matrix
- **Function Name**: `rotate`
- **Parameters**: `matrix: list<list<int>>`
- **Return Type**: `list<list<int>>`
- **Description**: You are given an `n x n` 2D matrix representing an image, rotate the image by 90 degrees (clockwise) in-place.
```markdown
Problem Name: "Rotate Image"
Difficulty: MEDIUM
Topics: Array, Math, Matrix
Function Name: rotate

Input Structure:
Input Field: list<list<int>> matrix

Output Structure:
Output Field: list<list<int>> result
```

### 137. Spiral Matrix
- **Slug**: `spiral-matrix`
- **Difficulty**: MEDIUM
- **Topics**: Array, Matrix, Simulation
- **Function Name**: `spiralOrder`
- **Parameters**: `matrix: list<list<int>>`
- **Return Type**: `list<int>`
- **Description**: Given an `m x n` matrix, return all elements of the matrix in spiral order.
```markdown
Problem Name: "Spiral Matrix"
Difficulty: MEDIUM
Topics: Array, Matrix, Simulation
Function Name: spiralOrder

Input Structure:
Input Field: list<list<int>> matrix

Output Structure:
Output Field: list<int> result
```

### 138. Set Matrix Zeroes
- **Slug**: `set-matrix-zeroes`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Matrix
- **Function Name**: `setZeroes`
- **Parameters**: `matrix: list<list<int>>`
- **Return Type**: `list<list<int>>`
- **Description**: Given an `m x n` integer matrix, if an element is 0, set its entire row and column to 0's in-place with O(1) space.
```markdown
Problem Name: "Set Matrix Zeroes"
Difficulty: MEDIUM
Topics: Array, Hash Table, Matrix
Function Name: setZeroes

Input Structure:
Input Field: list<list<int>> matrix

Output Structure:
Output Field: list<list<int>> result
```

### 139. Happy Number
- **Slug**: `happy-number`
- **Difficulty**: EASY
- **Topics**: Hash Table, Math, Two Pointers
- **Function Name**: `isHappy`
- **Parameters**: `n: int`
- **Return Type**: `bool`
- **Description**: Write an algorithm to determine if a number `n` is happy. A happy number reaches 1 when replaced repeatedly by sum of squares of its digits.
```markdown
Problem Name: "Happy Number"
Difficulty: EASY
Topics: Hash Table, Math, Two Pointers
Function Name: isHappy

Input Structure:
Input Field: int n

Output Structure:
Output Field: bool result
```

### 140. Plus One
- **Slug**: `plus-one`
- **Difficulty**: EASY
- **Topics**: Array, Math
- **Function Name**: `plusOne`
- **Parameters**: `digits: list<int>`
- **Return Type**: `list<int>`
- **Description**: You are given a large integer represented as an integer array `digits`. Increment the large integer by one and return the resulting array of digits.
```markdown
Problem Name: "Plus One"
Difficulty: EASY
Topics: Array, Math
Function Name: plusOne

Input Structure:
Input Field: list<int> digits

Output Structure:
Output Field: list<int> result
```

### 141. Pow(x, n)
- **Slug**: `my-pow`
- **Difficulty**: MEDIUM
- **Topics**: Math, Recursion
- **Function Name**: `myPow`
- **Parameters**: `x: double`, `n: int`
- **Return Type**: `double`
- **Description**: Implement `pow(x, n)`, which calculates `x` raised to the power `n` ($x^n$) in O(log n) time.
```markdown
Problem Name: "Pow(x, n)"
Difficulty: MEDIUM
Topics: Math, Recursion
Function Name: myPow

Input Structure:
Input Field: double x
Input Field: int n

Output Structure:
Output Field: double result
```

### 142. Multiply Strings
- **Slug**: `multiply-strings`
- **Difficulty**: MEDIUM
- **Topics**: Math, String, Simulation
- **Function Name**: `multiply`
- **Parameters**: `num1: String`, `num2: String`
- **Return Type**: `String`
- **Description**: Given two non-negative integers `num1` and `num2` represented as strings, return the product of `num1` and `num2`, also represented as a string without using built-in BigInteger libraries.
```markdown
Problem Name: "Multiply Strings"
Difficulty: MEDIUM
Topics: Math, String, Simulation
Function Name: multiply

Input Structure:
Input Field: String num1
Input Field: String num2

Output Structure:
Output Field: String result
```

### 143. Detect Squares
- **Slug**: `detect-squares`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Math, Geometry, Design, Counting
- **Function Name**: `detectSquaresOperations`
- **Parameters**: `operations: list<String>`, `points: list<list<int>>`
- **Return Type**: `list<int>`
- **Description**: You are given a stream of points on the X-Y plane. Implement `add(point)` and `count(point)` to count the number of ways to choose three points from the data structure such that the three points and the query point form an axis-aligned square with positive area.
```markdown
Problem Name: "Detect Squares"
Difficulty: MEDIUM
Topics: Hash Table, Geometry, Design
Function Name: detectSquaresOperations

Input Structure:
Input Field: list<String> operations
Input Field: list<list<int>> points

Output Structure:
Output Field: list<int> result
```


## 18. Bit Manipulation

### 144. Single Number
- **Slug**: `single-number`
- **Difficulty**: EASY
- **Topics**: Array, Bit Manipulation
- **Function Name**: `singleNumber`
- **Parameters**: `nums: list<int>`
- **Return Type**: `int`
- **Description**: Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one in linear runtime complexity and constant extra space.
```markdown
Problem Name: "Single Number"
Difficulty: EASY
Topics: Array, Bit Manipulation
Function Name: singleNumber

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
```

### 145. Number of 1 Bits
- **Slug**: `number-of-1-bits`
- **Difficulty**: EASY
- **Topics**: Divide and Conquer, Bit Manipulation
- **Function Name**: `hammingWeight`
- **Parameters**: `n: int`
- **Return Type**: `int`
- **Description**: Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).
```markdown
Problem Name: "Number of 1 Bits"
Difficulty: EASY
Topics: Bit Manipulation
Function Name: hammingWeight

Input Structure:
Input Field: int n

Output Structure:
Output Field: int result
```

### 146. Counting Bits
- **Slug**: `counting-bits`
- **Difficulty**: EASY
- **Topics**: Dynamic Programming, Bit Manipulation
- **Function Name**: `countBits`
- **Parameters**: `n: int`
- **Return Type**: `list<int>`
- **Description**: Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (`0 <= i <= n`), `ans[i]` is the number of `1`'s in the binary representation of `i`.
```markdown
Problem Name: "Counting Bits"
Difficulty: EASY
Topics: Dynamic Programming, Bit Manipulation
Function Name: countBits

Input Structure:
Input Field: int n

Output Structure:
Output Field: list<int> result
```

### 147. Reverse Bits
- **Slug**: `reverse-bits`
- **Difficulty**: EASY
- **Topics**: Divide and Conquer, Bit Manipulation
- **Function Name**: `reverseBits`
- **Parameters**: `n: int`
- **Return Type**: `int`
- **Description**: Reverse bits of a given 32 bits unsigned integer.
```markdown
Problem Name: "Reverse Bits"
Difficulty: EASY
Topics: Bit Manipulation
Function Name: reverseBits

Input Structure:
Input Field: int n

Output Structure:
Output Field: int result
```

### 148. Missing Number
- **Slug**: `missing-number`
- **Difficulty**: EASY
- **Topics**: Array, Hash Table, Math, Binary Search, Bit Manipulation, Sorting
- **Function Name**: `missingNumber`
- **Parameters**: `nums: list<int>`
- **Return Type**: `int`
- **Description**: Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.
```markdown
Problem Name: "Missing Number"
Difficulty: EASY
Topics: Array, Math, Bit Manipulation
Function Name: missingNumber

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
```

### 149. Sum of Two Integers
- **Slug**: `get-sum`
- **Difficulty**: MEDIUM
- **Topics**: Math, Bit Manipulation
- **Function Name**: `getSum`
- **Parameters**: `a: int`, `b: int`
- **Return Type**: `int`
- **Description**: Given two integers `a` and `b`, return the sum of the two integers without using the operators `+` and `-`.
```markdown
Problem Name: "Sum of Two Integers"
Difficulty: MEDIUM
Topics: Math, Bit Manipulation
Function Name: getSum

Input Structure:
Input Field: int a
Input Field: int b

Output Structure:
Output Field: int result
```

### 150. Reverse Integer
- **Slug**: `reverse-integer`
- **Difficulty**: MEDIUM
- **Topics**: Math
- **Function Name**: `reverse`
- **Parameters**: `x: int`
- **Return Type**: `int`
- **Description**: Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-2^31, 2^31 - 1]`, then return 0.
```markdown
Problem Name: "Reverse Integer"
Difficulty: MEDIUM
Topics: Math
Function Name: reverse

Input Structure:
Input Field: int x

Output Structure:
Output Field: int result
```


## 19. Fixed-Size Sliding Window

### 151. Maximum Average Subarray I
- **Slug**: `maximum-average-subarray-i`
- **Difficulty**: EASY
- **Topics**: Array, Sliding Window
- **Function Name**: `findMaxAverage`
- **Parameters**: `nums: list<int>`, `k: int`
- **Return Type**: `double`
- **Description**: Find a contiguous subarray whose length is equal to `k` that has the maximum average value and return this value.
```markdown
Problem Name: "Maximum Average Subarray I"
Difficulty: EASY
Topics: Array, Sliding Window
Function Name: findMaxAverage

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: double result
```

### 152. Maximum Sum Subarray of Size K
- **Slug**: `max-sum-subarray-of-size-k`
- **Difficulty**: EASY
- **Topics**: Array, Sliding Window
- **Function Name**: `maximumSumSubarray`
- **Parameters**: `k: int`, `arr: list<int>`
- **Return Type**: `long`
- **Description**: Given an array of integers `arr` and a number `k`, find the maximum sum of a subarray of size `k`.
```markdown
Problem Name: "Maximum Sum Subarray of Size K"
Difficulty: EASY
Topics: Array, Sliding Window
Function Name: maximumSumSubarray

Input Structure:
Input Field: int k
Input Field: list<int> arr

Output Structure:
Output Field: long result
```

### 153. Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold
- **Slug**: `number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold`
- **Difficulty**: MEDIUM
- **Topics**: Array, Sliding Window
- **Function Name**: `numOfSubarrays`
- **Parameters**: `arr: list<int>`, `k: int`, `threshold: int`
- **Return Type**: `int`
- **Description**: Given an array of integers `arr` and two integers `k` and `threshold`, return the number of sub-arrays of size `k` and average greater than or equal to `threshold`.
```markdown
Problem Name: "Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold"
Difficulty: MEDIUM
Topics: Array, Sliding Window
Function Name: numOfSubarrays

Input Structure:
Input Field: list<int> arr
Input Field: int k
Input Field: int threshold

Output Structure:
Output Field: int result
```

### 154. Maximum Number of Vowels in a Substring of Given Length
- **Slug**: `maximum-number-of-vowels-in-a-substring-of-given-length`
- **Difficulty**: MEDIUM
- **Topics**: String, Sliding Window
- **Function Name**: `maxVowels`
- **Parameters**: `s: String`, `k: int`
- **Return Type**: `int`
- **Description**: Given a string `s` and an integer `k`, return the maximum number of vowel letters in any substring of `s` with length `k`.
```markdown
Problem Name: "Maximum Number of Vowels in a Substring of Given Length"
Difficulty: MEDIUM
Topics: String, Sliding Window
Function Name: maxVowels

Input Structure:
Input Field: String s
Input Field: int k

Output Structure:
Output Field: int result
```

### 155. Minimum Recolors to Get K Consecutive Black Blocks
- **Slug**: `minimum-recolors-to-get-k-consecutive-black-blocks`
- **Difficulty**: EASY
- **Topics**: String, Sliding Window
- **Function Name**: `minimumRecolors`
- **Parameters**: `blocks: String`, `k: int`
- **Return Type**: `int`
- **Description**: You are given a string `blocks` of length `n` containing `'W'` and `'B'`. Return the minimum number of operations needed such that there is at least one occurrence of `k` consecutive black blocks.
```markdown
Problem Name: "Minimum Recolors to Get K Consecutive Black Blocks"
Difficulty: EASY
Topics: String, Sliding Window
Function Name: minimumRecolors

Input Structure:
Input Field: String blocks
Input Field: int k

Output Structure:
Output Field: int result
```

### 156. First Negative Integer in Every Window of Size K
- **Slug**: `first-negative-integer-in-every-window-of-size-k`
- **Difficulty**: EASY
- **Topics**: Array, Queue, Sliding Window
- **Function Name**: `firstNegative`
- **Parameters**: `arr: list<int>`, `k: int`
- **Return Type**: `list<int>`
- **Description**: Given an array `arr` and a positive integer `k`, find the first negative integer for each and every contiguous window of size `k`. If a window does not contain a negative integer, then return 0 for that window.
```markdown
Problem Name: "First Negative Integer in Every Window of Size K"
Difficulty: EASY
Topics: Array, Queue, Sliding Window
Function Name: firstNegative

Input Structure:
Input Field: list<int> arr
Input Field: int k

Output Structure:
Output Field: list<int> result
```

### 157. Count Distinct Elements in Every Window
- **Slug**: `count-distinct-elements-in-every-window`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Sliding Window
- **Function Name**: `countDistinct`
- **Parameters**: `arr: list<int>`, `k: int`
- **Return Type**: `list<int>`
- **Description**: Given an integer array `arr` and a number `k`, find the count of distinct elements in every window of size `k` in the array.
```markdown
Problem Name: "Count Distinct Elements in Every Window"
Difficulty: MEDIUM
Topics: Array, Hash Table, Sliding Window
Function Name: countDistinct

Input Structure:
Input Field: list<int> arr
Input Field: int k

Output Structure:
Output Field: list<int> result
```

### 158. Maximum Sum of Distinct Subarrays With Length K
- **Slug**: `maximum-sum-of-distinct-subarrays-with-length-k`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Sliding Window
- **Function Name**: `maximumSubarraySum`
- **Parameters**: `nums: list<int>`, `k: int`
- **Return Type**: `long`
- **Description**: Return the maximum subarray sum of all the subarrays of `nums` that meet the following conditions: the length of the subarray is `k`, and all elements are distinct. Return 0 if none meet the condition.
```markdown
Problem Name: "Maximum Sum of Distinct Subarrays With Length K"
Difficulty: MEDIUM
Topics: Array, Hash Table, Sliding Window
Function Name: maximumSubarraySum

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: long result
```

### 159. Maximum Sum of Almost Unique Subarray
- **Slug**: `maximum-sum-of-almost-unique-subarray`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Sliding Window
- **Function Name**: `maxSum`
- **Parameters**: `nums: list<int>`, `m: int`, `k: int`
- **Return Type**: `long`
- **Description**: Given an integer array `nums` and two positive integers `m` and `k`, return the maximum almost unique subarray sum (length `k` with at least `m` distinct elements). Return 0 if none.
```markdown
Problem Name: "Maximum Sum of Almost Unique Subarray"
Difficulty: MEDIUM
Topics: Array, Hash Table, Sliding Window
Function Name: maxSum

Input Structure:
Input Field: list<int> nums
Input Field: int m
Input Field: int k

Output Structure:
Output Field: long result
```

### 160. Find the K-Beauty of a Number
- **Slug**: `find-the-k-beauty-of-a-number`
- **Difficulty**: EASY
- **Topics**: Math, String, Sliding Window
- **Function Name**: `divisorSubstrings`
- **Parameters**: `num: int`, `k: int`
- **Return Type**: `int`
- **Description**: The k-beauty of an integer `num` is the number of substrings of `num` when read as a string of length `k` that meet: it is a divisor of `num` (and non-zero).
```markdown
Problem Name: "Find the K-Beauty of a Number"
Difficulty: EASY
Topics: Math, String, Sliding Window
Function Name: divisorSubstrings

Input Structure:
Input Field: int num
Input Field: int k

Output Structure:
Output Field: int result
```

### 161. Find K-Length Substrings With No Repeated Characters
- **Slug**: `find-k-length-substrings-with-no-repeated-characters`
- **Difficulty**: MEDIUM
- **Topics**: Hash Table, String, Sliding Window
- **Function Name**: `numKLenSubstrNoRepeats`
- **Parameters**: `s: String`, `k: int`
- **Return Type**: `int`
- **Description**: Given a string `s` and an integer `k`, return the number of substrings in `s` of length `k` with no repeated characters.
```markdown
Problem Name: "Find K-Length Substrings With No Repeated Characters"
Difficulty: MEDIUM
Topics: Hash Table, String, Sliding Window
Function Name: numKLenSubstrNoRepeats

Input Structure:
Input Field: String s
Input Field: int k

Output Structure:
Output Field: int result
```

### 162. Find All Anagrams in a String
- **Slug**: `find-all-anagrams-in-a-string`
- **Difficulty**: MEDIUM
- **Topics**: Hash Table, String, Sliding Window
- **Function Name**: `findAnagrams`
- **Parameters**: `s: String`, `p: String`
- **Return Type**: `list<int>`
- **Description**: Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`.
```markdown
Problem Name: "Find All Anagrams in a String"
Difficulty: MEDIUM
Topics: Hash Table, String, Sliding Window
Function Name: findAnagrams

Input Structure:
Input Field: String s
Input Field: String p

Output Structure:
Output Field: list<int> result
```

### 163. K Radius Subarray Averages
- **Slug**: `k-radius-subarray-averages`
- **Difficulty**: MEDIUM
- **Topics**: Array, Sliding Window, Prefix Sum
- **Function Name**: `getAverages`
- **Parameters**: `nums: list<int>`, `k: int`
- **Return Type**: `list<int>`
- **Description**: Return an array `avgs` of length `n` where `avgs[i]` is the k-radius average for the subarray centered at index `i`. If there are less than `k` elements before or after index `i`, then `avgs[i] = -1`.
```markdown
Problem Name: "K Radius Subarray Averages"
Difficulty: MEDIUM
Topics: Array, Sliding Window, Prefix Sum
Function Name: getAverages

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: list<int> result
```

### 164. Grumpy Bookstore Owner
- **Slug**: `grumpy-bookstore-owner`
- **Difficulty**: MEDIUM
- **Topics**: Array, Sliding Window
- **Function Name**: `maxSatisfied`
- **Parameters**: `customers: list<int>`, `grumpy: list<int>`, `minutes: int`
- **Return Type**: `int`
- **Description**: Return the maximum number of customers that can be satisfied throughout the day by using your secret technique to stay not grumpy for `minutes` consecutive minutes.
```markdown
Problem Name: "Grumpy Bookstore Owner"
Difficulty: MEDIUM
Topics: Array, Sliding Window
Function Name: maxSatisfied

Input Structure:
Input Field: list<int> customers
Input Field: list<int> grumpy
Input Field: int minutes

Output Structure:
Output Field: int result
```

### 165. Maximum Points You Can Obtain from Cards
- **Slug**: `maximum-points-you-can-obtain-from-cards`
- **Difficulty**: MEDIUM
- **Topics**: Array, Sliding Window, Prefix Sum
- **Function Name**: `maxScore`
- **Parameters**: `cardPoints: list<int>`, `k: int`
- **Return Type**: `int`
- **Description**: There are several cards arranged in a row. In one step, you can take one card from the beginning or from the end of the row. Return the maximum score you can obtain by taking `k` cards.
```markdown
Problem Name: "Maximum Points You Can Obtain from Cards"
Difficulty: MEDIUM
Topics: Array, Sliding Window, Prefix Sum
Function Name: maxScore

Input Structure:
Input Field: list<int> cardPoints
Input Field: int k

Output Structure:
Output Field: int result
```

### 166. Defuse the Bomb
- **Slug**: `defuse-the-bomb`
- **Difficulty**: EASY
- **Topics**: Array, Sliding Window
- **Function Name**: `decrypt`
- **Parameters**: `code: list<int>`, `k: int`
- **Return Type**: `list<int>`
- **Description**: Replace each number with the sum of the next `k` numbers (if `k > 0`) or previous `|k|` numbers (if `k < 0`) in circular array `code`. If `k == 0`, replace with 0.
```markdown
Problem Name: "Defuse the Bomb"
Difficulty: EASY
Topics: Array, Sliding Window
Function Name: decrypt

Input Structure:
Input Field: list<int> code
Input Field: int k

Output Structure:
Output Field: list<int> result
```

### 167. Maximum of All Subarrays of Size K
- **Slug**: `maximum-of-all-subarrays-of-size-k`
- **Difficulty**: MEDIUM
- **Topics**: Array, Queue, Sliding Window, Monotonic Deque
- **Function Name**: `max_of_subarrays`
- **Parameters**: `arr: list<int>`, `k: int`
- **Return Type**: `list<int>`
- **Description**: Given an array `arr` and an integer `k`, find the maximum element for each and every contiguous subarray of size `k`.
```markdown
Problem Name: "Maximum of All Subarrays of Size K"
Difficulty: MEDIUM
Topics: Array, Queue, Sliding Window, Monotonic Deque
Function Name: max_of_subarrays

Input Structure:
Input Field: list<int> arr
Input Field: int k

Output Structure:
Output Field: list<int> result
```

### 168. Diet Plan Performance
- **Slug**: `diet-plan-performance`
- **Difficulty**: EASY
- **Topics**: Array, Sliding Window
- **Function Name**: `dietPlanPerformance`
- **Parameters**: `calories: list<int>`, `k: int`, `lower: int`, `upper: int`
- **Return Type**: `int`
- **Description**: Calculate points based on `k` consecutive days' calorie consumption: +1 point if sum > upper, -1 point if sum < lower, 0 otherwise.
```markdown
Problem Name: "Diet Plan Performance"
Difficulty: EASY
Topics: Array, Sliding Window
Function Name: dietPlanPerformance

Input Structure:
Input Field: list<int> calories
Input Field: int k
Input Field: int lower
Input Field: int upper

Output Structure:
Output Field: int result
```


## 20. Variable-Size Sliding Window

### 169. Minimum Size Subarray Sum
- **Slug**: `minimum-size-subarray-sum`
- **Difficulty**: MEDIUM
- **Topics**: Array, Binary Search, Sliding Window, Prefix Sum
- **Function Name**: `minSubArrayLen`
- **Parameters**: `target: int`, `nums: list<int>`
- **Return Type**: `int`
- **Description**: Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a subarray whose sum is greater than or equal to `target`. If none, return 0.
```markdown
Problem Name: "Minimum Size Subarray Sum"
Difficulty: MEDIUM
Topics: Array, Binary Search, Sliding Window
Function Name: minSubArrayLen

Input Structure:
Input Field: int target
Input Field: list<int> nums

Output Structure:
Output Field: int result
```

### 170. Fruit Into Baskets
- **Slug**: `fruit-into-baskets`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Sliding Window
- **Function Name**: `totalFruit`
- **Parameters**: `fruits: list<int>`
- **Return Type**: `int`
- **Description**: You only have two baskets, and each basket can only hold a single type of fruit. Return the maximum number of fruits you can pick from a contiguous subarray.
```markdown
Problem Name: "Fruit Into Baskets"
Difficulty: MEDIUM
Topics: Array, Hash Table, Sliding Window
Function Name: totalFruit

Input Structure:
Input Field: list<int> fruits

Output Structure:
Output Field: int result
```

### 171. Longest Substring with At Most K Distinct Characters
- **Slug**: `longest-substring-with-at-most-k-distinct-characters`
- **Difficulty**: MEDIUM
- **Topics**: Hash Table, String, Sliding Window
- **Function Name**: `lengthOfLongestSubstringKDistinct`
- **Parameters**: `s: String`, `k: int`
- **Return Type**: `int`
- **Description**: Given a string `s` and an integer `k`, return the length of the longest substring of `s` that contains at most `k` distinct characters.
```markdown
Problem Name: "Longest Substring with At Most K Distinct Characters"
Difficulty: MEDIUM
Topics: Hash Table, String, Sliding Window
Function Name: lengthOfLongestSubstringKDistinct

Input Structure:
Input Field: String s
Input Field: int k

Output Structure:
Output Field: int result
```

### 172. Max Consecutive Ones III
- **Slug**: `max-consecutive-ones-iii`
- **Difficulty**: MEDIUM
- **Topics**: Array, Binary Search, Sliding Window, Prefix Sum
- **Function Name**: `longestOnes`
- **Parameters**: `nums: list<int>`, `k: int`
- **Return Type**: `int`
- **Description**: Given a binary array `nums` and an integer `k`, return the maximum number of consecutive 1's in the array if you can flip at most `k` 0's.
```markdown
Problem Name: "Max Consecutive Ones III"
Difficulty: MEDIUM
Topics: Array, Sliding Window, Prefix Sum
Function Name: longestOnes

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: int result
```

### 173. Longest Subarray of 1's After Deleting One Element
- **Slug**: `longest-subarray-of-1s-after-deleting-one-element`
- **Difficulty**: MEDIUM
- **Topics**: Array, Dynamic Programming, Sliding Window
- **Function Name**: `longestSubarray`
- **Parameters**: `nums: list<int>`
- **Return Type**: `int`
- **Description**: Given a binary array `nums`, you should delete one element from it. Return the size of the longest non-empty subarray containing only 1's in the resulting array.
```markdown
Problem Name: "Longest Subarray of 1's After Deleting One Element"
Difficulty: MEDIUM
Topics: Array, Sliding Window
Function Name: longestSubarray

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
```

### 174. Maximum Erasure Value
- **Slug**: `maximum-erasure-value`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Sliding Window
- **Function Name**: `maximumUniqueSubarray`
- **Parameters**: `nums: list<int>`
- **Return Type**: `int`
- **Description**: Return the maximum score you can get by erasing exactly one subarray containing unique elements (the score is the sum of its elements).
```markdown
Problem Name: "Maximum Erasure Value"
Difficulty: MEDIUM
Topics: Array, Hash Table, Sliding Window
Function Name: maximumUniqueSubarray

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
```

### 175. Subarray Product Less Than K
- **Slug**: `subarray-product-less-than-k`
- **Difficulty**: MEDIUM
- **Topics**: Array, Sliding Window
- **Function Name**: `numSubarrayProductLessThanK`
- **Parameters**: `nums: list<int>`, `k: int`
- **Return Type**: `int`
- **Description**: Given an array of integers `nums` and an integer `k`, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than `k`.
```markdown
Problem Name: "Subarray Product Less Than K"
Difficulty: MEDIUM
Topics: Array, Sliding Window
Function Name: numSubarrayProductLessThanK

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: int result
```

### 176. Number of Substrings Containing All Three Characters
- **Slug**: `number-of-substrings-containing-all-three-characters`
- **Difficulty**: MEDIUM
- **Topics**: Hash Table, String, Sliding Window
- **Function Name**: `numberOfSubstrings`
- **Parameters**: `s: String`
- **Return Type**: `int`
- **Description**: Given a string `s` consisting only of characters a, b and c, return the number of substrings containing at least one occurrence of all these characters a, b and c.
```markdown
Problem Name: "Number of Substrings Containing All Three Characters"
Difficulty: MEDIUM
Topics: Hash Table, String, Sliding Window
Function Name: numberOfSubstrings

Input Structure:
Input Field: String s

Output Structure:
Output Field: int result
```

### 177. Count Subarrays Where Max Element Appears at Least K Times
- **Slug**: `count-subarrays-where-max-element-appears-at-least-k-times`
- **Difficulty**: MEDIUM
- **Topics**: Array, Sliding Window
- **Function Name**: `countSubarrays`
- **Parameters**: `nums: list<int>`, `k: int`
- **Return Type**: `long`
- **Description**: Return the number of subarrays where the maximum element of `nums` appears at least `k` times in that subarray.
```markdown
Problem Name: "Count Subarrays Where Max Element Appears at Least K Times"
Difficulty: MEDIUM
Topics: Array, Sliding Window
Function Name: countSubarrays

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: long result
```

### 178. Subarrays with K Different Integers
- **Slug**: `subarrays-with-k-different-integers`
- **Difficulty**: HARD
- **Topics**: Array, Hash Table, Sliding Window, Counting
- **Function Name**: `subarraysWithKDistinct`
- **Parameters**: `nums: list<int>`, `k: int`
- **Return Type**: `int`
- **Description**: Given an integer array `nums` and an integer `k`, return the number of good subarrays of `nums`. A good array is an array where the number of different integers in that array is exactly `k`.
```markdown
Problem Name: "Subarrays with K Different Integers"
Difficulty: HARD
Topics: Array, Hash Table, Sliding Window
Function Name: subarraysWithKDistinct

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: int result
```

### 179. Count Number of Nice Subarrays
- **Slug**: `count-number-of-nice-subarrays`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Math, Sliding Window
- **Function Name**: `numberOfSubarrays`
- **Parameters**: `nums: list<int>`, `k: int`
- **Return Type**: `int`
- **Description**: Given an array of integers `nums` and an integer `k`. A continuous subarray is called nice if there are `k` odd numbers on it. Return the number of nice sub-arrays.
```markdown
Problem Name: "Count Number of Nice Subarrays"
Difficulty: MEDIUM
Topics: Array, Hash Table, Sliding Window
Function Name: numberOfSubarrays

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: int result
```

### 180. Binary Subarrays With Sum
- **Slug**: `binary-subarrays-with-sum`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Sliding Window, Prefix Sum
- **Function Name**: `numSubarraysWithSum`
- **Parameters**: `nums: list<int>`, `goal: int`
- **Return Type**: `int`
- **Description**: Given a binary array `nums` and an integer `goal`, return the number of non-empty subarrays with a sum equal to `goal`.
```markdown
Problem Name: "Binary Subarrays With Sum"
Difficulty: MEDIUM
Topics: Array, Hash Table, Sliding Window, Prefix Sum
Function Name: numSubarraysWithSum

Input Structure:
Input Field: list<int> nums
Input Field: int goal

Output Structure:
Output Field: int result
```

### 181. Smallest Window in a String Containing All Characters of Another String
- **Slug**: `smallest-window-in-a-string-containing-all-the-characters-of-another-string`
- **Difficulty**: HARD
- **Topics**: Hash Table, String, Sliding Window
- **Function Name**: `smallestWindow`
- **Parameters**: `s: String`, `p: String`
- **Return Type**: `String`
- **Description**: Given two strings `s` and `p`. Find the smallest window in string `s` consisting of all characters of string `p`.
```markdown
Problem Name: "Smallest Window in a String Containing All Characters of Another String"
Difficulty: HARD
Topics: Hash Table, String, Sliding Window
Function Name: smallestWindow

Input Structure:
Input Field: String s
Input Field: String p

Output Structure:
Output Field: String result
```

### 182. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit
- **Slug**: `longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit`
- **Difficulty**: MEDIUM
- **Topics**: Array, Queue, Sliding Window, Heap, Monotonic Queue
- **Function Name**: `longestSubarray`
- **Parameters**: `nums: list<int>`, `limit: int`
- **Return Type**: `int`
- **Description**: Return the size of the longest non-empty subarray such that the absolute difference between any two elements of this subarray is less than or equal to `limit`.
```markdown
Problem Name: "Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit"
Difficulty: MEDIUM
Topics: Array, Sliding Window, Monotonic Queue
Function Name: longestSubarray

Input Structure:
Input Field: list<int> nums
Input Field: int limit

Output Structure:
Output Field: int result
```

### 183. Take K of Each Character From Left and Right
- **Slug**: `take-k-of-each-character-from-left-and-right`
- **Difficulty**: MEDIUM
- **Topics**: Hash Table, String, Sliding Window
- **Function Name**: `takeCharacters`
- **Parameters**: `s: String`, `k: int`
- **Return Type**: `int`
- **Description**: You are given a string `s` consisting of 'a', 'b', and 'c' and a non-negative integer `k`. In each minute, you may take either the leftmost or rightmost character of `s`. Return minimum minutes to take at least `k` of each character.
```markdown
Problem Name: "Take K of Each Character From Left and Right"
Difficulty: MEDIUM
Topics: Hash Table, String, Sliding Window
Function Name: takeCharacters

Input Structure:
Input Field: String s
Input Field: int k

Output Structure:
Output Field: int result
```

### 184. Longest Sub-Array with Sum K
- **Slug**: `longest-sub-array-with-sum-k`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Prefix Sum
- **Function Name**: `lenOfLongSubarr`
- **Parameters**: `arr: list<int>`, `k: int`
- **Return Type**: `int`
- **Description**: Given an array `arr` containing integers (including negative numbers) and an integer `k`, find the length of the longest subarray with sum equal to `k`.
```markdown
Problem Name: "Longest Sub-Array with Sum K"
Difficulty: MEDIUM
Topics: Array, Hash Table, Prefix Sum
Function Name: lenOfLongSubarr

Input Structure:
Input Field: list<int> arr
Input Field: int k

Output Structure:
Output Field: int result
```


## 21. Prefix Sum

### 185. Range Sum Query - Immutable
- **Slug**: `range-sum-query-immutable`
- **Difficulty**: EASY
- **Topics**: Array, Design, Prefix Sum
- **Function Name**: `numArrayOperations`
- **Parameters**: `nums: list<int>`, `queries: list<list<int>>`
- **Return Type**: `list<int>`
- **Description**: Given an integer array `nums`, handle multiple queries of the sum of elements between indices `left` and `right` inclusive in O(1) query time.
```markdown
Problem Name: "Range Sum Query - Immutable"
Difficulty: EASY
Topics: Array, Design, Prefix Sum
Function Name: numArrayOperations

Input Structure:
Input Field: list<int> nums
Input Field: list<list<int>> queries

Output Structure:
Output Field: list<int> result
```

### 186. Range Sum Query 2D - Immutable
- **Slug**: `range-sum-query-2d-immutable`
- **Difficulty**: MEDIUM
- **Topics**: Array, Design, Matrix, Prefix Sum
- **Function Name**: `numMatrixOperations`
- **Parameters**: `matrix: list<list<int>>`, `queries: list<list<int>>`
- **Return Type**: `list<int>`
- **Description**: Given a 2D matrix, handle multiple queries of the sum of elements inside the rectangle defined by its upper-left and lower-right coordinates in O(1) time.
```markdown
Problem Name: "Range Sum Query 2D - Immutable"
Difficulty: MEDIUM
Topics: Array, Design, Matrix, Prefix Sum
Function Name: numMatrixOperations

Input Structure:
Input Field: list<list<int>> matrix
Input Field: list<list<int>> queries

Output Structure:
Output Field: list<int> result
```

### 187. Matrix Block Sum
- **Slug**: `matrix-block-sum`
- **Difficulty**: MEDIUM
- **Topics**: Array, Matrix, Prefix Sum
- **Function Name**: `matrixBlockSum`
- **Parameters**: `mat: list<list<int>>`, `k: int`
- **Return Type**: `list<list<int>>`
- **Description**: Given an `m x n` matrix `mat` and an integer `k`, return a matrix `answer` where each `answer[i][j]` is the sum of all elements `mat[r][c]` for `i - k <= r <= i + k, j - k <= c <= j + k`.
```markdown
Problem Name: "Matrix Block Sum"
Difficulty: MEDIUM
Topics: Array, Matrix, Prefix Sum
Function Name: matrixBlockSum

Input Structure:
Input Field: list<list<int>> mat
Input Field: int k

Output Structure:
Output Field: list<list<int>> result
```

### 188. Subarray Sum Equals K
- **Slug**: `subarray-sum-equals-k`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Prefix Sum
- **Function Name**: `subarraySum`
- **Parameters**: `nums: list<int>`, `k: int`
- **Return Type**: `int`
- **Description**: Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k` (supports negative numbers).
```markdown
Problem Name: "Subarray Sum Equals K"
Difficulty: MEDIUM
Topics: Array, Hash Table, Prefix Sum
Function Name: subarraySum

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: int result
```

### 189. Contiguous Array
- **Slug**: `contiguous-array`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Prefix Sum
- **Function Name**: `findMaxLength`
- **Parameters**: `nums: list<int>`
- **Return Type**: `int`
- **Description**: Given a binary array `nums`, return the maximum length of a contiguous subarray with an equal number of 0 and 1.
```markdown
Problem Name: "Contiguous Array"
Difficulty: MEDIUM
Topics: Array, Hash Table, Prefix Sum
Function Name: findMaxLength

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
```

### 190. Continuous Subarray Sum
- **Slug**: `continuous-subarray-sum`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Math, Prefix Sum
- **Function Name**: `checkSubarraySum`
- **Parameters**: `nums: list<int>`, `k: int`
- **Return Type**: `bool`
- **Description**: Given an integer array `nums` and an integer `k`, return `true` if `nums` has a good subarray of length at least two whose elements sum up to a multiple of `k`.
```markdown
Problem Name: "Continuous Subarray Sum"
Difficulty: MEDIUM
Topics: Array, Hash Table, Prefix Sum
Function Name: checkSubarraySum

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: bool result
```

### 191. Subarray Sums Divisible by K
- **Slug**: `subarray-sums-divisible-by-k`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Prefix Sum
- **Function Name**: `subarraysDivByK`
- **Parameters**: `nums: list<int>`, `k: int`
- **Return Type**: `int`
- **Description**: Given an integer array `nums` and an integer `k`, return the number of non-empty subarrays that have a sum divisible by `k`.
```markdown
Problem Name: "Subarray Sums Divisible by K"
Difficulty: MEDIUM
Topics: Array, Hash Table, Prefix Sum
Function Name: subarraysDivByK

Input Structure:
Input Field: list<int> nums
Input Field: int k

Output Structure:
Output Field: int result
```

### 192. Make Sum Divisible by P
- **Slug**: `make-sum-divisible-by-p`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Prefix Sum
- **Function Name**: `minSubarray`
- **Parameters**: `nums: list<int>`, `p: int`
- **Return Type**: `int`
- **Description**: Given an array of positive integers `nums`, remove the smallest subarray (possibly empty) such that the sum of the remaining elements is divisible by `p`. Return length of shortest subarray or -1.
```markdown
Problem Name: "Make Sum Divisible by P"
Difficulty: MEDIUM
Topics: Array, Hash Table, Prefix Sum
Function Name: minSubarray

Input Structure:
Input Field: list<int> nums
Input Field: int p

Output Structure:
Output Field: int result
```


## 22. Fast Two-Pointer and Array Patterns

### 193. Majority Element
- **Slug**: `majority-element`
- **Difficulty**: EASY
- **Topics**: Array, Hash Table, Divide and Conquer, Counting, Boyer-Moore Voting
- **Function Name**: `majorityElement`
- **Parameters**: `nums: list<int>`
- **Return Type**: `int`
- **Description**: Given an array `nums` of size `n`, return the majority element (the element that appears more than `⌊n / 2⌋` times) in O(1) space using Boyer-Moore Voting Algorithm.
```markdown
Problem Name: "Majority Element"
Difficulty: EASY
Topics: Array, Counting
Function Name: majorityElement

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
```

### 194. Majority Element II
- **Slug**: `majority-element-ii`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Counting, Sorting
- **Function Name**: `majorityElement`
- **Parameters**: `nums: list<int>`
- **Return Type**: `list<int>`
- **Description**: Given an integer array of size `n`, find all elements that appear more than `⌊n / 3⌋` times in O(n) time and O(1) space.
```markdown
Problem Name: "Majority Element II"
Difficulty: MEDIUM
Topics: Array, Counting
Function Name: majorityElement

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: list<int> result
```

### 195. Sort Colors
- **Slug**: `sort-colors`
- **Difficulty**: MEDIUM
- **Topics**: Array, Two Pointers, Sorting
- **Function Name**: `sortColors`
- **Parameters**: `nums: list<int>`
- **Return Type**: `list<int>`
- **Description**: Given an array `nums` with `n` objects colored red, white, or blue (0, 1, 2), sort them in-place so that objects of the same color are adjacent (Dutch National Flag Algorithm).
```markdown
Problem Name: "Sort Colors"
Difficulty: MEDIUM
Topics: Array, Two Pointers, Sorting
Function Name: sortColors

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: list<int> result
```

### 196. First Missing Positive
- **Slug**: `first-missing-positive`
- **Difficulty**: HARD
- **Topics**: Array, Hash Table
- **Function Name**: `firstMissingPositive`
- **Parameters**: `nums: list<int>`
- **Return Type**: `int`
- **Description**: Given an unsorted integer array `nums`, return the smallest positive integer that is not present in `nums` in O(n) time and O(1) auxiliary space.
```markdown
Problem Name: "First Missing Positive"
Difficulty: HARD
Topics: Array, Hash Table
Function Name: firstMissingPositive

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
```

### 197. Next Permutation
- **Slug**: `next-permutation`
- **Difficulty**: MEDIUM
- **Topics**: Array, Two Pointers
- **Function Name**: `nextPermutation`
- **Parameters**: `nums: list<int>`
- **Return Type**: `list<int>`
- **Description**: Rearrange numbers into the lexicographically next greater permutation of numbers in-place. If no such arrangement exists, rearrange it as the lowest possible order (sorted ascending).
```markdown
Problem Name: "Next Permutation"
Difficulty: MEDIUM
Topics: Array, Two Pointers
Function Name: nextPermutation

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: list<int> result
```

### 198. Next Greater Element II
- **Slug**: `next-greater-element-ii`
- **Difficulty**: MEDIUM
- **Topics**: Array, Stack, Monotonic Stack
- **Function Name**: `nextGreaterElements`
- **Parameters**: `nums: list<int>`
- **Return Type**: `list<int>`
- **Description**: Given a circular integer array `nums`, return the next greater number for every element in `nums`. The next greater number of a number `x` is the first greater number to its traversing-order next in the array.
```markdown
Problem Name: "Next Greater Element II"
Difficulty: MEDIUM
Topics: Array, Stack, Monotonic Stack
Function Name: nextGreaterElements

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: list<int> result
```

### 199. Candy
- **Slug**: `candy`
- **Difficulty**: HARD
- **Topics**: Array, Greedy
- **Function Name**: `candy`
- **Parameters**: `ratings: list<int>`
- **Return Type**: `int`
- **Description**: There are `n` children standing in a line. Each child is assigned a rating value. Each child must have at least one candy, and children with a higher rating get more candies than their neighbors. Return the minimum candies required.
```markdown
Problem Name: "Candy"
Difficulty: HARD
Topics: Array, Greedy
Function Name: candy

Input Structure:
Input Field: list<int> ratings

Output Structure:
Output Field: int result
```

### 200. Single Number II
- **Slug**: `single-number-ii`
- **Difficulty**: MEDIUM
- **Topics**: Array, Bit Manipulation
- **Function Name**: `singleNumber`
- **Parameters**: `nums: list<int>`
- **Return Type**: `int`
- **Description**: Given an integer array `nums` where every element appears three times except for one, which appears exactly once. Find the single element and return it in O(n) time and O(1) space.
```markdown
Problem Name: "Single Number II"
Difficulty: MEDIUM
Topics: Array, Bit Manipulation
Function Name: singleNumber

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
```

### 201. Remove Duplicate Letters
- **Slug**: `remove-duplicate-letters`
- **Difficulty**: MEDIUM
- **Topics**: String, Stack, Greedy, Monotonic Stack
- **Function Name**: `removeDuplicateLetters`
- **Parameters**: `s: String`
- **Return Type**: `String`
- **Description**: Given a string `s`, remove duplicate letters so that every letter appears once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.
```markdown
Problem Name: "Remove Duplicate Letters"
Difficulty: MEDIUM
Topics: String, Stack, Greedy, Monotonic Stack
Function Name: removeDuplicateLetters

Input Structure:
Input Field: String s

Output Structure:
Output Field: String result
```


## 23. Advanced Linked List

### 202. Middle of the Linked List
- **Slug**: `middle-of-the-linked-list`
- **Difficulty**: EASY
- **Topics**: Linked List, Two Pointers
- **Function Name**: `middleNode`
- **Parameters**: `head: list<int>`
- **Return Type**: `list<int>`
- **Description**: Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.
```markdown
Problem Name: "Middle of the Linked List"
Difficulty: EASY
Topics: Linked List, Two Pointers
Function Name: middleNode

Input Structure:
Input Field: list<int> head

Output Structure:
Output Field: list<int> result
```

### 203. Remove Linked List Elements
- **Slug**: `remove-linked-list-elements`
- **Difficulty**: EASY
- **Topics**: Linked List, Recursion
- **Function Name**: `removeElements`
- **Parameters**: `head: list<int>`, `val: int`
- **Return Type**: `list<int>`
- **Description**: Given the head of a linked list and an integer `val`, remove all the nodes of the linked list that has `Node.val == val`, and return the new head.
```markdown
Problem Name: "Remove Linked List Elements"
Difficulty: EASY
Topics: Linked List, Recursion
Function Name: removeElements

Input Structure:
Input Field: list<int> head
Input Field: int val

Output Structure:
Output Field: list<int> result
```

### 204. Delete Node in a Linked List
- **Slug**: `delete-node-in-a-linked-list`
- **Difficulty**: MEDIUM
- **Topics**: Linked List
- **Function Name**: `deleteNode`
- **Parameters**: `head: list<int>`, `nodeVal: int`
- **Return Type**: `list<int>`
- **Description**: Delete a node (except the tail) in a singly linked list, given only access to that node.
```markdown
Problem Name: "Delete Node in a Linked List"
Difficulty: MEDIUM
Topics: Linked List
Function Name: deleteNode

Input Structure:
Input Field: list<int> head
Input Field: int nodeVal

Output Structure:
Output Field: list<int> result
```

### 205. Linked List Cycle II
- **Slug**: `linked-list-cycle-ii`
- **Difficulty**: MEDIUM
- **Topics**: Hash Table, Linked List, Two Pointers
- **Function Name**: `detectCycle`
- **Parameters**: `head: list<int>`, `pos: int`
- **Return Type**: `int`
- **Description**: Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return -1.
```markdown
Problem Name: "Linked List Cycle II"
Difficulty: MEDIUM
Topics: Hash Table, Linked List, Two Pointers
Function Name: detectCycle

Input Structure:
Input Field: list<int> head
Input Field: int pos

Output Structure:
Output Field: int result
```

### 206. Intersection of Two Linked Lists
- **Slug**: `intersection-of-two-linked-lists`
- **Difficulty**: EASY
- **Topics**: Hash Table, Linked List, Two Pointers
- **Function Name**: `getIntersectionNode`
- **Parameters**: `intersectVal: int`, `listA: list<int>`, `listB: list<int>`, `skipA: int`, `skipB: int`
- **Return Type**: `int`
- **Description**: Given the heads of two singly linked-lists `headA` and `headB`, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.
```markdown
Problem Name: "Intersection of Two Linked Lists"
Difficulty: EASY
Topics: Hash Table, Linked List, Two Pointers
Function Name: getIntersectionNode

Input Structure:
Input Field: int intersectVal
Input Field: list<int> listA
Input Field: list<int> listB
Input Field: int skipA
Input Field: int skipB

Output Structure:
Output Field: int result
```

### 207. Palindrome Linked List
- **Slug**: `palindrome-linked-list`
- **Difficulty**: EASY
- **Topics**: Linked List, Two Pointers, Stack, Recursion
- **Function Name**: `isPalindrome`
- **Parameters**: `head: list<int>`
- **Return Type**: `bool`
- **Description**: Given the head of a singly linked list, return `true` if it is a palindrome or `false` otherwise in O(n) time and O(1) space.
```markdown
Problem Name: "Palindrome Linked List"
Difficulty: EASY
Topics: Linked List, Two Pointers
Function Name: isPalindrome

Input Structure:
Input Field: list<int> head

Output Structure:
Output Field: bool result
```

### 208. Reverse Linked List II
- **Slug**: `reverse-linked-list-ii`
- **Difficulty**: MEDIUM
- **Topics**: Linked List
- **Function Name**: `reverseBetween`
- **Parameters**: `head: list<int>`, `left: int`, `right: int`
- **Return Type**: `list<int>`
- **Description**: Given the head of a singly linked list and two integers `left` and `right` where `left <= right`, reverse the nodes of the list from position `left` to position `right`, and return the reversed list.
```markdown
Problem Name: "Reverse Linked List II"
Difficulty: MEDIUM
Topics: Linked List
Function Name: reverseBetween

Input Structure:
Input Field: list<int> head
Input Field: int left
Input Field: int right

Output Structure:
Output Field: list<int> result
```

### 209. Swap Nodes in Pairs
- **Slug**: `swap-nodes-in-pairs`
- **Difficulty**: MEDIUM
- **Topics**: Linked List, Recursion
- **Function Name**: `swapPairs`
- **Parameters**: `head: list<int>`
- **Return Type**: `list<int>`
- **Description**: Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed).
```markdown
Problem Name: "Swap Nodes in Pairs"
Difficulty: MEDIUM
Topics: Linked List, Recursion
Function Name: swapPairs

Input Structure:
Input Field: list<int> head

Output Structure:
Output Field: list<int> result
```

### 210. Rotate List
- **Slug**: `rotate-list`
- **Difficulty**: MEDIUM
- **Topics**: Linked List, Two Pointers
- **Function Name**: `rotateRight`
- **Parameters**: `head: list<int>`, `k: int`
- **Return Type**: `list<int>`
- **Description**: Given the head of a linked list, rotate the list to the right by `k` places.
```markdown
Problem Name: "Rotate List"
Difficulty: MEDIUM
Topics: Linked List, Two Pointers
Function Name: rotateRight

Input Structure:
Input Field: list<int> head
Input Field: int k

Output Structure:
Output Field: list<int> result
```

### 211. Partition List
- **Slug**: `partition-list`
- **Difficulty**: MEDIUM
- **Topics**: Linked List, Two Pointers
- **Function Name**: `partition`
- **Parameters**: `head: list<int>`, `x: int`
- **Return Type**: `list<int>`
- **Description**: Given the head of a linked list and a value `x`, partition it such that all nodes less than `x` come before nodes greater than or equal to `x` while preserving original relative order.
```markdown
Problem Name: "Partition List"
Difficulty: MEDIUM
Topics: Linked List, Two Pointers
Function Name: partition

Input Structure:
Input Field: list<int> head
Input Field: int x

Output Structure:
Output Field: list<int> result
```

### 212. Odd Even Linked List
- **Slug**: `odd-even-linked-list`
- **Difficulty**: MEDIUM
- **Topics**: Linked List
- **Function Name**: `oddEvenList`
- **Parameters**: `head: list<int>`
- **Return Type**: `list<int>`
- **Description**: Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.
```markdown
Problem Name: "Odd Even Linked List"
Difficulty: MEDIUM
Topics: Linked List
Function Name: oddEvenList

Input Structure:
Input Field: list<int> head

Output Structure:
Output Field: list<int> result
```

### 213. Remove Duplicates from Sorted List II
- **Slug**: `remove-duplicates-from-sorted-list-ii`
- **Difficulty**: MEDIUM
- **Topics**: Linked List, Two Pointers
- **Function Name**: `deleteDuplicates`
- **Parameters**: `head: list<int>`
- **Return Type**: `list<int>`
- **Description**: Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.
```markdown
Problem Name: "Remove Duplicates from Sorted List II"
Difficulty: MEDIUM
Topics: Linked List, Two Pointers
Function Name: deleteDuplicates

Input Structure:
Input Field: list<int> head

Output Structure:
Output Field: list<int> result
```

### 214. Sort List
- **Slug**: `sort-list`
- **Difficulty**: MEDIUM
- **Topics**: Linked List, Two Pointers, Divide and Conquer, Sorting, Merge Sort
- **Function Name**: `sortList`
- **Parameters**: `head: list<int>`
- **Return Type**: `list<int>`
- **Description**: Given the head of a linked list, return the list after sorting it in ascending order in O(n log n) time and O(log n) memory.
```markdown
Problem Name: "Sort List"
Difficulty: MEDIUM
Topics: Linked List, Divide and Conquer, Merge Sort
Function Name: sortList

Input Structure:
Input Field: list<int> head

Output Structure:
Output Field: list<int> result
```


## 24. Advanced Stacks and Queues

### 215. Implement Queue using Stacks
- **Slug**: `implement-queue-using-stacks`
- **Difficulty**: EASY
- **Topics**: Stack, Design, Queue
- **Function Name**: `myQueueOperations`
- **Parameters**: `operations: list<String>`, `values: list<list<int>>`
- **Return Type**: `list<String>`
- **Description**: Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`) with amortized O(1) time complexity.
```markdown
Problem Name: "Implement Queue using Stacks"
Difficulty: EASY
Topics: Stack, Design, Queue
Function Name: myQueueOperations

Input Structure:
Input Field: list<String> operations
Input Field: list<list<int>> values

Output Structure:
Output Field: list<String> result
```

### 216. Implement Stack using Queues
- **Slug**: `implement-stack-using-queues`
- **Difficulty**: EASY
- **Topics**: Stack, Design, Queue
- **Function Name**: `myStackOperations`
- **Parameters**: `operations: list<String>`, `values: list<list<int>>`
- **Return Type**: `list<String>`
- **Description**: Implement a last-in-first-out (LIFO) stack using only queues. The implemented stack should support all functions of a normal stack (`push`, `top`, `pop`, and `empty`).
```markdown
Problem Name: "Implement Stack using Queues"
Difficulty: EASY
Topics: Stack, Design, Queue
Function Name: myStackOperations

Input Structure:
Input Field: list<String> operations
Input Field: list<list<int>> values

Output Structure:
Output Field: list<String> result
```

### 217. Design Circular Queue
- **Slug**: `design-circular-queue`
- **Difficulty**: MEDIUM
- **Topics**: Array, Linked List, Design, Queue
- **Function Name**: `circularQueueOperations`
- **Parameters**: `k: int`, `operations: list<String>`, `values: list<list<int>>`
- **Return Type**: `list<String>`
- **Description**: Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO principle and the last position is connected back to the first position.
```markdown
Problem Name: "Design Circular Queue"
Difficulty: MEDIUM
Topics: Array, Design, Queue
Function Name: circularQueueOperations

Input Structure:
Input Field: int k
Input Field: list<String> operations
Input Field: list<list<int>> values

Output Structure:
Output Field: list<String> result
```

### 218. Asteroid Collision
- **Slug**: `asteroid-collision`
- **Difficulty**: MEDIUM
- **Topics**: Array, Stack, Simulation
- **Function Name**: `asteroidCollision`
- **Parameters**: `asteroids: list<int>`
- **Return Type**: `list<int>`
- **Description**: We are given an array `asteroids` of integers representing asteroids in a row. Find out the state of the asteroids after all collisions.
```markdown
Problem Name: "Asteroid Collision"
Difficulty: MEDIUM
Topics: Array, Stack, Simulation
Function Name: asteroidCollision

Input Structure:
Input Field: list<int> asteroids

Output Structure:
Output Field: list<int> result
```

### 219. Decode String
- **Slug**: `decode-string`
- **Difficulty**: MEDIUM
- **Topics**: String, Stack, Recursion
- **Function Name**: `decodeString`
- **Parameters**: `s: String`
- **Return Type**: `String`
- **Description**: Given an encoded string, return its decoded string. The encoding rule is: `k[encoded_string]`, where the `encoded_string` inside the square brackets is being repeated exactly `k` times.
```markdown
Problem Name: "Decode String"
Difficulty: MEDIUM
Topics: String, Stack, Recursion
Function Name: decodeString

Input Structure:
Input Field: String s

Output Structure:
Output Field: String result
```

### 220. Simplify Path
- **Slug**: `simplify-path`
- **Difficulty**: MEDIUM
- **Topics**: String, Stack
- **Function Name**: `simplifyPath`
- **Parameters**: `path: String`
- **Return Type**: `String`
- **Description**: Given an absolute path for a Unix-style file system, convert it to the simplified canonical path.
```markdown
Problem Name: "Simplify Path"
Difficulty: MEDIUM
Topics: String, Stack
Function Name: simplifyPath

Input Structure:
Input Field: String path

Output Structure:
Output Field: String result
```

### 221. Remove All Adjacent Duplicates In String
- **Slug**: `remove-all-adjacent-duplicates-in-string`
- **Difficulty**: EASY
- **Topics**: String, Stack
- **Function Name**: `removeDuplicates`
- **Parameters**: `s: String`
- **Return Type**: `String`
- **Description**: You are given a string `s` consisting of lowercase English letters. A duplicate removal consists of choosing two adjacent and equal letters and removing them. Return the final string after all duplicate removals.
```markdown
Problem Name: "Remove All Adjacent Duplicates In String"
Difficulty: EASY
Topics: String, Stack
Function Name: removeDuplicates

Input Structure:
Input Field: String s

Output Structure:
Output Field: String result
```

### 222. Basic Calculator II
- **Slug**: `basic-calculator-ii`
- **Difficulty**: MEDIUM
- **Topics**: Math, String, Stack
- **Function Name**: `calculate`
- **Parameters**: `s: String`
- **Return Type**: `int`
- **Description**: Given a string `s` which represents an expression, evaluate this expression and return its value. The integer division should truncate toward zero. Operators are `+`, `-`, `*`, `/`.
```markdown
Problem Name: "Basic Calculator II"
Difficulty: MEDIUM
Topics: Math, String, Stack
Function Name: calculate

Input Structure:
Input Field: String s

Output Structure:
Output Field: int result
```

### 223. Next Greater Element I
- **Slug**: `next-greater-element-i`
- **Difficulty**: EASY
- **Topics**: Array, Hash Table, Stack, Monotonic Stack
- **Function Name**: `nextGreaterElement`
- **Parameters**: `nums1: list<int>`, `nums2: list<int>`
- **Return Type**: `list<int>`
- **Description**: The next greater element of some element `x` in an array is the first greater element that is to the right of `x` in the same array. Return an array `ans` where `ans[i]` is the next greater element of `nums1[i]` in `nums2`.
```markdown
Problem Name: "Next Greater Element I"
Difficulty: EASY
Topics: Array, Hash Table, Stack, Monotonic Stack
Function Name: nextGreaterElement

Input Structure:
Input Field: list<int> nums1
Input Field: list<int> nums2

Output Structure:
Output Field: list<int> result
```

### 224. Online Stock Span
- **Slug**: `online-stock-span`
- **Difficulty**: MEDIUM
- **Topics**: Stack, Design, Monotonic Stack, Data Stream
- **Function Name**: `stockSpanner`
- **Parameters**: `prices: list<int>`
- **Return Type**: `list<int>`
- **Description**: Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day (maximum number of consecutive days price was <= today's price).
```markdown
Problem Name: "Online Stock Span"
Difficulty: MEDIUM
Topics: Stack, Design, Monotonic Stack
Function Name: stockSpanner

Input Structure:
Input Field: list<int> prices

Output Structure:
Output Field: list<int> result
```

### 225. Remove K Digits
- **Slug**: `remove-k-digits`
- **Difficulty**: MEDIUM
- **Topics**: String, Stack, Greedy, Monotonic Stack
- **Function Name**: `removeKdigits`
- **Parameters**: `num: String`, `k: int`
- **Return Type**: `String`
- **Description**: Given string `num` representing a non-negative integer and an integer `k`, return the smallest possible integer represented as a string after removing `k` digits from `num`.
```markdown
Problem Name: "Remove K Digits"
Difficulty: MEDIUM
Topics: String, Stack, Greedy, Monotonic Stack
Function Name: removeKdigits

Input Structure:
Input Field: String num
Input Field: int k

Output Structure:
Output Field: String result
```

### 226. Next Smaller Element
- **Slug**: `immediate-smaller-element`
- **Difficulty**: EASY
- **Topics**: Array, Stack, Monotonic Stack
- **Function Name**: `immediateSmaller`
- **Parameters**: `arr: list<int>`
- **Return Type**: `list<int>`
- **Description**: Given an integer array `arr` of size `n`, find the immediate smaller element for every element. If there is no smaller element present, consider it as -1.
```markdown
Problem Name: "Next Smaller Element"
Difficulty: EASY
Topics: Array, Stack, Monotonic Stack
Function Name: immediateSmaller

Input Structure:
Input Field: list<int> arr

Output Structure:
Output Field: list<int> result
```

### 227. Stock Span Problem
- **Slug**: `stock-span-problem`
- **Difficulty**: MEDIUM
- **Topics**: Array, Stack, Monotonic Stack
- **Function Name**: `calculateSpan`
- **Parameters**: `price: list<int>`
- **Return Type**: `list<int>`
- **Description**: The stock span problem is a financial problem where we have a series of `n` daily price quotes for a stock and we need to calculate the span of stock’s price for all `n` days.
```markdown
Problem Name: "Stock Span Problem"
Difficulty: MEDIUM
Topics: Array, Stack, Monotonic Stack
Function Name: calculateSpan

Input Structure:
Input Field: list<int> price

Output Structure:
Output Field: list<int> result
```

### 228. Maximal Rectangle
- **Slug**: `maximal-rectangle`
- **Difficulty**: HARD
- **Topics**: Array, Dynamic Programming, Stack, Matrix, Monotonic Stack
- **Function Name**: `maximalRectangle`
- **Parameters**: `matrix: list<list<String>>`
- **Return Type**: `int`
- **Description**: Given a `rows x cols` binary matrix filled with `'0'`s and `'1'`s, find the largest rectangle containing only `'1'`s and return its area.
```markdown
Problem Name: "Maximal Rectangle"
Difficulty: HARD
Topics: Array, Stack, Matrix, Monotonic Stack
Function Name: maximalRectangle

Input Structure:
Input Field: list<list<String>> matrix

Output Structure:
Output Field: int result
```

### 229. Sum of Subarray Minimums
- **Slug**: `sum-of-subarray-minimums`
- **Difficulty**: MEDIUM
- **Topics**: Array, Dynamic Programming, Stack, Monotonic Stack
- **Function Name**: `sumSubarrayMins`
- **Parameters**: `arr: list<int>`
- **Return Type**: `int`
- **Description**: Given an array of integers `arr`, find the sum of `min(b)`, where `b` ranges over every (contiguous) subarray of `arr`. Since the answer may be large, return the answer modulo `10^9 + 7`.
```markdown
Problem Name: "Sum of Subarray Minimums"
Difficulty: MEDIUM
Topics: Array, Stack, Monotonic Stack
Function Name: sumSubarrayMins

Input Structure:
Input Field: list<int> arr

Output Structure:
Output Field: int result
```

### 230. 132 Pattern
- **Slug**: `132-pattern`
- **Difficulty**: MEDIUM
- **Topics**: Array, Binary Search, Stack, Monotonic Stack, Ordered Set
- **Function Name**: `find132pattern`
- **Parameters**: `nums: list<int>`
- **Return Type**: `bool`
- **Description**: Given an array of `n` integers `nums`, a 132 pattern is a subsequence of three integers `nums[i], nums[j], nums[k]` such that `i < j < k` and `nums[i] < nums[k] < nums[j]`. Return `true` if there is a 132 pattern in `nums`.
```markdown
Problem Name: "132 Pattern"
Difficulty: MEDIUM
Topics: Array, Stack, Monotonic Stack
Function Name: find132pattern

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: bool result
```

### 231. Number of Recent Calls
- **Slug**: `number-of-recent-calls`
- **Difficulty**: EASY
- **Topics**: Design, Queue, Data Stream
- **Function Name**: `recentCounterOperations`
- **Parameters**: `inputs: list<int>`
- **Return Type**: `list<int>`
- **Description**: You have a `RecentCounter` class which counts the number of recent requests within a certain time frame (past 3000 milliseconds).
```markdown
Problem Name: "Number of Recent Calls"
Difficulty: EASY
Topics: Design, Queue, Data Stream
Function Name: recentCounterOperations

Input Structure:
Input Field: list<int> inputs

Output Structure:
Output Field: list<int> result
```

### 232. Design Front Middle Back Queue
- **Slug**: `design-front-middle-back-queue`
- **Difficulty**: MEDIUM
- **Topics**: Array, Linked List, Design, Queue, Doubly-Linked List, Data Stream
- **Function Name**: `frontMiddleBackQueueOperations`
- **Parameters**: `operations: list<String>`, `values: list<list<int>>`
- **Return Type**: `list<String>`
- **Description**: Design a queue that supports push and pop operations in the front, middle, and back in O(1) time.
```markdown
Problem Name: "Design Front Middle Back Queue"
Difficulty: MEDIUM
Topics: Array, Design, Queue
Function Name: frontMiddleBackQueueOperations

Input Structure:
Input Field: list<String> operations
Input Field: list<list<int>> values

Output Structure:
Output Field: list<String> result
```

### 233. Dota2 Senate
- **Slug**: `dota2-senate`
- **Difficulty**: MEDIUM
- **Topics**: String, Greedy, Queue
- **Function Name**: `predictPartyVictory`
- **Parameters**: `senate: String`
- **Return Type**: `String`
- **Description**: In the world of Dota2, there are two parties: Radiant and Dire. Predict which party will announce the victory and change the Dota2 game.
```markdown
Problem Name: "Dota2 Senate"
Difficulty: MEDIUM
Topics: String, Greedy, Queue
Function Name: predictPartyVictory

Input Structure:
Input Field: String senate

Output Structure:
Output Field: String result
```

### 234. Open the Lock
- **Slug**: `open-the-lock`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, String, Breadth-First Search
- **Function Name**: `openLock`
- **Parameters**: `deadends: list<String>`, `target: String`
- **Return Type**: `int`
- **Description**: You have a lock in front of you with 4 circular wheels. Each wheel has 10 slots: '0'-'9'. Return the minimum total number of turns required to open the lock, or -1 if impossible.
```markdown
Problem Name: "Open the Lock"
Difficulty: MEDIUM
Topics: Breadth-First Search, Queue, Hash Table
Function Name: openLock

Input Structure:
Input Field: list<String> deadends
Input Field: String target

Output Structure:
Output Field: int result
```

### 235. Furthest Building You Can Reach
- **Slug**: `furthest-building-you-can-reach`
- **Difficulty**: MEDIUM
- **Topics**: Array, Greedy, Heap
- **Function Name**: `furthestBuilding`
- **Parameters**: `heights: list<int>`, `bricks: int`, `ladders: int`
- **Return Type**: `int`
- **Description**: You are given an integer array `heights` representing the heights of buildings, some `bricks`, and some `ladders`. Return the furthest building index you can reach if you use your resources optimally.
```markdown
Problem Name: "Furthest Building You Can Reach"
Difficulty: MEDIUM
Topics: Array, Greedy, Heap
Function Name: furthestBuilding

Input Structure:
Input Field: list<int> heights
Input Field: int bricks
Input Field: int ladders

Output Structure:
Output Field: int result
```


## 25. Advanced Bitwise Operations

### 236. Power of Two
- **Slug**: `power-of-two`
- **Difficulty**: EASY
- **Topics**: Math, Bit Manipulation, Recursion
- **Function Name**: `isPowerOfTwo`
- **Parameters**: `n: int`
- **Return Type**: `bool`
- **Description**: Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`. An integer `n` is a power of two if there exists an integer `x` such that `n == 2^x`.
```markdown
Problem Name: "Power of Two"
Difficulty: EASY
Topics: Math, Bit Manipulation
Function Name: isPowerOfTwo

Input Structure:
Input Field: int n

Output Structure:
Output Field: bool result
```

### 237. Single Number III
- **Slug**: `single-number-iii`
- **Difficulty**: MEDIUM
- **Topics**: Array, Bit Manipulation
- **Function Name**: `singleNumber`
- **Parameters**: `nums: list<int>`
- **Return Type**: `list<int>`
- **Description**: Given an integer array `nums`, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once in linear runtime and O(1) space.
```markdown
Problem Name: "Single Number III"
Difficulty: MEDIUM
Topics: Array, Bit Manipulation
Function Name: singleNumber

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: list<int> result
```

### 238. Bitwise AND of Numbers Range
- **Slug**: `bitwise-and-of-numbers-range`
- **Difficulty**: MEDIUM
- **Topics**: Bit Manipulation
- **Function Name**: `rangeBitwiseAnd`
- **Parameters**: `left: int`, `right: int`
- **Return Type**: `int`
- **Description**: Given two integers `left` and `right` that represent the range `[left, right]`, return the bitwise AND of all numbers in this range, inclusive.
```markdown
Problem Name: "Bitwise AND of Numbers Range"
Difficulty: MEDIUM
Topics: Bit Manipulation
Function Name: rangeBitwiseAnd

Input Structure:
Input Field: int left
Input Field: int right

Output Structure:
Output Field: int result
```

### 239. Maximum XOR of Two Numbers in an Array
- **Slug**: `maximum-xor-of-two-numbers-in-an-array`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, Bit Manipulation, Trie
- **Function Name**: `findMaximumXOR`
- **Parameters**: `nums: list<int>`
- **Return Type**: `int`
- **Description**: Given an integer array `nums`, return the maximum result of `nums[i] XOR nums[j]`, where `0 <= i <= j < n` in O(n) time.
```markdown
Problem Name: "Maximum XOR of Two Numbers in an Array"
Difficulty: MEDIUM
Topics: Array, Bit Manipulation, Trie
Function Name: findMaximumXOR

Input Structure:
Input Field: list<int> nums

Output Structure:
Output Field: int result
```

### 240. Minimum Flips to Make a OR b Equal to c
- **Slug**: `minimum-flips-to-make-a-or-b-equal-to-c`
- **Difficulty**: MEDIUM
- **Topics**: Bit Manipulation
- **Function Name**: `minFlips`
- **Parameters**: `a: int`, `b: int`, `c: int`
- **Return Type**: `int`
- **Description**: Given 3 positives numbers `a`, `b` and `c`. Return the minimum flips needed in some bits of `a` and `b` to make `(a OR b) == c`.
```markdown
Problem Name: "Minimum Flips to Make a OR b Equal to c"
Difficulty: MEDIUM
Topics: Bit Manipulation
Function Name: minFlips

Input Structure:
Input Field: int a
Input Field: int b
Input Field: int c

Output Structure:
Output Field: int result
```

### 241. Flatten a Multilevel Doubly Linked List
- **Slug**: `flatten-a-multilevel-doubly-linked-list`
- **Difficulty**: MEDIUM
- **Topics**: Linked List, Doubly-Linked List, Depth-First Search
- **Function Name**: `flatten`
- **Parameters**: `nodes: list<list<int>>`
- **Return Type**: `list<int>`
- **Description**: Given the head of the first level of the list, flatten the list so that all the nodes appear in a single-level, doubly linked list (depth-first order).
```markdown
Problem Name: "Flatten a Multilevel Doubly Linked List"
Difficulty: MEDIUM
Topics: Linked List, Depth-First Search
Function Name: flatten

Input Structure:
Input Field: list<list<int>> nodes

Output Structure:
Output Field: list<int> result
```


## 26. Core Competitive Algorithms

### 242. Flood Fill
- **Slug**: `flood-fill`
- **Difficulty**: EASY
- **Topics**: Array, Depth-First Search, Breadth-First Search, Matrix
- **Function Name**: `floodFill`
- **Parameters**: `image: list<list<int>>`, `sr: int`, `sc: int`, `color: int`
- **Return Type**: `list<list<int>>`
- **Description**: An image is represented by an `m x n` integer grid `image` where `image[i][j]` represents the pixel value. Perform a flood fill starting from pixel `(sr, sc)` with new color `color`.
```markdown
Problem Name: "Flood Fill"
Difficulty: EASY
Topics: Depth-First Search, Breadth-First Search, Matrix
Function Name: floodFill

Input Structure:
Input Field: list<list<int>> image
Input Field: int sr
Input Field: int sc
Input Field: int color

Output Structure:
Output Field: list<list<int>> result
```

### 243. First Bad Version
- **Slug**: `first-bad-version`
- **Difficulty**: EASY
- **Topics**: Binary Search, Interactive
- **Function Name**: `firstBadVersion`
- **Parameters**: `n: int`, `bad: int`
- **Return Type**: `int`
- **Description**: You have `n` versions `[1, 2, ..., n]` and you want to find out the first bad version which causes all subsequent versions to be bad using minimal API calls.
```markdown
Problem Name: "First Bad Version"
Difficulty: EASY
Topics: Binary Search
Function Name: firstBadVersion

Input Structure:
Input Field: int n
Input Field: int bad

Output Structure:
Output Field: int result
```

### 244. Ransom Note
- **Slug**: `ransom-note`
- **Difficulty**: EASY
- **Topics**: Hash Table, String, Counting
- **Function Name**: `canConstruct`
- **Parameters**: `ransomNote: String`, `magazine: String`
- **Return Type**: `bool`
- **Description**: Given two strings `ransomNote` and `magazine`, return `true` if `ransomNote` can be constructed by using the letters from `magazine` and `false` otherwise (each letter in magazine may only be used once).
```markdown
Problem Name: "Ransom Note"
Difficulty: EASY
Topics: Hash Table, String, Counting
Function Name: canConstruct

Input Structure:
Input Field: String ransomNote
Input Field: String magazine

Output Structure:
Output Field: bool result
```

### 245. Longest Palindrome
- **Slug**: `longest-palindrome`
- **Difficulty**: EASY
- **Topics**: Hash Table, String, Greedy
- **Function Name**: `longestPalindrome`
- **Parameters**: `s: String`
- **Return Type**: `int`
- **Description**: Given a string `s` which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.
```markdown
Problem Name: "Longest Palindrome"
Difficulty: EASY
Topics: Hash Table, String, Greedy
Function Name: longestPalindrome

Input Structure:
Input Field: String s

Output Structure:
Output Field: int result
```

### 246. Add Binary
- **Slug**: `add-binary`
- **Difficulty**: EASY
- **Topics**: Math, String, Bit Manipulation, Simulation
- **Function Name**: `addBinary`
- **Parameters**: `a: String`, `b: String`
- **Return Type**: `String`
- **Description**: Given two binary strings `a` and `b`, return their sum as a binary string.
```markdown
Problem Name: "Add Binary"
Difficulty: EASY
Topics: Math, String, Bit Manipulation
Function Name: addBinary

Input Structure:
Input Field: String a
Input Field: String b

Output Structure:
Output Field: String result
```

### 247. 01 Matrix
- **Slug**: `01-matrix`
- **Difficulty**: MEDIUM
- **Topics**: Array, Dynamic Programming, Breadth-First Search, Matrix
- **Function Name**: `updateMatrix`
- **Parameters**: `mat: list<list<int>>`
- **Return Type**: `list<list<int>>`
- **Description**: Given an `m x n` binary matrix `mat`, return the distance of the nearest `0` for each cell using multi-source breadth-first search.
```markdown
Problem Name: "01 Matrix"
Difficulty: MEDIUM
Topics: Breadth-First Search, Matrix
Function Name: updateMatrix

Input Structure:
Input Field: list<list<int>> mat

Output Structure:
Output Field: list<list<int>> result
```

### 248. Lowest Common Ancestor of a Binary Tree
- **Slug**: `lowest-common-ancestor-of-a-binary-tree`
- **Difficulty**: MEDIUM
- **Topics**: Tree, Depth-First Search, Binary Tree
- **Function Name**: `lowestCommonAncestor`
- **Parameters**: `root: list<String>`, `p: int`, `q: int`
- **Return Type**: `int`
- **Description**: Given a binary tree, find the lowest common ancestor (LCA) of two given nodes `p` and `q` in the tree.
```markdown
Problem Name: "Lowest Common Ancestor of a Binary Tree"
Difficulty: MEDIUM
Topics: Tree, Depth-First Search, Binary Tree
Function Name: lowestCommonAncestor

Input Structure:
Input Field: list<String> root
Input Field: int p
Input Field: int q

Output Structure:
Output Field: int result
```

### 249. Accounts Merge
- **Slug**: `accounts-merge`
- **Difficulty**: MEDIUM
- **Topics**: Array, Hash Table, String, Depth-First Search, Breadth-First Search, Union Find, Sorting
- **Function Name**: `accountsMerge`
- **Parameters**: `accounts: list<list<String>>`
- **Return Type**: `list<list<String>>`
- **Description**: Given a list of accounts where each element `accounts[i]` is a list of strings, merge the accounts where accounts belong to the same person if there is some common email.
```markdown
Problem Name: "Accounts Merge"
Difficulty: MEDIUM
Topics: Array, Hash Table, String, Union Find
Function Name: accountsMerge

Input Structure:
Input Field: list<list<String>> accounts

Output Structure:
Output Field: list<list<String>> result
```

### 250. String to Integer (atoi)
- **Slug**: `string-to-integer-atoi`
- **Difficulty**: MEDIUM
- **Topics**: String
- **Function Name**: `myAtoi`
- **Parameters**: `s: String`
- **Return Type**: `int`
- **Description**: Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer. Whitespace is ignored, sign is handled, and values clamp to 32-bit signed integer boundaries.
```markdown
Problem Name: "String to Integer (atoi)"
Difficulty: MEDIUM
Topics: String
Function Name: myAtoi

Input Structure:
Input Field: String s

Output Structure:
Output Field: int result
```

### 251. Minimum Height Trees
- **Slug**: `minimum-height-trees`
- **Difficulty**: MEDIUM
- **Topics**: Depth-First Search, Breadth-First Search, Graph, Topological Sort
- **Function Name**: `findMinHeightTrees`
- **Parameters**: `n: int`, `edges: list<list<int>>`
- **Return Type**: `list<int>`
- **Description**: A tree is an undirected graph in which any two vertices are connected by exactly one path. Return a list of all MHT root labels by peeling boundary leaves iteratively.
```markdown
Problem Name: "Minimum Height Trees"
Difficulty: MEDIUM
Topics: Breadth-First Search, Graph, Topological Sort
Function Name: findMinHeightTrees

Input Structure:
Input Field: int n
Input Field: list<list<int>> edges

Output Structure:
Output Field: list<int> result
```

### 252. Basic Calculator
- **Slug**: `basic-calculator`
- **Difficulty**: HARD
- **Topics**: Math, String, Stack, Recursion
- **Function Name**: `calculate`
- **Parameters**: `s: String`
- **Return Type**: `int`
- **Description**: Given a string `s` representing a valid expression with `+`, `-`, parentheses `(`, `)`, and non-negative integers, implement a basic calculator to evaluate it.
```markdown
Problem Name: "Basic Calculator"
Difficulty: HARD
Topics: Math, String, Stack
Function Name: calculate

Input Structure:
Input Field: String s

Output Structure:
Output Field: int result
```

### 253. Maximum Profit in Job Scheduling
- **Slug**: `maximum-profit-in-job-scheduling`
- **Difficulty**: HARD
- **Topics**: Array, Binary Search, Dynamic Programming, Sorting
- **Function Name**: `jobScheduling`
- **Parameters**: `startTime: list<int>`, `endTime: list<int>`, `profit: list<int>`
- **Return Type**: `int`
- **Description**: We have `n` jobs with given start times, end times, and profits. Return the maximum profit you can achieve such that no two jobs overlap in time using DP with binary search.
```markdown
Problem Name: "Maximum Profit in Job Scheduling"
Difficulty: HARD
Topics: Array, Binary Search, Dynamic Programming, Sorting
Function Name: jobScheduling

Input Structure:
Input Field: list<int> startTime
Input Field: list<int> endTime
Input Field: list<int> profit

Output Structure:
Output Field: int result
```

---

## 🛠️ CodeClash Problem Import Guide

To import any problem into CodeClash, create a directory in `problem-bank/problems/<slug>/` containing:
1. **`Structure.md`**: Directly copy the ready-to-use markdown `Structure.md` block provided for each problem above.
2. **`Problem.md`**: Contains the title, description, and examples formatted as markdown.
3. **`generators/generator.js`**: Generates 80 test cases matching the input types.
4. Run boilerplate generation and test suite verification:
   ```bash
   cd problem-bank
   node scripts/generate-boilerplate.js <slug>
   node scripts/generate-tests.js <slug>
   node scripts/import-problems.js
   ```
