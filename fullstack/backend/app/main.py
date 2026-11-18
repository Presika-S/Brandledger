import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .models.database import init_db
from .seed_data import seed_database
from .api import guard, ledger, review, reverse_check

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    description="BrandLedger: Pre-Publish Claim Verification Platform for Brand Governance"
)

# Enable CORS for React frontend and Chrome extension
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup hook to initialize SQLite/PostgreSQL tables and seed baseline facts
@app.on_event("startup")
def on_startup():
    logger.info("Initializing BrandLedger database and seeding brand facts...")
    init_db()
    seed_database()
    logger.info("BrandLedger ready to guard brand integrity.")

# Register API routes
app.include_router(guard.router, prefix=settings.API_PREFIX)
app.include_router(ledger.router, prefix=settings.API_PREFIX)
app.include_router(review.router, prefix=settings.API_PREFIX)
app.include_router(reverse_check.router, prefix=settings.API_PREFIX)

@app.get("/")
def root():
    return {
        "platform": "BrandLedger",
        "description": "Pre-Publish Claim Verification Platform for Brand Governance",
        "status": "ONLINE",
        "version": settings.VERSION,
        "docs_url": "/docs",
        "endpoints": {
            "guard_api": f"{settings.API_PREFIX}/guard",
            "source_of_truth_ledger": f"{settings.API_PREFIX}/ledger",
            "review_workflow": f"{settings.API_PREFIX}/review",
            "reverse_check_engine": f"{settings.API_PREFIX}/reverse-check"
        }
    }
