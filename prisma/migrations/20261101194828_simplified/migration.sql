/*
  Warnings:

  - The values [REVIEWED] on the enum `ProblemStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `constraints` on the `problems` table. All the data in the column will be lost.
  - You are about to drop the column `problemLanguageId` on the `submissions` table. All the data in the column will be lost.
  - You are about to drop the column `queuedAt` on the `submissions` table. All the data in the column will be lost.
  - You are about to drop the `problem_languages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `problem_test_cases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `submission_test_results` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `languages` to the `problems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testCases` to the `problems` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `language` on the `submissions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProblemStatus_new" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
ALTER TABLE "public"."problems" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "problems" ALTER COLUMN "status" TYPE "ProblemStatus_new" USING ("status"::text::"ProblemStatus_new");
ALTER TYPE "ProblemStatus" RENAME TO "ProblemStatus_old";
ALTER TYPE "ProblemStatus_new" RENAME TO "ProblemStatus";
DROP TYPE "public"."ProblemStatus_old";
ALTER TABLE "problems" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- DropForeignKey
ALTER TABLE "problem_languages" DROP CONSTRAINT "problem_languages_problemId_fkey";

-- DropForeignKey
ALTER TABLE "problem_test_cases" DROP CONSTRAINT "problem_test_cases_problemId_fkey";

-- DropForeignKey
ALTER TABLE "submission_test_results" DROP CONSTRAINT "submission_test_results_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "submission_test_results" DROP CONSTRAINT "submission_test_results_testCaseId_fkey";

-- DropForeignKey
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_problemLanguageId_fkey";

-- AlterTable
ALTER TABLE "problems" DROP COLUMN "constraints",
ADD COLUMN     "languages" JSONB NOT NULL,
ADD COLUMN     "testCases" JSONB NOT NULL,
ADD COLUMN     "topics" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "submissions" DROP COLUMN "problemLanguageId",
DROP COLUMN "queuedAt",
ADD COLUMN     "currentTestIndex" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "judge0Token" TEXT,
ADD COLUMN     "passedTestCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalTestCount" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "language",
ADD COLUMN     "language" VARCHAR(30) NOT NULL;

-- DropTable
DROP TABLE "problem_languages";

-- DropTable
DROP TABLE "problem_test_cases";

-- DropTable
DROP TABLE "submission_test_results";

-- DropEnum
DROP TYPE "ProgrammingLanguage";

-- DropEnum
DROP TYPE "TestCaseVisibility";
