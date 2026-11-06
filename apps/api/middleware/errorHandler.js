import { prisma } from "@codeclash/db";

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = err.status || err.statusCode || 500;

  if (statusCode >= 500) {
    if (process.env.NODE_ENV !== "test") {
      console.error(err);
    }

    // Persist 5xx system errors with correlation request ID
    prisma.systemError.create({
      data: {
        requestId: req.id || null,
        service: "api",
        statusCode,
        errorName: err.name || "Error",
        errorMessage: err.message || "Internal server error",
        stackTrace: err.stack || null,
        path: req.originalUrl?.split("?")[0] || null,
        method: req.method || null,
        metadata: {
          headers: {
            host: req.headers?.host,
            "user-agent": req.headers?.["user-agent"],
          },
          query: req.query || {},
          userId: req.user?.id || null,
        },
      },
    }).catch((dbErr) => {
      if (process.env.NODE_ENV !== "test") {
        console.error("[errorHandler] Failed to log SystemError:", dbErr.message);
      }
    });
  } else {
    // Client error (4xx)
    if (process.env.NODE_ENV !== "test") {
      console.warn(`[ClientError] ${req.method} ${req.originalUrl}: ${err.message}`);
    }
  }

  if (err.retryAfter) {
    res.set("Retry-After", String(err.retryAfter));
  }

  res.status(statusCode).json({
    status: "error",
    message: err.status ? err.message : "Internal server error",
    ...(req.id ? { requestId: req.id } : {}),
    ...(err.retryAfter ? { retryAfterSeconds: err.retryAfter } : {}),
  });
}

export default errorHandler;
