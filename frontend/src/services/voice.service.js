import { apiFetch } from "./api";

export const askVoiceAssistant = (
  question
) => {
  return apiFetch(
    "/voice/chat",
    {
      method: "POST",
      body: JSON.stringify({
        question,
      }),
    }
  );
};