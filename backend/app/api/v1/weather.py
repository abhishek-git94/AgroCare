from fastapi import APIRouter
from app.services.weather_service import fetch_weather_by_location

router = APIRouter()


@router.get("/alerts")
def get_weather_alerts(location: str):
    """Return weather-driven agricultural alerts for the requested location."""
    weather_data = fetch_weather_by_location(location)
    return weather_data
