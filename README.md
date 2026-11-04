# CodeClash

CodeClash is a high-performance online judge and competitive programming platform. It features an interactive code editor, real-time sample testcase runner, asynchronous distributed submission evaluation, high-precision in-process execution timing, and a modular problem bank.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Monorepo & NPM Workspaces](#monorepo--npm-workspaces)
3. [Prerequisites](#prerequisites)
4. [Environment Configuration](#environment-configuration)
5. [Setup & Installation](#setup--installation)
6. [Running the Application](#running-the-application)
7. [Running Tests](#running-tests)
8. [Detailed System Architecture & Workflows](#detailed-system-architecture--workflows)
   - [Run Code Workflow (Synchronous)](#run-code-workflow-synchronous)
   - [Submit Code Workflow (Asynchronous State Machine)](#submit-code-workflow-asynchronous-state-machine)
   - [High-Resolution In-Process Timing](#high-resolution-in-process-timing)
   - [Security & Sandboxing](#security--sandboxing)
9. [Comprehensive Problem Setting Guide](#comprehensive-problem-setting-guide)
   - [Overview & Philosophy](#overview--philosophy)
   - [Problem Package Architecture](#problem-package-architecture)
   - [Step 1: Create Problem Directory & Slug](#step-1-create-problem-directory--slug)
   - [Step 2: Write Problem Statement (Problem.md)](#step-2-write-problem-statement-problemmd)
   - [Step 3: Define Problem Signature (Structure.md)](#step-3-define-problem-signature-structuremd)
   - [Step 4: Author Reference & Baseline Solutions](#step-4-author-reference--baseline-solutions)
   - [Step 5: Author the 6-Tier Test Suite Generator](#step-5-author-the-6-tier-test-suite-generator)
   - [Step 6: CLI Tooling & Execution Pipeline](#step-6-cli-tooling--execution-pipeline)
   - [Step 7: Pre-Flight Checklist & Quality Standards](#step-7-pre-flight-checklist--quality-standards)

---

## Architecture Overview

The system is split into decoupled layers optimized for low latency and distributed scalability:

```mermaid
flowchart TD
    subgraph Client ["Client (Browser)"]
        UI["React 19 + Tailwind CSS"]
        Editor["Monaco Code Editor"]
        Poller["useSubmissionStatus Hook"]
    end

    subgraph API_Layer ["API Layer (Port 5003)"]
        Express["Express REST API"]
        AuthRoute["Auth & Session Controller"]
        ProbRoute["Problem Catalog Service"]
        RunRoute["Fast Run-Code Service (Synchronous)"]
        SubRoute["Submission Controller (Async Queuing)"]
    end

    subgraph Data_Layer ["Data Layer (Port 5432)"]
        Postgres[("PostgreSQL Database")]
        PrismaORM["Prisma ORM (@codeclash/db)"]
    end

    subgraph Worker_Layer ["Background Judging Layer"]
        Worker["Judge Worker Daemon"]
        QueueMgr["Atomic Queue Manager"]
        BatchExec["Parallel Batch Executor"]
        Recovery["Stale Job Recovery Sweep"]
    end

    subgraph Execution_Engine ["Execution Sandbox"]
        Judge0["Judge0 CE API (RapidAPI / Self-Hosted)"]
    end

    UI -->|Vite Proxy /api| Express
    Express --> PrismaORM --> Postgres
    RunRoute -->|wait=true concurrent requests| Judge0
    SubRoute -->|INSERT INTO submissions status=QUEUED| Postgres
    Worker -->|Atomic claim status=RUNNING| Postgres
    Worker -->|wait=true concurrent test cases| Judge0
    Worker -->|UPDATE status=COMPLETED, verdict| Postgres
    Poller -->|GET /api/submissions/:id polling| SubRoute
```

---

## Monorepo & NPM Workspaces

CodeClash is organized as a unified monorepo using **NPM Workspaces** (`apps/*` and `packages/*`). Workspaces allow shared packages to be imported across applications via local symlinks without manual re-publishing.

```text
CodeClash/
├── apps/
│   ├── web/                 # Vite + React 19 Frontend
│   ├── api/                 # Express REST API
│   └── judge-worker/        # Background queue consumer & judge worker
├── packages/
│   ├── common/              # Shared schemas, Judge0 client, timing wrapper, mappers
│   └── db/                  # Prisma client instance and database models
├── prisma/
│   └── schema.prisma        # Single source of truth for DB schema
├── problem-bank/            # Offline problem packages, boilerplate generator & importer
├── .env.example             # Template for environment configuration
└── package.json             # Root workspace coordinator
```

### Workspace Breakdown

#### 1. `apps/web` (Frontend)
- **Tech Stack**: React 19, Vite, Tailwind CSS, Monaco Editor, Lucide Icons.
- **Key Responsibilities**:
  - Code editing with syntax highlighting and language starter boilerplate.
  - **Run Code Panel**: Executes user code against public sample testcases and displays per-test pass/fail status, inputs, user outputs, expected outputs, and runtime diagnostics.
  - **Submit Panel**: Asynchronously queues code, displays real-time state transitions (`QUEUED` $\to$ `RUNNING` $\to$ `COMPLETED`), and renders the final verdict with passed test counts, execution time, and memory metrics.
  - Resilient polling hook ([`useSubmissionStatus.js`](file:///home/adicodes/CodeClash/CodeClash/apps/web/src/hooks/useSubmissionStatus.js)) with unmount cleanup, state-reset protection, and rate-limit backoff.

#### 2. `apps/api` (Backend API)
- **Tech Stack**: Express.js, Zod validation, Argon2 password hashing, JSON Web Tokens (JWT) in HTTP-only cookies.
- **Key Responsibilities**:
  - User authentication (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`, `/api/auth/logout`).
  - Problem catalog and detail endpoints (`/api/problems`, `/api/problems/:slug`) with automatic stripping of full driver templates and hidden testcases.
  - **Run Endpoint (`POST /api/submissions/run`)**: Fast synchronous sample runner that executes public test cases concurrently on Judge0 without database queue overhead.
  - **Submission Endpoint (`POST /api/submissions`)**: Validates code, enforces concurrency rate limits (1 active job per user), persists submission as `QUEUED`, and returns a `202 Accepted` response immediately.
  - **Status Endpoint (`GET /api/submissions/:id`)**: Authorized retrieval of submission judging progress and final verdicts.

#### 3. `apps/judge-worker` (Judging Daemon)
- **Tech Stack**: Node.js, Prisma ORM, Judge0 API integration.
- **Key Responsibilities**:
  - Autonomous polling loop for jobs in `QUEUED` state.
  - **Atomic Queue Claim**: Uses row locking to prevent race conditions when multiple workers run concurrently.
  - **Harness Assembly**: Injects in-process timing wrappers and substitutes user code into the driver template.
  - **Parallel Batch Execution**: Dispatches all problem test cases (sample + hidden) concurrently to Judge0 using zero-polling `wait=true` mode.
  - **Verdict Evaluation & Recovery**: Evaluates verdicts (`ACCEPTED`, `WRONG_ANSWER`, `TIME_LIMIT_EXCEEDED`, `COMPILATION_ERROR`, etc.), retries transient infrastructure failures with exponential backoff, and automatically sweeps stale `RUNNING` jobs.

#### 4. `packages/common` (Shared Utilities)
- Exported via `@codeclash/common`.
- Contains Zod validation schemas (`auth`, `problem`, `submission`).
- Judge0 API client ([`judge0.client.js`](file:///home/adicodes/CodeClash/CodeClash/packages/common/src/judge/judge0.client.js)) with `executeJudge0WithWait` and token polling fallback.
- In-process execution timing wrapper ([`timing-wrapper.js`](file:///home/adicodes/CodeClash/CodeClash/packages/common/src/judge/timing-wrapper.js)).
- Verdict mapper & metric extractor ([`verdict-mapper.js`](file:///home/adicodes/CodeClash/CodeClash/packages/common/src/judge/verdict-mapper.js)).
- Language ID mapping table (`cpp`, `java`, `python`, `javascript`).

#### 5. `packages/db` (Database Access)
- Exported via `@codeclash/db`.
- Instantiates a shared `PrismaClient` using the PostgreSQL driver adapter (`@prisma/adapter-pg`).

#### 6. `problem-bank` (Problem Management CLI)
- Houses standalone problem definitions (`Problem.md`, `Structure.md`, test cases).
- Scripts to generate function/driver templates, validate packages, and import them into PostgreSQL.

---

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: `v20.x` or higher (verified on Node `v20`, `v22`, and `v26`).
- **NPM**: `v10.x` or higher.
- **PostgreSQL**: `v14.x` or higher running locally or accessible via network.
- **Judge0 CE**: RapidAPI subscription key or a self-hosted Judge0 CE server instance.

---

## Environment Configuration

Create a `.env` file in the root of the repository by copying the example template:

```bash
cp .env.example .env
```

Configure the environment variables in `.env`:

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/codeclash` |
| `JWT_SECRET` | Secret key used to sign and verify JWT authentication cookies | `your-secure-jwt-secret-min-32-chars` |
| `NODE_ENV` | Application environment (`development` / `production`) | `development` |
| `PORT` | HTTP port for the Express backend API | `5003` |
| `JUDGE0_BASE_URL`| Judge0 API endpoint URL | `https://judge0-ce.p.rapidapi.com` or `https://ce.judge0.com` |
| `RAPIDAPI_KEY` | RapidAPI application key (leave blank if self-hosting Judge0) | `your_rapidapi_key_here` |
| `RAPIDAPI_HOST`| RapidAPI host header (required when using RapidAPI) | `judge0-ce.p.rapidapi.com` |

---

## Setup & Installation

### 1. Install Dependencies
Run the install command from the root directory. NPM will automatically install and link all packages across all workspaces:

```bash
npm install
```

### 2. Configure Database & Run Migrations
Generate the Prisma Client and push the database schema to your PostgreSQL instance:

```bash
# Push schema changes to PostgreSQL
npx prisma db push

# Generate Prisma client for @codeclash/db
npx prisma generate
```

### 3. Generate Boilerplate and Import Problems
Populate your database with the built-in problem bank (e.g. `two-sum`):

```bash
# 1. Generate language starter and driver templates
npm --prefix problem-bank run generate

# 2. Validate problem structure and test cases
npm --prefix problem-bank run validate

# 3. Import problem metadata and test cases into PostgreSQL
npm --prefix problem-bank run import
```

*(Optional)* Launch Prisma Studio to verify your database records:
```bash
npx prisma studio
```

---

## Running the Application

To run the complete system in development mode, start each service in separate terminal windows:

### Terminal 1: Backend API Server
```bash
npm run dev:api
# Or: node apps/api/src/server.js
```
*API runs at `http://localhost:5003`.*

### Terminal 2: Judge Worker Daemon
```bash
npm run dev:worker
# Or: node apps/judge-worker/src/worker.js
```
*The worker continuously monitors the queue for incoming submissions.*

### Terminal 3: Web Frontend
```bash
npm run dev:web
# Or: npm run dev -w apps/web
```
*Vite dev server runs at `http://localhost:5173` with automatic `/api` proxying to `http://localhost:5003`.*

### Building Frontend for Production
```bash
npm run build -w apps/web
```

---

## Running Tests

CodeClash includes comprehensive automated unit, integration, and security tests across all workspaces using Node.js's native test runner (`node:test`). The test suite currently comprises **104 passing tests** across 15 suites.

### Quick Test Commands

```bash
# Run all test suites across the entire monorepo (API + Worker + Common)
npm test
# Or: npm run test:all

# Run backend API tests (88 tests across 9 suites)
npm run test:api
# Or: npm test -w apps/api

# Run judge-worker queue & recovery tests (7 tests)
npm run test:worker
# Or: npm test -w apps/judge-worker

# Run shared common package tests (9 tests)
npm run test:common
# Or: npm test -w packages/common

# Problem Bank: Generate 80+ categorized tests (basic, edge, boundary, random, stress, adversarial)
npm run problems:test:generate -- [problem-slug]

# Problem Bank: Cross-verify reference solution vs brute-force baseline across tests & fuzzing
npm run problems:test:verify -- [problem-slug]

# Problem Bank: Audit test suite distribution, array sizes, values, and visibility
npm run problems:test:summary -- [problem-slug]

# Verify frontend production build
npm run build:web
# Or: npm run build -w apps/web
```

---

### Test Suite Directory & Breakdown

| Workspace / File | Test Count | Scope & Coverage |
| :--- | :---: | :--- |
| **`apps/api/tests/auth.test.js`** | 18 | Registration validation, strict schema, email normalization, duplicate handling (409), login enumeration prevention (401), session cookies, logout, and IP rate limiting on `/signup` and `/login` (429). |
| **`apps/api/tests/submissions.history.test.js`** | 10 | Cursor pagination, deterministic tie-breaking for identical timestamps, User A / User B isolation, secret stripping, and cross-user cursor injection prevention (400). |
| **`apps/api/tests/submissions.detail.test.js`** | 10 | Ownership verification, IDOR defense returning 404 Not Found (enumeration-resistant), exact source code matching, secret stripping, and explicit `ADMIN` role access. |
| **`apps/api/tests/problems-list.test.js`** | 8 | Catalog querying, keyword search, difficulty filtering, topic filtering, pagination limits, and query parameter validation (400). |
| **`apps/api/tests/problem-detail.test.js`** | 4 | Published problem detail, regex slug format validation, 404 unknown problem, and 401 unauthenticated access. |
| **`apps/api/tests/problem-privacy.test.js`** | 3 | Zero-leak validation: verifies `testCases` and `fullDriverTemplate` are never returned in catalog or detail APIs, and error handlers sanitize stack traces. |
| **`apps/api/tests/submissions.test.js`** | 19 | Submission lifecycle, concurrent queue blocking (429), 2s cooldown (429), synchronous sample runner (`/run`), metrics normalization, and error diagnostics. |
| **`apps/api/tests/user-progress-api.test.js`** | 5 | User progress endpoint (`GET /api/users/me/progress`), unique solved/attempted counts, difficulty breakdowns, and exclusion of infrastructure `JUDGE_ERROR`. |
| **`apps/api/tests/progress.test.js`** | 10 | Multi-problem progress matrix (5 problems), catalog solved/attempted badge enrichment, and User A vs. User B progress isolation. |
| **`apps/judge-worker/tests/queue.test.js`** | 7 | Atomic queue claiming (`FOR UPDATE SKIP LOCKED`), race condition prevention, retry exponential backoff, max-retry terminal `JUDGE_ERROR`, and stale job recovery. |
| **`packages/common/tests/verdict-mapper.test.js`** | 9 | `__CODECLASH_TIME_MS__` in-process timing extraction & stderr purging, Judge0 status mappings (`ACCEPTED`, `WRONG_ANSWER`, `TLE`, `MLE`, `CE`, `RTE`, `JUDGE_ERROR`). |

---

### Running Individual Test Suites

You can execute targeted test files using Node's native test runner from the root directory:

```bash
# 1. Authentication & Rate Limiting Tests
node --test apps/api/tests/auth.test.js

# 2. Submissions History & Cursor Pagination Tests
node --test apps/api/tests/submissions.history.test.js

# 3. Submissions Detail & IDOR Security Tests
node --test apps/api/tests/submissions.detail.test.js

# 4. User Progress & Multi-User Isolation Tests
node --test apps/api/tests/progress.test.js
node --test apps/api/tests/user-progress-api.test.js

# 5. Problem Catalog & Privacy Tests
node --test apps/api/tests/problems-list.test.js
node --test apps/api/tests/problem-detail.test.js
node --test apps/api/tests/problem-privacy.test.js

# 6. Judge Worker Queue Management Tests
node --test apps/judge-worker/tests/queue.test.js

# 7. Common Verdict Mapper Tests
node --test packages/common/tests/verdict-mapper.test.js
```

> [!NOTE]
> The backend test runner uses `--test-concurrency=1` (`node --test --test-concurrency=1 tests/*.test.js`) to prevent race collisions between concurrent test suites operating against shared per-user submission rate limits and cooldown timers.

---

### Offline Problem Bank Validation

Before importing problems into PostgreSQL, validate their structure, markdown files, and test case pairings:

```bash
# Validate all problems in problem-bank/
npm --prefix problem-bank run validate

# Validate a specific problem package (e.g., two-sum)
npm --prefix problem-bank run validate -- two-sum
```

---

## Detailed System Architecture & Workflows

### Run Code Workflow (Synchronous)

The **Run Code** feature allows users to test their solution against visible sample testcases without persisting an official submission to the database.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Web as React Web (5173)
    participant API as Express API (5003)
    participant Judge0 as Judge0 Engine

    User->>Web: Clicks "Run Code"
    Web->>API: POST /api/submissions/run { problemSlug, language, sourceCode }
    API->>API: Extract sampleTestCases from Problem record
    API->>API: Wrap source code with in-process timing wrapper
    API->>API: Replace {{USER_CODE}} in full driver template
    par Execute Sample Cases in Parallel
        API->>Judge0: POST /submissions?wait=true (Case 1)
        API->>Judge0: POST /submissions?wait=true (Case 2)
        API->>Judge0: POST /submissions?wait=true (Case 3)
    end
    Judge0-->>API: Returns execution results & stderr markers
    API->>API: Parse __CODECLASH_TIME_MS__ from stderr and sanitize output
    API->>API: Compare actualOutput vs expectedOutput
    API-->>Web: 200 OK { verdict, passedTestCount, testCases: [...] }
    Web-->>User: Displays per-case badges (Passed/Failed), outputs & diagnostics
```

---

### Submit Code Workflow (Asynchronous State Machine)

The **Submit Code** feature evaluates the user's code against all test cases (both sample and hidden) using an asynchronous state machine.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Web as React Web (5173)
    participant API as Express API (5003)
    participant DB as PostgreSQL
    participant Worker as Judge Worker
    participant Judge0 as Judge0 Engine

    User->>Web: Clicks "Submit"
    Web->>API: POST /api/submissions { problemSlug, language, sourceCode }
    API->>DB: Check active submissions for user (concurrency limit)
    API->>DB: INSERT submission (status = QUEUED)
    API-->>Web: 202 Accepted { id, status: "QUEUED" }
    
    par Asynchronous Polling
        loop Every 1.5s until terminal status
            Web->>API: GET /api/submissions/:id
            API->>DB: SELECT status, verdict, runtimeMs, memoryKb
            DB-->>API: Current submission state
            API-->>Web: Status response
        end
    and Worker Queue Processing
        Worker->>DB: Atomic claim (status = RUNNING, startedAt = NOW())
        Worker->>Judge0: POST /submissions (Multi-Test Driver with streamed inputs)
        Judge0-->>Worker: Execution result & line-by-line outputs (~3.2s total)
        alt Compilation Error
            Worker->>Worker: Parse compiler output & mark COMPILATION_ERROR
        else Runtime Error / Crash
            Worker->>Worker: Credit pre-crash passed lines & mark RUNTIME_ERROR
        else Time Limit Exceeded
            Worker->>Worker: Credit pre-timeout passed lines & mark TIME_LIMIT_EXCEEDED
        else Standard Completion
            Worker->>Worker: Compare stdout lines against hidden expected outputs
        end
        Worker->>DB: UPDATE submission (status = COMPLETED, verdict, passedTestCount, runtimeMs)
    end
    
    Web-->>User: Renders final verdict, passed counts, runtime & memory
```

#### Database State Machine

```mermaid
stateDiagram-v2
    [*] --> QUEUED : Persisted via POST /api/submissions
    QUEUED --> RUNNING : Claimed atomically by Worker
    RUNNING --> QUEUED : Transient infrastructure failure (Retry backoff)
    RUNNING --> COMPLETED : All test cases evaluated or terminal failure
    
    state COMPLETED {
        ACCEPTED
        WRONG_ANSWER
        TIME_LIMIT_EXCEEDED
        MEMORY_LIMIT_EXCEEDED
        RUNTIME_ERROR
        COMPILATION_ERROR
        JUDGE_ERROR
    }
```

---

### High-Resolution In-Process Timing

#### The Problem with Container Execution Time
Standard online judges measuring external process wall-clock time (`/usr/bin/time`) include container initialization, Python/Node VM spin-up, library loading, and AST parsing. On shared execution containers, this VM startup overhead takes **1,000 ms to 1,400 ms**, making a simple Python solution show an inaccurate runtime (e.g., 1475 ms).

#### The Solution
CodeClash utilizes **in-process function benchmarking** (identical to LeetCode):
- **Python**: Wraps the user's `Solution` method in-memory with `time.perf_counter()`.
- **JavaScript**: Wraps the solution with `performance.now()`.
- During execution, the benchmark writes a private marker to `stderr`:
  ```text
  __CODECLASH_TIME_MS__:1.15
  ```
- The worker and API service parse this marker, record the accurate execution time (**~1 ms**), and strip the marker line from `stderr` so diagnostics remain clean.
- The user's persisted code in the database is never mutated.

---

### Judging Engine Optimization & Architectural Decisions

Following extensive research into how industry-leading competitive programming platforms (**LeetCode**, **NeetCode**, and **Striver / TUF+**) architect high-throughput code evaluation, CodeClash implements a specialized **Fail-Fast + Chunked Batching** judging pipeline.

#### 1. Industry Benchmarks & Comparative Analysis

| Platform | Execution Infrastructure | Batching & Evaluation Strategy | Short-Circuiting |
| :--- | :--- | :--- | :--- |
| **LeetCode** | Custom sandboxed microVMs / gVisor containers | In-process driver loop with sequential dispatch per container | **Fail-Fast**: Stops immediately on first failing test case. |
| **NeetCode** | Remote execution backend (Judge0 API) | Custom driver templates, batching requests to reduce round-trips | **Fail-Fast**: Aborts remaining test evaluation on error. |
| **Striver (TUF+)** | Remote execution backend (Judge0 API) | Driver code wrapping with multi-test batch submission | **Fail-Fast**: Surfaces first failed test case. |
| **CodeClash** | **Judge0 CE API + Distributed Worker** | **Chunked Batching (`CHUNK_SIZE = 10`) via `/submissions/batch`** | **Two-Gate Fail-Fast**: Prioritizes `SAMPLE` tests, aborts remaining chunks instantly. |

---

#### 2. Decision 1: Fail-Fast Short-Circuiting

**Problem**: Running all 80 test cases sequentially for an incorrect submission took **35 to 50 seconds** on the public Judge0 API, degrading user feedback latency and exhausting API rate limits. In practice, 70–80% of submissions submitted to competitive programming judges fail within the first few edge cases.

**Architectural Decision**:
- **Gate 1 (Public Sample Cases)**: Evaluates the problem's public sample test cases first. If a candidate's code fails on the basic examples shown directly in the problem description, execution stops immediately.
- **Gate 2 (Hidden Stress & Boundary Tests)**: Evaluates hidden test cases only if Gate 1 succeeds.
- **Immediate Termination**: Upon encountering the first non-accepted verdict (`WRONG_ANSWER`, `TIME_LIMIT_EXCEEDED`, `MEMORY_LIMIT_EXCEEDED`, `RUNTIME_ERROR`, or `COMPILATION_ERROR`), the judge worker records the failing test ordinal, aborts all subsequent chunk submissions, and marks the submission as `COMPLETED` in PostgreSQL.

**Performance Impact**: Failing submissions finish in **~1.2 seconds** instead of 45 seconds (**>95% latency reduction**).

---

#### 3. Decision 2: Multi-Test In-Process Driver (The LeetCode / Codeforces Model)

**The Core Bottleneck**:
Profiling proved that on a shared remote execution engine (like public Judge0 CE), spawning **80 separate sandbox containers** takes **~21 to 25 seconds** due to server-side queue limits—even though the user's algorithm takes only **~40 milliseconds** of actual CPU time.

**The Solution: Multi-Test In-Process Driver Harness**:
To achieve sub-4-second evaluation without changing the participant experience, CodeClash implements **Multi-Test Streaming Execution**:
- **Zero Candidate Impact**: The participant still writes idiomatic code inside `class Solution` (starter code remains 100% untouched).
- **While-Loop Driver Harness**:
  The full driver harness wraps the input processing in an EOF-aware `while` loop across all 4 supported languages (C++, Java, Python, and JavaScript):
  - In **C++**: `while (readIntList(nums)) { if (!readInt(target)) break; Solution solution; ... }`
  - In **Python**: `while True: nums = read_int_list(); if nums is None: break; ...`
  - In **JavaScript**: `while (cursor < tokens.length && tokens[cursor] !== "") { const nums = readIntList(); ... }`
  - In **Java**: `while (scanner.hasNextInt()) { ... Solution solution = new Solution(); ... }`
- **Single Container Execution**:
  All 80 test case inputs are streamed into a **single sandboxed execution container** in one single HTTP request.
- **State Isolation Protection**:
  Inside the driver loop, a fresh `Solution` instance is constructed on every single iteration (`Solution solution;` on stack in C++, `new Solution()` in JS/Java, `Solution()` in Python), guaranteeing that instance variables never leak between test cases.
- **Fail-Fast & Crash Detection**:
  - If test case #2 outputs a wrong answer, the worker compares stdout line-by-line against hidden expected outputs and halts immediately with `WRONG_ANSWER (passed: 1/80)`.
  - If user code crashes on test case #3 (e.g. division by zero or out-of-bounds index), the worker counts outputs emitted before the crash, maps the exception from `stderr`, and marks `RUNTIME_ERROR (passed: 2/80)`.
- **Resilient Fallback**:
  If a legacy problem driver that only outputs 1 line is submitted, the worker detects it automatically and falls back gracefully to chunked batch evaluation (`BATCH_SIZE = 20`).

#### Empirical Performance Benchmarks (80 Test Cases)

| Language | Original 80-Container Batching | New Multi-Test Driver | Speedup |
| :--- | :--- | :--- | :--- |
| **Python** | 24.8 seconds | **3.25 seconds** | **7.6x faster** |
| **C++** | 24.5 seconds | **3.44 seconds** | **7.1x faster** |
| **JavaScript** | 23.9 seconds | **3.08 seconds** | **7.8x faster** |
| **Java** | 26.2 seconds | **3.29 seconds** | **8.0x faster** |

---

#### 4. Decision 3: Sandbox Safety & Crash Isolation Guards

| Concern | Potential Failure Mode | How CodeClash Solves It |
| :--- | :--- | :--- |
| **Instance State Pollution** | User code stores variables on `this` / `self` across tests. | A brand new `Solution` instance is instantiated inside the loop block on every test case. |
| **Global State Mutation** | In C++, a user declares `static int count = 0;` and doesn't reinitialize. | Follows industry convention (LeetCode/Codeforces): global variables must be reset per function call. |
| **Process Crash on Exception** | An unhandled exception or SIGSEGV stops stdout emission. | The worker parses line count produced prior to crash, accurately recording `passedTestCount` and `RUNTIME_ERROR`. |
| **Infinite Loops (TLE)** | User code contains an infinite loop on test case $K$. | The container hits `cpuTimeLimit`, Judge0 returns `TIME_LIMIT_EXCEEDED`, and lines produced before the loop are credited. |

---

#### 5. Decision 4: Execution Metrics Aggregation

- **Runtime ($T_{total}$)**: CodeClash sums in-process execution times ($\sum T_{test}$) across all evaluated test cases to reflect true algorithmic execution cost without container startup overhead.
- **Peak Memory ($M_{peak}$)**: Recorded as the maximum memory consumption ($\max M_{test}$) observed across any evaluated test container.
- **Fail-Fast Error Reporting**: When a submission fails, the response reports `passedTestCount`, `totalTestCount`, the failing test's input/output (if a public `SAMPLE` test), and an explicit sanitized error diagnosis.

---

#### 6. Decision 5: Python 3 Modern Typing & Forward-Compatibility

Judge0 CE's Python 3 runtime runs Python 3.8.1. Modern type annotations (such as `list[int]`, `dict[str, int]`, and `tuple[int, ...]`) standard in Python 3.9+ normally throw `TypeError: 'type' object is not subscriptable` in Python 3.8.

**Architectural Decision**:
All Python driver templates generated by `problem-bank/scripts/generate-boilerplate.js` automatically inject:
```python
from __future__ import annotations
import sys
from typing import List, Dict, Tuple, Set, Optional
```
This guarantees that candidates can write modern Python type hints without runtime subscripting errors, ensuring 100% compatibility across Python 3.8 through 3.12+.

---

### Security & Sandboxing

1. **Hidden Testcase Privacy**:
   - Test cases flagged as `HIDDEN` are never returned by any public API endpoint.
   - The `/api/submissions/run` endpoint only runs against public `SAMPLE` test cases.
   - Even in failure modes (`WRONG_ANSWER`), hidden inputs and expected outputs are omitted.
2. **Strict Zod Input Validation**:
   - All client inputs are strictly validated against schemas. Unknown fields are rejected with `.strict()`.
3. **Safe Template Substitution**:
   - Template placeholders (`{{USER_CODE}}`) are replaced using replacer functions `replace(marker, () => code)` to prevent special regex symbol interpretation (`$` tokens).
4. **Per-User Concurrency Locks**:
   - Users are restricted to 1 active submission in `QUEUED` or `RUNNING` status at any time, preventing queue exhaustion attacks.
5. **Worker Stale Job Sweeper**:
   - Workers automatically reclaim or fail jobs stuck in `RUNNING` status if a worker node crashes or loses network connectivity.

---

## Comprehensive Problem Setting Guide

This guide provides an end-to-end reference for problem authors, contributors, and maintainers to set, test, and import new competitive programming problems into the CodeClash problem bank.

---

### Overview & Philosophy

Problem authoring in CodeClash separates two distinct responsibilities:
1. **Problem Specification**: Defining the problem description, mathematical constraints, and function signature.
2. **Test Suite Engineering**: Designing edge cases, boundary conditions, stress tests, and adversarial inputs to guarantee strong, un-cheatable problem packages.

Instead of manually crafting hundreds of raw `.txt` input/output files by hand, CodeClash provides a **semi-automated problem authoring pipeline**:
- You write the problem description (`Problem.md`) and signature (`Structure.md`).
- You provide an optimized reference solution (`reference/solution.js`) and a simple brute-force baseline (`reference/baseline-solution.js`).
- You write a 6-tier test generator (`generators/test-cases.js`) that defines what cases need to be tested.
- Automated CLI tools generate boilerplates across 4 programming languages, compile and format test cases into `.txt` files, cross-verify the solution against the baseline, audit test distributions, and import everything into PostgreSQL.

> **Why are offline reference solutions written in JavaScript?**
> The test generator is a local Node.js developer tool. Running the reference solution in-process executes 80+ test cases in **< 100ms** with zero extra compiler dependencies. If written in Java, Node.js would have to spawn child JVM processes (`java Solution`) for every single test case, taking 15–25 seconds of process startup overhead and requiring a local Java JDK. Because the generator outputs standard, language-agnostic `.txt` files, the authoring language is completely decoupled from the judge sandbox (which fully compiles and executes user code in Java, C++, Python, and JavaScript).

---

### Problem Package Architecture

Every problem in `problem-bank/problems/<slug>/` adheres to the following directory structure:

```text
problem-bank/problems/<slug>/
├── Problem.md                  # Problem statement, examples, and constraints
├── Structure.md                # Metadata, function signature, and input/output types
├── reference/
│   ├── solution.js             # Optimal reference solution (e.g. O(N) hash map)
│   └── baseline-solution.js    # Simple brute-force baseline with validity assertions
├── generators/
│   └── test-cases.js           # 6-tier test case generator (~80 categorized cases)
├── boilerplate/                # Generated user starter templates (C++, Java, Python, JS)
├── boilerplate-full/           # Generated complete execution drivers with {{USER_CODE}}
└── tests/
    ├── inputs/                 # Generated input text files (0.txt ... 79.txt)
    └── outputs/                # Generated expected output text files (0.txt ... 79.txt)
```

```mermaid
flowchart TD
    subgraph Author_Inputs ["Author Inputs"]
        MD["Problem.md (Statement & Examples)"]
        Spec["Structure.md (Signature & Types)"]
        Sol["reference/solution.js (Optimal Solution)"]
        Base["reference/baseline-solution.js (Brute-Force Baseline)"]
        Gen["generators/test-cases.js (6-Tier Test Definitions)"]
    end

    subgraph Build_Pipeline ["Automated Problem Tooling"]
        TestRunner["generate-tests.js"]
        Verifier["verify-reference.js"]
        Summary["test-summary.js"]
        Boilerplate["generate-boilerplate.js"]
        Validator["validate-problem.js"]
    end

    subgraph Generated_Artifacts ["Generated Artifacts"]
        Tests["tests/inputs/*.txt & tests/outputs/*.txt"]
        Templates["boilerplate/ & boilerplate-full/"]
    end

    subgraph Database_Layer ["Storage"]
        Importer["import-problems.js"]
        Postgres[("PostgreSQL Database")]
        Manifest["import-manifest.json"]
    end

    Gen --> TestRunner
    Sol --> TestRunner
    Spec --> TestRunner
    TestRunner --> Tests

    Sol --> Verifier
    Base --> Verifier
    Tests --> Verifier

    Spec --> Boilerplate
    Boilerplate --> Templates

    Tests --> Validator
    Templates --> Validator
    Spec --> Validator

    Validator --> Importer
    Tests --> Importer
    Templates --> Importer
    Importer --> Postgres
    Importer --> Manifest
```

---

### Step 1: Create Problem Directory & Slug

Create a new directory inside `problem-bank/problems/`. The directory name must be a unique, lowercase, kebab-case identifier (e.g., `longest-consecutive-sequence`, `two-sum`, `subarray-sum-equals-k`).

```bash
mkdir -p problem-bank/problems/my-new-problem/{reference,generators}
```

---

### Step 2: Write Problem Statement (`Problem.md`)

Create `Problem.md` inside your problem directory. Follow this standard template:

```markdown
# Problem Title

## Problem Description

Detailed explanation of the problem requirements, expected behavior, and algorithmic constraints.

## Examples

### Example 1

**Input:** `nums = [2,7,11,15], target = 9`
**Output:** `[0,1]`
**Explanation:** `nums[0] + nums[1] = 2 + 7 = 9`, so the answer is `[0,1]`.

### Example 2

**Input:** `nums = [3,2,4], target = 6`
**Output:** `[1,2]`

## Constraints

- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`
- Exactly one valid answer exists.

## Follow-up

Can you solve it in O(n) time and O(n) space?
```

> [!IMPORTANT]
> **The Public vs. Hidden Example Rule:**
> When problems are imported into PostgreSQL, `import-problems.js` counts the number of `### Example` headings in `Problem.md` (e.g. 2 examples).
> - Test cases matching those example indices (`0.txt` and `1.txt`) are automatically flagged as **`visibility: SAMPLE`** (publicly viewable in the frontend testcase runner).
> - All subsequent test cases (`2.txt` through `79.txt`) are flagged as **`visibility: HIDDEN`** (evaluated secretly during official code submissions).
> Always ensure your generator preserves the exact canonical examples from `Problem.md` as test cases `0.txt`, `1.txt`, etc.

---

### Step 3: Define Problem Signature (`Structure.md`)

Create `Structure.md`. This file acts as the single source of truth for generating language boilerplates, full execution drivers, input parsers, and database import metadata.

```text
Problem Name: "Two Sum"
Difficulty: EASY
Topics: Array, Hash Table
Function Name: twoSum

Input Structure:
Input Field: list<int> nums
Input Field: int target

Output Structure:
Output Field: list<int> result
```

#### Supported Metadata Fields
| Field | Description | Allowed Values |
| :--- | :--- | :--- |
| `Problem Name:` | Human-readable problem title | Enclosed in quotes (e.g., `"Two Sum"`) |
| `Difficulty:` | Problem difficulty tier | `EASY`, `MEDIUM`, or `HARD` |
| `Topics:` | Comma-separated category tags | e.g., `Array, Hash Table, Dynamic Programming` |
| `Function Name:` | Identifier for user solution method | Valid camelCase identifier (e.g., `twoSum`) |
| `Input Field:` | Input parameter declaration | `<type> <name>` (e.g., `list<int> nums`) |
| `Output Field:` | Return type declaration | `<type> <name>` (e.g., `list<int> result`) |

#### Supported Types & Syntax
| Abstract Type | C++ | Java | Python | JavaScript | Text File Wire Format |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `int` | `int` | `int` | `int` | `number` | Single integer on its own line: `42` |
| `long` | `long long` | `long` | `int` | `number` | Single integer on its own line: `1000000000` |
| `double` | `double` | `double` | `float` | `number` | Floating point number: `3.1415` |
| `bool` | `bool` | `boolean` | `bool` | `boolean` | `1` for true, `0` for false |
| `String` | `string` | `String` | `str` | `string` | String token on its own line |
| `list<int>` | `vector<int>` | `int[]` | `list[int]` | `number[]` | Line 1: length $N$, Line 2: space-separated elements |

---

### Step 4: Author Reference & Baseline Solutions

Create two solutions under `problem-bank/problems/<slug>/reference/`:

#### 1. Optimal Solution (`reference/solution.js`)
This is the production-grade algorithm that achieves the intended optimal time and space complexity:

```javascript
// problem-bank/problems/<slug>/reference/solution.js
export function solve(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
```

#### 2. Baseline Solution (`reference/baseline-solution.js`)
This is an alternative, brute-force, or straightforward implementation used to cross-verify the optimal solution. Include strict assertions to verify problem constraints (e.g., confirming that exactly one answer exists):

```javascript
// problem-bank/problems/<slug>/reference/baseline-solution.js
export function solve(nums, target) {
  const matches = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        matches.push([i, j]);
      }
    }
  }
  if (matches.length === 0) {
    throw new Error(`Invalid test case: no solution found for target ${target}`);
  }
  if (matches.length > 1) {
    throw new Error(`Invalid test case: expected exactly 1 pair, found ${matches.length}`);
  }
  return matches[0];
}
```

---

### Step 5: Author the 6-Tier Test Suite Generator

Create `problem-bank/problems/<slug>/generators/test-cases.js`. Every CodeClash problem requires ~80 test cases structured across **6 essential categories**:

```javascript
// problem-bank/problems/<slug>/generators/test-cases.js
import { randomInt, shuffle } from "../../../scripts/utils/prng.js";

export function generateCases({ rng } = {}) {
  const cases = [];

  // Tier 1: Basic (0 - 9)
  // Preserve canonical examples from Problem.md (0.txt, 1.txt, ...) plus small sanity checks

  // Tier 2: Edge (10 - 24)
  // Minimal input sizes (N=0, 1, 2), zeros, negative numbers, extreme constraint limits (+/- 10^9),
  // solutions placed at boundary indices [0, 1] or [N-2, N-1], single-element traps.

  // Tier 3: Boundary (25 - 39)
  // Array sizes scaling up (N=3, 5, 10, 25, 50, 100, 200), powers of 2, large gaps.

  // Tier 4: Randomized (40 - 59)
  // 20 diverse, randomized test cases generated with seeded PRNG (rng) for strict reproducibility.

  // Tier 5: Stress / Scale (60 - 69)
  // Maximum constraints (up to N=10,000) specifically constructed to defeat naive O(N^2) brute force.
  // Example: placing the solution pair at [9998, 9999] forces quadratic loops to take 50,000,000 iterations.

  // Tier 6: Adversarial / Trap (70 - 79)
  // Hash collision traps (congruences modulo 2^16), clustering near target / 2, near-miss false sums (target +/- 1),
  // duplicate non-pair elements, and deceptive alternating patterns.

  return cases;
}
```

---

### Step 6: CLI Tooling & Execution Pipeline

All operations can be executed from the repository root using NPM workspace scripts:

#### 1. Generate Test Cases
Reads `generators/test-cases.js`, runs `reference/solution.js`, and writes formatted `tests/inputs/*.txt` and `tests/outputs/*.txt`:
```bash
npm run problems:test:generate -- [problem-slug]
```

#### 2. Cross-Verify Solutions
Runs both `reference/solution.js` and `reference/baseline-solution.js` against generated test cases and asserts 100% agreement:
```bash
npm run problems:test:verify -- [problem-slug]
```

#### 3. Audit Test Distribution & Sizes
Prints a summary table showing total tests, public sample count, hidden count, array size range $[N_{min}, N_{max}]$, value range, and disk storage:
```bash
npm run problems:test:summary -- [problem-slug]
```

#### 4. Generate Multi-Language Boilerplates
Builds the starter templates (`boilerplate/`) and execution drivers (`boilerplate-full/`) for C++, Java, Python, and JavaScript:
```bash
npm run problems:generate -- [problem-slug]
```

#### 5. Validate Package Integrity
Verifies metadata syntax, placeholder placement (`{{USER_CODE}}`), token formatting, and matching input/output counts:
```bash
npm run problems:validate -- [problem-slug]
```

#### 6. Import Problem into PostgreSQL
Calculates package SHA-256 content hashes, updates `import-manifest.json`, and upserts problems and test cases into PostgreSQL:
```bash
npm run problems:import -- [problem-slug]
```

*(Note: Omitting the `[problem-slug]` argument runs the command across **all** problems in the problem bank).*

---

### Step 7: Pre-Flight Checklist & Quality Standards

Before submitting a new problem or opening a pull request, ensure the following checklist passes:

- [ ] **Slug**: Folder name is unique, lowercase, and kebab-case.
- [ ] **Problem.md**: Contains description, formatted examples, constraints, and follow-up.
- [ ] **Structure.md**: Specifies valid problem title, difficulty (`EASY`/`MEDIUM`/`HARD`), topics, function name, and supported input/output types.
- [ ] **Sample Matching**: First $K$ test cases (`0.txt` to `(K-1).txt`) strictly match the $K$ examples in `Problem.md`.
- [ ] **Reference Solutions**: Both `reference/solution.js` and `reference/baseline-solution.js` exist and are tested.
- [ ] **6-Tier Coverage**: Test generator produces ~80 tests covering basic, edge, boundary, random, stress ($N=10,000$), and adversarial traps.
- [ ] **Verification**: `npm run problems:test:verify` passes with 100% agreement and zero constraint violations.
- [ ] **Validation**: `npm run problems:validate` reports `OK` with zero errors.
- [ ] **Database Import**: `npm run problems:import` imports successfully and updates `import-manifest.json`.
- [ ] **Automated Tests**: Root test suite (`npm test`) passes with 100% success rate across all workspaces.
- [ ] **Live UI Check**: Tested in the web editor (`npm run dev:web`) with both "Run Code" (sample test runner) and "Submit" (full hidden test evaluation).
