import { prisma } from "@codeclash/db";

const ONLINE_THRESHOLD_MS = 2 * 60 * 1000; // 2 minutes (120s)
const IDLE_THRESHOLD_MS = 5 * 60 * 1000;   // 5 minutes (300s)

const sessionTouchThrottleMap = new Map();

/**
 * Creates a new active UserSession in PostgreSQL
 */
export async function createUserSession({ userId, ip, userAgent, expiresInDays = 1, db = prisma }) {
  const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);
  return db.userSession.create({
    data: {
      userId,
      isActive: true,
      ip: ip || null,
      userAgent: userAgent ? userAgent.slice(0, 255) : null,
      lastSeenAt: new Date(),
      expiresAt,
    },
  });
}

/**
 * Immediately terminates active session(s) on logout
 */
export async function terminateUserSession({ sessionId, userId, db = prisma }) {
  const endedAt = new Date();
  if (sessionId) {
    return db.userSession.updateMany({
      where: { id: sessionId },
      data: { isActive: false, endedAt },
    });
  }
  if (userId) {
    return db.userSession.updateMany({
      where: { userId, isActive: true },
      data: { isActive: false, endedAt },
    });
  }
}

/**
 * Updates lastSeenAt on explicit presence heartbeat (unthrottled)
 */
export async function recordPresenceHeartbeat({ sessionId, userId, db = prisma }) {
  const now = new Date();
  if (sessionId) {
    return db.userSession.updateMany({
      where: { id: sessionId, isActive: true },
      data: { lastSeenAt: now },
    });
  }
  if (userId) {
    return db.userSession.updateMany({
      where: { userId, isActive: true },
      data: { lastSeenAt: now },
    });
  }
}

/**
 * Throttled touch for general API activity (updates at most once per 30s)
 */
export function touchUserSession({ sessionId, userId, db = prisma }) {
  const key = sessionId || userId;
  if (!key) return;

  const now = Date.now();
  const lastTouch = sessionTouchThrottleMap.get(key) || 0;
  if (now - lastTouch < 30_000) {
    return;
  }
  sessionTouchThrottleMap.set(key, now);

  if (sessionTouchThrottleMap.size > 5000) {
    sessionTouchThrottleMap.clear();
  }

  const query = sessionId
    ? db.userSession.updateMany({
        where: { id: sessionId, isActive: true },
        data: { lastSeenAt: new Date(now) },
      })
    : db.userSession.updateMany({
        where: { userId, isActive: true },
        data: { lastSeenAt: new Date(now) },
      });

  query.catch(() => {});
}

/**
 * Retrieves deterministic user presence & session statistics
 */
export async function getUserSessionStats(db = prisma, { activeWindowMinutes = 5 } = {}) {
  const now = new Date();
  const idleThreshold = new Date(now.getTime() - IDLE_THRESHOLD_MS);
  const onlineThreshold = new Date(now.getTime() - ONLINE_THRESHOLD_MS);
  const dayStart = new Date(now.getTime() - 24 * 3600 * 1000);

  const [
    allUsers,
    activeSessions,
    dailyActiveSessionsGroup,
    dailyApiMetricUsers,
    recentApiMetrics,
    latestSessions,
    latestMetrics,
  ] = await Promise.all([
    db.user.findMany({
      select: {
        id: true,
        username: true,
        emailNormalized: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    db.userSession.findMany({
      where: {
        isActive: true,
        expiresAt: { gt: now },
        lastSeenAt: { gte: idleThreshold },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            emailNormalized: true,
            role: true,
          },
        },
      },
      orderBy: { lastSeenAt: "desc" },
    }),
    db.userSession.groupBy({
      by: ["userId"],
      where: {
        lastSeenAt: { gte: dayStart },
      },
    }),
    db.apiMetric.groupBy({
      by: ["userId"],
      where: {
        userId: { not: null },
        createdAt: { gte: dayStart },
      },
    }),
    db.apiMetric.groupBy({
      by: ["userId"],
      where: {
        userId: { not: null },
        createdAt: { gte: onlineThreshold },
      },
      _max: { createdAt: true },
    }),
    db.userSession.findMany({
      orderBy: { lastSeenAt: "desc" },
      distinct: ["userId"],
      select: { userId: true, lastSeenAt: true },
    }),
    db.apiMetric.groupBy({
      by: ["userId"],
      where: { userId: { not: null } },
      _max: { createdAt: true },
    }),
  ]);

  const totalUsers = allUsers.length;
  const latestSessionMap = new Map(latestSessions.map((s) => [s.userId, s.lastSeenAt]));
  const latestMetricMap = new Map(latestMetrics.map((m) => [m.userId, m._max.createdAt]));

  // Aggregate daily active unique users from both sessions and API metrics
  const dailyUserIds = new Set([
    ...dailyActiveSessionsGroup.map((g) => g.userId),
    ...dailyApiMetricUsers.map((g) => g.userId).filter(Boolean),
  ]);

  const userPresenceMap = new Map();

  for (const session of activeSessions) {
    const isOnline = session.lastSeenAt >= onlineThreshold;
    const sessionStatus = isOnline ? "ONLINE" : "IDLE";
    const u = session.user;

    if (!userPresenceMap.has(session.userId)) {
      userPresenceMap.set(session.userId, {
        id: session.userId,
        username: u?.username || "unknown",
        email: u?.emailNormalized || "unknown",
        role: u?.role || "USER",
        status: sessionStatus,
        lastActiveAt: session.lastSeenAt,
        sessionStartedAt: session.createdAt,
        ip: session.ip,
        userAgent: session.userAgent,
        activeSessionCount: 1,
      });
    } else {
      const existing = userPresenceMap.get(session.userId);
      existing.activeSessionCount++;
      if (sessionStatus === "ONLINE") {
        existing.status = "ONLINE";
      }
      if (session.lastSeenAt > existing.lastActiveAt) {
        existing.lastActiveAt = session.lastSeenAt;
      }
    }
  }

  // Backward-compatible fallback for users with recent API hits who do not have a UserSession row
  const missingUserIds = (recentApiMetrics || [])
    .map((m) => m.userId)
    .filter((id) => id && !userPresenceMap.has(id));

  if (missingUserIds.length > 0) {
    const extraUsers = await db.user.findMany({
      where: { id: { in: missingUserIds } },
      select: { id: true, username: true, emailNormalized: true, role: true },
    });
    const extraMap = new Map(extraUsers.map((u) => [u.id, u]));

    for (const m of recentApiMetrics) {
      if (missingUserIds.includes(m.userId)) {
        const u = extraMap.get(m.userId);
        userPresenceMap.set(m.userId, {
          id: m.userId,
          username: u?.username || "unknown",
          email: u?.emailNormalized || "unknown",
          role: u?.role || "USER",
          status: "ONLINE",
          lastActiveAt: m._max.createdAt,
          sessionStartedAt: m._max.createdAt,
          ip: null,
          userAgent: null,
          activeSessionCount: 1,
        });
      }
    }
  }

  const activeUsersList = Array.from(userPresenceMap.values());
  const onlineNow = activeUsersList.filter((u) => u.status === "ONLINE").length;
  const idleNow = activeUsersList.filter((u) => u.status === "IDLE").length;

  const allUsersList = allUsers.map((u) => {
    const presence = userPresenceMap.get(u.id);
    const lastActiveAt = presence?.lastActiveAt || latestSessionMap.get(u.id) || latestMetricMap.get(u.id) || null;
    return {
      id: u.id,
      username: u.username,
      email: u.emailNormalized,
      role: u.role,
      accountStatus: u.status,
      presence: presence ? presence.status : "OFFLINE",
      status: presence ? presence.status : "OFFLINE",
      lastActiveAt,
      createdAt: u.createdAt,
      activeSessionCount: presence ? presence.activeSessionCount : 0,
    };
  });

  return {
    totalUsers,
    totalRegisteredUsers: totalUsers,
    activeNow: onlineNow,
    onlineNow,
    idleNow,
    totalActiveSessions: activeSessions.length,
    active24h: dailyUserIds.size,
    windowMinutes: activeWindowMinutes,
    activeUsersList,
    allUsersList,
    thresholds: {
      onlineSeconds: 120,
      idleSeconds: 300,
    },
    timestamp: now.toISOString(),
  };
}
