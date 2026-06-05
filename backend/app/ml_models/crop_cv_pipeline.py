import os
import io
import tempfile
from pathlib import Path

os.environ.setdefault("TF_CPP_MIN_LOG_LEVEL", "2")

import numpy as np
import tensorflow as tf
from PIL import Image


BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "trained_model_fixed.keras"
IMAGE_SIZE = (128, 128)
CONFIDENCE_THRESHOLD = 30.0
MAX_IMAGE_SIZE_MB = 10

CLASS_NAMES = [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    "Blueberry___healthy",
    "Cherry_(including_sour)___Powdery_mildew",
    "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight",
    "Corn_(maize)___healthy",
    "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)",
    "Peach___Bacterial_spot",
    "Peach___healthy",
    "Pepper,_bell___Bacterial_spot",
    "Pepper,_bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Raspberry___healthy",
    "Soybean___healthy",
    "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch",
    "Strawberry___healthy",
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy",
]


def load_crop_model(model_path=MODEL_PATH):
    model_path = Path(model_path)

    if not model_path.exists():
        raise FileNotFoundError(f"Model file not found: {model_path}")

    model = tf.keras.models.load_model(model_path, compile=False)

    if model.output_shape[-1] != len(CLASS_NAMES):
        raise ValueError(
            f"Model outputs {model.output_shape[-1]} classes, "
            f"but CLASS_NAMES has {len(CLASS_NAMES)} labels."
        )

    return model


MODEL = load_crop_model()


def preprocess_image(image_path):
    image_path = Path(image_path)

    if not image_path.exists():
        raise FileNotFoundError(f"Image file not found: {image_path}")

    image = tf.keras.preprocessing.image.load_img(
        image_path,
        target_size=IMAGE_SIZE,
        color_mode="rgb",
    )

    input_arr = tf.keras.preprocessing.image.img_to_array(image)

    input_arr = np.expand_dims(input_arr, axis=0)

    return input_arr


def model_prediction(image_path, top_k=3):
    input_arr = preprocess_image(image_path)
    probabilities = MODEL.predict(input_arr, verbose=0)[0]

    top_indices = probabilities.argsort()[-top_k:][::-1]
    top_predictions = [
        {
            "prediction": CLASS_NAMES[index],
            "confidence": round(float(probabilities[index] * 100), 2),
        }
        for index in top_indices
    ]

    return {
        "prediction": top_predictions[0]["prediction"],
        "confidence": top_predictions[0]["confidence"],
        "top_predictions": top_predictions,
    }


def validate_image(image_bytes: bytes) -> str | None:
    if len(image_bytes) == 0:
        return "Empty file"

    if len(image_bytes) > MAX_IMAGE_SIZE_MB * 1024 * 1024:
        return f"File too large (max {MAX_IMAGE_SIZE_MB}MB)"

    try:
        img = Image.open(io.BytesIO(image_bytes))
        img.verify()
    except Exception:
        return "Invalid or corrupted image file"

    img = Image.open(io.BytesIO(image_bytes))
    if img.mode not in ("RGB", "RGBA"):
        return f"Unsupported color mode: {img.mode}. Expected RGB."

    if img.width < 32 or img.height < 32:
        return f"Image too small ({img.width}x{img.height}). Minimum 32x32 pixels."

    return None


def analyze_image(image_bytes: bytes) -> dict:
    error = validate_image(image_bytes)
    if error:
        return {"error": error}

    with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as tmp:
        tmp.write(image_bytes)
        temp_path = tmp.name

    try:
        result = model_prediction(temp_path)

        if result["confidence"] < CONFIDENCE_THRESHOLD:
            result["warning"] = (
                f"Low confidence ({result['confidence']}%). "
                "Upload a clearer, well-lit image of the affected leaf."
            )

        crop, disease = result["prediction"].split("___", 1)
        result["crop"] = crop
        result["disease"] = "healthy" if "healthy" in disease.lower() else disease

        return result
    finally:
        os.unlink(temp_path)


if __name__ == "__main__":
    result = model_prediction(BASE_DIR / "AppleScab2.JPG")

    print("Prediction :", result["prediction"])
    print("Confidence :", result["confidence"], "%")
    print()
    print("Top predictions:")

    for item in result["top_predictions"]:
        print(f"- {item['prediction']} : {item['confidence']}%")
