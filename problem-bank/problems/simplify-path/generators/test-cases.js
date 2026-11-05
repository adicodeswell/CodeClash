export function generateCases({ rng }) {
  const cases = [];
  // Basic (10)
  cases.push({ category: "basic", description: "Example 1", inputs: { path: "/home/" } });
  cases.push({ category: "basic", description: "Example 2", inputs: { path: "/../" } });
  cases.push({ category: "basic", description: "Example 3", inputs: { path: "/home//foo/" } });
  cases.push({ category: "basic", description: "Root only", inputs: { path: "/" } });
  cases.push({ category: "basic", description: "Multiple slashes", inputs: { path: "///" } });
  cases.push({ category: "basic", description: "Relative dots", inputs: { path: "/a/./b/../../c/" } });
  cases.push({ category: "basic", description: "Hidden file name", inputs: { path: "/.../a/../b/c/../d/./" } });
  cases.push({ category: "basic", description: "Complex traversal", inputs: { path: "/a/../../b/../c//.//" } });
  cases.push({ category: "basic", description: "Deep path", inputs: { path: "/a/b/c/d/e/f/g" } });
  cases.push({ category: "basic", description: "Underscores and digits", inputs: { path: "/user_123/bin/../lib" } });

  // Edge (15)
  for (let i = 0; i < 15; i++) {
    const dots = Array(i + 2).fill("..").join("/");
    cases.push({ category: "edge", description: "Edge " + i, inputs: { path: "/" + dots } });
  }

  // Corner (15)
  for (let i = 0; i < 15; i++) {
    const slashes = "/".repeat(i + 4) + "folder" + "/".repeat(i + 2);
    cases.push({ category: "corner", description: "Corner " + i, inputs: { path: slashes } });
  }

  // Random (25)
  const segments = ["a", "b", "c", ".", "..", "...", "dir_1", "doc"];
  for (let i = 0; i < 25; i++) {
    const len = (i % 8) + 3;
    const chosen = Array.from({ length: len }, () => segments[Math.floor(Math.random() * segments.length)]);
    cases.push({ category: "random", description: "Random " + i, inputs: { path: "/" + chosen.join("/") } });
  }

  // Large (15)
  for (let i = 0; i < 15; i++) {
    const parts = Array.from({ length: 100 }, (_, idx) => (idx % 3 === 0 ? ".." : "folder_" + idx));
    cases.push({ category: "large", description: "Large " + i, inputs: { path: "/" + parts.join("/") } });
  }

  return cases;
}