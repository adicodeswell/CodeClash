import { randomInt, pickRandom } from "../../../scripts/utils/prng.js";

const airports = ["JFK", "SFO", "ATL", "ORD", "LAX", "DFW", "DEN"];

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({
    category: "basic",
    description: "Example 1",
    inputs: {
      tickets: [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
    }
  });

  cases.push({
    category: "basic",
    description: "Example 2",
    inputs: {
      tickets: [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
    }
  });

  cases.push({
    category: "basic",
    description: "Single ticket",
    inputs: {
      tickets: [["JFK", "ORD"]]
    }
  });

  for (let i = 3; i < 10; i++) {
    // Eulerian walk generator
    let cur = "JFK";
    const t = [];
    for (let step = 0; step < 4; step++) {
      const next = airports[(airports.indexOf(cur) + 1 + (i % 3)) % airports.length];
      t.push([cur, next]);
      cur = next;
    }
    cases.push({ category: "basic", description: "Basic walk " + i, inputs: { tickets: t } });
  }

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    cases.push({
      category: "edge",
      description: "Simple loop " + i,
      inputs: { tickets: [["JFK", "ATL"], ["ATL", "JFK"]] }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    cases.push({
      category: "corner",
      description: "Star pattern " + i,
      inputs: { tickets: [["JFK", "ATL"], ["ATL", "JFK"], ["JFK", "SFO"]] }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    let cur = "JFK";
    const t = [];
    for (let s = 0; s < 6; s++) {
      const pool = airports.filter(a => a !== cur);
      const next = pickRandom(rng, pool);
      t.push([cur, next]);
      cur = next;
    }
    cases.push({ category: "random", description: "Random walk " + i, inputs: { tickets: t } });
  }

  // Large (65 - 79)
  for (let i = 65; i < 80; i++) {
    let cur = "JFK";
    const t = [];
    for (let s = 0; s < 10; s++) {
      const pool = airports.filter(a => a !== cur);
      const next = pickRandom(rng, pool);
      t.push([cur, next]);
      cur = next;
    }
    cases.push({ category: "large", description: "Large walk " + i, inputs: { tickets: t } });
  }

  return cases;
}
