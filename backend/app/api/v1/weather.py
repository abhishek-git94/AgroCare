from fastapi import APIRouter

router = APIRouter()


@router.get("/alerts")
def get_weather_alerts(location: str):
    """Return weather-driven agricultural alerts for the requested location."""
    # TODO: call weather service and map agricultural risk alerts
    return {
        "location": location,
        "alert": "Placeholder alert: no extreme weather detected.",
        "recommendation": "Continue routine field monitoring.",
    }
