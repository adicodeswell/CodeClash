# Make Sum Divisible by P

Given an array of positive integers `nums`, remove the **smallest** subarray (possibly empty) such that the sum of the remaining elements is divisible by `p`. It is not allowed to remove the whole array.

Return the length of the smallest subarray that you need to remove, or `-1` if it's impossible.

### Examples

**Example 1:**
```
Input: nums = [3, 1, 4, 2], p = 6
Output: 1
Explanation: The sum of the elements in nums is 10, which is not divisible by 6. We can remove the subarray [4], and the sum of the remaining elements is 6, which is divisible by 6.
```

**Example 2:**
```
Input: nums = [6, 3, 5, 2], p = 9
Output: 2
Explanation: We cannot remove a single element to get a sum divisible by 9. The best way is to remove the subarray [3, 5], leaving [6, 2] with sum 8, which is not divisible by 9. However, removing [5, 2] leaves [6, 3] with sum 9, so answer is 2.
```

**Example 3:**
```
Input: nums = [1, 2, 3], p = 3
Output: 0
Explanation: Here the sum is 6, which is already divisible by 3. Thus we do not need to remove anything.
```

### Constraints

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `1 <= p <= 10^9`
