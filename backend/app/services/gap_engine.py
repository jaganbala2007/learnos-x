from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.career import CareerRequirement, Career
from app.models.twin import KnowledgeState, LearnerDigitalTwin
from app.models.skill import Skill
from app.services.skill_graph import SkillGraphService

class SkillGapEngine:
    def __init__(self, db: Session):
        self.db = db
        self.graph_service = SkillGraphService(db)

    def calculate_gap_vector(self, user_id: int, target_career_id: str) -> Dict[str, Any]:
        """Calculates mathematical skill gap vector for a learner against a target role."""
        twin = self.db.query(LearnerDigitalTwin).filter(LearnerDigitalTwin.user_id == user_id).first()
        if not twin:
            current_knowledge = {}
        else:
            states = self.db.query(KnowledgeState).filter(KnowledgeState.twin_id == twin.id).all()
            current_knowledge = {ks.skill_id: ks.mastery_score for ks in states}

        requirements = self.db.query(CareerRequirement).filter(CareerRequirement.career_id == target_career_id).all()
        
        gaps = []
        total_required_mastery = 0.0
        total_current_mastery = 0.0

        for req in requirements:
            skill = self.db.query(Skill).filter(Skill.id == req.skill_id).first()
            skill_name = skill.name if skill else req.skill_id
            market_demand = skill.market_demand_score if skill else 0.85

            cur_mastery = current_knowledge.get(req.skill_id, 0.0)
            target_mastery = req.required_proficiency
            gap = max(0.0, target_mastery - cur_mastery)

            # Check prerequisites importance
            prereqs = self.graph_service.get_prerequisites(req.skill_id)
            prereq_importance = 1.2 if len(prereqs) > 0 else 1.0

            priority_score = gap * market_demand * prereq_importance
            if priority_score > 40.0:
                priority = "HIGH"
            elif priority_score > 15.0:
                priority = "MEDIUM"
            else:
                priority = "LOW"

            gaps.append({
                "skill_id": req.skill_id,
                "skill_name": skill_name,
                "current_mastery": round(cur_mastery, 1),
                "target_mastery": round(target_mastery, 1),
                "gap": round(gap, 1),
                "priority": priority,
                "market_relevance": market_demand,
                "prerequisite_importance": prereq_importance
            })

            total_required_mastery += target_mastery
            total_current_mastery += min(cur_mastery, target_mastery)

        # Sort gaps by priority score descending
        gaps.sort(key=lambda x: x["gap"], reverse=True)

        overall_readiness = (total_current_mastery / total_required_mastery * 100.0) if total_required_mastery > 0 else 0.0

        return {
            "target_role": target_career_id,
            "career_readiness_score": round(overall_readiness, 1),
            "gaps": gaps
        }
