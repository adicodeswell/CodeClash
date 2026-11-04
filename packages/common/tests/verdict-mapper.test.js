import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  mapJudge0Result,
  extractExecutionMetrics,
  normalizeOutput,
} from "../src/judge/verdict-mapper.js";

describe("Verdict Mapper & Metrics Normalization (Task 2)", () => {
  test("extractExecutionMetrics correctly parses __CODECLASH_TIME_MS__ and purges it from stderr", () => {
    const rawResult = {
      time: "0.045",
      memory: 24500,
      stderr: "Something standard\n__CODECLASH_TIME_MS__:12\nTrailing line\n",
    };

    const metrics = extractExecutionMetrics(rawResult);
    assert.equal(metrics.runtimeMs, 12);
    assert.equal(metrics.memoryKb, 24500);
    assert.equal(
      metrics.cleanStderr,
      "Something standard\nTrailing line"
    );
  });

  test("extractExecutionMetrics sets cleanStderr to null when stderr contains only the timing marker", () => {
    const rawResult = {
      time: "0.015",
      memory: 51200,
      stderr: "__CODECLASH_TIME_MS__:1\n",
    };

    const metrics = extractExecutionMetrics(rawResult);
    assert.equal(metrics.runtimeMs, 1);
    assert.equal(metrics.cleanStderr, null);
  });

  test("mapJudge0Result maps status 3 to ACCEPTED when output matches", () => {
    const result = {
      statusId: 3,
      stdout: "0 1\n",
      stderr: null,
      time: "0.005",
      memory: 1024,
    };
    const mapped = mapJudge0Result(result, "0 1");
    assert.equal(mapped.verdict, "ACCEPTED");
    assert.equal(mapped.errorSummary, null);
  });

  test("mapJudge0Result maps status 3 to WRONG_ANSWER when output mismatches", () => {
    const result = {
      statusId: 3,
      stdout: "1 2\n",
      stderr: null,
      time: "0.005",
      memory: 1024,
    };
    const mapped = mapJudge0Result(result, "0 1");
    assert.equal(mapped.verdict, "WRONG_ANSWER");
    assert.ok(mapped.errorSummary);
  });

  test("mapJudge0Result maps status 5 to TIME_LIMIT_EXCEEDED", () => {
    const result = {
      statusId: 5,
      stdout: null,
      stderr: null,
      time: "2.000",
      memory: 5000,
    };
    const mapped = mapJudge0Result(result, "0 1");
    assert.equal(mapped.verdict, "TIME_LIMIT_EXCEEDED");
  });

  test("mapJudge0Result maps memory limit detection to MEMORY_LIMIT_EXCEEDED", () => {
    const result = {
      statusId: 11,
      statusDescription: "Memory Limit Exceeded",
      stdout: null,
      stderr: "Fatal error: memory limit exceeded",
      time: "0.100",
      memory: 262144,
    };
    const mapped = mapJudge0Result(result, "0 1");
    assert.equal(mapped.verdict, "MEMORY_LIMIT_EXCEEDED");
    assert.notEqual(mapped.verdict, "WRONG_ANSWER");
  });

  test("mapJudge0Result maps status 6 to COMPILATION_ERROR", () => {
    const result = {
      statusId: 6,
      compileOutput: "SyntaxError: Unexpected identifier",
      stdout: null,
      stderr: null,
    };
    const mapped = mapJudge0Result(result, "0 1");
    assert.equal(mapped.verdict, "COMPILATION_ERROR");
    assert.equal(mapped.errorSummary, "SyntaxError: Unexpected identifier");
  });

  test("mapJudge0Result maps runtime error statuses (7-12) to RUNTIME_ERROR", () => {
    const result = {
      statusId: 11,
      statusDescription: "Runtime Error (NZEC)",
      stderr: "ZeroDivisionError: division by zero",
      stdout: null,
    };
    const mapped = mapJudge0Result(result, "0 1");
    assert.equal(mapped.verdict, "RUNTIME_ERROR");
    assert.ok(mapped.errorSummary.includes("division by zero"));
  });

  test("mapJudge0Result maps status 13+ (infrastructure errors) to JUDGE_ERROR, not WRONG_ANSWER", () => {
    const result = {
      statusId: 13,
      statusDescription: "Internal Error",
      stdout: null,
      stderr: null,
    };
    const mapped = mapJudge0Result(result, "0 1");
    assert.equal(mapped.verdict, "JUDGE_ERROR");
    assert.notEqual(mapped.verdict, "WRONG_ANSWER");
  });
});
