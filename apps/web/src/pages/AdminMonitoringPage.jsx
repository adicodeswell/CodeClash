import { useState, useEffect, useCallback, useTransition } from "react";
import { 
  Activity, 
  Database, 
  Cpu, 
  Server, 
  AlertTriangle, 
  RefreshCw, 
  Clock, 
  Zap, 
  Users,
  ShieldAlert,
  Terminal,
  UserCheck
} from "lucide-react";
import { monitoringAPI } from "../api/client.js";

function formatRelativeTime(date) {
  if (!date) return "—";
  const diffMs = Date.now() - new Date(date).getTime();
  const diffSec = Math.max(0, Math.floor(diffMs / 1000));
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  return `${Math.floor(diffMin / 60)}h ago`;
}

export function AdminMonitoringPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(5000); // 5s default
  const [lastRefreshedAt, setLastRefreshedAt] = useState(null);
  const [, startTransition] = useTransition();

  const fetchOverview = useCallback(async (isManual = false) => {
    if (isManual) setLoading(true);
    try {
      const res = await monitoringAPI.getOverview();
      startTransition(() => {
        setData(res.data);
        setError(null);
        setLastRefreshedAt(new Date());
      });
    } catch (err) {
      setError(err.message || "Failed to load monitoring overview");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOverview(true);
  }, [fetchOverview]);

  useEffect(() => {
    if (refreshInterval <= 0) return;
    const interval = setInterval(() => {
      fetchOverview(false);
    }, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchOverview, refreshInterval]);

  if (loading && !data) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-clash-bg text-clash-muted gap-3">
        <div className="w-8 h-8 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
        <span className="text-xs font-semibold">Connecting to Monitoring Engine...</span>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-6 rounded-xl bg-status-error/10 border border-status-error/25 text-rose-300">
          <div className="flex items-center gap-2 mb-2 font-semibold">
            <AlertTriangle size={18} />
            <span>Telemetry Ingestion Error</span>
          </div>
          <p className="text-xs mb-4">{error}</p>
          <button
            type="button"
            onClick={() => fetchOverview(true)}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10 transition cursor-pointer"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const { health, workers, queues, apiMetrics, submissions, userSessions } = data || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 select-none">
      {/* Top Header & Live Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-clash-border">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-[11px] font-mono mb-2">
            <Activity size={12} />
            <span className="font-semibold uppercase tracking-wider">CODECLASH MONITORING V1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-clash-text">
            Engine Telemetry &amp; Diagnostics
          </h1>
          <p className="text-xs sm:text-sm text-clash-muted mt-1">
            Real-time infrastructure health, active logged-in users, worker fleet heartbeats, queue latency, and error tracing.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 self-start md:self-center">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-clash-border text-xs text-zinc-300">
            <Clock size={13} className="text-zinc-500" />
            <span className="text-zinc-400">Auto:</span>
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value={3000} className="bg-clash-surface text-white">3s</option>
              <option value={5000} className="bg-clash-surface text-white">5s</option>
              <option value={10000} className="bg-clash-surface text-white">10s</option>
              <option value={30000} className="bg-clash-surface text-white">30s</option>
              <option value={0} className="bg-clash-surface text-white">Off</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => fetchOverview(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-primary/10 border border-brand-primary/30 text-xs font-semibold text-brand-primary hover:bg-brand-primary/20 transition cursor-pointer"
            title="Refresh now"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Subsystems Health Cards */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Subsystem Probes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* PostgreSQL */}
          <div className="p-4 rounded-xl bg-clash-surface border border-clash-border flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Database size={16} className="text-blue-400" />
                <span className="text-sm font-semibold text-white">PostgreSQL</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold border ${
                health?.postgres?.status === "UP"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-400"
              }`}>
                {health?.postgres?.status || "UNKNOWN"}
              </span>
            </div>
            <div className="text-xs text-zinc-400 flex items-center justify-between">
              <span>Query Ping:</span>
              <span className="font-mono text-zinc-200">
                {health?.postgres?.latencyMs != null ? `${health.postgres.latencyMs}ms` : "N/A"}
              </span>
            </div>
          </div>

          {/* Judge0 Cluster */}
          <div className="p-4 rounded-xl bg-clash-surface border border-clash-border flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Cpu size={16} className="text-amber-400" />
                <span className="text-sm font-semibold text-white">Judge0 Sandbox</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold border ${
                health?.judge0?.status === "UP"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-400"
              }`}>
                {health?.judge0?.status || "UNKNOWN"}
              </span>
            </div>
            <div className="text-xs text-zinc-400 flex items-center justify-between">
              <span>Sandbox Ping:</span>
              <span className="font-mono text-zinc-200">
                {health?.judge0?.latencyMs != null ? `${health.judge0.latencyMs}ms` : "N/A"}
              </span>
            </div>
          </div>

          {/* API Server */}
          <div className="p-4 rounded-xl bg-clash-surface border border-clash-border flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Server size={16} className="text-purple-400" />
                <span className="text-sm font-semibold text-white">API Gateway</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                OPERATIONAL
              </span>
            </div>
            <div className="text-xs text-zinc-400 flex items-center justify-between">
              <span>Process Uptime:</span>
              <span className="font-mono text-zinc-200">
                {health?.api?.uptimeSeconds != null ? `${Math.floor(health.api.uptimeSeconds / 60)}m ${health.api.uptimeSeconds % 60}s` : "N/A"}
              </span>
            </div>
          </div>

          {/* Worker Fleet Health */}
          <div className="p-4 rounded-xl bg-clash-surface border border-clash-border flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-brand-primary" />
                <span className="text-sm font-semibold text-white">Judge Workers</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold border ${
                workers?.healthy > 0
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-400"
              }`}>
                {workers?.healthy > 0 ? "HEALTHY" : workers?.total > 0 ? "STALE" : "IDLE"}
              </span>
            </div>
            <div className="text-xs text-zinc-400 flex items-center justify-between">
              <span>Active Fleet:</span>
              <span className="font-mono text-zinc-200">
                {workers?.healthy || 0} / {workers?.total || 0} active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics KPI Cards (Now includes Logged In Users) */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Live Telemetry Metrics
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* 1. Logged In / Active Users */}
          <div className="p-4 rounded-xl bg-clash-surface border border-clash-border">
            <div className="text-xs text-zinc-400 mb-1 flex items-center justify-between">
              <span>Active Users</span>
              <Users size={13} className="text-brand-primary" />
            </div>
            <div className="text-xl font-bold font-mono text-white">
              {userSessions?.activeNow || 0}
              <span className="text-xs text-zinc-500 font-sans ml-1">online</span>
            </div>
            <div className="text-[11px] text-zinc-500 font-mono mt-1">
              {userSessions?.active24h || 0} in 24h | {userSessions?.totalUsers || 0} total
            </div>
          </div>

          {/* 2. Queue Depth */}
          <div className="p-4 rounded-xl bg-clash-surface border border-clash-border">
            <div className="text-xs text-zinc-400 mb-1">Queue Depth</div>
            <div className="text-xl font-bold font-mono text-white">
              {queues?.queued || 0}
              <span className="text-xs text-zinc-500 font-sans ml-1">queued</span>
            </div>
            <div className="text-[11px] text-zinc-500 font-mono mt-1">
              {queues?.running || 0} running
            </div>
          </div>

          {/* 3. Avg Response Time */}
          <div className="p-4 rounded-xl bg-clash-surface border border-clash-border">
            <div className="text-xs text-zinc-400 mb-1">Avg Response</div>
            <div className="text-xl font-bold font-mono text-white">
              {apiMetrics?.avgResponseTimeMs != null ? `${apiMetrics.avgResponseTimeMs}` : "0"}
              <span className="text-xs text-zinc-500 font-sans ml-1">ms</span>
            </div>
            <div className="text-[11px] text-zinc-500 font-mono mt-1">
              Past 24 hours
            </div>
          </div>

          {/* 4. API Throughput */}
          <div className="p-4 rounded-xl bg-clash-surface border border-clash-border">
            <div className="text-xs text-zinc-400 mb-1">Throughput (1h)</div>
            <div className="text-xl font-bold font-mono text-white">
              {apiMetrics?.lastHourRequests || 0}
              <span className="text-xs text-zinc-500 font-sans ml-1">reqs</span>
            </div>
            <div className="text-[11px] text-zinc-500 font-mono mt-1">
              {apiMetrics?.last24hRequests || 0} in 24h
            </div>
          </div>

          {/* 5. System 5xx Errors */}
          <div className="p-4 rounded-xl bg-clash-surface border border-clash-border">
            <div className="text-xs text-zinc-400 mb-1">5xx Errors</div>
            <div className={`text-xl font-bold font-mono ${apiMetrics?.error5xxCount24h > 0 ? "text-rose-400" : "text-emerald-400"}`}>
              {apiMetrics?.error5xxCount24h || 0}
            </div>
            <div className="text-[11px] text-zinc-500 font-mono mt-1">
              Past 24 hours
            </div>
          </div>

          {/* 6. Acceptance Rate */}
          <div className="p-4 rounded-xl bg-clash-surface border border-clash-border">
            <div className="text-xs text-zinc-400 mb-1">Acceptance</div>
            <div className="text-xl font-bold font-mono text-white">
              {submissions?.acceptanceRate != null ? `${submissions.acceptanceRate}%` : "0%"}
            </div>
            <div className="text-[11px] text-zinc-500 font-mono mt-1">
              {submissions?.accepted || 0} / {submissions?.completedCount || 0} solved
            </div>
          </div>
        </div>
      </div>

      {/* Active Logged-In Users Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <UserCheck size={14} className="text-brand-primary" />
            <span>Active Logged-In Users (Past 15 Minutes)</span>
          </h2>
          <span className="text-xs text-zinc-500 font-mono">
            {userSessions?.activeNow || 0} online now
          </span>
        </div>
        <div className="rounded-xl border border-clash-border bg-clash-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-white/[0.02] border-b border-clash-border text-zinc-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4 font-semibold">User</th>
                  <th className="py-3 px-4 font-semibold">Role</th>
                  <th className="py-3 px-4 font-semibold">Email</th>
                  <th className="py-3 px-4 font-semibold text-right">Requests in Window</th>
                  <th className="py-3 px-4 font-semibold text-right">Last Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-clash-border/50">
                {userSessions?.activeUsersList && userSessions.activeUsersList.length > 0 ? (
                  userSessions.activeUsersList.map((user) => (
                    <tr key={user.id} className="hover:bg-white/[0.01]">
                      <td className="py-3 px-4 font-mono font-medium text-white flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary text-[11px] font-bold">
                          {user.username.slice(0, 1).toUpperCase()}
                        </div>
                        <span>@{user.username}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${
                          user.role === "ADMIN"
                            ? "bg-brand-primary/10 border-brand-primary/30 text-brand-primary"
                            : "bg-white/5 border-white/10 text-zinc-300"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-zinc-400">
                        {user.email}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-zinc-300">
                        {user.requestsCount} reqs
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-zinc-400">
                        {formatRelativeTime(user.lastActiveAt)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-zinc-500">
                      No users active in the past 15 minutes.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Worker Fleet Table */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <Terminal size={14} className="text-brand-primary" />
          <span>Worker Fleet Instances</span>
        </h2>
        <div className="rounded-xl border border-clash-border bg-clash-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-white/[0.02] border-b border-clash-border text-zinc-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Worker ID</th>
                  <th className="py-3 px-4 font-semibold">Host / PID</th>
                  <th className="py-3 px-4 font-semibold">State</th>
                  <th className="py-3 px-4 font-semibold">Health</th>
                  <th className="py-3 px-4 font-semibold">Memory</th>
                  <th className="py-3 px-4 font-semibold">Processed</th>
                  <th className="py-3 px-4 font-semibold text-right">Heartbeat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-clash-border/50">
                {workers?.list && workers.list.length > 0 ? (
                  workers.list.map((w) => (
                    <tr key={w.workerId} className="hover:bg-white/[0.01]">
                      <td className="py-3 px-4 font-mono font-medium text-white">
                        {w.workerId}
                      </td>
                      <td className="py-3 px-4 text-zinc-400 font-mono">
                        {w.hostname || "local"} / {w.pid || "—"}
                      </td>
                      <td className="py-3 px-4">
                        {w.currentJobId ? (
                          <div className="flex flex-col">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold border border-amber-500/30 bg-amber-500/10 text-amber-400 w-fit">
                              PROCESSING
                            </span>
                            <span className="text-[10px] text-amber-400/80 font-mono mt-0.5">
                              {w.currentJobId.slice(0, 12)}...
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 w-fit">
                              IDLE (READY)
                            </span>
                            {w.metrics?.lastJobId && (
                              <span className="text-[10px] text-zinc-500 font-mono mt-0.5">
                                Last: {w.metrics.lastJobId.slice(0, 10)}...
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${
                          w.healthStatus === "HEALTHY"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : w.healthStatus === "UNHEALTHY"
                            ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                            : "bg-zinc-500/10 border-zinc-500/30 text-zinc-400"
                        }`}>
                          {w.healthStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-zinc-400">
                        {w.metrics?.memoryUsageMb != null ? `${w.metrics.memoryUsageMb} MB` : "—"}
                      </td>
                      <td className="py-3 px-4 font-mono text-zinc-300">
                        {w.metrics?.jobsProcessed || 0}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-zinc-400">
                        {w.ageSeconds != null ? `${w.ageSeconds}s ago` : "—"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-zinc-500">
                      No active workers currently registered in heartbeat log.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Top Endpoints */}
      {apiMetrics?.topEndpoints && apiMetrics.topEndpoints.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Top API Endpoints (24h)
          </h2>
          <div className="rounded-xl border border-clash-border bg-clash-surface overflow-hidden">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-white/[0.02] border-b border-clash-border text-zinc-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Method</th>
                  <th className="py-2.5 px-4 font-semibold">Route Path</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Volume</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Avg Response</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-clash-border/50">
                {apiMetrics.topEndpoints.map((ep, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.01]">
                    <td className="py-2.5 px-4 font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-brand-primary/10 text-brand-primary font-semibold text-[10px]">
                        {ep.method}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 font-mono text-zinc-200">
                      {ep.path}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-zinc-300">
                      {ep.count}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-zinc-400">
                      {ep.avgResponseTimeMs}ms
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer Meta */}
      <div className="pt-4 border-t border-clash-border flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-2">
        <span>CodeClash Monitoring V1 Engine</span>
        <span>
          Last polled: {lastRefreshedAt ? lastRefreshedAt.toLocaleTimeString() : "Pending"}
        </span>
      </div>
    </div>
  );
}

export default AdminMonitoringPage;
