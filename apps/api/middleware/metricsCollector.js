import { prisma } from "@codeclash/db";

export default function metricsCollector(req, res, next) {
  const start = performance.now();

  res.on("finish", () => {
    const path = req.originalUrl?.split("?")[0] || req.path || "/";
    const responseTimeMs = Math.round((performance.now() - start) * 100) / 100;
    const statusCode = res.statusCode;

    // Asynchronous non-blocking write to PostgreSQL
    prisma.apiMetric.create({
      data: {
        requestId: req.id || "unassigned",
        method: req.method,
        path,
        statusCode,
        responseTimeMs,
        ip: req.ip || req.socket?.remoteAddress || null,
        userId: req.user?.id || null,
      },
    }).catch((err) => {
      if (process.env.NODE_ENV !== "test") {
        console.error("[metricsCollector] Failed to persist apiMetric:", err.message);
      }
    });
  });

  next();
}
