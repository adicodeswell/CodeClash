/**
 * Rate Limiting Configuration for CodeClash API
 * Protects authentication and critical endpoints from automated brute-force,
 * spam account creation, and denial-of-service attempts.
 */

export const rateLimitConfig = {
  signup: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 signup requests per IP per 15 minutes
    message: "Too many accounts created from this IP. Please try again after 15 minutes.",
  },
  login: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 login requests per IP per 15 minutes
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
};
