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


SYSTEM_PROMPT = """You are an expert plant pathologist analyzing crop disease symptoms.
Given the crop type and described symptoms, diagnose the disease or pest issue.
Return valid JSON only with these fields:
- crop: the crop name
- disease: name of the disease (or "No disease detected")
- confidence_percentage: integer 0-100
- severity: "Low", "Medium", or "High"
- ai_reasoning: brief explanation of your diagnosis
- recommended_treatment: array of 2-4 treatment/management steps"""


def analyze(symptoms: str, crop: str = "paddy") -> dict:
    client = _get_client()

    user_prompt = f"Crop: {crop}\nSymptoms observed: {symptoms}"

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        response_format={"type": "json_object"},
        temperature=0.3,
        max_tokens=400,
    )

    import json
    result = json.loads(completion.choices[0].message.content)

    return {
        "crop": result.get("crop", crop),
        "disease": result.get("disease", "No disease detected"),
        "confidence_percentage": result.get("confidence_percentage", 0),
        "severity": result.get("severity", "Low"),
        "ai_reasoning": result.get("ai_reasoning", ""),
        "recommended_treatment": result.get("recommended_treatment", []),
    }
