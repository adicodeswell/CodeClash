
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

import prisma from "../../packages/db/src/index.js";
import { readStructure } from "./structure.js";
import { selectProblems } from "./problem-selection.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const problemBankRoot = path.resolve(__dirname, "..");
const problemsRoot = path.join(problemBankRoot, "problems");
const manifestPath = path.join(problemBankRoot, "import-manifest.json");

const languages = [
  { key: "cpp", extension: "cpp" },
  { key: "java", extension: "java" },
  { key: "python", extension: "py" },
  { key: "javascript", extension: "js" },
];

const difficulties = new Set(["EASY", "MEDIUM", "HARD"]);

function sha256(text) {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

async function readRequired(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    throw new Error(`Required file not found: ${filePath}`);
  }
}

async function readTests(directory) {
  const names = (await fs.readdir(directory))
    .filter((name) => name.endsWith(".txt"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return names;
}

async function buildPackage(entry) {
  const slug = entry.name;
  const root = path.join(problemsRoot, slug);

  const statement = await readRequired(path.join(root, "Problem.md"));
  const structureText = await readRequired(path.join(root, "Structure.md"));
  const structure = await readStructure(path.join(root, "Structure.md"));

  const difficultyMatch = structureText.match(
    /^Difficulty:\s*(EASY|MEDIUM|HARD)\s*$/im
  );

  if (!difficultyMatch || !difficulties.has(difficultyMatch[1].toUpperCase())) {
    throw new Error(
      `${slug}: add "Difficulty: EASY", "Difficulty: MEDIUM", or "Difficulty: HARD" to Structure.md`
    );
  }

  const topicsMatch = structureText.match(/^Topics:\s*(.*?)\s*$/im);
  const topics = topicsMatch?.[1]
    ? topicsMatch[1].split(",").map((topic) => topic.trim()).filter(Boolean)
    : [];

  const languageData = {};

  for (const language of languages) {
    const starterTemplate = await readRequired(
      path.join(root, "boilerplate", `function.${language.extension}`)
    );

    const fullDriverTemplate = await readRequired(
      path.join(root, "boilerplate-full", `function.${language.extension}`)
    );

    if (!fullDriverTemplate.includes("{{USER_CODE}}")) {
      throw new Error(
        `${slug}: ${language.key} full-driver template is missing {{USER_CODE}}`
      );
    }

    languageData[language.key] = {
      enabled: true,
      starterTemplate,
      fullDriverTemplate,
      structure: {
        functionName: structure.functionName,
        inputs: structure.inputs,
        output: structure.output,
      },
    };
  }

  const inputsDir = path.join(root, "tests", "inputs");
  const outputsDir = path.join(root, "tests", "outputs");

  const inputFiles = await readTests(inputsDir);
  const outputFiles = await readTests(outputsDir);

  if (inputFiles.length === 0) {
    throw new Error(`${slug}: no test cases found`);
  }

  if (
    inputFiles.length !== outputFiles.length ||
    inputFiles.some((name) => !outputFiles.includes(name)) ||
    outputFiles.some((name) => !inputFiles.includes(name))
  ) {
    throw new Error(`${slug}: input and output test files do not match`);
  }

  const testCases = [];
  const exampleCount = (statement.match(/###\s+Example/gi) || []).length || 2;

  for (let ordinal = 0; ordinal < inputFiles.length; ordinal++) {
    const inputName = inputFiles[ordinal];
    const input = await readRequired(path.join(inputsDir, inputName));
    const expectedOutput = await readRequired(
      path.join(outputsDir, inputName)
    );

    if (!input.trim() || !expectedOutput.trim()) {
      throw new Error(`${slug}: empty test input or output in ${inputName}`);
    }

    testCases.push({
      ordinal,
      visibility: ordinal < exampleCount ? "SAMPLE" : "HIDDEN",
      input: input.trim(),
      expectedOutput: expectedOutput.trim(),
    });
  }

  // Hash the package content, including tests and templates.
  const filesToHash = [
    "Problem.md",
    "Structure.md",
    ...inputFiles.map((name) => `tests/inputs/${name}`),
    ...outputFiles.map((name) => `tests/outputs/${name}`),
    ...languages.flatMap((language) => [
      `boilerplate/function.${language.extension}`,
      `boilerplate-full/function.${language.extension}`,
    ]),
  ];

  const hashParts = [];

  for (const relativePath of filesToHash.sort()) {
    const content = await readRequired(path.join(root, relativePath));
    hashParts.push(`${relativePath}\0${content}`);
  }

  return {
    slug,
    title: structure.problemName,
    statement,
    difficulty: difficultyMatch[1].toUpperCase(),
    topics,
    packageVersion: "1",
    contentHash: sha256(hashParts.join("\0")),
    languages: languageData,
    testCases,
    testCaseCount: testCases.length,
  };
}

async function main() {
  const selectedEntries = await selectProblems(problemsRoot);
  const manifest = {
    generatedAt: new Date().toISOString(),
    problems: [],
  };

  try {
    for (const entry of selectedEntries) {
      const problem = await buildPackage(entry);

      const { testCaseCount, ...manifestProblem } = problem;

      // The manifest records metadata and hashes, not hidden test contents.
      manifest.problems.push({
        slug: manifestProblem.slug,
        title: manifestProblem.title,
        difficulty: manifestProblem.difficulty,
        topics: manifestProblem.topics,
        packageVersion: manifestProblem.packageVersion,
        contentHash: manifestProblem.contentHash,
        testCaseCount,
      });

      await prisma.problem.upsert({
        where: { slug: problem.slug },
        create: {
          slug: problem.slug,
          title: problem.title,
          statement: problem.statement,
          difficulty: problem.difficulty,
          topics: problem.topics,
          packageVersion: problem.packageVersion,
          contentHash: problem.contentHash,
          languages: problem.languages,
          testCases: problem.testCases,
          status: "PUBLISHED",
        },
        update: {
          title: problem.title,
          statement: problem.statement,
          difficulty: problem.difficulty,
          topics: problem.topics,
          packageVersion: problem.packageVersion,
          contentHash: problem.contentHash,
          languages: problem.languages,
          testCases: problem.testCases,
          status: "PUBLISHED",
        },
      });

      console.log(
        `Imported ${problem.slug} (${problem.difficulty}, ${testCaseCount} tests)`
      );
    }

    // Write the manifest only after every selected problem imports successfully.
    // A single-problem import produces a manifest for that selected problem.
    await fs.writeFile(
      manifestPath,
      `${JSON.stringify(manifest, null, 2)}\n`,
      "utf8"
    );

    console.log(`Manifest written to ${manifestPath}`);
    console.log(`Imported ${manifest.problems.length} problem(s).`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Problem import failed:", error.message);
  process.exitCode = 1;
});
