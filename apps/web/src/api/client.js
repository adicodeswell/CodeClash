/**
 * Centralized API client for CodeClash
 * Uses relative URLs to take advantage of Vite dev server proxy (/api -> :5003)
 * Automatically includes HTTP-only cookies via credentials: "include"
 */

export async function request(endpoint, options = {}) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
    ...options,
  };

  const response = await fetch(endpoint, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    let message = data.error || data.message || `Request failed with status ${response.status}`;
    if (data.issues && data.issues.length > 0) {
      message = data.issues[0].message || data.error || "Validation error";
    }

    const error = new Error(message);
    error.status = response.status;
    error.issues = data.issues || [];
    const retryAfter = response.headers.get("Retry-After") || data.retryAfterSeconds;
    if (retryAfter) {
      error.retryAfter = Number(retryAfter);
    }
    throw error;
  }

  return data;
}

export const authAPI = {
  async signup({ username, email, password }) {
    return request("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });
  },

  async login({ email, password }) {
    return request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  async me() {
    return request("/api/auth/me", {
      method: "GET",
    });
  },

  async logout() {
    return request("/api/auth/logout", {
      method: "POST",
    });
  },
};

export const problemsAPI = {
  async list({ search, difficulty, topic, page = 1, limit = 20 } = {}) {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (difficulty) params.set("difficulty", difficulty);
    if (topic) params.set("topic", topic);
    if (page) params.set("page", String(page));
    if (limit) params.set("limit", String(limit));

    const queryString = params.toString();
    const endpoint = queryString ? `/api/problems?${queryString}` : "/api/problems";
    return request(endpoint, { method: "GET" });
  },
};

export const submissionsAPI = {
  async submit({ problemSlug, language, sourceCode }) {
    return request("/api/submissions", {
      method: "POST",
      body: JSON.stringify({ problemSlug, language, sourceCode }),
    });
  },

  async run({ problemSlug, language, sourceCode }) {
    return request("/api/submissions/run", {
      method: "POST",
      body: JSON.stringify({ problemSlug, language, sourceCode }),
    });
  },

  async getStatus(submissionId) {
    return request(`/api/submissions/${submissionId}`, {
      method: "GET",
    });
  },

  async getMySubmissions({ cursor, limit, problemSlug } = {}) {
    const params = new URLSearchParams();
    if (problemSlug) params.set("problemSlug", problemSlug);
    if (cursor) params.set("cursor", cursor);
    if (limit) params.set("limit", String(limit));
    const qs = params.toString();
    return request(qs ? `/api/submissions/me?${qs}` : "/api/submissions/me", {
      method: "GET",
    });
  },
};

export const usersAPI = {
  async getMyProgress() {
    return request("/api/users/me/progress", {
      method: "GET",
    });
  },
};

export const monitoringAPI = {
  async getOverview() {
    return request("/api/admin/monitoring/overview", {
      method: "GET",
    });
  },

  async getHealth() {
    return request("/api/admin/monitoring/health", {
      method: "GET",
    });
  },

  async getWorkers() {
    return request("/api/admin/monitoring/workers", {
      method: "GET",
    });
  },

  async getErrors({ limit = 25, offset = 0, service } = {}) {
    const params = new URLSearchParams();
    if (limit) params.set("limit", String(limit));
    if (offset) params.set("offset", String(offset));
    if (service) params.set("service", service);
    const qs = params.toString();
    return request(qs ? `/api/admin/monitoring/errors?${qs}` : "/api/admin/monitoring/errors", {
      method: "GET",
    });
  },

  async getMetrics({ timeRangeHours = 24 } = {}) {
    return request(`/api/admin/monitoring/metrics?timeRangeHours=${timeRangeHours}`, {
      method: "GET",
    });
  },

  async getUsers({ windowMinutes = 15 } = {}) {
    return request(`/api/admin/monitoring/users?windowMinutes=${windowMinutes}`, {
      method: "GET",
    });
  },
};
