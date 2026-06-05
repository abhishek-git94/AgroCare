import { API_BASE_URL } from "./config";

export const apiFetch = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const error = new Error("API request failed");
    error.status = response.status;
    error.details = await response.text();
    throw error;
  }

  return response.json();
};
