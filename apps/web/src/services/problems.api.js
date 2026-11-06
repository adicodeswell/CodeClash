/**
 * Centralized API calls for problem catalog and detail views
 */
import { request } from "../api/client.js";

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
  const endpoint = queryString ? `/api/problems?${queryString}` : "/api/problems";

  const data = await request(endpoint, { method: "GET" });

  return {
    problems: Array.isArray(data.problems) ? data.problems : [],
    pagination: data.pagination || {
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 1,
    },
  };
}

export async function fetchProblemBySlug(slug) {
  if (!slug || typeof slug !== "string") {
    throw new Error("Valid problem slug is required");
  }

  const endpoint = `/api/problems/${encodeURIComponent(slug.trim())}`;
  const data = await request(endpoint, { method: "GET" });

  if (!data.problem) {
    throw new Error("Malformed problem detail response from server");
  }

  return data.problem;
}
