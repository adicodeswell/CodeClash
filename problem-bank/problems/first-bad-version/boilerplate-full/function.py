from __future__ import annotations
import sys
from typing import List, Dict, Tuple, Set, Optional

# Replace this marker with the participant's Solution class.
{{USER_CODE}}

data = iter(sys.stdin.buffer.read().decode("utf-8").split())

def read_str():
    try:
        return next(data)
    except StopIteration:
        return None

def read_int():
    s = read_str()
    return int(s) if s is not None else None

def read_float():
    s = read_str()
    return float(s) if s is not None else None

def read_bool():
    s = read_str()
    return (s == "1") if s is not None else None

def read_int_list():
    n = read_int()
    if n is None:
        return None
    return [read_int() for _ in range(n)]

def read_str_list():
    n = read_int()
    if n is None:
        return None
    return [read_str() for _ in range(n)]

def read_int_matrix():
    r = read_int()
    if r is None:
        return None
    return [read_int_list() for _ in range(r)]

def read_str_matrix():
    r = read_int()
    if r is None:
        return None
    return [read_str_list() for _ in range(r)]

def main():
    while True:
        n = read_int()
        if n is None: break
        bad = read_int()
        if bad is None: break
        result = Solution().firstBadVersion(n, bad)
        print(result)

if __name__ == "__main__":
    main()
