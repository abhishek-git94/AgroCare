import random
import time

import chromadb
from chromadb.config import Settings as ChromaSettings

from chromadb.errors import NotFoundError
from app.core.config import settings

_client = None
_embedding_function = None

_SENTENCE_MODEL_NAME = "all-MiniLM-L6-v2"


def _get_embedding_function():
    global _embedding_function
    if _embedding_function is None:
        from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction
        _embedding_function = SentenceTransformerEmbeddingFunction(model_name=_SENTENCE_MODEL_NAME)
    return _embedding_function


def _get_client():
    global _client
    if _client is None:
        _client = chromadb.PersistentClient(
            path="chroma_db",
            settings=ChromaSettings(anonymized_telemetry=False),
        )
    return _client


COLLECTION_NAME = "scheme_docs"


def get_or_create_collection():
    db = _get_client()
    try:
        return db.get_collection(COLLECTION_NAME, embedding_function=_get_embedding_function())
    except (ValueError, NotFoundError):
        return db.create_collection(COLLECTION_NAME, embedding_function=_get_embedding_function())


def add_documents(docs: list[dict]):
    collection = get_or_create_collection()
    ids = []
    metadatas = []
    documents = []
    base = int(time.time() * 1000)

    for i, doc in enumerate(docs):
        doc_id = f"doc_{base}_{i}_{random.randint(0, 9999)}"
        text = doc.get("content", "")
        if not text.strip():
            continue
        ids.append(doc_id)
        documents.append(text)
        metadatas.append({"source": doc.get("source", "unknown")})

    if ids:
        collection.add(
            ids=ids,
            metadatas=metadatas,
            documents=documents,
        )
    return len(ids)


def search_documents(query: str, top_k: int = 5) -> list[str]:
    collection = get_or_create_collection()
    if collection.count() == 0:
        return []
    results = collection.query(
        query_texts=[query],
        n_results=min(top_k, collection.count()),
    )
    return results.get("documents", [[]])[0]
