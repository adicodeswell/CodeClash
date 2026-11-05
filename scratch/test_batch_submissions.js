import prisma from "../packages/db/src/index.js";

async function main() {
  const user = await prisma.user.findFirst();
  if (!user) throw new Error("No user found");

  const testProblems = [
    {
      slug: "climbing-stairs",
      language: "javascript",
      sourceCode: `class Solution {
  climbStairs(n) {
    if (n <= 2) return n;
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) {
      let c = a + b;
      a = b;
      b = c;
    }
    return b;
  }
}`
    },
    {
      slug: "maximum-subarray",
      language: "python",
      sourceCode: `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        cur = max_sum = nums[0]
        for x in nums[1:]:
            cur = max(x, cur + x)
            max_sum = max(max_sum, cur)
        return max_sum
`
    },
    {
      slug: "plus-one",
      language: "python",
      sourceCode: `class Solution:
    def plusOne(self, digits: list[int]) -> list[int]:
        res = list(digits)
        for i in range(len(res) - 1, -1, -1):
            if res[i] < 9:
                res[i] += 1
                return res
            res[i] = 0
        return [1] + res
`
    },
    {
      slug: "number-of-1-bits",
      language: "cpp",
      sourceCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int hammingWeight(int n) {
        int count = 0;
        unsigned int u = (unsigned int)n;
        while (u > 0) {
            u &= (u - 1);
            count++;
        }
        return count;
    }
};
`
    }
  ];

  for (const t of testProblems) {
    const problem = await prisma.problem.findUnique({ where: { slug: t.slug } });
    if (!problem) throw new Error("Problem not found: " + t.slug);

    console.log(`Submitting solution for ${t.slug} (${t.language})...`);

    const sub = await prisma.submission.create({
      data: {
        userId: user.id,
        problemId: problem.id,
        language: t.language,
        sourceCode: t.sourceCode,
        status: "QUEUED",
        packageVersion: problem.packageVersion
      }
    });

    console.log(`Created submission ${sub.id}, awaiting judge-worker execution...`);

    let finalSub = null;
    for (let attempts = 0; attempts < 40; attempts++) {
      await new Promise(r => setTimeout(r, 1000));
      finalSub = await prisma.submission.findUnique({ where: { id: sub.id } });
      if (finalSub && finalSub.status !== "QUEUED" && finalSub.status !== "RUNNING") {
        break;
      }
    }

    console.log(`Submission Result for ${t.slug}:`, {
      id: finalSub.id,
      status: finalSub.status,
      verdict: finalSub.verdict,
      passedTestCases: `${finalSub.passedTestCases}/${finalSub.totalTestCases}`,
      runtimeMs: finalSub.runtimeMs,
      memoryKb: finalSub.memoryKb
    });

    if (finalSub.verdict !== "ACCEPTED") {
      throw new Error(`Submission for ${t.slug} did not get ACCEPTED! Verdict: ${finalSub.verdict}`);
    }
  }

  console.log("All test submissions passed with flying colors!");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
