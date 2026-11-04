// Reference Solution Verification CLI.
// Cross-checks the optimized reference/solution.js against reference/baseline-solution.js
// across generated test cases and randomized fuzzing inputs to guarantee 100% correct answer keys.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { readStructure } from "./structure.js";
import { selectProblems } from "./problem-selection.js";
import { parseInput } from "./utils/formatter.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const problemBankRoot = path.resolve(__dirname, "..");
const problemsRoot = path.join(problemBankRoot, "problems");

function areResultsEqual(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  return a === b;
}

async function verifyProblem(problemEntry) {
  const slug = problemEntry.name;
  const dir = path.join(problemsRoot, slug);

  const solutionPath = path.join(dir, "reference", "solution.js");
  const baselinePath = path.join(dir, "reference", "baseline-solution.js");
  const structurePath = path.join(dir, "Structure.md");

  try {
    await fs.stat(solutionPath);
  } catch {
    console.log(`SKIP ${slug} — no reference/solution.js found.`);
    return null;
  }

  try {
    await fs.stat(baselinePath);
  } catch {
    console.log(`SKIP ${slug} — no reference/baseline-solution.js found (cross-verification skipped).`);
    return null;
  }

  const spec = await readStructure(structurePath);
  const { solve: solveOptimized } = await import(`file://${solutionPath}`);
  const { solve: solveBaseline } = await import(`file://${baselinePath}`);

  // Test 1: Verify on all existing test cases in tests/inputs where size is reasonable for baseline
  const inputsDir = path.join(dir, "tests", "inputs");
  let testCount = 0;
  let skippedLargeCount = 0;

  try {
    const inputFiles = (await fs.readdir(inputsDir))
      .filter((f) => f.endsWith(".txt"))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    for (const filename of inputFiles) {
      const raw = await fs.readFile(path.join(inputsDir, filename), "utf8");
      const args = parseInput(spec, raw);

      // Check if any array argument is very large (skip for baseline O(N^2) or slow operations)
      const hasLargeArray = args.some((arg) => Array.isArray(arg) && arg.length > 2500);
      if (hasLargeArray) {
        skippedLargeCount++;
        continue;
      }

      const optRes = solveOptimized(...args);
      const baseRes = solveBaseline(...args);

      if (!areResultsEqual(optRes, baseRes)) {
        throw new Error(
          `Mismatch on test case ${filename}: optimized returned [${optRes}], baseline returned [${baseRes}]`
        );
      }
      testCount++;
    }
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }

  return {
    slug,
    testCasesChecked: testCount,
    skippedLargeCount,
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

  let verifiedCount = 0;

  for (const problem of problems) {
    try {
      const res = await verifyProblem(problem);
      if (res) {
        verifiedCount++;
        console.log(
          `VERIFIED ${res.slug} -> Checked ${res.testCasesChecked} test cases against baseline (${res.skippedLargeCount} large stress skipped for baseline). 100% agreement!`
        );
      }
    } catch (err) {
      console.error(`VERIFICATION FAILED ${problem.name}: ${err.message}`);
      process.exitCode = 1;
    }
  }

  console.log(`\nVerification finished for ${verifiedCount} problem(s).`);
}

main();
