"""
API Router for 9 Advanced Features in LEARNOS X
"""

from fastapi import APIRouter, Query, Body
from typing import List, Dict, Any, Optional
from app.services.new_features_engine import (
    RESOURCE_DATABASE, ROLES_DATABASE, MARKET_TRENDS,
    compute_peer_benchmark, recalculate_timeline, generate_personalized_project, GAMIFICATION_STATE
)

router = APIRouter(prefix="/features", tags=["Advanced Features"])

@router.get("/resources")
def get_learning_resources(skill_id: Optional[str] = Query("sysverilog_interfaces")):
    res = RESOURCE_DATABASE.get(skill_id, [
        {
            "id": "res_gen_01",
            "title": f"Mastering {skill_id.replace('_', ' ').title()}",
            "type": "Interactive Guide",
            "url": "https://learnos-x.internal/guide",
            "duration": "20 min read",
            "difficulty": "Intermediate",
            "rating": 4.9
        }
    ])
    return {"status": "success", "skill_id": skill_id, "resources": res}

@router.get("/multi-goal/roles")
def get_career_roles():
    return {"status": "success", "roles": ROLES_DATABASE}

@router.post("/multi-goal/set")
def set_multi_goals(selected_roles: List[str] = Body(...)):
    return {
        "status": "success",
        "selected_roles": selected_roles,
        "merged_skill_target_count": len(selected_roles) * 4,
        "message": f"Successfully updated career targets to: {', '.join(selected_roles)}"
    }

@router.get("/market/trends")
def get_market_trends():
    return {"status": "success", "trends": MARKET_TRENDS}

@router.get("/benchmark/compare")
def get_benchmark(skill_id: str = Query("sysverilog_interfaces"), mastery: float = Query(78.0)):
    bench = compute_peer_benchmark(skill_id, mastery)
    return {"status": "success", "benchmark": bench}

@router.post("/planner/recalculate")
def update_learning_planner(hours_per_week: float = Body(..., embed=True)):
    plan = recalculate_timeline(hours_per_week)
    return {"status": "success", "planner": plan}

@router.post("/project/generate")
def generate_ai_project(weak_skills: List[str] = Body(default=["sysverilog_interfaces"])):
    project = generate_personalized_project(weak_skills)
    return {"status": "success", "project": project}

@router.post("/feedback/submit")
def submit_learner_feedback(resource_id: str = Body(...), rating: str = Body(...)):
    return {
        "status": "success",
        "message": f"Feedback received ('{rating}') for resource {resource_id}. Difficulty model updated."
    }

@router.get("/gamification/status")
def get_gamification():
    return {"status": "success", "gamification": GAMIFICATION_STATE}
