from fastapi import Request, HTTPException


def verify_request(request: Request) -> None:
    """Basic guardrail hook for incoming requests."""
    user_agent = request.headers.get("user-agent", "")
    if "curl" in user_agent.lower() and request.url.path.startswith("/api/v1/"):
        raise HTTPException(status_code=403, detail="Access from this client is blocked.")
