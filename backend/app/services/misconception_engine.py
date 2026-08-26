from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.assessment import Question, Attempt, Misconception
from app.models.twin import KnowledgeState, LearnerDigitalTwin, LearningDNA
from app.models.path import LearningPath, Milestone, Task

class MisconceptionEngine:
    def __init__(self, db: Session):
        self.db = db

    def diagnose_attempt(
        self,
        user_id: int,
        question_id: str,
        selected_option: int,
        response_time_seconds: float
    ) -> Dict[str, Any]:
        """Diagnoses answer attempt, identifies misconception, updates Digital Twin, and adapts roadmap if failed."""
        question = self.db.query(Question).filter(Question.id == question_id).first()
        if not question:
            return {"is_correct": False, "explanation": "Question not found"}

        is_correct = (selected_option == question.correct_option_index)
        misconception_title = None
        misconception_details = None
        roadmap_adapted = False
        adaptation_summary = None

        if not is_correct:
            # Map selected option index to misconception mapping
            mappings = question.misconception_mappings or {}
            misconception_title = mappings.get(str(selected_option), "Conceptual Misconception in Hardware Signal Binding")
            
            # Save misconception log
            misc = Misconception(
                user_id=user_id,
                skill_id=question.skill_id,
                misconception_title=misconception_title,
                diagnosis_text=f"Learner selected Option {selected_option}. Diagnosis: {misconception_title}",
                counter_example="Counter-example: Nonblocking assignments (<=) update during the NBA region of the current time step, NOT immediately.",
                resolved=0
            )
            self.db.add(misc)
            self.db.commit()

            misconception_details = {
                "title": misconception_title,
                "diagnosis": misc.diagnosis_text,
                "counter_example": misc.counter_example
            }

            # CLOSED-LOOP ADAPTATION: Trigger automatic roadmap modification
            roadmap_adapted, adaptation_summary = self._adapt_roadmap_for_misconception(user_id, question.skill_id)
            
            # Update KnowledgeState for skill
            self._update_knowledge_state_on_failure(user_id, question.skill_id)

        else:
            self._update_knowledge_state_on_success(user_id, question.skill_id)

        # Log attempt
        attempt = Attempt(
            user_id=user_id,
            question_id=question_id,
            selected_option_index=selected_option,
            is_correct=1 if is_correct else 0,
            response_time_seconds=response_time_seconds,
            diagnosed_misconception=misconception_title
        )
        self.db.add(attempt)
        self.db.commit()

        # Recalculate twin readiness
        twin = self.db.query(LearnerDigitalTwin).filter(LearnerDigitalTwin.user_id == user_id).first()
        readiness = twin.career_readiness_score if twin else 42.0

        return {
            "question_id": question_id,
            "is_correct": is_correct,
            "correct_option_index": question.correct_option_index,
            "explanation": question.explanation,
            "diagnosed_misconception": misconception_title,
            "misconception_details": misconception_details,
            "roadmap_adapted": roadmap_adapted,
            "adaptation_summary": adaptation_summary,
            "new_career_readiness": round(readiness, 1)
        }

    def _adapt_roadmap_for_misconception(self, user_id: int, skill_id: str) -> (bool, str):
        """Automatically modifies the active learning path upon detected weakness."""
        active_path = self.db.query(LearningPath).filter(
            LearningPath.user_id == user_id,
            LearningPath.is_active == 1
        ).first()

        if not active_path:
            from app.services.path_optimizer import PathOptimizer
            optimizer = PathOptimizer(self.db)
            active_path = optimizer.generate_roadmap(user_id, "Balanced Track")

        # Find future milestone and insert remediation tasks
        ms = self.db.query(Milestone).filter(
            Milestone.path_id == active_path.id,
            Milestone.target_skill_id == skill_id
        ).first()


        if ms:
            ms.status = "adapted"
            # Add focused remediation tasks
            t1 = Task(
                milestone_id=ms.id,
                title="REMEDIATION: SystemVerilog Nonblocking Assignment & Interface Timing Lab",
                task_type="practice",
                skill_id=skill_id,
                estimated_minutes=45,
                is_completed=0
            )
            t2 = Task(
                milestone_id=ms.id,
                title="REMEDIATION: Targeted Re-Assessment on Interfaces",
                task_type="assessment",
                skill_id=skill_id,
                estimated_minutes=20,
                is_completed=0
            )
            self.db.add(t1)
            self.db.add(t2)
            self.db.commit()

            summary = f"Roadmap automatically adapted! Inserted SystemVerilog Interface Remediation Lab & Targeted Reassessment before advancing to UVM."
            return True, summary

        return False, ""

    def _update_knowledge_state_on_failure(self, user_id: int, skill_id: str):
        twin = self.db.query(LearnerDigitalTwin).filter(LearnerDigitalTwin.user_id == user_id).first()
        if twin:
            ks = self.db.query(KnowledgeState).filter(
                KnowledgeState.twin_id == twin.id,
                KnowledgeState.skill_id == skill_id
            ).first()
            if ks:
                ks.mastery_score = max(10.0, ks.mastery_score - 8.0)
                ks.confidence = max(0.1, ks.confidence - 0.15)
                self.db.commit()

    def _update_knowledge_state_on_success(self, user_id: int, skill_id: str):
        twin = self.db.query(LearnerDigitalTwin).filter(LearnerDigitalTwin.user_id == user_id).first()
        if twin:
            ks = self.db.query(KnowledgeState).filter(
                KnowledgeState.twin_id == twin.id,
                KnowledgeState.skill_id == skill_id
            ).first()
            if ks:
                ks.mastery_score = min(100.0, ks.mastery_score + 15.0)
                ks.confidence = min(1.0, ks.confidence + 0.15)
                twin.career_readiness_score = min(100.0, twin.career_readiness_score + 3.5)
                twin.verified_skills_count += 1
                self.db.commit()
