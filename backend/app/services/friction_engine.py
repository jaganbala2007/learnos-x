from typing import Dict, Any
from sqlalchemy.orm import Session
from app.models.assessment import Attempt

class FrictionEngine:
    def __init__(self, db: Session):
        self.db = db

    def calculate_friction(self, user_id: int) -> Dict[str, Any]:
        """Calculates learning friction index from attempt latencies and error patterns."""
        attempts = self.db.query(Attempt).filter(Attempt.user_id == user_id).all()
        if not attempts:
            return {"friction_level": "Low", "score": 0.1, "action_recommendation": "Continue standard velocity"}

        recent = attempts[-10:]
        incorrect_count = sum(1 for a in recent if a.is_correct == 0)
        avg_latency = sum(a.response_time_seconds for a in recent) / len(recent)

        # Friction score formula
        friction_score = (incorrect_count / len(recent)) * 0.6 + min(1.0, avg_latency / 60.0) * 0.4

        if friction_score >= 0.6:
            level = "High"
            action = "Insert targeted prerequisite review, reduce task difficulty, split practice into 20-minute micro-sessions."
        elif friction_score >= 0.35:
            level = "Medium"
            action = "Provide alternative example-first resource format and Socratic guidance."
        else:
            level = "Low"
            action = "Maintain current optimal learning velocity."

        return {
            "friction_level": level,
            "score": round(friction_score, 2),
            "action_recommendation": action
        }
