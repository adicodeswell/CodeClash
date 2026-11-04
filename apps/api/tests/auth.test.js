import { test, before, after, beforeEach, describe } from "node:test";
import assert from "node:assert/strict";
import { prisma } from "@codeclash/db";
import { createTestContext } from "./helpers.js";
import { signupLimiter, loginLimiter } from "../middleware/rate-limit.js";

describe("Authentication API & Security Tests (/api/auth - Phase 8 Tasks 1 & 2)", () => {
  let ctx;
  const createdUserIds = [];

  const testUserSignup = {
    username: "auth_suite_user",
    email: "auth.suite@example.com",
    password: "StrongPassword123!",
  };

  before(async () => {
    ctx = await createTestContext();
    // Clean up any leftovers from prior runs
    await prisma.user.deleteMany({
      where: {
        OR: [
          { emailNormalized: testUserSignup.email.toLowerCase() },
          { username: testUserSignup.username },
          { emailNormalized: { startsWith: "ratelimit" } },
        ],
      },
    });
    signupLimiter.reset();
    loginLimiter.reset();
  });

  beforeEach(() => {
    // Reset limiters before tests unless testing rate-limit threshold explicitly
  });

  after(async () => {
    if (createdUserIds.length > 0) {
      await prisma.user.deleteMany({
        where: { id: { in: createdUserIds } },
      });
    }
    signupLimiter.reset();
    loginLimiter.reset();
    await ctx.close();
  });

  // ==========================================
  // SECTION 1: SIGNUP VALIDATION & REGISTRATION
  // ==========================================
  describe("Signup Validation (Task 1)", () => {
    beforeEach(() => {
      signupLimiter.reset();
    });

    test("rejects signup with missing required fields (400)", async () => {
      const res = await fetch(`${ctx.baseUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "onlyemail@example.com" }),
      });

      assert.equal(res.status, 400);
      const body = await res.json();
      assert.ok(body.error || body.message);
    });

    test("rejects signup with invalid username (< 3 chars or forbidden characters) (400)", async () => {
      const res = await fetch(`${ctx.baseUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "ab!", // invalid character '!'
          email: "valid@example.com",
          password: "ValidPassword123!",
        }),
      });

      assert.equal(res.status, 400);
      const body = await res.json();
      assert.ok(body.issues || body.error);
    });

    test("rejects signup with invalid email format (400)", async () => {
      const res = await fetch(`${ctx.baseUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "valid_user",
          email: "not-an-email",
          password: "ValidPassword123!",
        }),
      });

      assert.equal(res.status, 400);
      const body = await res.json();
      assert.ok(body.issues || body.error);
    });

    test("rejects signup with password shorter than 8 characters (400)", async () => {
      const res = await fetch(`${ctx.baseUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "valid_user",
          email: "valid@example.com",
          password: "short",
        }),
      });

      assert.equal(res.status, 400);
      const body = await res.json();
      assert.ok(body.issues || body.error);
    });

    test("rejects signup with unexpected fields due to strict schema (400)", async () => {
      const res = await fetch(`${ctx.baseUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "strict_user",
          email: "strict@example.com",
          password: "ValidPassword123!",
          role: "ADMIN", // Forbidden unexpected field
        }),
      });

      assert.equal(res.status, 400);
      const body = await res.json();
      assert.ok(body.issues || body.error);
    });

    test("successfully creates account with normalized email (201)", async () => {
      const res = await fetch(`${ctx.baseUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: testUserSignup.username,
          email: "  Auth.Suite@Example.COM  ", // Needs normalization
          password: testUserSignup.password,
        }),
      });

      assert.equal(res.status, 201);
      const body = await res.json();
      assert.ok(body.user);
      assert.equal(body.user.username, testUserSignup.username);
      assert.equal(body.user.emailNormalized, testUserSignup.email.toLowerCase());
      assert.equal(body.user.passwordHash, undefined, "passwordHash must never be returned");
      createdUserIds.push(body.user.id);
    });

    test("rejects duplicate email registration with 409 Conflict", async () => {
      const res = await fetch(`${ctx.baseUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "different_username",
          email: testUserSignup.email,
          password: "AnotherPassword123!",
        }),
      });

      assert.equal(res.status, 409);
      const body = await res.json();
      assert.match(body.error || body.message, /already taken/i);
    });

    test("rejects duplicate username registration with 409 Conflict", async () => {
      const res = await fetch(`${ctx.baseUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: testUserSignup.username,
          email: "totally.different@example.com",
          password: "AnotherPassword123!",
        }),
      });

      assert.equal(res.status, 409);
      const body = await res.json();
      assert.match(body.error || body.message, /already taken/i);
    });
  });

  // ==========================================
  // SECTION 2: LOGIN VALIDATION & AUTHENTICATION
  // ==========================================
  describe("Login Validation & Authentication (Task 1 & Task 4)", () => {
    beforeEach(() => {
      loginLimiter.reset();
    });

    test("rejects login with missing email or password (400)", async () => {
      const res = await fetch(`${ctx.baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testUserSignup.email }),
      });

      assert.equal(res.status, 400);
    });

    test("rejects login with unexpected fields due to strict schema (400)", async () => {
      const res = await fetch(`${ctx.baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: testUserSignup.email,
          password: testUserSignup.password,
          extraField: "malicious_payload",
        }),
      });

      assert.equal(res.status, 400);
    });

    test("rejects unknown user with generic 401 Unauthorized (enumeration prevention)", async () => {
      const res = await fetch(`${ctx.baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "unknown.user.404@example.com",
          password: "SomePassword123!",
        }),
      });

      assert.equal(res.status, 401);
      const body = await res.json();
      assert.equal(body.error, "Invalid email or password");
    });

    test("rejects incorrect password with generic 401 Unauthorized", async () => {
      const res = await fetch(`${ctx.baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: testUserSignup.email,
          password: "WrongPassword123!",
        }),
      });

      assert.equal(res.status, 401);
      const body = await res.json();
      assert.equal(body.error, "Invalid email or password");
    });

    test("successfully logs in, returns user profile, and sets httpOnly token cookie (200)", async () => {
      const res = await fetch(`${ctx.baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: testUserSignup.email,
          password: testUserSignup.password,
        }),
      });

      assert.equal(res.status, 200);
      const body = await res.json();
      assert.ok(body.user);
      assert.equal(body.user.username, testUserSignup.username);
      assert.equal(body.user.email, testUserSignup.email.toLowerCase());

      const setCookie = res.headers.get("set-cookie");
      assert.ok(setCookie, "Response must include set-cookie header");
      assert.match(setCookie, /token=/);
      assert.match(setCookie, /HttpOnly/i);
    });
  });

  // ==========================================
  // SECTION 3: SESSION VERIFICATION & LOGOUT
  // ==========================================
  describe("Session Verification & Logout", () => {
    test("GET /api/auth/me returns current user when session cookie is provided", async () => {
      const res = await ctx.fetchUserA("/api/auth/me");
      assert.equal(res.status, 200);
      const body = await res.json();
      assert.ok(body.user);
      assert.equal(body.user.id, ctx.userA.id);
    });

    test("GET /api/auth/me returns 401 when unauthenticated", async () => {
      const res = await ctx.fetchUnauth("/api/auth/me");
      assert.equal(res.status, 401);
    });

    test("POST /api/auth/logout clears session cookie (200)", async () => {
      const res = await fetch(`${ctx.baseUrl}/api/auth/logout`, {
        method: "POST",
      });

      assert.equal(res.status, 200);
      const setCookie = res.headers.get("set-cookie");
      assert.ok(setCookie);
      assert.match(setCookie, /token=;/);
    });
  });

  // ==========================================
  // SECTION 4: RATE LIMITING (Task 2)
  // ==========================================
  describe("Rate Limiting on Signup & Login (Task 2)", () => {
    test("signup rate limiter blocks excessive account creation attempts with 429", async () => {
      signupLimiter.reset();

      // Make 5 requests (the limit is 5)
      for (let i = 0; i < 5; i++) {
        const res = await fetch(`${ctx.baseUrl}/api/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: `ratelimit_user_${i}`,
            email: `ratelimit_${i}@example.com`,
            password: "ValidPassword123!",
          }),
        });
        assert.ok(res.status === 201 || res.status === 409);
      }

      // 6th request must trigger rate limit (429)
      const blockedRes = await fetch(`${ctx.baseUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "ratelimit_blocked",
          email: "ratelimit_blocked@example.com",
          password: "ValidPassword123!",
        }),
      });

      assert.equal(blockedRes.status, 429, "Exceeding signup rate limit must return HTTP 429");
      const retryAfter = blockedRes.headers.get("Retry-After");
      assert.ok(retryAfter, "429 response must include Retry-After header");
      assert.ok(Number(retryAfter) > 0);

      const body = await blockedRes.json();
      assert.match(body.message || body.error, /too many/i);
      assert.ok(body.retryAfterSeconds > 0);
    });

    test("login rate limiter blocks excessive authentication attempts with 429", async () => {
      loginLimiter.reset();

      // Make 10 requests (limit is 10)
      for (let i = 0; i < 10; i++) {
        const res = await fetch(`${ctx.baseUrl}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "bruteforce@example.com",
            password: `Attempt_${i}!`,
          }),
        });
        assert.equal(res.status, 401);
      }

      // 11th request must trigger rate limit (429)
      const blockedRes = await fetch(`${ctx.baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "bruteforce@example.com",
          password: "AnotherAttempt123!",
        }),
      });

      assert.equal(blockedRes.status, 429, "Exceeding login rate limit must return HTTP 429");
      const retryAfter = blockedRes.headers.get("Retry-After");
      assert.ok(retryAfter, "429 response must include Retry-After header");
      assert.ok(Number(retryAfter) > 0);

      const body = await blockedRes.json();
      assert.match(body.message || body.error, /too many/i);
      assert.ok(body.retryAfterSeconds > 0);
    });
  });
});
