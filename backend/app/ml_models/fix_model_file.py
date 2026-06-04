import json
import zipfile
from pathlib import Path

src = Path("trained_model.keras")
dst = Path("trained_model_fixed.keras")


def strip_quantization_config(obj):
    if isinstance(obj, dict):
        obj.pop("quantization_config", None)
        for value in obj.values():
            strip_quantization_config(value)
    elif isinstance(obj, list):
        for item in obj:
            strip_quantization_config(item)


with zipfile.ZipFile(src, "r") as zin:
    with zipfile.ZipFile(dst, "w", compression=zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)

            if item.filename == "config.json":
                config = json.loads(data.decode("utf-8"))
                strip_quantization_config(config)
                data = json.dumps(config).encode("utf-8")

            zout.writestr(item, data)

print(f"Saved fixed model: {dst}")