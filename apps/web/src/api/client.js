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
    // If validation issues exist, extract the first human-readable issue
    if (data.issues && data.issues.length > 0) {
      throw new Error(data.issues[0].message || data.error || "Validation error");
    }
    throw new Error(data.error || data.message || `Request failed with status ${response.status}`);
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
