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
  timeoutMs = 15000,
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
