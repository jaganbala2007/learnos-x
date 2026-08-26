from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from app.core.database import get_db
from app.models.assessment import Question
from app.services.misconception_engine import MisconceptionEngine
from app.schemas.assessment import QuestionSchema, AssessmentResultResponse

router = APIRouter(prefix="/assessment", tags=["Adaptive Assessment & Misconception Engine"])

class SubmitAnswerRequest(BaseModel):
    user_id: int = 1
    question_id: str
    selected_option_index: int
    response_time_seconds: float = 15.0

@router.get("/questions", response_model=List[QuestionSchema])
def get_assessment_questions(skill_id: str = "sysverilog_interfaces", db: Session = Depends(get_db)):
    """Fetches diagnostic assessment questions for a target skill."""
    questions = db.query(Question).filter(Question.skill_id == skill_id).all()
    if not questions:
        questions = db.query(Question).all()
    return questions

@router.post("/answer", response_model=AssessmentResultResponse)
def submit_assessment_answer(req: SubmitAnswerRequest, db: Session = Depends(get_db)):
    """Submits answer attempt, diagnoses root-cause misconception, and adapts roadmap on failure."""
    engine = MisconceptionEngine(db)
    return engine.diagnose_attempt(
        user_id=req.user_id,
        question_id=req.question_id,
        selected_option=req.selected_option_index,
        response_time_seconds=req.response_time_seconds
    )
