import requests


def fetch_weather_by_location(location: str) -> dict:
    """Fetch weather data from an external API."""
    # TODO: implement OpenWeather/NASA integration
    return {
        "weather_risk_level": "Low",
        "active_alerts": [],
        "protective_actions": [
            "No protective action required at this time",
            "Routine field monitoring recommended"
        ],
    }
