
/**
 * Atomically claims the oldest eligible queued submission.
 *
 * @param {import("@prisma/client").PrismaClient} prisma
 * @returns {Promise<object | null>}
 */
export async function claimJob(prisma) {
  const jobs = await prisma.$queryRaw`
    UPDATE "submissions"
    SET
      "status" = 'RUNNING',
      "startedAt" = NOW()
    WHERE "id" = (
      SELECT "id"
      FROM "submissions"
      WHERE "status" = 'QUEUED'
        AND "nextAttemptAt" <= NOW()
      ORDER BY "createdAt" ASC
      LIMIT 1
      FOR UPDATE SKIP LOCKED
    )
    RETURNING *;
  `;

  return jobs[0] ?? null;
}
