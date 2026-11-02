/**
 * Centralized API calls for problem catalog and detail views
 */

export async function fetchProblems({ search, difficulty, topic, page = 1, limit = 20 } = {}) {
  const params = new URLSearchParams();

  if (search && search.trim()) {
    params.set("search", search.trim());
  }

  if (difficulty && difficulty !== "ALL") {
    params.set("difficulty", difficulty.toUpperCase());
  }

  if (topic && topic !== "ALL") {
    params.set("topic", topic.trim());
  }

  if (page) {
    params.set("page", String(page));
  }

  if (limit) {
    params.set("limit", String(limit));
  }

  const queryString = params.toString();
  const url = queryString ? `/api/problems?${queryString}` : "/api/problems";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (data.issues && data.issues.length > 0) {
        throw new Error(data.issues[0].message || "Validation failed");
      }
      throw new Error(data.error || data.message || `Failed to fetch problems (${response.status})`);
    }

    return {
      problems: Array.isArray(data.problems) ? data.problems : [],
      pagination: data.pagination || {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 1,
      },
    };
  } catch (err) {
    if (err instanceof TypeError && err.message.includes("fetch")) {
      throw new Error("Unable to connect to CodeClash API. Please verify server is running.", { cause: err });
    }
    throw err;
  }
}

export async function fetchProblemBySlug(slug) {
  if (!slug || typeof slug !== "string") {
    throw new Error("Valid problem slug is required");
  }

  const url = `/api/problems/${encodeURIComponent(slug.trim())}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Problem not found or is not published yet");
      }
      throw new Error(data.error || data.message || `Failed to load problem (${response.status})`);
    }

    if (!data.problem) {
      throw new Error("Malformed problem detail response from server");
    }

    return data.problem;
  } catch (err) {
    if (err instanceof TypeError && err.message.includes("fetch")) {
      throw new Error("Unable to connect to CodeClash API. Please verify server is running.", { cause: err });
    }
    throw err;
  }
}
