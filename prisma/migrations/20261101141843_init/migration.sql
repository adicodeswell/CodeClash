/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'DISABLED');

-- CreateEnum
CREATE TYPE "ProblemDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "ProblemStatus" AS ENUM ('DRAFT', 'REVIEWED', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ProgrammingLanguage" AS ENUM ('CPP17', 'JAVA');

-- CreateEnum
CREATE TYPE "TestCaseVisibility" AS ENUM ('SAMPLE', 'HIDDEN');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('QUEUED', 'RUNNING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "SubmissionVerdict" AS ENUM ('ACCEPTED', 'WRONG_ANSWER', 'TIME_LIMIT_EXCEEDED', 'MEMORY_LIMIT_EXCEEDED', 'RUNTIME_ERROR', 'COMPILATION_ERROR', 'JUDGE_ERROR');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "emailNormalized" VARCHAR(320) NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problems" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(160) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "statement" TEXT NOT NULL,
    "constraints" TEXT,
    "difficulty" "ProblemDifficulty" NOT NULL,
    "status" "ProblemStatus" NOT NULL DEFAULT 'DRAFT',
    "timeLimitMs" INTEGER NOT NULL DEFAULT 2000,
    "memoryLimitKb" INTEGER NOT NULL DEFAULT 262144,
    "packageVersion" TEXT NOT NULL DEFAULT '1',
    "contentHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problem_languages" (
    "id" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "language" "ProgrammingLanguage" NOT NULL,
    "judge0LanguageId" INTEGER NOT NULL,
    "starterTemplate" TEXT NOT NULL,
    "functionSignature" TEXT,
    "driverVersion" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "problem_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problem_test_cases" (
    "id" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "ordinal" INTEGER NOT NULL,
    "visibility" "TestCaseVisibility" NOT NULL,
    "input" TEXT NOT NULL,
    "expectedOutput" TEXT NOT NULL,
    "packageVersion" TEXT NOT NULL DEFAULT '1',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "problem_test_cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "problemLanguageId" TEXT NOT NULL,
    "language" "ProgrammingLanguage" NOT NULL,
    "sourceCode" TEXT NOT NULL,
    "packageVersion" TEXT NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'QUEUED',
    "verdict" "SubmissionVerdict",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "queuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "runtimeMs" INTEGER,
    "memoryKb" INTEGER,
    "errorCode" TEXT,
    "errorSummary" TEXT,
    "retryCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submission_test_results" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "testCaseId" TEXT,
    "testOrdinal" INTEGER NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'QUEUED',
    "judge0Token" TEXT,
    "verdict" "SubmissionVerdict",
    "runtimeMs" INTEGER,
    "memoryKb" INTEGER,
    "diagnostic" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "submission_test_results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_emailNormalized_key" ON "users"("emailNormalized");

-- CreateIndex
CREATE INDEX "users_createdAt_idx" ON "users"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "problems_slug_key" ON "problems"("slug");

-- CreateIndex
CREATE INDEX "problems_status_difficulty_idx" ON "problems"("status", "difficulty");

-- CreateIndex
CREATE INDEX "problems_status_createdAt_idx" ON "problems"("status", "createdAt");

-- CreateIndex
CREATE INDEX "problem_languages_language_enabled_idx" ON "problem_languages"("language", "enabled");

-- CreateIndex
CREATE UNIQUE INDEX "problem_languages_problemId_language_key" ON "problem_languages"("problemId", "language");

-- CreateIndex
CREATE INDEX "problem_test_cases_problemId_visibility_packageVersion_ordi_idx" ON "problem_test_cases"("problemId", "visibility", "packageVersion", "ordinal");

-- CreateIndex
CREATE UNIQUE INDEX "problem_test_cases_problemId_packageVersion_ordinal_key" ON "problem_test_cases"("problemId", "packageVersion", "ordinal");

-- CreateIndex
CREATE INDEX "submissions_userId_createdAt_idx" ON "submissions"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "submissions_userId_problemId_createdAt_idx" ON "submissions"("userId", "problemId", "createdAt");

-- CreateIndex
CREATE INDEX "submissions_status_createdAt_idx" ON "submissions"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "submission_test_results_judge0Token_key" ON "submission_test_results"("judge0Token");

-- CreateIndex
CREATE INDEX "submission_test_results_submissionId_idx" ON "submission_test_results"("submissionId");

-- CreateIndex
CREATE UNIQUE INDEX "submission_test_results_submissionId_testOrdinal_key" ON "submission_test_results"("submissionId", "testOrdinal");

-- AddForeignKey
ALTER TABLE "problem_languages" ADD CONSTRAINT "problem_languages_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_test_cases" ADD CONSTRAINT "problem_test_cases_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_problemLanguageId_fkey" FOREIGN KEY ("problemLanguageId") REFERENCES "problem_languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submission_test_results" ADD CONSTRAINT "submission_test_results_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "submissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submission_test_results" ADD CONSTRAINT "submission_test_results_testCaseId_fkey" FOREIGN KEY ("testCaseId") REFERENCES "problem_test_cases"("id") ON DELETE SET NULL ON UPDATE CASCADE;
