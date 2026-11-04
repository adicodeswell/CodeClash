import { rateLimitConfig } from "../config/rate-limit.config.js";

/**
 * Creates an in-memory sliding/fixed window rate limiter middleware.
 * Stores counters per key (default: client IP).
 * Sets standard X-RateLimit-* and Retry-After headers.
 *
 * @param {object} options
 * @param {number} options.windowMs - Window duration in milliseconds
 * @param {number} options.max - Maximum allowed requests in window
 * @param {string} options.message - Error message when rate limit exceeded
 * @param {Function} [options.keyGenerator] - Key generator function
 * @returns {Function} Express middleware function
 */
export function createRateLimiter({
  windowMs = 15 * 60 * 1000,
  max = 10,
  message = "Too many requests. Please try again later.",
  keyGenerator = (req) =>
    req.ip ||
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "127.0.0.1",
} = {}) {
  const store = new Map();

  // Periodic cleanup of expired entries
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      if (now > record.resetTime) {
        store.delete(key);
      }
    }
  }, 60 * 1000);

  if (cleanupInterval.unref) {
    cleanupInterval.unref();
  }

  const middleware = (req, res, next) => {
    const key = keyGenerator(req);
    const now = Date.now();
    let record = store.get(key);

    if (!record || now > record.resetTime) {
      record = { count: 1, resetTime: now + windowMs };
      store.set(key, record);
    } else {
      record.count += 1;
    }

    const remaining = Math.max(0, max - record.count);
    const retryAfterSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));

    res.set("X-RateLimit-Limit", String(max));
    res.set("X-RateLimit-Remaining", String(remaining));
    res.set("X-RateLimit-Reset", String(Math.ceil(record.resetTime / 1000)));

    if (record.count > max) {
      res.set("Retry-After", String(retryAfterSeconds));
      return res.status(429).json({
        status: "error",
        error: message,
        message,
        retryAfterSeconds,
      });
    }

    next();
  };

  middleware.reset = () => {
    store.clear();
  };

  middleware.getRecord = (key) => store.get(key);

  return middleware;
}

export const signupLimiter = createRateLimiter(rateLimitConfig.signup);
export const loginLimiter = createRateLimiter(rateLimitConfig.login);
