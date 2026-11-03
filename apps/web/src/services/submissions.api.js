import { submissionsAPI } from "../api/client.js";

/**
 * Run solution against the problem's real sample test cases on Judge0.
 */
export async function runCode({ problemSlug, language, sourceCode }) {
  if (!problemSlug) {
    throw new Error("Problem slug is required.");
  }
  if (!language) {
    throw new Error("Language must be selected.");
  }
  if (!sourceCode || !sourceCode.trim()) {
    throw new Error("Source code cannot be empty.");
  }

  const response = await submissionsAPI.run({
    problemSlug,
    language,
    sourceCode,
  });

  return response.result;
}

/**
 * Submit solution for full judging evaluation.
 */
export async function submitCode({ problemSlug, language, sourceCode }) {
  if (!problemSlug) {
    throw new Error("Problem slug is required.");
  }
  if (!language) {
    throw new Error("Language must be selected.");
  }
  if (!sourceCode || !sourceCode.trim()) {
    throw new Error("Source code cannot be empty.");
  }

  const response = await submissionsAPI.submit({
    problemSlug,
    language,
    sourceCode,
  });

  return response.submission;
}

/**
 * Fetch the current execution status and verdict of a submission.
 */
export async function getSubmissionStatus(submissionId) {
  if (!submissionId) {
    throw new Error("Submission ID is required.");
  }

  const response = await submissionsAPI.getStatus(submissionId);
  return response.submission;
}
