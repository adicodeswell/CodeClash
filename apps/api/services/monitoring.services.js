import { prisma } from "@codeclash/db";
import { getUserSessionStats } from "./session.service.js";

const DEFAULT_STALE_THRESHOLD_MS = 30_000;
const JUDGE0_BASE_URL = process.env.JUDGE0_BASE_URL || "https://ce.judge0.com";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || "judge0-ce.p.rapidapi.com";

function getJudge0Headers() {
  const headers = { "Content-Type": "application/json" };
  if (JUDGE0_BASE_URL.includes("rapidapi.com") && RAPIDAPI_KEY) {
    headers["x-rapidapi-key"] = RAPIDAPI_KEY;
    headers["x-rapidapi-host"] = RAPIDAPI_HOST;
  }
  return headers;
}

/**
 * 1. PostgreSQL Health Check
 */
export async function checkPostgresHealth(db = prisma) {
  const start = performance.now();
  try {
    await db.$queryRaw`SELECT 1`;
    const latencyMs = Math.round((performance.now() - start) * 100) / 100;
    return {
      service: "postgresql",
      status: "UP",
      latencyMs,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    const latencyMs = Math.round((performance.now() - start) * 100) / 100;
    return {
      service: "postgresql",
      status: "DOWN",
      latencyMs,
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * 2. Judge0 Health Check
 */
export async function checkJudge0Health({ baseUrl = JUDGE0_BASE_URL, timeoutMs = 6000 } = {}) {
  const start = performance.now();
  try {
    // Attempt /about first; if not 200, attempt /languages as fallback
    let response = await fetch(`${baseUrl}/about`, {
      method: "GET",
      headers: getJudge0Headers(),
      signal: AbortSignal.timeout(timeoutMs),
    }).catch(() => null);

    if (!response || !response.ok) {
      response = await fetch(`${baseUrl}/languages`, {
        method: "GET",
        headers: getJudge0Headers(),
        signal: AbortSignal.timeout(timeoutMs),
      });
    }

    const latencyMs = Math.round((performance.now() - start) * 100) / 100;

    if (response.ok) {
      return {
        service: "judge0",
        status: "UP",
        statusCode: response.status,
        latencyMs,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      service: "judge0",
      status: "DOWN",
      statusCode: response.status,
      latencyMs,
      error: `Judge0 responded with status ${response.status}`,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    const latencyMs = Math.round((performance.now() - start) * 100) / 100;
    return {
      service: "judge0",
      status: "DOWN",
      latencyMs,
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * 3. Worker Status & Staleness Evaluator
 */
export async function getWorkersHealth(db = prisma, { staleThresholdMs = DEFAULT_STALE_THRESHOLD_MS } = {}) {
  const workers = await db.workerHeartbeat.findMany({
    orderBy: { lastHeartbeatAt: "desc" },
  });

  const now = Date.now();

  return workers.map((w) => {
    const lastHeartbeatTime = new Date(w.lastHeartbeatAt).getTime();
    const ageMs = now - lastHeartbeatTime;
    const isStale = ageMs > staleThresholdMs;

    let healthStatus = "HEALTHY";
    if (w.status === "SHUTTING_DOWN" || w.status === "ERROR") {
      healthStatus = "INACTIVE";
    } else if (isStale) {
      healthStatus = "UNHEALTHY";
    }

    return {
      workerId: w.workerId,
      hostname: w.hostname,
      pid: w.pid,
      rawStatus: w.status,
      healthStatus,
      isStale,
      ageSeconds: Math.floor(ageMs / 1000),
      currentJobId: w.currentJobId,
      metrics: w.metrics,
      startedAt: w.startedAt,
      lastHeartbeatAt: w.lastHeartbeatAt,
    };
  });
}

/**
 * 4. Queue Statistics
 */
export async function getQueueStatistics(db = prisma) {
  const [queued, running, completed, total] = await Promise.all([
    db.submission.count({ where: { status: "QUEUED" } }),
    db.submission.count({ where: { status: "RUNNING" } }),
    db.submission.count({ where: { status: "COMPLETED" } }),
    db.submission.count(),
  ]);

  return {
    queued,
    running,
    completed,
    active: queued + running,
    total,
    timestamp: new Date().toISOString(),
  };
}

/**
 * 5. Submission Statistics & Metrics
 */
export async function getSubmissionStatistics(db = prisma) {
  const [total, groupedVerdicts, aggregates] = await Promise.all([
    db.submission.count(),
    db.submission.groupBy({
      by: ["verdict"],
      _count: { verdict: true },
    }),
    db.submission.aggregate({
      where: { status: "COMPLETED" },
      _avg: {
        runtimeMs: true,
        memoryKb: true,
      },
    }),
  ]);

  const verdictCounts = {
    ACCEPTED: 0,
    WRONG_ANSWER: 0,
    TIME_LIMIT_EXCEEDED: 0,
    MEMORY_LIMIT_EXCEEDED: 0,
    RUNTIME_ERROR: 0,
    COMPILATION_ERROR: 0,
    JUDGE_ERROR: 0,
  };

  for (const group of groupedVerdicts) {
    if (group.verdict && verdictCounts[group.verdict] !== undefined) {
      verdictCounts[group.verdict] = group._count.verdict;
    }
  }

  const accepted = verdictCounts.ACCEPTED;
  const completedCount = Object.values(verdictCounts).reduce((a, b) => a + b, 0);
  const acceptanceRate = completedCount > 0
    ? Math.round((accepted / completedCount) * 1000) / 10
    : 0;

  return {
    total,
    completedCount,
    accepted,
    acceptanceRate,
    verdicts: verdictCounts,
    averages: {
      runtimeMs: aggregates._avg.runtimeMs ? Math.round(aggregates._avg.runtimeMs) : 0,
      memoryKb: aggregates._avg.memoryKb ? Math.round(aggregates._avg.memoryKb) : 0,
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * 6. API Metrics Summary
 */
export async function getApiMetricsSummary(db = prisma, { timeRangeHours = 24 } = {}) {
  const since = new Date(Date.now() - timeRangeHours * 3600 * 1000);
  const oneHourAgo = new Date(Date.now() - 3600 * 1000);

  const [totalRequests, lastHourRequests, errorCount, aggregates, endpointGroups] = await Promise.all([
    db.apiMetric.count({ where: { createdAt: { gte: since } } }),
    db.apiMetric.count({ where: { createdAt: { gte: oneHourAgo } } }),
    db.systemError.count({ where: { createdAt: { gte: since } } }),
    db.apiMetric.aggregate({
      where: { createdAt: { gte: since } },
      _avg: { responseTimeMs: true },
    }),
    db.apiMetric.groupBy({
      by: ["method", "path"],
      where: { createdAt: { gte: since } },
      _count: { id: true },
      _avg: { responseTimeMs: true },
      orderBy: { _count: { id: "desc" } },
      take: 20,
    }),
  ]);

  const endpoints = endpointGroups.map((g) => ({
    method: g.method,
    path: g.path,
    count: g._count.id,
    avgResponseTimeMs: g._avg.responseTimeMs ? Math.round(g._avg.responseTimeMs * 10) / 10 : 0,
  }));

  return {
    timeRangeHours,
    totalRequests,
    lastHourRequests,
    error5xxCount: errorCount,
    avgResponseTimeMs: aggregates._avg.responseTimeMs ? Math.round(aggregates._avg.responseTimeMs * 10) / 10 : 0,
    endpoints,
    timestamp: new Date().toISOString(),
  };
}

/**
 * 7. System Errors Feed (Paginated)
 */
export async function getSystemErrors(db = prisma, { limit = 25, offset = 0, service } = {}) {
  const where = service ? { service } : {};

  const [total, errors] = await Promise.all([
    db.systemError.count({ where }),
    db.systemError.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: Math.min(Math.max(1, limit), 100),
      skip: Math.max(0, offset),
      select: {
        id: true,
        requestId: true,
        service: true,
        statusCode: true,
        errorName: true,
        errorMessage: true,
        stackTrace: true,
        path: true,
        method: true,
        metadata: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    errors,
    pagination: {
      total,
      limit,
      offset,
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * 8. User Session & Active Users Telemetry
 */
export async function getUserSessionStatistics(db = prisma, options = {}) {
  return getUserSessionStats(db, options);
}

/**
 * 9. Consolidated Monitoring Overview
 */
export async function getMonitoringOverview(db = prisma) {
  const [postgres, judge0, workers, queues, apiMetrics, submissions, userSessions] = await Promise.all([
    checkPostgresHealth(db),
    checkJudge0Health(),
    getWorkersHealth(db),
    getQueueStatistics(db),
    getApiMetricsSummary(db, { timeRangeHours: 24 }),
    getSubmissionStatistics(db),
    getUserSessionStatistics(db, { activeWindowMinutes: 15 }),
  ]);

  const healthyWorkers = workers.filter((w) => w.healthStatus === "HEALTHY").length;
  const unhealthyWorkers = workers.filter((w) => w.healthStatus === "UNHEALTHY").length;
  const inactiveWorkers = workers.filter((w) => w.healthStatus === "INACTIVE").length;

  return {
    health: {
      postgres,
      judge0,
      api: {
        status: "UP",
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
      },
    },
    workers: {
      total: workers.length,
      healthy: healthyWorkers,
      unhealthy: unhealthyWorkers,
      inactive: inactiveWorkers,
      list: workers,
    },
    queues,
    apiMetrics: {
      lastHourRequests: apiMetrics.lastHourRequests,
      last24hRequests: apiMetrics.totalRequests,
      avgResponseTimeMs: apiMetrics.avgResponseTimeMs,
      error5xxCount24h: apiMetrics.error5xxCount,
      topEndpoints: apiMetrics.endpoints.slice(0, 5),
    },
    submissions,
    userSessions,
    timestamp: new Date().toISOString(),
  };
}
