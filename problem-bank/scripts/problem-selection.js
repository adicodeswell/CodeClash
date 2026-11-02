
import fs from "node:fs/promises";
import path from "node:path";

export async function selectProblems(problemsRoot) {
  const args = process.argv.slice(2);

  if (args.length > 1) {
    throw new Error(
      "Usage: npm run <script> -- [problem-slug]"
    );
  }

  const entries = (await fs.readdir(problemsRoot, {
    withFileTypes: true,
  }))
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name));

  // No slug supplied: process every problem.
  if (args.length === 0) {
    return entries;
  }

  const slug = args[0];

  // Prevent paths and invalid slugs.
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Invalid problem slug: "${slug}"`);
  }

  const selected = entries.filter(
    (entry) => entry.name === slug
  );

  if (selected.length === 0) {
    throw new Error(`Problem "${slug}" was not found.`);
  }

  return selected;
}
