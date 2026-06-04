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


SYSTEM_PROMPT = """You are an agricultural market intelligence expert for Indian farmers.
Given the crop name, provide current market trends, price direction predictions, and strategic advice.
Return valid JSON only with these fields:
- current_trend: brief description of current market trend
- predicted_price_direction: expected price movement with reasoning
- strategic_advice: actionable advice for the farmer on when/how to sell"""


def recommend(crop: str = "paddy") -> dict:
    client = _get_client()

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Crop: {crop}"},
        ],
        response_format={"type": "json_object"},
        temperature=0.3,
        max_tokens=300,
    )

    import json
    result = json.loads(completion.choices[0].message.content)

    return {
        "current_trend": result.get("current_trend", "Stable"),
        "predicted_price_direction": result.get("predicted_price_direction", "Stable"),
        "strategic_advice": result.get("strategic_advice", "Monitor market regularly"),
    }
