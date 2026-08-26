from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.gap_engine import SkillGapEngine
from app.schemas.career import SkillGapVectorResponse

router = APIRouter(prefix="/gaps", tags=["Skill Gap Vector"])

@router.get("", response_model=SkillGapVectorResponse)
def get_skill_gap_vector(user_id: int = 1, target_role: str = "rtl_verification_engineer", db: Session = Depends(get_db)):
    """Calculates mathematical skill gap vector for learner against target career role."""
    engine = SkillGapEngine(db)
    return engine.calculate_gap_vector(user_id, target_role)
