import { test, before, after, describe } from "node:test";
import assert from "node:assert/strict";
import { createTestContext } from "./helpers.js";

describe("Problem Catalog API Tests (GET /api/problems)", () => {
  let ctx;

  before(async () => {
    ctx = await createTestContext();
  });

  after(async () => {
    await ctx.close();
  });

  test("returns 401 when request is unauthenticated", async () => {
    const res = await fetch(`${ctx.baseUrl}/api/problems`);
    assert.equal(res.status, 401);
    const body = await res.json();
    assert.equal(body.error, "Authentication required");
  });

  test("lists published problems with pagination metadata", async () => {
    const res = await ctx.fetchAuth("/api/problems");
    assert.equal(res.status, 200);

    const body = await res.json();
    assert.ok(Array.isArray(body.problems));
    assert.ok(body.problems.length > 0);
    assert.ok(body.pagination);
    assert.equal(body.pagination.page, 1);
    assert.equal(body.pagination.limit, 20);
    assert.ok(body.pagination.total >= 5);

    // Verify fields on problem items
    const p = body.problems[0];
    assert.ok(p.slug);
    assert.ok(p.title);
    assert.ok(p.difficulty);
    assert.ok(Array.isArray(p.topics));
  });

  test("filters problems by search keyword (title or slug)", async () => {
    const res = await ctx.fetchAuth("/api/problems?search=Two%20Sum");
    assert.equal(res.status, 200);

    const body = await res.json();
    assert.ok(body.problems.length >= 1);
    assert.ok(body.problems.some((item) => item.slug === "two-sum"));

    // Ensure unrelated problems are not returned
    assert.ok(body.problems.every((item) => item.title.toLowerCase().includes("two") || item.slug.includes("two")));
  });

  test("filters problems by difficulty EASY and MEDIUM", async () => {
    const resEasy = await ctx.fetchAuth("/api/problems?difficulty=EASY");
    assert.equal(resEasy.status, 200);
    const bodyEasy = await resEasy.json();
    assert.ok(bodyEasy.problems.length > 0);
    assert.ok(bodyEasy.problems.every((item) => item.difficulty === "EASY"));

    const resMed = await ctx.fetchAuth("/api/problems?difficulty=MEDIUM");
    assert.equal(resMed.status, 200);
    const bodyMed = await resMed.json();
    assert.ok(bodyMed.problems.length > 0);
    assert.ok(bodyMed.problems.every((item) => item.difficulty === "MEDIUM"));
  });

  test("rejects invalid difficulty parameter with 400 Bad Request", async () => {
    const res = await ctx.fetchAuth("/api/problems?difficulty=INVALID_DIFFICULTY");
    assert.equal(res.status, 400);
  });

  test("filters problems by topic tag", async () => {
    const res = await ctx.fetchAuth("/api/problems?topic=Array");
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(body.problems.length > 0);
    assert.ok(body.problems.every((item) => item.topics.includes("Array")));
  });

  test("supports pagination offsets (page and limit)", async () => {
    const resPage1 = await ctx.fetchAuth("/api/problems?page=1&limit=2");
    assert.equal(resPage1.status, 200);
    const bodyPage1 = await resPage1.json();
    assert.equal(bodyPage1.problems.length, 2);

    const resPage2 = await ctx.fetchAuth("/api/problems?page=2&limit=2");
    assert.equal(resPage2.status, 200);
    const bodyPage2 = await resPage2.json();
    assert.equal(bodyPage2.problems.length, 2);

    // Page 1 and Page 2 should contain different problems
    const slugsPage1 = bodyPage1.problems.map((p) => p.slug);
    const slugsPage2 = bodyPage2.problems.map((p) => p.slug);
    assert.notEqual(slugsPage1[0], slugsPage2[0]);
  });

  test("rejects invalid pagination values", async () => {
    const resNegative = await ctx.fetchAuth("/api/problems?page=-1");
    assert.equal(resNegative.status, 400);

    const resExcessive = await ctx.fetchAuth("/api/problems?limit=999");
    assert.equal(resExcessive.status, 400);
  });
});
