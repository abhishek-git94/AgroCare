import json
from pathlib import Path

from groq import Groq
from openai import OpenAI
from pypdf import PdfReader

from app.core.config import settings
from app.database.vector_db import add_documents, search_documents

_client = None


def _get_client():
    global _client
    if _client is None:
        if settings.navigate_base_url:
            api_key = settings.navigate_api_key or settings.groq_api_key
            _client = OpenAI(base_url=settings.navigate_base_url, api_key=api_key)
        elif settings.groq_api_key:
            _client = Groq(api_key=settings.groq_api_key)
        else:
            raise ValueError("Set groq_api_key or navigate_base_url in .env")
    return _client


FALLBACK_KNOWLEDGE = """Indian government agriculture schemes:
1. PM-Kisan Samman Nidhi: ₹6,000/year to small farmers, online at pmkisan.gov.in
2. Kisan Credit Card: Short-term loans up to ₹3 lakh at 7% interest
3. PM Fasal Bima Yojana: Crop insurance at 2% premium for Kharif, 1.5% for Rabi
4. Soil Health Card: Free soil testing every 3 years
5. PM Kaushal Vikas Yojana: Skill training for farmers
6. e-NAM: Online trading platform for agricultural produce"""


def _build_system_prompt(context: str) -> str:
    return (
        "You are an Indian agricultural schemes expert.\n"
        f"Based on this knowledge: {context}\n"
        'Answer the farmer\'s query. Return JSON: {"eligible_schemes": [{"scheme_name": "", "benefit_details": "", "action_required_to_apply": ""}], "mandi_market_intelligence": {"current_trend": "", "predicted_price_direction": "", "strategic_advice": ""}}'
    )


def _extract_text_from_pdf(path: Path) -> str:
    reader = PdfReader(str(path))
    return "\n".join(page.extract_text() or "" for page in reader.pages)


def _extract_text_from_txt(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def _chunk_text(text: str, source: str, chunk_size: int = 800, overlap: int = 100) -> list[dict]:
    words = text.split()
    docs = []
    start = 0
    while start < len(words):
        chunk = " ".join(words[start : start + chunk_size])
        if chunk.strip():
            docs.append({"content": chunk, "source": source})
        start += chunk_size - overlap
    return docs


SUPPORTED_EXTENSIONS = {".pdf": _extract_text_from_pdf, ".txt": _extract_text_from_txt}


def ingest_document(file_path: str) -> int:
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"{file_path} not found")
    ext = path.suffix.lower()
    extractor = SUPPORTED_EXTENSIONS.get(ext)
    if extractor is None:
        raise ValueError(f"Unsupported file type: {ext}. Supported: {list(SUPPORTED_EXTENSIONS.keys())}")
    text = extractor(path)
    chunks = _chunk_text(text, source=path.name)
    return add_documents(chunks)


def ingest_documents_dir(directory: str = "documents") -> int:
    base = Path(directory)
    if not base.exists():
        return 0
    total = 0
    for ext, extractor in SUPPORTED_EXTENSIONS.items():
        for fpath in base.glob(f"*{ext}"):
            text = extractor(fpath)
            chunks = _chunk_text(text, source=fpath.name)
            total += add_documents(chunks)
    return total


def build_rag_answer(query: str) -> dict:
    retrieved = search_documents(query, top_k=5)
    if retrieved:
        context = "\n\n".join(retrieved)
    else:
        context = FALLBACK_KNOWLEDGE

    client = _get_client()
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": _build_system_prompt(context)},
            {"role": "user", "content": query},
        ],
        response_format={"type": "json_object"},
        temperature=0.3,
        max_tokens=500,
    )
    return json.loads(completion.choices[0].message.content)
