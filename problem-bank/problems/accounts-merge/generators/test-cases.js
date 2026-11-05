import { randomInt } from "../../../scripts/utils/prng.js";

const names = ["Alex", "Bob", "Charlie", "David", "Emma", "Frank", "Grace", "Henry", "Ivy", "Jack"];

export function generateCases({ rng } = {}) {
  const cases = [];

  // Basic (0 - 9)
  const ex1 = [
    ["John","johnsmith@mail.com","john_newyork@mail.com"],
    ["John","johnsmith@mail.com","john00@mail.com"],
    ["Mary","mary@mail.com"],
    ["John","johnnybravo@mail.com"]
  ];
  cases.push({ category: "basic", description: "Example 1", inputs: { accounts: ex1 } });

  const ex2 = [
    ["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],
    ["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],
    ["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],
    ["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],
    ["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]
  ];
  cases.push({ category: "basic", description: "Example 2", inputs: { accounts: ex2 } });

  cases.push({ category: "basic", description: "Single account", inputs: { accounts: [["Alice","a@co.com","b@co.com"]] } });
  cases.push({ category: "basic", description: "Two identical accounts", inputs: { accounts: [["Bob","b@co.com"],["Bob","b@co.com"]] } });
  cases.push({ category: "basic", description: "Chain merge 3 accounts", inputs: { accounts: [["Carl","c1@co.com","c2@co.com"],["Carl","c2@co.com","c3@co.com"],["Carl","c3@co.com","c4@co.com"]] } });
  cases.push({ category: "basic", description: "Same name distinct people", inputs: { accounts: [["Dan","d1@co.com"],["Dan","d2@co.com"]] } });
  cases.push({ category: "basic", description: "Star merge center hub", inputs: { accounts: [["Eve","e0@co.com","e1@co.com"],["Eve","e0@co.com","e2@co.com"],["Eve","e0@co.com","e3@co.com"]] } });
  cases.push({ category: "basic", description: "Disjoint pairs", inputs: { accounts: [["Fred","f1@co.com"],["Gina","g1@co.com"]] } });
  cases.push({ category: "basic", description: "Multiple emails overlap", inputs: { accounts: [["Hal","h1@co.com","h2@co.com","h3@co.com"],["Hal","h3@co.com","h4@co.com"]] } });
  cases.push({ category: "basic", description: "Empty overlap", inputs: { accounts: [["Ian","i1@co.com"],["Jack","j1@co.com"],["Kim","k1@co.com"]] } });

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const n = names[i % names.length];
    const accs = [
      [n, `${n}1@test.com`, `${n}2@test.com`],
      [n, `${n}2@test.com`, `${n}3@test.com`]
    ];
    cases.push({ category: "edge", description: `Edge pair merge ${i}`, inputs: { accounts: accs } });
  }

  // Boundary (25 - 39)
  for (let i = 25; i < 40; i++) {
    const accs = [];
    const count = i - 20;
    for (let j = 0; j < count; j++) {
      accs.push(["User", `u${j}@domain.com`, `u${j+1}@domain.com`]);
    }
    cases.push({ category: "boundary", description: `Linear chain of ${count} accounts`, inputs: { accounts: accs } });
  }

  // Random (40 - 59)
  for (let i = 40; i < 60; i++) {
    const numPersons = randomInt(rng, 3, 6);
    const accs = [];
    let emailCounter = 1;
    for (let p = 0; p < numPersons; p++) {
      const name = names[p % names.length];
      const personEmails = Array.from({ length: randomInt(rng, 2, 5) }, () => `u${i}_${emailCounter++}@test.com`);
      const numAcc = randomInt(rng, 1, 3);
      for (let a = 0; a < numAcc; a++) {
        const chosen = [];
        for (const em of personEmails) {
          if (randomInt(rng, 0, 1) === 1 || chosen.length === 0) chosen.push(em);
        }
        accs.push([name, ...Array.from(new Set(chosen))]);
      }
    }
    cases.push({ category: "random", description: `Random account clusters ${i}`, inputs: { accounts: accs } });
  }

  // Stress (60 - 69)
  for (let i = 60; i < 70; i++) {
    const accs = [];
    const name = names[i % names.length];
    for (let j = 0; j < 40; j++) {
      accs.push([name, `user${j}@bulk.com`, `user${j + 1}@bulk.com`]);
    }
    cases.push({ category: "stress", description: `Large 40 account transitives`, inputs: { accounts: accs } });
  }

  // Adversarial (70 - 79)
  for (let i = 70; i < 80; i++) {
    const accs = [];
    for (let j = 0; j < 10; j++) {
      accs.push(["John", `john_p${j}_a@mail.com`, `john_p${j}_b@mail.com`]);
      accs.push(["John", `john_p${j}_b@mail.com`, `john_p${j}_c@mail.com`]);
    }
    cases.push({ category: "adversarial", description: `Same name multiple disjoint components ${i}`, inputs: { accounts: accs } });
  }

  return cases;
}
