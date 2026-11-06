import os from "node:os";

export const HEARTBEAT_INTERVAL_MS = 5000;

export function createWorkerHeartbeatManager({
  prisma,
  workerId = process.env.WORKER_ID || `worker-${process.pid}-${Date.now().toString(36)}`,
  intervalMs = HEARTBEAT_INTERVAL_MS,
  getWorkerStatus = () => ({ status: "IDLE", currentJobId: null, jobsProcessed: 0 }),
}) {
  let timer = null;
  const startedAt = new Date();

  async function sendHeartbeat() {
    try {
      const { status, currentJobId, jobsProcessed, lastJobId, lastCompletedAt } = getWorkerStatus();
      const memRssMb = Math.round(process.memoryUsage().rss / (1024 * 1024));

      await prisma.workerHeartbeat.upsert({
        where: { workerId },
        create: {
          workerId,
          hostname: os.hostname(),
          pid: process.pid,
          status,
          currentJobId,
          metrics: {
            jobsProcessed: jobsProcessed || 0,
            memoryUsageMb: memRssMb,
            uptimeSeconds: Math.floor(process.uptime()),
            lastJobId: lastJobId || null,
            lastCompletedAt: lastCompletedAt || null,
          },
          startedAt,
          lastHeartbeatAt: new Date(),
        },
        update: {
          status,
          currentJobId,
          metrics: {
            jobsProcessed: jobsProcessed || 0,
            memoryUsageMb: memRssMb,
            uptimeSeconds: Math.floor(process.uptime()),
            lastJobId: lastJobId || null,
            lastCompletedAt: lastCompletedAt || null,
          },
          lastHeartbeatAt: new Date(),
        },
      });
    } catch (err) {
      console.error(`[heartbeat] Failed to send heartbeat for ${workerId}:`, err.message);
    }
  }

  function start() {
    sendHeartbeat().catch(() => {});
    timer = setInterval(sendHeartbeat, intervalMs);
    if (timer.unref) {
      timer.unref();
    }
  }

  async function stop(finalStatus = "SHUTTING_DOWN") {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    try {
      await prisma.workerHeartbeat.update({
        where: { workerId },
        data: {
          status: finalStatus,
          currentJobId: null,
          lastHeartbeatAt: new Date(),
        },
      });
    } catch {
      // Ignore cleanup error on exit
    }
  }

  return {
    workerId,
    start,
    stop,
    sendHeartbeat,
  };
}
