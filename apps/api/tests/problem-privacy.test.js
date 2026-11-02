import { test, before, after, describe } from "node:test";
import assert from "node:assert/strict";
import { createTestContext } from "./helpers.js";

describe("Problem Privacy & Security Tests", () => {
  let ctx;

  before(async () => {
    ctx = await createTestContext();
  });

  after(async () => {
    await ctx.close();
  });

  test("catalog endpoint does not leak test cases, solutions, or judge harnesses", async () => {
    const res = await ctx.fetchAuth("/api/problems");
    assert.equal(res.status, 200);

    const body = await res.json();
    for (const problem of body.problems) {
      assert.equal(problem.testCases, undefined, "testCases must not be present in catalog");
      assert.equal(problem.languages, undefined, "languages must not be present in catalog");
      assert.equal(problem.statement, undefined, "full statement must not be present in catalog");
      assert.equal(problem.solution, undefined, "solution must not be present in catalog");
      assert.equal(problem.fullDriverTemplate, undefined, "fullDriverTemplate must not be present");
    }
  });

  test("detail endpoint strips fullDriverTemplate and omits testCases", async () => {
    const res = await ctx.fetchAuth("/api/problems/two-sum");
    assert.equal(res.status, 200);

    const body = await res.json();
    const p = body.problem;

    // testCases must be omitted completely
    assert.equal(p.testCases, undefined, "testCases must not be exposed in problem detail");
    assert.equal(p.referenceSolution, undefined, "referenceSolution must not be exposed");

    // Check languages: only enabled and starterTemplate allowed
    for (const [lang, config] of Object.entries(p.languages)) {
      assert.equal(config.fullDriverTemplate, undefined, `${lang} must not leak fullDriverTemplate`);
      assert.equal(config.driverCode, undefined, `${lang} must not leak driverCode`);
      assert.ok(typeof config.starterTemplate === "string", `${lang} must provide public starterTemplate`);
    }
  });

  test("error responses do not expose sensitive stack traces or database internals", async () => {
    const res = await ctx.fetchAuth("/api/problems/non-existent-problem");
    assert.equal(res.status, 404);

    const body = await res.json();
    assert.equal(body.stack, undefined, "Stack trace must not be exposed");
    assert.ok(body.error, "Human-readable error message must be provided");
  });
});
