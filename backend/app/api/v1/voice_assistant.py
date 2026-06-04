from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
from app.ml_models.nlp_pipeline import process_text

router = APIRouter()


class ChatRequest(BaseModel):
    text: str
    language: str = "hi"


@router.post("/transcribe")
async def transcribe_voice(audio: UploadFile = File(...)):
    audio_bytes = await audio.read()
    # TODO: integrate Whisper/Groq audio transcription
    return voice_chat(ChatRequest(text="", language="hi"))


@router.post("/chat")
def voice_chat(req: ChatRequest):
    return process_text(req.text, req.language)
