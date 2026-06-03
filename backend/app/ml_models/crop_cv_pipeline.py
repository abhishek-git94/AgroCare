def analyze_image(image_bytes: bytes) -> dict:
    """Run crop image inference pipeline using computer vision models."""
    # TODO: wire up YOLO + SAM inference
    return {
        "crop": "Rice",
        "disease": "No disease detected",
        "confidence_percentage": 92,
        "severity": "Low",
        "ai_reasoning": "Leaf texture and color appear within healthy range. No lesions, discoloration, or pest activity observed.",
        "recommended_treatment": [
            "Continue regular monitoring",
            "Maintain balanced NPK fertilization schedule",
            "Ensure proper irrigation spacing"
        ],
    }
