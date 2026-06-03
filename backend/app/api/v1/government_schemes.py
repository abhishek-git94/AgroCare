from fastapi import APIRouter

router = APIRouter()


@router.get("/eligibility")
def check_scheme_eligibility(farmer_id: str):
    """Perform a placeholder eligibility check for government schemes."""
    # TODO: use RAG retrieval over scheme documentation and farmer profile
    return {
        "farmer_id": farmer_id,
        "eligible": True,
        "schemes": ["Kisan Credit Card", "PM-Kisan Samman Nidhi"],
    }
