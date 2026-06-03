from fastapi import APIRouter
from app.ai_agents.council_manager import CouncilManager

router = APIRouter()
council = CouncilManager()


@router.post("/query")
def query_council(query: str, crop: str = "paddy"):
    """Submit a farming query to the multi-agent AI council for consensus."""
    context = {"query": query, "crop": crop}
    result = council.run_debate(context)
    return result
