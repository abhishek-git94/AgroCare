from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import crop_doctor, weather, voice_assistant, government_schemes
from app.core.config import settings
from app.core.security import verify_request

app = FastAPI(
    title="AgroSentinel Genesis AI Backend",
    version="0.1.0",
    description="Core AI backend for agricultural diagnostics, weather alerts, voice assistant, and scheme eligibility.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.debug else [settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def guardrail_middleware(request, call_next):
    verify_request(request)
    return await call_next(request)

app.include_router(crop_doctor.router, prefix="/api/v1/crop-doctor", tags=["Crop Doctor"])
app.include_router(weather.router, prefix="/api/v1/weather", tags=["Weather"])
app.include_router(voice_assistant.router, prefix="/api/v1/voice", tags=["Voice Assistant"])
app.include_router(government_schemes.router, prefix="/api/v1/schemes", tags=["Government Schemes"])

@app.get("/")
def root():
    return {"message": "AgroSentinel Genesis AI backend is running."}
