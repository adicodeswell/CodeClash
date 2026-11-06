import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import { createTestContext } from "./helpers.js";

describe("CodeClash Monitoring V1 — Chunk 2 Admin API & RBAC Tests", () => {
  let ctx;

  before(async () => {
    ctx = await createTestContext();
  });

  after(async () => {
    if (ctx?.close) {
      await ctx.close();
    }
  });

  describe("RBAC Access Control on /api/admin/monitoring", () => {
    test("rejects unauthenticated requests with 401 Unauthorized", async () => {
      const res = await ctx.fetchUnauth("/api/admin/monitoring/overview");
      assert.equal(res.status, 401);
      const body = await res.json();
      assert.ok(body.error || body.message);
    });

    test("rejects authenticated non-admin users (role: USER) with 403 Forbidden", async () => {
      const res = await ctx.fetchUserA("/api/admin/monitoring/overview");
      assert.equal(res.status, 403);
      const body = await res.json();
      assert.equal(body.status, "error");
      assert.equal(body.message, "Admin access required");
    });

    test("rejects non-admin on all sub-endpoints with 403 Forbidden", async () => {
      const endpoints = [
        "/api/admin/monitoring/health",
        "/api/admin/monitoring/workers",
        "/api/admin/monitoring/errors",
        "/api/admin/monitoring/metrics",
      ];

      for (const endpoint of endpoints) {
        const res = await ctx.fetchUserA(endpoint);
        assert.equal(res.status, 403, `Endpoint ${endpoint} must require admin role`);
        const body = await res.json();
        assert.equal(body.message, "Admin access required");
      }
    });

    test("allows administrator (role: ADMIN) to access /api/admin/monitoring/overview with 200 OK", async () => {
      const res = await ctx.fetchAdmin("/api/admin/monitoring/overview");
      assert.equal(res.status, 200);
      const body = await res.json();

      assert.equal(body.status, "success");
      assert.ok(body.data);
      assert.ok(body.data.health);
      assert.ok(body.data.health.postgres);
      assert.ok(body.data.health.judge0);
      assert.ok(body.data.workers);
      assert.ok(body.data.queues);
      assert.ok(body.data.apiMetrics);
      assert.ok(body.data.submissions);
      assert.equal(typeof body.data.queues.queued, "number");
      assert.equal(typeof body.data.submissions.total, "number");
    });
  });

  describe("Admin Monitoring Functional Endpoints", () => {
    test("GET /api/admin/monitoring/health returns diagnostic data for all subsystems", async () => {
      const res = await ctx.fetchAdmin("/api/admin/monitoring/health");
      assert.equal(res.status, 200);
      const body = await res.json();

      assert.equal(body.status, "success");
      assert.ok(body.data.postgres);
      assert.equal(body.data.postgres.status, "UP");
      assert.ok(body.data.judge0);
      assert.ok(body.data.api);
      assert.equal(body.data.api.status, "UP");
      assert.ok(body.data.workersSummary);
    });

    test("GET /api/admin/monitoring/workers returns worker fleet state", async () => {
      const res = await ctx.fetchAdmin("/api/admin/monitoring/workers");
      assert.equal(res.status, 200);
      const body = await res.json();

      assert.equal(body.status, "success");
      assert.ok(Array.isArray(body.data.workers));
      assert.equal(typeof body.data.total, "number");
    });

    test("GET /api/admin/monitoring/errors returns paginated system errors", async () => {
      const res = await ctx.fetchAdmin("/api/admin/monitoring/errors?limit=10&offset=0");
      assert.equal(res.status, 200);
      const body = await res.json();

      assert.equal(body.status, "success");
      assert.ok(Array.isArray(body.data.errors));
      assert.ok(body.data.pagination);
      assert.equal(body.data.pagination.limit, 10);
      assert.equal(body.data.pagination.offset, 0);
      assert.equal(typeof body.data.pagination.total, "number");
    });

    test("GET /api/admin/monitoring/metrics returns aggregated endpoint metrics", async () => {
      const res = await ctx.fetchAdmin("/api/admin/monitoring/metrics?timeRangeHours=24");
      assert.equal(res.status, 200);
      const body = await res.json();

      assert.equal(body.status, "success");
      assert.equal(typeof body.data.totalRequests, "number");
      assert.equal(typeof body.data.avgResponseTimeMs, "number");
      assert.ok(Array.isArray(body.data.endpoints));
    });
  });
});
