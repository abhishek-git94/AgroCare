from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel

router = APIRouter()


class ChatRequest(BaseModel):
    text: str
    language: str = "hi"


@router.post("/transcribe")
async def transcribe_voice(audio: UploadFile = File(...)):
    """Receive an audio file and return a transcription placeholder."""
    # TODO: integrate Whisper-style transcription and local language processing
    return {
        "detected_language": "hi",
        "spoken_response_text": "नमस्ते किसान भाई, आपकी फसल की रिपोर्ट तैयार है। आपकी फसल स्वस्थ है और कोई बीमारी नहीं पाई गई है। नियमित निगरानी जारी रखें।",
        "action_triggered": "crop_health_report",
    }


@router.post("/chat")
def voice_chat(req: ChatRequest):
    """Receive text from browser speech recognition and return voice response."""
    text = req.text.lower()
    lang = req.language

    if any(w in text for w in ["बीमारी", "रोग", "disease", "crop"]):
        return {
            "detected_language": lang,
            "spoken_response_text": "आपकी फसल में कोई गंभीर बीमारी नहीं दिख रही है। कृपया खेत का नियमित निरीक्षण करते रहें और किसी भी समस्या के लिए हमें फिर से संपर्क करें।",
            "action_triggered": "crop_health_check",
        }
    elif any(w in text for w in ["मौसम", "weather", "बारिश", "rain", "mausam", "moosam"]):
        return {
            "detected_language": lang,
            "spoken_response_text": "अगले 24 घंटों में मौसम साफ रहने की संभावना है। खेत में काम करने के लिए यह समय उपयुक्त है। किसी भी मौसम अलर्ट के लिए हम आपको सूचित करेंगे।",
            "action_triggered": "weather_check",
        }
    elif any(w in text for w in ["सरकारी", "योजना", "scheme", "सम्मान"]):
        return {
            "detected_language": lang,
            "spoken_response_text": "आपके लिए पीएम-किसान सम्मान निधि, किसान क्रेडिट कार्ड और फसल बीमा योजना उपलब्ध हैं। अधिक जानकारी के लिए अपने नजदीकी सीएससी केंद्र पर जाएं।",
            "action_triggered": "scheme_check",
        }
    else:
        return {
            "detected_language": lang,
            "spoken_response_text": "नमस्ते किसान भाई! मैं आपकी कैसे मदद कर सकता हूँ? आप फसल, मौसम या सरकारी योजनाओं के बारे में पूछ सकते हैं।",
            "action_triggered": "general_query",
        }
