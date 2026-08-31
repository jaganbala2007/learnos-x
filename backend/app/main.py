from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.seed.runner import seed_database
from app.api import (
    onboarding, twin, skills, career, gap,
    simulator, tutor, assessment, memory, evidence, interview, demo, new_features_router, flagship_router, tinyml_router
)

# Ensure database tables and seed data are initialized
seed_database()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Autonomous Career Intelligence & Learning OS Backend APIs"
)

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include API Routers
app.include_router(onboarding.router, prefix=settings.API_V1_STR)
app.include_router(twin.router, prefix=settings.API_V1_STR)
app.include_router(skills.router, prefix=settings.API_V1_STR)
app.include_router(career.router, prefix=settings.API_V1_STR)
app.include_router(gap.router, prefix=settings.API_V1_STR)
app.include_router(simulator.router, prefix=settings.API_V1_STR)
app.include_router(tutor.router, prefix=settings.API_V1_STR)
app.include_router(assessment.router, prefix=settings.API_V1_STR)
app.include_router(memory.router, prefix=settings.API_V1_STR)
app.include_router(evidence.router, prefix=settings.API_V1_STR)
app.include_router(interview.router, prefix=settings.API_V1_STR)
app.include_router(demo.router, prefix=settings.API_V1_STR)
app.include_router(new_features_router.router, prefix=settings.API_V1_STR)
app.include_router(flagship_router.router, prefix=settings.API_V1_STR)
app.include_router(tinyml_router.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "project": settings.PROJECT_NAME,
        "subtitle": "Autonomous Career Intelligence & Learning OS",
        "status": "online",
        "version": settings.VERSION,
        "docs_url": "/docs"
    }
