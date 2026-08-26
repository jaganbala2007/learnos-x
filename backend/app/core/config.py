import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "LEARNOS X"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "learnos_x_secret_key_hackathon_demo_2026")
    
    # Database setting - SQLite fallback for local zero-config, PostgreSQL compatible
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./learnos_x.db")
    
    # AI / LLM configuration
    LLM_API_KEY: str = os.getenv("LLM_API_KEY", "")
    LLM_MODEL: str = os.getenv("LLM_MODEL", "gemini-3.5-flash")
    OFFLINE_DEMO_MODE: bool = True
    
    class Config:
        case_sensitive = True

settings = Settings()
