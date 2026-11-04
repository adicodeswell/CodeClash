// Test Suite Summary & Audit CLI.
// Analyzes the generated test suite for problems and prints a comprehensive report.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { readStructure } from "./structure.js";
import { selectProblems } from "./problem-selection.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const problemBankRoot = path.resolve(__dirname, "..");
const problemsRoot = path.join(problemBankRoot, "problems");

async function summarizeProblem(problemEntry) {
  const slug = problemEntry.name;
  const dir = path.join(problemsRoot, slug);

  const statementPath = path.join(dir, "Problem.md");
  const inputsDir = path.join(dir, "tests", "inputs");
  const outputsDir = path.join(dir, "tests", "outputs");

  let inputFiles = [];
  try {
    inputFiles = (await fs.readdir(inputsDir))
      .filter((f) => f.endsWith(".txt"))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    console.log(`SKIP ${slug} — no tests/inputs directory.`);
    return;
  }

  if (inputFiles.length === 0) {
    console.log(`SKIP ${slug} — no test cases found.`);
    return;
  }

  let statement = "";
  try {
    statement = await fs.readFile(statementPath, "utf8");
  } catch {}

  const sampleCount = (statement.match(/###\s+Example/gi) || []).length || 2;
  const hiddenCount = Math.max(0, inputFiles.length - sampleCount);

  let totalInputBytes = 0;
  let totalOutputBytes = 0;
  let minLength = Infinity;
  let maxLength = -Infinity;
  let minValue = Infinity;
  let maxValue = -Infinity;

  for (const file of inputFiles) {
    const inputPath = path.join(inputsDir, file);
    const outputPath = path.join(outputsDir, file);

    const inStat = await fs.stat(inputPath);
    totalInputBytes += inStat.size;

    try {
      const outStat = await fs.stat(outputPath);
      totalOutputBytes += outStat.size;
    } catch {}

    const raw = await fs.readFile(inputPath, "utf8");
    const tokens = raw.trim().split(/\s+/).map(Number);

    // If first token is array length
    if (tokens.length >= 2) {
      const n = tokens[0];
      if (n < minLength) minLength = n;
      if (n > maxLength) maxLength = n;

      for (let i = 1; i < tokens.length; i++) {
        const v = tokens[i];
        if (v < minValue) minValue = v;
        if (v > maxValue) maxValue = v;
      }
    }
  }

  console.log(`\n======================================================`);
  console.log(`Test Suite Summary: ${slug}`);
  console.log(`======================================================`);
  console.log(`Total Test Cases   : ${inputFiles.length}`);
  console.log(`Visibility         : ${sampleCount} Sample (public), ${hiddenCount} Hidden`);
  if (minLength !== Infinity) {
    console.log(`Array Size (N)     : min = ${minLength}, max = ${maxLength}`);
    console.log(`Value Range        : [${minValue}, ${maxValue}]`);
  }
  console.log(`Disk Storage       : Inputs ${(totalInputBytes / 1024).toFixed(1)} KB, Outputs ${(totalOutputBytes / 1024).toFixed(1)} KB`);
  console.log(`======================================================\n`);
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

  for (const problem of problems) {
    await summarizeProblem(problem);
  }
}

main();
