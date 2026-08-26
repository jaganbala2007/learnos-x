from pydantic import BaseModel
from typing import List, Optional, Dict

class CareerRoleSchema(BaseModel):
    id: str
    title: str
    industry: str
    description: Optional[str] = None
    avg_salary_range: str
    market_demand_index: float

class SkillGapItem(BaseModel):
    skill_id: str
    skill_name: str
    current_mastery: float
    target_mastery: float
    gap: float
    priority: str # HIGH, MEDIUM, LOW
    market_relevance: float
    prerequisite_importance: float

class SkillGapVectorResponse(BaseModel):
    target_role: str
    career_readiness_score: float
    gaps: List[SkillGapItem]

class ResumeParseResponse(BaseModel):
    extracted_skills_claimed: List[str]
    extracted_skills_demonstrated: List[str]
    projects_found: List[str]
    matched_skills_count: int
    gap_vector_preview: List[SkillGapItem]
