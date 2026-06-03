from fastapi import APIRouter
from app.services.market_service import fetch_market_prices

router = APIRouter()


@router.get("/eligibility")
def check_scheme_eligibility(farmer_id: str, crop: str = "paddy"):
    """Perform a placeholder eligibility check for government schemes."""
    # TODO: use RAG retrieval over scheme documentation and farmer profile
    market_data = fetch_market_prices([crop])
    return {
        "eligible_schemes": [
            {
                "scheme_name": "PM-Kisan Samman Nidhi",
                "benefit_details": "₹6,000 per year in three equal installments directly to farmer's bank account",
                "action_required_to_apply": "Visit nearest CSC centre or apply online at pmkisan.gov.in",
            },
            {
                "scheme_name": "Kisan Credit Card",
                "benefit_details": "Short-term crop loans up to ₹3 lakh at 7% interest (4% prompt repayment incentive)",
                "action_required_to_apply": "Apply at any nationalized bank with land records and Aadhaar",
            },
            {
                "scheme_name": "Pradhan Mantri Fasal Bima Yojana",
                "benefit_details": "Insurance coverage for crop loss due to natural calamities at 2% premium for Kharif crops",
                "action_required_to_apply": "Register before the cutoff date through your bank or insurance agent",
            },
        ],
        "mandi_market_intelligence": {
            "current_trend": "Stable",
            "predicted_price_direction": "Slight upward trend expected in the next 2 weeks",
            "strategic_advice": "Hold the harvest for 10-15 days for better price realization",
        },
    }
