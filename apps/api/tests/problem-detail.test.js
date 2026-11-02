import { test, before, after, describe } from "node:test";
import assert from "node:assert/strict";
import { createTestContext } from "./helpers.js";

describe("Problem Detail API Tests (GET /api/problems/:slug)", () => {
  let ctx;

  before(async () => {
    ctx = await createTestContext();
  });

  after(async () => {
    await ctx.close();
  });

  test("returns 401 when request is unauthenticated", async () => {
    const res = await fetch(`${ctx.baseUrl}/api/problems/two-sum`);
    assert.equal(res.status, 401);
  });

  test("returns full problem details for a valid published slug", async () => {
    const res = await ctx.fetchAuth("/api/problems/two-sum");
    assert.equal(res.status, 200);

    const body = await res.json();
    assert.ok(body.problem);

    const p = body.problem;
    assert.equal(p.slug, "two-sum");
    assert.equal(p.title, "Two Sum");
    assert.equal(p.difficulty, "EASY");
    assert.ok(Array.isArray(p.topics));
    assert.ok(p.topics.includes("Array"));
    assert.ok(typeof p.statement === "string");
    assert.ok(p.statement.includes("Two Sum"));
    assert.ok(p.statement.includes("Examples"));
    assert.ok(p.statement.includes("Constraints"));
    assert.ok(typeof p.timeLimitMs === "number");
    assert.ok(typeof p.memoryLimitKb === "number");

    // Languages verification
    assert.ok(p.languages);
    assert.ok(p.languages.cpp?.enabled);
    assert.ok(p.languages.cpp.starterTemplate.includes("class Solution"));
    assert.ok(p.languages.java?.enabled);
    assert.ok(p.languages.python?.enabled);
    assert.ok(p.languages.javascript?.enabled);
  });

  test("returns 404 for an unknown problem slug", async () => {
    const res = await ctx.fetchAuth("/api/problems/non-existent-problem-slug");
    assert.equal(res.status, 404);
    const body = await res.json();
    assert.equal(body.error, "Problem not found");
  });

  test("returns 400 for a malformed problem slug format", async () => {
    const res = await ctx.fetchAuth("/api/problems/INVALID_SLUG!@#$");
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.ok(body.error || body.issues);
  });
});
