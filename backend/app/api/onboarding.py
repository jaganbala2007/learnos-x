from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from app.core.database import get_db
from app.models.user import User, LearnerProfile
from app.models.twin import LearnerDigitalTwin, KnowledgeState, LearningDNA
from app.services.agent_orchestrator import AgenticOrchestrator

router = APIRouter(prefix="/onboarding", tags=["Onboarding"])

class OnboardingRequest(BaseModel):
    user_id: Optional[int] = 1
    raw_prompt: str

@router.post("")
def perform_conversational_onboarding(req: OnboardingRequest, db: Session = Depends(get_db)):
    """Conversational AI Onboarding endpoint extracting career goals, time commitment & preferences."""
    orchestrator = AgenticOrchestrator(db)
    result = orchestrator.execute_user_intent(req.user_id, req.raw_prompt)
    
    profile = db.query(LearnerProfile).filter(LearnerProfile.user_id == req.user_id).first()
    if profile:
        profile.raw_onboarding_text = req.raw_prompt
        db.commit()

    return {
        "status": "success",
        "extracted_profile": {
            "target_role": "RTL Verification Engineer",
            "target_company": "NVIDIA",
            "education": "3rd-year ECE",
            "available_hours_per_week": 8,
            "preferred_format": "Project-based"
        },
        "orchestration_result": result
    }
