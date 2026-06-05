# AgroSentinel Genesis AI

A multi-agent AI platform for Indian farmers — crop disease diagnosis, weather risk alerts, Hindi voice assistant, government scheme eligibility, and consensus-based farming advice.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python FastAPI (port 8000) |
| Frontend | React + Vite (port 5173) |
| ML/DL | TensorFlow / Keras (38-class crop disease classifier) |
| LLM | Navigate Labs / OpenAI / Groq (auto fallback) |
| Audio | Groq Whisper large-v3-turbo (Hindi transcription) |
| Vector DB | ChromaDB (persistent, all-MiniLM-L6-v2 embeddings) |
| RDBMS | SQLite via SQLAlchemy |
| Container | Docker |

## Project Structure

```
backend/
├── .env                        # API keys and config
├── Dockerfile
├── requirements.txt
├── chroma_db/                  # Persistent vector store (auto-created)
├── documents/                  # PDFs ingested into RAG pipeline
└── app/
    ├── main.py                 # FastAPI entry point + startup ingestion
    ├── core/
    │   ├── config.py           # Pydantic Settings from .env
    │   └── security.py         # Middleware guardrails
    ├── api/v1/
    │   ├── crop_doctor.py      # POST /analyze — image disease detection
    │   ├── weather.py          # GET /alerts — agricultural weather risk
    │   ├── voice_assistant.py  # POST /transcribe, /chat — Hindi voice/text
    │   ├── government_schemes.py  # GET /eligibility — RAG scheme lookup
    │   └── council.py          # GET /query — multi-agent consensus
    ├── ai_agents/
    │   ├── council_manager.py  # Orchestrates agent debate → consensus
    │   ├── market_agent.py     # Market intelligence (LLM)
    │   └── pathogen_agent.py   # Disease diagnosis from symptoms (LLM)
    ├── ml_models/
    │   ├── crop_cv_pipeline.py # TF/Keras 38-class image classifier
    │   ├── nlp_pipeline.py     # Hindi/English query classification + response
    │   ├── rag_pipeline.py     # PDF ingestion + ChromaDB retrieval + LLM
    │   └── fix_model_file.py   # Utility to fix Keras model config
    ├── services/
    │   ├── weather_service.py  # OpenWeatherMap + rule engine + LLM fallback
    │   └── market_service.py   # Placeholder for AGMARKNET
    └── database/
        ├── vector_db.py        # ChromaDB wrapper
        ├── session.py          # SQLAlchemy session
        └── memory_engine.py    # In-memory history

frontend/
├── public/
├── src/
│   ├── components/             # Shared UI components
│   └── views/                  # App screens
├── package.json
└── vite.config.js
```

## Setup

### Backend

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```

Configure `.env`:

```env
groq_api_key = "gsk_..."
navigate_base_url = "....."
navigate_api_key = "sk-..."
openai_api_key = "s......"
weather_api_key = "..."
agmarknet_api_key = ""
```

Set at least one LLM provider + weather API key.

Start server:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

On startup, all PDFs in `documents/` are automatically chunked and ingested into ChromaDB.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in browser.

### Docker

```bash
docker build -f backend/Dockerfile -t agrosentinel-backend ./backend
docker run -p 8000:8000 —env-file backend/.env agrosentinel-backend
```

## API Reference

All endpoints under `/api/v1/`. Open Swagger UI at `http://localhost:8000/docs`.

### 1. Crop Doctor — Image Disease Detection

```http
POST /api/v1/crop-doctor/analyze
Content-Type: multipart/form-data

Body: image (file)
```

**Verification flow:**

| Step | Check | Error if fails |
|------|-------|----------------|
| 1 | Empty file | `"Empty file"` |
| 2 | File size ≤ 10 MB | `"File too large"` |
| 3 | Valid image (PIL verify) | `"Invalid or corrupted image"` |
| 4 | Color mode RGB/RGBA | `"Unsupported color mode"` |
| 5 | Dimensions ≥ 32×32 px | `"Image too small"` |
| 6 | Prediction confidence ≥ 30% | `warning` field added |

**Response:**

```json
{
  "prediction": "Tomato___Late_blight",
  "confidence": 94.52,
  "top_predictions": [
    {"prediction": "Tomato___Late_blight", "confidence": 94.52},
    {"prediction": "Tomato___Early_blight", "confidence": 3.21},
    {"prediction": "Tomato___healthy", "confidence": 1.10}
  ],
  "crop": "Tomato",
  "disease": "Late_blight"
}
```

**Sample test images** (in `backend/app/ml_models/`):

```bash
curl -X POST "http://localhost:8000/api/v1/crop-doctor/analyze" \
  -F "image=@backend/app/ml_models/AppleScab3.JPG"
```

---

### 2. Weather — Agricultural Risk Assessment

```http
GET /api/v1/weather/alerts?location=Mumbai
```

Fetches real-time data from OpenWeatherMap, then runs an 8-rule agricultural risk engine (temperature, humidity, wind speed, rainfall). Falls back to LLM analysis if API unavailable.

**Response:**

```json
{
  "weather_risk_level": "Moderate",
  "active_alerts": ["High humidity", "Temperature outside optimal range"],
  "protective_actions": ["Monitor for pest and disease pressure", "Monitor crop health"]
}
```

---

### 3. Voice Assistant — Hindi Voice & Text

```http
POST /api/v1/voice/transcribe
Content-Type: multipart/form-data

Body: audio (file, supported formats below)
```

Supported formats: `flac`, `m4a`, `mp4`, `mp3`, `mpga`, `ogg`, `wav`, `webm`

Uses Groq Whisper large-v3-turbo for transcription, then NLP pipeline for Hindi response.

```http
POST /api/v1/voice/chat
Content-Type: application/json

Body: {"text": "meri paddy ki pattiyaan peele ho rahi hain", "language": "hi"}
```

**Response:**

```json
{
  "transcribed_text": "meri paddy ki pattiyaan peele ho rahi hain",
  "spoken_response_text": "paddy mein likely bacterial leaf blight hai. copper fungicide spray karein. local agriculture officer se sampark karein.",
  "action_triggered": "crop_health_report"
}
```

---

### 4. Government Schemes — RAG Eligibility

```http
GET /api/v1/schemes/eligibility?farmer_id=123&crop=wheat
```

Retrieves top-5 relevant chunks from ChromaDB (ingested from `documents/` PDFs) and grounds the LLM answer in those documents.

**Response:**

```json
{
  "eligible_schemes": [
    {
      "scheme_name": "PM-Kisan Samman Nidhi",
      "benefit_details": "₹6,000 per year in three equal installments",
      "action_required_to_apply": "Visit pmkisan.gov.in, link Aadhaar and land records"
    }
  ],
  "mandi_market_intelligence": {
    "current_trend": "Wheat prices stable at ₹2,150/quintal",
    "predicted_price_direction": "Slight uptick expected post-harvest",
    "strategic_advice": "Store and sell in 2-3 weeks for better price"
  }
}
```

Manually ingest a PDF:

```bash
cd backend
.venv\Scripts\activate
python -c "from app.ml_models.rag_pipeline import ingest_document; ingest_document('documents/Schemes_for_farmers.pdf')"
```

---

### 5. Farming Council — Multi-Agent Consensus

```http
GET /api/v1/council/query?query=leaves+yellowing&crop=paddy&location=Punjab
```

Activates 4 expert agents (pathogen, market, weather, soil), gathers their opinions, and synthesizes a single consensus recommendation via an LLM moderator.

**Response:**

```json
{
  "agent_debates": {
    "pest_expert_opinion": "Disease: Bacterial Leaf Blight (87% confidence). Severity: Medium. Treatment: Copper fungicide, drain fields.",
    "market_expert_opinion": "Trend: Stable. Price direction: Down 5% expected. Advice: Sell now to avoid losses.",
    "water_expert_opinion": "Weather risk: Moderate. Alerts: Heavy rain expected. Actions: Ensure drainage channels clear.",
    "soil_expert_opinion": "Soil analysis integration pending. Maintain balanced NPK."
  },
  "final_consensus_solution": "Bacterial Leaf Blight detected at medium severity. Apply copper fungicide immediately. Clear drainage channels before expected rain. Market prices expected to drop 5% — consider selling current stock now. Consult local agriculture officer for confirmation.",
  "risk_disclaimer": "This is an AI-generated recommendation. Consult your local agriculture officer before making critical farming decisions."
}
```

## System Architecture

```
Frontend (React + Vite)
        │
        ▼
FastAPI Backend ───┬── Crop Doctor (Image → TF/Keras, 38 classes)
                   ├── Weather (OpenWeatherMap → Rule engine / LLM)
                   ├── Voice (Audio → Groq Whisper → NLP Pipeline)
                   ├── Schemes (PDFs → ChromaDB → RAG)
                   └── Council (Pathogen + Market + Weather → Consensus)
                          │
                          ▼
                   LLM Client Factory
            Navigate Labs → OpenAI → Groq
                   (auto fallback chain)
```

## LLM Provider Fallback

The `_get_llm_client()` function in each module follows a priority chain:

1. **Navigate Labs** — if `navigate_base_url` is set (model: `gpt-4.1-nano`)
2. **OpenAI** — if `openai_api_key` is set (model: `gpt-4o-mini`)
3. **Groq** — if `groq_api_key` is set (model: `whisper-large-v3-turbo` for audio, chat models for text)

## Future Enhancements

- Real-time weather webhooks (IMD / OpenWeatherMap)
- Live mandi prices via AGMARKNET API
- WhatsApp / Telegram bot integration
- IoT soil sensor data (MQTT)
- Multi-language support (Marathi, Tamil, Telugu, Bengali)
- On-device TFLite model for offline disease detection
- Crop lifecycle tracker with sowing-to-harvest reminders

## License

MIT
