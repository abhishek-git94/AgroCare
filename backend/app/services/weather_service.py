import requests

from groq import Groq
from openai import OpenAI

from app.core.config import settings

_llm_client = None


def _get_llm_client():
    global _llm_client
    if _llm_client is None:
        if settings.navigate_base_url:
            api_key = settings.navigate_api_key or settings.groq_api_key
            _llm_client = OpenAI(base_url=settings.navigate_base_url, api_key=api_key)
        elif settings.groq_api_key:
            _llm_client = Groq(api_key=settings.groq_api_key)
        else:
            raise ValueError("Set groq_api_key or navigate_base_url in .env")
    return _llm_client


def _fetch_openweather(location: str) -> dict | None:
    if not settings.weather_api_key:
        return None

    try:
        geo = requests.get(
            "https://api.openweathermap.org/geo/1.0/direct",
            params={"q": location, "limit": 1, "appid": settings.weather_api_key},
            timeout=10,
        )
        geo.raise_for_status()
        geo_data = geo.json()
        if not geo_data:
            return None

        lat, lon = geo_data[0]["lat"], geo_data[0]["lon"]

        weather = requests.get(
            "https://api.openweathermap.org/data/2.5/weather",
            params={"lat": lat, "lon": lon, "appid": settings.weather_api_key, "units": "metric"},
            timeout=10,
        )
        weather.raise_for_status()
        return weather.json()
    except requests.RequestException:
        return None


def _analyze_with_llm(location: str) -> dict:
    client = _get_llm_client()

    SYSTEM_PROMPT = """You are an agricultural weather analyst for Indian farms.
Given a location name, provide agricultural weather risk assessment.
Return valid JSON only with these fields:
- weather_risk_level: "Low", "Moderate", or "High" 
- active_alerts: array of weather alert strings relevant to farming (empty if none)
- protective_actions: array of actionable steps the farmer should take"""

    completion = client.chat.completions.create(
        model="gpt-4.1-nano",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Location: {location}"},
        ],
        temperature=0.3,
        max_tokens=600,
    )

    import json
    import re
    content = completion.choices[0].message.content.strip()
    content = re.sub(r"^```(?:json)?\s*", "", content)
    content = re.sub(r"\s*```$", "", content)
    result = json.loads(content)

    return _build_response(
        risk_level=result.get("weather_risk_level", "Low"),
        alerts=result.get("active_alerts", []),
        actions=result.get("protective_actions", ["Routine field monitoring recommended"]),
    )


def _build_response(risk_level: str, alerts: list[str], actions: list[str]) -> dict:
    return {
        "weather_risk_level": risk_level,
        "active_alerts": alerts,
        "protective_actions": actions,
    }


# Rough thresholds for agricultural risk based on weather conditions
_AGRI_RISK_RULES = [
    ("temperature", lambda v: v > 40 or v < 5, "High", ["Extreme temperature warning. Protect crops from heat/cold stress."]),
    ("temperature", lambda v: v > 35 or v < 10, "Moderate", ["Temperature outside optimal range. Monitor crop health."]),
    ("humidity", lambda v: v > 90, "High", ["Very high humidity. Risk of fungal diseases. Apply preventive fungicide."]),
    ("humidity", lambda v: v > 80, "Moderate", ["High humidity. Monitor for pest and disease pressure."]),
    ("wind_speed", lambda v: v > 15, "High", ["Strong winds. Secure irrigation systems and support structures."]),
    ("wind_speed", lambda v: v > 10, "Moderate", ["Moderate winds. Check for physical damage to crops."]),
    ("rain_volume", lambda v: v > 50, "High", ["Heavy rain expected. Ensure drainage channels are clear."]),
    ("rain_volume", lambda v: v > 20, "Moderate", ["Significant rain. Delay irrigation and check for waterlogging."]),
]


def _determine_risk(temp: float, humidity: float, wind: float, rain_1h: float) -> tuple:
    max_severity = "Low"
    alerts = []
    actions = set()

    for category, check, severity, advice in _AGRI_RISK_RULES:
        value_map = {
            "temperature": temp,
            "humidity": humidity,
            "wind_speed": wind,
            "rain_volume": rain_1h,
        }
        if check(value_map[category]):
            if severity == "High":
                max_severity = "High"
                alerts.append(advice[0])
            elif severity == "Moderate" and max_severity != "High":
                max_severity = "Moderate"
                alerts.append(advice[0])

    if not actions:
        actions.add("Routine field monitoring recommended")

    return max_severity, list(dict.fromkeys(alerts)), list(actions)


def fetch_weather_by_location(location: str) -> dict:
    ow_data = _fetch_openweather(location)

    if ow_data is None:
        return _analyze_with_llm(location)

    main = ow_data.get("main", {})
    wind = ow_data.get("wind", {})
    rain = ow_data.get("rain", {}) or {}

    temp = main.get("temp", 25)
    humidity = main.get("humidity", 60)
    wind_speed = wind.get("speed", 0)
    rain_1h = rain.get("1h", 0) or rain.get("3h", 0) / 3 or 0

    risk_level, alerts, actions = _determine_risk(temp, humidity, wind_speed, rain_1h)

    return _build_response(risk_level, alerts, actions)
