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
    import time as _cc_time, sys as _cc_sys
    _cc_max_s = 0.0
    while True:
        customers = read_int_list()
        if customers is None: break
        grumpy = read_int_list()
        if grumpy is None: break
        minutes = read_int()
        if minutes is None: break
        _cc_t0 = _cc_time.perf_counter()
        result = Solution().maxSatisfied(customers, grumpy, minutes)
        _cc_t1 = _cc_time.perf_counter()
        _cc_dur = _cc_t1 - _cc_t0
        if _cc_dur > _cc_max_s: _cc_max_s = _cc_dur
        print(result)
    _cc_sys.stderr.write(f"__CODECLASH_TIME_MS__:{max(1, round(_cc_max_s * 1000))}\n")

if __name__ == "__main__":
    main()
