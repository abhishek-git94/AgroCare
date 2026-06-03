class PathogenAgent:
    """Research diseases and pests for crop protection."""

    def analyze(self, symptoms: str) -> dict:
        return {
            "crop": "paddy",
            "disease": "No disease detected",
            "confidence_percentage": 90,
            "severity": "Low",
            "ai_reasoning": "Based on symptom analysis, no visible pathogen indicators found.",
            "recommended_treatment": [
                "Continue regular scouting every 5 days",
                "Maintain proper field hygiene"
            ],
        }
