from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class SkillPassportEntry(BaseModel):
    skill_id: str
    skill_name: str
    mastery_percentage: float
    verified_confidence: float
    evidence_summary: List[str]
    status: str
    last_verified: datetime

class PortfolioResponse(BaseModel):
    title: str
    about_text: str
    demonstrated_skills: List[str]
    projects_showcase: List[dict]
    verified_evidence_count: int
    career_readiness_score: float
    updated_at: datetime
