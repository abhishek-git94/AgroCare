class MarketAgent:
    """Provide market insights and scheme suggestions."""

    def recommend(self, crop: str) -> dict:
        return {
            "crop": crop,
            "insight": "Placeholder market insight.",
            "scheme_suggestion": "Consider government procurement support.",
        }
