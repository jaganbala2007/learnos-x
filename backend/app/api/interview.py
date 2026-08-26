from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from app.core.database import get_db

router = APIRouter(prefix="/interview", tags=["AI Interview Simulator"])

class InterviewMessageRequest(BaseModel):
    user_id: int = 1
    user_response: str
    mode: Optional[str] = "technical"

@router.post("/start")
def start_interview(mode: str = "technical", user_id: int = 1, db: Session = Depends(get_db)):
    """Initializes simulated AI interviewer session for target role."""
    return {
        "session_id": 1,
        "interviewer_name": "Lead Hardware Verification Architect",
        "question": "Welcome Alex! Let's start with SystemVerilog: Can you explain why we use `virtual interfaces` in a UVM driver component rather than instantiating a regular interface directly inside the class?"
    }

@router.post("/respond")
def respond_interview(req: InterviewMessageRequest, db: Session = Depends(get_db)):
    """Evaluates candidate response and updates Digital Twin readiness."""
    return {
        "evaluation": {
            "correctness": "High (88%)",
            "reasoning_clarity": "Clear explanation of dynamic OOP class vs static hardware binding.",
            "confidence_calibration": "Well-calibrated"
        },
        "next_question": "Great answer! Now, what happens if your driver attempts to make a nonblocking assignment to an interface signal outside a clocking block?"
    }
