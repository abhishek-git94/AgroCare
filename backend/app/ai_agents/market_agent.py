class MarketAgent:
    """Provide market insights and scheme suggestions."""

    def recommend(self, crop: str) -> dict:
        return {
            "current_trend": "Stable",
            "predicted_price_direction": "Slight upward trend expected in the next 2 weeks",
            "strategic_advice": "Hold the harvest for 10-15 days for better price realization",
        }
