from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    APP_NAME: str = "PromptWars Starter Backend"
    APP_ENV: str = "development"
    DEBUG: bool = True
    VERSION: str = "0.1.0"
    API_PREFIX: str = "/api/v1"

    # Server Configuration
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*",
    ]

    # Database Configuration (SQLite default, PostgreSQL compatible)
    DATABASE_URL: str = "sqlite:///./app_data.db"
    DB_ECHO: bool = False

    # AI Configuration (Gemini)
    GEMINI_API_KEY: str = Field(default="", description="Google Gemini API Key")
    GEMINI_MODEL: str = "gemini-3.8-flash"
    AI_TIMEOUT_SECONDS: int = 30
    AI_MOCK_FALLBACK: bool = True  # Allows offline testing/fallback if key is absent

    # Google Services Configuration
    GOOGLE_MAPS_API_KEY: str = ""
    FIREBASE_PROJECT_ID: str = ""
    GOOGLE_CLOUD_PROJECT: str = ""

    # Security & Rate Limiting
    SECRET_KEY: str = "dev-promptwars-insecure-secret-key-change-in-prod"
    RATE_LIMIT_PER_MINUTE: int = 120
    MAX_UPLOAD_SIZE_MB: int = 10

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
