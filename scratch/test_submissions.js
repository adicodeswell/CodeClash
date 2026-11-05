import jwt from "jsonwebtoken";

const token = jwt.sign(
  { sub: "cmvzak17h00005fsb76n2epfd", role: "USER" },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

async function submit(slug, language, sourceCode) {
  console.log(`Submitting ${slug} (${language})...`);
  const res = await fetch("http://localhost:5003/api/submissions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: `token=${token}`,
    },
    body: JSON.stringify({ problemSlug: slug, language, sourceCode }),
  });
  if (res.status !== 202) {
    console.error("Submit failed:", res.status, await res.text());
    return;
  }
  const data = await res.json();
  const submissionId = data.submission.id;
  console.log(`Created submission ${submissionId}, waiting for judge...`);

  for (let attempt = 0; attempt < 30; attempt++) {
    await new Promise((r) => setTimeout(r, 1500));
    const checkRes = await fetch(`http://localhost:5003/api/submissions/${submissionId}`, {
      headers: { cookie: `token=${token}` },
    });
    const sub = await checkRes.json();
    if (sub.submission.status === "COMPLETED") {
      console.log(`Result: ${sub.submission.verdict} | Passed: ${sub.submission.passedTestCount}/${sub.submission.totalTestCount} | Time: ${sub.submission.runtimeMs}ms`);
      return;
    }
  }
  console.log("Timeout waiting for submission");
}

async function main() {
  // Test 1: reverse-linked-list in JavaScript
  await submit(
    "reverse-linked-list",
    "javascript",
    `class Solution {
    reverseList(head) {
        return head.reverse();
    }
}
`
  );

  // Cool-down to respect user submission cooldown
  await new Promise((r) => setTimeout(r, 3000));

  // Test 2: valid-parentheses in C++
  await submit(
    "valid-parentheses",
    "cpp",
    `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.empty()) return false;
                if (c == ')' && st.top() != '(') return false;
                if (c == '}' && st.top() != '{') return false;
                if (c == ']' && st.top() != '[') return false;
                st.pop();
            }
        }
        return st.empty();
    }
};
`
  );
}

main().catch(console.error);
