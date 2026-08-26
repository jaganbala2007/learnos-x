from pydantic import BaseModel
from typing import List, Optional, Dict

class QuestionSchema(BaseModel):
    id: str
    skill_id: str
    question_text: str
    options: List[str]
    difficulty: float

class AnswerSubmission(BaseModel):
    question_id: str
    selected_option_index: int
    response_time_seconds: float

class AssessmentResultResponse(BaseModel):
    question_id: str
    is_correct: bool
    correct_option_index: int
    explanation: str
    diagnosed_misconception: Optional[str] = None
    misconception_details: Optional[Dict[str, str]] = None
    roadmap_adapted: bool
    adaptation_summary: Optional[str] = None
    new_career_readiness: float
