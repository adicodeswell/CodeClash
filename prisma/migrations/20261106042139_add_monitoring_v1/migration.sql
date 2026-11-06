-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "api_metrics" (
    "id" TEXT NOT NULL,
    "requestId" VARCHAR(64) NOT NULL,
    "method" VARCHAR(10) NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "responseTimeMs" DOUBLE PRECISION NOT NULL,
    "ip" VARCHAR(45),
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_errors" (
    "id" TEXT NOT NULL,
    "requestId" VARCHAR(64),
    "service" VARCHAR(50) NOT NULL,
    "statusCode" INTEGER,
    "errorName" VARCHAR(120) NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "stackTrace" TEXT,
    "path" VARCHAR(255),
    "method" VARCHAR(10),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "system_errors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "worker_heartbeats" (
    "workerId" VARCHAR(100) NOT NULL,
    "hostname" VARCHAR(100),
    "pid" INTEGER,
    "status" VARCHAR(30) NOT NULL DEFAULT 'IDLE',
    "currentJobId" VARCHAR(64),
    "metrics" JSONB,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastHeartbeatAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "worker_heartbeats_pkey" PRIMARY KEY ("workerId")
);

-- CreateIndex
CREATE INDEX "api_metrics_createdAt_idx" ON "api_metrics"("createdAt");

-- CreateIndex
CREATE INDEX "api_metrics_statusCode_createdAt_idx" ON "api_metrics"("statusCode", "createdAt");

-- CreateIndex
CREATE INDEX "api_metrics_path_createdAt_idx" ON "api_metrics"("path", "createdAt");

-- CreateIndex
CREATE INDEX "api_metrics_requestId_idx" ON "api_metrics"("requestId");

-- CreateIndex
CREATE INDEX "system_errors_createdAt_idx" ON "system_errors"("createdAt");

-- CreateIndex
CREATE INDEX "system_errors_service_createdAt_idx" ON "system_errors"("service", "createdAt");

-- CreateIndex
CREATE INDEX "system_errors_requestId_idx" ON "system_errors"("requestId");

-- CreateIndex
CREATE INDEX "worker_heartbeats_lastHeartbeatAt_idx" ON "worker_heartbeats"("lastHeartbeatAt");

-- CreateIndex
CREATE INDEX "worker_heartbeats_status_idx" ON "worker_heartbeats"("status");

-- AddForeignKey
ALTER TABLE "api_metrics" ADD CONSTRAINT "api_metrics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
