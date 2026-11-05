import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng }) {
  const cases = [];

  // Basic (0 - 9)
  cases.push({ category: "basic", description: "Example 1", inputs: { strs: ["lint", "code", "love", "you"] } });
  cases.push({ category: "basic", description: "Example 2", inputs: { strs: ["we", "say", ":", "yes"] } });
  cases.push({ category: "basic", description: "Single string", inputs: { strs: ["codeclash"] } });
  cases.push({ category: "basic", description: "Single char element", inputs: { strs: ["#"] } });
  cases.push({ category: "basic", description: "Repeated symbols", inputs: { strs: ["###", "@@@", ":::"] } });
  cases.push({ category: "basic", description: "Strings containing delimiter #", inputs: { strs: ["4#code", "hello#world"] } });
  cases.push({ category: "basic", description: "Strings containing numbers", inputs: { strs: ["123", "456", "789"] } });
  cases.push({ category: "basic", description: "Mixed special chars", inputs: { strs: ["a@b", "c#d", "e:f", "g/h"] } });
  cases.push({ category: "basic", description: "Single letters", inputs: { strs: ["a", "b", "c", "d"] } });
  cases.push({ category: "basic", description: "Alternating length", inputs: { strs: ["x", "xx", "xxx", "xxxx"] } });

  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@:;_-+=!";

  // Edge (10 - 24)
  for (let i = 10; i < 25; i++) {
    const count = (i % 5) + 1;
    const list = [];
    for (let c = 0; c < count; c++) {
      const len = (c * 2) + 1;
      let s = "";
      for (let j = 0; j < len; j++) s += charset[(i + j) % charset.length];
      list.push(s);
    }
    cases.push({
      category: "edge",
      description: `Edge case count=${count}`,
      inputs: { strs: list }
    });
  }

  // Corner (25 - 39)
  for (let i = 25; i < 40; i++) {
    const list = [];
    const count = 10;
    for (let c = 0; c < count; c++) {
      if (c % 2 === 0) list.push("val" + c);
      else list.push("##" + c + "##");
    }
    cases.push({
      category: "corner",
      description: `Corner hashes and symbols ${i}`,
      inputs: { strs: list }
    });
  }

  // Random (40 - 64)
  for (let i = 40; i < 65; i++) {
    const count = randomInt(rng, 5, 25);
    const list = [];
    for (let c = 0; c < count; c++) {
      const len = randomInt(rng, 1, 15);
      let s = "";
      for (let j = 0; j < len; j++) s += charset[randomInt(rng, 0, charset.length - 1)];
      list.push(s);
    }
    cases.push({
      category: "random",
      description: `Random strings count=${count}`,
      inputs: { strs: list }
    });
  }

  // Stress (65 - 79)
  for (let i = 65; i < 80; i++) {
    const count = 50;
    const list = [];
    for (let c = 0; c < count; c++) {
      const len = 20;
      let s = "";
      for (let j = 0; j < len; j++) s += charset[randomInt(rng, 0, charset.length - 1)];
      list.push(s);
    }
    cases.push({
      category: "stress",
      description: `Stress count=${count}`,
      inputs: { strs: list }
    });
  }

  return cases;
}
