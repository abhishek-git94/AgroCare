from groq import Groq
from openai import OpenAI
from app.core.config import settings

_client = None


def _get_client():
    global _client
    if _client is None:
        if settings.navigate_base_url:
            api_key = settings.navigate_api_key or settings.groq_api_key
            _client = OpenAI(base_url=settings.navigate_base_url, api_key=api_key)
        elif settings.groq_api_key:
            _client = Groq(api_key=settings.groq_api_key)
        else:
            raise ValueError("Set groq_api_key or navigate_base_url in .env")
    return _client


SYSTEM_PROMPT = """You are AgroSentinel, a helpful Hindi/English agricultural assistant for Indian farmers. 
Analyze the farmer's query and respond in Hindi. Keep responses concise (2-3 sentences).
Classify the query into one of these actions:
- crop_health_report
- weather_check
- scheme_check
- market_advice
- general_query

Return JSON format: {"action": "...", "response": "..."}"""


def process_text(text: str, language: str = "hi") -> dict:
    client = _get_client()
    lang_instruction = "Respond in Hindi." if language == "hi" else "Respond in English."

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": f"{SYSTEM_PROMPT}\n{lang_instruction}"},
            {"role": "user", "content": text},
        ],
        response_format={"type": "json_object"},
        temperature=0.3,
        max_tokens=300,
    )

    import json
    result = json.loads(completion.choices[0].message.content)

    return {
        "detected_language": language,
        "spoken_response_text": result.get("response", ""),
        "action_triggered": result.get("action", "general_query"),
    }
