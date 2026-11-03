/**
 * Instruments participant source code with high-resolution in-process timers.
 * Measures the actual function execution time (in milliseconds), excluding
 * Python / Node.js VM startup and library initialization overhead.
 */
export function wrapSourceWithTiming(sourceCode, language) {
  if (language === "python") {
    const pythonSnippet = [
      "",
      "# In-process execution timing instrumentation",
      "try:",
      "    import time as _cc_time, sys as _cc_sys",
      "    for _cc_attr in dir(Solution):",
      "        if not _cc_attr.startswith('_'):",
      "            _cc_orig = getattr(Solution, _cc_attr)",
      "            if callable(_cc_orig):",
      "                def _cc_make_timed(fn):",
      "                    def _cc_timed(*args, **kwargs):",
      "                        _cc_t0 = _cc_time.perf_counter()",
      "                        _cc_res = fn(*args, **kwargs)",
      "                        _cc_t1 = _cc_time.perf_counter()",
      '                        _cc_sys.stderr.write(f"__CODECLASH_TIME_MS__:{max(1, round((_cc_t1 - _cc_t0) * 1000))}\\n")',
      "                        return _cc_res",
      "                    return _cc_timed",
      "                setattr(Solution, _cc_attr, _cc_make_timed(_cc_orig))",
      "except Exception:",
      "    pass",
      "",
    ].join("\n");
    return sourceCode + "\n" + pythonSnippet;
  }

  if (language === "javascript") {
    const jsSnippet = [
      "",
      "// In-process execution timing instrumentation",
      "try {",
      '  if (typeof Solution === "function") {',
      "    const _cc_proto = Solution.prototype;",
      "    for (const _cc_key of Object.getOwnPropertyNames(_cc_proto)) {",
      '      if (_cc_key !== "constructor" && typeof _cc_proto[_cc_key] === "function") {',
      "        const _cc_orig = _cc_proto[_cc_key];",
      "        _cc_proto[_cc_key] = function (...args) {",
      "          const _cc_t0 = performance.now();",
      "          const _cc_res = _cc_orig.apply(this, args);",
      "          const _cc_t1 = performance.now();",
      '          process.stderr.write("__CODECLASH_TIME_MS__:" + Math.max(1, Math.round(_cc_t1 - _cc_t0)) + "\\n");',
      "          return _cc_res;",
      "        };",
      "      }",
      "    }",
      "  }",
      "} catch (e) {}",
      "",
    ].join("\n");
    return sourceCode + "\n" + jsSnippet;
  }

  return sourceCode;
}
