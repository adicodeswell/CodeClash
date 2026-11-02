import sys

# Replace this marker with the participant's Solution class.
{{USER_CODE}}

data = iter(map(int, sys.stdin.buffer.read().split()))

def read_int():
    try:
        return next(data)
    except StopIteration:
        raise ValueError("Missing integer input")

def read_int_list():
    n = read_int()
    if n < 0:
        raise ValueError("Negative list length")
    return [read_int() for _ in range(n)]

def main():
    nums = read_int_list()
    target = read_int()
    result = Solution().twoSum(nums, target)
    print(" ".join(map(str, result)))

if __name__ == "__main__":
    main()
