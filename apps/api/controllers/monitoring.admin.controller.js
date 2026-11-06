import { prisma } from "@codeclash/db";
import {
  getMonitoringOverview,
  checkPostgresHealth,
  checkJudge0Health,
  getWorkersHealth,
  getQueueStatistics,
  getSubmissionStatistics,
  getSystemErrors,
  getApiMetricsSummary,
  getUserSessionStatistics,
} from "../services/monitoring.services.js";

export async function getOverview(req, res, next) {
  try {
    const data = await getMonitoringOverview(prisma);
    return res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getHealth(req, res, next) {
  try {
    const [postgres, judge0, workers] = await Promise.all([
      checkPostgresHealth(prisma),
      checkJudge0Health(),
      getWorkersHealth(prisma),
    ]);

    const activeWorkers = workers.filter((w) => w.healthStatus === "HEALTHY").length;

    return res.status(200).json({
      status: "success",
      data: {
        postgres,
        judge0,
        api: {
          status: "UP",
          uptimeSeconds: Math.floor(process.uptime()),
          memoryRssMb: Math.round(process.memoryUsage().rss / (1024 * 1024)),
          timestamp: new Date().toISOString(),
        },
        workersSummary: {
          total: workers.length,
          healthy: activeWorkers,
        },
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getWorkers(req, res, next) {
  try {
    const workers = await getWorkersHealth(prisma);
    return res.status(200).json({
      status: "success",
      data: {
        total: workers.length,
        workers,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getErrors(req, res, next) {
  try {
    const limit = parseInt(req.query.limit, 10) || 25;
    const offset = parseInt(req.query.offset, 10) || 0;
    const service = req.query.service || undefined;

    const result = await getSystemErrors(prisma, { limit, offset, service });
    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMetrics(req, res, next) {
  try {
    const timeRangeHours = parseInt(req.query.timeRangeHours, 10) || 24;
    const data = await getApiMetricsSummary(prisma, { timeRangeHours });
    return res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getUsers(req, res, next) {
  try {
    const windowMinutes = parseInt(req.query.windowMinutes, 10) || 15;
    const data = await getUserSessionStatistics(prisma, { activeWindowMinutes: windowMinutes });
    return res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
}

