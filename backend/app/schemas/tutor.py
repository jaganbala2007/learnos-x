from pydantic import BaseModel
from typing import List, Optional

class TutorMessage(BaseModel):
    role: str # user, assistant
    content: str

class TutorChatRequest(BaseModel):
    message: str
    current_topic: str
    tutor_mode: Optional[str] = "Socratic" # Socratic, Direct, Example-first, Project-first, Interview

class TutorChatResponse(BaseModel):
    reply: str
    tutor_mode_used: str
    sources_cited: List[str]
    suggested_followups: List[str]
