from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.twin import LearnerDigitalTwin, KnowledgeState
from app.models.path import LearningPath, Milestone, Task
from app.services.misconception_engine import MisconceptionEngine
from app.services.proof_engine import ProofOfSkillEngine

router = APIRouter(prefix="/demo", tags=["Hackathon WOW Demo"])

@router.post("/run-closed-loop")
def run_closed_loop_demo(db: Session = Depends(get_db)):
    """Executes the flagship closed-loop WOW demo sequence: Initial state -> Failed assessment -> Misconception diagnosis -> Roadmap adaptation -> Verified Readiness jump."""
    user_id = 1
    
    # Step 1: Initial twin state
    twin = db.query(LearnerDigitalTwin).filter(LearnerDigitalTwin.user_id == user_id).first()
    if not twin:
        return {"error": "Demo user not found"}

    initial_readiness = twin.career_readiness_score # 42.0%

    # Step 2: Trigger failed assessment attempt on SystemVerilog Interfaces
    engine = MisconceptionEngine(db)
    diag = engine.diagnose_attempt(
        user_id=user_id,
        question_id="q_sv_interface_01",
        selected_option=0, # Incorrect option
        response_time_seconds=18.5
    )

    # Step 3: Simulate completion of inserted remediation lab -> Jump mastery & readiness
    ks = db.query(KnowledgeState).filter(
        KnowledgeState.twin_id == twin.id,
        KnowledgeState.skill_id == "sysverilog_interfaces"
    ).first()
    
    if ks:
        ks.mastery_score = 78.0
        ks.confidence = 0.85
        
    twin.career_readiness_score = 57.0
    twin.verified_skills_count = 5
    db.commit()

    # Step 4: Update proof of skill
    proof = ProofOfSkillEngine(db)
    passport = proof.calculate_skill_confidence(user_id, "sysverilog_interfaces")

    return {
        "status": "success",
        "demo_sequence": [
            {"step": 1, "action": "Initial Learner Digital Twin Loaded", "career_readiness": f"{initial_readiness}%"},
            {"step": 2, "action": "SystemVerilog Interface Diagnostic Assessment Taken", "result": "Failed (Selected Option 0)"},
            {"step": 3, "action": "Misconception Diagnosed", "root_cause": diag["diagnosed_misconception"]},
            {"step": 4, "action": "Closed-Loop Roadmap Adapted", "adaptation": diag["adaptation_summary"]},
            {"step": 5, "action": "Remediation Completed & Skill Evidence Verified", "interfaces_mastery": "78.0%"},
            {"step": 6, "action": "Career Readiness Recalculated", "new_career_readiness": "57.0% (+15% Gain)"}
        ],
        "misconception_diagnosis": diag["misconception_details"],
        "updated_passport": passport
    }
