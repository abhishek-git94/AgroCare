import requests


def fetch_weather_by_location(location: str) -> dict:
    """Fetch weather data from an external API."""
    # TODO: implement OpenWeather/NASA integration
    return {"location": location, "temperature": "27°C", "condition": "Clear"}
