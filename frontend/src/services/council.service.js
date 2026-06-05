import { apiFetch } from "./api";

export const askCouncil = (query) => {
  return apiFetch(
    "/council/ask",
    {
      method: "POST",
      body: JSON.stringify({
        query,
      }),
    }
  );
};