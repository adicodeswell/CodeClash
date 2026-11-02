
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
      throw new Error(`Missing ${description}: ${filePath}`);
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

  for (const token of tokens) {
    if (!/^-?\d+$/.test(token)) {
      throw new Error(
        `Test input ${filename} contains a non-integer token: "${token}".`
      );
    }

    if (!Number.isSafeInteger(Number(token))) {
      throw new Error(
        `Test input ${filename} contains an unsafe integer: "${token}".`
      );
    }
  }

  let index = 0;

  for (const field of spec.inputs) {
    if (field.type === "int") {
      if (index >= tokens.length) {
        throw new Error(
          `Test input ${filename} is missing the value for "${field.name}".`
        );
      }

      index++;
      continue;
    }

    if (field.type === "list<int>") {
      if (index >= tokens.length) {
        throw new Error(
          `Test input ${filename} is missing the length for "${field.name}".`
        );
      }

      const length = Number(tokens[index++]);

      if (!Number.isSafeInteger(length) || length < 0) {
        throw new Error(
          `Test input ${filename} has an invalid list length for "${field.name}".`
        );
      }

      if (index + length > tokens.length) {
        throw new Error(
          `Test input ${filename} does not contain enough values for "${field.name}".`
        );
      }

      index += length;
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

function validateOutput(raw, filename) {
  if (!raw.trim()) {
    throw new Error(`Test output ${filename} is empty.`);
  }

  const tokens = raw.trim().split(/\s+/);

  for (const token of tokens) {
    if (!/^-?\d+$/.test(token)) {
      throw new Error(
        `Test output ${filename} contains a non-integer token: "${token}".`
      );
    }

    if (!Number.isSafeInteger(Number(token))) {
      throw new Error(
        `Test output ${filename} contains an unsafe integer: "${token}".`
      );
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
    validateOutput(outputRaw, filename);
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
