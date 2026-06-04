from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "AgroSentinel Genesis AI"
    debug: bool = True
    frontend_origin: AnyHttpUrl = "http://localhost:5173"
    openai_api_key: str | None = None
    groq_api_key: str | None = None
    navigate_base_url: str | None = None
    navigate_api_key: str | None = None
    weather_api_key: str | None = None
    agmarknet_api_key: str | None = None

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
    }


settings = Settings()
