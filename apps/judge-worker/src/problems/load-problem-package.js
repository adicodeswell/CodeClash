/**
 * Loads problem package, validates templates, and composes executable code.
 */
export async function loadProblemPackage(prisma, submission) {
  const problem = await prisma.problem.findUnique({
    where: { id: submission.problemId },
    select: {
      id: true,
      status: true,
      languages: true,
      testCases: true,
      timeLimitMs: true,
      memoryLimitKb: true,
      packageVersion: true,
    },
  });

  if (!problem || problem.status !== "PUBLISHED") {
    throw new Error(`Problem not found or not published: ${submission.problemId}`);
  }

  const langConfig = problem.languages?.[submission.language];
  if (!langConfig?.enabled || !langConfig?.fullDriverTemplate) {
    throw new Error(
      `Language '${submission.language}' is not configured for problem ${problem.id}`
    );
  }

  const driver = langConfig.fullDriverTemplate;
  if (!driver.includes("{{USER_CODE}}")) {
    throw new Error(`Full driver template is missing {{USER_CODE}} marker`);
  }

  // Safe string replacement: function replacer prevents '$' sequence issues
  const executableSource = driver.replace("{{USER_CODE}}", () => submission.sourceCode);

  const testCases = Array.isArray(problem.testCases)
    ? [...problem.testCases].sort((a, b) => (a.ordinal ?? 0) - (b.ordinal ?? 0))
    : [];

  if (testCases.length === 0) {
    throw new Error(`Problem ${problem.id} has no test cases configured`);
  }

  return {
    problem,
    executableSource,
    testCases,
    cpuTimeLimit: Math.max(1, Math.ceil(problem.timeLimitMs / 1000)),
    memoryLimitKb: problem.memoryLimitKb || 262144,
  };
}
