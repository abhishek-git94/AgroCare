from fastapi import APIRouter, UploadFile, File

router = APIRouter()


@router.post("/transcribe")
async def transcribe_voice(audio: UploadFile = File(...)):
    """Receive an audio file and return a transcription placeholder."""
    # TODO: integrate Whisper-style transcription and local language processing
    return {
        "filename": audio.filename,
        "transcript": "यह एक प्लेसहोल्डर ट्रांसक्रिप्शन है।",
        "language": "hi",
    }
