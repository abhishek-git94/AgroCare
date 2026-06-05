import mimetypes
from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from groq import Groq
from app.core.config import settings
from app.ml_models.nlp_pipeline import process_text

router = APIRouter()

_groq_client = None


def _get_groq_client():
    global _groq_client
    if _groq_client is None:
        api_key = settings.groq_api_key or settings.navigate_api_key
        if not api_key:
            raise HTTPException(status_code=500, detail="Groq API key not configured")
        _groq_client = Groq(api_key=api_key)
    return _groq_client


SUPPORTED_AUDIO_TYPES = {
    "audio/flac", "audio/m4a", "audio/mp4", "audio/mpeg",
    "audio/mpga", "audio/ogg", "audio/wav", "audio/webm",
}


class ChatRequest(BaseModel):
    text: str
    language: str = "hi"


@router.post("/transcribe")
async def transcribe_voice(audio: UploadFile = File(...)):
    if audio.content_type not in SUPPORTED_AUDIO_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported audio format: {audio.content_type}. Supported: {', '.join(sorted(SUPPORTED_AUDIO_TYPES))}",
        )

    audio_bytes = await audio.read()
    if not audio_bytes:
        raise HTTPException(status_code=400, detail="Empty audio file")

    client = _get_groq_client()

    ext = mimetypes.guess_extension(audio.content_type) or ".mp3"
    filename = f"audio{ext}"

    transcription = client.audio.transcriptions.create(
        file=(filename, audio_bytes, audio.content_type),
        model="whisper-large-v3-turbo",
        response_format="json",
        language="hi",
    )

    transcribed_text = transcription.text.strip()
    if not transcribed_text:
        return {"transcribed_text": "", "response": "Could not understand the audio."}

    result = process_text(transcribed_text)
    return {
        "transcribed_text": transcribed_text,
        "spoken_response_text": result.get("spoken_response_text", ""),
        "action_triggered": result.get("action_triggered", "general_query"),
    }


@router.post("/chat")
def voice_chat(req: ChatRequest):
    return process_text(req.text, req.language)
