import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import { setTimeout as sleep } from "node:timers/promises";
import { prisma } from "@codeclash/db";
import { createTestContext } from "./helpers.js";
import {
  checkPostgresHealth,
  checkJudge0Health,
  getWorkersHealth,
  getQueueStatistics,
  getSubmissionStatistics,
} from "../services/monitoring.services.js";
import { createWorkerHeartbeatManager } from "../../judge-worker/src/telemetry/heartbeat.js";

describe("CodeClash Monitoring V1 — Chunk 1 Implementation Tests", () => {
  let ctx;

  before(async () => {
    ctx = await createTestContext();
  });

  after(async () => {
    if (ctx?.close) {
      await ctx.close();
    }
  });

  test("API request creates ApiMetric with accurate metadata", async () => {
    const res = await fetch(`${ctx.baseUrl}/api/health`);
    assert.equal(res.status, 200);

    const requestId = res.headers.get("x-request-id");
    assert.ok(requestId, "Response must include x-request-id header");

    // Wait a brief tick for non-blocking asynchronous metric insertion
    await sleep(60);

    const metric = await prisma.apiMetric.findFirst({
      where: { requestId },
    });

    assert.ok(metric, "ApiMetric record must be created in PostgreSQL");
    assert.equal(metric.method, "GET");
    assert.equal(metric.path, "/api/health");
    assert.equal(metric.statusCode, 200);
    assert.equal(metric.requestId, requestId);
  });

  test("Response time is recorded on ApiMetric", async () => {
    const res = await fetch(`${ctx.baseUrl}/api/health`);
    const requestId = res.headers.get("x-request-id");

    await sleep(60);

    const metric = await prisma.apiMetric.findFirst({
      where: { requestId },
    });

    assert.ok(metric, "ApiMetric record must exist");
    assert.equal(typeof metric.responseTimeMs, "number");
    assert.ok(
      metric.responseTimeMs >= 0,
      `Response time should be non-negative, got: ${metric.responseTimeMs}`,
    );
  });

  test("5xx creates SystemError and Request ID appears in errors", async () => {
    const res = await fetch(`${ctx.baseUrl}/api/test/force-500`);
    assert.equal(res.status, 500);

    const headerReqId = res.headers.get("x-request-id");
    assert.ok(headerReqId, "5xx response must include x-request-id header");

    const body = await res.json();
    assert.equal(body.status, "error");
    assert.equal(body.requestId, headerReqId, "Response body must contain the correlation requestId");

    // Allow async error persistence to complete
    await sleep(60);

    const errorRecord = await prisma.systemError.findFirst({
      where: { requestId: headerReqId },
    });

    assert.ok(errorRecord, "SystemError record must be created in PostgreSQL");
    assert.equal(errorRecord.service, "api");
    assert.equal(errorRecord.statusCode, 500);
    assert.equal(errorRecord.path, "/api/test/force-500");
    assert.equal(errorRecord.method, "GET");
    assert.ok(errorRecord.stackTrace, "Stack trace must be captured in SystemError");
    assert.ok(
      errorRecord.errorMessage.includes("Simulated internal server error"),
      "Error message should capture failure details",
    );
  });

  test("Worker heartbeat updates properly", async () => {
    const testWorkerId = `test-worker-${Date.now()}`;
    let workerState = { status: "IDLE", currentJobId: null, jobsProcessed: 5 };

    const manager = createWorkerHeartbeatManager({
      prisma,
      workerId: testWorkerId,
      intervalMs: 1000,
      getWorkerStatus: () => workerState,
    });

    // Send initial heartbeat
    await manager.sendHeartbeat();

    let heartbeat = await prisma.workerHeartbeat.findUnique({
      where: { workerId: testWorkerId },
    });

    assert.ok(heartbeat, "Worker heartbeat must be stored");
    assert.equal(heartbeat.status, "IDLE");
    assert.equal(heartbeat.metrics?.jobsProcessed, 5);

    // Update worker state to PROCESSING
    workerState = { status: "PROCESSING", currentJobId: "sub-12345", jobsProcessed: 6 };
    await sleep(20);
    await manager.sendHeartbeat();

    heartbeat = await prisma.workerHeartbeat.findUnique({
      where: { workerId: testWorkerId },
    });

    assert.equal(heartbeat.status, "PROCESSING");
    assert.equal(heartbeat.currentJobId, "sub-12345");
    assert.equal(heartbeat.metrics?.jobsProcessed, 6);

    // Clean up
    await manager.stop("INACTIVE");
    await prisma.workerHeartbeat.delete({ where: { workerId: testWorkerId } }).catch(() => {});
  });

  test("Worker becomes unhealthy when heartbeat stops", async () => {
    const staleWorkerId = `stale-worker-${Date.now()}`;
    const pastTime = new Date(Date.now() - 45_000); // 45 seconds ago

    await prisma.workerHeartbeat.create({
      data: {
        workerId: staleWorkerId,
        status: "PROCESSING",
        lastHeartbeatAt: pastTime,
        startedAt: pastTime,
        metrics: { jobsProcessed: 10 },
      },
    });

    try {
      const workers = await getWorkersHealth(prisma, { staleThresholdMs: 30_000 });
      const staleWorker = workers.find((w) => w.workerId === staleWorkerId);

      assert.ok(staleWorker, "Worker must appear in workers health list");
      assert.equal(staleWorker.isStale, true, "Worker heartbeat must be recognized as stale");
      assert.equal(
        staleWorker.healthStatus,
        "UNHEALTHY",
        "Stale worker healthStatus must be UNHEALTHY",
      );
    } finally {
      await prisma.workerHeartbeat.delete({ where: { workerId: staleWorkerId } }).catch(() => {});
    }
  });

  test("PostgreSQL health check works and reports UP status", async () => {
    const health = await checkPostgresHealth(prisma);

    assert.equal(health.service, "postgresql");
    assert.equal(health.status, "UP");
    assert.equal(typeof health.latencyMs, "number");
    assert.ok(health.latencyMs >= 0);
    assert.ok(health.timestamp);
  });

  test("Judge0 health check works and reports status with latency", async () => {
    const health = await checkJudge0Health();

    assert.equal(health.service, "judge0");
    assert.ok(["UP", "DOWN"].includes(health.status));
    assert.equal(typeof health.latencyMs, "number");
    assert.ok(health.timestamp);
  });

  test("Submission statistics are correct and aggregated", async () => {
    const stats = await getSubmissionStatistics(prisma);

    assert.equal(typeof stats.total, "number");
    assert.equal(typeof stats.completedCount, "number");
    assert.equal(typeof stats.accepted, "number");
    assert.equal(typeof stats.acceptanceRate, "number");
    assert.ok(stats.verdicts);
    assert.equal(typeof stats.verdicts.ACCEPTED, "number");
    assert.equal(typeof stats.verdicts.WRONG_ANSWER, "number");
    assert.ok(stats.averages);
    assert.equal(typeof stats.averages.runtimeMs, "number");
  });

  test("Queue statistics are correct and match database status counts", async () => {
    const [expectedQueued, expectedRunning, expectedCompleted, expectedTotal] = await Promise.all([
      prisma.submission.count({ where: { status: "QUEUED" } }),
      prisma.submission.count({ where: { status: "RUNNING" } }),
      prisma.submission.count({ where: { status: "COMPLETED" } }),
      prisma.submission.count(),
    ]);

    const queueStats = await getQueueStatistics(prisma);

    assert.equal(queueStats.queued, expectedQueued);
    assert.equal(queueStats.running, expectedRunning);
    assert.equal(queueStats.completed, expectedCompleted);
    assert.equal(queueStats.total, expectedTotal);
    assert.equal(queueStats.active, expectedQueued + expectedRunning);
  });
});
