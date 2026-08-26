from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class KnowledgeStateSchema(BaseModel):
    skill_id: str
    skill_name: str
    mastery_score: float
    confidence: float
    conceptual_score: float
    practical_score: float
    evidence_count: int
    last_assessed: datetime

class LearningDNASchema(BaseModel):
    learning_velocity: float
    retention_score: float
    practical_learning: float
    conceptual_learning: float
    problem_solving: float
    preferred_format: str
    optimal_session_minutes: int
    difficulty_tolerance: str

class DigitalTwinSchema(BaseModel):
    career_readiness_score: float
    skill_coverage_score: float
    verified_skills_count: int
    overall_retention_score: float
    uncertainty_index: float
    last_updated: datetime
    dna: LearningDNASchema
    knowledge_states: List[KnowledgeStateSchema]
