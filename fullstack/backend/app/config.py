import os
from pydantic import BaseModel

class Settings(BaseModel):
    APP_NAME: str = "BrandLedger API"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api/v1"

    # Vercel's deployment filesystem is read-only. Use its writable /tmp
    # directory for demo SQLite writes unless a persistent DATABASE_URL is set.
    # For production, configure DATABASE_URL to a managed PostgreSQL database.
    _default_sqlite = "sqlite:////tmp/brandledger.db" if os.getenv("VERCEL") == "1" else "sqlite:///./brandledger.db"
    DATABASE_URL: str = os.getenv("DATABASE_URL", _default_sqlite)

    LLM_API_KEY: str = os.getenv("LLM_API_KEY", "")
    LLM_PROVIDER: str = os.getenv("LLM_PROVIDER", "mock_governance_engine")
    ABSTAIN_CONFIDENCE_THRESHOLD: float = 0.75

settings = Settings()
