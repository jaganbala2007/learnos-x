from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.twin import LearnerDigitalTwin, KnowledgeState, LearningDNA
from app.schemas.twin import DigitalTwinSchema, LearningDNASchema, KnowledgeStateSchema

router = APIRouter(prefix="/twin", tags=["Learner Digital Twin"])

@router.get("", response_model=DigitalTwinSchema)
def get_learner_twin(user_id: int = 1, db: Session = Depends(get_db)):
    """Returns the persistent structured Learner Digital Twin and Adaptive Learning DNA."""
    twin = db.query(LearnerDigitalTwin).filter(LearnerDigitalTwin.user_id == user_id).first()
    if not twin:
        raise HTTPException(status_code=404, detail="Learner Digital Twin not found")

    states = db.query(KnowledgeState).filter(KnowledgeState.twin_id == twin.id).all()
    dna = db.query(LearningDNA).filter(LearningDNA.twin_id == twin.id).first()

    return {
        "career_readiness_score": twin.career_readiness_score,
        "skill_coverage_score": twin.skill_coverage_score,
        "verified_skills_count": twin.verified_skills_count,
        "overall_retention_score": twin.overall_retention_score,
        "uncertainty_index": twin.uncertainty_index,
        "last_updated": twin.last_updated,
        "dna": {
            "learning_velocity": dna.learning_velocity if dna else 81.0,
            "retention_score": dna.retention_score if dna else 74.0,
            "practical_learning": dna.practical_learning if dna else 92.0,
            "conceptual_learning": dna.conceptual_learning if dna else 67.0,
            "problem_solving": dna.problem_solving if dna else 86.0,
            "preferred_format": dna.preferred_format if dna else "Project > Practice > Video > Text",
            "optimal_session_minutes": dna.optimal_session_minutes if dna else 30,
            "difficulty_tolerance": dna.difficulty_tolerance if dna else "Medium-High"
        },
        "knowledge_states": [
            {
                "skill_id": ks.skill_id,
                "skill_name": ks.skill_name,
                "mastery_score": ks.mastery_score,
                "confidence": ks.confidence,
                "conceptual_score": ks.conceptual_score,
                "practical_score": ks.practical_score,
                "evidence_count": ks.evidence_count,
                "last_assessed": ks.last_assessed
            } for ks in states
        ]
    }
