import json

from groq import Groq
from openai import OpenAI

from app.ai_agents.market_agent import recommend as market_recommend
from app.ai_agents.pathogen_agent import analyze as pathogen_analyze
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


SYSTEM_PROMPT = """You are the council moderator for an AI farming advisory system.
You receive opinions from multiple expert agents (soil, pest, water, market).
Synthesize them into a single actionable consensus recommendation for an Indian farmer.
Return valid JSON only with these fields:
- final_consensus_solution: 2-4 sentence actionable recommendation
- risk_disclaimer: standard disclaimer about AI-generated advice"""


class CouncilManager:
    def __init__(self, agents: list[str] | None = None):
        self.agents = agents or ["pathogen", "market", "weather"]

    def run_debate(self, context: dict) -> dict:
        crop = context.get("crop", "paddy")
        query = context.get("query", "")
        symptoms = context.get("symptoms", query)

        expert_opinions = {}

        if "pathogen" in self.agents:
            pathogen_result = pathogen_analyze(symptoms=symptoms, crop=crop)
            expert_opinions["pest_expert_opinion"] = (
                f"Disease: {pathogen_result['disease']} ({pathogen_result['confidence_percentage']}% confidence). "
                f"Severity: {pathogen_result['severity']}. "
                f"Treatment: {', '.join(pathogen_result['recommended_treatment'])}"
            )

        if "market" in self.agents:
            market_result = market_recommend(crop=crop)
            expert_opinions["market_expert_opinion"] = (
                f"Trend: {market_result['current_trend']}. "
                f"Price direction: {market_result['predicted_price_direction']}. "
                f"Advice: {market_result['strategic_advice']}"
            )

        if "weather" in self.agents:
            from app.services.weather_service import fetch_weather_by_location
            try:
                location = context.get("location", "default")
                weather = fetch_weather_by_location(location)
                weather_text = f"Weather risk: {weather.get('weather_risk_level', 'Unknown')}. Alerts: {', '.join(weather.get('active_alerts', ['None']))}. Actions: {', '.join(weather.get('protective_actions', ['Routine monitoring']))}."
            except Exception:
                weather_text = "Weather service unavailable. Assume normal seasonal conditions."
            expert_opinions["water_expert_opinion"] = weather_text

        expert_opinions["soil_expert_opinion"] = (
            "Soil analysis integration pending. General recommendation: "
            "maintain balanced NPK and organic matter."
        )

        client = _get_client()
        opinions_text = "\n".join(f"- {k}: {v}" for k, v in expert_opinions.items())

        completion = client.chat.completions.create(
            model="gpt-4.1-nano",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Farmer query: {query}\nCrop: {crop}\n\nExpert opinions:\n{opinions_text}"},
            ],
            response_format={"type": "json_object"},
            temperature=0.3,
            max_tokens=500,
        )

        result = json.loads(completion.choices[0].message.content)

        return {
            "agent_debates": expert_opinions,
            "final_consensus_solution": result.get(
                "final_consensus_solution",
                "Maintain current practices. Consult local agriculture officer.",
            ),
            "risk_disclaimer": result.get(
                "risk_disclaimer",
                "This is an AI-generated recommendation. Consult your local agriculture officer before making critical farming decisions.",
            ),
        }
