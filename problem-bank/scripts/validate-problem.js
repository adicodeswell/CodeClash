
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { readStructure } from "./structure.js";
import { selectProblems } from "./problem-selection.js";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

const problemsRoot = path.join(root, "problems");

let failures = 0;

async function filesIn(dir) {
  try {
    return (await fs.readdir(dir, { withFileTypes: true }))
      .filter((item) => item.isFile())
      .map((item) => item.name)
      .sort();
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function requireFile(filePath, description) {
  try {
    const stat = await fs.stat(filePath);

    if (!stat.isFile()) {
      throw new Error(`${description} is not a file.`);
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Missing ${description}: ${filePath}`, { cause: error });
    }

    throw error;
  }
}

// Validate whitespace-separated integer inputs.
// list<int> is represented as: length followed by its elements.
function validateInput(raw, spec, filename) {
  const trimmed = raw.trim();

  if (!trimmed) {
    throw new Error(`Test input ${filename} is empty.`);
  }

  const tokens = trimmed.split(/\s+/);
  let index = 0;

  for (const field of spec.inputs) {
    if (field.type === "int" || field.type === "long") {
      if (index >= tokens.length) {
        throw new Error(`Test input ${filename} is missing value for "${field.name}".`);
      }
      const token = tokens[index++];
      if (!/^-?\d+$/.test(token)) {
        throw new Error(`Test input ${filename} contains non-integer token "${token}" for "${field.name}".`);
      }
      if (!Number.isSafeInteger(Number(token))) {
        throw new Error(`Test input ${filename} contains unsafe integer "${token}" for "${field.name}".`);
      }
      continue;
    }

    if (field.type === "double") {
      if (index >= tokens.length) {
        throw new Error(`Test input ${filename} is missing value for "${field.name}".`);
      }
      const token = tokens[index++];
      if (isNaN(Number(token))) {
        throw new Error(`Test input ${filename} contains non-double token "${token}" for "${field.name}".`);
      }
      continue;
    }

    if (field.type === "bool") {
      if (index >= tokens.length) {
        throw new Error(`Test input ${filename} is missing value for "${field.name}".`);
      }
      const token = tokens[index++];
      if (token !== "0" && token !== "1") {
        throw new Error(`Test input ${filename} contains invalid bool token "${token}" for "${field.name}".`);
      }
      continue;
    }

    if (field.type === "String") {
      if (index >= tokens.length) {
        throw new Error(`Test input ${filename} is missing value for "${field.name}".`);
      }
      index++;
      continue;
    }

    if (field.type === "list<int>" || field.type === "list<long>") {
      if (index >= tokens.length) {
        throw new Error(`Test input ${filename} is missing length for "${field.name}".`);
      }
      const lengthToken = tokens[index++];
      if (!/^\d+$/.test(lengthToken)) {
        throw new Error(`Test input ${filename} has non-integer length "${lengthToken}" for "${field.name}".`);
      }
      const length = Number(lengthToken);
      if (!Number.isSafeInteger(length) || length < 0) {
        throw new Error(`Test input ${filename} has invalid list length for "${field.name}".`);
      }
      if (index + length > tokens.length) {
        throw new Error(`Test input ${filename} does not contain enough values for "${field.name}".`);
      }
      for (let i = 0; i < length; i++) {
        const item = tokens[index++];
        if (!/^-?\d+$/.test(item)) {
          throw new Error(`Test input ${filename} contains non-integer item "${item}" in "${field.name}".`);
        }
      }
      continue;
    }

    if (field.type === "list<String>") {
      if (index >= tokens.length) {
        throw new Error(`Test input ${filename} is missing length for "${field.name}".`);
      }
      const length = Number(tokens[index++]);
      if (!Number.isSafeInteger(length) || length < 0) {
        throw new Error(`Test input ${filename} has invalid list length for "${field.name}".`);
      }
      if (index + length > tokens.length) {
        throw new Error(`Test input ${filename} does not contain enough values for "${field.name}".`);
      }
      index += length;
      continue;
    }

    if (field.type === "list<list<int>>") {
      if (index >= tokens.length) {
        throw new Error(`Test input ${filename} is missing row count for "${field.name}".`);
      }
      const rows = Number(tokens[index++]);
      if (!Number.isSafeInteger(rows) || rows < 0) {
        throw new Error(`Test input ${filename} has invalid row count for "${field.name}".`);
      }
      for (let r = 0; r < rows; r++) {
        if (index >= tokens.length) {
          throw new Error(`Test input ${filename} is missing column count for row ${r} of "${field.name}".`);
        }
        const cols = Number(tokens[index++]);
        if (!Number.isSafeInteger(cols) || cols < 0) {
          throw new Error(`Test input ${filename} has invalid col count for row ${r} of "${field.name}".`);
        }
        if (index + cols > tokens.length) {
          throw new Error(`Test input ${filename} does not contain enough values for row ${r} of "${field.name}".`);
        }
        for (let c = 0; c < cols; c++) {
          const item = tokens[index++];
          if (!/^-?\d+$/.test(item)) {
            throw new Error(`Test input ${filename} contains non-integer item "${item}" at [${r}][${c}] in "${field.name}".`);
          }
        }
      }
      continue;
    }

    if (field.type === "list<list<String>>") {
      if (index >= tokens.length) {
        throw new Error(`Test input ${filename} is missing row count for "${field.name}".`);
      }
      const rows = Number(tokens[index++]);
      if (!Number.isSafeInteger(rows) || rows < 0) {
        throw new Error(`Test input ${filename} has invalid row count for "${field.name}".`);
      }
      for (let r = 0; r < rows; r++) {
        if (index >= tokens.length) {
          throw new Error(`Test input ${filename} is missing column count for row ${r} of "${field.name}".`);
        }
        const cols = Number(tokens[index++]);
        if (!Number.isSafeInteger(cols) || cols < 0) {
          throw new Error(`Test input ${filename} has invalid col count for row ${r} of "${field.name}".`);
        }
        if (index + cols > tokens.length) {
          throw new Error(`Test input ${filename} does not contain enough values for row ${r} of "${field.name}".`);
        }
        index += cols;
      }
      continue;
    }

    throw new Error(
      `Unsupported input type "${field.type}" for "${field.name}".`
    );
  }

  if (index !== tokens.length) {
    throw new Error(
      `Test input ${filename} contains ${tokens.length - index} unexpected token(s).`
    );
  }
}

function validateOutput(raw, spec, filename) {
  if (!raw.trim()) {
    throw new Error(`Test output ${filename} is empty.`);
  }

  const tokens = raw.trim().split(/\s+/);
  const isNumeric =
    spec.output.type === "int" ||
    spec.output.type === "long" ||
    spec.output.type === "double" ||
    spec.output.type === "bool" ||
    spec.output.type === "list<int>" ||
    spec.output.type === "list<long>" ||
    spec.output.type === "list<list<int>>";

  if (isNumeric) {
    for (const token of tokens) {
      if (!/^-?\d+$/.test(token) && isNaN(Number(token))) {
        throw new Error(
          `Test output ${filename} contains a non-numeric token: "${token}".`
        );
      }
    }
  }
}

async function validateProblem(entry) {
  const slug = entry.name;
  const dir = path.join(problemsRoot, slug);

  await requireFile(
    path.join(dir, "Problem.md"),
    "Problem.md"
  );

  await requireFile(
    path.join(dir, "Structure.md"),
    "Structure.md"
  );

  const spec = await readStructure(
    path.join(dir, "Structure.md")
  );

  const inputsDir = path.join(dir, "tests", "inputs");
  const outputsDir = path.join(dir, "tests", "outputs");

  const inputs = await filesIn(inputsDir);
  const outputs = await filesIn(outputsDir);

  if (inputs.length === 0) {
    throw new Error("No test input files found.");
  }

  if (inputs.join("\n") !== outputs.join("\n")) {
    throw new Error(
      `Input/output filenames differ. ` +
      `inputs=[${inputs.join(", ")}], ` +
      `outputs=[${outputs.join(", ")}]`
    );
  }

  const languages = [
    ["cpp", "function.cpp"],
    ["java", "function.java"],
    ["python", "function.py"],
    ["javascript", "function.js"],
  ];

  // Check editor and full-driver boilerplates.
  for (const [, filename] of languages) {
    const simplePath = path.join(
      dir,
      "boilerplate",
      filename
    );

    const fullPath = path.join(
      dir,
      "boilerplate-full",
      filename
    );

    await requireFile(simplePath, `editor boilerplate ${filename}`);
    await requireFile(fullPath, `full-driver boilerplate ${filename}`);

    const fullTemplate = await fs.readFile(fullPath, "utf8");

    if (!fullTemplate.includes("{{USER_CODE}}")) {
      throw new Error(
        `${filename} in boilerplate-full is missing {{USER_CODE}}.`
      );
    }
  }

  // Validate every matching input/output test pair.
  for (const filename of inputs) {
    const inputPath = path.join(inputsDir, filename);
    const outputPath = path.join(outputsDir, filename);

    const inputRaw = await fs.readFile(inputPath, "utf8");
    const outputRaw = await fs.readFile(outputPath, "utf8");

    validateInput(inputRaw, spec, filename);
    validateOutput(outputRaw, spec, filename);
  }

  return {
    slug,
    functionName: spec.functionName,
    testCount: inputs.length,
  };
}

// Main execution.
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

  // This complete loop validates only the selected directories.
  for (const entry of problemDirs) {
    try {
      const result = await validateProblem(entry);

      console.log(
        `OK  ${result.slug} — ${result.functionName} ` +
        `(${result.testCount} test cases)`
      );
    } catch (error) {
      failures++;
      console.error(`FAIL ${entry.name}: ${error.message}`);
    }
  }

  if (failures > 0) {
    console.error(`\nValidation failed: ${failures} problem(s).`);
    process.exitCode = 1;
  } else {
    console.log(
      `\nValidation passed for ${problemDirs.length} problem(s).`
    );
  }
}

await main();
