from fastapi import APIRouter, Query
from app.ml_models.rag_pipeline import build_rag_answer

router = APIRouter()


@router.get("/eligibility")
def check_scheme_eligibility(farmer_id: str = Query(...), crop: str = "paddy"):
    query = f"Farmer {farmer_id} growing {crop}. What schemes am I eligible for and what is the market advice?"
    return build_rag_answer(query)
