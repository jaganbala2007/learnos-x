from pydantic import BaseModel, Field
from typing import List, Optional

class LearnerFeatureVector(BaseModel):
    skill_mastery_avg: float = Field(..., ge=0.0, le=100.0, description="Average skill mastery percentage")
    retention_rate: float = Field(default=85.0, ge=0.0, le=100.0, description="Estimated retention rate")
    learning_velocity_wpm: float = Field(default=135.0, description="Speaking velocity in interview or WPM equivalent")
    recent_quiz_score: float = Field(default=75.0, ge=0.0, le=100.0, description="Recent assessment score")
    misconception_count: int = Field(default=0, ge=0, description="Number of unresolved technical misconceptions")
    practice_gap_days: float = Field(default=1.0, ge=0.0, description="Days since last active practice session")
    evidence_count: int = Field(default=2, ge=0, description="Number of verified proof-of-work project artifacts")
    target_readiness: float = Field(default=72.0, ge=0.0, le=100.0, description="Target career readiness score")

class TinyMLPredictionResult(BaseModel):
    learner_state: str = Field(..., description="Learner state: STABLE, IMPROVING, AT_RISK, BLOCKED, JOB_READY")
    priority_score: float = Field(..., ge=0.0, le=100.0, description="Next-action priority score")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Model prediction confidence score")
    recommended_action: str = Field(..., description="Recommended high-impact action category")
    top_risk_factor: Optional[str] = Field(None, description="Primary risk factor identified by model")
    fallback_active: bool = Field(default=False, description="True if prediction used fallback rules")
