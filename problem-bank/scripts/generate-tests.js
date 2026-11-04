// Problem Bank Test Generator CLI.
// Generates inputs/*.txt and outputs/*.txt for problems using their
// generators/test-cases.js and reference/solution.js.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { readStructure } from "./structure.js";
import { selectProblems } from "./problem-selection.js";
import { createRng } from "./utils/prng.js";
import { formatInput, formatOutput } from "./utils/formatter.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const problemBankRoot = path.resolve(__dirname, "..");
const problemsRoot = path.join(problemBankRoot, "problems");

async function generateForProblem(problemEntry) {
  const slug = problemEntry.name;
  const dir = path.join(problemsRoot, slug);

  const structurePath = path.join(dir, "Structure.md");
  const generatorPath = path.join(dir, "generators", "test-cases.js");
  const solutionPath = path.join(dir, "reference", "solution.js");

  // Verify necessary files exist
  try {
    await fs.stat(generatorPath);
  } catch {
    console.log(`SKIP ${slug} — no generators/test-cases.js found.`);
    return null;
  }

  try {
    await fs.stat(solutionPath);
  } catch {
    throw new Error(`${slug} has generators/test-cases.js but is missing reference/solution.js.`);
  }

  const spec = await readStructure(structurePath);

  // Dynamic import of generator and reference solution
  const { generateCases } = await import(`file://${generatorPath}`);
  const { solve } = await import(`file://${solutionPath}`);

  if (typeof generateCases !== "function") {
    throw new Error(`${slug}: generateCases must be a function exported by generators/test-cases.js`);
  }

  if (typeof solve !== "function") {
    throw new Error(`${slug}: solve must be a function exported by reference/solution.js`);
  }

  const rng = createRng(12345);
  const testCases = generateCases({ rng });

  if (!Array.isArray(testCases) || testCases.length === 0) {
    throw new Error(`${slug}: generateCases returned an empty or invalid test suite.`);
  }

  const inputsDir = path.join(dir, "tests", "inputs");
  const outputsDir = path.join(dir, "tests", "outputs");

  await fs.mkdir(inputsDir, { recursive: true });
  await fs.mkdir(outputsDir, { recursive: true });

  // Clean existing .txt files in inputs and outputs to avoid orphaned tests
  const existingInputs = (await fs.readdir(inputsDir)).filter((f) => f.endsWith(".txt"));
  const existingOutputs = (await fs.readdir(outputsDir)).filter((f) => f.endsWith(".txt"));

  for (const f of existingInputs) {
    await fs.unlink(path.join(inputsDir, f));
  }
  for (const f of existingOutputs) {
    await fs.unlink(path.join(outputsDir, f));
  }

  const categoryCounts = {};

  for (let idx = 0; idx < testCases.length; idx++) {
    const tc = testCases[idx];
    const category = tc.category || "uncategorized";
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;

    // Format input
    const inputContent = formatInput(spec, tc.inputs);

    // Run reference solution
    // Pass arguments in order declared in Structure.md
    const args = spec.inputs.map((field) =>
      Array.isArray(tc.inputs) ? tc.inputs[spec.inputs.indexOf(field)] : tc.inputs[field.name]
    );

    const result = solve(...args);
    const outputContent = formatOutput(spec, result);

    const filename = `${idx}.txt`;
    await fs.writeFile(path.join(inputsDir, filename), inputContent.trim() + "\n", "utf8");
    await fs.writeFile(path.join(outputsDir, filename), outputContent.trim() + "\n", "utf8");
  }

  return {
    slug,
    totalTests: testCases.length,
    categoryCounts,
  };
}

async function main() {
  let problems;
  try {
    problems = await selectProblems(problemsRoot);
  } catch (err) {
    console.error(`Selection error: ${err.message}`);
    process.exitCode = 1;
    return;
  }

  let generatedCount = 0;

  for (const problem of problems) {
    try {
      const res = await generateForProblem(problem);
      if (res) {
        generatedCount++;
        const breakdown = Object.entries(res.categoryCounts)
          .map(([cat, count]) => `${cat}: ${count}`)
          .join(", ");
        console.log(`SUCCESS  ${res.slug} -> Generated ${res.totalTests} tests (${breakdown})`);
      }
    } catch (err) {
      console.error(`FAILED   ${problem.name}: ${err.message}`);
      process.exitCode = 1;
    }
  }

  console.log(`\nDone. Generated tests for ${generatedCount} problem(s).`);
}

main();
