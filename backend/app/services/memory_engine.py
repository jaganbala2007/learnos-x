from typing import List, Dict, Any
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.models.assessment import MemorySchedule

class MemoryEngine:
    def __init__(self, db: Session):
        self.db = db

    def get_due_reviews(self, user_id: int) -> List[Dict[str, Any]]:
        """Returns due retention reviews for the learner."""
        schedules = self.db.query(MemorySchedule).filter(MemorySchedule.user_id == user_id).all()
        if not schedules:
            # Populate initial review schedule items for demo
            init_schedules = [
                MemorySchedule(
                    user_id=user_id,
                    skill_id="fsm_design",
                    topic_title="Finite State Machines & Mealy/Moore Encoding",
                    repetition_stage=3,
                    next_review_date=datetime.utcnow() - timedelta(hours=2),
                    retention_estimate=0.74
                ),
                MemorySchedule(
                    user_id=user_id,
                    skill_id="sysverilog_syntax",
                    topic_title="SystemVerilog OOP Class Handles & Inheritance",
                    repetition_stage=2,
                    next_review_date=datetime.utcnow() - timedelta(hours=1),
                    retention_estimate=0.68
                )
            ]
            for ms in init_schedules:
                self.db.add(ms)
            self.db.commit()
            schedules = init_schedules

        due = []
        for s in schedules:
            due.append({
                "id": s.id,
                "skill_id": s.skill_id,
                "topic_title": s.topic_title,
                "repetition_stage": s.repetition_stage,
                "retention_estimate": round(s.retention_estimate * 100.0, 1),
                "is_due": s.next_review_date <= datetime.utcnow()
            })
        return due
