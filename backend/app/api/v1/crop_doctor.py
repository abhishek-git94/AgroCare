from fastapi import APIRouter, UploadFile, File
from app.ml_models.crop_cv_pipeline import analyze_image

router = APIRouter()


@router.post("/analyze")
async def analyze_crop_image(image: UploadFile = File(...)):
    """Analyze uploaded crop imagery for disease and pest patterns."""
    image_bytes = await image.read()
    result = analyze_image(image_bytes)
    return result
