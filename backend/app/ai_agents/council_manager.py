from typing import List


class CouncilManager:
    """Manage multi-agent discussion for farming recommendations."""

    def __init__(self, agents: List[str] | None = None):
        self.agents = agents or ["pathogen", "market", "weather"]

    def run_debate(self, context: dict) -> dict:
        return {
            "agent_debates": {
                "soil_expert_opinion": "Soil NPK levels are balanced. Recommended to apply vermicompost 2 tonnes/acre for organic carbon boost.",
                "pest_expert_opinion": "No active pest infestation detected. Regular scouting every 5 days advised during flowering stage.",
                "water_expert_opinion": "Current soil moisture is adequate. Skip next irrigation cycle to prevent waterlogging.",
                "market_expert_opinion": "Market prices are favourable this month. Selling within the next week is recommended.",
            },
            "final_consensus_solution": "Maintain current irrigation schedule with one skip. Apply vermicompost before next sowing. Monitor for pest weekly. Proceed with harvest and sell within 7 days for optimal returns.",
            "risk_disclaimer": "This is an AI-generated recommendation. Consult your local agriculture officer before making critical farming decisions.",
        }
