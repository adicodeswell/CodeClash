import prisma from "../packages/db/src/index.js";

async function main() {
  const user = await prisma.user.findFirst();
  if (!user) throw new Error("No user found");

  const testProblems = [
    {
      slug: "invert-binary-tree",
      language: "python",
      sourceCode: `class Solution:
    def invertTree(self, root: list[str]) -> list[str]:
        if not root or len(root) == 0 or root[0] == "null":
            return []
        
        # Build tree representation
        class Node:
            def __init__(self, val):
                self.val = val
                self.left = None
                self.right = None
        
        r = Node(root[0])
        q = [r]
        i = 1
        while q and i < len(root):
            curr = q.pop(0)
            if i < len(root) and root[i] != "null":
                curr.left = Node(root[i])
                q.append(curr.left)
            i += 1
            if i < len(root) and root[i] != "null":
                curr.right = Node(root[i])
                q.append(curr.right)
            i += 1
        
        def inv(node):
            if not node: return
            node.left, node.right = node.right, node.left
            inv(node.left)
            inv(node.right)
        
        inv(r)
        
        res = []
        q = [r]
        while q:
            curr = q.pop(0)
            if curr:
                res.append(str(curr.val))
                q.append(curr.left)
                q.append(curr.right)
            else:
                res.append("null")
        while res and res[-1] == "null":
            res.pop()
        return res
`
    },
    {
      slug: "number-of-islands",
      language: "cpp",
      sourceCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int numIslands(vector<vector<string>> grid) {
        int m = grid.size();
        if (m == 0) return 0;
        int n = grid[0].size();
        int islands = 0;
        
        function<void(int, int)> dfs = [&](int r, int c) {
            if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != "1") return;
            grid[r][c] = "0";
            dfs(r + 1, c);
            dfs(r - 1, c);
            dfs(r, c + 1);
            dfs(r, c - 1);
        };
        
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == "1") {
                    islands++;
                    dfs(r, c);
                }
            }
        }
        return islands;
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
    for (let attempts = 0; attempts < 30; attempts++) {
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
