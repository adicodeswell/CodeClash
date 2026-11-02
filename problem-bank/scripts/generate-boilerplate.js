
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
  const supported = new Set(["int", "list<int>"]);
  const allTypes = [
    ...spec.inputs.map((x) => x.type),
    spec.output.type,
  ];

  for (const type of allTypes) {
    if (!supported.has(type)) {
      throw new Error(
        `Full driver does not support type "${type}" yet.`
      );
    }
  }

  const args = spec.inputs.map((x) => x.name).join(", ");

  const readValue = (field) =>
    field.type === "int" ? "readInt()" : "readIntList()";

  if (languageKey === "cpp") {
    const reads = spec.inputs
      .map((x) => `    auto ${x.name} = ${readValue(x)};`)
      .join("\n");

    const print =
      spec.output.type === "int"
        ? `    cout << result << '\\n';`
        : `    for (size_t i = 0; i < result.size(); i++) {
        if (i) cout << ' ';
        cout << result[i];
    }
    cout << '\\n';`;

    return `#include <bits/stdc++.h>
using namespace std;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

int readInt() {
    int value;
    if (!(cin >> value)) throw runtime_error("Missing integer input");
    return value;
}

vector<int> readIntList() {
    int n = readInt();
    if (n < 0) throw runtime_error("Negative list length");
    vector<int> values(n);
    for (int &value : values) value = readInt();
    return values;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

${reads}
    Solution solution;
    auto result = solution.${spec.functionName}(${args});
${print}
    return 0;
}
`;
  }

  if (languageKey === "java") {
    const reads = spec.inputs
      .map((x) =>
        x.type === "int"
          ? `        int ${x.name} = scanner.nextInt();`
          : `        int n_${x.name} = scanner.nextInt();
        if (n_${x.name} < 0) throw new IllegalArgumentException("Negative list length");
        int[] ${x.name} = new int[n_${x.name}];
        for (int i = 0; i < n_${x.name}; i++) ${x.name}[i] = scanner.nextInt();`
      )
      .join("\n");

    const print =
      spec.output.type === "int"
        ? `        System.out.println(result);`
        : `        for (int i = 0; i < result.length; i++) {
            if (i > 0) System.out.print(" ");
            System.out.print(result[i]);
        }
        System.out.println();`;

    return `import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
${reads}
        Solution solution = new Solution();
        ${spec.output.type === "int" ? "int" : "int[]"} result =
            solution.${spec.functionName}(${args});
${print}
    }
}
`;
  }

  if (languageKey === "python") {
    const reads = spec.inputs
      .map((x) =>
        x.type === "int"
          ? `    ${x.name} = read_int()`
          : `    ${x.name} = read_int_list()`
      )
      .join("\n");

    const print =
      spec.output.type === "int"
        ? "    print(result)"
        : `    print(" ".join(map(str, result)))`;

    return `import sys

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
${reads}
    result = Solution().${spec.functionName}(${args})
${print}

if __name__ == "__main__":
    main()
`;
  }

  if (languageKey === "javascript") {
    const reads = spec.inputs
      .map((x) =>
        x.type === "int"
          ? `  const ${x.name} = readInt();`
          : `  const ${x.name} = readIntList();`
      )
      .join("\n");

    const print =
      spec.output.type === "int"
        ? "  console.log(result);"
        : `  console.log(result.join(" "));`;

    return `const fs = require("node:fs");

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

const tokens = fs.readFileSync(0, "utf8").trim().split(/\\s+/);
let cursor = 0;

function readInt() {
  if (cursor >= tokens.length || tokens[cursor] === "") {
    throw new Error("Missing integer input");
  }

  const value = Number(tokens[cursor++]);

  if (!Number.isSafeInteger(value)) {
    throw new Error("Expected a safe integer");
  }

  return value;
}

function readIntList() {
  const n = readInt();

  if (n < 0) {
    throw new Error("Negative list length");
  }

  return Array.from({ length: n }, readInt);
}

function main() {
${reads}
  const result = new Solution().${spec.functionName}(${args});
${print}
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
