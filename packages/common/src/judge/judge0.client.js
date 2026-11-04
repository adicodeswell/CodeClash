import { setTimeout as sleep } from "node:timers/promises";

const BASE_URL = process.env.JUDGE0_BASE_URL || "https://ce.judge0.com";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || "judge0-ce.p.rapidapi.com";

function getHeaders() {
  const headers = { "Content-Type": "application/json" };
  if (BASE_URL.includes("rapidapi.com") && RAPIDAPI_KEY) {
    headers["x-rapidapi-key"] = RAPIDAPI_KEY;
    headers["x-rapidapi-host"] = RAPIDAPI_HOST;
  }
  return headers;
}

const encodeBase64 = (str) =>
  str != null ? Buffer.from(String(str)).toString("base64") : null;

const decodeBase64 = (b64) =>
  b64 ? Buffer.from(b64, "base64").toString("utf-8") : null;

/**
 * Creates a submission on Judge0 and returns the token.
 */
export async function createJudge0Submission({
  sourceCode,
  languageId,
  stdin = "",
  cpuTimeLimit = 2,
  memoryLimitKb = 262144,
}) {
  const payload = {
    language_id: languageId,
    source_code: encodeBase64(sourceCode),
    stdin: encodeBase64(stdin),
    cpu_time_limit: Math.max(1, cpuTimeLimit),
    memory_limit: Math.max(1024, memoryLimitKb),
  };

  const response = await fetch(`${BASE_URL}/submissions?base64_encoded=true`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      `Judge0 submission failed (HTTP ${response.status}): ${errorText}`
    );
  }

  const data = await response.json();
  if (!data.token) {
    throw new Error("Judge0 did not return a submission token");
  }

  return data.token;
}

/**
 * Directly executes code on Judge0 with wait=true (single HTTP round-trip).
 * Ideal for fast synchronous previews (Run Code).
 */
export async function executeJudge0WithWait({
  sourceCode,
  languageId,
  stdin = "",
  cpuTimeLimit = 2,
  memoryLimitKb = 262144,
  timeoutMs = 25000,
}) {
  const payload = {
    language_id: languageId,
    source_code: encodeBase64(sourceCode),
    stdin: encodeBase64(stdin),
    cpu_time_limit: Math.max(1, cpuTimeLimit),
    memory_limit: Math.max(1024, memoryLimitKb),
  };

  const response = await fetch(
    `${BASE_URL}/submissions?base64_encoded=true&wait=true`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(timeoutMs),
    }
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      `Judge0 execution failed (HTTP ${response.status}): ${errorText}`
    );
  }

  const data = await response.json();
  return {
    statusId: data.status?.id,
    statusDescription: data.status?.description,
    stdout: decodeBase64(data.stdout),
    stderr: decodeBase64(data.stderr),
    compileOutput: decodeBase64(data.compile_output),
    time: parseFloat(data.time || "0"),
    memory: data.memory || 0,
  };
}

/**
 * Polls Judge0 until execution completes or timeout is reached.
 */
export async function pollJudge0Submission(
  token,
  { maxWaitMs = 25000, pollIntervalMs = 350 } = {}
) {
  const startTime = Date.now();

  while (Date.now() - startTime < maxWaitMs) {
    const response = await fetch(
      `${BASE_URL}/submissions/${token}?base64_encoded=true`,
      {
        headers: getHeaders(),
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!response.ok) {
      throw new Error(`Judge0 poll failed with HTTP ${response.status}`);
    }

    const data = await response.json();
    const statusId = data.status?.id;

    // Status 1: In Queue, Status 2: Processing
    if (statusId != null && statusId >= 3) {
      return {
        statusId,
        statusDescription: data.status?.description,
        stdout: decodeBase64(data.stdout),
        stderr: decodeBase64(data.stderr),
        compileOutput: decodeBase64(data.compile_output),
        time: parseFloat(data.time || "0"),
        memory: data.memory || 0,
      };
    }

    await sleep(pollIntervalMs);
  }

  throw new Error(`Execution timed out on Judge0 provider after ${maxWaitMs}ms`);
}

/**
 * Executes a batch of test cases via Judge0's native /submissions/batch endpoint.
 * Sends all test cases in a single HTTP POST request and polls until completion.
 *
 * @param {object} params
 * @param {Array<object>} params.submissions Array of submission objects: { sourceCode, languageId, stdin, cpuTimeLimit, memoryLimitKb }
 * @param {number} [params.timeoutMs=30000] Maximum wait time for batch completion
 * @param {number} [params.pollIntervalMs=400] Polling interval
 * @returns {Promise<Array<object>>} Array of evaluated Judge0 result objects
 */
export async function executeJudge0Batch({
  submissions,
  timeoutMs = 30000,
  pollIntervalMs = 400,
}) {
  if (!Array.isArray(submissions) || submissions.length === 0) {
    return [];
  }

  const payload = {
    submissions: submissions.map((sub) => ({
      language_id: sub.languageId,
      source_code: encodeBase64(sub.sourceCode),
      stdin: encodeBase64(sub.stdin || ""),
      cpu_time_limit: Math.max(1, sub.cpuTimeLimit || 2),
      memory_limit: Math.max(1024, sub.memoryLimitKb || 262144),
    })),
  };

  const createRes = await fetch(
    `${BASE_URL}/submissions/batch?base64_encoded=true`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    }
  );

  if (!createRes.ok) {
    const errorText = await createRes.text().catch(() => "");
    throw new Error(
      `Judge0 batch creation failed (HTTP ${createRes.status}): ${errorText}`
    );
  }

  const tokenObjects = await createRes.json();
  const tokens = tokenObjects.map((item) => item.token).filter(Boolean);

  if (tokens.length !== submissions.length) {
    throw new Error(
      `Judge0 returned ${tokens.length} tokens for ${submissions.length} batch submissions`
    );
  }

  const tokensParam = tokens.join(",");
  const startTime = Date.now();

  while (Date.now() - startTime < timeoutMs) {
    const pollRes = await fetch(
      `${BASE_URL}/submissions/batch?tokens=${tokensParam}&base64_encoded=true`,
      {
        headers: getHeaders(),
        signal: AbortSignal.timeout(15000),
      }
    );

    if (!pollRes.ok) {
      const errText = await pollRes.text().catch(() => "");
      throw new Error(`Judge0 batch poll failed (HTTP ${pollRes.status}): ${errText}`);
    }

    const pollData = await pollRes.json();
    const batchSubmissions = pollData.submissions || [];

    const allFinished =
      batchSubmissions.length === tokens.length &&
      batchSubmissions.every((s) => s.status?.id != null && s.status.id >= 3);

    if (allFinished) {
      return batchSubmissions.map((s) => ({
        statusId: s.status?.id,
        statusDescription: s.status?.description,
        stdout: decodeBase64(s.stdout),
        stderr: decodeBase64(s.stderr),
        compileOutput: decodeBase64(s.compile_output),
        time: parseFloat(s.time || "0"),
        memory: s.memory || 0,
      }));
    }

    await sleep(pollIntervalMs);
  }

  throw new Error(`Judge0 batch execution timed out after ${timeoutMs}ms`);
}
