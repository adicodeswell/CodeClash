from __future__ import annotations
import sys
from typing import List, Dict, Tuple, Set, Optional

# Replace this marker with the participant's Solution class.
{{USER_CODE}}

data = iter(map(int, sys.stdin.buffer.read().split()))

def read_int():
    try:
        return next(data)
    except StopIteration:
        return None

def read_int_list():
    n = read_int()
    if n is None:
        return None
    if n < 0:
        raise ValueError("Negative list length")
    return [read_int() for _ in range(n)]

def main():
    while True:
        nums = read_int_list()
        if nums is None:
            break
        result = Solution().singleNumber(nums)
        print(result)

if __name__ == "__main__":
    main()
