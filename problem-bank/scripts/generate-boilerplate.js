import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { readStructure } from "./structure.js";
import { selectProblems } from "./problem-selection.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const problemsRoot = path.join(root, "problems");

const languages = {
  cpp: {
    extension: "cpp",
    type: {
      int: "int",
      long: "long long",
      double: "double",
      bool: "bool",
      String: "string",
    },
    list: (inner) => `vector<${inner}>`,
    imports: "#include <bits/stdc++.h>\nusing namespace std;\n",
    method: (spec, types) =>
      `class Solution {\npublic:\n    ${types(spec.output.type)} ${spec.functionName}(${spec.inputs
        .map((x) => `${types(x.type)} ${x.name}`)
        .join(", ")}) {\n        // Write your code here\n    }\n};\n`,
  },

  java: {
    extension: "java",
    type: {
      int: "int",
      long: "long",
      double: "double",
      bool: "boolean",
      String: "String",
    },
    list: (inner) => `${inner}[]`,
    imports: "",
    method: (spec, types) =>
      `import java.util.*;\n\nclass Solution {\n    public ${types(spec.output.type)} ${spec.functionName}(${spec.inputs
        .map((x) => `${types(x.type)} ${x.name}`)
        .join(", ")}) {\n        // Write your code here\n    }\n}\n`,
  },

  python: {
    extension: "py",
    type: {
      int: "int",
      long: "int",
      double: "float",
      bool: "bool",
      String: "str",
    },
    list: (inner) => `list[${inner}]`,
    imports: "from typing import List\n\n",
    method: (spec) =>
      `class Solution:\n    def ${spec.functionName}(self, ${spec.inputs
        .map((x) => x.name)
        .join(", ")}):\n        # Write your code here\n        pass\n`,
  },

  javascript: {
    extension: "js",
    type: {
      int: "number",
      long: "number",
      double: "number",
      bool: "boolean",
      String: "string",
    },
    list: (inner) => `${inner}[]`,
    imports: "",
    method: (spec) =>
      `class Solution {\n  ${spec.functionName}(${spec.inputs
        .map((x) => x.name)
        .join(", ")}) {\n    // Write your code here\n  }\n}\n\nmodule.exports = Solution;\n`,
  },
};

function makeTypeMapper(language) {
  return function mapType(type) {
    if (language.type[type]) {
      return language.type[type];
    }

    const match = type.match(/^list<(.+)>$/);

    if (match) {
      return language.list(mapType(match[1]));
    }

    throw new Error(`Type not supported by this language: ${type}`);
  };
}

function simpleTemplate(spec, language, languageKey) {
  const mapType = makeTypeMapper(language);

  if (languageKey === "cpp") {
    const output = mapType(spec.output.type);

    return (
      language.imports +
      `class Solution {\npublic:\n    ${output} ${spec.functionName}(${spec.inputs
        .map((x) => `${mapType(x.type)} ${x.name}`)
        .join(", ")}) {\n        // Write your code here\n    }\n};\n`
    );
  }

  if (languageKey === "java") {
    return language.method(spec, mapType);
  }

  return language.imports + language.method(spec, mapType);
}

function fullTemplate(spec, languageKey) {
  const args = spec.inputs.map((x) => x.name).join(", ");
  const mapTypeCpp = makeTypeMapper(languages.cpp);
  const mapTypeJava = makeTypeMapper(languages.java);

  if (languageKey === "cpp") {
    const declares = spec.inputs
      .map((x) => `    ${mapTypeCpp(x.type)} ${x.name};`)
      .join("\n");

    const readCall = (type, name) => {
      if (type === "int") return `readInt(${name})`;
      if (type === "long") return `readLong(${name})`;
      if (type === "double") return `readDouble(${name})`;
      if (type === "bool") return `readBool(${name})`;
      if (type === "String") return `readString(${name})`;
      if (type === "list<int>") return `readIntList(${name})`;
      if (type === "list<String>") return `readStringList(${name})`;
      if (type === "list<list<int>>") return `readIntMatrix(${name})`;
      if (type === "list<list<String>>") return `readStringMatrix(${name})`;
      return `readInt(${name})`;
    };

    const firstField = spec.inputs[0];
    const firstRead = readCall(firstField.type, firstField.name);

    const subsequentReads = spec.inputs
      .slice(1)
      .map((x) => `        if (!${readCall(x.type, x.name)}) break;`)
      .join("\n");

    const subsequentBlock = subsequentReads ? subsequentReads + "\n" : "";

    let printCode = `        cout << result << '\\n';`;
    if (spec.output.type === "bool") {
      printCode = `        cout << (result ? 1 : 0) << '\\n';`;
    } else if (spec.output.type === "list<int>" || spec.output.type === "list<long>" || spec.output.type === "list<String>") {
      printCode = `        for (size_t i = 0; i < result.size(); i++) {
            if (i) cout << ' ';
            cout << result[i];
        }
        cout << '\\n';`;
    } else if (spec.output.type === "list<list<int>>" || spec.output.type === "list<list<String>>") {
      printCode = `        for (const auto &row : result) {
            for (size_t j = 0; j < row.size(); j++) {
                if (j) cout << ' ';
                cout << row[j];
            }
            cout << '\\n';
        }`;
    }

    return `#include <bits/stdc++.h>
using namespace std;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

bool readInt(int &v) { return bool(cin >> v); }
bool readLong(long long &v) { return bool(cin >> v); }
bool readDouble(double &v) { return bool(cin >> v); }
bool readBool(bool &v) { int b; if (cin >> b) { v = (b == 1); return true; } return false; }
bool readString(string &v) { return bool(cin >> v); }

bool readIntList(vector<int> &values) {
    int n;
    if (!(cin >> n)) return false;
    if (n < 0) throw runtime_error("Negative list length");
    values.resize(n);
    for (int &value : values) {
        if (!(cin >> value)) return false;
    }
    return true;
}

bool readStringList(vector<string> &values) {
    int n;
    if (!(cin >> n)) return false;
    values.resize(n);
    for (string &value : values) {
        if (!(cin >> value)) return false;
    }
    return true;
}

bool readIntMatrix(vector<vector<int>> &mat) {
    int r;
    if (!(cin >> r)) return false;
    mat.resize(r);
    for (auto &row : mat) {
        int c;
        if (!(cin >> c)) return false;
        row.resize(c);
        for (int &x : row) if (!(cin >> x)) return false;
    }
    return true;
}

bool readStringMatrix(vector<vector<string>> &mat) {
    int r;
    if (!(cin >> r)) return false;
    mat.resize(r);
    for (auto &row : mat) {
        int c;
        if (!(cin >> c)) return false;
        row.resize(c);
        for (string &x : row) if (!(cin >> x)) return false;
    }
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

${declares}
    long long _cc_max_us = 0;
    while (${firstRead}) {
${subsequentBlock}        Solution solution;
        auto _cc_t0 = chrono::high_resolution_clock::now();
        auto result = solution.${spec.functionName}(${args});
        auto _cc_t1 = chrono::high_resolution_clock::now();
        long long _cc_dur = chrono::duration_cast<chrono::microseconds>(_cc_t1 - _cc_t0).count();
        if (_cc_dur > _cc_max_us) _cc_max_us = _cc_dur;
${printCode}
    }
    cerr << "__CODECLASH_TIME_MS__:" << max(1LL, (_cc_max_us + 500) / 1000) << '\\n';
    return 0;
}
`;
  }

  if (languageKey === "java") {
    const javaType = (type) => mapTypeJava(type);

    const readVar = (type, name, isFirst) => {
      const check = isFirst ? "" : "if (!scanner.hasNext()) break;\n            ";
      if (type === "int") return `${check}int ${name} = scanner.nextInt();`;
      if (type === "long") return `${check}long ${name} = scanner.nextLong();`;
      if (type === "double") return `${check}double ${name} = scanner.nextDouble();`;
      if (type === "bool") return `${check}boolean ${name} = scanner.nextInt() == 1;`;
      if (type === "String") return `${check}String ${name} = scanner.next();`;
      if (type === "list<int>") {
        return `${check}int n_${name} = scanner.nextInt();
            int[] ${name} = new int[n_${name}];
            for (int i = 0; i < n_${name}; i++) ${name}[i] = scanner.nextInt();`;
      }
      if (type === "list<String>") {
        return `${check}int n_${name} = scanner.nextInt();
            String[] ${name} = new String[n_${name}];
            for (int i = 0; i < n_${name}; i++) ${name}[i] = scanner.next();`;
      }
      if (type === "list<list<int>>") {
        return `${check}int r_${name} = scanner.nextInt();
            int[][] ${name} = new int[r_${name}][];
            for (int i = 0; i < r_${name}; i++) {
                int c = scanner.nextInt();
                ${name}[i] = new int[c];
                for (int j = 0; j < c; j++) ${name}[i][j] = scanner.nextInt();
            }`;
      }
      if (type === "list<list<String>>") {
        return `${check}int r_${name} = scanner.nextInt();
            String[][] ${name} = new String[r_${name}][];
            for (int i = 0; i < r_${name}; i++) {
                int c = scanner.nextInt();
                ${name}[i] = new String[c];
                for (int j = 0; j < c; j++) ${name}[i][j] = scanner.next();
            }`;
      }
      return `${check}int ${name} = scanner.nextInt();`;
    };

    const reads = spec.inputs
      .map((x, idx) => `            ${readVar(x.type, x.name, idx === 0)}`)
      .join("\n");

    let printCode = `            System.out.println(result);`;
    if (spec.output.type === "bool") {
      printCode = `            System.out.println(result ? 1 : 0);`;
    } else if (spec.output.type === "list<int>" || spec.output.type === "list<long>") {
      printCode = `            for (int i = 0; i < result.length; i++) {
                if (i > 0) System.out.print(" ");
                System.out.print(result[i]);
            }
            System.out.println();`;
    } else if (spec.output.type === "list<String>") {
      printCode = `            for (int i = 0; i < result.length; i++) {
                if (i > 0) System.out.print(" ");
                System.out.print(result[i]);
            }
            System.out.println();`;
    } else if (spec.output.type === "list<list<int>>") {
      printCode = `            for (int i = 0; i < result.length; i++) {
                for (int j = 0; j < result[i].length; j++) {
                    if (j > 0) System.out.print(" ");
                    System.out.print(result[i][j]);
                }
                System.out.println();
            }`;
    } else if (spec.output.type === "list<list<String>>") {
      printCode = `            for (int i = 0; i < result.length; i++) {
                for (int j = 0; j < result[i].length; j++) {
                    if (j > 0) System.out.print(" ");
                    System.out.print(result[i][j]);
                }
                System.out.println();
            }`;
    }

    return `import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long _cc_max_ns = 0;
        while (scanner.hasNext()) {
${reads}
            Solution solution = new Solution();
            long _cc_t0 = System.nanoTime();
            ${javaType(spec.output.type)} result =
                solution.${spec.functionName}(${args});
            long _cc_t1 = System.nanoTime();
            long _cc_dur = _cc_t1 - _cc_t0;
            if (_cc_dur > _cc_max_ns) _cc_max_ns = _cc_dur;
${printCode}
        }
        System.err.println("__CODECLASH_TIME_MS__:" + Math.max(1, Math.round(_cc_max_ns / 1000000.0)));
    }
}
`;
  }

  if (languageKey === "python") {
    const readVar = (type, name) => {
      if (type === "int") return `        ${name} = read_int()\n        if ${name} is None: break`;
      if (type === "long") return `        ${name} = read_int()\n        if ${name} is None: break`;
      if (type === "double") return `        ${name} = read_float()\n        if ${name} is None: break`;
      if (type === "bool") return `        ${name} = read_bool()\n        if ${name} is None: break`;
      if (type === "String") return `        ${name} = read_str()\n        if ${name} is None: break`;
      if (type === "list<int>") return `        ${name} = read_int_list()\n        if ${name} is None: break`;
      if (type === "list<String>") return `        ${name} = read_str_list()\n        if ${name} is None: break`;
      if (type === "list<list<int>>") return `        ${name} = read_int_matrix()\n        if ${name} is None: break`;
      if (type === "list<list<String>>") return `        ${name} = read_str_matrix()\n        if ${name} is None: break`;
      return `        ${name} = read_int()\n        if ${name} is None: break`;
    };

    const reads = spec.inputs.map((x) => readVar(x.type, x.name)).join("\n");

    let printCode = "        print(result)";
    if (spec.output.type === "bool") {
      printCode = "        print(1 if result else 0)";
    } else if (spec.output.type === "list<int>" || spec.output.type === "list<long>") {
      printCode = `        print(" ".join(map(str, result)))`;
    } else if (spec.output.type === "list<String>") {
      printCode = `        print(" ".join(result))`;
    } else if (spec.output.type === "list<list<int>>") {
      printCode = `        for row in result:
            print(" ".join(map(str, row)))`;
    } else if (spec.output.type === "list<list<String>>") {
      printCode = `        for row in result:
            print(" ".join(row))`;
    }

    return `from __future__ import annotations
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
${reads}
        _cc_t0 = _cc_time.perf_counter()
        result = Solution().${spec.functionName}(${args})
        _cc_t1 = _cc_time.perf_counter()
        _cc_dur = _cc_t1 - _cc_t0
        if _cc_dur > _cc_max_s: _cc_max_s = _cc_dur
${printCode}
    _cc_sys.stderr.write(f"__CODECLASH_TIME_MS__:{max(1, round(_cc_max_s * 1000))}\\n")

if __name__ == "__main__":
    main()
`;
  }

  if (languageKey === "javascript") {
    const readVar = (type, name) => {
      if (type === "int" || type === "long") return `    const ${name} = readInt();\n    if (${name} === null) break;`;
      if (type === "double") return `    const ${name} = readFloat();\n    if (${name} === null) break;`;
      if (type === "bool") return `    const ${name} = readBool();\n    if (${name} === null) break;`;
      if (type === "String") return `    const ${name} = readStr();\n    if (${name} === null) break;`;
      if (type === "list<int>") return `    const ${name} = readIntList();\n    if (${name} === null) break;`;
      if (type === "list<String>") return `    const ${name} = readStrList();\n    if (${name} === null) break;`;
      if (type === "list<list<int>>") return `    const ${name} = readIntMatrix();\n    if (${name} === null) break;`;
      if (type === "list<list<String>>") return `    const ${name} = readStrMatrix();\n    if (${name} === null) break;`;
      return `    const ${name} = readInt();\n    if (${name} === null) break;`;
    };

    const reads = spec.inputs.map((x) => readVar(x.type, x.name)).join("\n");

    let printCode = "    console.log(result);";
    if (spec.output.type === "bool") {
      printCode = "    console.log(result ? 1 : 0);";
    } else if (spec.output.type === "list<int>" || spec.output.type === "list<long>" || spec.output.type === "list<String>") {
      printCode = `    console.log(result.join(" "));`;
    } else if (spec.output.type === "list<list<int>>" || spec.output.type === "list<list<String>>") {
      printCode = `    for (const row of result) console.log(row.join(" "));`;
    }

    return `const fs = require("fs");

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

const tokens = fs.readFileSync(0, "utf8").trim().split(/\\s+/);
let cursor = 0;

function readStr() {
  if (cursor >= tokens.length || tokens[cursor] === "") return null;
  return tokens[cursor++];
}

function readInt() {
  const s = readStr();
  return s === null ? null : Number(s);
}

function readFloat() {
  const s = readStr();
  return s === null ? null : parseFloat(s);
}

function readBool() {
  const s = readStr();
  return s === null ? null : s === "1";
}

function readIntList() {
  const n = readInt();
  if (n === null) return null;
  const arr = new Array(n);
  for (let i = 0; i < n; i++) arr[i] = readInt();
  return arr;
}

function readStrList() {
  const n = readInt();
  if (n === null) return null;
  const arr = new Array(n);
  for (let i = 0; i < n; i++) arr[i] = readStr();
  return arr;
}

function readIntMatrix() {
  const r = readInt();
  if (r === null) return null;
  const mat = new Array(r);
  for (let i = 0; i < r; i++) mat[i] = readIntList();
  return mat;
}

function readStrMatrix() {
  const r = readInt();
  if (r === null) return null;
  const mat = new Array(r);
  for (let i = 0; i < r; i++) mat[i] = readStrList();
  return mat;
}

function main() {
  let _cc_max_ms = 0;
  while (cursor < tokens.length && tokens[cursor] !== "") {
${reads}
    const _cc_t0 = performance.now();
    const result = new Solution().${spec.functionName}(${args});
    const _cc_t1 = performance.now();
    const _cc_dur = _cc_t1 - _cc_t0;
    if (_cc_dur > _cc_max_ms) _cc_max_ms = _cc_dur;
${printCode}
  }
  process.stderr.write("__CODECLASH_TIME_MS__:" + Math.max(1, Math.round(_cc_max_ms)) + "\\n");
}

main();
`;
  }

  throw new Error(`Unsupported language: ${languageKey}`);
}

// Generate templates for the selected problem(s).
async function main() {
  let problemDirs;

  try {
    problemDirs = await selectProblems(problemsRoot);
  } catch (error) {
    console.error(`Selection error: ${error.message}`);
    process.exitCode = 1;
    return;
  }

  if (problemDirs.length === 0) {
    console.error("No problem directories found.");
    process.exitCode = 1;
    return;
  }

  let failures = 0;

  for (const entry of problemDirs) {
    const problemDir = path.join(problemsRoot, entry.name);

    try {
      const spec = await readStructure(
        path.join(problemDir, "Structure.md")
      );

      const simpleDir = path.join(problemDir, "boilerplate");
      const fullDir = path.join(problemDir, "boilerplate-full");

      await fs.mkdir(simpleDir, { recursive: true });
      await fs.mkdir(fullDir, { recursive: true });

      for (const [key, language] of Object.entries(languages)) {
        const simple = simpleTemplate(spec, language, key);
        const full = fullTemplate(spec, key);

        await fs.writeFile(
          path.join(simpleDir, `function.${language.extension}`),
          simple
        );

        await fs.writeFile(
          path.join(fullDir, `function.${language.extension}`),
          full
        );
      }

      console.log(
        `Generated editor and full templates: ${entry.name}`
      );
    } catch (error) {
      failures++;
      console.error(`Failed ${entry.name}: ${error.message}`);
    }
  }

  if (failures > 0) {
    console.error(
      `\nGeneration failed for ${failures} problem(s).`
    );
    process.exitCode = 1;
  } else {
    console.log(
      `\nGeneration completed for ${problemDirs.length} problem(s).`
    );
  }
}

await main();
