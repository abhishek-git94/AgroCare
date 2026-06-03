def build_rag_answer(query: str) -> dict:
    """Answer scheme and policy questions using a RAG pipeline."""
    # TODO: connect to Gemini or Llama retrieval augmented generation engine
    return {
        "eligible_schemes": [
            {
                "scheme_name": "PM-Kisan Samman Nidhi",
                "benefit_details": "₹6,000 per year in three equal installments",
                "action_required_to_apply": "Apply at PM-Kisan portal with Aadhaar and land records",
            },
        ],
        "mandi_market_intelligence": {
            "current_trend": "Stable",
            "predicted_price_direction": "Upward trend expected",
            "strategic_advice": "Hold for better pricing",
        },
    }
