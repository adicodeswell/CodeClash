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
9. [Adding a Problem to CodeClash](#adding-a-problem-to-codeclash)
   - [1. Create Problem Directory](#1-create-the-problem-directory)
   - [2. Write Problem Statement](#2-write-the-problem-statement)
   - [3. Define Problem Structure](#3-define-the-problem-structure)
   - [4. Add Test Cases](#4-add-test-cases)
   - [5. Generate Boilerplate Templates](#5-generate-boilerplate-templates)
   - [6. Validate the Problem Package](#6-validate-the-problem-package)
   - [7. Import into PostgreSQL](#7-import-the-problem-into-postgresql)
   - [8. Import Manifest](#8-understand-the-import-manifest)
   - [9. Checklist](#9-checklist-before-opening-a-pull-request)
   - [10. Complete Workflow Summary](#10-complete-workflow)

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

CodeClash includes comprehensive automated unit and integration tests using Node.js's native test runner (`node:test`):

```bash
# Run backend API tests
npm test -w apps/api

# Run judge-worker queue & recovery tests
npm test -w apps/judge-worker

# Run all test suites
npm test -w apps/api && npm test -w apps/judge-worker
```

Test coverage includes:
- Authentication & RBAC verification
- Problem catalog querying, pagination, and data sanitation
- Zero-leak validation (ensuring hidden tests and internal drivers are never exposed)
- Atomic queue claims and race-condition prevention
- Worker retry backoff and stale job recovery
- Parallel sample run-code execution

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
        Worker->>Worker: Inject timing wrapper & compile driver template
        par Batch Judge Execution
            Worker->>Judge0: Parallel POST /submissions?wait=true for ALL test cases
        end
        Judge0-->>Worker: Execution results
        Worker->>Worker: Aggregate verdict (ACCEPTED / WRONG_ANSWER / TLE / etc.)
        Worker->>Worker: Extract runtime & memory metrics
        Worker->>DB: UPDATE submission (status = COMPLETED, verdict, runtimeMs)
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

## Adding a Problem to CodeClash

This guide explains how to add a new coding problem to the CodeClash problem bank, generate language templates, validate test cases, and import the problem into PostgreSQL.

Follow the steps in order to ensure that every problem is correctly structured and ready for the judging system.

### 1. Create the Problem Directory

Create a folder inside `problem-bank/problems/`. Use a unique, lowercase, kebab-case slug as the folder name.

Example: `two-sum`

```text
problem-bank/
└── problems/
    └── two-sum/
        ├── Problem.md
        ├── Structure.md
        ├── boilerplate/           # Generated function templates
        ├── boilerplate-full/      # Generated executable templates
        └── tests/
            ├── inputs/
            │   ├── 0.txt
            │   ├── 1.txt
            │   └── 2.txt
            └── outputs/
                ├── 0.txt
                ├── 1.txt
                └── 2.txt
```

**Important:** The `boilerplate/` and `boilerplate-full/` directories are generated by the generation script. Create the problem statement, structure definition, and test cases first.

### 2. Write the Problem Statement

Create `Problem.md` inside the problem directory.

Include the following sections where applicable:
- Problem description
- Input or function requirements
- Examples with inputs and outputs
- Constraints
- Any important clarifications

Example:

```markdown
# Two Sum

Given an array of integers `nums` and an integer `target`,
return the indices of the two numbers whose sum equals `target`.

You may assume that each input has exactly one solution,
and you may not use the same element twice.

Return the answer in any order.

## Example 1

Input: nums = [2,7,11,15], target = 9

Output: [0,1]

Explanation: nums[0] + nums[1] = 9.

## Constraints

- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Exactly one valid answer exists.
```

### 3. Define the Problem Structure

Create `Structure.md`. This file defines the problem metadata, function signature information, and input/output types used by the template generator and importer.

Example:

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

#### Supported Metadata
- **Problem Name:** Human-readable problem title.
- **Difficulty:** `EASY`, `MEDIUM`, or `HARD`.
- **Topics:** Comma-separated topic names.
- **Function Name:** Name of the function the participant must implement.
- **Input Field:** Type and name of each input (e.g., `int`, `string`, `list<int>`, `list<string>`).
- **Output Field:** Type and name of the expected output.

### 4. Add Test Cases

Create test inputs and expected outputs in separate directories:
- Input files: `tests/inputs/`
- Expected output files: `tests/outputs/`

Each input file must have a corresponding output file with the same numerical filename:

```text
tests/
├── inputs/
│   ├── 0.txt
│   ├── 1.txt
│   └── 2.txt
└── outputs/
    ├── 0.txt
    ├── 1.txt
    └── 2.txt
```

#### Input Format
Test inputs use whitespace-separated values, **not JSON**.

For a `list<int>`, write the number of elements first, followed by the elements. Then provide the remaining input fields in the order defined in `Structure.md`.

Example `tests/inputs/0.txt`:
```text
4
2 7 11 15
9
```

Example `tests/outputs/0.txt`:
```text
0 1
```

### 5. Generate Boilerplate Templates

Run the generator from the repository root:

```bash
npm --prefix problem-bank run generate -- two-sum
```

*(Omit the slug to process all problems in the problem bank: `npm --prefix problem-bank run generate`)*

The generator creates:
- `boilerplate/`: Starter templates shown to users in the editor.
- `boilerplate-full/`: Complete driver harnesses used for execution.

### 6. Validate the Problem Package

Run the validator:

```bash
npm --prefix problem-bank run validate -- two-sum
```

The validator verifies:
- Problem metadata format and required fields.
- Existence and matching counts of inputs and outputs.
- Starter template syntax and `{{USER_CODE}}` placeholder placement.

### 7. Import the Problem into PostgreSQL

Import the problem package into the database:

```bash
npm --prefix problem-bank run import -- two-sum
```

The importer upserts the record into the `problems` table, generating:
- Content hash for version tracking.
- Test case records with proper visibility flags (first 3 are `SAMPLE`, remainder are `HIDDEN`).
- Language configuration and driver templates.

### 8. Understand the Import Manifest

The importer maintains:
```text
problem-bank/import-manifest.json
```
This file tracks problem slugs, content hashes, package versions, test counts, and import timestamps for auditing.

### 9. Checklist Before Opening a Pull Request

- [ ] The problem folder uses a unique, lowercase, kebab-case slug.
- [ ] `Problem.md` contains a clear statement, examples, and constraints.
- [ ] `Structure.md` follows the required format.
- [ ] Difficulty and topics are defined correctly.
- [ ] Function name and input/output fields match the problem statement.
- [ ] Every test input has a matching expected output file.
- [ ] Normal, boundary, and edge cases are covered.
- [ ] Boilerplate generation succeeds without errors.
- [ ] Package validation passes.
- [ ] Database import succeeds and is verified in Prisma Studio.
- [ ] Hidden tests remain private.

### 10. Complete Workflow Summary

For a problem named `two-sum`:

```bash
# 1. Generate language templates
npm --prefix problem-bank run generate -- two-sum

# 2. Validate the package
npm --prefix problem-bank run validate -- two-sum

# 3. Import into PostgreSQL
npm --prefix problem-bank run import -- two-sum

# 4. Open Prisma Studio to verify
npx prisma studio
```
