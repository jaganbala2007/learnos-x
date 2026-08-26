from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.rag_engine import RAGEngine
from app.schemas.tutor import TutorChatRequest, TutorChatResponse

router = APIRouter(prefix="/tutor", tags=["Socratic AI Tutor & RAG Engine"])

@router.post("/chat", response_model=TutorChatResponse)
def tutor_chat(req: TutorChatRequest, db: Session = Depends(get_db)):
    """Socratic AI Tutor & RAG Knowledge retrieval assistant endpoint."""
    rag = RAGEngine(db)
    res = rag.query(req.message, req.current_topic)
    return {
        "reply": res["reply"],
        "tutor_mode_used": req.tutor_mode or "Socratic",
        "sources_cited": res["sources_cited"],
        "suggested_followups": res["suggested_followups"]
    }
